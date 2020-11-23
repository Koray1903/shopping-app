import {Action} from "redux";
import {ThunkAction} from 'redux-thunk'
import {RootState} from "./rootReducer"


// REDUCER
export interface iCart {
	id: string,
	title: string,
	description: string,
	price: number,
	inCart: boolean,
	quantity: number
}

export interface iProduct {
	id: string,
	title: string,
	description: string,
	price: number,
	inCart: boolean,
}


export interface iState {
	products: iProduct[],
	cart: iCart[],
	loading: boolean
}

export interface iReducerAction {
	type: string,
	payload?: any
}

// REDUCER


export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export enum ActionTypes {
	FETCH_ALL_PRODUCTS = "FETCH_ALL_PRODUCTS",
	FETCH_CART = "FETCH_CART",
	CREATE_PRODUCT = "CREATE_PRODUCT",
	DELETE_PRODUCT = "DELETE_PRODUCT",
	UPDATE_PRODUCT = "UPDATE_PRODUCT",
	ADD_TO_CART = "ADD_TO_CART",
	REMOVE_FROM_CART = "REMOVE_FROM_CART",
	UPDATE_CART = "UPDATE_CART",
	SET_LOADER = "SET_LOADER"
}


// COMPONENTS
export interface iSort {
	sortBy: string;
	direction: string,
	name: string
}

export interface iSortFilterProps {
	sort: iSort,
	setSort: (object: iSort) => void,
	productsPerPage: string,
	setProductsPerPage: (num: string) => void,
	setFirstProduct: (num: number) => void,
	setCurrentPage: (num: number) => void
}

export interface iPaginationProps {
	productsPerPage: string,
	products: iProduct[],
	firstProduct: number,
	setFirstProduct: (num: number) => void,
	currentPage: number,
	setCurrentPage: (num: number) => void
}

export interface iUrlProps {
	match: {
		params: {
			productID: string
		}
	}
}
// COMPONENTS
