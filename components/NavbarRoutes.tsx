"use client"

import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { Button } from './ui/button'

type Props = {}

const NavbarRoutes = () => {
  const pathname  = usePathname();
  const isTeacher = pathname.includes('/teacher');
  const isCourses = pathname.includes('/courses');

  return (
    <div className='flex gap-x-2 ml-auto'>
      { isTeacher || isCourses ? (
        <Link href = "/">
          <Button size="sm" variant="ghost">
            <LogOut />
            Exit
          </Button>
        </Link> ) :(
          <Link href="/teacher/courses">
          <Button size='sm' variant="ghost">
            Teacher Mode
          </Button>
          </Link>
        )
      }
        
        <UserButton afterSignOutUrl='/' />
    </div>
  )
}

export default NavbarRoutes