import type { Metadata } from "next";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main>
			{children}
		</main>
	);
}
