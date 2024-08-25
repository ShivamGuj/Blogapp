import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from 'jwt-decode';

const storedUser = localStorage.getItem('user');
console.log(storedUser);

const userFromStorage = storedUser ? JSON.parse(storedUser) : {};

const initialState = {
  email: userFromStorage.email || "",
  name: userFromStorage.name || "",
  _id: userFromStorage.id || "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      const token = action.payload.token;
      if (token) {
        const decoded = jwtDecode(token);
        console.log(decoded);
        
        state.name = decoded.name ;
        state.email = decoded.email ;
        state._id = decoded.id ;
        // Updating the local storage, so that user detail will not get empty

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({
          _id: decoded.id,
          name: decoded.name,
          email: decoded.email
        }));
      } else {
        console.error('Token is missing');
      }
    },
    logoutRedux: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;