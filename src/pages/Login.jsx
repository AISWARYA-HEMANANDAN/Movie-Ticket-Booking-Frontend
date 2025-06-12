import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../services/userApi'
import { toast } from 'sonner'

function Login({ role = "user" }) {
  const navigate = useNavigate()

  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values);
    userLogin(values, role).then((res) => {
      console.log(res);
      if (role == "admin") {
        localStorage.setItem("admin-token", res?.data?.token)
        window.dispatchEvent(new Event("admin-login"));  // <-- Dispatch event here
        toast.success(res?.data?.message)
        navigate("/admin/dashboard")
      } else {
        localStorage.setItem('token', res?.data?.token);
        window.dispatchEvent(new Event("user-login"));  // <-- Dispatch event here
        toast.success(res?.data?.message)
        navigate("/movies")
      }

    }).catch((err) => {
      toast.error(err?.response?.data?.error);
    })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <div className="d-flex justify-content-center align-items-center flex-column min-vh-100 bg-success">
      <form className="p-5 bg-white shadow-lg border rounded-2 w-25 w-100" style={{ maxWidth: '350px' }} id="loginForm" onSubmit={handleSubmit}>
        <h1 className="text-center text-decoration-underline mb-5">{role == "admin" ? "Admin Login" : "Login"}</h1>

        <div className="mb-3">
          <label htmlFor="email" className="form-label d-block">Email Address</label>
          <input type="email" className="form-control w-100" id="email" required placeholder="Enter email" onChange={handleChange} name='email' />
          <p className="errormessage text-danger" id="emailError"></p>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label d-block">Password</label>
          <input type="password" className="form-control w-100" id="password" required placeholder="Password" onChange={handleChange} name='password' />
          <p className="errormessage text-danger" id="passwordError"></p>
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success w-100">Submit</button>
        </div>
        <p className="text-center mt-1">Don't have an account?<a href="/register">Signup</a></p>
      </form>
    </div>
  )
}

export default Login
