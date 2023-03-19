import { useState } from "react";
import { View, Text, ScrollView, Pressable, Button } from "react-native";
import { Stack, useRouter } from "expo-router";
import { globalStore } from "../store/globalStore";

const SelectEquipe = () => {
	const router = useRouter();
	const { currentMatch, setEquipe } = globalStore();
	const [selectedTeam, setSelectedTeam] = useState([]);

	const selectedPlayer = (number) => {
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
		<ScrollView style={{ flex: 1 }}>
			<View
				style={{
					padding: 12,
				}}>
				<Stack.Screen
					options={{
						title: selectedTeam.length + "/12 joueurs selectionnés",
					}}
				/>
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
								onPress={() => selectedPlayer(index)}>
								<View
									style={{
										borderColor: "black",
										borderStyle: "solid",
										borderWidth: 1,
										borderRadius: 5,
										width: 50,
										height: 50,
										justifyContent: "center",
										alignItems: "center",
										margin: 4,
										backgroundColor: selectedTeam.includes(
											index
										)
											? "green"
											: null,
									}}>
									<Text>{index}</Text>
								</View>
							</Pressable>
						);
					})}
				</View>
				<Button
					title='Valider'
					disabled={selectedTeam.length < 5 ? true : false}
					onPress={() => {
						setEquipe(currentMatch.id, selectedTeam);
						router.push("/selectQuart");
					}}
				/>
			</View>
		</ScrollView>
	);
};

export default SelectEquipe;
