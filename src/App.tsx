import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import {  MD3LightTheme as myTheme, PaperProvider } from 'react-native-paper'

import { Login, Orders, OrderProducts } from './components/screens'

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

	const theme = {
		...myTheme
	}

	return (
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name='login' component={Login} options={{title: 'Autenticação do sistema', headerShown: false}}/>
					<Stack.Screen name='orders' component={Orders} options={{title: 'Autenticação do sistema', headerShown: false}}/>
					<Stack.Screen name='orderProducts' component={OrderProducts} options={{title: 'Order details', headerShown: false}}/>
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	)
}

export default App