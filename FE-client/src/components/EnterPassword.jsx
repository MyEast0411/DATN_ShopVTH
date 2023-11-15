import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Component.css";

export default function EnterPassword() {
  return (
    <>
      <div className="main-sign-in main-enter-password flex justify-center">
        <div className="main-enter-password">
          <Link
            to="/"
            className="flex justify-center align-center container-logo ctnlogo-signUp"
          >
            <img className="logo cursor-pointer" src={Logo} alt="" />
            <div className="flex justify-center">Jordan VTH</div>
          </Link>

          <form>
            <div className="sign-in-title mb-10">What's your password?</div>
            <div className="send-code">
              <span className="email-sended-code">
                {" "}
                nguyenvanhoi2k3@gmail.com
              </span>
              <a
                href="#"
                className="underline ml-2 inline-block font-normal sign-up-edit link-underline"
              >
                Edit
              </a>
            </div>
            <div className="inputGroupCodeSignUp">
              <input type="password" required autocomplete="off" />
              <label for="Password">Password</label>
            </div>
            <a href="#" className="forgot-password underline link-underline text-small">
              Forgot password?
            </a>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-block enter-password-signIn-button main-sign-in-button"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
