import { Button, Text, View } from "react-native"
interface HomeScreenProps {
    navigation: any,
    route: any,
}

const HomeScreen = ({ navigation, route }: HomeScreenProps) => {
    if (route.params?.post) {
        console.log(route.params?.post)
    }
    

    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#000',}}>Home Screen</Text>
        <Button title='Go to Details' 
            onPress={() => 
                /* 1. Navigate to the Details route with params */
                navigation.navigate('Details', { itemId: 86, otherParam: 'anything you want here', })
            }
        />
    </View>
}

export default HomeScreen;