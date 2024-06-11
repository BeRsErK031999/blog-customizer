import React, { useState } from 'react';
import ArrowButton from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	applyStyles: (newStyles: any) => void;
	initialStyles: any;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({
	applyStyles,
	initialStyles,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(initialStyles);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
		console.log('Sidebar toggled', !isOpen);
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		applyStyles(formState);
	};

	const handleReset = () => {
		setFormState(initialStyles);
		applyStyles(initialStyles);
	};

	console.log('Rendering sidebar', isOpen); // Перемещено сюда

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<label>
						Размер шрифта:
						<input
							type='text'
							name='fontSize'
							value={formState.fontSize}
							onChange={handleChange}
						/>
					</label>
					<label>
						Цвет:
						<input
							type='color'
							name='color'
							value={formState.color}
							onChange={handleChange}
						/>
					</label>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='button' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
