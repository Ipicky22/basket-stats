import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { globalStore } from "../../../store/globalStore";

const HeaderRight = ({ statsPlayers }) => {
	const router = useRouter();
	const { currentMatch, currentQuart, updateCurrentMatch } = globalStore();

	const saveQuart = () => {
		let result = currentQuart;
		result["players"] = statsPlayers;
		updateCurrentMatch(result, currentMatch.quart);
		router.push("pages/selectQuart");
	};

	return (
		<Pressable onPress={saveQuart}>
			<AntDesign
				name='save'
				size={24}
				style={{ marginRight: 16 }}
				color='black'
			/>
		</Pressable>
	);
};

export default HeaderRight;
