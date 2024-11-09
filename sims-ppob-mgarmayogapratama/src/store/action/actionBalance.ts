import { BalanceInterface } from "@/types/interface";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import Cookies from "js-cookie";

const initialState = {
  balance: {} as BalanceInterface,
};

export const BalanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {
    setBalance: (state, { payload }) => {
      state.balance = payload;
    },
  },
});

export const { setBalance } = BalanceSlice.actions;

export function fetchBalanceList() {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_KEY}/balance`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        cache: "no-store",
      });

      const result = await response.json();

      dispatch(setBalance(result.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export default BalanceSlice.reducer;
