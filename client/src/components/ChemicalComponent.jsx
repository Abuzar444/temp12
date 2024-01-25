import React, { useState } from "react";
import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/Chemical";

const ChemicalComponent = ({
  id,
  removeItem,
  addToArray,
  blob,
  updateStatusArray,
  workItemArray2,
  newWorkItemArray,
  workItemArray,
}) => {
  const confirmDelete = (id) => {
    console.log("id", id);
    if (
      confirm(
        "Are Your sure you want to delete this chemical / work item ?"
      ) === false
    ) {
      return;
    }

    console.log("WI2Before", workItemArray2);
    console.log("blob", blob);

    console.log("WI2After", workItemArray2);

    if (workItemArray2.length === 1) {
      alert("You must have at least one chemical / work item in your project");
      return;
    }

    workItemArray2.splice(blob - 1, 1);
    workItemArray.splice(blob - 1, 1);

    removeItem(id, blob - 1);
  };

  const checkDates = (date1, date2, stage) => {
    if (new Date(date2) - new Date(date1) < 0) {
      alert(
        `the ${stage} end date must be greater than or equal to the ${stage} start date`
      );
      return true;
    }
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();

    if (workItemName === "") {
      alert(
        `Please enter a chemical or work item name for Chemical ${blob} / Work Item ${blob} or delete the item`
      );
      return;
    }

    if (workItemName.length < 3) {
      alert("The chemical name must be at least 3 characters long");
      return;
    }

    if (checkDates(siteSurveyStart, siteSurveyEnd, "Site Survey") === true) {
      return;
    }
    if (checkDates(designStartDate, designEndDate, "Design") === true) {
      return;
    }
    if (checkDates(workshopStartDate, workshopEndDate, "Workshop") === true) {
      return;
    }
    if (
      checkDates(rsePremisesStartDate, rsePremisesEndDate, "Other Premises") ===
      true
    ) {
      return;
    }
    if (checkDates(siteStartDate, siteEndDate, "Site") === true) {
      return;
    }

    setBtnState(true);
    console.log("b2b", id);
    console.log("b2b", blob);
    updateStatusArray(blob - 1, true);
  };

  const [btnState, setBtnState] = useState(false);
  const [workItemName, setWorkItemName] = useState(
    workItemArray2[blob - 1].name !== undefined
      ? workItemArray2[blob - 1].name
      : ""
  );
  const [siteSurveyStart, setSiteSurveyStart] = useState("");
  const [siteSurveyEnd, setSiteSurveyEnd] = useState("");
  const [designStartDate, setDesignStart] = useState("");
  const [designEndDate, setDesignEnd] = useState("");
  const [workshopStartDate, setWorkshopStart] = useState("");
  const [workshopEndDate, setWorkshopEnd] = useState("");
  const [rsePremisesStartDate, setrsePremisesStart] = useState("");
  const [rsePremisesEndDate, setrsePremisesEnd] = useState("");
  const [siteStartDate, setSiteStart] = useState("");
  const [siteEndDate, setSiteEnd] = useState("");

  return (
    <form onSubmit={handleSubmit}>
      <Wrapper
        style={btnState ? { borderColor: "green" } : { borderColor: "red" }}
      >
        <h4 className="form-title">{`Chemical ${blob} / Work Item ${blob}`}</h4>
        <p style={{ fontSize: 10, marginBottom: 12, color: "red" }}>
          Estimate dates if not known. If dates are N/A then leave blank
        </p>
        <div className="form-center">
          <div className="childOf" key={id}>
            <FormRow
              type="text"
              labelText="Chemical / Work Item Name"
              maxLength="50"
              name="name"
              id="siteName"
              value={workItemName}
              onChange={(e) => {
                setWorkItemName(e.target.value);

                setBtnState(false);

                addToArray(e, blob - 1);

                updateStatusArray(blob - 1, false);
              }}
              defaultValue={
                workItemArray2[blob - 1].name !== undefined
                  ? workItemArray2[blob - 1].name
                  : ""
              }
            />
          </div>

          <FormRow
            type="date"
            name="siteSurveyStart"
            labelText="site survey start"
            onChange={(e) => {
              setBtnState(false);
              updateStatusArray(blob - 1, false);
              addToArray(e, blob - 1);
              setSiteSurveyStart(e.target.value);
            }}
            defaultValue={workItemArray2[blob - 1].siteSurveyStart}
          />
          <FormRow
            type="date"
            name="siteSurveyEnd"
            labelText="site survey End"
            onChange={(e) => {
              setBtnState(false);
              updateStatusArray(blob - 1, false);
              addToArray(e, blob - 1);
              setSiteSurveyEnd(e.target.value);
            }}
            defaultValue={workItemArray2[blob - 1].siteSurveyEnd}
          />
          <FormRow
            type="date"
            name="designStart"
            labelText="design start"
            onChange={(e) => {
              setBtnState(false);
              updateStatusArray(blob - 1, false);
              addToArray(e, blob - 1);
              setDesignStart(e.target.value);
            }}
            defaultValue={workItemArray2[blob - 1].designStart}
          />
          <FormRow
            type="date"
            name="designEnd"
            labelText="Design End"
            onChange={(e) => {
              setBtnState(false);
              updateStatusArray(blob - 1, false);
              addToArray(e, blob - 1);
              setDesignEnd(e.target.value);
            }}
            defaultValue={workItemArray2[blob - 1].designEnd}
          />
          <FormRow
            type="date"
            name="HAZOP"
            labelText="HAZOP"
            onChange={(e) => {
              setBtnState(false);
              updateStatusArray(blob - 1, false);
              addToArray(e, blob - 1);
            }}
            defaultValue={workItemArray2[blob - 1].HAZOP}
          />
          <FormRow
            type="date"
            name="ALM"
            labelText="ALM"
            onChange={(e) => {
              setBtnState(false);
              updateStatusArray(blob - 1, false);
              addToArray(e, blob - 1);
            }}
            defaultValue={workItemArray2[blob - 1].ALM}
          />
          <FormRow
            type="date"
            name="workshopStart"
            labelText="workshop start"
            onChange={(e) => {
              setBtnState(false);
              updateStatusArray(blob - 1, false);
              addToArray(e, blob - 1);
              setWorkshopStart(e.target.value);
            }}
            defaultValue={workItemArray2[blob - 1].workshopStart}
          />
          <FormRow
            type="date"
            name="workshopEnd"
            labelText="workshop end"
            onChange={(e) => {
              setBtnState(false);
              updateStatusArray(blob - 1, false);
              addToArray(e, blob - 1);
              setWorkshopEnd(e.target.value);
            }}
            defaultValue={workItemArray2[blob - 1].workshopEnd}
          />

          <FormRow
            type="date"
            name="rsePremisesStart"
            labelText="Other Premises Start"
            onChange={(e) => {
              setBtnState(false);
              updateStatusArray(blob - 1, false);
              addToArray(e, blob - 1);
              setrsePremisesStart(e.target.value);
            }}
            defaultValue={workItemArray2[blob - 1].rsePremisesStart}
          />
          <FormRow
            type="date"
            name="rsePremisesEnd"
            labelText="Other Premises End"
            onChange={(e) => {
              setBtnState(false);
              updateStatusArray(blob - 1, false);
              addToArray(e, blob - 1);
              setrsePremisesEnd(e.target.value);
            }}
            defaultValue={workItemArray2[blob - 1].rsePremisesEnd}
          />
          <FormRow
            type="date"
            name="workshopPreDispatch"
            labelText="Pre Dispatch (Workshop)"
            onChange={(e) => {
              setBtnState(false);
              updateStatusArray(blob - 1, false);
              addToArray(e, blob - 1);
            }}
            defaultValue={workItemArray2[blob - 1].workshopPreDispatch}
          />
          <FormRow
            type="date"
            name="siteCommissioning"
            labelText="site commissioning"
            onChange={(e) => {
              setBtnState(false);
              updateStatusArray(blob - 1, false);
              addToArray(e, blob - 1);
            }}
            defaultValue={workItemArray2[blob - 1].siteCommissioning}
          />
          <FormRow
            type="date"
            name="siteStart"
            labelText="site start"
            onChange={(e) => {
              setBtnState(false);
              updateStatusArray(blob - 1, false);
              addToArray(e, blob - 1);
              setSiteStart(e.target.value);
            }}
            defaultValue={workItemArray2[blob - 1].siteStart}
          />
          <FormRow
            type="date"
            name="siteEnd"
            labelText="site end"
            onChange={(e) => {
              setBtnState(false);
              updateStatusArray(blob - 1, false);
              addToArray(e, blob - 1);
              setSiteEnd(e.target.value);
            }}
            defaultValue={workItemArray2[blob - 1].siteEnd}
          />
        </div>

        <footer className="actions">
          <button
            type="button"
            className="btn delete-btn"
            style={{ backgroundColor: "red" }}
            onClick={() => {
              console.log("chemical id", id);
              // removeItem(id);
              confirmDelete(id);
            }}
          >
            Delete
          </button>
          <button
            type="submit"
            className="btn delete-btn"
            style={{ marginLeft: "10px" }}
          >
            Confirm
          </button>
        </footer>
      </Wrapper>
    </form>
  );
};

export default ChemicalComponent;
