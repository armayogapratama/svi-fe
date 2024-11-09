import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import Cookies from "js-cookie";

const initialState = {
  payment: {},
};

export const PaymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    payments: (state, { payload }) => {
      state.payment = payload;
    },
  },
});

export const { payments } = PaymentSlice.actions;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createPayment(data: any) {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_KEY}/transaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify(data),
          cache: "no-store",
        }
      );
      const result = await response.json();

      if (result?.status === 0) {
        return result;
      }

      dispatch(payments(result?.data));
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}

export default PaymentSlice.reducer;
