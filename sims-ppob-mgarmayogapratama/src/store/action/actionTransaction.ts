import { TransactionInterface } from "@/types/interface";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import Cookies from "js-cookie";

const initialState = {
  transaction: {} as TransactionInterface,
};

export const TransactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransaction: (state, { payload }) => {
      state.transaction = payload;
    },
  },
});

export const { setTransaction } = TransactionSlice.actions;

export function fetchTransactionHistories(offset?: number, limit?: number) {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_KEY
        }/transaction/history?offset=${offset}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          cache: "no-store",
        }
      );

      const result = await response.json();

      dispatch(setTransaction(result.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export default TransactionSlice.reducer;
