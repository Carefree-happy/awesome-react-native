import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./src/HomeScreen";
import DetailsScreen from "./src/DetailsScreen";

const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={HomeScreen}/>
                <Stack.Screen name='Details' component={DetailsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;