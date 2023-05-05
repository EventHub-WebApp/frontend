import React from "react";
import "./Login.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../Providers/UserProvider';

const Login = () => {
  const [submissionResults, setsubmissionResults] = useState("Login to continue");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const user  = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      navigate('/events');
    }
  }, [loading]);

  function handleClick() {
    axios.post('http://localhost:5000/user/validate-email', {email:formData.email})
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    });
  }


//function to see if the cookie is parsed from backend
  // function handleCookie(){
  //   console.log('hi1')
  //   axios.get('http://localhost:5000/user/cookie', {withCredentials:true}).then(function(response){
  //     console.log(response);
  //     console.log('hi')
  //   }).catch(function (error){
  //     console.log(error);
  //     console.log("hi2")
  //   })
  // }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/user/login', 
        formData,
        { withCredentials: true }
      )
      .then(async function (response) {
        setsubmissionResults("Login Successful");
        console.log(response);
        localStorage.setItem('loggedIn', true);
        
      })
      .catch(function (error) {
        setsubmissionResults(error.response.data.error);
        console.log(error.response.data.error);
        console.log(error);
      }).finally(function(){
        setLoading(false);
      });
      

      
  };

  const onLogin = () => {};
  return (
    <div className="container row">
      {/* <div className="logo__container">
        <img src={EveMarkBanner} alt="Logo" />
      </div> */}
      <div className="login__container">
        <form className="login__form" onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <div className="credentials">
            <input
              type={"email"}
              name="email"
              placeholder="youremail@mail.com"
              value={formData.email}
              onChange={handleChange}
            ></input>
            <input
              type={"password"}
              name="password"
              placeholder="Your Password"
              value={formData.password}
              onChange={handleChange}
            ></input>
          </div>
          <div className="submission">
            <button className="btn btn-primary" type="submit">
              Sign In
            </button>
            <h5>{submissionResults}</h5>
            
          </div>
        </form>
      </div>
      <div className="other__options">
        <a href="/create-account">Don't have an account ?</a>
        { submissionResults==="Verify your Account." ? <button onClick={handleClick}>resend email verification</button>:<></> }
      </div>
    </div>
  );
};

export default Login;