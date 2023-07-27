import { useRouter } from "expo-router";
import { globalStore } from "../../../store/globalStore";
import { View, Text, Pressable } from "react-native";

const QuartsList = () => {
	const { currentMatch, setCurrentQuart } = globalStore();
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
			{currentMatch.quart.map((quart, index) => (
				<View
					key={index}
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
							setCurrentQuart(quart);
							router.push("pages/matchLive");
						}}>
						<View style={{ display: "flex", flexDirection: "row" }}>
							<View
								style={{
									flex: 70,
									paddingHorizontal: 8,
									paddingVertical: 16,
								}}>
								<Text>{quart.name}</Text>
							</View>
							<View
								style={{
									backgroundColor: borderColorByStatus(
										quart.status
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

export default QuartsList;
