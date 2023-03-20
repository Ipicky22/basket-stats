import { View, Text, ScrollView, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import { globalStore } from "../store/globalStore";
import { Ionicons } from "@expo/vector-icons";

const back = () => {
	const router = useRouter();
	return (
		<Pressable onPress={() => router.push("/")}>
			<Ionicons
				name='arrow-back'
				size={24}
				style={{ marginRight: 32 }}
				color='black'
			/>
		</Pressable>
	);
};

const QuartsList = () => {
	const { currentMatch, setCurrentQuart } = globalStore();
	const router = useRouter();

	return currentMatch.quart.map((quart, index) => (
		<View
			key={index}
			style={{
				borderColor: "black",
				borderStyle: "solid",
				borderWidth: 1,
				borderRadius: 5,
				padding: 4,
				marginBottom: 4,
				height: 42,
				justifyContent: "center",
				paddingLeft: 16,
			}}>
			<Pressable
				onPress={() => {
					setCurrentQuart(quart);
					router.push("stats");
				}}>
				<Text>{quart.name}</Text>
			</Pressable>
		</View>
	));
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
						title: "Selection Quart Temps",
						headerLeft: back,
					}}
				/>
				<QuartsList />
				{/* <View
					style={{
						borderColor: "black",
						borderStyle: "solid",
						borderWidth: 1,
						borderRadius: 5,
						padding: 4,
						marginBottom: 4,
						height: 42,
						justifyContent: "center",
						paddingLeft: 16,
					}}>
					<Pressable onPress={() => {}}>
						<Text>Ajouter une prolongation</Text>
					</Pressable>
				</View> */}
			</View>
		</ScrollView>
	);
};

export default SelectQuart;
