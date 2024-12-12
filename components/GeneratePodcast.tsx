import { GeneratePodcastProps } from '@/types'
import React, { useState } from 'react'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'

const useGeneratePodcast = ({
	setAudio,
	setAudioStorageId,
	setAudioDuration,
	setVoicePrompt, 
	voicePrompt,
	voiceType
}: GeneratePodcastProps) => {
	const [isGenerating, setIsGenerating] = useState(false)

	const generatePodcast = async () => {
		setIsGenerating(true)
		setAudio('')

		if (!voicePrompt) {
			return setIsGenerating(false)
		}

		try {
			const response = await getPodcastAudio({voice: voiceType, input: voicePrompt})
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

				<Textarea className="input-class font-light focus:ring-offset-orange-1" placeholder='Provide text to generate audio' rows={5} value={props.voicePrompt} onChange={event => props.setVoicePrompt(event.target.value)}/>

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