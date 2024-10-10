import { CountryBase, CountryInfo } from '@/types';
import axios from 'axios';

const baseUrl = 'https://restcountries.com/v3.1';

interface Request<T> {
	error?: string;
	data?: T;
}

const request = async <T>(url: string) => {
	try {
		const { data } = await axios.get<T>(url);
		return { data };
	} catch (error: unknown) {
		let errorMessage = '';

		if (error instanceof Error) {
			errorMessage += error.message;
		}

		return { error: errorMessage };
	}
};

export const getAllCountries = async (): Promise<Request<CountryBase[]>> => {
	return await request<CountryBase[]>(
		`${baseUrl}/all?fields=cca3,name,flags,population,region,capital`
	);
};

export const getCountry = async (countryCode: string): Promise<Request<CountryInfo>> => {
	return await request<CountryInfo>(
		`${baseUrl}/alpha/${countryCode}?fields=cca3,name,flags,population,region,capital,subregion,tld,currencies,languages,borders`
	);
};

export const getCountryBordersName = async (
	borders: string[]
): Promise<Request<Pick<CountryBase, 'name' | 'cca3'>[]>> => {
	if (!borders.length) return {};

	return await request<Pick<CountryBase, 'name' | 'cca3'>[]>(
		`${baseUrl}/alpha?codes=${borders.join(',')}&fields=name,cca3`
	);
};
