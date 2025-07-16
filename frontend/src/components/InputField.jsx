function InputField({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      className="w-full border p-2 rounded"
    />
  );
}

export default InputField;
