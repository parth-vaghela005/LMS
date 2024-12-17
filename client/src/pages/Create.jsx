import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
const Create = () => {
  return (
    <div className='w-full h-[100vh] flex justify-center items-center '>
      <div className='w-full md:w-96 border-gray-600 py-4 px-4 border-[1px] rounded '>
      <div className=''>
             <Label htmlFor="name">Quato</Label>
              <Input id="name" defaultValue="" placeholder='Enter your quto' className='text-black' />
      </div>
      <div className='mt-3'>
             <Label htmlFor="name">Author</Label>
              <Input id="name" defaultValue="Pedro Duarte"   className='text-black outline-none ' />
      </div>
      <div className='flex justify-center items-center'>
      <Button className='mt-5 text-start'>
        Create
      </Button>
      </div>
      
    </div>
      </div>
    
  )
}
export default Create
