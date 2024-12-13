import React, { useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Loader } from 'lucide-react'
import { GenerateThumbnailProps } from '@/types'
import Image from 'next/image'

const GenerateThumbnail = ({ setImageStorageId,
	image,
	setImage,
	imagePrompt,
	setImagePrompt }: GenerateThumbnailProps) => {
	const [isAiThumbnail, setIsAiThumbnail] = useState(false)
	const [isGenerating, setIsGenerating] = useState(false)

	const generateThumbnail = async () => { }

	return (
		<>
			<div className="generate_thumbnail">
				<Button type="button" variant="plain" className={cn('', { 'bg-black-6': isAiThumbnail })} onClick={() => setIsAiThumbnail(true)}>
					Use AI to generate thumbnail
				</Button>
				<Button type="button" variant="plain" className={cn('', { 'bg-black-6': !isAiThumbnail })} onClick={() => setIsAiThumbnail(false)}>
					Upload custom image
				</Button>
			</div>
			{
				isAiThumbnail ? (
					<div className='flex flex-col gap-5'>
						<div className='flex flex-col gap-2.5 mt-5'>
							<Label className="text-16 font-bold text-white-1">
								AI prompt to generate thumbnail
							</ Label>

							<Textarea className="input-class font-normal focus:ring-offset-orange-1" placeholder='Provide text to generate image' rows={5} value={imagePrompt} onChange={event => setImagePrompt(event.target.value)} />

						</div>
						<div className="w-full max-w-[200px]">
							<Button type="submit" className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1" onClick={generateThumbnail}>
								{
									isGenerating ? (
										<>
											Generating...
											<Loader size={20} className="animate-spin ml-2" />
										</>
									) : ("Generate Podcast")
								}
							</Button>
						</div>

						{
							image && (
								<Image src={image} alt="Generated thumbnail" width={200} height={200} />
							)
						}
					</div>

				) : (
					<div></div>
				)
			}
		</>
	)
}

export default GenerateThumbnail