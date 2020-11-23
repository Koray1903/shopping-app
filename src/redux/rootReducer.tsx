import {combineReducers} from "redux";
import {reducer} from "./Reducer";

export const rootReducer = combineReducers({
	reducer
});

export type RootState = ReturnType<typeof rootReducer>
