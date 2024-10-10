'use client';

import useTheme from '@/hooks/useTheme';
import { ReactNode } from 'react';

import Header from '../Header';
import styles from './styles.module.css';

const AppLayout = ({ children }: { children: ReactNode }) => {
	const { theme } = useTheme();

	return (
		<div className={`${styles.app_container} ${theme}_theme`}>
			<Header />
			<main>{children}</main>
		</div>
	);
};

export default AppLayout;
