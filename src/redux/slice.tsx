import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../components/firebase";
type infomation = {
	email: string;
	password: string;
	login: boolean;
};
type paylod = {
	payload: any;
	type: string;
};
const firebaseService = {
	addFirebase: async (post: any) => {
		return post;
	},
};
// export const postATofireBase = createAsyncThunk(
// 	"posts/postATofireBase",
// 	async (post, thunkAPI) => {
// 		try {
// 				const docRef = addDoc(collection(db, "users"), {	
// 					inputValue: post.inputValue,
// 					id: post.id,
// 					checked: post.checked,
// 				});
// 			return docRef;
// 				console.log("Document written with ID: ", docRef.id);
// 			} catch (e) {
// 				console.error("Error adding document: ", e);
// 			}
// 	}
// );
export const userSlice = createSlice({
	name: "user",
	initialState: {
		info: {
			email: "",
			password: "",
			login: false,
		},
	},
	// initialState:0,
	reducers: {
		register: (state: any, action: PayloadAction<any>) => {
			state.info.email = action.payload.email;
			state.info.password = action.payload.password;
		},
		login: (state: any, action: PayloadAction<any>) => {
			state.info.email = action.payload.email;
			state.info.password = action.payload.password;
			state.info.login = action.payload;
		},
		logout: (state: any) => {
			state.info.email = "";
			state.info.password = "";
			state.info.login = false;
		},
		// addFirebsae: (state: any, action: PayloadAction<any>) => {
		// 	try {
		// 		const docRef = addDoc(collection(db, "users"), {	
		// 			inputValue: action.payload.inputValue,
		// 			id: action.payload.id,
		// 			checked: action.payload.checked,
		// 		});
		// 		console.log("Document written with ID: ", docRef.id);
		// 	} catch (e) {
		// 		console.error("Error adding document: ", e);
		// 	}
		// },
	},
	// extraReducers:(builder)=> {
	// 	builder.addCase(postATofireBase.fulfilled, (state: any, action: PayloadAction<any>) => {

	// 	});
	// }
});
export const action = userSlice.actions;
export default userSlice.reducer;
