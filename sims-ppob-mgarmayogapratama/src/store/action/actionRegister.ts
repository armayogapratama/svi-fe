import { RegisterInterface } from "@/types/interface";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";

const initialState = {
  registerUser: [] as RegisterInterface[],
};

export const RegisterSlice = createSlice({
  name: "registerUser",
  initialState,
  reducers: {
    registrations: (state, { payload }) => {
      state.registerUser.push(payload);
    },
  },
});

export const { registrations } = RegisterSlice.actions;

export function registerNewUser(data: RegisterInterface) {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_KEY}/registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();

      if (result?.status === 0) {
        return result;
      }

      dispatch(registrations(result?.data));
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}

export default RegisterSlice.reducer;
