import React, {useEffect, useState, useCallback, memo} from "react";
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setLoader, createNewProduct} from "../redux/Actions";
import {v4 as uuidv4} from "uuid";
import {RootState} from "../redux/rootReducer";
import "../style/CreateView.css"
import Spinner from "react-bootstrap/Spinner";
import Navigation from "./elements/Navigation";


const CreateView = () => {

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


	const handleCreate = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
		const id: string = uuidv4();

		if (titleRegExp.test(title) && priceRegExp.test(price) && descriptionRegExp.test(description)) {
			dispatch(createNewProduct(id, capitalize(title), capitalize(description), parseInt(price)));
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


	useEffect(() => {
		dispatch(setLoader());

		return (() => {
			dispatch(setLoader());
		});
	}, []);


	return (
		<>
			{
				loading ? <Spinner animation="border" className="CreateView__Spinner"/> :
					<>

						<Navigation/>
						<section className="CreateView__Background">

							<img className="New__Product__Image" src="./car_model.jpg" alt="product_image"/>

							<label className="New__Product__Label">Brand</label>
							<input className="New__Product__Brand__Input" value={title} type="text" pattern="^[a-zA-Z]{3,15}$"
							       onChange={handleTitleChange}/>

							<label className="New__Product__Label">Price ($)</label>
							<input className="New__Product__Price__Input" value={price} type="text" pattern="^[0-9]{2,5}$"
							       onChange={handlePriceChange}/>

							<label className="New__Product__Label">Description</label>
							<input className="New__Product__Description__Input" value={description} type="text"
							       pattern="^[A-Za-z].{10,75}$"
							       onChange={handleDescriptionChange}/>

							<button className="New__Product__Save__Button" onClick={handleCreate}>Save</button>

						</section>
					</>
			}
		</>
	);
};

export default memo(CreateView);
