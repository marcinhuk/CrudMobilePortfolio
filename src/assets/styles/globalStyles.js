import { StyleSheet } from "react-native"

const globalStyles = StyleSheet.create({
	view: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#222666',
	},
	input: {
		backgroundColor: '#fff',
		width: '80%',
		marginBottom: 15,
		borderRadius: 20
	}
})

export { globalStyles }