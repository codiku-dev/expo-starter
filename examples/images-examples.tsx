import imageSvg from "@/assets/images/React-icon.svg";
import imagePng from "@/assets/images/react-logo.png";
import { H1, H2 } from "@/components/ui/typography";
import { Image } from "expo-image";
import { Airplay } from "lucide-react-native";
import { View } from "react-native";

export function ImagesExamples() {
    return (
        <View className="p-4">
            <H1>Images Examples</H1>
            <H2>Svg</H2>
            <Image
                source={imageSvg}
                alt="Image"
                className="size-48"
                contentFit="contain"
            />
            <H2>Png</H2>
            <Image
                source={imagePng}
                alt="Image"
                className="size-48"
                contentFit="contain"
            />
            <H2>Icons</H2>
            <Airplay />
        </View>
    );
}