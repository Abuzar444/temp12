import React, { useEffect, useRef, useState } from "react";
import { ChemicalComponent, FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/AddProject";
import { useLoaderData, useOutletContext } from "react-router-dom";

import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { nanoid } from "nanoid";

let chemicalList = [
  "Aluminium Sulphate",
  "Ammonium Sulphate",
  "Calcium Nitrate",
  "Chlorine Dioxide",
  "Citric Acid",
  "Ferric Chloride",
  "Ferric Sulphate",
  "Hydrochloric Acid",
  "Hydrogen Peroxide",
  "Lime",
  "MSP",
  "Ortho.",
  "PAC",
  "PACl",
  "Poly",
  "Potassium Hydroxide",
  "Sodium Aluminate",
  "Sodium Bisulphite",
  "Sodium Carbonate",
  "Sodium Chlorite",
  "Sodium Hydroxide",
  "Sodium Hypochlorite",
  "Sodium Metabisulphite",
  "Sodium Nitrate",
  "Sulphuric Acid",
];

let people = [
  "Aaron Jones",
  "Adrian Suchojad",
  "Alan Stevenson",
  "Alana Wilks",
  "Andrew Dickson",
  "Andrew Knight",
  "Andrew McCrone",
  "Andrew Williamson",
  "Andy Louden",
  "Austin Watson",
  "Barry Dolan",
  "Barry Middelton",
  "Benjamin Faulkner",
  "Ben Nicolson",
  "Ben Wardrop",
  "Ben Young",
  "Brian Linnen",
  "Callum George",
  "Cameron Smyth",
  "Charles Greig",
  "Ciaran McClelland",
  "Connor MacAulay",
  "Connor Morton",
  "Conor McDowall",
  "Craig Garvie",
  "Craig Thorburn ",
  "Daniel Bisset",
  "Daniel Carey",
  "David Kydd",
  "David Selkirk",
  "Deivids Valds",
  "Erin Donnelly",
  "Euan McCall",
  "Fidel Bernardez",
  "Gary Callachan",
  "Gary Lloyd",
  "Gary McGeouch",
  "Gavin Hughes",
  "Gavin Mitchell",
  "George McGee",
  "Gordon Chalmers ",
  "Graham Rees",
  "Grant MacMillan",
  "Isaac Stanton",
  "Jack Brisbane",
  "Jack McDonald",
  "Jack Overfield",
  "Jamie Aird",
  "Jamie Grattan",
  "Jamie Young",
  "Jay Buglass",
  "Jay Tullis",
  "Joe Kelly",
  "John Copeland",
  "John Stevenson",
  "Kai Stewart",
  "Katie Peacock",
  "Karen McGeouch",
  "Kenny Mitchell",
  "Kevin Brodie",
  "Kevin Collier",
  "Kevin Whitelaw",
  "Kieran Park",
  "Laura Hill",
  "Leon Doig",
  "Lewis Scott",
  "Lewis Witherspoon",
  "Liam Fleming",
  "Liam Mann",
  "Liam Taylor",
  "Luke Mayhew",
  "Luke Morley",
  "Mark Bennie",
  "Mark Tench",
  "Michael Gollogly",
  "Michael Law",
  "Natasha Wood- Wakefield",
  "Nelson Wamala",
  "Nikki Christie",
  "Paris Koullias",
  "Raymond Murray",
  "Robert Adamson",
  "Robert Kettles",
  "Ross Brydie",
  "Ross Hopgood",
  "Ross McLoughlin",
  "Ryan Jeffrey",
  "Ryan Latimer",
  "Ryan Meek",
  "Ryan Watson",
  "Ryan Young",
  "Sarah Lovell",
  "Scott Morley",
  "Simon Butchart",
  "Stephen Mullen",
  "Steve Creene",
  "Steven Drummond",
  "Stuart Black",
  "Stuart Johnston",
  "Stuart Nicholson",
  "Stuart Parker",
  "Vaclav Prokes",
  "Wayne Henderson ",
  "William Barlas",
  "William Russell",
];

let personnel;
let chemicals;
let newList;
let newListArray2;
let newWorkItemArray;
let workItemArray;
let nameOfUser;
let initialList;

export const loader = async ({ request, params }) => {
  try {
    const { data } = await customFetch.get(`/projects/${params.id}`);

    personnel = data.project.projectPersonnel;

    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return redirect("/dashboard/all-projects");
  }
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (data.projectNumber === "") {
    toast.error("please enter a project number");
    return null;
  }

  if (data.projectTitle === "") {
    toast.error("please enter a project title");
    return null;
  }

  if (
    data.contractValue === "" ||
    data.designLead === "" ||
    data.contractType === "" ||
    data.projectManager === "" ||
    data.spm === "" ||
    data.location === "" ||
    data.siteType === "" ||
    !data.chemicals ||
    !data.projectPersonnel
  ) {
    toast.error(
      `please ensure all fields have been filled in. If certain fields are not relevant then please select 'none' or 'other' `
    );
    return null;
  }
  let chemicalboxes = true;
  if (newListArray2 === undefined) {
    initialList.map((item) => {
      if (item.status === false) {
        toast.error(
          "Please ensure all Chemical/ Work Items have confirmed status before submitting project"
        );

        window.scrollTo(0, document.body.scrollHeight);
        chemicalboxes = false;
      }
    });
  } else {
    newListArray2.map((item) => {
      if (item.status === false) {
        toast.error(
          "Please ensure all Chemical/ Work Items have confirmed status before submitting project"
        );

        window.scrollTo(0, document.body.scrollHeight);
        chemicalboxes = false;
      }
    });
  }

  if (chemicalboxes === false) {
    return null;
  }

  if (personnel.indexOf(data.projectManager) === -1) {
    personnel.push(data.projectManager);
  }
  if (personnel.indexOf(data.designLead) === -1) {
    personnel.push(data.designLead);
  }
  if (personnel.indexOf(data.spm) === -1) {
    personnel.push(data.spm);
  }

  data.projectPersonnel = personnel;
  data.chemicals = chemicals;

  data.equipment = [
    {
      name: "Chemical Tank",
      count: data.ChemicalTanks,
    },
    {
      name: "Dosing Kiosk",
      count: data.DosingKiosk,
    },
    {
      name: "Tanker Fill Point",
      count: data.tankerFillKiosk,
    },
    {
      name: "POA Catchpot",
      count: data.poaCatchpot,
    },
    {
      name: "MCC",
      count: data.MCC,
    },
    {
      name: "Dosing Skid",
      count: data.dosingSkid,
    },
  ];

  delete data.ChemicalTanks;
  delete data.DosingKiosk;
  delete data.dosingSkid;
  delete data.MCC;
  delete data.poaCatchpot;
  delete data.tankerFillKiosk;

  if (newWorkItemArray === undefined) {
    data.workItems = workItemArray;
  } else {
    data.workItems = newWorkItemArray;
  }

  data.updatedName = nameOfUser;

  try {
    await customFetch.patch(`/projects/${params.id}`, data);
    toast.success("Project edited successfully");
    return redirect("/dashboard/all-projects");
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditProject = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const { data } = useLoaderData();
  const { project } = data;

  nameOfUser = user.name + " " + user.lastName;

  initialList = [];
  project.workItems.map((workItem) => {
    initialList.push({ id: nanoid(), status: false });
  });

  newList = initialList;

  workItemArray = project.workItems;

  const [chemicalNumber, setChemicalNumber] = useState(initialList);
  const [workItemArray2, setWorkItemArray2] = useState(workItemArray);
  const [newListArray, setNewListArray] = useState(newList);

  let workItemObject = {
    name: "",
    siteSurveyStart: "",
    siteSurveyEnd: "",
    designStart: "",
    designEnd: "",
    workshopStart: "",
    workshopEnd: "",
    rsePremisesStart: "",
    rsePremisesEnd: "",
    siteStart: "",
    siteEnd: "",
    HAZOP: "",
    siteCommissioning: "",
    ALM: "",
    workshopPreDispatch: "",
  };

  const handleChange = () => {
    chemicalNumber.push({ id: nanoid(), status: false });
    newList = chemicalNumber;

    setNewListArray([...newList]);
    workItemArray.push(workItemObject);
    newWorkItemArray = workItemArray;

    setWorkItemArray2([...workItemArray]);

    setChemicalNumber([...chemicalNumber]);
  };

  const addToArray = (e, id) => {
    let arrayName = e.target.name;

    let value = e.target.value;

    let object = workItemArray2[id];
    Object.defineProperty(object, arrayName, {
      value: value,
    });
  };

  const removeItem = (id, workItemArrayIndex) => {
    if (workItemArray2.length === 1) {
      alert("You must have at least one work item");
      return;
    }
    workItemArray2.splice(workItemArrayIndex, 1);

    newWorkItemArray = workItemArray2;
    const newArrayMan = chemicalNumber.filter((chemical) => chemical.id !== id);

    newList = newArrayMan;
    setNewListArray([...newArrayMan]);

    newListArray2 = newArrayMan;

    setChemicalNumber(newArrayMan);
  };

  const updateStatusArray = (statusId, status = false) => {
    newListArray2 = newListArray;
    newListArray2[statusId].status = status;
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="parent">
          <Form className="form" method="POST">
            <h4 className="form-title">Edit project details</h4>
            <div className="form-center">
              <FormRow
                type="number"
                name="projectNumber"
                labelText="Project Number"
                disabled={true}
                defaultValue={project.projectNumber}
                style={{ color: "grey" }}
              />
              <FormRow
                type="text"
                name="projectTitle"
                labelText="Project Title"
                defaultValue={project.projectTitle}
              />
              <FormRow
                type="number"
                name="contractValue"
                labelText="contract value (£)"
                defaultValue={project.contractValue}
                step=".01"
              />
              <FormRowSelect
                name="client"
                labelText="client"
                list={[
                  "",
                  "Argent Energy",
                  "Diageo Distilling Ltd",
                  "Efficient Service Delivery",
                  "Intelligent Growth Solutions",
                  "Mott MacDonald Bentley Ltd",
                  "Ross-Shire Engineering",
                  "Scottish Water",
                  "South Staffs Water",
                  "South West Water",
                  "Wessex Water",
                  "Yorkshire Water",
                  "Other",
                ]}
                defaultValue={project.client}
              />

              <FormRowSelect
                name="designLead"
                labelText="design lead"
                list={[
                  "",
                  "Alan Stevenson",
                  "Alana Wilks",
                  "Andrew Dickson",
                  "Andy Louden",
                  "Ben Faulkner",
                  "Ben Nicolson",
                  "Craig Garvie",
                  "Daniel Carey",
                  "Erin Donnelly",
                  "Euan McCall",
                  "Fidel Bernardez",
                  "Gary Callachan",
                  "Gary Lloyd",
                  "Gavin Mitchell",
                  "Gordon Chalmers ",
                  "Grant MacMillan",
                  "Isaac Stanton",
                  "Jack Brisbane",
                  "Jack Overfield",
                  "Kai Stewart",
                  "Kieran Park",
                  "Laura Hill",
                  "Leon Doig",
                  "Lewis Scott",
                  "Nelson Wamala",
                  "Paris Koullias",
                  "Raymond Murray",
                  "Ross Hopgood",
                  "Ryan Latimer",
                  "Ryan Watson",
                  "Stuart Johnston",
                  "Stuart Nicholson",
                  "Stuart Parker",
                  "Other",
                ]}
                defaultValue={project.designLead}
              />
              <FormRowSelect
                type="text"
                name="contractType"
                labelText="contract type"
                list={[
                  "",
                  "PSC",
                  "Design & Build",
                  "Construction",
                  "PO",
                  "Other",
                ]}
                defaultValue={project.contractType}
              />
              <FormRowSelect
                type="text"
                name="projectManager"
                labelText="project manager"
                list={[
                  "",
                  "Andrew McCrone",
                  "Ben Nicholson",
                  "David Kydd",
                  "Gary Callachan",
                  "Gary Lloyd",
                  "Grant MacMillan",
                  "Isaac Stanton",
                  "Kevin Whitelaw",
                  "Mick Gollogly",
                  "Natasha Wood Wakefield",
                  "Stephen Mullen",
                  "Steve Creene",
                  "Other",
                ]}
                defaultValue={project.projectManager}
              />
              <FormRowSelect
                type="text"
                name="spm"
                labelText="Senior PM"
                list={[
                  "",
                  "Mark Tench",
                  "Andrew Knight",
                  "Ryan Latimer",
                  "Other",
                ]}
                defaultValue={project.spm}
              />
              <FormRowSelect
                type="text"
                name="projectType"
                labelText="Project Type"
                list={[
                  "",
                  "H&S",
                  "Standard Product",
                  "Chemical Dosing (Conventional)",
                  "Other",
                ]}
                defaultValue={project.projectType}
              />

              <FormRowSelect
                type="text"
                name="location"
                list={[
                  "",
                  "Aberdeen and North East",
                  "Highlands and Islands (Scotland)",
                  "Tayside, Central and Fife",
                  "Edinburgh and Lothians",
                  "Glasgow and Strathclyde",
                  "Scotland South",
                  "England",
                  "Wales",
                  "Ireland",
                  "Outside UK",
                ]}
                defaultValue={project.location}
              />
              <FormRowSelect
                type="text"
                name="siteType"
                labelText="site type"
                list={[
                  "",
                  "Water Treatment Works",
                  "Waste Water Treatment Works",
                  "Service Reservoir",
                  "Other",
                ]}
                defaultValue={project.siteType}
              />
              <FormRowSelect
                type="text"
                name="projectStatus"
                labelText="Project Status"
                list={[
                  "",
                  "Enquiry",
                  "Estimate",
                  "Site Survey",
                  "Design",
                  "Workshop",
                  "On Other Premises",
                  "Site",
                ]}
                defaultValue={project.projectStatus}
              />
            </div>
            <div className="form-center-multi">
              <div className="form-row">
                <label className="form-label">
                  Select all chemicals used in this project (Hold CTRL for
                  multiple selection)
                </label>
                <select
                  className="form-select multi"
                  name="chemicals"
                  multiple="multiple"
                  onChange={(e) => {
                    let value = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    chemicals = value;
                  }}
                >
                  <option>None</option>
                  {chemicalList.map((chemical, index) => {
                    {
                      return project.chemicals.includes(chemical) ? (
                        <option key={index} selected>
                          {chemical}
                        </option>
                      ) : (
                        <option key={index}>{chemical}</option>
                      );
                    }
                  })}
                </select>
              </div>

              <div className="form-row">
                <label className="form-label">
                  Select all personnel involved in this project (Hold CTRL for
                  multiple selection)
                </label>
                <select
                  className="form-select multi"
                  name="projectPersonnel"
                  multiple="multiple"
                  onChange={(e) => {
                    let value = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    personnel = value;
                  }}
                >
                  <option> None </option>
                  {people.map((person, index) => {
                    {
                      return project.projectPersonnel.includes(person) ? (
                        <option key={index} selected>
                          {person}
                        </option>
                      ) : (
                        <option key={index}>{person}</option>
                      );
                    }
                  })}
                </select>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">Project Description</label>

              <textarea
                defaultValue={project.projectDescription}
                className="form-select comments"
                id="w3review"
                name="projectDescription"
                rows="4"
                cols="60"
                placeholder="Use this box to provide a brief description of the project and what is entailed"
              ></textarea>
            </div>

            <div className="form-row">
              <label className="form-label">Project Comments</label>

              <textarea
                defaultValue={project.projectComments}
                className="form-select comments"
                id="w3review"
                name="projectComments"
                rows="4"
                cols="60"
                placeholder="Use this box to enter additional details regarding the project e.g. blockers, elaborate on what stage the project is at, explain what is currently happening in design, workshop, on site etc. This should be updated as the project develops"
              ></textarea>
            </div>

            <h5 className="form-title">Equipment</h5>
            <div className="form-center">
              <FormRow
                type="number"
                name="dosingSkid"
                labelText="No. of Dosing Skids"
                defaultValue={project.equipment[5].count || 0}
              />
              <FormRow
                type="number"
                name="DosingKiosk"
                labelText="No. of Dosing Kiosks"
                defaultValue={project.equipment[1].count || 0}
              />
              <FormRow
                type="number"
                name="poaCatchpot"
                labelText="No. of POA Catchpots"
                defaultValue={project.equipment[3].count || 0}
              />
              <FormRow
                type="number"
                name="tankerFillKiosk"
                labelText="No. of Tanker Fill Kiosks"
                defaultValue={project.equipment[2].count || 0}
              />
              <FormRow
                type="number"
                name="ChemicalTanks"
                labelText="No. of chemical tanks"
                defaultValue={project.equipment[0].count || 0}
              />
              <FormRow
                type="number"
                name="MCC"
                labelText="No. of MCC's"
                defaultValue={project.equipment[4].count || 0}
              />
            </div>

            <button
              className="btn btn-block form-btn"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "updating" : "update project"}
            </button>
          </Form>

          <div>
            <button
              className="btn btn-block form-btn"
              type="button"
              onClick={() => {
                handleChange();
                window.scrollTo(0, document.body.scrollHeight);
              }}
            >
              Add Chemical / Work Item
            </button>
          </div>
        </div>

        {chemicalNumber.map((item, index) => {
          return (
            <ChemicalComponent
              key={item.id}
              blob={index + 1}
              removeItem={removeItem}
              {...item}
              addToArray={addToArray}
              updateStatusArray={updateStatusArray}
              {...project}
              workItemArray2={workItemArray2}
              workItemArray={workItemArray}
              // newWorkItemArray={newWorkItemArray}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default EditProject;
