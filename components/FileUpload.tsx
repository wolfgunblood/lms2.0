"use client"

import React from 'react'
import toast from 'react-hot-toast'
import { UploadDropzone } from '@/lib/uploadthing'
import { OurFileRouter, ourFileRouter } from '@/app/api/uploadthing/core'
type Props = {}

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
}

const FileUpload = ({ onChange, endpoint }: FileUploadProps) => {
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                // Do something with the response
                onChange(res?.[0].url);
            
            }}
            onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
                toast.error(error?.message);
            }}
        />
    )
}

export default FileUpload