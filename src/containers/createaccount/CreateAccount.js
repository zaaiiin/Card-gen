import React from "react";
import "./createaccount.css";
import { useState, useEffect } from "react";

import logoandname from "../../assets/logoandname.png";

const CreateAccount = () => {
  const initialValues = {
    firstname: "",
    lastname: "",
    emailaddress: "",
    password: "",
    confirmpassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const signupBtn = document.querySelector(".signupBtn");
    const loginBtn = document.querySelector(".loginBtn");
    const moveBtn = document.querySelector(".moveBtn");
    const signup = document.querySelector(".signup");
    const login = document.querySelector(".login");

    loginBtn.addEventListener("click", () => {
      moveBtn.classList.add("rightBtn");
      login.classList.add("loginForm");
      signup.classList.remove("signupForm");
      moveBtn.innerHTML = "Login";
      login.classList.remove("hide");
    });

    signupBtn.addEventListener("click", () => {
      moveBtn.classList.remove("rightBtn");
      signup.classList.add("signupForm");
      login.classList.remove("loginForm");
      moveBtn.innerHTML = "Sign up";
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!values.firstname) {
      errors.firstname = "First name is required";
    }
    if (!values.lastname) {
      errors.lastname = "Last name is required";
    }
    if (!values.emailaddress) {
      errors.emailaddress = "Email address is required";
    } else if (!regex.test(values.emailaddress)) {
      errors.emailaddress = "This is not a valid email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = "Password is required";
    }
    return errors;
  };

  return (
    <div className="form_wrapper">
      <div className="homepage_header">
        <div className="homepage_header--image">
          <img src={logoandname} alt="logoandname" />
        </div>
      </div>
      <div className="form_container">
        <div className="actionBtns">
          <button className="actionBtn signupBtn">Sign up</button>
          <button className="actionBtn loginBtn">Log in</button>
          <button className="moveBtn ">Sign up</button>
        </div>

        <form
          action="#"
          className="form signup signupForm"
          id="form"
          onSubmit={handleSubmit}
        >
          <div className="inputGroup error">
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              value={formValues.firstname}
              onChange={handleChange}
            />
            <p>{formErrors.firstname}</p>
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={formValues.lastname}
              onChange={handleChange}
            />
            <p>{formErrors.lastname}</p>
            <input
              type="text"
              placeholder="Email Address"
              name="emailaddress"
              value={formValues.emailaddress}
              onChange={handleChange}
            />
            <p>{formErrors.emailaddress}</p>
            <input
              type="password"
              placeholder="Create New Password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
            <p>{formErrors.password}</p>
            <input
              type="password"
              placeholder="Confirm Password"
              autoComplete="off"
              name="confirmpassword"
              value={formValues.confirmpassword}
              onChange={handleChange}
            />
            <p>{formErrors.confirmpassword}</p>
          </div>
          <button type="submit" className="submitBtn">
            Submit
          </button>
        </form>

        <form action="#" className="form login loginForm hide" id="form">
          <div className="inputGroup">
            <input type="text" placeholder="Email Address" id="emailaddress" />
            <input
              type="password"
              placeholder="Create New Password"
              id="password"
            />
          </div>
          <button type="submit" className="submitBtn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
