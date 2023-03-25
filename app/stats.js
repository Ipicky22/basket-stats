import { useEffect, useState } from "react";
import { View, Text, Pressable, Button } from "react-native";
import { Stack } from "expo-router";
import { globalStore } from "../store/globalStore";
import Stopwatch from "./components/stopwatch";

const Stats = () => {
	const { currentMatch, currentQuart } = globalStore();
	const [startTimer, setStartTimer] = useState(false);
	const [currentStartTime, setCurrentStartTime] = useState(0);
	const [currentEndTime, setCurrentEndTime] = useState(0);

	const [selectedTeam, setSelectedTeam] = useState([]);
	const [statsArray, setStatsArray] = useState([
		"+1",
		"+2",
		"+3",
		"-1",
		"-2",
		"-3",
		"PD",
	]);
	const [selectedStat, setSelectedStat] = useState("");
	const [selectedStatPlayer, setSelectedStatPlayer] = useState("");
	const [statsPlayers, setStatsPlayers] = useState([]);

	useEffect(() => {
		let tmpArray = [];
		currentMatch.team.map((player) => {
			let objPlayer = {
				id: player,
				"+1": 0,
				"+2": 0,
				"+3": 0,
				"-1": 0,
				"-2": 0,
				"-3": 0,
				PD: 0,
				time: 0,
			};
			tmpArray.push(objPlayer);
		});
		setStatsPlayers(...statsPlayers, tmpArray);
	}, []);

	useEffect(() => {
		if (currentEndTime !== 0) {
			let diffTime = currentEndTime - currentStartTime;
			let fixStatsPlayers = statsPlayers;
			setStatsPlayers(
				fixStatsPlayers.map((player) => {
					console.log("id => ", player.id);
					if (selectedTeam.includes(player.id)) {
						prevValue = player["time"];
						return {
							...player,
							time: prevValue + diffTime,
						};
					} else {
						return player;
					}
				})
			);
			setCurrentStartTime(currentEndTime);
		}
	}, [currentEndTime]);

	const addStat = () => {
		let fixStatsPlayers = statsPlayers;
		setStatsPlayers(
			fixStatsPlayers.map((player) => {
				if (selectedStatPlayer == player.id) {
					prevValue = player[selectedStat];
					return {
						...player,
						[selectedStat]: prevValue + 1,
					};
				} else {
					return player;
				}
			})
		);
		setSelectedStat("");
		setSelectedStatPlayer("");
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
				<Button
					title={"Finir " + currentQuart.name}
					onPress={() => {
						setSelectedStat("");
						setSelectedStatPlayer("");
					}}
				/>
				<View style={{ marginTop: 16 }}>
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
					<Stopwatch
						setStartTimer={setStartTimer}
						setCurrentStartTime={setCurrentStartTime}
						setCurrentEndTime={setCurrentEndTime}
					/>
				</View>

				<Text style={{ fontSize: 24, marginTop: 16 }}>
					Statistiques
				</Text>
				<View
					style={{
						marginTop: 16,
						flexDirection: "row",
						flexWrap: "wrap",
					}}>
					{statsArray.map((item, index) => {
						return (
							<Pressable onPress={() => setSelectedStat(item)}>
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
										backgroundColor:
											selectedStat == item
												? "green"
												: null,
									}}
									key={item}>
									<Text>{item}</Text>
								</View>
							</Pressable>
						);
					})}
				</View>

				<Text style={{ fontSize: 24, marginTop: 16 }}>
					Assign to Player
				</Text>
				<View
					style={{
						marginTop: 16,
						flexDirection: "row",
						flexWrap: "wrap",
					}}>
					{selectedTeam.map((item, index) => {
						return (
							<Pressable
								onPress={() => setSelectedStatPlayer(item)}>
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
										backgroundColor:
											selectedStatPlayer == item
												? "green"
												: null,
									}}
									key={item}>
									<Text>{item}</Text>
								</View>
							</Pressable>
						);
					})}
				</View>
				<View
					style={{
						marginTop: 16,
						flexDirection: "row",
						justifyContent: "space-around",
					}}>
					<Button
						title='Reset Selected Stat'
						onPress={() => {
							setSelectedStat("");
							setSelectedStatPlayer("");
						}}
					/>
					<Button
						title='Add Stat'
						disabled={
							selectedStat !== "" && selectedStatPlayer !== ""
								? false
								: true
						}
						onPress={() => addStat()}
					/>
				</View>
			</View>
		</View>
	);
};

export default Stats;
