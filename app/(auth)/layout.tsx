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
				<Image src={"/images/bg-image.png"} className="size-full" layout="fill" objectFit="cover" alt="" />
			</div>
			{children}
		</main>
	);
}
