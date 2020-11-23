import React, {useEffect, memo} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom"
import MainView from "./components/MainView";
import CreateView from "./components/CreateView";
import CartView from "./components/CartView";
import EditView from "./components/EditView";
import "./style/App.css"
import {fetchAllProducts, fetchCart} from "./redux/Actions";
import {useDispatch} from "react-redux";


const App = () => {

	const dispatch = useDispatch();

	useEffect(() => {

		dispatch(fetchAllProducts());
		dispatch(fetchCart());

		return () => {
		};
	}, []);


	return (
		<BrowserRouter>
			<Switch>

				<Route exact path="/" component={MainView}/>
				<Route path="/new" component={CreateView}/>
				<Route path="/cart" component={CartView}/>
				<Route path="/:productID" component={EditView}/>

			</Switch>
		</BrowserRouter>
	);
}

export default memo(App);
