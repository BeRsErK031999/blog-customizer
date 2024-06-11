import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import ArrowButton from './ArrowButton';

export default {
	title: 'Components/ArrowButton',
	component: ArrowButton,
} as Meta;

const Template: Story<{ isOpen: boolean }> = (args) => {
	const [isOpen, setIsOpen] = useState(args.isOpen);

	return <ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />;
};

export const Default = Template.bind({});
Default.args = {
	isOpen: false,
};
