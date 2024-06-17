import React from 'react';
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

interface ArrowButtonProps {
	isOpen: boolean;
	onClick: () => void;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ isOpen, onClick }) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${isOpen ? styles.container_open : ''}`}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={`${styles.arrow} ${isOpen ? styles.arrow_open : ''}`}
			/>
		</div>
	);
};

export default ArrowButton;
