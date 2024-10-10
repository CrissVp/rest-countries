import ThemeContext from '@/contexts/themeContext';
import { useContext } from 'react';

const useTheme = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);
	return { theme, toggleTheme };
};

export default useTheme;
