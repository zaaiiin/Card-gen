import React from "react";
import "./form.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

import logoandname from "../../assets/logoandname.png";

const Form = () => {
  useEffect(() => {
    // toggle button action

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

  // let currentAccount;

  // form validation
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

  //1.assign form values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  //2. submit form values when no errors are present and validation passes
  useEffect(() => {
    // console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      // console.log(formValues);
    }
    //eslint-disable-next-line
  }, [formErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  function emailValidation(emailaddress) {
    const regex =
      //eslint-disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(String(emailaddress.toLowerCase()));
  }

  // function addBorder() {
  //   const fields = document.querySelectorAll(".field");
  //   for (const field of fields) field.classList.add("error");
  // }
  // setFormErrors(addBorder);

  //4. form data validation
  const validate = (values) => {
    const errors = {};

    if (!values.firstname) {
      errors.firstname = "First name is required";
    }
    if (!values.lastname) {
      errors.lastname = "Last name is required";
    }
    if (!values.emailaddress) {
      errors.emailaddress = "Email address is required";
    } else if (!emailValidation(values.emailaddress)) {
      errors.emailaddress = "This is not a valid email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.confirmpassword !== values.password) {
      errors.password = "Passwords do not match";
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = "Password is required";
    } else if (values.confirmpassword !== values.password) {
      errors.confirmpassword = "Passwords do not match";
    }
    return errors;
  };

  // account info for login
  const initialAccValues = {
    useremail: "",
    userpassword: "",
  };

  const [loginFormValues, setLoginFormValues] = useState(initialAccValues);
  const [loginFormErrors, setLoginFormErrors] = useState({});
  const [isLoginSubmit, setIsLoginSubmit] = useState(false);
  const [formValid, setFormValid] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormValues({ ...loginFormValues, [name]: value });
  };

  useEffect(() => {
    if (Object.keys(loginFormErrors).length === 0 && isLoginSubmit) {
    }

    //eslint-disable-next-line
  }, [loginFormErrors]);

  const validateLogin = (values) => {
    const errors = {};

    if (!values.useremail) {
      errors.useremail = "Email address is required";
    } else if (!emailValidation(values.useremail)) {
      errors.useremail = "This is not a valid email";
    } else if (values.useremail !== "user@gmail.com") {
      errors.useremail = "Wrong email";
    }
    if (!values.userpassword) {
      errors.userpassword = "Password is required";
    } else if (values.userpassword !== "1111") {
      errors.userpassword = "Wrong password";
    } else if (
      values.userpassword === "1111" &&
      values.useremail === "user@gmail.com"
    ) {
      console.log("access granted");
      setFormValid(true);
    }

    return errors;
  };

  // login submit action
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginFormErrors(validateLogin(loginFormValues));
    setIsLoginSubmit(true);
    // isLoggedIn(errors);
  };

  if (formValid) {
    return <Redirect push to="/UpcomingEvents" />;
  }

  // const loggedIn = (e) => {
  //   e.preventDefault();
  //   if (formValid) {
  //     <Link to="/UpcomingEvents" />;
  //   } else {
  //     console.log("access denied");
  //   }
  // };

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
          autoComplete="off"
        >
          <div className="inputGroup">
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              value={formValues.firstname}
              onChange={handleChange}
              className="field"
            />
            <p>{formErrors.firstname}</p>
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={formValues.lastname}
              onChange={handleChange}
              className="field"
            />
            <p>{formErrors.lastname}</p>
            <input
              type="text"
              placeholder="Email Address"
              name="emailaddress"
              value={formValues.emailaddress}
              onChange={handleChange}
              className="field"
            />
            <p>{formErrors.emailaddress}</p>
            <input
              type="password"
              placeholder="Create New Password"
              autoComplete="new-password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              className="field"
            />
            <p>{formErrors.password}</p>
            <input
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              name="confirmpassword"
              value={formValues.confirmpassword}
              onChange={handleChange}
              className="field"
            />
            <p>{formErrors.confirmpassword}</p>
          </div>
          <button type="submit" className="submitBtn">
            Submit
          </button>
        </form>

        <form
          action="#"
          className="form login loginForm hide"
          id="form"
          onSubmit={handleLoginSubmit}
        >
          <div className="inputGroup">
            <input
              type="text"
              placeholder="Email Address"
              name="useremail"
              value={loginFormValues.useremail}
              onChange={handleLoginChange}
            />
            <p className="errorMsg">{loginFormErrors.useremail}</p>
            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              name="userpassword"
              value={loginFormValues.userpassword}
              onChange={handleLoginChange}
            />
            <p className="errorMsg">{loginFormErrors.userpassword}</p>
          </div>

          <button type="submit" className="submitLoginBtn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
