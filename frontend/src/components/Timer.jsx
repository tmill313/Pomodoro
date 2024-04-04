import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { setSession } from '../slices/authSlice';
import { useStartSessionMutation, useStopSessionMutation } from '../slices/sessionsApiSlice';
import { useDispatch } from 'react-redux';


const Timer = ({ sessionInfo }) => {
    const [timeLeft, setTimeLeft] = useState(sessionInfo?.duration * 60); // Convert minutes to seconds
    const [started, setStarted] = useState(false)
    const [startSession, { isLoading }] = useStartSessionMutation();
    const [stopSession, { stopIsLoading }] = useStopSessionMutation();
    const dispatch = useDispatch();

    // starts session if one doesnt exists and/or starts timer locally
    const handleStartClick = async () => {
        if (!sessionInfo) return
        const hasStarted = sessionInfo?.startTime
        if (hasStarted) {
            setStarted(true)
        } else {
            try {
                const res = await startSession({
                    id: sessionInfo?._id,
                }).unwrap();
                dispatch(setSession(res))
                setStarted(true)
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }

    }

    // marking session as complete on the backend and updating sessions list of incomplete tasks
    const handleStopClick = async () => {
        setStarted(false)
        try {
            const res = await stopSession().unwrap();
            dispatch(setSession(res))
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }

    }

    useEffect(() => {
        setTimeLeft(sessionInfo?.duration * 60)
    }, [sessionInfo]);

    useEffect(() => {
        // Exit early when we reach 0
        if (!timeLeft) return;
        if (!started) return;

        // Save intervalId to clear the interval when the component re-renders
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        // Clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
        // Add timeLeft as a dependency to re-run the effect when we update it
    }, [timeLeft, started]);

    return (
        <div className="col-start-2 row-end-1 max-w-sm flex flex-col justify-center items-center mt-12">
            <div>
                <div className="mt-2 text-6xl font-black tracking-tight text-gray-800 sm:text-6xl">
                    {sessionInfo ?
                        (Math.floor(timeLeft / 60) < 10 ? `0${Math.floor(timeLeft / 60)}` : Math.floor(timeLeft / 60)) + ':' + (timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60)
                        :
                        '00:00'}
                </div>
                <div className='mx-auto max-w-2xl text-center text-md leading-8 text-gray-600'>{sessionInfo?.description}</div>
            </div>


            <div>
            </div>
            <div>
                {
                    started ?
                        // the pause button stops the local timer, does not mark session as complete
                        <svg onClick={() => setStarted(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={sessionInfo ? "currentColor" : "gray"} className="w-16 h-16 cursor-pointer"
                        >
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z" clipRule="evenodd" />
                        </svg>
                        :

                        <svg onClick={handleStartClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={sessionInfo ? "currentColor" : "gray"} className="w-16 h-16 cursor-pointer">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
                        </svg>
                }
            </div>
            <button className='mt-2 rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100' onClick={handleStopClick}>Mark as complete</button>
        </div>
    );
}


export default Timer