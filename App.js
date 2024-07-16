import { auth } from "./config/firebaes";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState, createContext, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator } from "react-native";
import Chat from "./screens/Chat";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	return (
		<AuthenticatedUserContext.Provider value={{ user, setUser }}>
			{children}
		</AuthenticatedUserContext.Provider>
	);
};

function ChatStack() {
	return (
		<Stack.Navigator initialRouteName="Home" >
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Chat" component={Chat} />
		</Stack.Navigator>
	);
}

function AuthStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="Login">
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="SignUp" component={Signup} />
		</Stack.Navigator>
	);
}

function RootNavigation() {
	const { user, setUser } = useContext(AuthenticatedUserContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribeUser = onAuthStateChanged(
			auth,
			async (authenticatedUser) => {
				authenticatedUser ? setUser(authenticatedUser) : setUser(null);
				setLoading(false);
			}
		);
		return unsubscribeUser;
	}, [user]);

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<NavigationContainer>
			{user ? <ChatStack /> : <AuthStack />}
		</NavigationContainer>
	);
}

export default function App() {
	return (
		<AuthenticatedUserProvider>
			<RootNavigation />
		</AuthenticatedUserProvider>
	);
}
