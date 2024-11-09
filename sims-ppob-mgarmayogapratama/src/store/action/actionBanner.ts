import { BannerInterface } from "@/types/interface";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import Cookies from "js-cookie";

const initialState = {
  banner: [] as BannerInterface[],
};

export const BannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    setBanner: (state, { payload }) => {
      state.banner = payload;
    },
  },
});

export const { setBanner } = BannerSlice.actions;

export function fetchBannerLists() {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_KEY}/banner`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        cache: "no-store",
      });

      const result = await response.json();

      dispatch(setBanner(result.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export default BannerSlice.reducer;
