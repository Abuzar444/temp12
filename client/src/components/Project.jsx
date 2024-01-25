import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaFileContract,
} from "react-icons/fa";
import { PiProjectorScreenLight } from "react-icons/pi";
import { BsBarChartSteps } from "react-icons/bs";
import {
  FaPersonWalkingWithCane,
  FaPersonHarassing,
  FaPersonDrowning,
  FaPersonCircleCheck,
  FaChartGantt,
  FaIndustry,
} from "react-icons/fa6";
import { GiWaterTower } from "react-icons/gi";

import { GiWaterTank } from "react-icons/gi";
import { IoOptions } from "react-icons/io5";

import { TbMoneybag } from "react-icons/tb";
import { MdOutlineScience } from "react-icons/md";
import { Link, Form, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import ProjectInfo from "./ProjectInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { created } from "@syncfusion/ej2-react-grids";
day.extend(advancedFormat);

const Project = ({
  _id,
  projectNumber,
  projectStatus,
  projectTitle,
  siteType,
  createdAt,
  updatedAt,
  chemicals,
  createdBy,
  contractType,
  projectManager,
  contractValue,
  designLead,
  spm,
  client,
  location,
  updatedName,
  addedName,
}) => {
  const convertNumbertoPounds = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
  });

  const dateCreated = day(createdAt).format("DD MMM YYYY hh:mm");
  const dateUpdated = day(updatedAt).format("DD MMM YYYY hh:mm");
  const { user } = useOutletContext();
  let chemicalList = chemicals.join(", ");
  if (chemicals.length === 0) {
    chemicalList = "No Chemicals Listed";
  }

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{projectTitle.charAt(0)}</div>
        <div className="info">
          <h5>{projectNumber}</h5>
          <p>{projectTitle}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          {/* <ProjectInfo
            icon={<MdOutlineScience />}
            text={chemicalList}
            style={{ lineHeight: 1.4 }}
          /> */}
          <ProjectInfo icon={<FaLocationArrow />} text={` ${location}`} />
          <ProjectInfo icon={<GiWaterTower />} text={siteType} />
          <ProjectInfo
            icon={<FaPersonCircleCheck />}
            text={`client: ${client}`}
          />
          <ProjectInfo icon={<FaFileContract />} text={contractType} />
          <ProjectInfo
            icon={<FaPersonWalkingWithCane />}
            text={`PM: ${projectManager}`}
          />
          <ProjectInfo icon={<FaPersonHarassing />} text={`SPM: ${spm}`} />

          {/* <ProjectInfo
            icon={<FaPersonDrowning />}
            text={`Design Lead: ${designLead}`}
          /> */}

          {/* <ProjectInfo
            icon={<BsBarChartSteps />}
            text={`project stage: ${projectStatus}`}
          /> */}
          <ProjectInfo
            icon={<TbMoneybag />}
            text={
              contractValue
                ? `Contract value: ${convertNumbertoPounds.format(
                    Number(contractValue)
                  )}`
                : "Contract Value: No Value"
            }
          />
          <ProjectInfo
            style={{ lineHeight: 1.3 }}
            icon={<FaCalendarAlt />}
            text={`Added: ${dateCreated} ${
              addedName > "" ? `(by ${addedName})` : ""
            }`}
          />

          <ProjectInfo
            style={{ lineHeight: 1.3 }}
            icon={<FaCalendarAlt />}
            text={`Updated: ${updatedAt === createdAt ? "N/A" : dateUpdated} ${
              updatedName > "" ? `(by ${updatedName})` : ""
            }`}
          />
        </div>
        <footer className="actions">
          {user.name + " " + user.lastName === projectManager ||
          user.role === "admin" ? (
            <Link to={`../edit-project/${_id}`} className="btn edit-btn">
              Edit
            </Link>
          ) : (
            ""
          )}
          <Link to={`../more-info/${_id}`} className="btn edit-btn">
            More Info
          </Link>

          <Form method="post" action={`../delete-project/${_id}`}>
            <button
              type="submit"
              className="btn delete-btn"
              style={{ backgroundColor: "red" }}
            >
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Project;
