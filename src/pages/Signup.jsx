import React from 'react'

function Signup() {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column min-vh-100 bg-success">
      <form className="p-5 bg-white shadow-lg border rounded-2 w-100" style={{ maxWidth: '450px' }} id="signUpForm">
        <h1 className="text-center text-decoration-underline mb-5">Sign Up</h1>
        
        <div className="mb-3">
            <label for="username" className="form-label d-block">Name</label>
            <input type="text" className="form-control w-100" id="username" required/>
            <p className="errormessage text-danger" id="usernameError"></p>
        </div>
        
        <div class="mb-3">
            <label for="email" className="form-label d-block">Email Address</label>
            <input type="email" className="form-control w-100" id="email" required/>
            <p class="errormessage text-danger" id="emailError"></p>
        </div>
        
        <div className="mb-3">
            <label for="password" className="form-label d-block">Password</label>
            <div class="input-container">
                <input type="password" className="form-control w-100" id="password" required/>
                <span id="icon"><i className="bi bi-eye"></i></span>
            </div>
            <p className="errormessage text-danger" id="passwordError"></p>
        </div>
        
        <div className="mb-3">
            <label for="confirmpassword" className="form-label d-block"> Confirm Password</label>
            <div className="input-container">
                <input type="password" className="form-control w-100" id="confirmpassword" required/>
                <span id="icn"><i className="bi bi-eye"></i></span>
            </div>
            <p className="errormessage text-danger" id="confirmpasswordError"></p>
        </div>
        
        <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-100">Submit</button>
        </div>
        <p className="text-center mt-1">Already have an account?<a href="/login">Login</a></p>
    </form>
    </div>
  )
}

export default Signup
