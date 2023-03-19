import { Button, View, Text } from "react-native";
import { Stack } from "expo-router";
import { useReset, useStore } from "../store/globalStore";

const Home = () => {
	const { items, addItem } = useStore(({ addItem, items }) => ({
		items,
		addItem,
	}));

	return (
		<View style={{ flex: 1, padding: 12 }}>
			<Stack.Screen options={{ title: "Matchs" }} />
			<TodoList />
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-around",
				}}>
				<Button
					onPress={() => addItem(`Item #${items.length}`)}
					title='Add Item'
				/>
				<Button onPress={() => useReset()} title='reset' />
			</View>
		</View>
	);
};

function TodoList() {
	const items = useStore(({ items }) => items);
	return (
		<View style={{ flex: 1 }}>
			{items.map((item) => (
				<Text key={item.id}>{item.text}</Text>
			))}
		</View>
	);
}

export default Home;
