import { create } from "zustand";

export const globalStore = create((set, get) => ({
	matchs: [
		{
			id: "1",
			name: "INIT",
			type: "amical",
			place: "EXT",
			date: 1679227032,
			team: ["1", "2", "3", "4", "5", "6", "7", "8"],
			quart: [
				{
					id: "1",
					name: "Premier Quart Temps",
				},
				{
					id: "2",
					name: "Deuxieme Quart Temps",
				},
				{
					id: "3",
					name: "Troisieme Quart Temps",
				},
				{
					id: "4",
					name: "Quatrieme Quart Temps",
				},
			],
		},
	],
	currentMatch: {},
	currentQuart: null,
	setCurrentMatch: (match) => {
		set({ currentMatch: match });
	},
	addMatch: (item) => {
		set({ matchs: [...get().matchs, item] });
	},
	setEquipe: (matchId, selectedTeam) => {
		set((state) => ({
			matchs: state.matchs.map((match) => {
				if (match.id === matchId) {
					return { ...match, team: selectedTeam };
				} else {
					return match;
				}
			}),
		}));
		set((state) => ({
			currentMatch: { ...state.currentMatch, team: selectedTeam },
		}));
	},
	setCurrentQuart: (index) => {
		set({ currentQuart: index });
	},
}));

export function useReset() {
	globalStore.setState(initialState);
}
