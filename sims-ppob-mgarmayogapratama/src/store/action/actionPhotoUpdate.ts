import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import Cookies from "js-cookie";

const initialState = {
  photo: null as string | null,
};

export const PhotoUpdateSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    updatePhoto: (state, { payload }) => {
      state.photo = payload;
    },
  },
});

export const { updatePhoto } = PhotoUpdateSlice.actions;

export function UpdateProfilePhoto(formData: FormData) {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_KEY}/profile/image`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: formData,
          cache: "no-store",
        }
      );
      const result = await response.json();

      if (result?.status === 0) {
        return result;
      }

      dispatch(updatePhoto(result?.data));
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}

export default PhotoUpdateSlice.reducer;
