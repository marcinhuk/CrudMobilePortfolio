import AsyncStorage from '@react-native-async-storage/async-storage'

import { URL_BASE } from '../constants'

const listOrders = async () => {
	const response = await fetch(`${URL_BASE}/orders/approval`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'authorization': await AsyncStorage.getItem('token')
		}
	})

	const orders = await response.json()

	return orders
}

const changeStatus = async (status, id) => {
	const response = await fetch(`${URL_BASE}/orders/approval/${id}`, {
		method: 'PATCH',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'authorization': await AsyncStorage.getItem('token')
		},
		body: JSON.stringify({status}),
	})

	const changeStatus = await response.json()

	return changeStatus
}

export { listOrders, changeStatus }