import React from 'react'
import { useNavigate } from 'react-router-dom';


export default function SignupPage(props) {

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },body: JSON.stringify({name: document.getElementById("name").value, email: document.getElementById('email').value, password: document.getElementById('password').value })
    })
    const data = await res.json();
    if (data.authtoken) {
      localStorage.setItem('token', data.authtoken); 
      window.location.href = "/";
    props.showAlert("Signed up successfully", "success");
} else {
    props.showAlert("Invalid Credentials", "danger");
}
  }

  // Signup Page bootstrap form
  return (
    <div>
       <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card my-5">
          <form className="card-body cardbody-color p-lg-5" onSubmit={handleSubmit}>

            <div className="text-center">
              <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px" alt="profile" />
            </div>

            <div className="mb-3"> 
              <input type="text" className="form-control" id="name" aria-describedby="emailHelp"
                placeholder="Name"  minLength={3} required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" id="email" aria-describedby="emailHelp"
                placeholder="Email" required />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" id="password" placeholder="password" minLength={5} required  />
            </div>
            <div className="text-center"><button type="submit" className="btn btn-color px-5 mb-5 w-100">Sign Up</button></div>
            <div id="emailHelp" className="form-text text-center mb-5 text-dark">
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
    </div>
  )
}
