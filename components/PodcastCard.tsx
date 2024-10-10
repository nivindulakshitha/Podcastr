import Image from 'next/image';
import React from 'react'

const PodcastCard = ({podcast} : {podcast: any}) => {
	const { id, title, description, imgURL } = podcast;

	return (
		<div className='cursor-pointer '>
			<figure className="flex flex-col gap-2">
				<Image src={imgURL} alt={title} width={175} height={175} />
			</figure>
		</div>
  )
}

export default PodcastCard