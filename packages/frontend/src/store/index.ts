import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { todoReducer } from "./reducers";

const rootReducer = combineReducers({
  todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
