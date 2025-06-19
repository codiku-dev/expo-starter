import { Separator } from "@/components/ui/separator";
import { H1 } from "@/components/ui/typography";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AnimationExample from "./animation-example";
import { ControlledDialogExample, DialogExample, FullScreenDialogExample } from "./dialog-example";
import { FormExample } from "./form-example";
import { I18nExample } from "./i18n-example";
import { ImagesExamples } from "./images-examples";
import { NavigationExample } from "./navigation-example";
import { StoreExample } from "./store-example";
import { TypoExample } from "./typo-example";

export function Examples() {
    const insets = useSafeAreaInsets();

    return (
        <>
            <H1 className="mb-4" >Examples</H1>
            <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom }}>
                <View className="flex flex-col gap-4">
                    <View className="mb-4">
                        <DialogExample />
                        <ControlledDialogExample />
                        <FullScreenDialogExample />
                    </View>
                    <View className="mb-4">
                        <TypoExample />
                    </View>
                    <Separator />
                    <View className="mb-4">
                        <NavigationExample />
                    </View>
                    <Separator />

                    <Separator />
                    <View className="mb-4">
                        <AnimationExample />
                    </View>
                    <Separator />
                    <View className="mb-4">
                        <FormExample />
                    </View>
                    <Separator />

                    <View className="mb-4">
                        <StoreExample />
                    </View>
                    <Separator />
                    <View className="mb-4">
                        <I18nExample />
                    </View>
                    <Separator />
                    <View className="mb-4">
                        <ImagesExamples />
                    </View>
                </View>
            </ScrollView>
        </>
    )
}
