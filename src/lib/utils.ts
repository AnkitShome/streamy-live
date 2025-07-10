import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

export function stringToColor(str: string): string {
   // Simple hash to color
   let hash = 0;
   for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
   return `hsl(${hash % 360}, 70%, 70%)`;
}


// export const stringToColor = (str: string) => {
//    let hash = 0;
//    for (let i = 0; i < str.length; i++) {
//       hash = str.charCodeAt(i) + ((hash << 5) - hash);
//    }
//    // HSL color: hue = [0, 360), saturation = 70%, lightness = 60%
//    const hue = Math.abs(hash) % 360;
//    return `hsl(${hue}, 70%, 60%)`;
// };
