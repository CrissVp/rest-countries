import { getAllCountries } from '@/services/countries';

import Countries from '@/components/Countries';
import Error from '@/components/Error';
import styles from './page.module.css';

export default async function Home() {
	const { error, data } = await getAllCountries();

	if (error && !data) return <Error />;

	return (
		<div className={styles.page}>
			<Countries countries={data!} />
		</div>
	);
}

