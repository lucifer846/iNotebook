import React from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = (props) => {

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },body: JSON.stringify({ email: document.getElementById('Username').value, password: document.getElementById('password').value })
    })
    const data = await res.json();
    if (data.authtoken) {
      localStorage.setItem('token', data.authtoken); 
      props.showAlert("Logged in successfully", "success");
      window.location.href = "/";
    }
    else{
      props.showAlert("Invalid Credentials", "danger");
    }
    
  }

  return (
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
              <input type="text" className="form-control" id="Username" name="email" aria-describedby="emailHelp"
                placeholder="User Name" required/>
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" id="password"  name="password" placeholder="password" required />
            </div>
            <div className="text-center"><button type="submit" className="btn btn-color px-5 mb-5 w-100">Login</button></div>
            <div id="emailHelp" className="form-text text-center mb-5 text-dark">Not
              Registered? <a href="/signup" className="text-dark fw-bold"> Create an
                Account</a>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
  );
};
export default LoginForm;
