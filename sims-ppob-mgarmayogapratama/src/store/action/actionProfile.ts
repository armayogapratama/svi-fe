import { ProfileInterface } from "@/types/interface";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { AppDispatch } from "../store";

const initialState = {
  profileUser: {} as ProfileInterface,
};

export const ProfileSlice = createSlice({
  name: "profileUser",
  initialState,
  reducers: {
    setProfile: (state, { payload }) => {
      state.profileUser = payload;
    },
  },
});

export const { setProfile } = ProfileSlice.actions;

export function fetchProfileUser() {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_KEY}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        cache: "no-store",
      });

      const result = await response.json();

      dispatch(setProfile(result.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export default ProfileSlice.reducer;
