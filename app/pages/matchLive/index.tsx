import { useEffect, useState } from "react";
import { View, Text, Pressable, Button } from "react-native";
import { Stack } from "expo-router";
import { globalStore } from "../../../store/globalStore";
import Stopwatch from "../../components/stopwatch";
import { Player } from "../../../types/player";
import HeaderRight from "./headerRight";
import magicNumber from "../../../utils/magicNumber";

const MatchLiveScreen = () => {
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
	const [statsPlayers, setStatsPlayers] = useState<Player[]>([]);

	useEffect(() => {
		let tmpArray: Player[] = [];
		currentMatch.team.map((player: string) => {
			let objPlayer: Player = {
				uuid: player,
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
		//@ts-ignore
		setStatsPlayers(...statsPlayers, tmpArray);
	}, []);

	useEffect(() => {
		if (currentEndTime !== 0) {
			let diffTime = currentEndTime - currentStartTime;
			let fixStatsPlayers = statsPlayers;
			setStatsPlayers(
				fixStatsPlayers.map((player) => {
					if (selectedTeam.includes(player.uuid)) {
						let prevValue = player["time"];
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
				if (selectedStatPlayer == player.uuid) {
					let prevValue = player[selectedStat];
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

	// const endQuart = () => {
	// 	let result = currentQuart;
	// 	result["players"] = statsPlayers;
	// 	updateCurrentMatch(result, currentMatch.quart);
	// };

	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					padding: 12,
				}}>
				<Stack.Screen
					options={{
						title: currentQuart.name,
						headerRight: () => (
							<HeaderRight statsPlayers={statsPlayers} />
						),
					}}
				/>
				{/* <Button
					title={"Finir " + currentQuart.name}
					onPress={endQuart}
				/> */}
				<View style={{ marginTop: 16 }}>
					<Text style={{ fontSize: 15 }}>Temps</Text>
					<Stopwatch
						setStartTimer={setStartTimer}
						setCurrentStartTime={setCurrentStartTime}
						setCurrentEndTime={setCurrentEndTime}
					/>
					<Text style={{ fontSize: 15 }}>Equipe</Text>
					<View
						style={{
							flexDirection: "row",
							flexWrap: "wrap",
							marginTop: 8,
						}}>
						{currentMatch.team.map((player: string) => {
							return (
								<Pressable
									key={"player_" + player}
									onPress={() => selectedPlayer(player)}>
									<View
										style={{
											borderRadius: 3,
											margin: 4,
											height: 55,
											width: 55,
											justifyContent: "center",
											alignItems: "center",
											shadowColor: "#000",
											shadowOffset: {
												width: 0,
												height: 1,
											},
											shadowOpacity: 0.22,
											shadowRadius: 2.22,
											elevation: 3,
											backgroundColor: "white",
										}}>
										<Text style={{ fontSize: 20 }}>
											{player}
										</Text>
										{selectedTeam.includes(player) ? (
											<Text
												style={{
													position: "absolute",
													bottom: 0,
													right: 2,
													fontWeight: "500",
													color: magicNumber.green,
												}}>
												IN
											</Text>
										) : (
											<Text
												style={{
													position: "absolute",
													bottom: 0,
													right: 2,
													fontWeight: "500",
													color: magicNumber.red,
												}}>
												OUT
											</Text>
										)}
									</View>
								</Pressable>
							);
						})}
					</View>
					<Text style={{ fontSize: 15, marginTop: 16 }}>Joueurs</Text>
					<View
						style={{
							marginTop: 16,
							flexDirection: "row",
							flexWrap: "wrap",
						}}>
						{selectedTeam.map((item, index) => {
							return (
								<Pressable
									onPress={() =>
										item === selectedStatPlayer
											? setSelectedStatPlayer("")
											: setSelectedStatPlayer(item)
									}
									key={"team_" + index}>
									<View
										style={{
											borderRadius: 3,
											width: 50,
											height: 50,
											justifyContent: "center",
											alignItems: "center",
											margin: 4,
											shadowColor: "#000",
											shadowOffset: {
												width: 0,
												height: 1,
											},
											shadowOpacity: 0.22,
											shadowRadius: 2.22,
											elevation: 3,
											backgroundColor:
												selectedStatPlayer == item
													? magicNumber.green
													: "white",
										}}
										key={item}>
										<Text>{item}</Text>
									</View>
								</Pressable>
							);
						})}
					</View>
				</View>

				<Text style={{ fontSize: 15, marginTop: 16 }}>
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
							<Pressable
								onPress={() =>
									item === selectedStat
										? setSelectedStat("")
										: setSelectedStat(item)
								}
								key={"stats_" + index}>
								<View
									style={{
										borderRadius: 3,
										width: 50,
										height: 50,
										justifyContent: "center",
										alignItems: "center",
										margin: 4,
										shadowColor: "#000",
										shadowOffset: {
											width: 0,
											height: 1,
										},
										shadowOpacity: 0.22,
										shadowRadius: 2.22,
										elevation: 3,
										backgroundColor:
											selectedStat == item
												? magicNumber.green
												: "white",
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

export default MatchLiveScreen;
