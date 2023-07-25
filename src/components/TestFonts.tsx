import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react'
import * as Font from 'expo-font';

const useFonts = async () =>
    await Font.loadAsync({
        'OpenSans-Bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
        'PlusJakartaSans-SemiBold': require('../../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
        // Add more fonts here if needed
    });

export default function Fonts() {
    const [fontLoaded, setFontLoaded] = React.useState(false);
    // Load the custom font asynchronously
    // useFonts();
    React.useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                'OpenSans-Bold': require('../../assets/fonts/OpenSans-Bold.ttf'),
                'PlusJakartaSans-SemiBold': require('../../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
                // Add more fonts here if needed
            });
            setFontLoaded(true);
        };

        loadFont();
    }, []);

    // Render the component only when the font is loaded
    if (!fontLoaded) {
        return null;
    }

    return (
        <>
            <View style={styles.container}>
                <Text>Logo</Text>
                <View style={styles.heading}>
                    <Text style={styles.h1}>Logo</Text>
                </View>
                <View style={styles.titleSection}>
                    <Text style={styles.title}>Log in to your Account</Text>
                    <Text>Welcome back, please enter your details.</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: '#FFF6F0',
    },
    heading: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 62,
        height: 44,
        marginRight: 10,
    },
    h1: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 36,
        textAlign: 'center',

    },
    titleSection: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
    },
    title: {
        fontFamily: 'PlusJakartaSans-SemiBold',
        fontWeight: '600'
    }
});