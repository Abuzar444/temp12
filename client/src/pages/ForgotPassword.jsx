import React from "react";
import { Form, Link, redirect, useNavigation } from "react-router-dom";
import FormRow from "../components/FormRow";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import customFetch from "../utils/customFetch";
import { Logo } from "../components";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/forgot-password", data);
    toast.success("Please check your email for reset password link");
    return redirect("/check-email");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const ForgotPassword = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="Post" className="form">
        <Logo />
        <h4>Forgot Password</h4>
        <FormRow type="email" name="email" />

        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting
            ? "Getting Reset Password Link..."
            : "Get Reset Password Link"}
        </button>

        <p>
          Just remembered your password?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default ForgotPassword;
