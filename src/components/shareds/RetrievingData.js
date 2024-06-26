import { View, StyleSheet} from 'react-native'
import { Text, ActivityIndicator } from 'react-native-paper'

const RetrievingData = () => {
	return (
		<View style={localStyles.indicator}>
			<ActivityIndicator animating={true} />
			<Text>Wait, retrieving data...</Text>
		</View>

	)
}

const localStyles = StyleSheet.create({
	indicator: {
		marginTop: 30,
		alignItems: 'center',
		rowGap: 5
	}
})

export default RetrievingData