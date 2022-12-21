import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemForm} from "../AddItemForm";
import {action} from "@storybook/addon-actions";
import {Button, TextField} from "@mui/material";
import {EditableSpan} from "../EditableSpan";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    description: 'Title changed'
  },
} as ComponentMeta<typeof EditableSpan>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) => {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(args.value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(args.value);
  }
  const activateViewMode = () => {
    setEditMode(false);
    args.onChange(title);
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode
      ? <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
      : <span onDoubleClick={activateEditMode}>{args.value}</span>
}

export const EditableSpanStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EditableSpanStory.args = {
  value: 'I am title',
  onChange: action('Title changed')
};
