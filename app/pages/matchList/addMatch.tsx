import { useState } from "react";
import { Button, View, StyleSheet, TextInput } from "react-native";
import { globalStore } from "../../../store/globalStore";
import uuid from "react-native-uuid";
import Dropdown from "react-native-input-select";
import { Stack, useRouter } from "expo-router";

var moment = require("moment");

const AddMatch = () => {
	const router = useRouter();
	const { addMatch } = globalStore();

	const [nameMatch, setNameMatch] = useState("");

	const [selectedType, setSelectedType] = useState("");
	const [selectedPlace, setSelectedPlace] = useState("");

	const createMatch = () => {
		addMatch({
			uuid: uuid.v4() as string,
			name: nameMatch,
			type: selectedType,
			place: selectedPlace,
			status: "preparation",
			date: moment().unix(),
			team: [],
			quart: [
				{
					uuid: uuid.v4() as string,
					name: "Premier Quart Temps",
					status: "preparation",
					players: [],
				},
				{
					uuid: uuid.v4() as string,
					name: "Deuxieme Quart Temps",
					status: "preparation",
					players: [],
				},
				{
					uuid: uuid.v4() as string,
					name: "Troisieme Quart Temps",
					status: "preparation",
					players: [],
				},
				{
					uuid: uuid.v4() as string,
					name: "Quatrieme Quart Temps",
					status: "preparation",
					players: [],
				},
			],
		});
		onClear();
	};

	const onClear = () => {
		setNameMatch("");
		setSelectedType("");
		setSelectedPlace("");
		router.push("pages/matchList");
	};

	return (
		<View style={styles.centeredView}>
			<Stack.Screen options={{ title: "Add Match" }} />
			<TextInput
				style={{
					borderBottomWidth: 1,
					paddingHorizontal: 5,
					paddingVertical: 5,
					fontSize: 15,
					marginBottom: 16,
				}}
				onChangeText={setNameMatch}
				value={nameMatch}
				placeholder='Nom'
				placeholderTextColor='black'
			/>

			<Dropdown
				placeholder='Type'
				dropdownStyle={{
					borderWidth: 0,
					paddingVertical: 5,
					paddingHorizontal: 5,
					minHeight: 40,
					borderRadius: 0,
					borderBottomWidth: 1,
					backgroundColor: "transparent",
				}}
				dropdownIconStyle={{ top: 15, right: 10 }}
				options={[
					{ label: "Competitif", value: "competitif" },
					{ label: "Amical", value: "amical" },
				]}
				selectedValue={selectedType}
				onValueChange={(value: string) => setSelectedType(value)}
				primaryColor={"green"}
			/>

			<Dropdown
				placeholder='Lieu'
				dropdownStyle={{
					borderWidth: 0,
					paddingVertical: 5,
					paddingHorizontal: 5,
					minHeight: 40,
					borderRadius: 0,
					borderBottomWidth: 1,
					backgroundColor: "transparent",
				}}
				dropdownIconStyle={{ top: 15, right: 10 }}
				options={[
					{ label: "Domicile", value: "DOM" },
					{ label: "Exterieur", value: "EXT" },
				]}
				selectedValue={selectedPlace}
				onValueChange={(value: string) => setSelectedPlace(value)}
				primaryColor={"green"}
			/>

			<View style={styles.fixToText}>
				<Button title='Annuler' onPress={onClear} />
				<Button title='Valider' onPress={createMatch} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		marginTop: 22,
		paddingHorizontal: 32,
	},
	fixToText: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 12,
	},
});

export default AddMatch;
