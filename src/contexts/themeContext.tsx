'use client';

import { createContext, ReactNode, useEffect, useState } from 'react';
import { Theme, ThemeContextType } from '@/types';

const ThemeContext = createContext<ThemeContextType>({
	theme: Theme.Light,
	toggleTheme: () => {}
});

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<Theme>();

	useEffect(() => {
		const savedTheme = (localStorage.getItem('countries_app_theme') as Theme) || null;
		setTheme(savedTheme || Theme.Light);
	}, []);

	useEffect(() => {
		if (theme) {
			localStorage.setItem('countries_app_theme', theme!);
		}
	}, [theme]);

	const toggleTheme = () => {
		if (theme === Theme.Light) setTheme(Theme.Dark);
		if (theme === Theme.Dark) setTheme(Theme.Light);
	};

	if (!theme) return null;

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
