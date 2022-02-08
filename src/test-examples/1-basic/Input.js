import { useState } from 'react';

const Input = ({ name, label, placeholder = 'Name' }) => {
  const [inputValue, setInputValue] = useState('');
  const [isErrorVisible, setErrorVisibility] = useState(false);

  const handleChange = ({ target: { value } }) => {
    const digitRegex = /[0-9]+/;
    const specialCharRegex = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/;

    setInputValue(value.replace(digitRegex, ''));

    if (specialCharRegex.test(value)) {
      setErrorVisibility(true);
    } else {
      setErrorVisibility(false);
    }
  };

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
      />
      {isErrorVisible && (
        <p>
          <strong>Error:</strong> special characters are not allowed!
        </p>
      )}
    </>
  );
};

export default Input;
