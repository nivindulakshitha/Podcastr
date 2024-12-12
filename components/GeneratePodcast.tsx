import { GeneratePodcastProps } from '@/types'
import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { generateUploadUrl } from '@/convex/files'
import { useUploadFiles } from "@xixixao/uploadstuff/react"

const useGeneratePodcast = ({
	setAudio,
	setAudioStorageId,
	setAudioDuration,
	setVoicePrompt,
	voicePrompt,
	voiceType
}: GeneratePodcastProps) => {
	const [isGenerating, setIsGenerating] = useState(false)
	const generateUploadUrl = useMutation(api.files.generateUploadUrl)
	const getAudioUrl = useMutation(api.podcasts.getUrl)
	const { startUpload } = useUploadFiles(generateUploadUrl)

	const getPodcastAudio = useAction(api.openai.generateAudioAction)

	const generatePodcast = async () => {
		setIsGenerating(true)
		setAudio('')

		if (!voicePrompt) {
			return setIsGenerating(false)
		}

		try {
			const response = await getPodcastAudio({ type: voiceType, input: voicePrompt })

			const blob = new Blob([response], { type: 'audio/mpeg' })
			const fileName = `podcast-${Date.now()}.mp3`

			const file = new File([blob], fileName, { type: 'audio/mpeg' })
			const uploader = await startUpload([file])

			const storageId = (uploader[0].response as any).storageId
			setAudioStorageId(storageId)

			const auidoUrl = await getAudioUrl({ storageId })
			setAudio(auidoUrl!)
			setIsGenerating(false)
		} catch (error) {
			console.error(error)
			return setIsGenerating(false)
		}
	}
	return {
		isGenerating,
		generatePodcast
	}
}

const GeneratePodcast = (props: GeneratePodcastProps) => {
	const { isGenerating, generatePodcast } = useGeneratePodcast(props)

	return (
		<div>
			<div className='flex flex-col gap-2.5'>
				<Label className="text-16 font-bold text-white-1">
					AI prompt to generate Podcast
				</ Label>

				<Textarea className="input-class font-light focus:ring-offset-orange-1" placeholder='Provide text to generate audio' rows={5} value={props.voicePrompt} onChange={event => props.setVoicePrompt(event.target.value)} />

			</div>
			<div className="mt-5 w-full max-w-[200px]">
				<Button type="submit" className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1">
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
				props.audio && (
					<audio controls autoPlay className='mt-5' src={props.audio} onLoadedMetadata={event => { props.setAudioDuration(event.currentTarget.duration) }} />
				)
			}
		</div>
	)
}

export default GeneratePodcast