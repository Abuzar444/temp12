import React from "react";
import {
  redirect,
  useLoaderData,
  useOutletContext,
  Link,
  Form,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/MoreInfo.js";
import ProjectInfo from "../components/ProjectInfo";
import { GiFinishLine } from "react-icons/gi";

import { GiWaterTower } from "react-icons/gi";

import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaFileContract,
  FaComments,
  FaPen,
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
import { AiOutlineMessage } from "react-icons/ai";
import { PiPersonSimpleRunBold } from "react-icons/pi";

import day from "dayjs";

import { GiWaterTank } from "react-icons/gi";
import { IoOptions } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineWarehouse } from "react-icons/md";

import { TbMoneybag } from "react-icons/tb";
import { MdOutlineScience } from "react-icons/md";

export const loader = async ({ request, params }) => {
  try {
    const { data } = await customFetch.get(`/projects/${params.id}`);

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-projects");
  }
};

const MoreInfo = () => {
  const { project } = useLoaderData();

  const {
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
    workItems,
    projectComments,
    equipment,
    projectPersonnel,
    projectDescription,
    projectStart,
    projectEnd,
  } = project;

  const convertNumbertoPounds = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "GBP",
  });

  const dateCreated = day(createdAt).format("DD MMM YYYY");
  const dateUpdated = day(updatedAt).format("DD MMM YYYY");
  const projectEndMod = day(projectEnd).format("DD MMM YYYY");

  const projectStartMod = day(projectStart).format("DD MMM YYYY");
  const { user } = useOutletContext();
  let chemicalList = chemicals.join(", ");
  if (chemicals.length === 0) {
    chemicalList = "No Chemicals Listed";
  }
  return (
    <Wrapper>
      <div className="container">
        <div className="parent">
          <header>
            <div className="main-icon">{projectTitle.charAt(0)}</div>
            <div className="info">
              <h5>{projectNumber}</h5>
              <p>{projectTitle}</p>
            </div>
          </header>
          <div className="content">
            <div className="content-center">
              <ProjectInfo
                icon={<MdOutlineScience />}
                text={chemicalList}
                style={{ lineHeight: 1.4 }}
              />
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

              <ProjectInfo
                icon={<FaPersonDrowning />}
                text={`Design Lead: ${designLead}`}
              />

              <ProjectInfo
                icon={<BsBarChartSteps />}
                text={`project stage: ${projectStatus}`}
              />
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
                text={`Updated: ${
                  dateUpdated === dateCreated ? "N/A" : dateUpdated
                } ${updatedName > "" ? `(by ${updatedName})` : ""}`}
              />
              {/* <ProjectInfo
                style={{ lineHeight: 1.3 }}
                icon={<PiPersonSimpleRunBold />}
                text={"project start: " + projectStartMod}
              />
              <ProjectInfo
                style={{ lineHeight: 1.3 }}
                icon={<GiFinishLine />}
                text={"project finish: " + projectEndMod}
              /> */}
              <ProjectInfo
                style={{ lineHeight: 1.3 }}
                icon={<FaPen />}
                text={
                  projectDescription
                    ? projectDescription
                    : "No description so far"
                }
              />
              <ProjectInfo
                style={{}}
                icon={<AiOutlineMessage />}
                text={
                  projectComments ? ` ${projectComments}` : "No comments so far"
                }
              />
              <ProjectInfo
                style={{ lineHeight: 1.3 }}
                icon={<IoIosPeople />}
                text={projectPersonnel.map((personnel) => {
                  return personnel + ", ";
                })}
              />
              <ProjectInfo
                style={{ lineHeight: 1.3 }}
                icon={<MdOutlineWarehouse />}
                text={equipment.map((item) => {
                  {
                    return item.count > 0 && item.count < 2
                      ? item.count + " " + item.name + ", "
                      : item.count > 1
                      ? item.count + " " + item.name + "s, "
                      : "";
                  }
                })}
              />
            </div>
          </div>
        </div>

        {workItems.map((workItem, index) => {
          return (
            <>
              <div className="child">
                <header className="parent2">
                  <div className="main-icon">{index + 1}</div>
                  <div className="info">
                    <h5>{workItem.name}</h5>
                    <p>Key Dates</p>
                  </div>
                </header>
                <div className="content">
                  <div className="content-center2">
                    <ProjectInfo
                      style={{ lineHeight: 1.3, fontSize: 14 }}
                      icon={<FaCalendarAlt style={{ color: "#cccccc1af" }} />}
                      text={
                        workItem.siteSurveyStart
                          ? `Site Survey: ${day(
                              workItem.siteSurveyStart
                            ).format("DD MMM YY")} - ${day(
                              workItem.siteSurveyEnd
                            ).format("DD MMM YY")} `
                          : "Site Survey: Not Provided"
                      }
                    />
                    <ProjectInfo
                      style={{ lineHeight: 1.3, fontSize: 14 }}
                      icon={<FaCalendarAlt style={{ color: "#0047ab" }} />}
                      text={
                        workItem.designStart
                          ? `Design: ${day(workItem.designStart).format(
                              "DD MMM YY"
                            )} - ${day(workItem.designEnd).format(
                              "DD MMM YY"
                            )} `
                          : "Design: Not Provided"
                      }
                    />
                    <ProjectInfo
                      style={{ lineHeight: 1.3, fontSize: 14 }}
                      icon={<FaCalendarAlt style={{ color: "#006680" }} />}
                      text={
                        workItem.HAZOP
                          ? `HAZOP: ${day(workItem.HAZOP).format("DD MMM YY")} `
                          : "HAZOP: Not Provided"
                      }
                    />
                    <ProjectInfo
                      style={{ lineHeight: 1.3, fontSize: 14 }}
                      icon={<FaCalendarAlt style={{ color: "#E3C565" }} />}
                      text={
                        workItem.workshopStart
                          ? `Workshop: ${day(workItem.workshopStart).format(
                              "DD MMM YY"
                            )} - ${day(workItem.workshopEnd).format(
                              "DD MMM YY"
                            )} `
                          : "Workshop: Not Provided"
                      }
                    />
                    <ProjectInfo
                      style={{ lineHeight: 1.3, fontSize: 14 }}
                      icon={<FaCalendarAlt style={{ color: "#008055" }} />}
                      text={
                        workItem.preDispatch
                          ? `Pre-dispatch: ${day(workItem.preDispatch).format(
                              "DD MMM YY"
                            )}`
                          : "Pre-Dispatch: Not Provided"
                      }
                    />

                    <ProjectInfo
                      style={{ lineHeight: 1.3, fontSize: 14 }}
                      icon={<FaCalendarAlt style={{ color: "#800000" }} />}
                      text={
                        workItem.rsePremisesStart
                          ? `Other Premises: ${day(
                              workItem.rsePremisesStart
                            ).format("DD MMM YY")} - ${day(
                              workItem.rsePremisesEnd
                            ).format("DD MMM YY")} `
                          : "Other Premises: Not Provided"
                      }
                    />
                    <ProjectInfo
                      style={{ lineHeight: 1.3, fontSize: 14 }}
                      icon={<FaCalendarAlt style={{ color: "#620080" }} />}
                      text={
                        workItem.siteStart
                          ? `Site: ${day(workItem.siteStart).format(
                              "DD MMM YY"
                            )} - ${day(workItem.siteEnd).format("DD MMM YY")} `
                          : "Site: Not Provided"
                      }
                    />
                    <ProjectInfo
                      style={{ lineHeight: 1.3, fontSize: 14 }}
                      icon={<FaCalendarAlt style={{ color: "#80007a" }} />}
                      text={
                        workItem.commissioning
                          ? `Commissioning: ${day(
                              workItem.commissioning
                            ).format("DD MMM YY")} `
                          : "Commissioning: Not Provided"
                      }
                    />
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default MoreInfo;
