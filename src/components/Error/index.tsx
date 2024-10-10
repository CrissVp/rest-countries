import { RiErrorWarningFill } from 'react-icons/ri';
import styles from './styles.module.css'

const Error = () => {
	return (
		<div className={styles.error}>
			<RiErrorWarningFill size={60} />
			<p>Something went wrong! Try again later.</p>
		</div>
	);
};

export default Error;
