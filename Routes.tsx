import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from "./src/HomeScreen";
import DetailsScreen from "./src/DetailsScreen";
import DetailsParamScreen from "./src/DetailsParamScreen";

const Stack = createNativeStackNavigator();

interface RoutesProps {

}

const Routes: React.FC<RoutesProps> = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Home' }}/>
                <Stack.Screen name='Details' component={DetailsScreen} options={{ title: 'Details' }} initialParams={{ itemId: 42, otherParam: 'don\'t not afraid!'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default Routes;