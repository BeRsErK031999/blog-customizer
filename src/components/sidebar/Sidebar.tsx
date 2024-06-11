import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from './Sidebar.module.scss';

interface SidebarProps {
	isOpen: boolean;
	onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, children }) => {
	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				console.log('Click outside sidebar, closing...');
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose]);

	console.log('Sidebar render, isOpen:', isOpen);

	return (
		<div
			className={clsx(styles.sidebar, { [styles.sidebar_open]: isOpen })}
			ref={sidebarRef}>
			<div className={styles.sidebar_content}>{children}</div>
		</div>
	);
};

export default Sidebar;
