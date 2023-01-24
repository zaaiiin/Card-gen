import React from "react";
import "./createaccount.css";

import logoandname from "../../assets/logoandname.png";

const CreateAccount = () => {
  // const form = document.getElementById("form");

  // form.addEventListener("submit", (e) => {
  //   e.preventDefault();

  //     const firstname = form["firstname"].value;
  //     const lastname = form["lastname"].value;
  //     const email = form["emailaddress"].value;
  //     const password = form["password"].value;
  //   });

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
  });

  signupBtn.addEventListener("click", () => {
    moveBtn.classList.remove("rightBtn");
    signup.classList.add("signupForm");
    login.classList.remove("loginForm");
    moveBtn.innerHTML = "Signup";
  });

  return (
    <body>
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

          <form action="#" className="form signup signupForm" id="form">
            <div className="inputGroup">
              <input type="text" placeholder="First Name" id="firstname" />
              <input type="text" placeholder="Last Name" id="lastname" />
              <input
                type="text"
                placeholder="Email Address"
                id="emailaddress"
              />
              <input
                type="password"
                placeholder="Create New Password"
                id="password"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                autoComplete="off"
              />
            </div>
            <button type="submit" className="submitBtn">
              Submit
            </button>
          </form>

          <form action="#" className="form login loginForm" id="form">
            <div className="inputGroup">
              <input
                type="text"
                placeholder="Email Address"
                id="emailaddress"
              />
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
    </body>
  );
};

export default CreateAccount;
