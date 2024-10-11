'use client';

import { useMemo, useState } from 'react';
import { CountryBase } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

import Filters from '../Filters';
import Pagination from '../Pagination';
import styles from './styles.module.css';

const PAGE_SIZE = 8;

const paginateData = (data: CountryBase[]) => {
	return [...Array(Math.ceil(data.length / PAGE_SIZE))].map((_, index) =>
		data.slice(index * PAGE_SIZE, (index + 1) * PAGE_SIZE)
	);
};

const getRegionsList = (data: CountryBase[]) => {
	return Array.from(new Set(data.map((item) => item.region)));
};

const Countries = ({ countries }: { countries: CountryBase[] }) => {
	const [page, setPage] = useState(0);
	const [nameFilter, setNameFilter] = useState('');
	const [regionFilter, setRegionFilter] = useState('');

	const filteredCountries = useMemo(() => {
		setPage(0);
		let data: CountryBase[] = [];

		if (nameFilter || regionFilter) {
			data = countries
				.filter((c) => c.region.toLowerCase().includes(regionFilter.toLowerCase()))
				.filter((c) => c.name.common.toLowerCase().startsWith(nameFilter.toLowerCase()));
		}

		return data;
	}, [countries, nameFilter, regionFilter]);

	const paginatedData = useMemo(() => {
		if (filteredCountries.length || nameFilter || regionFilter) {
			return paginateData(filteredCountries);
		}

		return paginateData(countries);
	}, [filteredCountries, nameFilter, regionFilter, countries]);

	return (
		<>
			<Filters
				regions={getRegionsList(countries)}
				updateNameFilter={setNameFilter}
				updateRegionFilter={setRegionFilter}
			/>
			<Pagination totalPages={paginatedData.length} activePage={page} updateActivePage={setPage} />
			<ul className={styles.countries_list}>
				{paginatedData[page]?.map((country) => (
					<CountryItem key={country.name.official} country={country} />
				))}
			</ul>
		</>
	);
};

const CountryItem = ({ country }: { country: CountryBase }) => {
	return (
		<li>
			<Link href={`/country/${country.cca3}`}>
				<div className={styles.flag}>
					<Image
						src={country.flags.svg}
						alt={country.flags.alt}
						loading={'eager'}
						height={140}
						width={220}
					/>
				</div>
				<div className={styles.info}>
					<h4>{country.name.common}</h4>
					<p>
						<strong>Population: </strong>
						{country.population.toLocaleString()}
					</p>
					<p>
						<strong>Region: </strong>
						{country.region}
					</p>
					<p>
						<strong>Capital: </strong>
						{country.capital[0]}
					</p>
				</div>
			</Link>
		</li>
	);
};

export default Countries;
