import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import customFetch from "../utils/customFetch";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyEmail = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const query = useQuery();

  const verifyToken = async () => {
    setLoading(true);
    console.log(query.get("token"));
    console.log("fudge");
    try {
      const { data } = await customFetch.post("/auth/verify-email", {
        verificationToken: query.get("token"),
        email: query.get("email"),
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  if (loading) {
    return (
      //<Wrapper className="page">
      <h2>Loading...</h2>
      //</Wrapper>
    );
  }

  if (error) {
    return (
      //<Wrapper className="page">
      <h4>There was an error, please check your verification link. </h4>
      //</Wrapper>
    );
  }

  return (
    //<Wrapper className="page">
    <>
      <h2>Account Confirmed</h2>
      <Link to="/login" className="btn">
        Please login
      </Link>
    </>
    // </Wrapper>
  );
};

export default VerifyEmail;
