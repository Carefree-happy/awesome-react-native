import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { px2dp } from "../utils/SizeUtils";
export default class LinearBtn extends Component {
    // props默认值
    static defaultProps = {
        style: {},
        textStyle: {},
    };
    render() {
        console.log(this.props);
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={{
                    width: "100%",
                    height: "100%",
                    ...this.props.style,
                    overflow: "hidden",
                }}
            >
                <LinearGradient
                    // { x: 0.1, y: 0.2 }表示渐变将从10%左侧和20%顶部开始
                    start={{ x: 0, y: 0 }}
                    // { x: 0.1, y: 0.2 }表示渐变将从10%左侧和20%底部结束
                    end={{ x: 1, y: 0 }}
                    colors={["#9b63cd", "#e0708c"]}
                    style={styles.linearGradient}
                    // [0.5, 0.8]将呈现：
                    // 第一种颜色，纯色，从渐变视图的开始到 50% 通过（中间）；
                    // 从第一种颜色到第二种颜色的渐变，从 50% 点到 80% 点；和
                    // 第二种颜色，纯色，从 80% 点到渐变视图的末尾。
                    locations={[0.3, 0.5]}
                >
                    <Text
                        style={{
                            ...styles.buttonText,
                            ...this.props.textStyle,
                        }}
                    >
                        Sign in with Facebook
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: px2dp(15),
        paddingRight: px2dp(15),
        borderRadius: px2dp(20),
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: px2dp(18),
        fontFamily: "Gill Sans",
        textAlign: "center",
        color: "#ffffff",
        backgroundColor: "transparent",
    },
});
