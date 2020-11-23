import React, {useCallback, memo} from "react";
import {iSort, iSortFilterProps} from "../../redux/Types";
import "../../style/SortFilter.css"


const SortFilter = ({sort, setSort, productsPerPage, setProductsPerPage, setFirstProduct, setCurrentPage}: iSortFilterProps) => {


	const productQuantity: string[] = ["5", "10", "15"];

	const sortTypes: iSort[] = [
		{sortBy: "price", direction: "Ascending", name: "Price - Ascending"},
		{sortBy: "price", direction: "Descending", name: "Price - Descending"},
		{sortBy: "title", direction: "Ascending", name: "Name - Ascending"},
		{sortBy: "title", direction: "Descending", name: "Name - Descending"}
	];

	const handleQuantityChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>): void => {
		setProductsPerPage(event.target.value);
		setFirstProduct(0);
		setCurrentPage(1);
	}, [productsPerPage]);


	const handleSortChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>): void => {
		let index: number = sortTypes.findIndex(sortType => sortType.name === event.target.value);
		setSort(sortTypes[index]);

	}, [sort]);


	return (
		<div className="SortFilter__Flex">

			<span>Products per page</span>

			<select value={productsPerPage} onChange={handleQuantityChange}>
				{productQuantity.map((Quantity: string, index: number) =>
					<option value={Quantity} key={index}>
						{Quantity}
					</option>
				)}
			</select>

			<span>Sort by</span>

			<select value={sort.name} onChange={handleSortChange}>
				{sortTypes.map((type: iSort, index: number) =>
					<option value={type.name} key={index}>
						{type.name}
					</option>
				)}
			</select>

		</div>
	);
};

export default memo(SortFilter);
