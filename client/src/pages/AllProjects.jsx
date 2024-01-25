import React from "react";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import {
  useLoaderData,
  useNavigate,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import { useContext, createContext } from "react";
import { ProjectsContainer, SearchContainer } from "../components";
import { Loading } from "../components";
const AllProjectsContext = createContext();

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const { data } = await customFetch.get("/projects", {
      params,
    });

    return {
      data,
      searchValues: { ...params },
    };
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const AllProjects = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  const { data, searchValues } = useLoaderData();

  return (
    <AllProjectsContext.Provider value={{ data, searchValues }}>
      {isPageLoading ? (
        <Loading />
      ) : (
        <>
          <SearchContainer />
          <ProjectsContainer />
        </>
      )}
    </AllProjectsContext.Provider>
  );
};

export const useAllProjectsContext = () => useContext(AllProjectsContext);

export default AllProjects;
