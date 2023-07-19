import { useRouter } from "expo-router";
import { globalStore } from "../../../store/globalStore";
import { View, Text, Pressable } from "react-native";

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

export default QuartsList;
