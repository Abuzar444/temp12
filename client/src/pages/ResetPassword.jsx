import { Form, redirect, useLocation, useNavigation } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

let email;
let token;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const { password } = data;

  try {
    await customFetch.post("/auth/reset-password", {
      password: password,
      token: token,
      email: email,
    });
    toast.success("Password Reset");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const ResetPassword = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  token = new URLSearchParams(useLocation().search).get("token");
  email = new URLSearchParams(useLocation().search).get("email");

  return (
    <Wrapper>
      <Form method="Post" className="form">
        <Logo />
        <h4>Reset Password</h4>

        <FormRow type="password" name="password" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting new password..." : "submit new password"}
        </button>
      </Form>
    </Wrapper>
  );
};

export default ResetPassword;
