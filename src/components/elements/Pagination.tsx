import React, {useCallback, memo} from "react";
import {iPaginationProps} from "../../redux/Types";
import "../../style/Pagination.css"


const Pagination = ({products, productsPerPage, firstProduct, setFirstProduct, currentPage, setCurrentPage}: iPaginationProps) => {

	const pageAmount: number = Math.ceil(products.length / parseInt(productsPerPage))
	const pageArray: number[] = []

	for (let i = 1; i <= pageAmount; i++) {
		pageArray.push(i);
	}


	const handlePageClick = useCallback((num: number) => (event: React.MouseEvent<HTMLSpanElement>): void => {
		setCurrentPage(num);
		setFirstProduct(parseInt(productsPerPage) * (num - 1));
		window.scrollTo(0, 0);
	}, [currentPage]);


	const handlePreviousClick = useCallback((event: React.MouseEvent<HTMLElement>): void | null => {
		if (currentPage !== 1) {
			setCurrentPage(currentPage - 1)
			setFirstProduct(firstProduct - parseInt(productsPerPage))
			window.scrollTo(0, 0);
		} else {
			return null
		}
	}, [currentPage])


	const handleNextClick = useCallback((event: React.MouseEvent<HTMLElement>): void | null => {
		if (currentPage !== pageAmount) {
			setCurrentPage(currentPage + 1)
			setFirstProduct(firstProduct + parseInt(productsPerPage))
			window.scrollTo(0, 0);
		} else {
			return null
		}
	}, [currentPage])


	const handleFirstClick = useCallback((event: React.MouseEvent<HTMLElement>): void => {
		setFirstProduct(0);
		setCurrentPage(1);
		window.scrollTo(0, 0);
	}, [currentPage])


	const handleLastClick = useCallback((event: React.MouseEvent<HTMLElement>): void => {
		setFirstProduct(parseInt(productsPerPage) * (pageArray.length - 1));
		setCurrentPage(pageArray.length)
		window.scrollTo(0, 0);
	}, [currentPage])


	return (
		<div className="Pagination__Flex">

			<i className="Pagination__First__Icon fas fa-step-backward" onClick={handleFirstClick}/>
			<i className="Pagination__Previous__Icon fas fa-caret-left" onClick={handlePreviousClick}/>

			{pageArray.map((num, index) =>
				<span className="Pagination__Page__Number" key={index}
				      onClick={handlePageClick(num)}>
					{num === currentPage ? <strong>{num}</strong> : num}
				</span>
			)}

			<i className="Pagination__Next__Icon fas fa-caret-right" onClick={handleNextClick}/>
			<i className="Pagination__Last__Icon fas fa-step-forward" onClick={handleLastClick}/>

		</div>
	);
};

export default memo(Pagination);
