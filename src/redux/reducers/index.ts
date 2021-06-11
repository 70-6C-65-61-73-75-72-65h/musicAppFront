import { combineReducers } from "redux";
import audiosReducer from "./audios.reducer";
import authReducer from "./auth.reducer";

export const rootReducer = combineReducers({
  audios: audiosReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
