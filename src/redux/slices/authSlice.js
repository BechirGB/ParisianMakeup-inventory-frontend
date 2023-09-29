import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
   name: "auth",
   initialState: {
      user: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
    tokenExpiration: localStorage.getItem("tokenExpiration")
      ? parseInt(localStorage.getItem("tokenExpiration"))
      : null,
    registerMessage: null,
    loginMessage: null,
    isEmailVerified: false,
   },
   reducers: {
      login(state,action) {
        state.user = action.payload;
        state.tokenExpiration = action.payload.tokenExpiration;
        state.loginMessage = null;
      },
      logout(state) {
         state.user = null;
      },
      register(state,action) {
         state.registerMessage = action.payload;
      },
   
      setUsername(state,action) {
         state.user.username = action.payload;
      },
     
   }
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authActions, authReducer }