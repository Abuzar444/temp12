import React from "react";

import Wrapper from "../assets/wrappers/JobInfo";

const ProjectInfo = ({ icon, text, style }) => {
  return (
    <Wrapper>
      <span className="job-icon">{icon}</span>
      <span className="job-text" style={style}>
        {text}
      </span>
    </Wrapper>
  );
};

export default ProjectInfo;
