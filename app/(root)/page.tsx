import { Button } from '@/components/ui/button'
import React from 'react'

const Home = () => {
	return (
		<div className='mt-9 flex flex-col gap-9'>
			<section className="flex flex-col gap-5">
				<h1 className="text-20 font-bold text-white-1">Trending Podcasts</h1>
				{/* <Button className='text-white-1 bg-orange-1'></Button> */}
			</section>
		</div>
	)
}

export default Home