import localFont from "next/font/local";

// Конфигурация шрифта OmegaUI
export const omegaUI = localFont({
  src: [
    {
      path: "../assets/fonts/OmegaUI-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/OmegaUI-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/OmegaUI-DemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/OmegaUI-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-omega-ui",
  display: "swap",
});

// Используем OmegaUI как основной шрифт
export const customSans = omegaUI;
export const customMono = omegaUI;
