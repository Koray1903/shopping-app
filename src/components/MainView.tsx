import React, {useEffect, useState, useCallback, memo} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {setLoader, deleteProduct, addToCart} from "../redux/Actions";
import {iProduct, iSort} from "../redux/Types";
import {RootState} from "../redux/rootReducer";
import "../style/MainView.css"
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from 'react-bootstrap/Spinner'
import Navigation from "./elements/Navigation";
import Pagination from "./elements/Pagination";
import SortFilter from "./elements/SortFilter";


const MainView = () => {

	const [productsPerPage, setProductsPerPage] = useState<string>("5");
	const [sort, setSort] = useState<iSort>({sortBy: "title", direction: "Ascending", name: "Name - Ascending"});

	const [firstProduct, setFirstProduct] = useState<number>(0)
	const [currentPage, setCurrentPage] = useState<number>(1)

	const sortCallback = (a: any, b: any): number => {

		switch (sort.direction) {

			case "Ascending":
				if (a[sort.sortBy] < b[sort.sortBy]) return -1;
				if (a[sort.sortBy] > b[sort.sortBy]) return +1;
				else return 0;

			case "Descending":
				if (a[sort.sortBy] < b[sort.sortBy]) return +1;
				if (a[sort.sortBy] > b[sort.sortBy]) return -1;
				else return 0;

			default:
				return 0;
		}
	}

	const products: iProduct[] = useSelector((state: RootState) => state.reducer.products.sort(sortCallback));
	const loading: boolean = useSelector((state: RootState) => state.reducer.loading);
	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(setLoader());
		window.scrollTo(0, 0);
		return () => {
			dispatch(setLoader());
		};
	}, []);


	const HandleDelete = useCallback((id: string) => (event: React.MouseEvent<HTMLElement>): void => {
		dispatch(deleteProduct(id))
	}, []);

	const HandleAddToCart = useCallback((id: string, inCart: boolean) => (event: React.MouseEvent<HTMLElement>): void => {
		!inCart && dispatch(addToCart(id))
	}, []);


	return (
		<>
			{loading ? <Spinner animation="border" className="MainView__Spinner"/> :
				<>
					<Navigation/>

					<section className="MainView__Background">

						<p className="MainView__Text">Keep calm and get yourself a new car today :)</p>

						<SortFilter
							sort={sort}
							setSort={setSort}
							productsPerPage={productsPerPage}
							setProductsPerPage={setProductsPerPage}
							setFirstProduct={setFirstProduct}
							setCurrentPage={setCurrentPage}
						/>

						<div className="MainView__InnerFlex">
							{products.slice(firstProduct, firstProduct + parseInt(productsPerPage)).map((product: iProduct, index: number) => (
								<div className="Product__Flex" key={index}>

									<div className="Product__InnerFlex">
										<Link to={`/${product.id}`}>
											<i className="Product__EditIcon fas fa-edit" onClick={() => console.log("EDIT")}/>
										</Link>

										<i className="Product__DeleteIcon fas fa-times" onClick={HandleDelete(product.id)}/>
									</div>

									<img className="Product__Image" src="./car_model.jpg" alt="product_image"/>

									<p className="Product__Brand">{product.title}</p>
									<p className="Product__Price">$ {product.price}</p>
									<p className="Product__Description">{product.description}</p>

									<i className="Product__AddToCartIcon fas fa-cart-plus"
									   onClick={HandleAddToCart(product.id, product.inCart)}/>
								</div>
							))}
						</div>

						<Pagination
							products={products}
							productsPerPage={productsPerPage}
							firstProduct={firstProduct}
							setFirstProduct={setFirstProduct}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
						/>

					</section>

				</>
			}
		</>
	)
};


export default memo(MainView);
