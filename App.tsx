import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
// import { StatusBar } from 'expo-status-bar';
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';

import { FontAwesome5 } from '@expo/vector-icons';

import plus from './assets/plus.png';

import { MultiLineInput } from './src/components/TextInputCommon';
import Fonts from './src/components/TestFonts';

const Tab = createBottomTabNavigator();

export default function App() {
	const tabOffsetValue = useRef(new Animated.Value(0)).current;

	const tabPressAnimation = (i: number, e: any) => {
		Animated.spring(tabOffsetValue, {
			toValue: getWidth() * i,
			useNativeDriver: true,
		}).start();
	}

	return (
		<NavigationContainer>
			<Tab.Navigator initialRouteName='Home' screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: 'white',
					position: 'absolute',
					bottom: 40,
					marginHorizontal: 20,
					// Max Height...
					height: 60,
					borderRadius: 10,
					// Shadow...
					shadowColor: '#000',
					shadowOpacity: 0.06,
					shadowOffset: {
						width: 10,
						height: 10
					},
					paddingHorizontal: 20,
				}
			}}>
				<Tab.Screen name={'Home'} component={HomeScreen} options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ position: 'absolute', top: '50%' }}>
							<FontAwesome5 name='home' size={20} color={focused ? 'red' : 'gray'} />
						</View>
					)
				}} listeners={({ navigation, route }) => ({
					tabPress: e => tabPressAnimation(0, e)
				})} />

				<Tab.Screen name={'Notification'} component={NotificationScreen} options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ position: 'absolute', top: '50%' }}>
							<FontAwesome5 name='search' size={20} color={focused ? 'red' : 'gray'} />
						</View>
					)
				}} listeners={({ navigation, route }) => ({
					tabPress: e => tabPressAnimation(1, e)
				})} />

				<Tab.Screen name={'ActionButton'} component={EmptyScreen} options={{
					tabBarIcon: ({ focused }) => (
						<TouchableOpacity>
							<View style={{
								width: 55,
								height: 55,
								backgroundColor: 'red',
								borderRadius: 100,
								justifyContent: 'center',
								alignItems: 'center',
								marginBottom: 30,
							}}>
								<Image source={plus} style={{
									width: 22,
									height: 22,
									tintColor: 'white',
								}} />
							</View>
						</TouchableOpacity>
					)
				}}></Tab.Screen>

				<Tab.Screen name={'Search'} component={SearchScreen} options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ position: 'absolute', top: '50%' }}>
							<FontAwesome5 name='bell' size={20} color={focused ? 'red' : 'gray'} />
						</View>
					)
				}} listeners={({ navigation, route }) => ({
					tabPress: e => tabPressAnimation(3, e)
				})} />

				<Tab.Screen name={'Setting'} component={SettingScreen} options={{
					tabBarIcon: ({ focused }) => (
						<View style={{ position: 'absolute', top: '50%' }}>
							<FontAwesome5 name='user-alt' size={20} color={focused ? 'red' : 'gray'} />
						</View>
					)
				}} listeners={({ navigation, route }) => ({
					tabPress: e => tabPressAnimation(4, e)
				})} />
			</Tab.Navigator>

			<Animated.View style={{
				width: getWidth() - 20,
				height: 2,
				backgroundColor: 'red',
				position: 'absolute',
				bottom: 98,
				// Horizontal Padding = 20...
				left: 50,
				borderRadius: 20,
				transform: [
					{ translateX: tabOffsetValue }
				]
			}}></Animated.View>
		</NavigationContainer>
	);
}

function getWidth() {
	let width = Dimensions.get("window").width

	// Horizontal Padding = 20...
	width = width - 80

	// Total five Tabs...
	return width / 5
}


function EmptyScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		</View>
	);
}

function HomeScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Hometown!</Text>
			<Fonts></Fonts>
			{/* <MultiLineInput /> */}
		</View>
	);
}

function NotificationScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Notification!</Text>
		</View>
	);
}

function SearchScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Search!</Text>
		</View>
	);
}

function SettingScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Setting!</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
