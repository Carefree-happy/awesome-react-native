import LinearBtn from "./app/components/LinearBtn";
import { px2dp } from "./app/utils/SizeUtils";

export default function App() {
    return (
        <LinearBtn
            style={{
                height: px2dp(50),
                marginTop: px2dp(500),
                width: px2dp(300),
            }}
        />
    );
}
