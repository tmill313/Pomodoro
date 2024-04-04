import React, { useState } from "react";
import { useDeleteSessionMutation } from '../slices/sessionsApiSlice';
import { useEditSessionMutation } from '../slices/sessionsApiSlice';
import { setSession } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import EmojiPicker from "emoji-picker-react";

const colors = ['bg-teal-50', 'bg-purple-50', 'bg-sky-50', 'bg-yellow-50', 'bg-rose-50', 'bg-indigo-50']

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Card = ({ session, thisDuration }) => {
  const [showDurationEdit, setShowDurationEdit] = useState(false)
  const [showDescriptionEdit, setShowDescriptionEdit] = useState(false)
  const [showEmojiEdit, setShowEmojiEdit] = useState(false)
  const [duration, setDuration] = useState(Math.floor(thisDuration / 60))
  const [description, setDescription] = useState(session.description)
  const dispatch = useDispatch();
  const [deleteSession, { isLoading }] = useDeleteSessionMutation();
  const [editSession, { updateIsLoading }] = useEditSessionMutation();

  const handleDeleteClick = async () => {
    const res = await deleteSession({
      id: session._id
    }).unwrap();
    dispatch(setSession(res))
  }

  const handleEmojiClick = async (emojiData) => {
    const res = await editSession({
      id: session._id,
      emoji: emojiData.emoji
    }).unwrap();
    dispatch(setSession(res))
    setShowEmojiEdit(false)
  }

  const handleDurationBlur = async () => {
    const res = await editSession({
      id: session._id,
      duration: duration
    }).unwrap();
    dispatch(setSession(res))
    setShowDurationEdit(false)
  }

  const handleDescriptionBlur = async () => {
    const res = await editSession({
      id: session._id,
      description: description
    }).unwrap();
    dispatch(setSession(res))
    setShowDescriptionEdit(false)
  }

  return (
    <div className="divide-y rounded-lg">
      <div
        className='rounded-lg group my-6 bg-gray-100 relative p-6'
      >
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <EmojiPicker style={{ position: 'absolute', zIndex: '99' }} skinTonesDisabled open={showEmojiEdit} onBlur onEmojiClick={handleEmojiClick} />
            <span
              onClick={() => setShowEmojiEdit(true)}
              className={classNames(
                colors[Math.floor(Math.random() * colors.length)],
                'inline-flex rounded-lg p-2 ring-4 ring-white text-4xl cursor-pointer'
              )}
            >
              {session.emoji}
            </span>
            {showDescriptionEdit ? <input
              className="font-semibold ml-6 text-gray-500 hover:text-gray-600 cursor-pointer w-24"
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  handleDescriptionBlur();
              }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={handleDescriptionBlur}
              autoFocus
            />
              :
              <span
                onClick={() => setShowDescriptionEdit(true)}
                className="font-semibold ml-6 text-gray-500 hover:text-gray-600 cursor-pointer"
                aria-hidden="true"
              >
                {session.description}
              </span>}
          </div>
          {showDurationEdit ? <input
            className="font-semibold ml-6 text-gray-500 hover:text-gray-600 cursor-pointer w-16 text-right"
            onKeyDown={(e) => {
              if (e.key === "Enter")
                handleDurationBlur();
            }}
            value={duration}
            type='number'
            onChange={(e) => setDuration(e.target.value)}
            onBlur={handleDurationBlur}
            autoFocus
          />
            :
            <span
              onClick={() => setShowDurationEdit(true)}
              className="font-semibold ml-6 text-gray-500 hover:text-gray-600 cursor-pointer"
              aria-hidden="true"
            >
              {Math.floor(thisDuration / 60)}:{thisDuration % 60 < 10 ? `0${thisDuration % 60}` : thisDuration % 60}
            </span>}
        </div>
        <div className="items-center justify-start flex mt-8 text-gray-500">
          <button onClick={handleDeleteClick} className='rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default Card
