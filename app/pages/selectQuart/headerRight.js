import { Pressable } from "react-native";
import { globalStore } from "../../../store/globalStore";
import { AntDesign } from "@expo/vector-icons";
import { StorageAccessFramework as SAF } from "expo-file-system";
import uuid from "react-native-uuid";

const HeaderRight = () => {
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

export default HeaderRight;
