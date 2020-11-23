import React, {useEffect, useCallback, memo} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setLoader, updateCart, removeFromCart} from "../redux/Actions";
import {iCart} from "../redux/Types";
import {RootState} from "../redux/rootReducer";
import "../style/CartView.css"
import Navigation from "./elements/Navigation";
import Spinner from "react-bootstrap/Spinner";


const CartView = () => {

	const cart: iCart[] = useSelector((state: RootState) => state.reducer.cart);
	const loading: boolean = useSelector((state: RootState) => state.reducer.loading);
	const dispatch = useDispatch();

	const totalPrice: number = cart.reduce(
		(accumulator: number, currentValue: iCart): number =>
			accumulator + (currentValue["quantity"] * currentValue["price"] || 0), 0
	);

	useEffect(() => {
		dispatch(setLoader());

		return (() => {
			dispatch(setLoader());
		});
	}, []);

	const handleDecrease = useCallback((id: string, quantity: number) => (event: React.MouseEvent<HTMLElement>): void => {
		quantity > 1 && dispatch(updateCart(id, -1))
	}, []);

	const handleIncrease = useCallback((id: string) => (event: React.MouseEvent<HTMLElement>): void => {
		dispatch(updateCart(id, +1))
	}, []);

	const handleRemoveFromCart = useCallback((id: string) => (event: React.MouseEvent<HTMLElement>): void => {
		dispatch(removeFromCart(id))
	}, []);


	return (
		<>
			{
				loading ? <Spinner animation="border" className="CartView__Spinner"/> :
					<>
						<Navigation/>

						<section className="CartView__Background">
							{cart.map((product: iCart, index: number) => (
								<div key={index} className="Cart__Product">

									<img className="Cart__Product__Image" src="./car_model.jpg" alt="product_image"/>

									<p className="Cart__Product__Brand">{product.title}</p>

									<p className="Cart__Product__Price">$ {product.price}</p>

									<i className="Cart__Product__DecreaseIcon fas fa-minus"
									   onClick={handleDecrease(product.id, product.quantity)}/>

									<p className="Cart__Product__Quantity">{product.quantity}</p>

									<i className="Cart__Product__IncreaseIcon fas fa-plus"
									   onClick={handleIncrease(product.id)}/>

									<i className="Cart__Product__DeleteIcon fas fa-times"
									   onClick={handleRemoveFromCart(product.id)}/>
								</div>
							))}

							<p className="Cart__Total">
								Total Price : <span className="Cart__Total__Price">$ {totalPrice}</span>
							</p>

						</section>
					</>
			}
		</>
	);
};

export default memo(CartView);
