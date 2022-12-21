import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Task from "../Task";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

    decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta <typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory <typeof Task> = (args) =><Task {...args} />

export const TaskIsDoneStory = Template.bind({})
TaskIsDoneStory.args={
    id: 'ghghg',
    task: {id: 'vbnn', title: 'JS', isDone: true}
}
export const TaskIsNotDoneStory = Template.bind({})
TaskIsNotDoneStory.args={
    id: 'ghghg',
    task: {id: 'kllklk', title: 'REACT', isDone: false}
}
// More on args: https://storybook.js.org/docs/react/writing-stories/args


