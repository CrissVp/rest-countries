import { IoMdArrowDropdown } from 'react-icons/io';
import { useState } from 'react';

import styles from './styles.module.css';

interface Props {
	regions: string[];
	updateFn: (value: string) => void;
}

const CustomSelect = ({ regions, updateFn }: Props) => {
	const [listVisible, setListVisible] = useState(false);

	const handleUpdate = (value: string) => {
		setListVisible(false);
		updateFn(value);
	};

	return (
		<div className={styles.custom_select}>
			<button className={styles.select_button} onClick={() => setListVisible(!listVisible)}>
				Filter by Region
				<IoMdArrowDropdown />
			</button>
			{listVisible && (
				<div className={styles.select_options}>
					<button onClick={() => handleUpdate('')}>All Regions</button>
					{regions.map((region) => (
						<button onClick={() => handleUpdate(region)} key={region}>
							{region}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default CustomSelect;
