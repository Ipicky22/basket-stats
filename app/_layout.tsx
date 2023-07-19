import { Stack } from "expo-router";

const Layout = () => {
	return (
		<Stack
			initialRouteName='home'
			screenOptions={{
				animation: "none",
			}}
		/>
	);
};
export default Layout;
