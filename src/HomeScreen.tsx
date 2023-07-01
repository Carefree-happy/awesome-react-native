import { Button, Text, View } from "react-native"
interface HomeScreenProps {
    navigation: any,
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#000',}}>Home Screen</Text>
        <Button title='Go to Details' onPress={() => navigation.navigate('Details')}/>
    </View>
}

export default HomeScreen;