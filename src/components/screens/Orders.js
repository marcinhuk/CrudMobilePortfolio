
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, SafeAreaView, RefreshControl } from "react-native"
import { useIsFocused } from '@react-navigation/native'

import { Avatar, Card, IconButton, Text } from 'react-native-paper'

import Header from "../header/Header"
import { listOrders } from '../../controllers/Orders'
import RetrievingData from '../shareds/RetrievingData'

const Orders = (props) => {
	const [orders, setOrders] = useState()
	const [wait, setWait] = useState(true)
	const [refresh, setRefresh] = useState(false)
	const isFocused = useIsFocused()
	const { full_name, avatar }  = props.route.params

	useEffect(() => {
		list = async () => {
			setOrders(await listOrders())
			setWait(false)
		}


		list()
	}, [isFocused])

	handleRefresh = async () => {
		setRefresh(true)

		setOrders(await listOrders())

		setRefresh(false)
	}

	return(
		<SafeAreaView>

			<Header title="Orders approval" user={full_name} avatar={avatar} navigation={props.navigation} showHomeIcon={false} />

			{wait &&
				<RetrievingData />
			}

			<FlatList refreshControl={<RefreshControl refreshing={refresh} onRefresh={handleRefresh} />} ListEmptyComponent={<EmptyList />} style={localStyles.flatList}  data={orders} renderItem={({item}) =>
				<View style={localStyles.order}>
					<Card.Title
						title={item.full_name}
						subtitle={"Date: "+item.date}
						left={() => <Avatar.Text style={localStyles.avatarId} size={50} label={item.id} /> }
						right={() => <IconButton icon="list-status" size={20} mode='contained' onPress={() => props.navigation.navigate('orderProducts', {order_id: item.id, full_name, avatar})}  />}
					/>
				</View>
			}/>

		</SafeAreaView>
	)
}

const EmptyList = () => {
	return (
		<Text style={localStyles.noOrders}>No orders for approval</Text>
	)
}

const localStyles = StyleSheet.create({
	flatList: {
		display: 'flex',
		color: '#000',
		marginBottom: 58
	},
	order: {

	},
	avatarId: {
		backgroundColor: '#3F51B5',
	},
	noOrders: {
		paddingTop: 15,
		textAlign: 'center',
	}
})

export default Orders