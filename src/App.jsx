import './App.css'
import { useState} from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom' 
import NoteState from './context/notes/noteState'
import Login from './components/LoginForm'
import Signup from './components/SignupPage'
import Alert from './components/Alert'


export default function App() {

  const[alert, setAlert] = useState(0)
  const showAlert = (message, type)=>{
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(0)
    }, 1500);
  }

  return (
    <>
      <NoteState showAlert={showAlert}>
      <Router>
      <Navbar showAlert={showAlert} />
      <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Navigate to="/notes" />} />
          <Route path='/login'  element={<Login showAlert={showAlert} />} />
          <Route path='/signup' element={<Signup showAlert={showAlert} />} />
          <Route path="/notes" element={<Home showAlert={showAlert} />} />
          <Route path="/about" element={<About />} /> 
        </Routes>
        </div>
      </Router>
    </NoteState>
    </>
  )
}
