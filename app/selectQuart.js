import { useState } from "react";
import { View, Text, ScrollView, Pressable, Button } from "react-native";
import { Stack, useRouter } from "expo-router";
import { globalStore } from "../store/globalStore";

const back = () => {
	const router = useRouter();
	return <Button title='Back' onPress={() => router.push("/")} />;
};
const SelectQuart = () => {
	return (
		<ScrollView style={{ flex: 1 }}>
			<View
				style={{
					padding: 12,
				}}>
				<Stack.Screen
					options={{
						title: "Selection quart temps",
						headerLeft: back,
					}}
				/>
				<Text>SelectQuart</Text>
			</View>
		</ScrollView>
	);
};

export default SelectQuart;
