import { ThemeContextProvider } from '@/contexts/themeContext';
import AppLayout from '@/components/AppLayout';

import localFont from 'next/font/local';
import type { Metadata } from 'next';
import './globals.css';

const nuitoSans = localFont({
	src: './fonts/NunitoSans.ttf',
	variable: '--font-nunito-sans',
	weight: '300 600 800'
});

export const metadata: Metadata = {
	title: 'Countries',
	description: 'Countries information website'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${nuitoSans.variable}`}>
				<ThemeContextProvider>
					<AppLayout>{children}</AppLayout>
				</ThemeContextProvider>
			</body>
		</html>
	);
}

