import PropTypes from 'prop-types';

const Input = ({ value, onValueChange, placeholder, type = 'text' }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      placeholder={placeholder}
      className="custom-input"
    />
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onValueChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string
};

export default Input;
