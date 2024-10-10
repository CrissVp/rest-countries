'use client';

import { IoIosMoon, IoIosSunny } from 'react-icons/io';
import useTheme from '@/hooks/useTheme';
import { Theme } from '@/types';

import styles from './styles.module.css';
import Link from 'next/link';

const Header = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<nav className={styles.navbar}>
			<div className={styles.nav_container}>
				<Link href={'/'}>
					<h1>Where in the world?</h1>
				</Link>
				<button onClick={toggleTheme}>
					{theme === Theme.Light ? (
						<>
							<IoIosMoon size={20} />
							<span>Dark Mode</span>
						</>
					) : (
						<>
							<IoIosSunny size={20} />
							<span>Light Mode</span>
						</>
					)}
				</button>
			</div>
		</nav>
	);
};

export default Header;
