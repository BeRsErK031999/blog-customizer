import styles from './index.module.scss';

type SeparatorProps = {
	style?: React.CSSProperties; // Добавляем поддержку стиля
};

export const Separator: React.FC<SeparatorProps> = ({ style }) => {
	return <div className={styles.separator} style={style}></div>;
};
