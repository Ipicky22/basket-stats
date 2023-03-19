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
	currentMatch: null,
	setCurrentMatch: (matchId) => {
		set({ currentMatch: matchId });
	},
	addMatch: (item) => {
		set({ matchs: [...get().matchs, item] });
	},
	setEquipe: (matchId, selectedTeam) => {
		set({
			matchs: get().matchs.map((match) => {
				if (match.id === matchId) {
					return { ...match, team: selectedTeam };
				} else {
					return match;
				}
			}),
		});
	},
}));

export function useReset() {
	globalStore.setState(initialState);
}
