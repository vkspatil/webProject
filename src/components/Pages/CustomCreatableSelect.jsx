import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { components } from 'react-select';
import AddIcon from '@mui/icons-material/Add';

const customStyles = {
  control: (base) => ({
    ...base,
    borderRadius: '4px',
    borderColor: '#cbd5e0',
    '&:hover': { borderColor: '#a0aec0' },
  }),
};

const CustomInput = (props) => (
  <components.Input {...props}>
    {props.children}
    <AddIcon style={{ position: 'absolute', right: '10px', top: '10px' }} />
  </components.Input>
);

function CustomCreatableSelect({ value, onChange, options, label, placeholder }) {
    return (
      <CreatableSelect
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        styles={{
          control: (provided) => ({
            ...provided,
            borderRadius: '4px',
            boxShadow: 'none',
            borderColor: '#dcdcdc',
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 9999,
          }),
        }}
        components={{ IndicatorSeparator: () => null }}
      />
    );
  }

  export default CustomCreatableSelect