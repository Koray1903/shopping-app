import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// REDUX
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/lib/integration/react'
import storageSession from 'redux-persist/lib/storage/session'
import {persistReducer, persistStore} from "redux-persist";
import {rootReducer} from "./redux/rootReducer";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
// REDUX

const persistConfig = {
	key: "root",
	storage: storageSession
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
	persistedReducer,
	composeWithDevTools(applyMiddleware(thunk, logger))
)

const persistor = persistStore(store);


ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<App/>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
