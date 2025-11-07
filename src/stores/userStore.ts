import { SyncStatus } from "@/types";
import { getUserData } from "@/utils/API";
import { create } from "zustand";



interface UserState {
 userData: {
  name: string;
  email: string;
 }
 userStatus: SyncStatus;
 fetchUserData: () => Promise<void>;
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
   set({ userData: response, userStatus: SyncStatus.SYNCED });
  } catch (error) {
   set({ userStatus: SyncStatus.FAILED });
   throw error;
  }
 }
}))