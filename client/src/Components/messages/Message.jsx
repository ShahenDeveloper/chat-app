import React from 'react';
import { useAuthContext } from '../../Context/AuthContext';
import userConversation from '../../zustand/useConversation';
import { extractTime } from '../../utlis/extractTime';

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = userConversation();

  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : 'bg-gray-700';
  const formattedTime = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img src={profilePic} alt="" />
        </div>
      </div>
      <div className={`  pt-0 chat-bubble text-white ${bubbleBgColor} ${shakeClass} overflow-hidden break-words`}>
  <p className="p-2">{message.message}</p>
</div>

      <div className='chat-footer opacity-80 text-xs flex gap-1 items-center pb-2'>{formattedTime}</div>
    </div>
  );
}

export default Message;