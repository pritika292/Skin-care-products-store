import React, { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { RiArrowGoBackLine } from "react-icons/ri";
import { toast } from "react-toastify";

function register({ setAuthMenu }) {
  const [password_error, setpassword_error] = useState(false);
  const [loading, setloading] = useState(false);
  const [UserInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(UserInput),
      });
      if (!response.ok) {
        const response_data = await response.json();
        switch (response_data.msg) {
          case "password: wrong format":
            toast.error("PASSWORD FORMAT IS INVALID");
            setpassword_error(true);
            break;
          case "email: wrong format":
            toast.error("EMAIL IS INVALID");
            break;
          case "username or email already exists":
            toast.error("USERNAME OR EMAIL ALREADY EXISTS");
            break;
          default:
            toast.error("Invalid INPUT");
        }
        setloading(false);
        return;
      }
      const data = await response.json();
      toast.success(data.msg);
      setloading(false);
      setAuthMenu(true);
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (e) => {
    setUserInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="tw-space-y-5 tw-pl-[2rem] tw-pr-[2rem] tw-pt-[15%] lg:tw-w-[25rem] tw-mx-auto"
    >
      <div className="tw-flex tw-justify-between">
        <h1 className="tw-text-2xl tw-font-medium">Register</h1>
        <a
          className="tw-w-[30%] tw-flex tw-justify-end tw-items-center tw-gap-2 tw-cursor-pointer tw-underline tw-text-center"
          onClick={() => setAuthMenu(true)}
        >
          <RiArrowGoBackLine />
        </a>
      </div>

      <label
        htmlFor="email"
        className="tw-mb-2 tw-text-sm tw-font-medium"
      >
        User Name
      </label>
      <input
        type="text"
        id="username"
        name="username"
        className="input"
        required
        onChange={handleChange}
      />
      <label
        htmlFor="email"
        className="tw-mb-2 tw-text-sm tw-font-medium"
      >
        Email
      </label>
      <input
        type="text"
        id="email"
        name="email"
        className="input"
        required
        onChange={handleChange}
      />

      <label
        htmlFor="email"
        className="tw-mb-2 tw-text-sm tw-font-medium"
      >
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="************"
        className="input"
        required
        onChange={handleChange}
      />
      {password_error ? (
        <p className="tw-text-sm tw-text-red-600">
          A password must contain at least 12 characters, with at least 1
          digits, 1 lower case letter, 1 upper case letter and 1 special
          character.
        </p>
      ) : null}
      <div className="tw-flex tw-justify-center tw-items-center">
        <button
          type="submit"
          className="tw-mt-4 tw-inline-block tw-cursor-pointer tw-rounded-md tw-border-2 tw-border-cyan-200 tw-bg-cyan-100 tw-px-3 tw-py-1 tw-no-underline tw-shadow-md tw-shadow-cyan-300 tw-duration-500 hover:tw-bg-cyan-300 tw-w-[32%] tw-h-10 tw-text-center tw-font-medium hover:tw-scale-105"
        >
          {/* render loading anamiation if is loading */}
          {loading ? (
            <div className="tw-flex tw-items-center tw-justify-center tw-gap-3">
              <div className="tw-animate-spin">
                <ImSpinner8 />
              </div>
              Loading...
            </div>
          ) : (
            <p>Register</p>
          )}
        </button>
      </div>
    </form>
  );
}

export default register;
