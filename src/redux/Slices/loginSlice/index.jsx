import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  roleIs: undefined,
  loggedUserDetails: {},
  registerFormDetails: {},
  userDetails: {},
  error: null,
  loading: false,
  message: null,
  isRegistered: false,
};
const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedUser: (state, action) => {
      state.isLogged = action.payload;
    },
    setRoleIs: (state, action) => {
      state.roleIs = action.payload;
    },
    setLoggedUserDetails: (state, action) => {
      state.loggedUserDetails = action.payload;
    },
    setRegisterFormDetails: (state, action) => {
      state.registerFormDetails = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setIsRegistered: (state, action) => {
      state.isRegistered = action.payload;
    },
    deleteUserSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.message = "Account deleted successfully";

      localStorage.removeItem("token");
      localStorage.removeItem("role");

      return initialState;
    },
  },
});

export const {
  setLoggedUser,
  setRoleIs,
  setLoggedUserDetails,
  setRegisterFormDetails,
  setUserDetails,
  setError,
  setLoading,
  setMessage,
  setIsRegistered,
  deleteUserSuccess,
} = loginSlice.actions;

export default loginSlice.reducer;
