export enum Theme {
	Light = 'light',
	Dark = 'dark'
}

export interface ThemeContextType {
	theme: Theme | undefined;
	toggleTheme: () => void;
}

export interface CountryBase {
	cca3: string;
	name: {
		common: string;
		official: string;
		nativeName: object;
	};
	flags: {
		png: string;
		svg: string;
		alt: string;
	};
	population: number;
	region: string;
	capital: string[];
}

export interface CountryInfo extends CountryBase {
	tld: string[];
	borders: string[];
	currencies: object;
	subregion: string;
	languages: object;
}
