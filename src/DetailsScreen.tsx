import { Button, Text, View } from "react-native";

interface DetailsScreenProps {
    navigation: any,
    route: any,
}

function DetailsScreen({ navigation, route }: DetailsScreenProps) {
    /* 2. Get the param */
    const { itemId, otherParam } = route.params;

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

        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>

        {/* 3. go and get the param */}
        <Button title='Go to Details... again'
            onPress={() =>
                navigation.push('Details', {
                    itemId: Math.floor(Math.random() * 100),
                })
            }
        />

        {/* 4. updating params */}
        <Button title='updating params' onPress={() => {
            navigation.setParams({
                itemId: 4444, 
                otherParam: 'updating params',
            });
        }}/>

        {/* 5. Passing params to a previous screen */}
        <Button title='passing params to a previous screen' onPress={() => {
            navigation.navigate({
                name: 'Home',
                params: { post: '11111' },
                merge: true,
            });
        }}/>
    </View>
}

export default DetailsScreen;