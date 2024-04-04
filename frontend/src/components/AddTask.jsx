import { useState } from 'react';
import { toast } from 'react-toastify';
import { setSession } from '../slices/authSlice';
import { useDispatch } from 'react-redux';
import { useCreateSessionMutation } from '../slices/sessionsApiSlice';
import EmojiPicker from 'emoji-picker-react';



const AddTask = ({ handleCancelClick }) => {
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(25);
    const [emoji, setEmoji] = useState('😀')
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
    const dispatch = useDispatch();
    const [createSession, { isLoading }] = useCreateSessionMutation();

    const handleEmojiClick = (emojiData) => {
        setEmoji(emojiData.emoji)
        setIsEmojiPickerOpen(false)
    }

    // create new task/session
    const submitHandler = async (e) => {

        try {
            const res = await createSession({
                duration: Number(duration),
                description,
                emoji
            }).unwrap();
            dispatch(setSession(res))
            setEmoji('😀')
            setDuration(25)
            setDescription('')
            handleCancelClick(false)
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }


    };
    return (
        <div className='max-w-sm'>

            <div className="divide-y rounded-lg max-w-sm">
                <div
                    className='rounded-lg group my-6 bg-gray-100 relative p-6'
                >
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center'>
                            <EmojiPicker style={{ position: 'absolute', zIndex: '99' }} skinTonesDisabled open={isEmojiPickerOpen} onBlur onEmojiClick={handleEmojiClick} />
                            <span
                                onClick={() => setIsEmojiPickerOpen(true)}
                                className='inline-flex rounded-lg p-2 ring-4 ring-white text-4xl cursor-pointer bg-sky-50'
                            >
                                {emoji}
                            </span>
                            <input
                                placeholder='Add task'
                                className="font-semibold ml-6 text-gray-500 hover:text-gray-600 cursor-pointer w-24"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                        </div>
                        <input
                            className="font-semibold ml-6 text-gray-500 hover:text-gray-600 cursor-pointer w-16 text-right"
                            value={duration}
                            type='number'
                            onChange={(e) => setDuration(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-between items-center mt-8'>
                        <button onClick={() => handleCancelClick(false)} className='rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>Cancel</button>
                        <button onClick={submitHandler} disabled={!description || !duration} className='rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300'>Add</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddTask