import React, { useState } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({ applyStyles, initialStyles }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(initialStyles);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
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

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			{isOpen && (
				<aside className={styles.container}>
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
			)}
		</>
	);
};
