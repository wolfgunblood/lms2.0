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
import { ImageIcon, Pencil, Plus, PlusCircle } from "lucide-react"
import { Course } from "@prisma/client"
import { cn } from "@/lib/utils"
import FileUpload from "@/components/FileUpload"
import Image from "next/image"

type Props = {}

interface ImageFormProps {
    initialData: Course;
    courseId: string;
}

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required!"
    })
})

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            imageUrl: initialData?.description || "",
        }
    })
    const router = useRouter();

    const [isEditing, setIsEditing] = React.useState(false);
    const toggleEditing = () => {
        setIsEditing(!isEditing);
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // console.log(values);
            console.log("Hi there")
            await axios.patch(`/api/courses/${courseId}`, values);
            console.log("Hi there 2")
            toast.success("Course updated successfully!")
            toggleEditing()
            router.refresh();

        }
        catch (error) {
            console.log(error);
            toast.error("Something went wrong!")
        }
    }
    return (
        <div className="mt-4 border rounded-md bg-slate-100 p-4">
            <div className="font-medium flex items-center justify-between">
                Image  Upload
                <Button onClick={toggleEditing} variant="ghost">
                    {
                        isEditing && (
                            <>Cancel</>
                        )
                    }
                    {!isEditing && !initialData.imageUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add an Image
                        </>
                    )}

                    {!isEditing && initialData.imageUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                        </>
                    )}

                </Button>
            </div>
            {
                !isEditing && (
                    !initialData.imageUrl ? (
                        <div className="flex items-center justify-center h-60 bg-slate-100 rounded-md">
                            <ImageIcon className="h-12 w-12 text-slate-400" />
                        </div>

                    ) : (
                        <div className="relative aspect-video mt-2">
                            <Image 
                                alt="Upload"
                                fill
                                className="object-cover rounded-md"
                                src={initialData.imageUrl}
                            />
                        </div>
                    ))
            }
            {
                isEditing && (
                    <div>
                        <FileUpload
                            endpoint="courseImage"
                            onChange={(url) => {
                                if (url) {
                                    onSubmit({ imageUrl: url })

                                }
                            }}
                        />
                        <div className="text-xs text-muted-foreground mt-4">
                            16:9 aspect ratio recommended
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default ImageForm