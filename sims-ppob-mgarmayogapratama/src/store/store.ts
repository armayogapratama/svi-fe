import { configureStore } from "@reduxjs/toolkit";
import RegisterSlice from "./action/actionRegister";
import LoginSlice from "./action/actionLogin";
import ProfileSlice from "./action/actionProfile";
import BannerSlice from "./action/actionBanner";
import ServiceSlice from "./action/actionService";
import BalanceSlice from "./action/actionBalance";
import PhotoUpdateSlice from "./action/actionPhotoUpdate";
import UserUpdateSlice from "./action/actionUserUpdate";
import TopUpSlice from "./action/actionTopup";
import TransactionSlice from "./action/actionTransaction";
import PaymentSlice from "./action/actionPayment";

const store = configureStore({
  reducer: {
    register: RegisterSlice,
    login: LoginSlice,
    profile: ProfileSlice,
    banner: BannerSlice,
    service: ServiceSlice,
    balance: BalanceSlice,
    photo: PhotoUpdateSlice,
    userData: UserUpdateSlice,
    topup: TopUpSlice,
    transaction: TransactionSlice,
    payment: PaymentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
