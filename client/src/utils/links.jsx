import React from "react";

import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms, FaArchive } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings, MdPerson } from "react-icons/md";
import { FaChartGantt } from "react-icons/fa6";

const links = [
  { text: "add Project", path: ".", icon: <FaWpforms /> },
  { text: "Gantt Chart", path: "tracker", icon: <FaChartGantt /> },
  { text: "all projects", path: "all-projects", icon: <MdQueryStats /> },
  { text: "project stats", path: "stats", icon: <IoBarChartSharp /> },
  // { text: "profile", path: "profile", icon: <ImProfile /> },
  // { text: "my Projects", path: "my-projects", icon: <MdPerson /> },
  // {
  //   text: "my project stats",
  //   path: "my-project-stats",
  //   icon: <IoBarChartSharp />,
  // },
  // { text: "admin", path: "admin", icon: <MdAdminPanelSettings /> },
  { text: "archive", path: "archive", icon: <FaArchive /> },
];

export default links;
