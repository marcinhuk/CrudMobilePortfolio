import React, { useState } from 'react'
import { View, StyleSheet, Image, ActivityIndicator, TouchableWithoutFeedback, Keyboard } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput as TextInputPaper, Button as ButtonPaper, Snackbar, Portal } from 'react-native-paper'

import LinearGradient from 'react-native-linear-gradient'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'

import { URL_BASE } from '../../constants'

const Login = (props) => {

	const [email, setEmail] = useState('marcinhuk@hotmail.com')
	const [password, setPassword] = useState('123456789')
	const [hidePassword, setHidePassword] = useState(true)
	const [message, setMessage] = useState('')
	const [loading, setLoading] = useState(false)
	const [avatar, setAvatar] = useState()

	const sendForm = async () => {
		setLoading(true)

		if (email && password){
			try{
				const response = await fetch(URL_BASE+'/login/signin', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({email, password}),
				})

				if (response.status  == 204){
					setMessage('Invalid credentials')

					setTimeout(() => {
						setMessage('')
						setLoading(false)
					}, 3000)

					return null
				}

				const jsonResponse = await response.json()

				if (!jsonResponse.error){
					if (jsonResponse.admin == 1){
						if (jsonResponse.token){
							try{
								await AsyncStorage.setItem('token', jsonResponse.token)
								await AsyncStorage.setItem('full_name', jsonResponse.full_name)
								await AsyncStorage.setItem('avatar', jsonResponse.avatar)

								setAvatar(jsonResponse.avatar)

								setTimeout(() => {
									props.navigation.navigate('orders', {full_name: jsonResponse.full_name, avatar: jsonResponse.avatar})
									setAvatar()
									setLoading(false)
								}, 3000)
							}catch(e){
								console.log(e)
							}
						}else{
							setMessage('Login error')

							setTimeout(() => {
								setMessage('')
								setLoading(false)
							}, 3000)
						}
					} else {
						setMessage('To log in app, you must be an admin')

						setTimeout(() => {
							setMessage('')
							setLoading(false)
						}, 3000)
					}
				}else{
					setMessage(jsonResponse.error.message)

					setTimeout(() => {
						setMessage('')
						setLoading(false)
					}, 3000);
				}
			}catch(e){
				setMessage(`Backend communication error: ${e.message}`)

				setTimeout(() => {
					setMessage('')
					setLoading(false)
				}, 3000)
			}
		}else{
			setMessage('User and password are required')

			setTimeout(() => {
				setMessage('')
				setLoading(false)
			}, 5000)
		}
	}

	return(
		<TouchableWithoutFeedback touchSoundDisabled onPress={() => Keyboard.dismiss()}>

			<LinearGradient colors={[ '#000000', '#210e15', '#3a1325', '#531538', '#6d174e', '#74175c', '#7a196b', '#7d1d7b', '#6c2182', '#582687', '#3d2a8c', '#082e8f']} start={{ x: 1, y: 1 }} end={{ x: 0, y: 0 }} style={localStyles.mainView}>

				<View style={localStyles.fieldset}>

					<View style={localStyles.legend}>
						<FontAwesomeIcon style={localStyles.icon} icon={ faUserAstronaut } size={60} animation="bounce" />
						<Image style={localStyles.img} source={{uri: URL_BASE+'/avatar/'+avatar}} />
					</View>

					<TextInputPaper style={localStyles.textInputPaper} label="Email ID" left={<TextInputPaper.Icon color={'#999'} icon="at"/>} onChangeText={(text) => setEmail(text)} value={email} />
					<TextInputPaper style={localStyles.textInputPaper} label="Password" secureTextEntry={hidePassword} left={<TextInputPaper.Icon color={'#999'} icon="key"/>} right={<TextInputPaper.Icon color={'#999'} icon={hidePassword ? "eye-off" : "eye"} onPress={() => setHidePassword(!hidePassword)}/>} onChangeText={(text) => setPassword(text)} value={password} />
					{!loading && <ButtonPaper style={localStyles.buttonEntrar} mode="contained" onPress={() => sendForm()}>LOGIN</ButtonPaper>}
					{loading && <ButtonPaper style={localStyles.buttonEntrar} mode="contained" onPress={() => sendForm()}><ActivityIndicator size={15} color="#222666"/> WAIT...</ButtonPaper>}
				</View>

				<Portal>
					<Snackbar visible={message}>{message}</Snackbar>
				</Portal>

			</LinearGradient>

		</TouchableWithoutFeedback>
	)
}

const localStyles = StyleSheet.create({
	mainView: {
		flex: 1,
		padding: 10,
		justifyContent: 'center'
	},
	fieldset: {
		padding: 15,
		borderWidth: .5,
		borderColor: '#d168be',
	},
	legend: {
		height: 100,
		width: 100,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
		marginBottom: 20,
		alignSelf: 'center',
		marginTop: -70,
		borderWidth: 2,
		borderColor: '#d168be',
		backgroundColor: '#791969'
	},
	textInputPaper:{
		marginBottom: 8
	},
	buttonEntrar: {
		alignSelf: 'center',
		width: '100%',
		marginTop: 10,
		marginBottom: -35,
		borderRadius: 5,
		backgroundColor: '#3F51B5'
	},
	icon:{
		color: '#d168be'
	},
	img: {
		borderRadius: 100,
		width: '100%',
		height: '100%',
		position: 'absolute'
	}
})

export default Login