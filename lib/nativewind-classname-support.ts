import { Image } from 'expo-image';
import type { LucideIcon } from 'lucide-react-native';
import * as LucideIcons from 'lucide-react-native';
import { cssInterop } from 'nativewind';

// Convert all icons to array for processing
const ICONS = Object.values(LucideIcons).filter(
    (icon: any) => icon?.displayName! !== undefined
);

export function iconWithClassName(icon: LucideIcon) {
    cssInterop(icon, {
        className: {
            target: 'style',
            nativeStyleToProp: {
                color: true,
                opacity: true,
            },
        },
    });
}

// Support className for lucide icons
for (const icon of ICONS) {
    iconWithClassName(icon as LucideIcon);
}


// Support className for expo image
cssInterop(Image, {
    className: {
        target: 'style',
    },
});


// Export all icons
export const Icons = LucideIcons;
export type IconName = keyof typeof Icons;
