import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../Providers/UserProvider';
import LogoutButton from "../Logout/Logout";

const CreateEvent = () => {
//   const [step, setStep] = useState(1);
//const  user  = useContext(UserContext)[0];
const {user}  = useContext(UserContext);
console.log(user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    short_description: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/todos/create-event', 
        formData,
        { withCredentials: true }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data.error);
        console.log(error);
      });
      
  };

  return (
    <section className="create">
      <h2>Create Your Event</h2>
      <div className="create__container">
        <div className="create__guide">
          <h3>Your journey to event management starts here!</h3>
        </div>
        <form className="create__form" onSubmit={handleSubmit}>
          <div className="step first__step" >
            <input
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="Your Event Name"
              value={formData.name}
            />
            <textarea
              onChange={handleChange}
              maxLength="200"
              name="short_description"
              placeholder="A short description for your event (max 200 characters)"
              value={formData.short_description}
            />
            <textarea
              onChange={handleChange}
              name="description"
              placeholder="Describe your event in details"
              value={formData.description}
            />
          </div>
        </form>
          <div className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </div>
           <h1>{user.email}</h1>  
           <h1>hi</h1>
           <LogoutButton/>
        </div>
    </section>
  )
  
};

export default CreateEvent;