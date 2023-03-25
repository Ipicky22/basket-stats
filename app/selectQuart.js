import { View, Text, ScrollView, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import { globalStore } from "../store/globalStore";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { StorageAccessFramework as SAF } from "expo-file-system";
import uuid from "react-native-uuid";

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

const right = () => {
	const { currentMatch } = globalStore();

	const download = async () => {
		const downloadDir = SAF.getUriForDirectoryInRoot("Download");
		const permission = await SAF.requestDirectoryPermissionsAsync(
			downloadDir
		);

		if (!permission.granted) {
			return false;
		}

		let nameFile = uuid.v4() + ".json";
		const destinationUri = await SAF.createFileAsync(
			permission.directoryUri,
			nameFile,
			"json"
		);

		await SAF.writeAsStringAsync(
			destinationUri,
			JSON.stringify(currentMatch)
		);
	};

	return (
		<Pressable onPress={() => download()}>
			<AntDesign
				name='download'
				size={24}
				style={{ marginRight: 16 }}
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
						headerRight: right,
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
