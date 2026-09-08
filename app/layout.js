import "./globals.css";

export const metadata = {
  title: "Virtual Running Heros",
  description:
    "Discover and register for virtual running events on Running Heros.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
