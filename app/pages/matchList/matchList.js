import { useRouter } from "expo-router";
import { globalStore } from "../../../store/globalStore";
import { View, Text, Pressable } from "react-native";
var moment = require("moment");

const MatchList = () => {
	const { matchs, setCurrentMatch } = globalStore();
	const router = useRouter();

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
			<Pressable
				onPress={() => {
					setCurrentMatch(match);
					if (match.team.length > 0) {
						router.push("pages/selectQuart");
					} else {
						router.push("pages/selectPlayers");
					}
				}}>
				<Text>{match.name}</Text>
				<Text>{match.type}</Text>
				<Text>{match.place}</Text>
				<Text>
					{moment.unix(match.date).format("MM/DD/YYYY hh:mm:ss")}
				</Text>
			</Pressable>
		</View>
	));
};

export default MatchList;
