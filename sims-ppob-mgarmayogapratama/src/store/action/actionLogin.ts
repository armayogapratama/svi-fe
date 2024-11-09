import { LoginInterface } from "@/types/interface";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

const initialState = {
  loginUser: [] as LoginInterface[],
};

export const LoginSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    logins: (state, { payload }) => {
      state.loginUser.push(payload);
    },
  },
});

export const { logins } = LoginSlice.actions;

export function UserLogin(data: LoginInterface) {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_KEY}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result?.status === 0) {
        return result;
      }

      dispatch(logins(result?.data));
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}

export default LoginSlice.reducer;
