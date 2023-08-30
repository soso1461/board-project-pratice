import { create } from "zustand";

interface BoardStore {
    title: string;
    contents: string;
    image: File | null;

    setTitle: (title: string) => void;
    setContents: (contents: string) => void;
    setImage: (image: File | null) => void;
}

const useBoardStore = create<BoardStore>((set) => ({
    title: '',
    contents: '',
    image: null,
    
    setTitle: (title: string) => { set((state) => ({ ...state, title })) },
    setContents: (contents: string) => { set((state) => ({ ...state, contents })) },
    setImage: (image: File | null) => { set((state) => ({ ...state, image })) }
}));

export default useBoardStore;