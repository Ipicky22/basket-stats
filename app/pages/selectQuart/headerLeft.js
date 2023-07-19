import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const HeaderLeft = () => {
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

export default HeaderLeft;
