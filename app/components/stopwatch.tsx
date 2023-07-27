import { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";

const Stopwatch = ({
	setStartTimer,
	setCurrentStartTime,
	setCurrentEndTime,
}) => {
	const [time, setTime] = useState(0);
	const [running, setRunning] = useState(false);

	useEffect(() => {
		let interval: any;
		if (running) {
			interval = setInterval(() => {
				setTime((prevTime) => prevTime + 1000);
			}, 1000);
		} else if (!running) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [running]);

	const onStart = () => {
		setCurrentStartTime(time);
		setStartTimer(true);
		setRunning(true);
	};

	const onStop = () => {
		setStartTimer(false);
		setRunning(false);
		setCurrentEndTime(time);
	};

	return (
		<View
			style={{
				flexDirection: "row",
				marginBottom: 8,
			}}>
			<View
				style={{
					flexDirection: "row",
					flex: 1,
				}}>
				<Text style={{ fontSize: 32 }}>
					{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
				</Text>
				<Text style={{ fontSize: 32 }}>
					{("0" + Math.floor((time / 1000) % 60)).slice(-2)}
				</Text>
				{/* <Text style={{ fontSize: 32 }}>
					{("0" + ((time / 10) % 100)).slice(-2)}
				</Text> */}
			</View>
			<View
				style={{
					flex: 1,
					flexDirection: "row",
					justifyContent: "space-around",
					alignItems: "center",
				}}>
				<Button onPress={onStop} title='Stop' />
				<Button onPress={onStart} title='Start' />
				{/* <Button onPress={() => setTime(0)} title='Reset' /> */}
			</View>
		</View>
	);
};

export default Stopwatch;
