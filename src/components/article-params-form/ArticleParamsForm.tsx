import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
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
	const sidebarRef = useRef<HTMLDivElement>(null);

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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		applyStyles(formState);
	};

	const handleReset = () => {
		setFormState(initialStyles);
		applyStyles(initialStyles);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			sidebarRef.current &&
			!sidebarRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<h2 className={styles.header}>ЗАДАЙТЕ ПАРАМЕТРЫ</h2>
					<label className={styles.marginTop50}>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(option) =>
								handleSelectChange('fontFamilyOption', option)
							}
							title='Шрифт'
						/>
					</label>
					<label className={styles.marginTop50}>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleRadioChange}
							title='Размер шрифта'
						/>
					</label>
					<label className={styles.marginTop50}>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							onChange={(option) => handleSelectChange('fontColor', option)}
							title='Цвет шрифта'
						/>
					</label>
					<div className={styles.marginTop50}>
						<Separator />
					</div>
					<label className={styles.marginTop50}>
						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={(option) =>
								handleSelectChange('backgroundColor', option)
							}
							title='Цвет фона'
						/>
					</label>
					<label className={styles.marginTop50}>
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
