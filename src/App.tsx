import React, { CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

export const App = () => {
	const [articleStyles, setArticleStyles] =
		useState<ArticleStateType>(defaultArticleState);

	const applyStyles = (newStyles: ArticleStateType) => {
		setArticleStyles(newStyles);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleStyles.fontFamilyOption.value,
					'--font-size': articleStyles.fontSizeOption.value,
					'--font-color': articleStyles.fontColor.value,
					'--container-width': articleStyles.contentWidth.value,
					'--bg-color': articleStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				applyStyles={applyStyles}
				initialStyles={defaultArticleState}
			/>
			<Article />
		</div>
	);
};
