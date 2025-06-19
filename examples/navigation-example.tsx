import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H2 } from "@/components/ui/typography";
import { useRouter } from "expo-router";

export function NavigationExample() {
    const router = useRouter();

    return (
        <>
            <H2>Navigation</H2>
            <Button onPress={() => { router.push("/") }}><Text>Go to Other</Text></Button>
        </>
    )
}
