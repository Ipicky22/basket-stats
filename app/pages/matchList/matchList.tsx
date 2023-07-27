import { useRouter } from "expo-router";
import { globalStore } from "../../../store/globalStore";
import { View, Text, Pressable } from "react-native";
var moment = require("moment");

const MatchList = () => {
	const { matchs, setCurrentMatch } = globalStore();
	const router = useRouter();

	const borderColorByStatus = (status: string) => {
		if (status === "preparation") {
			return "orange";
		} else if (status === "fini") {
			return "green";
		} else if (status === "en cours") {
			return "blue";
		} else {
			return "red";
		}
	};

	return (
		<>
			{matchs.map((match) => (
				<View
					key={match.uuid}
					style={{
						borderRadius: 3,
						marginBottom: 4,
						backgroundColor: "white",
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 1,
						},
						shadowOpacity: 0.22,
						shadowRadius: 2.22,
						elevation: 3,
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
						<View style={{ display: "flex", flexDirection: "row" }}>
							<View
								style={{
									flex: 70,
									paddingHorizontal: 8,
									paddingVertical: 4,
								}}>
								<View
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
										marginBottom: 4,
										padding: 4,
									}}>
									<Text
										style={{
											fontSize: 15,
											fontWeight: "500",
										}}>
										{match.name}
									</Text>
									<Text style={{ width: 71 }}>
										{moment
											.unix(match.date)
											.format("DD/MM/YYYY")}
									</Text>
								</View>
								<View
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
										padding: 4,
									}}>
									<Text>{match.type}</Text>
									<Text>{match.place}</Text>
								</View>
							</View>
							<View
								style={{
									backgroundColor: borderColorByStatus(
										match.status
									),
									flex: 1,
									borderTopEndRadius: 3,
									borderBottomEndRadius: 3,
								}}></View>
						</View>
					</Pressable>
				</View>
			))}
		</>
	);
};

export default MatchList;
