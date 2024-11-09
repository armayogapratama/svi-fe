import { ServiceInterface } from "@/types/interface";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import Cookies from "js-cookie";

const initialState = {
  services: [] as ServiceInterface[],
};

export const ServiceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setServices: (state, { payload }) => {
      state.services = payload;
    },
  },
});

export const { setServices } = ServiceSlice.actions;

export function fetchServiceLists() {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_KEY}/services`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        cache: "no-store",
      });

      const result = await response.json();

      dispatch(setServices(result.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export default ServiceSlice.reducer;
