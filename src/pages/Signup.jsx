import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userSignup } from '../services/userApi'
import { toast } from 'sonner'

function Signup() {

  const navigate = useNavigate()

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  })
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values);
    userSignup(values).then((res) => {

      console.log(res);
      toast.success(res?.data?.message)
      navigate("/login")
    }).catch((err) => {
      console.log(err);
      toast.error(err?.response?.data?.error);
    })

  }
  return (
    <div className="d-flex justify-content-center align-items-center flex-column min-vh-100 bg-success">
      <form className="p-5 bg-white shadow-lg border rounded-2 w-100" style={{ maxWidth: '450px' }} id="signUpForm" onSubmit={handleSubmit}>
        <h1 className="text-center text-decoration-underline mb-5">Sign Up</h1>

        <div className="mb-3">
          <label htmlFor="username" className="form-label d-block">Name</label>
          <input type="text" className="form-control w-100" id="username" required placeholder="Enter name" onChange={handleChange} name='name' />
          <p className="errormessage text-danger" id="usernameError"></p>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label d-block">Email Address</label>
          <input type="email" className="form-control w-100" id="email" required placeholder="Enter email" onChange={handleChange} name='email' />
          <p className="errormessage text-danger" id="emailError"></p>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label d-block">Password</label>
          <div className="input-container">
            <input type="password" className="form-control w-100" id="password" required placeholder="Enter password" onChange={handleChange} name='password' />
            <span id="icon"><i className="bi bi-eye"></i></span>
          </div>
          <p className="errormessage text-danger" id="passwordError"></p>
        </div>

        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label d-block"> Confirm Password</label>
          <div className="input-container">
            <input type="password" className="form-control w-100" id="confirmpassword" required placeholder="Enter password" onChange={handleChange} name='confirmpassword' />
            <span id="icn"><i className="bi bi-eye"></i></span>
          </div>
          <p className="errormessage text-danger" id="confirmpasswordError"></p>
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-success w-100">Submit</button>
        </div>
        <p className="text-center mt-1">Already have an account?<a href="/login">Login</a></p>
      </form>
    </div>
  )
}

export default Signup
