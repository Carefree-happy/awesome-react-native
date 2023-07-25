import { useEffect, useState } from "react";
import { Dimensions, Image, ImageStyle } from "react-native";

interface ScaledImageSource {
    uri: string,
    width?: number | string,
    height?: number,
}

interface ScaledImageStyle extends ImageStyle {
    width?: number,
    height?: number,
}

interface ScaledImageProps extends ScaledImageSource{
    style: ScaledImageStyle,
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ScaledImage = (props: ScaledImageProps) => {
    const [source, setSource] = useState<ScaledImageSource>({uri: props.uri});
    const styles = props.style ? props.style : {};

    useEffect(() => {
        Image.getSize(props.uri, (width, height) => {
            if (props.width && !props.height && typeof props.width == 'number') {
                setSource({uri: props.uri, width: props.width, height: height * (props.width / width)})
            } else if (!props.width && props.height) {
                setSource({uri: props.uri, width: width * (props.height / height), height: props.height})
            } else if (!props.width && !props.height) {
                setSource({uri: props.uri, width: '100%', height: Math.floor(screenWidth/width*height)})
            } else {
                setSource({uri: props.uri, width: props.width, height: props.height});
            }
        })
    }, []);

    const imageStyle = {
        width: source.width,
        height: source.height,
        ...styles,
    }

    return <Image source={{uri: source.uri}} style={imageStyle}/>
}

export default ScaledImage;