function SelectDropdown({ options, value, onChange }) {
  return (
    <div className="mb-6">
      <select
        value={value}
        onChange={onChange}
        className="w-[200px]  px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        <option value="" disabled>
          -- Select another user --
        </option>
        {options.map((opt) => (
          <option key={opt._id} value={opt._id}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectDropdown;
