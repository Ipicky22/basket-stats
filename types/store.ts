import { Match } from "./match";
import { Quart } from "./quart";

export interface Store {
	matchs: Match[];
	currentMatch: Match;
	currentQuart: Quart;

	setCurrentMatch: (match: Match) => void;
	setCurrentQuart: (quart: Quart) => void;
	setCurrentEquipe: (matchId: string, equipe: string[]) => void;

	addMatch: (match: Match) => void;
	updateCurrentMatch: (quartData: Quart, fixQuart: Quart[]) => void;
}
