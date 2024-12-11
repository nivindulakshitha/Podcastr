"use client"
import React from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


const CreatePodcast = () => {
	const formSchema = z.object({
		username: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
	})
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
		},
	})

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
									<FormDescription>
										This is your public display name.
									</FormDescription>
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