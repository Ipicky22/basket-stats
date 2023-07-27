import { create } from "zustand";
import { Store } from "../types/store";
import { Match } from "../types/match";
import { Quart } from "../types/quart";

export const globalStore = create<Store>((set, get) => ({
	matchs: [
		// {
		// 	uuid: "1",
		// 	name: "INIT",
		// 	type: "amical",
		// 	place: "EXT",
		// 	date: 1679227032,
		// 	team: ["1", "2", "3", "4", "5", "6", "7", "8"],
		// 	quart: [
		// 		{
		// 			uuid: "1",
		// 			name: "Premier Quart Temps",
		// 			players: [],
		// 		},
		// 		{
		// 			uuid: "2",
		// 			name: "Deuxieme Quart Temps",
		// 			players: [],
		// 		},
		// 		{
		// 			uuid: "3",
		// 			name: "Troisieme Quart Temps",
		// 			players: [],
		// 		},
		// 		{
		// 			uuid: "4",
		// 			name: "Quatrieme Quart Temps",
		// 			players: [],
		// 		},
		// 	],
		// },
	],
	currentMatch: null,
	currentQuart: null,
	setCurrentMatch: (match: Match) => {
		set({ currentMatch: match });
	},
	addMatch: (match: Match) => {
		set({ matchs: [...get().matchs, match] });
	},
	setCurrentEquipe: (matchId: string, selectedTeam: string[]) => {
		set((state) => ({
			matchs: state.matchs.map((match: Match) => {
				if (match.uuid === matchId) {
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
	setCurrentQuart: (index: Quart) => {
		set({ currentQuart: index });
	},
	updateCurrentMatch: (quartData: Quart, fixQuart: Quart[]) => {
		set((state) => ({
			currentMatch: {
				...state.currentMatch,
				quart: fixQuart.map((item) => {
					if (item.uuid === quartData.uuid) {
						return quartData;
					} else {
						return item;
					}
				}),
			},
		}));
	},
}));

// export function useReset() {
// 	globalStore.setState(initialState);
// }
