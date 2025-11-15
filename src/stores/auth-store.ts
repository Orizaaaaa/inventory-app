import type { IAuthProps } from "@/sso/types/auth";
import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

type AuthState = {
  user: IAuthProps | null;
  token: string | null;
  delAuthUser: () => void;
  setAuthUser: (user: IAuthProps | null, token: string | null) => void;
  resetAuth: () => void;
  hasPermission: (perm: string) => boolean;
  hasPermissionPrefix: (prefix: string) => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      delAuthUser: () => set({ user: null, token: null }),
      setAuthUser: (user: IAuthProps | null, token: string | null) => set({ user, token }),
      hasPermission: (perm: string) => {
        const user = get().user;
        return !!user?.permissions?.includes(perm);
      },
      resetAuth: () => {
        set({ user: null, token: null }); // reset state memory
        // clear localStorage persist & paksa reload state
        useAuthStore.persist.clearStorage();
        setTimeout(() => set({ user: null, token: null }), 0); // pastikan state di memory juga update
      },
      hasPermissionPrefix: (prefix: string) => {
        const user = get().user;
        return !!user?.permissions?.some(p => p.startsWith(prefix));
      },
    }),
    {
      name: "sso",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
