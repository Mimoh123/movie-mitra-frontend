import { SyncStatus } from "@/types";
import { getUserData, updateUserApi } from "@/utils/API";
import { create } from "zustand";
import { toast } from "sonner";



interface UserState {
 userData: {
  name: string;
  email: string;
 }
 userStatus: SyncStatus;
 fetchUserData: () => Promise<void>;
 updateUserData: (userData: { name?: string; email?: string }) => Promise<void>;
 resetUserData: () => void;
}

const initialState = {
 userData: {
  name: '',
  email: '',
 },
 userStatus: SyncStatus.LOCAL,
}


export const useUserStore = create<UserState>((set) => ({
 ...initialState,
 fetchUserData: async () => {
  set({ userStatus: SyncStatus.LOADING });
  try {
   const response = await getUserData();
   set({ userData: response.data, userStatus: SyncStatus.SYNCED });
  } catch (error: any) {
   set({ userStatus: SyncStatus.FAILED });
   if (error?.response) {
    // toast.error(error.response.data?.message || "Failed to fetch user data");
   } else {
    // toast.error(error?.message || "Failed to fetch user data");
   }
   throw error;
  }
 },
 updateUserData: async (userData: { name?: string; email?: string }) => {
  set({ userStatus: SyncStatus.LOADING });
  try {
   const response = await updateUserApi(userData);
   set({ userData: response.data, userStatus: SyncStatus.SYNCED });
  } catch (error: any) {
   set({ userStatus: SyncStatus.FAILED });
   if (error?.response) {
    toast.error(error.response.data?.message || "Failed to update user data");
   } else {
    toast.error(error?.message || "Failed to update user data");
   }
   throw error;
  }
 },
 resetUserData: () => {
  set({ ...initialState });
 }
}))