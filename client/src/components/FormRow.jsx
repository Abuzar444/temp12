import React from "react";

const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  onChange,
  onBlur,
  max,
  ref,
  maxLength,
  required,
  disabled,
  style,
  step,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        autoComplete="off"
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        max={max}
        min="0"
        ref={ref}
        required={required}
        disabled={disabled}
        style={style}
        step={step}
      />
    </div>
  );
};

export default FormRow;
