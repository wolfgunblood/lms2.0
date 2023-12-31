import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const CoursePage = () => {
  return (
    <div className='p-6'>
        <Link href="/teacher/create">
            <Button className=''>
                New Course
            </Button>
        </Link>
    </div>
  )
}

export default CoursePage