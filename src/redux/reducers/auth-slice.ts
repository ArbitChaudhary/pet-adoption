import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
  isAuthenticated: boolean;
  token: string | null;
  role: string | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  token: null,
  role: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setRole: (state, action: PayloadAction<string | null>) => {
      state.role = action.payload;
    },
  },
});

export const { setIsAuthenticated, setRole, setToken } = authSlice.actions;

export default authSlice.reducer;
