import AppLayout from '@/components/layout/AppLayout'
import React from 'react'

function Home() {
  return (
    <div className='flex items-center justify-center align-middle h-full'><h1>Select a friend to Chat.</h1></div>
  )
}

export default AppLayout()(Home)