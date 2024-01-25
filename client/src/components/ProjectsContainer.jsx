import React from "react";
import Project from "./Project";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllProjectsContext } from "../pages/AllProjects";
import PageBtnContainer from "./PageBtnContainer";
import { useOutletContext } from "react-router-dom";

const ProjectsContainer = () => {
  const { data } = useAllProjectsContext();
  const { user } = useOutletContext();

  const { projects, totalProjects, numOfPages } = data;

  projects.map((project) => {
    return project.projectPersonnel.map((personnel) => {
      if (user.name + " " + user.lastName === personnel) {
        return <Project key={project._id} {...project} />;
      }
    });
  });

  if (projects.length === 0) {
    return (
      <Wrapper>
        <h2>No Projects to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalProjects} project{projects.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {projects.map((project) => {
          return <Project key={project._id} {...project} />;
        })}
      </div>

      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default ProjectsContainer;
