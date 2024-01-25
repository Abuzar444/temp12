const FormRowSelect = ({
  name,
  labelText,
  list,
  defaultValue,
  onChange,
  required,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        required={required}
        onChange={onChange}
      >
        <option disabled defaultValue={defaultValue}>
          -- select an option --
        </option>
        {list.map((itemValue) => {
          return (
            <option
              key={itemValue}
              value={itemValue}
              defaultValue={defaultValue}
            >
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
