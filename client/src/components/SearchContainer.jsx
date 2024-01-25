import React, { useState } from "react";
import { FormRow, FormRowSelect, FormRowSelectDropdown } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link, useSearchParams } from "react-router-dom";
import { useAllProjectsContext } from "../pages/AllProjects";
import { FaRotate } from "react-icons/fa6";
let refreshSort;
const SearchContainer = () => {
  const { data, searchValues } = useAllProjectsContext();
  const [searchParams] = useSearchParams();
  const [sortValue, setSortValue] = useState("");

  let x = "gitChange";

  const {
    search,
    projectNumber,
    projectTitle,
    projectStage,
    projectPersonnel,
    projectStatus,
    equipment,
    contractType,
    projectAdded,
    location,
    chemical,
    siteType,
    client,
    sort,
  } = searchValues;

  const handleChange = (e) => {
    setSortValue(e.target.value);
  };

  const submit = useSubmit();
  const debounce = (onChange) => {
    let timeout;

    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 2000);
    };
  };

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="search"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          {/* <FormRow
            type="search"
            name="projectNumber"
            labelText="Project Number"
            defaultValue={projectNumber}
            onChange={debounce((form) => {
              submit(form);
            })}
          /> */}
          {/* <FormRow
            type="search"
            name="projectTitle"
            labelText="Project Title"
            defaultValue={projectTitle}
            onChange={debounce((form) => {
              submit(form);
            })}
          /> */}
          <FormRowSelect
            labelText="Project stage"
            name="projectStatus"
            list={["Any", "Site Survey", "Design", "Workshop", "Site"]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
            defaultValue={projectStatus}
          />
          <FormRowSelect
            labelText="Personnel"
            name="projectPersonnel"
            defaultValue={projectPersonnel}
            list={[
              "All Projects",
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
              "Ben Faulkner",
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
            ]}
            onChange={(e) => {
              console.log("blob");
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="Equipment"
            name="equipment"
            list={[
              "All",
              "Dosing Kiosk",
              "Dosing Skid",
              "POA Catchpot",
              "Tanker Fill Point",
              "Chemical Tank",
              "MCC",
            ]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
            defaultValue={equipment}
          />

          <FormRowSelect
            labelText="Contract Type"
            name="contractType"
            list={[
              "All",
              "PSC",
              "Design & Build",
              "Construction",
              "PO",
              "Other",
            ]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
            defaultValue={contractType}
          />
          {/* <FormRowSelect
            labelText="Project Added"
            name="projectAdded"
            list={["All Years", "2020", "2021", "2022", "2023"]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
            defaultValue={projectAdded}
          /> */}
          <FormRowSelect
            labelText="Location"
            name="location"
            list={[
              "All",
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
            onChange={(e) => {
              refreshSort = e.target.value;
              submit(e.currentTarget.form);
            }}
            defaultValue={location}
          />
          <FormRowSelect
            labelText="Chemical"
            name="chemical"
            list={[
              "All",
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
            ]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
            defaultValue={chemical}
          />
          <FormRowSelect
            labelText="Site Type"
            name="siteType"
            list={[
              "All",
              "Water Treatment Works",
              "Waste Water Treatment Works",
              "Service Reservoir",
            ]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
            defaultValue={siteType}
          />
          <FormRowSelect
            labelText="Client"
            name="client"
            list={[
              "All",
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
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
            defaultValue={client}
          />
          <FormRowSelect
            name="sort"
            labelText="sort by"
            id="sortValue"
            list={[
              "Project Added",
              "Project Number",

              "Chemical",
              "Site Type",
              "Contract Type",
              "Client",
              "PM",
              "SPM",
              "Design Lead",
              "Project Stage",
              "Contract Value",
              "Location",
              "Last Updated",
            ]}
            onChange={(e) => {
              // handleChange(e);
              console.log(e.currentTarget.form);
              submit(e.currentTarget.form);
            }}
            defaultValue={
              sort
                ? sort.includes(2)
                  ? sort.substring(0, sort.length - 1)
                  : sort
                : ""
            }
          />
          <button
            className="btn form-btn"
            style={{ width: 60 }}
            onClick={() => {
              let rotatedSortValue;
              if (sort.includes(2)) {
                rotatedSortValue = sort.substring(0, sort.length - 1);
              } else {
                rotatedSortValue = `${sort}2`;
              }

              searchParams.set("sort", rotatedSortValue);

              submit(searchParams);
            }}
          >
            <FaRotate />
          </button>
          <Link
            to="/dashboard/all-projects"
            className="btn form-btn delete-btn"
          >
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
