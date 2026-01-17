import { IUser } from "@/types/user-types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  isForgotPasswordModalOpen: boolean;
  isResetPasswordModalOpen: boolean;
  isUserVerifyModalOpen: boolean;
  user: IUser | null;
}

const initialState: GlobalState = {
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isForgotPasswordModalOpen: false,
  isResetPasswordModalOpen: false,
  isUserVerifyModalOpen: false,
  user: null,
};
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsLoginModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isLoginModalOpen = action.payload;
    },
    setIsRegisterModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isRegisterModalOpen = action.payload;
    },
    setIsForgotPasswordModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isForgotPasswordModalOpen = action.payload;
    },
    setIsResetPasswordModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isResetPasswordModalOpen = action.payload;
    },
    setIsUserVerifyModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isUserVerifyModalOpen = action.payload;
    },
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
  },
});

export const {
  setIsForgotPasswordModalOpen,
  setIsLoginModalOpen,
  setIsRegisterModalOpen,
  setIsResetPasswordModalOpen,
  setIsUserVerifyModalOpen,
  setUser,
} = globalSlice.actions;

export default globalSlice.reducer;
