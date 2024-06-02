import React, { useEffect, useState } from 'react';
import SideBar from '../../Components/Sidebar/SideBar';
import MessageContainer from '../../Components/messages/MessageContainer';
import Loading from '../../Components/loadingPage/Loading';

function Home() {
  const [loading, setLoading] = useState(true); // Set loading to true initially

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Set loading to false after content is loaded
    }, 3000);
  }, []); // Removed loading from dependency array, since we only want this effect to run once

  console.log(loading);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='flex sm:h-[90vh] md:h-[90vh] h-[95vh] sm:w-[1000px] w-[99vh] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 overflow-x-hidden'>
          <SideBar />
          <MessageContainer />
        </div>
      )}
    </>
  );
}

export default Home;
