import { combineReducers } from "redux";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { todoReducer } from "./reducers";

const rootReducer = combineReducers({
  todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
