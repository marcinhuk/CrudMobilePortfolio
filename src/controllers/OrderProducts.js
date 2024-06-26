import AsyncStorage from "@react-native-async-storage/async-storage"

import { URL_BASE } from "../constants"

const listOrderProducts = async (order_id) => {
	const response = await fetch(`${URL_BASE}/orderproducts/${order_id}`, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'authorization': await AsyncStorage.getItem('token')
		}
	})

	const orderProducts = await response.json()

	return orderProducts
}

export { listOrderProducts }