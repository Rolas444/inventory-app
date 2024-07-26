import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createOPtions = (options: any[], keyProp: string, descProp: string ) => {
  return options.map((option) => {
    return {
      value: option[keyProp],
      label: option[descProp],
      ...option
    }
  })
}