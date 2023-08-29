import { LoginUser } from "types";
import { create } from "zustand";

interface UserStore {
    user: LoginUser | null;
    setUser: (user: LoginUser) => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user: LoginUser) => { set((state) => ({ ...state, user })) }
}));

export default useUserStore;