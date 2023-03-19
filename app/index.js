import { View, Text } from "react-native";
import { Stack } from "expo-router";

const Home = () => {
	return (
		<View>
			<Stack.Screen options={{ title: "Historique" }} />
			<Text>Home</Text>
		</View>
	);
};

export default Home;
