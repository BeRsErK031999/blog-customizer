import React, { useState } from 'react';
import ArrowButton from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from 'components/select/Select';
import { RadioGroup } from 'components/radio-group/RadioGroup';
import { Separator } from 'components/separator/Separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import buttonStyles from 'components/button/Button.module.scss';

interface ArticleParamsFormProps {
	applyStyles: (newStyles: ArticleStateType) => void;
	initialStyles: ArticleStateType;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	applyStyles,
	initialStyles,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(initialStyles);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
		console.log('Sidebar toggled', !isOpen);
	};

	const handleSelectChange = (
		name: keyof ArticleStateType,
		option: OptionType
	) => {
		setFormState((prevState: ArticleStateType) => ({
			...prevState,
			[name]: option,
		}));
	};

	const handleRadioChange = (option: OptionType) => {
		setFormState((prevState: ArticleStateType) => ({
			...prevState,
			fontSizeOption: option,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		applyStyles(formState);
	};

	const handleReset = () => {
		setFormState(initialStyles);
		applyStyles(initialStyles);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<h2 className={styles.header}>задайте параметры</h2>
					<label style={{ marginTop: '50px' }}>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(option) =>
								handleSelectChange('fontFamilyOption', option)
							}
							title='Шрифт'
						/>
					</label>
					<label style={{ marginTop: '50px' }}>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleRadioChange}
							title='Размер шрифта'
						/>
					</label>
					<label style={{ marginTop: '50px' }}>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							onChange={(option) => handleSelectChange('fontColor', option)}
							title='Цвет шрифта'
						/>
					</label>
					<Separator style={{ marginTop: '50px' }} />
					<label style={{ marginTop: '50px' }}>
						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={(option) =>
								handleSelectChange('backgroundColor', option)
							}
							title='Цвет фона'
						/>
					</label>
					<label style={{ marginTop: '50px' }}>
						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={(option) => handleSelectChange('contentWidth', option)}
							title='Ширина контента'
						/>
					</label>
					<div className={styles.bottomContainer}>
						<Button
							className={buttonStyles['button-reset']}
							title='Сбросить'
							type='button'
							onClick={handleReset}
						/>
						<Button
							className={buttonStyles['button-apply']}
							title='Применить'
							type='submit'
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
