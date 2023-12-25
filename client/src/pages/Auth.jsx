import React, { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Login from "../components/Auth/sign";
import Register from "../components/Auth/register";

function Auth() {
  const [AuthMenu, setAuthMenu] = useState(true);
  return (
    <>
      <Header pageBG="tw-bg-sky-100" />
      <section className="tw-bg-gradient-to-b tw-from-sky-100 tw-via-blue-200 tw-to-cyan-200 tw-h-[calc(100vh-2.5rem)]">
        {AuthMenu ? (
          <Login setAuthMenu={setAuthMenu} />
        ) : (
          <Register setAuthMenu={setAuthMenu} />
        )}
      </section>
      <Footer />
    </>
  );
}

export default Auth;
