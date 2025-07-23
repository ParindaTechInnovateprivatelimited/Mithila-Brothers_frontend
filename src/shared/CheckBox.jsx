const Checkbox = ({ label, checked, onChange }) => {
    return (
        <label className="flex items-center space-x-2 mb-2">
            <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600"
                checked={checked}
                onChange={onChange}
            />
            <span>{label}</span>
        </label>
    );
};

export default Checkbox;
