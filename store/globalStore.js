import { create } from "zustand";

export const globalStore = create((set, get) => ({
	matchs: [
		{
			id: "1",
			name: "INIT",
			type: "amical",
			place: "EXT",
			date: 1679227032,
			team: [],
		},
	],
	addMatch: (item) => {
		set({ matchs: [...get().matchs, item] });
	},
}));

export function useReset() {
	globalStore.setState(initialState);
}
