import { create } from "zustand";
import type { Doctor, DoctorStore } from "../types/prescription";

export const useAuthDoctor = create<DoctorStore>()((set) => ({
  user: null,
  accessToken: null,

  setAuth: (user: Doctor, accessToken: string) => set({ user, accessToken }),
  clearAuth: () => set({ user: null, accessToken: null }),
}));

export const useDoctorData = () => useAuthDoctor((state) => state.user);
