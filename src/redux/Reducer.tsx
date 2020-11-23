import {ActionTypes, iProduct, iReducerAction, iState} from "./Types";

const initialState = {
	products: [],
	cart: [],
	loading: true
}

export const reducer = (state: iState = initialState, action: iReducerAction): iState => {

	switch (action.type) {

		case ActionTypes.FETCH_ALL_PRODUCTS: {

			return {
				...state,
				products: [...action.payload]
			};
		}

		case ActionTypes.FETCH_CART: {

			return {
				...state,
				cart: [...action.payload]
			};
		}

		case ActionTypes.CREATE_PRODUCT: {

			const newProduct: iProduct = {
				id: action.payload.id,
				title: action.payload.title,
				price: action.payload.price,
				description: action.payload.description,
				inCart: false
			}

			state.products.push(newProduct)

			return {
				...state,
				products: [...state.products]
			};
		}

		case ActionTypes.DELETE_PRODUCT: {

			return {
				...state,
				products: state.products.filter((product: iProduct) => product.id !== action.payload)
			};
		}

		case ActionTypes.UPDATE_PRODUCT: {

			const updatedIndex: number = state.products.findIndex((product: iProduct) => product.id === action.payload.id);

			state.products[updatedIndex].title = action.payload.title;
			state.products[updatedIndex].price = action.payload.price;
			state.products[updatedIndex].description = action.payload.description;

			return {
				...state,
				products: [...state.products]
			};
		}

		case ActionTypes.UPDATE_CART: {

			const updatedIndex: number = state.cart.findIndex((product: iProduct) => product.id === action.payload.id);

			state.cart[updatedIndex].quantity += action.payload.amount

			return {
				...state,
				cart: [...state.cart]
			};
		}

		case ActionTypes.ADD_TO_CART: {

			const updatedIndex: number = state.products.findIndex((product: iProduct) => product.id === action.payload);
			state.products[updatedIndex].inCart = true;

			const productAddedToCart = Object.assign(state.products[updatedIndex], {quantity: 1, inCart: true});
			state.cart.push(productAddedToCart)

			return {
				...state,
				products: [...state.products],
				cart: [...state.cart]
			};
		}

		case ActionTypes.REMOVE_FROM_CART: {

			if (state.cart.length > 1) {
				const updatedIndexInProducts: number = state.products.findIndex((product: iProduct) => product.id === action.payload);
				state.products[updatedIndexInProducts].inCart = false;

				const updatedIndexInCart: number = state.cart.findIndex((product: iProduct) => product.id === action.payload);
				state.cart.splice(updatedIndexInCart, 1);
			}

			return {
				...state,
				products: [...state.products],
				cart: [...state.cart]
			};
		}

		case ActionTypes.SET_LOADER: {

			return {
				...state,
				loading: !state.loading
			};
		}

		default:
			return state;
	}
};
