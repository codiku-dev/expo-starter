import { queryClient } from "@/configs/react-query-config";
import "@/global.css";
import "@/i18n/i18n";
import "@/lib/nativewind-classname-support";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export function AppProviders({ children }: PropsWithChildren) {
    return <QueryClientProvider client={queryClient}>
        {children}
        <Toast />
    </QueryClientProvider>
}
