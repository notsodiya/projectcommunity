import React, { useState } from 'react';
import './LoginRegister.css'; // Import your CSS file for styling
import Navbar from '../Navbar/Navbar';
import axios from "axios";


const LoginRegister = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [loginName, setLoginName] = useState('');
  const [passwordlogin, setPasswordlogin] = useState('');
  const [error, setError] = useState(null);
  const [firstname, setFirstName] = useState('');
  const [middlename, setMiddleName] = useState('');
  const [lastname, setLastName] = useState('');
  const [countrycode, setCountryCode] = useState('');
  const [phoneno, setPhoneNo] = useState('');
  const [emailid, setEmailId] = useState('');
  const [password, setPassword] = useState('');


  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };


  const handleSignUpClick = () => {
    setIsSignUpActive(true);

     // Validation
     if (!firstname || !middlename || !lastname || !countrycode || !phoneno || !emailid || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const data = {
      FirstName: firstname,
      MiddleName: middlename,
      LastName: lastname,
      CountryCode: countrycode,
      MobileNo: phoneno,
      Email: emailid,
      Password: password,
    };

    const url = 'http://localhost:51294/api/Register';

    axios.post(url, data)
      .then(() => {
        alert("You are Registered Successfully!");
        window.location.href = '/'; // Redirect to another page
      })
      .catch((error) => {
        alert(error);
      });



  };

  const handleSignInClick = async (e) => {
    setIsSignUpActive(false);
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:51294/api/Login/ValidateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          LoginName: loginName,
          Password: passwordlogin
        })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      if (data && data.ResponseStatus === 1) {
      } else {
        //setError(data.Message);
        localStorage.setItem('FamilyMemberId', data.Data.user[0].FamilyMemberId);
        localStorage.setItem('FamilyId', data.Data.user[0].FamilyId);
		localStorage.setItem('accessToken', data.Data.accessToken);
        window.location.href ="/afterlogin";
      }
    } catch (err) {
      
      setError('Failed to login. Please try again later.');
    }
   
  };

  return (
    <>
    <div className='container'>
    
    <div className='loginregister'>
      <div className={`login ${isSignUpActive ? 'right-panel-active' : ''}`} id="login">
        <div className="form-login sign-up-login">
          <form action="#">
            <h1 style={{ color: "white" }}>Create Account</h1>
            <input   className="logininput" name="firstName" id="txtFirstName" placeholder="First Name" required
                  value={firstname} onChange={(e) => handleInputChange(e, setFirstName)} />
                <input className="logininput" name="middleName" id="txtMiddleName" placeholder="Middle Name" required
                  value={middlename} onChange={(e) => handleInputChange(e, setMiddleName)} />
                <input className="logininput" name="lastName" id="txtLastName" placeholder="Last Name" required
                  value={lastname} onChange={(e) => handleInputChange(e, setLastName)} />
                <input className="logininput" name="countrycode" id="txtCountryCode" placeholder="Country Code" required
                  value={countrycode} onChange={(e) => handleInputChange(e, setCountryCode)} />
                <input className="logininput" name="mobilenumber" id="txtPhoneNo" placeholder="Phone Number" required
                  value={phoneno} onChange={(e) => handleInputChange(e, setPhoneNo)} />
                <input className="logininput" name="email" id="txtEmail" placeholder="name@example.com" required
                  value={emailid} onChange={(e) => handleInputChange(e, setEmailId)} />
                <input className="logininput" name="password" id="txtPassword" placeholder="Password" required
                  value={password} onChange={(e) => handleInputChange(e, setPassword)} />
            <button className='buttons' onClick={handleSignUpClick}>Sign Up</button>
          </form>
        </div>
        <div className="form-login sign-in-login">
          <form action="#">
            <h1 style={{ color: "#E4E6C3", fontSize: "35px", margin:"20px" }}>Sign in</h1>
            <input className="logininput" type="text"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)} placeholder="UserName"  />
            <input className="logininput" type="password"
            value={passwordlogin}
            onChange={(e) => setPasswordlogin(e.target.value)} placeholder="Password"/>
            <a href="#" className='fora'>Forgot your password?</a>
            <button   className="buttons" onClick={handleSignInClick}>Sign In</button>
            {error && <p>{error}</p>}
          </form>
        </div>
        <div className="overlay-login">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p className='forp'>To keep connected with us please login with your personal info</p>
              <button className="buttons" onClick={handleSignInClick}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="buttons" onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>  
      </div>
      </div>
    </div></>
  );
};

export default LoginRegister;
