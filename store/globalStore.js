import { create } from "zustand";

const initialState = {
	matchs: [],
};

export const globalStore = create((set, get) => {
	return Object.assign(initialState, {
		matchs: [],
		addMatch(item) {
			const matchs = get().matchs;
			set({ matchs: [...matchs, item] });
		},
	});
});

export function useReset() {
	globalStore.setState(initialState);
}
