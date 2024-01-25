import React from "react";

import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ params }) => {
  let deleteText =
    "Are you sure you wish to delete this project? You should only delete projects if they are on the system by error. If the job is complete then edit the job status to 'Complete' so the job gets stored in archive. If you still wish to delete the job, click 'OK'. Once deleted, the project cannot be recovered";
  if (confirm(deleteText) === true) {
    try {
      await customFetch.delete(`/projects/${params.id}`);
      toast.success("Project deleted successfully");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
    return redirect("/dashboard/all-projects");
  } else {
    return redirect("/dashboard/all-projects");
  }
};
