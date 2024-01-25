import React, { useEffect, useRef, useState, forw } from "react";
import { ChemicalComponent, FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/AddProject";
import { useActionData, useOutletContext, useSubmit } from "react-router-dom";
import { CHEMICALS, CONTRACT_TYPE, SITE_TYPE } from "../../../utils/constants";
import { Form, useNavigation, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { nanoid } from "nanoid";
import { CartesianAxis } from "recharts";

let personnel;
let chemicals;
let newList;
let newListArray2;
let workItemArray2;
let workItemArray;
let newWorkItemArray;
let initialList;

let addedName;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (data.projectNumber === "") {
    toast.error("please enter a bloody project number");
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

  data.workItems = newWorkItemArray;
  data.addedName = addedName;

  projectNumber.value = data.projectNumber;

  try {
    await customFetch.post("/projects", data);
    toast.success("project added successfully");
    workItemArray = [
      {
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
      },
    ];
    initialList = [{ id: nanoid(), status: false }];

    return redirect("all-projects");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
initialList = [{ id: nanoid(), status: false }];
newList = initialList;
workItemArray = [
  {
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
  },
];

newWorkItemArray = workItemArray;
const AddProject = () => {
  const { user } = useOutletContext();
  addedName = user.name + " " + user.lastName;

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // alert(initialList.length);

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
    newWorkItemArray = workItemArray2;
    setChemicalNumber([...chemicalNumber]);
  };

  const addToArray = (e, id) => {
    let arrayName = e.target.name;

    let value = e.target.value;

    let object = workItemArray[id];
    Object.defineProperty(object, arrayName, {
      value: value,
    });
    newWorkItemArray = workItemArray;
  };

  const removeItem = (id) => {
    const newArrayMan = chemicalNumber.filter((chemical) => chemical.id !== id);

    newList = newArrayMan;
    newWorkItemArray = workItemArray2;

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
            <h4 className="form-title">Add project details</h4>
            <div className="form-center">
              <FormRow
                type="number"
                name="projectNumber"
                labelText="Project Number"
                required
              />
              <FormRow
                type="text"
                name="projectTitle"
                labelText="Project Title"
                required
              />
              <FormRow
                type="number"
                name="contractValue"
                labelText="contract value (£)"
                step=".01"
                required
              />
              <FormRowSelect
                name="client"
                labelText="client"
                required
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
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
                  required
                  onChange={(e) => {
                    let value = Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    );
                    chemicals = value;
                  }}
                >
                  <option> None </option>
                  <option> Alum </option>
                  <option> Ammonium Sulphate </option>
                  <option> Calcium Nitrate </option>
                  <option> Chlorine Dioxide </option>
                  <option> Citric Acid </option>
                  <option> Ferric Chloride </option>
                  <option> Ferric Sulphate </option>
                  <option> Hydrochloric Acid </option>
                  <option> Hydrogen Peroxide </option>
                  <option> Orthophosphoric Acid </option>
                  <option> Lime </option>
                  <option> MSP </option>
                  <option> PAC </option>
                  <option> PACl </option>
                  <option> Poly </option>
                  <option> Potassium Hydroxide </option>
                  <option> Sodium Aluminate </option>
                  <option> Sodium Bisulphite </option>
                  <option> Sodium Carbonate </option>
                  <option> Sodium Chlorite </option>
                  <option> Sodium Hydroxide </option>
                  <option> Sodium Hypochlorite </option>
                  <option> Sodium Metabisulphite </option>
                  <option> Sodium Nitrate </option>
                  <option> Sulphuric Acid </option>
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
                  <option>Adrian Suchojad</option>
                  <option>Alan Stevenson</option>
                  <option>Alana Wilks</option>
                  <option>Andrew Dickson</option>
                  <option>Andrew Knight</option>
                  <option>Andrew McCrone</option>
                  <option>Andrew Williamson</option>
                  <option>Andy Louden</option>
                  <option>Austin Watson</option>
                  <option>Barry Dolan</option>
                  <option>Barry Middelton</option>
                  <option>Ben Faulkner</option>
                  <option>Ben Nicolson</option>
                  <option>Ben Wardrop</option>
                  <option>Ben Young</option>
                  <option>Brian Linnen</option>
                  <option>Callum George</option>
                  <option>Cameron Smyth</option>
                  <option>Charles Greig</option>
                  <option>Ciaran McClelland</option>
                  <option>Connor MacAulay</option>
                  <option>Connor Morton</option>
                  <option>Conor McDowall</option>
                  <option>Craig Garvie</option>
                  <option>Craig Thorburn </option>
                  <option>Daniel Bisset</option>
                  <option>Daniel Carey</option>
                  <option>David Kydd</option>
                  <option>David Selkirk</option>
                  <option>Deivids Valds</option>
                  <option>Erin Donnelly</option>
                  <option>Euan McCall</option>
                  <option>Fidel Bernardez</option>
                  <option>Gary Callachan</option>
                  <option>Gary Lloyd</option>
                  <option>Gary McGeouch</option>
                  <option>Gavin Hughes</option>
                  <option>Gavin Mitchell</option>
                  <option>George McGee</option>
                  <option>Gordon Chalmers </option>
                  <option>Graham Rees</option>
                  <option>Grant MacMillan</option>
                  <option>Isaac Stanton</option>
                  <option>Jack Brisbane</option>
                  <option>Jack McDonald</option>
                  <option>Jack Overfield</option>
                  <option>Jamie Aird</option>
                  <option>Jamie Grattan</option>
                  <option>Jamie Young</option>
                  <option>Jay Buglass</option>
                  <option>Jay Tullis</option>
                  <option>Joe Kelly</option>
                  <option>John Copeland</option>
                  <option>John Stevenson</option>
                  <option>Kai Stewart</option>
                  <option>Katie Peacock</option>
                  <option>Karen McGeouch</option>
                  <option>Kenny Mitchell</option>
                  <option>Kevin Brodie</option>
                  <option>Kevin Collier</option>
                  <option>Kevin Whitelaw</option>
                  <option>Kieran Park</option>
                  <option>Laura Hill</option>
                  <option>Leon Doig</option>
                  <option>Lewis Scott</option>
                  <option>Lewis Witherspoon</option>
                  <option>Liam Fleming</option>
                  <option>Liam Mann</option>
                  <option>Liam Taylor</option>
                  <option>Luke Mayhew</option>
                  <option>Luke Morley</option>
                  <option>Mark Bennie</option>
                  <option>Mark Tench</option>
                  <option>Michael Gollogly</option>
                  <option>Michael Law</option>
                  <option>Natasha Wood- Wakefield</option>
                  <option>Nelson Wamala</option>
                  <option>Nikki Christie</option>
                  <option>Paris Koullias</option>
                  <option>Raymond Murray</option>
                  <option>Robert Adamson</option>
                  <option>Robert Kettles</option>
                  <option>Ross Brydie</option>
                  <option>Ross Hopgood</option>
                  <option>Ross McLoughlin</option>
                  <option>Ryan Jeffrey</option>
                  <option>Ryan Latimer</option>
                  <option>Ryan Meek</option>
                  <option>Ryan Watson</option>
                  <option>Ryan Young</option>
                  <option>Sarah Lovell</option>
                  <option>Scott Morley</option>
                  <option>Simon Butchart</option>
                  <option>Stephen Mullen</option>
                  <option>Steve Creene</option>
                  <option>Steven Drummond</option>
                  <option>Stuart Black</option>
                  <option>Stuart Johnston</option>
                  <option>Stuart Nicholson</option>
                  <option>Stuart Parker</option>
                  <option>Vaclav Prokes</option>
                  <option>Wayne Henderson </option>
                  <option>William Barlas</option>
                  <option>William Russell</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label">Project Description</label>

              <textarea
                className="form-select comments"
                id="w3review"
                name="projectDescription"
                rows="4"
                cols="60"
                placeholder="Use this box to provide a brief description of the project and what is entailed"
                required
              ></textarea>
            </div>

            <div className="form-row">
              <label className="form-label">Project Comments</label>

              <textarea
                required
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
                required
                type="number"
                name="dosingSkid"
                labelText="No. of Dosing Skids"
                defaultValue="0"
              />
              <FormRow
                required
                type="number"
                name="DosingKiosk"
                labelText="No. of Dosing Kiosks"
                defaultValue="0"
              />
              <FormRow
                required
                type="number"
                name="poaCatchpot"
                labelText="No. of POA Catchpots"
                defaultValue="0"
              />
              <FormRow
                required
                type="number"
                name="tankerFillKiosk"
                labelText="No. of Tanker Fill Kiosks"
                defaultValue="0"
              />
              <FormRow
                required
                type="number"
                name="ChemicalTanks"
                labelText="No. of chemical tanks"
                defaultValue="0"
              />
              <FormRow
                required
                type="number"
                name="MCC"
                labelText="No. of MCC's"
                defaultValue="0"
              />
            </div>

            <button
              className="btn btn-block form-btn"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "submitting" : "submit project"}
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
              workItemArray2={workItemArray2}
              workItemArray={workItemArray}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default AddProject;
