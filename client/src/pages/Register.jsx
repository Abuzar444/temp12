import React from "react";

import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Link, redirect, useNavigation, Form } from "react-router-dom";
import { Logo, FormRow } from "../components";
import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success(
      "Registration successful. Please check your email to verify account"
    );
    return redirect("/check-verification-email");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="POST" className="form">
        <Logo />
        <h4>Register</h4>
        <div className="form-row">
          <FormRow type="text" name="name" />
          <FormRow type="text" name="lastName" labelText="last name" />

          <FormRow type="email" name="email" />
          <FormRow type="password" name="password" />
        </div>
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit"}
        </button>
        <p>
          Are You Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
