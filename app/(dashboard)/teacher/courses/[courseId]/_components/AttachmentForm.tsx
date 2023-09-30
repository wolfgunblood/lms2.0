"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { set, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import React, { useState } from 'react'

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
import { File, ImageIcon, Loader2, Pencil, Plus, PlusCircle, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Course,Attachment } from "@prisma/client"
import { cn } from "@/lib/utils"
import FileUpload from "@/components/FileUpload"
import Image from "next/image"

type Props = {}

interface AttachmentFormProps {
    initialData: Course & { attachments : Attachment[] };
    courseId: string;
}

const formSchema = z.object({
    url: z.string().min(1),
})

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {

  
    const router = useRouter();
    // const { isSubmitting, isValid } = form.formState;
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isEditing, setIsEditing] = React.useState(false);
    const toggleEditing = () => {
        setIsEditing(!isEditing);
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // console.log(values);
            await axios.post(`/api/courses/${courseId}/attachments`, values);
            toast.success("Course updated successfully!")
            toggleEditing()
            router.refresh();

        }
        catch (error) {
            toast.error("Something went wrong!")
        }
    }
    const onDelete = async (id: string) => {
        try {
            // console.log(values);
            setDeletingId(id);
            await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
            toast.success("Course updated successfully!")
            toggleEditing()
            router.refresh();

        }
        catch (error) {
            toast.error("Something went wrong!")
        } finally {
            setDeletingId(null);
        }
    }
    return (
        <div className="mt-4 border rounded-md bg-slate-100 p-4">
            <div className="font-medium flex items-center justify-between">
                Attachment  Upload
                <Button onClick={toggleEditing} variant="ghost">
                    {
                        isEditing && (
                            <>Cancel</>
                        )
                    }
                    {!isEditing && !initialData.imageUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add a File
                        </>
                    )}

                 

                </Button>
            </div>
            {
                !isEditing && initialData.attachments.length === 0 && (
                    <p className="text-sm mt-2text-slate-500 italic">
                        No attachment Added
                    </p>
                )
            }
            {
                !isEditing && initialData.attachments.length > 0 && (
                    <div className="space-y-2">
                        {
                            initialData.attachments.map((attachment) => (
                                <div 
                                    key={attachment.id}
                                    className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-600 rounded-md"
                                >
                                    <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                    <p className="text-xs line-clamp-1">
                                        {attachment.name}
                                    </p>
                                    {deletingId === attachment.id && (
                                        <div>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        </div>
                                    )}
                                    {
                                        deletingId !== attachment.id && (
                                            <button 
                                            onClick={() => onDelete(attachment.id)}
                                            className="ml=auto hover:opacity-75 transition"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        )
                                    }
                                </div>
                            
                        ))}
                    </div>
                    )
            }
          
            {
                isEditing && (
                    <div>
                        <FileUpload
                            endpoint="courseAttachment"
                            onChange={(url) => {
                                if (url) {
                                    onSubmit({ url: url })

                                }
                            }}
                        />
                        <div className="text-xs text-muted-foreground mt-4">
                            Add anything your students might need to know for the course
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default AttachmentForm