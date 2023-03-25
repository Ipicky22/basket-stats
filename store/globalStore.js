import { create } from "zustand";

export const globalStore = create((set, get) => ({
	matchs: [
		// {
		// 	id: "1",
		// 	name: "INIT",
		// 	type: "amical",
		// 	place: "EXT",
		// 	date: 1679227032,
		// 	team: ["1", "2", "3", "4", "5", "6", "7", "8"],
		// 	quart: [
		// 		{
		// 			id: "1",
		// 			name: "Premier Quart Temps",
		// 			players: [],
		// 		},
		// 		{
		// 			id: "2",
		// 			name: "Deuxieme Quart Temps",
		// 			players: [],
		// 		},
		// 		{
		// 			id: "3",
		// 			name: "Troisieme Quart Temps",
		// 			players: [],
		// 		},
		// 		{
		// 			id: "4",
		// 			name: "Quatrieme Quart Temps",
		// 			players: [],
		// 		},
		// 	],
		// },
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
	updateCurrentMatch: (quartData, fixQuart) => {
		set((state) => ({
			currentMatch: {
				...state.currentMatch,
				quart: fixQuart.map((item) => {
					if (item.id === quartData.id) {
						return quartData;
					} else {
						return item;
					}
				}),
			},
		}));
	},
}));

export function useReset() {
	globalStore.setState(initialState);
}
