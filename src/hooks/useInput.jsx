import { useState } from 'react';

const useInput = (defaultValue = '') => {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange (e) {
    setValue(e.target.value);
  }

  return [value, handleValueChange];
};

export default useInput;
