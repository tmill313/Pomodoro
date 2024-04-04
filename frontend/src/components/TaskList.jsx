import React from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';

// map over tasks
function TaskList({ initialDuration }) {
    const { sessionInfo } = useSelector((state) => state.auth);

    return (
        <div className="max-w-sm">
            {sessionInfo?.map((session, index) => {
                let thisDuration = Number(session?.duration) * 60
                return (
                    <div className="space-y-3" key={index}>
                        <Card session={session} thisDuration={thisDuration} />
                    </div>
                )
            })}
        </div>
    );
}


export default TaskList