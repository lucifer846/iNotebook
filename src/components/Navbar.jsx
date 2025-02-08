import React, {useEffect} from 'react';
import { use } from 'react';
import { Link, useLocation } from 'react-router-dom';


export default function Navbar(props) {
  let location = useLocation();
  useEffect(() => {
  }, [location]); // run useEffect whenever location changes
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/notes"? "active":""}`} to={!localStorage.getItem('token')?"/login":"/"}>Home</Link>
        </li>
        <li className="nav-item">
            <Link className={`nav-link ${location.pathname==="/about"? "active":""}`} to="/about">About</Link>
        </li>
      </ul>
      <form className="d-flex" role="search">
        {!localStorage.getItem('token')? <><Link className="btn btn-primary me-2" to="/login">Login</Link>
        <Link className="btn btn-primary me-2" to="/signup">Signup</Link></> : <><Link className="btn btn-primary me-2" onClick={()=>{
          localStorage.removeItem('token')
          window.location.reload()
        }}>Logout</Link></>}
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
  )
}
