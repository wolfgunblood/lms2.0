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
import { Textarea } from "@/components/ui/textarea"
import { Course } from "@prisma/client"
import { cn } from "@/lib/utils"

type Props = {}

interface PriceFormProps {
    initialData: Course;
    courseId: string;
}

const formSchema = z.object({
    price: z.coerce.number(),
})

const PriceForm = ({ initialData, courseId }: PriceFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: initialData?.price || undefined,
        }
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
                                Edit Price
                            </>
                        )
                    }
                </Button>
            </div>
            {
                !isEditing && <p className={cn("text-sm mt-2", !initialData.price && "text-slate-500 italic")}>{initialData.price || "No Price"}</p>
            }
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>
                                        Ti
                                    </FormLabel> */}
                                    <FormControl>
                                        <Textarea
                                            disabled={isSubmitting}
                                            placeholder="Set Course Price"
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

export default PriceForm