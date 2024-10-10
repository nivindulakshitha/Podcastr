'use client';
import { sidebarItems } from '@/constants'
import { cn } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const SideBar = () => {
	const pathname = usePathname();
	const router = useRouter();

	return (
		<section className="left_sidebar">
			<nav className="flex flex-col gap-6">
				<Link href="/" className='flex pointer items-center gap-2 pb-10 max-lg:justify-center'>
					<Image src="/icons/logo.svg" alt='Podcastr' width={23} height={27} />
					<h1 className="text-24 font-extrabold text-white max-lg:hidden">Podcastr</h1>
				</Link>

				{
					sidebarItems.map(({ label, route, imgURL }) => {
						const isActive = pathname === route || pathname.startsWith(`${route}/`);

						return (
							<Link href={route} key={label} className={cn('flex gap-3 items-center py-4 justify-center max-lg:px-4 lg:justify-start', {
								'bg-nav-focus border-r-4 border-orange-1': isActive
							})}>
								<Image src={imgURL} alt={label} width={24} height={24} />
								<p>{label}</p>
							</Link>
						)
					})
				}
			</nav>
		</section>
	)
}

export default SideBar