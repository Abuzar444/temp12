import React from "react";

const FormRowSelectDropdown = ({
  type,
  name,
  labelText,
  listItems,
  defaultValue,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        className="form-select"
        list="numbers"
        defaultValue={defaultValue}
      />
      <datalist id="numbers" defaultValue={defaultValue}>
        {listItems.map((itemValue) => {
          return (
            <option
              defaultValue={defaultValue}
              key={itemValue}
              value={itemValue}
            >
              {itemValue}
            </option>
          );
        })}
      </datalist>
    </div>
  );
};
export default FormRowSelectDropdown;
