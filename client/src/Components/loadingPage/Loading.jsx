import React from 'react'

function Loading() {
  return (
    <div className='loading-container flex items-center justify-center z-50bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <img src='/logo.png' className='w-[90px]' />
    </div>
  )
}

export default Loading
