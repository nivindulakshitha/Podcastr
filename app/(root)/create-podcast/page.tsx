"use client"
import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea"


import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const voiceCategories = ['alloy', 'shimmer', 'nova', 'echo', 'fable', 'onyx']


const CreatePodcast = () => {
	const formSchema = z.object({
		podcastTitle: z.string().min(2),
		podcastDescription: z.string().min(2),
	})
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			podcastTitle: "",
			podcastDescription: "",
		},
	})

	const [voiceType, setVoiceType] = useState<String | null>()

	return (
		<section className="mt-10 flex flex-col">
			<h1 className="text-20 font-bold text-white-1">Create Podcasts</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mt-12 flex w-full flex-col">
					<div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
						<FormField
							control={form.control}
							name="podcastTitle"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-16 font-bold text-white-1">Username</FormLabel>
									<FormControl>
										<Input className='input-class focus-visible:ring-orange-1' placeholder="My Podcast" {...field} />
									</FormControl>
									<FormMessage className="text-white-1" />
								</FormItem>
							)}
						/>

						<div className="flex flex-col gap-2.5">
							<Label className="text-16 font-bold text-white-1">
								Select AI Voice
							</Label>

							<Select onValueChange={value => setVoiceType(value)}>
								<SelectTrigger className={cn('text-16 w-full border-none bg-black-1 text-gray-1')}>
									<SelectValue placeholder="Select AI Voice" className='placeholder:text-gray-1' />
								</SelectTrigger>
								<SelectContent className='bg-black-1 text-16 border-none font-bold text-white-1 focus:ring-orange-1'>
									{voiceCategories.map((voice) => (
										<SelectItem key={voice} value={voice} className='capitalize focus:bg-orange-1'>
											{voice}
										</SelectItem>
									))}
								</SelectContent>
								{
									voiceType && (
										<audio src={`/${voiceType}.mp3`}
											autoPlay
											className='hidden'
										/>
									)
								}
							</Select>
						</div>

						<FormField
							control={form.control}
							name="podcastDescription"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-16 font-bold text-white-1">Description</FormLabel>
									<FormControl>
										<Textarea className='input-class focus-visible:ring-orange-1' placeholder="Write a short podcast description" {...field} />
									</FormControl>
									<FormMessage className="text-white-1" />
								</FormItem>
							)}
						/>
					</div>
				</form>
			</Form>
		</section>
	)
}

export default CreatePodcast