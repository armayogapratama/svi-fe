import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import Cookies from "js-cookie";

const initialState = {
  topup: {},
};

export const TopUpSlice = createSlice({
  name: "topup",
  initialState,
  reducers: {
    topups: (state, { payload }) => {
      state.topup = payload;
    },
  },
});

export const { topups } = TopUpSlice.actions;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createTopUp(data: any) {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_KEY}/topup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body: JSON.stringify(data),
        cache: "no-store",
      });
      const result = await response.json();

      if (result?.status === 0) {
        return result;
      }

      dispatch(topups(result?.data));
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}

export default TopUpSlice.reducer;
