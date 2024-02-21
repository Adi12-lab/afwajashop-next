import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function rgbToHex(rgb: string): string {
  // Memisahkan string RGB menjadi array
  let splitedRgb = rgb.split(',').map(Number);

  // Fungsi untuk mengubah satu nilai RGB menjadi Hex
  let toHex = (rgbValue: number): string => {
      let hex = rgbValue.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
  }

  // Mengubah setiap nilai RGB menjadi Hex dan menggabungkannya
  let hexColor = "#" + toHex(splitedRgb[0]) + toHex(splitedRgb[1]) + toHex(splitedRgb[2]);

  return hexColor;
}
import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
  headers: {"Content-Type": "application/json"}
})
