import { cn } from '@/lib/utils';
import { X } from 'lucide-react-native';
import * as React from 'react';
import { Modal, Pressable, StyleSheet, View, type ViewProps } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


type DialogContextType = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

const DialogContext = React.createContext<DialogContextType | undefined>(undefined);

function useDialog() {
    const context = React.useContext(DialogContext);
    if (!context) {
        throw new Error('Dialog components must be used within a Dialog');
    }
    return context;
}

type DialogProps = {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
};

function Dialog({ open: controlledOpen, onOpenChange, children }: DialogProps) {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
    const open = controlledOpen ?? uncontrolledOpen;
    const setOpen = React.useCallback(
        (value: boolean) => {
            if (controlledOpen === undefined) {
                setUncontrolledOpen(value);
            }
            onOpenChange?.(value);
        },
        [controlledOpen, onOpenChange]
    );

    const childrenArray = React.Children.toArray(children);
    const trigger = childrenArray.find(
        (child) => React.isValidElement(child) && child.type === DialogTrigger
    );
    const content = childrenArray.filter(
        (child) => React.isValidElement(child) && child.type !== DialogTrigger
    );

    return (
        <DialogContext.Provider value={{ open, setOpen }}>
            {trigger}
            {open && (
                <Modal
                    visible={open}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setOpen(false)}
                    hardwareAccelerated
                >
                    {content}
                </Modal>
            )}
        </DialogContext.Provider>
    );
}

type DialogTriggerProps = ViewProps & {
    children: React.ReactNode;
    disabled?: boolean;
};

function DialogTrigger({ children, disabled, ...props }: DialogTriggerProps) {
    const { setOpen } = useDialog();
    return (
        <Pressable
            onPress={() => setOpen(true)}
            disabled={disabled}
            {...props}
        >
            {children}
        </Pressable>
    );
}

function DialogOverlay({
    className,
    children,
    onPress,
    ...props
}: ViewProps & {
    onPress?: () => void;
}) {
    return (
        <Pressable
            style={StyleSheet.absoluteFill}
            className={cn('flex bg-black/80 justify-center items-center', className)}
            onPress={onPress}
            {...props}
        >
            <Animated.View
                entering={FadeIn.duration(150)}
                exiting={FadeOut.duration(150)}
                className="w-full h-full justify-center items-center"
            >
                {children}
            </Animated.View>
        </Pressable>
    );
}

function DialogContent({
    className,
    children,
    fullScreen,
    showCloseButton = true,
    ...props
}: ViewProps & {
    fullScreen?: boolean;
    showCloseButton?: boolean;
}) {
    const { setOpen } = useDialog();
    const insets = useSafeAreaInsets();

    const content = (
        <Pressable
            onPress={(e) => {
                e.stopPropagation();
            }}
            className={fullScreen ? 'flex-1' : ''}
        >
            <View
                className={cn(
                    fullScreen
                        ? 'flex-1 bg-background'
                        : 'w-[90%] max-w-lg gap-4 border border-border rounded-lg p-6 bg-background',
                    className
                )}
                style={fullScreen ? {
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                } : undefined}
                {...props}
            >
                {children}
                {showCloseButton && (
                    <Pressable
                        className="absolute right-4 top-4 p-0.5 rounded-sm opacity-70"
                        style={fullScreen ? { top: insets.top + 16 } : undefined}
                        onPress={() => setOpen(false)}
                    >
                        <X className="text-muted-foreground" size={18} />
                    </Pressable>
                )}
            </View>
        </Pressable>
    );

    if (fullScreen) {
        return content;
    }

    return (
        <DialogOverlay onPress={() => setOpen(false)} className="p-4">
            {content}
        </DialogOverlay>
    );
}

function DialogHeader({ className, ...props }: ViewProps) {
    return (
        <View className={cn('flex flex-col gap-1.5 text-center sm:text-left', className)} {...props} />
    );
}

function DialogFooter({ className, ...props }: ViewProps) {
    return (
        <View
            className={cn('flex flex-col-reverse sm:flex-row sm:justify-end gap-2', className)}
            {...props}
        />
    );
}

function DialogTitle({ className, ...props }: ViewProps) {
    return (
        <View
            className={cn(
                'text-lg native:text-xl text-foreground font-semibold leading-none tracking-tight',
                className
            )}
            {...props}
        />
    );
}

function DialogDescription({ className, ...props }: ViewProps) {
    return (
        <View
            className={cn('text-sm native:text-base text-muted-foreground', className)}
            {...props}
        />
    );
}

export {
    Dialog, DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle, DialogTrigger
};
