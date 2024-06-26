import { StyleSheet, Text, View, Image } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { URL_BASE } from '../../constants'

const Header = (props) => {

	const home = () => {
		props.navigation.navigate('orders', {full_name: props.user, avatar: props.avatar})
	}

	const logout = async () => {
		await AsyncStorage.clear()

		props.navigation.navigate('login')
	}

	return(
		<View style={localStyles.cabecalho}>

			{ props.showHomeIcon == false &&
				<Image style={localStyles.img} source={{uri: URL_BASE+'/avatar/'+props.avatar}} />
			 	// <Icon name="react" style={localStyles.links} />
			 ||
			 	<Icon name="home" style={localStyles.links} onPress={() => home()} />
			}

			<View>
				<Text style={localStyles.titulo}>{props.title}</Text>
				<Text style={localStyles.titulo2}>Looged user: {props.user}</Text>
			</View>

			<Icon name="sign-out-alt" style={localStyles.links} onPress={() => logout()}/>

		</View>
	)
}

const localStyles = StyleSheet.create({
	cabecalho: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: '#3F51B5',
		padding: 10,
	},
	links: {
		color: '#fff',
		fontSize: 25,
		marginTop: 6
	},
	titulo: {
		color: '#fff',
		fontSize: 18,
		width: 200,
		textAlign: 'center'
	},
	titulo2: {
		color: '#fff',
		fontSize: 10,
		width: 200,
		textAlign: 'center',
		marginTop: 0,
		marginBottom: -20
	},
	img: {
		borderRadius: 100,
		width: 38,
		height: 38,
	  },
})

export default Header