import React, { useState } from 'react';
import Timer from '../components/Timer';
import { useSelector } from 'react-redux';
import TaskList from '../components/TaskList';
import AddTask from '../components/AddTask';
import AddTaskButton from '../components/AddTaskButton';




const HomeScreen = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const { sessionInfo } = useSelector((state) => state.auth);

  return (
    <div className='flex flex-col justify-center max-w-sm w-96'>
      <Timer sessionInfo={sessionInfo?.[0]} />
      <TaskList />
      <div>
        {showAddTask ? <AddTask handleCancelClick={setShowAddTask} />
          : <AddTaskButton handleClick={setShowAddTask} />}
      </div>
    </div>
  )
};
export default HomeScreen;
