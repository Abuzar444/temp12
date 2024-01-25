import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const MyProjectStats = () => {
  const navigate = useNavigate();
  const emailContent = {
    email: "madubelasabie@gmail.com",
    subject: "Create Project Request",
    message:
      "<h5>Hi Sabie</h5>, <p>Sorry this is my last test email...definitely</p>",
  };

  const sendEmail2 = async (req, res) => {
    navigate("/dashboard/all-projects");
  };

  const sendEmail = async (req, res) => {
    try {
      await customFetch.post("/send", emailContent);
      toast.success("Email request sent");
      return redirect("/dashboard/all-projects");
    } catch (error) {
      toast.error("nope");
      return error;
    }
  };

  return (
    <div>
      <button className="btn" onClick={sendEmail2}>
        Send Email
      </button>
    </div>
  );
};

export default MyProjectStats;
