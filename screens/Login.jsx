import {
	View,
	Text,
	Alert,
	StyleSheet,
	SafeAreaView,
	TextInput,
	Image,
	TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaes";

const backImage = require("../assets/backImage.png");

const Login = ({ navigation }) => {
	
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const loginHandler = () => {
		if (email !== "" && password !== "") {
			signInWithEmailAndPassword(auth, email, password)
				.then(() => console.log("Login Success"))
				.catch((err) => Alert.alert("Error message", err.message));
		}
	};

	

	return (
		<View style={styles.container}>
			<Image source={backImage} style={styles.backImage} />
			<View style={styles.whiteSheet} />
			<SafeAreaView style={styles.form}>
				<Text style={styles.title}>Login</Text>
				<TextInput
					style={styles.input}
					placeholder="Enter email"
					autoCapitalize="none"
					keyboardType="email-address"
					textContentType="emailAddress"
					autoFocus={true}
					value={email}
					onChangeText={(text) => setEmail(text)}
				/>
				<TextInput
					style={styles.input}
					placeholder="Enter password"
					autoCapitalize="none"
					autoCorrect={false}
					secureTextEntry={true}
					textContentType="password"
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>
				<TouchableOpacity style={styles.button} onPress={loginHandler}>
					<Text
						style={{
							fontWeight: "bold",
							fontSize: 18,
							color: "#fff",
						}}>
						Login
					</Text>
				</TouchableOpacity>
				<View style={styles.signupContainer}>
					<Text style={styles.signupText}>Don't have an Account? </Text>
					<TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
						<Text style={styles.signupButton}>Signup</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 36,
		fontWeight: "bold",
		color: "orange",
		alignSelf: "center",
		paddingBottom: 24,
	},
	input: {
		backgroundColor: "#F6F7FB",
		height: 58,
		marginBottom: 20,
		fontSize: 16,
		borderRadius: 10,
		padding: 12,
	},
	backImage: {
		width: "100%",
		height: 340,
		position: "absolute",
		top: 0,
		resizeMode: "cover",
	},
	whiteSheet: {
		width: "100%",
		height: "75%",
		position: "absolute",
		bottom: 0,
		backgroundColor: "#fff",
		borderTopLeftRadius: 60,
	},
	form: {
		flex: 1,
		justifyContent: "center",
		marginHorizontal: 30,
	},
	button: {
		backgroundColor: "#f57c00",
		height: 58,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 40,
	},
	signupContainer: {
		marginTop: 20,
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "center",
	},
	signupText: {
		color: "gray",
		fontWeight: "600",
		fontSize: 14,
	},
	signupButton: {
		color: "#f57c00",
		fontWeight: "600",
		fontSize: 14,
	},
});
