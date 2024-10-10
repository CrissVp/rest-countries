import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.css';

interface Props {
	totalPages: number;
	activePage: number;
	updateActivePage: Dispatch<SetStateAction<number>>;
}

const TOTAL_PAGES_LIMIT = 8;
const FIRST_PAGE_LIMIT = 5;
const LAST_PAGE_LIMIT = 3;
const PAGE_BUFFER = 2; // Number of pages to show before and after the current page

const getPaginationOffset = (activePage: number, totalPages: number) => {
	if (totalPages <= TOTAL_PAGES_LIMIT) {
		return { startIndex: 0, endIndex: totalPages };
	}

	if (activePage < PAGE_BUFFER + 1) {
		return { startIndex: 0, endIndex: FIRST_PAGE_LIMIT };
	}

	if (activePage >= totalPages - LAST_PAGE_LIMIT - PAGE_BUFFER - 1) {
		return {
			startIndex: totalPages - FIRST_PAGE_LIMIT - LAST_PAGE_LIMIT,
			endIndex: totalPages - LAST_PAGE_LIMIT
		};
	}

	return { startIndex: activePage - PAGE_BUFFER, endIndex: activePage + PAGE_BUFFER + 1 };
};

const Pagination = ({ totalPages, activePage, updateActivePage }: Props) => {
	const pagesArray = Array.from({ length: totalPages }, (_, i) => i);

	const { startIndex, endIndex } = getPaginationOffset(activePage, totalPages);
	const visiblePaginationAtStart = pagesArray.slice(startIndex, endIndex);
	const visiblePaginationAtEnd = pagesArray.slice(-3);

	const handleChangePage = (page: number) => {
		if (!pagesArray.includes(page)) return;
		updateActivePage(page);
	};

	return (
		<div className={styles.pagination}>
			<button onClick={() => handleChangePage(activePage - 1)}>
				<IoIosArrowBack />
			</button>
			{visiblePaginationAtStart.map((page) => (
				<button
					className={page === activePage ? styles.active : ''}
					onClick={() => handleChangePage(page)}
					key={page}
				>
					{page + 1}
				</button>
			))}
			{totalPages > TOTAL_PAGES_LIMIT && (
				<>
					<strong>...</strong>
					{visiblePaginationAtEnd.map((page) => (
						<button
							className={page === activePage ? styles.active : ''}
							onClick={() => handleChangePage(page)}
							key={page}
						>
							{page + 1}
						</button>
					))}
				</>
			)}
			<button onClick={() => handleChangePage(activePage + 1)}>
				<IoIosArrowForward />
			</button>
		</div>
	);
};

export default Pagination;
