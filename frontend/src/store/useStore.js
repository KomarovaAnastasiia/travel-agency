import { create } from 'zustand';

const useStore = create((set) => ({
  tours: [],
  setTours: (tours) => set({ tours }),
  user: null,
  setUser: (user) => set({ user }),
}));

export default useStore;