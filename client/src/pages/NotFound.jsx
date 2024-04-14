import React from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

function NotFound() {
  return (
    <div>
      <Drawer direction="right">
      <DrawerTrigger asChild>
        <h1>Edit Profile</h1>
      </DrawerTrigger>
      <DrawerContent className='top-0 right-0 left-auto mt-0 w-[500px] rounded-none'>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        
        <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              close
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    </div>
  )
}

export default NotFound