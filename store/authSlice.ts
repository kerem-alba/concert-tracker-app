import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
  },
});

console.log("authSlice loaded"); // Bu satır, authSlice'ın yüklendiğini doğrulamak için

export const { setAccessToken, clearAccessToken } = authSlice.actions;

export default authSlice.reducer;
