import type { Metadata } from "next";
import Image from "next/image";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="relative h-screen w-full">
			<div className="absolute size-fuli">
				<Image src={"/images/bg-img.png"} className="size-full" layout="fill" alt="" />
			</div>
			{children}
		</main>
	);
}
