import React from "react";
import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Signup = () => {
  const [submissionResults, setsubmissionResults] = useState("Sign up to continue");
  const [formData, setFormData] = useState({
    // first_name: "",
    // last_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/user/signup', 
        formData
      )
      .then(function (response) {
        setsubmissionResults("Signup Successful. Please Verify Your Email");
        console.log(response.data.email);
        return axios.post('http://localhost:5000/user/validate-email', {email:formData.email});
      }).then(function(response){
        navigate('/validate-email', {state: {email:formData.email}});
      }).catch(function(error){
        setsubmissionResults(error.response.data.error);
        console.log(error.response.data.error);
      });
  };
  return (
    <div className="container row">
      {/* <div className="logo__container">
        <img src={EveMarkBanner} alt="Logo" />
      </div> */}
      <div className="login__container">
        <form className="login__form" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div className="credentials">
            {/* <div className="fullname">
              <input
                type={"text"}
                name="first_name"
                placeholder="John"
                value={formData.first_name}
                onChange={handleChange}
              ></input>
              <input
                type={"text"}
                name="last_name"
                placeholder="Cena"
                value={formData.last_name}
                onChange={handleChange}
              ></input>
            </div> */}
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
              Sign Up
            </button>

            <h5>{submissionResults}</h5>
          </div>
        </form>
      </div>
      <div className="other__options">
        <a href="/">Already have an account ?</a>
      </div>
    </div>
  );
};

export default Signup;