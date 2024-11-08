import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createOptions = (options: any[], keyProp: string, descProp: string ) => {
  return options.map((option) => {
    return {
      value: option[keyProp],
      label: option[descProp],
      ...option
    }
  })
}

export const getRangeLastMonth = ()=>{
  const nowDate = new Date();
  const firstDayThisMonth =  new Date(nowDate.getFullYear(), nowDate.getMonth(), 1)
  const lastDayLastMonth = new Date(firstDayThisMonth.getTime() -1)
  const firstDayLastMonth = new Date(lastDayLastMonth.getFullYear(), lastDayLastMonth.getMonth(), 1)
  return {
    firstDate: lastDayLastMonth,
    lastDate: firstDayLastMonth
  }
}