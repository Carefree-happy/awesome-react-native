import { Button, Text, View } from "react-native"

const HomeScreen = ({ }) => {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#000',}}>Home Screen</Text>
        <Button title="Details Screen" onPress={() => {}}/>
    </View>
}

export default HomeScreen;