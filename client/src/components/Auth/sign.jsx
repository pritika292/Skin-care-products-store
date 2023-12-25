import React, { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/auth/userSlice";
import { useNavigate } from "react-router-dom";

function sign({ setAuthMenu }) {
  const [loading, setloading] = useState(false);
  const [UserInput, setUserInput] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(UserInput),
      });
      if (!response.ok) {
        const response_data = await response.json();
        switch (response_data.msg) {
          case "email not found":
            toast.error("NO SUCH EMAIL FOUND");
            break;
          case "wrong password":
            toast.error("INVALID PASSWORD");
            break;
          default:
            toast.error("Invalid Email or Password");
        }
        setloading(false);
        return;
      }
      const data = await response.json();
      dispatch(setUser(data));
      setloading(false);
      if (data.isAdmin) {
        navigate("/search");
      } else {
        navigate("/");
      }

      toast.success("LOGIN SUCCESSFUL !!!");
    } catch (e) {}
  };
  const handleChange = (e) => {
    setUserInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="tw-space-y-5 tw-pl-[2rem] tw-pr-[2rem] tw-pt-[15%] lg:tw-w-[25rem] tw-mx-auto"
    >
      <h1 className="tw-text-2xl tw-font-medium">Login</h1>

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
      <div className="tw-flex tw-justify-evenly">
        <button
          className="tw-mt-4 tw-inline-block tw-cursor-pointer tw-rounded-md tw-border-2 tw-border-cyan-200 tw-bg-cyan-100 tw-px-3 tw-py-1 tw-no-underline tw-shadow-md tw-shadow-cyan-300 tw-duration-500 hover:tw-bg-cyan-300 tw-w-[32%] tw-h-10 tw-text-center tw-font-medium hover:tw-scale-105"
          onClick={() => setAuthMenu(false)}
        >
          Register
        </button>
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
            <p>Login</p>
          )}
        </button>
      </div>
    </form>
  );
}

export default sign;
