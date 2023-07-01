import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./src/HomeScreen";

const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={HomeScreen} options={{ title: 'Overview' }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;