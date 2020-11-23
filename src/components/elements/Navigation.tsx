import React, {memo} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/rootReducer";
import "../../style/Navigation.css"
import "bootstrap/dist/css/bootstrap.min.css";
import {iCart} from "../../redux/Types";


const Navigation = () => {

	const cart: iCart[] = useSelector((state: RootState) => state.reducer.cart);

	return (
		<section className="Navigation__Background">

			<Link to={`/`} className="Navigation__Brand">
			<p>My Awesome Car Dealer</p>
			</Link>

			<div className="Navigation__InnerFlex">
				<Link to={`/new`}>
					<i className="Navigation__CreateIcon fas fa-plus-square"/>
				</Link>

				<Link to={`/cart`}>
					<i className="Navigation__CartIcon fas fa-shopping-cart"/>

					<div className="Navigation__Cart__Qty">
						{cart.reduce((accumulator: number, currentValue: iCart): number => accumulator + (currentValue["quantity"] || 0), 0)}
					</div>
				</Link>
			</div>
		</section>
	);
};

export default memo(Navigation);
