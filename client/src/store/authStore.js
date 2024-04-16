import { create } from "zustand";

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
export const setToke = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const useAuthStore = create((set) => ({
  isLogin: getToken() ? true : false,
  login: (token) => {
    set({ isLogin: true });
    setToke(token);
  },
  logout: () => {
    set({ isLogin: false });
    removeToken();
  },
}));
