import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import JordanLogo from "../assets/JordanLogo";
import { Checkbox } from "@nextui-org/react";

export default function Register() {
  return (
    <>
      <div className="main-sign-in flex justify-center">
        <div>
          <Link to="/" className="flex justify-center align-center container-logo ctnlogo-signUp">
            <img className="logo cursor-pointer" src={Logo} alt="" />
            <div className="flex justify-center">Jordan VTH</div>
          </Link>

          <div className="sign-up-title mb-2">
            Now let's make you a Jordan VTH Member.
          </div>
          <div className="send-code">
            <span>
              We've sent a code to
              <span className="email-sended-code">
                {" "}
                nguyenvanhoi2k3@gmail.com
              </span>
            </span>
            <a
              href="#"
              className="underline ml-2 inline-block font-normal sign-up-edit link-underline"
            >
              Edit
            </a>
          </div>
          <form>
            <div className="inputGroupCodeSignUp">
              <input type="text" required autocomplete="off" />
              <label for="Code">Code</label>
            </div>
            <div className="flex name-user justify-between">
              <div className="inputGroupCodeSignUp">
                <input type="text" required autocomplete="off" />
                <label for="First name">First name</label>
              </div>
              <div className="inputGroupCodeSignUp">
                <input type="text" required autocomplete="off" />
                <label for="Last name">Last name</label>
              </div>
            </div>
            <div className="inputGroupCodeSignUp">
              <input type="password" required autocomplete="off" />
              <label for="Password">Password</label>
            </div>
            <div className="inputGroupNoMove mt-8">
              <input type="date" required autocomplete="off" />
              <label for="Date of birth">Date of birth</label>
            </div>

            <div className="agree-sign-up">
              <Checkbox
                defaultSelected={false}
                radius="md"
                className="font-normal"
                color="default"
                required
              >
                Sign up for emails to get updates from Jordan VTH on products, offers
                and your Member benefits.
              </Checkbox>
              <Checkbox
                defaultSelected={false}
                radius="md"
                className="font-normal"
                color="default"
                required
              >
                I agree to Jordan VTH's{" "}
                <a href="#" className="link-underline underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="link-underline underline">
                  Teams of Use
                </a>
              </Checkbox>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-block main-sign-up-button"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
