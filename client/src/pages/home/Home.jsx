import React from 'react'
import SideBar from '../../Components/Sidebar/SideBar'
import MessageContainer from '../../Components/messages/MessageContainer'

function Home() {
  return (
    <div className=' flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <SideBar/>
        <MessageContainer/>
    </div>
  )
}

export default Home
