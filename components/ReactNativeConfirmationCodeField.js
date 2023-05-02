import { Fragment, useState } from "react";
import {
    StyleSheet,
    Platform,
    Animated,
    Image,
    SafeAreaView,
    Text,
    View,
} from "react-native";
/* Concept: https://dribbble.com/shots/5476562-Forgot-Password-Verification/attachments*/

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
    MaskSymbol,
    isLastFilledCell,
} from "react-native-confirmation-code-field";

const { Value, Text: AnimatedText } = Animated;

const ANIMATED_CELL_COUNT = 4;
const source = {
    uri: "https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png",
};

const animationsColor = [...new Array(ANIMATED_CELL_COUNT)].map(
    () => new Value(0)
);
const animationsScale = [...new Array(ANIMATED_CELL_COUNT)].map(
    () => new Value(1)
);
const animateCell = ({ hasValue, index, isFocused }) => {
    Animated.parallel([
        Animated.timing(animationsColor[index], {
            useNativeDriver: false,
            toValue: isFocused ? 1 : 0,
            duration: 250,
        }),
        Animated.spring(animationsScale[index], {
            useNativeDriver: false,
            toValue: hasValue ? 0 : 1,
            duration: hasValue ? 300 : 250,
        }),
    ]).start();
};

/**
 * animation example
 */

export const AnimatedExample = () => {
    const [value, setValue] = useState("");
    const ref = useBlurOnFulfill({ value, cellCount: ANIMATED_CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const renderCell = ({ index, symbol, isFocused }) => {
        const hasValue = Boolean(symbol);
        const animatedCellStyle = {
            backgroundColor: hasValue
                ? animationsScale[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                          NOT_EMPTY_CELL_BG_COLOR,
                          ACTIVE_CELL_BG_COLOR,
                      ],
                  })
                : animationsColor[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                          DEFAULT_CELL_BG_COLOR,
                          ACTIVE_CELL_BG_COLOR,
                      ],
                  }),
            borderRadius: animationsScale[index].interpolate({
                inputRange: [0, 1],
                outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
            }),
            transform: [
                {
                    scale: animationsScale[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.2, 1],
                    }),
                },
            ],
        };

        // Run animation on next event loop tik
        // Because we need first return new style prop and then animate this value
        setTimeout(() => {
            animateCell({ hasValue, index, isFocused });
        }, 0);

        return (
            <AnimatedText
                key={index}
                style={[animationStyle.cell, animatedCellStyle]}
                onLayout={getCellOnLayoutHandler(index)}
            >
                {symbol || (isFocused ? <Cursor /> : null)}
            </AnimatedText>
        );
    };

    return (
        <SafeAreaView style={animationStyle.root}>
            <Text style={animationStyle.title}>Verification</Text>
            <Image style={animationStyle.icon} source={source} />
            <Text style={animationStyle.subTitle}>
                Please enter the verification code{"\n"}
                we send to your email address
            </Text>

            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={ANIMATED_CELL_COUNT}
                rootStyle={animationStyle.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderCell}
            />
            <View style={animationStyle.nextButton}>
                <Text style={animationStyle.nextButtonText}>Verify</Text>
            </View>
        </SafeAreaView>
    );
};

/**
 * animation example
 */

const CELL_SIZE = 70;
const CELL_BORDER_RADIUS = 8;
const DEFAULT_CELL_BG_COLOR = "#fff";
const NOT_EMPTY_CELL_BG_COLOR = "#3557b7";
const ACTIVE_CELL_BG_COLOR = "#f7fafe";

const animationStyle = StyleSheet.create({
    codeFieldRoot: {
        height: CELL_SIZE,
        marginTop: 30,
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    cell: {
        marginHorizontal: 8,
        height: CELL_SIZE,
        width: CELL_SIZE,
        lineHeight: CELL_SIZE - 5,
        ...Platform.select({ web: { lineHeight: 65 } }),
        fontSize: 30,
        textAlign: "center",
        borderRadius: CELL_BORDER_RADIUS,
        color: "#3759b8",
        backgroundColor: "#fff",

        // IOS
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        // Android
        elevation: 3,
    },

    // =======================

    root: {
        minHeight: 800,
        padding: 20,
    },
    title: {
        paddingTop: 50,
        color: "#000",
        fontSize: 25,
        fontWeight: "700",
        textAlign: "center",
        paddingBottom: 40,
    },
    icon: {
        width: 217 / 2.4,
        height: 158 / 2.4,
        marginLeft: "auto",
        marginRight: "auto",
    },
    subTitle: {
        paddingTop: 30,
        color: "#000",
        textAlign: "center",
    },
    nextButton: {
        marginTop: 30,
        borderRadius: 60,
        height: 60,
        backgroundColor: "#3557b7",
        justifyContent: "center",
        minWidth: 300,
        marginBottom: 100,
    },
    nextButtonText: {
        textAlign: "center",
        fontSize: 20,
        color: "#fff",
        fontWeight: "700",
    },
});

/**
 * basic example
 */

const BASIC_CELL_COUNT = 6;

export const BasicExample = () => {
    const [value, setValue] = useState("");
    const ref = useBlurOnFulfill({ value, cellCount: BASIC_CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    return (
        <SafeAreaView style={basicStyle.root}>
            <Text style={basicStyle.title}>Basic example</Text>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={BASIC_CELL_COUNT}
                rootStyle={basicStyle.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[
                            basicStyle.cell,
                            isFocused && basicStyle.focusCell,
                        ]}
                        onLayout={getCellOnLayoutHandler(index)}
                    >
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
        </SafeAreaView>
    );
};

const basicStyle = StyleSheet.create({
    root: { padding: 20, minHeight: 300 },
    title: { textAlign: "center", fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: "#00000030",
        textAlign: "center",
    },
    focusCell: {
        borderColor: "#000",
    },
});

/**
 * formatting example
 */

const FORMATTING_CELL_COUNT = 9;

export const FormattingExample = () => {
    const [value, setValue] = useState("");
    const ref = useBlurOnFulfill({ value, cellCount: FORMATTING_CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    return (
        <SafeAreaView style={formattingStyle.root}>
            <Text style={formattingStyle.title}>Social Security number</Text>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={FORMATTING_CELL_COUNT}
                rootStyle={formattingStyle.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Fragment key={index}>
                        <Text
                            key={`value-${index}`}
                            style={[
                                formattingStyle.cell,
                                isFocused && formattingStyle.focusCell,
                            ]}
                            onLayout={getCellOnLayoutHandler(index)}
                        >
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                        {index === 2 || index === 4 ? (
                            <View
                                key={`separator-${index}`}
                                style={formattingStyle.separator}
                            />
                        ) : null}
                    </Fragment>
                )}
            />
        </SafeAreaView>
    );
};

const formattingStyle = StyleSheet.create({
    root: { padding: 20, minHeight: 300 },
    title: { textAlign: "center", fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 25,
        height: 30,
        lineHeight: 28,
        fontSize: 20,
        borderWidth: 2,
        borderRadius: 3,
        borderColor: "#00000030",
        textAlign: "center",
    },
    separator: {
        height: 2,
        width: 10,
        backgroundColor: "#000",
        alignSelf: "center",
    },
    focusCell: {
        borderColor: "#000",
    },
});

/**
 * mask example
 */

const MASK_CELL_COUNT = 6;

export const MaskExample = () => {
    const [value, setValue] = useState("");
    const ref = useBlurOnFulfill({ value, cellCount: MASK_CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const renderCell = ({ index, symbol, isFocused }) => {
        let textChild = null;

        if (symbol) {
            textChild = (
                <MaskSymbol
                    maskSymbol="❤️"
                    isLastFilledCell={isLastFilledCell({ index, value })}
                >
                    {symbol}
                </MaskSymbol>
            );
        } else if (isFocused) {
            textChild = <Cursor />;
        }

        return (
            <Text
                key={index}
                style={[maskStyles.cell, isFocused && maskStyles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
            >
                {textChild}
            </Text>
        );
    };

    return (
        <SafeAreaView style={maskStyles.root}>
            <Text style={maskStyles.title}>Field with custom mask</Text>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={MASK_CELL_COUNT}
                rootStyle={maskStyles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={renderCell}
            />
        </SafeAreaView>
    );
};

const maskStyles = StyleSheet.create({
    root: { padding: 20, minHeight: 300 },
    title: { textAlign: "center", fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 40,
        fontSize: 24,
        borderWidth: 2,
        borderColor: "#00000030",
        textAlign: "center",
    },
    focusCell: {
        borderColor: "#000",
    },
});

/**
 * underline example
 */
const UNDERLINE_CELL_COUNT = 4;

export const UnderlineExample = () => {
    const [value, setValue] = useState("");
    const ref = useBlurOnFulfill({ value, cellCount: UNDERLINE_CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    return (
        <SafeAreaView style={underlineStyles.root}>
            <Text style={underlineStyles.title}>Underline example</Text>
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={UNDERLINE_CELL_COUNT}
                rootStyle={underlineStyles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <View
                        // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                        onLayout={getCellOnLayoutHandler(index)}
                        key={index}
                        style={[
                            underlineStyles.cellRoot,
                            isFocused && underlineStyles.focusCell,
                        ]}
                    >
                        <Text style={underlineStyles.cellText}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

const underlineStyles = StyleSheet.create({
    root: { padding: 20, minHeight: 300 },
    title: { textAlign: "center", fontSize: 30 },
    codeFieldRoot: {
        marginTop: 20,
        width: 280,
        marginLeft: "auto",
        marginRight: "auto",
    },
    cellRoot: {
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    cellText: {
        color: "#000",
        fontSize: 36,
        textAlign: "center",
    },
    focusCell: {
        borderBottomColor: "#007AFF",
        borderBottomWidth: 2,
    },
});

/**
 * unmask example
 */
const UNMASK_CELL_COUNT = 5;

export const UnmaskExample = () => {
    const [enableMask, setEnableMask] = useState(true);
    const [value, setValue] = useState("");
    const ref = useBlurOnFulfill({ value, cellCount: UNMASK_CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const toggleMask = () => setEnableMask((f) => !f);
    const renderCell = ({ index, symbol, isFocused }) => {
        let textChild = null;

        if (symbol) {
            textChild = enableMask ? "•" : symbol;
        } else if (isFocused) {
            textChild = <Cursor />;
        }

        return (
            <Text
                key={index}
                style={[unmaskStyles.cell, isFocused && unmaskStyles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
            >
                {textChild}
            </Text>
        );
    };

    return (
        <SafeAreaView style={unmaskStyles.root}>
            <Text style={unmaskStyles.title}>Show & Hide Password</Text>
            <View style={unmaskStyles.fieldRow}>
                <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    cellCount={UNMASK_CELL_COUNT}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={renderCell}
                />
                <Text style={unmaskStyles.toggle} onPress={toggleMask}>
                    {enableMask ? "🙈" : "🐵"}
                </Text>
            </View>
        </SafeAreaView>
    );
};

const unmaskStyles = StyleSheet.create({
    root: { padding: 20, minHeight: 300 },
    title: { textAlign: "center", fontSize: 30 },
    fieldRow: {
        marginTop: 20,
        flexDirection: "row",
        marginLeft: 8,
    },
    cell: {
        width: 55,
        height: 55,
        lineHeight: 55,
        fontSize: 30,
        fontWeight: "700",
        textAlign: "center",
        marginLeft: 8,
        borderRadius: 6,
        backgroundColor: "#eee",
    },
    toggle: {
        width: 55,
        height: 55,
        lineHeight: 55,
        fontSize: 24,
        textAlign: "center",
    },
    focusCell: {
        borderColor: "#000",
    },
});
