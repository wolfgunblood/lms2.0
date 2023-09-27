"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import React from 'react'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Pencil } from "lucide-react"

type Props = {}

interface TitleFormProps {
    initialData: {
        title: string,
    },
    courseId: string,
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required!"
    })
})

const TitleForm = ({ initialData, courseId }: TitleFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })
    const router = useRouter();
    const { isSubmitting, isValid } = form.formState;

    const [isEditing, setIsEditing] = React.useState(false);
    const toggleEditing = () => {
        setIsEditing(!isEditing);
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // console.log(values);
            await axios.patch(`/api/courses/${courseId}`, values);
            toast.success("Course updated successfully!")
            toggleEditing()
            router.refresh();
        
        }
         catch (error) {
            toast.error("Something went wrong!")
        }
    }
    return (
        <div className="mt-4 border rounded-md bg-slate-100 p-4">
            <div className="font-medium flex items-center justify-between">
                Course Title
                <Button onClick={toggleEditing} variant="ghost">
                    {
                        isEditing ? (
                            <>Cancel</>
                        ) : (
                            <>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                            </>
                        )
                    }
                </Button>
            </div>
            {
                !isEditing && <p>{initialData.title}</p>
            }
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>
                                        Ti
                                    </FormLabel> */}
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. Options Trading"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            )}

        </div>
    )
}

export default TitleForm