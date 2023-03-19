import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Stack } from "expo-router";
import { globalStore } from "../store/globalStore";

const Equipe = () => {
	return (
		<ScrollView style={{ flex: 1 }}>
			<View style={{ padding: 12 }}>
				<Stack.Screen options={{ title: "Equipe" }} />
				<Text>Equipe</Text>
			</View>
		</ScrollView>
	);
};

export default Equipe;
