import { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList, Button } from "react-native";
import { Stack, useRouter } from "expo-router";
import { globalStore } from "../store/globalStore";
import { Stopwatch } from "react-native-stopwatch-timer";

const AddPoints = () => {
	const addPointsTab = ["+1", "+2", "+3"];
	return (
		<View style={{ flexDirection: "row", justifyContent: "space-around" }}>
			{addPointsTab.map((item, index) => {
				return (
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
						}}
						key={"add" + (index + 1)}>
						<Text>{item}</Text>
					</View>
				);
			})}
		</View>
	);
};

const FailedPoints = () => {
	const failedPointsTab = ["-1", "-2", "-3"];
	return (
		<View style={{ flexDirection: "row", justifyContent: "space-around" }}>
			{failedPointsTab.map((item, index) => {
				return (
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
						}}
						key={"failed" + (index + 1)}>
						<Text>{item}</Text>
					</View>
				);
			})}
		</View>
	);
};

const Stats = () => {
	const { currentMatch, currentQuart } = globalStore();
	const [startTimer, setStartTimer] = useState(false);
	const [selectedTeam, setSelectedTeam] = useState([]);

	const options = {
		text: {
			fontSize: 30,
			color: "#000",
			marginLeft: 7,
		},
	};

	const selectedPlayer = (number) => {
		if (startTimer === false) {
			if (selectedTeam.length < 5) {
				setSelectedTeam([...selectedTeam, number]);
			}

			if (selectedTeam.includes(number)) {
				setSelectedTeam(
					selectedTeam.filter((player) => {
						return player != number;
					})
				);
			}
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					padding: 12,
				}}>
				<Stack.Screen
					options={{
						title: currentQuart.name,
					}}
				/>
				<View>
					<Text style={{ fontSize: 24 }}>Temps de jeu</Text>
					<View
						style={{
							flexDirection: "row",
							flexWrap: "wrap",
							marginTop: 8,
						}}>
						{currentMatch.team.map((player) => {
							return (
								<Pressable
									onPress={() => selectedPlayer(player)}>
									<View
										style={{
											borderColor: "black",
											borderStyle: "solid",
											borderWidth: 1,
											borderRadius: 5,
											margin: 4,
											height: 55,
											width: 55,
											justifyContent: "center",
											alignItems: "center",
											backgroundColor:
												selectedTeam.includes(player)
													? "green"
													: null,
										}}>
										<Text style={{ fontSize: 20 }}>
											{player}
										</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
					<View style={{ marginTop: 8, alignItems: "center" }}>
						<Stopwatch
							start={startTimer}
							reset={false}
							options={options}
							msecs
						/>
					</View>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-around",
							marginTop: 16,
						}}>
						<Button
							title='Play'
							disabled={selectedTeam.length < 5 ? true : false}
							onPress={() => setStartTimer(true)}
						/>
						<Button
							title='Stop'
							onPress={() => setStartTimer(false)}
						/>
					</View>
				</View>

				<View style={{ marginTop: 16 }}>
					<Text style={{ fontSize: 24 }}>Statistiques</Text>
					<AddPoints />
					<FailedPoints />
				</View>
			</View>
		</View>
	);
};

export default Stats;
