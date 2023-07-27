import { useState } from "react";
import { Button, View, Text, Modal, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { globalStore } from "../../../store/globalStore";
import uuid from "react-native-uuid";
var moment = require("moment");

const ModalAddMatch = () => {
	const { addMatch } = globalStore();
	const [modalVisible, setModalVisible] = useState(false);

	const [nameMatch, setNameMatch] = useState("");

	const [selectedType, setSelectedType] = useState("");
	const [pickerTypeFocused, setPickerTypeFocused] = useState(false);

	const [selectedPlace, setSelectedPlace] = useState("");
	const [pickerPlaceFocused, setPickerPlaceFocused] = useState(false);

	const createMatch = () => {
		addMatch({
			uuid: uuid.v4() as string,
			name: nameMatch,
			type: selectedType,
			place: selectedPlace,
			date: moment().unix(),
			team: [],
			quart: [
				{
					uuid: uuid.v4() as string,
					name: "Premier Quart Temps",
					players: [],
				},
				{
					uuid: uuid.v4() as string,
					name: "Deuxieme Quart Temps",
					players: [],
				},
				{
					uuid: uuid.v4() as string,
					name: "Troisieme Quart Temps",
					players: [],
				},
				{
					uuid: uuid.v4() as string,
					name: "Quatrieme Quart Temps",
					players: [],
				},
			],
		});
		setNameMatch("");
		setSelectedType("");
		setSelectedPlace("");
		setModalVisible(false);
	};

	return (
		<>
			<Button
				title='Ajouter un match'
				onPress={() => setModalVisible(true)}
			/>
			<Modal
				animationType='none'
				transparent={true}
				visible={modalVisible}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>Ajouter un match</Text>
						<TextInput
							style={styles.input}
							onChangeText={setNameMatch}
							value={nameMatch}
							placeholder='Nom'
						/>
						<Picker
							onFocus={() => setPickerTypeFocused(true)}
							onBlur={() => setPickerTypeFocused(false)}
							selectedValue={selectedType}
							onValueChange={(itemValue) =>
								setSelectedType(itemValue)
							}>
							<Picker.Item
								label='Type'
								value=''
								enabled={!pickerTypeFocused}
							/>
							<Picker.Item
								label='Competitif'
								value='competitif'
							/>
							<Picker.Item label='Amical' value='amical' />
						</Picker>
						<Picker
							onFocus={() => setPickerPlaceFocused(true)}
							onBlur={() => setPickerPlaceFocused(false)}
							selectedValue={selectedPlace}
							onValueChange={(itemValue) =>
								setSelectedPlace(itemValue)
							}>
							<Picker.Item
								label='Lieu'
								value=''
								enabled={!pickerPlaceFocused}
							/>
							<Picker.Item label='DOM' value='DOM' />
							<Picker.Item label='EXT' value='EXT' />
						</Picker>
						<View style={styles.fixToText}>
							<Button
								title='Annuler'
								onPress={() => setModalVisible(false)}
							/>
							<Button title='Valider' onPress={createMatch} />
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		width: "80%",
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
	fixToText: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 12,
	},
});

export default ModalAddMatch;
