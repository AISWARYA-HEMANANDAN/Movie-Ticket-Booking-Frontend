import React from 'react'

function Login() {
  return (
   <div className="d-flex justify-content-center align-items-center flex-column min-vh-100 bg-success">
    <form className="p-5 bg-white shadow-lg border rounded-2 w-25 w-100" style={{ maxWidth: '350px' }} id="loginForm">
        <h1 className="text-center text-decoration-underline mb-5">Login</h1>

        <div className="mb-3">
            <label for="email" className="form-label d-block">Email Address</label>
            <input type="email" className="form-control w-100" id="email" required/>
            <p className="errormessage text-danger" id="emailError"></p>
        </div>

        <div className="mb-3">
            <label for="password" className="form-label d-block">Password</label>
            <input type="password" className="form-control w-100" id="password" required/>
            <p className="errormessage text-danger" id="passwordError"></p>
        </div>

        <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-100">Submit</button>
        </div>
        <p className="text-center mt-1">Don't have an account?<a href="/register">Signup</a></p>
    </form>

   </div>
  )
}

export default Login
