import { View, ScrollView } from "react-native";
import MatchList from "./matchList";
import { Stack } from "expo-router";
import HeaderRight from "./headerRight";

const MatchListScreen = () => {
	return (
		<ScrollView style={{ flex: 1 }}>
			<View style={{ padding: 12 }}>
				<Stack.Screen
					options={{ title: "Match List", headerRight: HeaderRight }}
				/>
				<MatchList />
			</View>
		</ScrollView>
	);
};

export default MatchListScreen;
