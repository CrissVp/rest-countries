import { getCountry, getCountryBordersName } from '@/services/countries';
import { IoIosArrowRoundBack } from 'react-icons/io';
import Image from 'next/image';
import Link from 'next/link';

import Error from '@/components/Error';
import styles from './styles.module.css';

export default async function CountryPage({ params }: { params: { name: string } }) {
	const { error, data } = await getCountry(params.name);

	if (error) return <Error />;

	const country = data!;
	const { data: borders } = await getCountryBordersName(country.borders);

	return (
		<div className={styles.page}>
			<Link href={'/'}>
				<button className={styles.button}>
					<IoIosArrowRoundBack size={28} />
					Back
				</button>
			</Link>
			<div className={styles.country}>
				<section className={styles.country_flag}>
					<Image src={country.flags.svg} height={400} width={400} alt={country.flags.alt} />
				</section>
				<section className={styles.country_info}>
					<div className={styles.country_name}>
						<h1>{country.name.common}</h1>
					</div>
					<div className={styles.country_details}>
						<p>
							<strong>Native Name: </strong>
							{Object.values(country.name.nativeName)[0]?.common}
						</p>
						<p>
							<strong>Population: </strong>
							{country.population.toLocaleString()}
						</p>
						<p>
							<strong>Region: </strong>
							{country.region}
						</p>
						<p>
							<strong>Sub Region: </strong>
							{country.subregion}
						</p>
						<p>
							<strong>Capital: </strong>
							{country.capital}
						</p>
						<p>
							<strong>Top Level Domain: </strong>
							{country.tld}
						</p>
						<p>
							<strong>Currencies: </strong>
							{Object.values(country.currencies)[0]?.name}
						</p>
						<p>
							<strong>Languages: </strong>
							{Object.values(country.languages).join(', ')}
						</p>
					</div>
					{country.borders.length !== 0 && (
						<div className={styles.country_borders}>
							<strong>Border Countries:</strong>
							{borders ? (
								<div className={styles.border_links}>
									{borders.map((border) => (
										<Link key={border.name.official} href={`/country/${border.cca3}`}>
											<button className={styles.button}>{border.name.common}</button>
										</Link>
									))}
								</div>
							) : (
								<p>Error getting country borders.</p>
							)}
						</div>
					)}
				</section>
			</div>
		</div>
	);
}
