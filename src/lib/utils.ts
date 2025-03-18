import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(): void (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

