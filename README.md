# Installation

`npm i vmb-select`

## Usage

```
import React, { useState } from 'react';`
import CustomSelect from 'vmb-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="App">
      <CustomSelect
        selectValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
}
```

## Props

Common props you may want to specify include:

- Disabled - disable the control
- isMulti - allow the user to select multiple values
- checkbox - allow the user to select multiple values with checkbox
- isSearchable - allow the user to search for matching options
- name - generate an HTML input with this name, containing the current value
- onChange - subscribe to change events
- options - specify the options the user can select from
- Placeholder - change the text displayed when no option is selected
- noOptionsMessage - ({ inputValue: string }) => string | null - Text to display when there are no options
- value - control the current value
- HandleOnCreateOption - get the newly created value
- styles - passes a styling object to customize the component
- allowOther - to display the other button
- OtherButtonComponent - can pass custom button component for others
- maxOptions - specify the maximum number of options to select
- handleBlur - function to handle blur events
- maxMenuHeight - specify the height of options popup
