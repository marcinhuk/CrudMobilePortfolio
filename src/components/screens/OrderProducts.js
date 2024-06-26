
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, SafeAreaView, RefreshControl } from "react-native"

import { Button, DataTable, Text } from 'react-native-paper'

import Header from "../header/Header"

import { listOrderProducts } from '../../controllers/OrderProducts'
import { changeStatus } from '../../controllers/Orders'
import RetrievingData from '../shareds/RetrievingData'

const Approval = (props) => {
	const [orderProducts, setOrderProducts] = useState([])
	const [wait, setWait] = useState(true)
	const [waitStatus, setWaitStatus] = useState(false)
	const [refresh, setRefresh] = useState(false)
	const { order_id, full_name, avatar }  = props.route.params

	useEffect(() => {

		list = async () => {
			setOrderProducts(await listOrderProducts(order_id))
			setWait(false)
		}

		list()

	}, [])

	handleRefresh = async () => {
		setRefresh(true)

		setOrderProducts(await listOrderProducts(order_id))

		setRefresh(false)
	}

	handleChangeStatus = async(status) => {
		setWaitStatus(true)
		const response = await changeStatus(status, order_id)

		if (response)
			props.navigation.navigate('orders', {full_name})
	}

	return(
		<SafeAreaView>

			<Header title={"Order products "+ order_id } user={full_name} avatar={avatar} navigation={props.navigation} />

			{wait ?
				<RetrievingData />
			:
				<DataTable>

						{orderProducts.length > 0 ?
							<DataTable.Header>
								<DataTable.Title style={localStyles.cellIndex}>#</DataTable.Title>
								<DataTable.Title>Product name</DataTable.Title>
								<DataTable.Title style={localStyles.cellAmount}>Amount</DataTable.Title>
							</DataTable.Header>
						:
							<Text style={localStyles.noProducts}>No products included in this order</Text>
						}

				</DataTable>
			}

			<ScrollView style={localStyles.scrollView} refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefresh} />}>

				<DataTable>

					{orderProducts.map((item, index) => (
						<DataTable.Row style={localStyles.row} key={item.id}>
							<DataTable.Cell style={localStyles.cellIndex}>{ index + 1 }</DataTable.Cell>
							<DataTable.Cell>{item.name}</DataTable.Cell>
							<DataTable.Cell style={localStyles.cellAmount}>{item.amount}</DataTable.Cell>
						</DataTable.Row>
					))}

				</DataTable>

				{!waitStatus && orderProducts.length > 0 &&
					<View style={localStyles.viewButtons}>
						<Button style={localStyles.button} icon="thumb-up" mode="contained" onPress={() => handleChangeStatus(1)}>Approve</Button>
						<Button style={localStyles.button} icon="thumb-down" mode="contained" onPress={() => handleChangeStatus(0)}>Refuse</Button>
					</View>
				}

			</ScrollView>

		</SafeAreaView>
	)
}

const localStyles = StyleSheet.create({
	scrollView: {
		marginBottom: 100,
		minHeight: 200
	},
	viewButtons: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginTop: 20,
		marginBottom: 20,
	},
	button: {
		width: 120,
		backgroundColor: '#3F51B5'
	},
	row: {
		minHeight: 25
	},
	cellIndex: {
		justifyContent: 'center',
		maxWidth: 50
	},
	cellAmount: {
		justifyContent: 'center',
		maxWidth: 60,
	},
	noProducts: {
		paddingTop: 15,
		textAlign: 'center',

	}
})

export default Approval