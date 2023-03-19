import { useEffect } from "react";
import { Button, View, Text } from "react-native";
import { Stack } from "expo-router";
import { useReset, globalStore } from "../store/globalStore";
var moment = require("moment");

const MatchsList = () => {
	const { matchs } = globalStore();
	console.log(matchs);
	return matchs.map((match) => (
		<View
			key={match.id}
			style={{
				borderColor: "black",
				borderStyle: "solid",
				borderWidth: 1,
				borderRadius: 5,
				padding: 4,
				marginBottom: 4,
			}}>
			<Text>{match.name}</Text>
			<Text>{match.type}</Text>
			<Text>{match.place}</Text>
			<Text>{moment.unix(match.date).format("MM/DD/YYYY hh:mm:ss")}</Text>
		</View>
	));
};

const Home = () => {
	const { matchs, addMatch } = globalStore();

	useEffect(() => {
		addMatch({
			id: "1",
			name: "match 1",
			type: "amical",
			place: "competitif",
			date: 1679227032,
		});
	}, []);

	return (
		<View style={{ flex: 1, padding: 12 }}>
			<Stack.Screen options={{ title: "Matchs" }} />
			<MatchsList />
			<Button title='Ajouter un match' />
		</View>
	);
};

export default Home;
