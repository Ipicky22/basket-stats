import { useState } from "react";
import { View, Text, ScrollView, Pressable, Button } from "react-native";
import { Stack, useRouter } from "expo-router";
import { globalStore } from "../../../store/globalStore";
import magicNumber from "../../../utils/magicNumber";

const SelectPlayersScreen = () => {
	const router = useRouter();
	const { currentMatch, setCurrentEquipe } = globalStore();
	const [selectedTeam, setSelectedTeam] = useState([]);

	const selectedPlayer = (number: string) => {
		if (selectedTeam.length < 12) {
			setSelectedTeam([...selectedTeam, number]);
		}

		if (selectedTeam.includes(number)) {
			setSelectedTeam(
				selectedTeam.filter((player) => {
					return player != number;
				})
			);
		}
	};

	return (
		<View
			style={{
				padding: 12,
				flex: 1,
			}}>
			<Stack.Screen
				options={{
					title: selectedTeam.length + "/12 Joueurs Selectionnés",
				}}
			/>
			<ScrollView style={{ marginBottom: 32 }}>
				<View
					style={{
						flexDirection: "row",
						flexWrap: "wrap",
						justifyContent: "center",
						marginBottom: 4,
					}}>
					{[...Array(100).keys()].map((item, index) => {
						return (
							<Pressable
								key={index}
								onPress={() =>
									selectedPlayer(index.toString())
								}>
								<View
									style={{
										borderColor: "black",
										borderStyle: "solid",
										borderRadius: 3,
										marginBottom: 4,
										width: 50,
										height: 50,
										justifyContent: "center",
										alignItems: "center",
										margin: 4,
										backgroundColor: selectedTeam.includes(
											index.toString()
										)
											? magicNumber.green
											: "white",
										shadowColor: "#000",
										shadowOffset: {
											width: 0,
											height: 1,
										},
										shadowOpacity: 0.22,
										shadowRadius: 2.22,
										elevation: 3,
									}}>
									<Text>{index}</Text>
								</View>
							</Pressable>
						);
					})}
				</View>
			</ScrollView>
			<Button
				title='Valider'
				disabled={selectedTeam.length < 5 ? true : false}
				onPress={() => {
					setCurrentEquipe(currentMatch.uuid, selectedTeam);
					router.push("pages/selectQuart");
				}}
			/>
		</View>
	);
};

export default SelectPlayersScreen;
