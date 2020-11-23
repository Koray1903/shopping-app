import {Dispatch} from "redux";
import {AppThunk, ActionTypes, iProduct, iCart} from "./Types"
import axios from "axios";


axios.defaults.baseURL = "https://my-json-server.typicode.com/Koray1903/json-server-api"


export const fetchAllProducts = (): AppThunk => {

	return (dispatch: Dispatch) => {
		axios.get("/products")
			.then(response => {
				dispatch(fetchedProducts(response.data));
				console.log(response.status, response.statusText);
			})
			.catch(error => console.log(error.message));
	};
};


export const fetchedProducts = (data: iProduct[]) => {

	return {
		type: ActionTypes.FETCH_ALL_PRODUCTS,
		payload: data
	};
};


export const fetchCart = (): AppThunk => {

	return (dispatch: Dispatch) => {
		axios.get("/cart")
			.then(response => {
				dispatch(fetchedCart(response.data));
				console.log(response.status, response.statusText);
			})
			.catch(error => console.log(error.message));
	};
};


export const fetchedCart = (data: iCart[]) => {

	return {
		type: ActionTypes.FETCH_CART,
		payload: data
	};
};


export const createNewProduct = (id: string, title: string, description: string, price: number) => {

	// Important: resource will not be really updated on the server but it will be faked as if.
	axios.post("/products", {
		id: id,
		title: title,
		description: description,
		price: price,
		inCart: false
	})
		.then(response => {
			console.log(response.status, response.statusText);
		})
		.catch(error => console.log(error.message));
	// Important: resource will not be really updated on the server but it will be faked as if.

	return {
		type: ActionTypes.CREATE_PRODUCT,
		payload: {id: id, title: title, description: description, price: price}
	};
};


export const deleteProduct = (id: string) => {

	// Important: resource will not be really updated on the server but it will be faked as if.
	axios.delete(`/products/${id}`)
		.then(response => {
			console.log(response.status, response.statusText);
		})
		.catch(error => console.log(error.message));
	// Important: resource will not be really updated on the server but it will be faked as if.

	return {
		type: ActionTypes.DELETE_PRODUCT,
		payload: id
	};
};


export const updateProduct = (id: string, title?: string, description?: string, price?: number, inCart?: boolean) => {

	// Important: resource will not be really updated on the server but it will be faked as if.
	axios.patch(`/products/${id}`, {
		title: title,
		description: description,
		price: price,
		inCart: inCart
	})
		.then(response => {
			console.log(response.status, response.statusText);
		})
		.catch(error => console.log(error.message));
	// Important: resource will not be really updated on the server but it will be faked as if.

	return {
		type: ActionTypes.UPDATE_PRODUCT,
		payload: {id: id, title: title, description: description, price: price}
	};
};


export const addToCart = (id: string) => {

	return {
		type: ActionTypes.ADD_TO_CART,
		payload: id
	};
}


export const removeFromCart = (id: string) => {

	return {
		type: ActionTypes.REMOVE_FROM_CART,
		payload: id
	};
}


export const updateCart = (id: string, amount: number) => {

	return {
		type: ActionTypes.UPDATE_CART,
		payload: {id: id, amount: amount}
	};
}


export const setLoader = () => {

	return {
		type: ActionTypes.SET_LOADER,
	};
};
