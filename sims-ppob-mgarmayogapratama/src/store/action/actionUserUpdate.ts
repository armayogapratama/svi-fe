import { UserUpdateInterface } from "@/types/interface";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import Cookies from "js-cookie";

const initialState = {
  userUpdate: [] as UserUpdateInterface[],
};

export const UserUpdateSlice = createSlice({
  name: "userUpdate",
  initialState,
  reducers: {
    userUpdates: (state, { payload }) => {
      state.userUpdate.push(payload);
    },
  },
});

export const { userUpdates } = UserUpdateSlice.actions;

export function UpdateUserData(data: UserUpdateInterface) {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_KEY}/profile/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();

      if (result?.status === 0) {
        return result;
      }

      dispatch(userUpdates(result?.data));
      return result;
    } catch (error) {
      console.log(error);
    }
  };
}

export default UserUpdateSlice.reducer;
