import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/authSlice";

const userStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof userStore.getState>;
export type AppDispatch = typeof userStore.dispatch;

export default userStore;