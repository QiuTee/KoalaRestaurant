import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SigninButton from "../Button/SigninButton";

export default function Formlogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = () => {
    let tempErrors = {};

    if (!email) {
      tempErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      tempErrors.email = "Email is not valid";
    }

    if (!password) {
      tempErrors.password = "Password is required";
    }

    setErrors(tempErrors);

    if (Object.keys(tempErrors).length === 0) {
      console.log("Sign in successful");
    }
  };

  return (
    <div className="w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
      <h1 className="text-5xl font-semibold">Welcome to our restaurant</h1>
      <p className="font-medium text-lg text-gray-500 mt-4">
        Welcome! Please enter your details.
      </p>
      <div className="mt-8">
        <div className="flex flex-col">
          <label className="text-lg font-medium">Email</label>
          <input
            className={`w-full border-2 ${
              errors.email ? "border-red-500" : "border-gray-100"
            } rounded-xl p-4 mt-1 bg-transparent`}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <span className="text-red-500 mt-1">{errors.email}</span>
          )}
        </div>
        <div className="flex flex-col mt-4">
          <label className="text-lg font-medium">Password</label>
          <input
            className={`w-full border-2 ${
              errors.password ? "border-red-500" : "border-gray-100"
            } rounded-xl p-4 mt-1 bg-transparent`}
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="text-red-500 mt-1">{errors.password}</span>
          )}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <button className="font-medium text-base text-orange-500">
            Forgot password
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-y-4 items-center">
          <button
          onClick={handleSubmit}>
            <SigninButton />
          </button>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <p className="font-medium text-base">Don't have an account?</p>
          <button
            className="ml-2 font-medium text-base text-orange-500"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
