import AppLayout from '@/components/layout/AppLayout'
import React from 'react'
import letsChat from "../assets/HomeWelcome.gif"

function Home() {
  return (
    <div className='flex flex-col items-center justify-center align-middle h-full'>
      <h1 className='text-4xl font-bold font-mono p-2 bg-gradient-to-r from-fuchsia-500 to-cyan-500  bg-clip-text text-transparent'>Let's Chat . . . <br />Select a chat to begin.</h1>
    
      <img src={letsChat} className='h-[20rem] w-[18rem]' />
      </div>
  )
}

export default AppLayout()(Home)