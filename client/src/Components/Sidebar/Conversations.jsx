import React from 'react'
import Conversation from './Conversation'
import useGetConversations from './useGetConversations'
import { getRandomEmoji } from '../../utlis/emoji'

function Conversations() {
  const { loading, conversations } = useGetConversations()
  console.log('conversations', conversations)
  
  return (
    <div className='conversations-container py-2 flex flex-col'>
      {conversations.map((conversation, idx) => (
        <Conversation key={conversation._id} conversation={conversation} emoji={getRandomEmoji()} lastIdx={idx === conversations.length -1}/>
      ))}
      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  )
}

export default Conversations