import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

import CustomSelect from '../CustomSelect';
import styles from './styles.module.css';

interface Props {
	regions: string[];
	updateNameFilter: Dispatch<SetStateAction<string>>;
	updateRegionFilter: Dispatch<SetStateAction<string>>;
}

const DEFAULT_REGION_VALUE = 'All Regions';

const Filters = ({ regions, updateNameFilter, updateRegionFilter }: Props) => {
	const [region, setRegion] = useState(DEFAULT_REGION_VALUE);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		updateNameFilter(value);
	};

	const handleSelectChange = (value: string) => {
		setRegion(value);
		updateRegionFilter(value);
	};

	return (
		<div className={styles.filters}>
			<div className={styles.search_input}>
				<IoIosSearch size={20} />
				<input onChange={handleInputChange} type='text' placeholder='Search for a country...' />
			</div>
			<div className={styles.regions_select}>
				<strong>{region || DEFAULT_REGION_VALUE}</strong>
				<CustomSelect regions={regions} updateFn={handleSelectChange} />
			</div>
		</div>
	);
};

export default Filters;
