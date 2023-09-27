"use client"

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast'
import Link from 'next/link'

type Props = {}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required!",
    }),
})

const CreatePage = (props: Props) => {

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        },
    })
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            const respoanse = await axios.post("/api/course/", values);
            router.push(`/teacher/courses/${respoanse.data.id}`);
            toast.success("Course created successfully!")
        } catch {
            toast.error("Something went wrong!")
        }
    }
    return (
        <div className='max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6'>
            <div>
                <h1 className='text-2xl'>
                    Name your course
                </h1>
                <p className='text-sm text-slate-600'>
                    What would you like to name your course? Don&apos;t worry, you can change this later.
                </p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input disabled={isSubmitting} placeholder='Options Trading' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        What will you teach in this course?
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        
                        />
                        <div className='flex items-center gap-x-2'>
                                <Link href="/">
                                    <Button type="button" variant="ghost">Cancel</Button>
                                </Link>
                                <Button disabled={!isValid || isSubmitting} type='submit'>Submit</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default CreatePage