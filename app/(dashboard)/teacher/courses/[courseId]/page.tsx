import React from 'react'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import IconBadge from '@/components/IconBadge'
import { CircleDollarSignIcon, LayoutDashboard, ListChecks } from 'lucide-react'
import TitleForm from './_components/TitleForm'
import DescriptionForm from './_components/DescriptionForm'
import ImageForm from './_components/ImageForm'
import CategoryForm from './_components/CategoryForm'
import PriceForm from './_components/PriceForm'

type Props = {}

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {

  // console.log(params)
  // const temp = auth()
  // console.log(temp)
  const { userId } = auth()
  if (!userId) {
    redirect("/")
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId
    }
  })

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  });
  // console.log(categories)
  if (!course) {
    redirect("/")
  }
  // console.log(course)

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  // const progress = Math.round((completedFields / totalFields) * 100); 
  const progress = `(${completedFields}/${totalFields})`;
  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-2'>
          <h1 className='text-2xl font-medium'>
            Course Setup
          </h1>
          <span className='text-sm text-slate-600'>{progress}</span>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-16'>
        <div>
          <div className='flex items-center gap-x-2'>
            <IconBadge size="default" icon={LayoutDashboard} />
            <h2 className='text-xl font-medium'>Customize your course</h2>
          </div>
          <TitleForm
            initialData={course}
            courseId={course.id}
          />
          <DescriptionForm
            initialData={course}
            courseId={course.id}
          />
          <ImageForm
            initialData={course}
            courseId={course.id}
          />
          <CategoryForm
            initialData={course}
            courseId={course.id}
            options={categories.map(category => ({ label: category.name, value: category.id }))}
          />
        </div>
        <div className='space-y-6'>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={ListChecks} />
              <h2 className='text-xl'>
                Course Chapters
              </h2>
            </div>
            {/* Chapter Form */}
          </div>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={CircleDollarSignIcon}/>
              <h2 className='text-xl'>
                Sell your Course
              </h2>
            </div>
            <PriceForm 
              initialData={course}
              courseId={course.id}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseIdPage