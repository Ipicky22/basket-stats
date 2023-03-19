import { useState } from "react";
import { View, Text, ScrollView, Pressable, Button } from "react-native";
import { Stack, useRouter } from "expo-router";
import { globalStore } from "../store/globalStore";

const Stats = () => {
	const { currentQuart } = globalStore();
	return (
		<ScrollView style={{ flex: 1 }}>
			<View
				style={{
					padding: 12,
				}}>
				<Stack.Screen
					options={{
						title: "Statistiques Quart " + (currentQuart + 1),
					}}
				/>
				<Text>Stats</Text>
			</View>
		</ScrollView>
	);
};

export default Stats;
