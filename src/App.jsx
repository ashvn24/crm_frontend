import React from "react";
import Core from "./User/Core";
import { Route, Routes } from "react-router-dom";
import Signup from "./User/Signup"
import SignIn from "./User/SignIn"
import AuthLayout from "./User/AuthLayout";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
    <Toaster />
    <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" exact element={<SignIn />} />
        </Route>

        <Route path="/index" element={<Core />} />
    </Routes>
      
    </>
  );
}

export default App;
