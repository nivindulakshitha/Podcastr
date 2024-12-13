import React, { useRef, useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Loader } from 'lucide-react'
import { GenerateThumbnailProps } from '@/types'
import Image from 'next/image'
import { Input } from './ui/input'
import { useToast } from '@/hooks/use-toast'
import { useUploadFiles } from '@xixixao/uploadstuff/react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { buffer } from 'stream/consumers'

const GenerateThumbnail = ({ setImageStorageId,
	image,
	setImage,
	imagePrompt,
	setImagePrompt }: GenerateThumbnailProps) => {

	const [isAiThumbnail, setIsAiThumbnail] = useState(false)
	const [isImageLoading, setIsImageLoading] = useState(false)
	const imageRef = useRef<HTMLInputElement>(null)
	const { toast } = useToast()
	const generateUploadUrl = useMutation(api.files.generateUploadUrl)
	const getImageUrl = useMutation(api.podcasts.getUrl)
	const { startUpload } = useUploadFiles(generateUploadUrl)

	const handleImage = async (blob: Blob, fileName: string) => {
		setIsImageLoading(true)
		setImage('')

		try {
			const file = new File([blob], fileName, { type: 'image/png' })
			const uploader = await startUpload([file])

			const storageId = (uploader[0].response as any).storageId
			setImageStorageId(storageId)

			const imageUrl = await getImageUrl({ storageId })
			setImage(imageUrl!)
			setIsImageLoading(false)
			toast({
				title: "Podcast generated successfully!",
			})
		} catch (error) {
			console.error(error)
			toast({
				title: 'Error generating thumbnail',
				variant: 'destructive',
			})
		}
	}
	const generateThumbnail = async () => { }
	const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault()

		try {
			const file = event.target.files?.[0]
			if (!file) return

			const blob = await file.arrayBuffer()
				.then(buffer => new Blob([buffer]))
			
			handleImage(blob, file.name)
		} catch (error) {
			console.error(error)
			toast({
				title: 'Error uploading image',
				variant: 'destructive',
			})
		}
	}

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
									isImageLoading ? (
										<>
											Generating...
											<Loader size={20} className="animate-spin ml-2" />
										</>
									) : ("Generate Podcast")
								}
							</Button>
						</div>
					</div>

				) : (
					<div className='image_div' onClick={() => imageRef?.current?.click()}>
						<Input type='file' className='hidden' ref={imageRef} onChange={event => uploadImage(event)} />
						{!isImageLoading ? (
							<Image src={"/icons/upload-image.svg"} width={40} height={40} alt='upload' />
						) : (
							<div className='text-16 flex-center font-medium text-white-1'>
								Uploading...
								<Loader size={20} className="animate-spin ml-2" />
							</div>
						)}

						<div className="flex flex-col items-center gap-1">
							<h2 className='text-12 font-bold text-orange-1'>Click to upload</h2>
							<p className='text-12 font-normal text-gray-1'>SVG, PNG, JGP, GIF (max 1080x1080)</p>
						</div>
					</div>
				)
			}

			{
				image && (
					<div className="flex-center w-full">
						<Image src={image} alt="Generated thumbnail" width={200} height={200} className='mt-5' />
					</div>
				)
			}
		</>
	)
}

export default GenerateThumbnail