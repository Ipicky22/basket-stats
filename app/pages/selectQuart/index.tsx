import { View, ScrollView } from "react-native";
import { Stack } from "expo-router";
import QuartsList from "./quartList";
import HeaderRight from "./headerRight";
import HeaderLeft from "./headerLeft";

const SelectQuartScreen = () => {
	return (
		<ScrollView style={{ flex: 1 }}>
			<View
				style={{
					padding: 12,
				}}>
				<Stack.Screen
					options={{
						title: "Selection Quart Temps",
						headerLeft: HeaderLeft,
						headerRight: HeaderRight,
					}}
				/>
				<QuartsList />
			</View>
		</ScrollView>
	);
};

export default SelectQuartScreen;
