import React, {useEffect, useState, useCallback, memo} from "react";
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useLocation} from "react-router-dom";
import {updateProduct, setLoader} from "../redux/Actions";
import {iProduct} from "../redux/Types";
import {RootState} from "../redux/rootReducer";
import "../style/EditView.css"
import {iUrlProps} from "../redux/Types";
import Spinner from "react-bootstrap/Spinner";
import Navigation from "./elements/Navigation";


const EditView = (props: iUrlProps) => {

	const {pathname} = useLocation();

	const productID: string = props.match.params.productID;

	const product: iProduct | undefined = useSelector((state: RootState) => state.reducer.products.filter(product => product.id === productID).pop());
	const loading: boolean = useSelector((state: RootState) => state.reducer.loading);
	const dispatch = useDispatch();
	const history = useHistory();

	const [title, setTitle] = useState<string>("");
	const [price, setPrice] = useState<string>("");
	const [description, setDescription] = useState<string>("");

	function capitalize(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	const titleRegExp: RegExp = /^[a-zA-Z]{3,15}$/;
	const priceRegExp: RegExp = /^[0-9]{2,5}$/;
	const descriptionRegExp: RegExp = /^[A-Za-z].{10,75}$/;


	useEffect(() => {
		dispatch(setLoader());

		if (product) {
			setTitle(product.title)
			setPrice(product.price.toString())
			setDescription(product.description)
		}

		return (() => {
			dispatch(setLoader());
		});
	}, []);

	const handleSave = useCallback((id: string) => (event: React.MouseEvent<HTMLButtonElement>): void => {

		if (titleRegExp.test(title) && priceRegExp.test(price) && descriptionRegExp.test(description)) {
			dispatch(updateProduct(id, capitalize(title), capitalize(description), parseInt(price)));
			history.push("/");
		}

	}, [title, price, description]);

	const handleTitleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
		setTitle(event.target.value);
	}, []);


	const handlePriceChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
		setPrice(event.target.value);
	}, []);


	const handleDescriptionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
		setDescription(event.target.value);
	}, []);


	return (
		<>
			{
				loading ? <Spinner animation="border" className="EditView__Spinner"/> :
					<>
						<Navigation/>

						<section className="EditView__Background">

							<label className="Product__Label">Brand</label>
							<input className="Product__Brand__Input" value={title} type="text" pattern="^[a-zA-Z]{3,15}$"
							       onChange={handleTitleChange}/>

							<label className="Product__Label">Price ($)</label>
							<input className="Product__Price__Input" value={price} type="text" pattern="^[0-9]{2,5}$"
							       onChange={handlePriceChange}/>

							<label className="Product__Label">Description</label>
							<input className="Product__Description__Input" value={description} type="text"
							       pattern="^[A-Za-z].{10,75}$" onChange={handleDescriptionChange}/>

							<button className="Product__Save__Button" onClick={handleSave(productID)}>Save</button>
						</section>
					</>
			}
		</>
	);
};

export default memo(EditView);
