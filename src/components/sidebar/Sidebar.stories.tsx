import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';

export default {
	title: 'Components/Sidebar',
	component: Sidebar,
} as Meta;

const Template: Story<{ isOpen: boolean }> = (args) => {
	const [isOpen, setIsOpen] = React.useState(args.isOpen);

	const closeSidebar = () => {
		setIsOpen(false);
	};

	return (
		<div style={{ height: '100vh' }}>
			<button onClick={() => setIsOpen(!isOpen)}>Toggle Sidebar</button>
			<Sidebar isOpen={isOpen} onClose={closeSidebar}>
				<ArticleParamsForm
					applyStyles={() => {
						// Добавьте здесь вашу логику или удалите пустую функцию
					}}
					initialStyles={defaultArticleState}
				/>
			</Sidebar>
		</div>
	);
};

export const Default = Template.bind({});
Default.args = {
	isOpen: false,
};
