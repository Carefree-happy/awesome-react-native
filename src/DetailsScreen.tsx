import { Button, Text, View } from "react-native";

interface DetailsScreenProps {
    navigation: any,
}

function DetailsScreen({ navigation }: DetailsScreenProps) {
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Details Screen</Text>

        {/* go to details, did nothing */}
        <Button title='Go to Details' onPress={() => { navigation.navigate('Details') }}/> 

        {/* push details */}
        <Button title='Go to Details' onPress={() => { navigation.push('Details') }}/>

        {/* go back */}
        <Button title='Go back' onPress={() => { navigation.goBack() }}></Button>

        {/* go to first screen */}
        <Button title='Go to the first screen' onPress={() => { navigation.popToTop() }}/>
    </View>
}

export default DetailsScreen;