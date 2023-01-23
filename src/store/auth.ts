import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { RootState } from ".";
import { User } from "../types/User";
// const customizedMiddleware = getDefaultMiddleware({
// 	serializableCheck: false,
// });

const initialAuthState = {
	isAuthenticated: false,
	user: new User("Ala", 34, 168, 58, 1.375, "Kobieta", true, 1),
};
const authSlice = createSlice({
	name: "auth",
	initialState: initialAuthState,
	reducers: {
		login(state) {
			state.isAuthenticated = true;
			console.log(state.isAuthenticated);
		},
		logout(state) {
			state.isAuthenticated = false;
		},
		changeUser(state, action: PayloadAction<{ user: User }>) {
			state.user = action.payload.user;
			console.log(state.user);
		},
	},
});

export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
	state.auth.isAuthenticated;

export const authActions = authSlice.actions;
export default authSlice.reducer;
