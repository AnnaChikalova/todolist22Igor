import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {Button, TextField} from "@mui/material";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    description: 'Button was clicked correctly'
  },
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStory.args = {
  addItem: action('Button clicked')
};
const TemplateWithError: ComponentStory<typeof AddItemForm> = (args) => {

  let [title, setTitle] = useState("")
  let [error, setError] = useState(true)

  const addItem = () => {
    let trimmedTitle = title.trim()
    if (trimmedTitle !== '') {
      args.addItem(trimmedTitle);
      setTitle("")
    } else {
      setError(true)
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(false)
  }

  // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
  //         setError(false);
  //         if (e.key === 'Enter') {
  //             addItem();
  //         }
  // }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItem();
    }
  }

  return <div>
    {/*<input value={title}*/}
    {/*       onChange={onChangeHandler}*/}
    {/*       onKeyPress={onKeyPressHandler}*/}
    {/*       className={error ? "error" : ""}*/}
    {/*/>*/}
    <TextField
        error={error}
        value={title}
        size={'small'}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        id="outlined-basic"
        label={error ? "Title is required" : 'type in'}
        variant="outlined"/>
    {/*<button onClick={addItem}>+</button>*/}
    <Button variant="contained"
            onClick={addItem}
            style={{
              maxWidth: '39px',
              maxHeight: '39px',
              minWidth: '39px',
              minHeight: '39px',
              backgroundColor: 'purple'
            }}>+</Button>

    {error && <div className="error-message">{error}</div>}
  </div>
};

export const AddItemFormWithErrorStory = TemplateWithError.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args


