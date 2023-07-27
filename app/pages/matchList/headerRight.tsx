import { Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const HeaderRight = () => {
	const router = useRouter();

	return (
		<Pressable onPress={() => router.push("pages/matchList/addMatch")}>
			<AntDesign
				name='plus'
				size={24}
				style={{ marginRight: 16 }}
				color='black'
			/>
		</Pressable>
	);
};

export default HeaderRight;
