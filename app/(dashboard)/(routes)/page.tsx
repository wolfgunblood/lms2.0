import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export default function Home() {
  return (
    <div>

      <h1 className='text-red-600'>
        Hello World
      </h1>
      <UserButton afterSignOutUrl='/' />
    </div>
  )
}
