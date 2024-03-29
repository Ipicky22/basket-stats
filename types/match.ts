import { Quart } from "./quart";

export interface Match {
	uuid: string;
	name: string;
	type: string;
	place: string;
	date: number;
	status: string;
	team: string[];
	quart: Quart[];
}
