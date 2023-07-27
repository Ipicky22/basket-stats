import { useState } from "react";
import { Button, View, Text, Modal, StyleSheet, TextInput } from "react-native";
import { globalStore } from "../../../store/globalStore";
import uuid from "react-native-uuid";
import Dropdown from "react-native-input-select";

var moment = require("moment");

const ModalAddMatch = () => {
	const { addMatch } = globalStore();
	const [modalVisible, setModalVisible] = useState(false);

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
								backgroundColor: "white",
							}}
							dropdownIconStyle={{ top: 15, right: 10 }}
							options={[
								{ label: "Competitif", value: "competitif" },
								{ label: "Amical", value: "amical" },
							]}
							selectedValue={selectedType}
							onValueChange={(value: string) =>
								setSelectedType(value)
							}
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
								backgroundColor: "white",
							}}
							dropdownIconStyle={{ top: 15, right: 10 }}
							options={[
								{ label: "Domicile", value: "DOM" },
								{ label: "Exterieur", value: "EXT" },
							]}
							selectedValue={selectedPlace}
							onValueChange={(value: string) =>
								setSelectedPlace(value)
							}
							primaryColor={"green"}
						/>

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
	modalText: {
		marginBottom: 15,
		textAlign: "center",
		fontWeight: "500",
		fontSize: 18,
	},
	fixToText: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 12,
	},
});

export default ModalAddMatch;
