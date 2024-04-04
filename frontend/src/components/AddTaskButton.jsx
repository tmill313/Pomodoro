import React from "react";

// button to show the add task form fields
const AddTaskButton = ({ handleClick }) => {
    return (
        <div className="divide-y rounded-lg">
            <div
                onClick={() => handleClick(true)}
                className='rounded-lg group bg-gray-100 relative p-16 font-semibold text-gray-400 hover:text-gray-600 cursor-pointer flex justify-center items-center flex-col border-4 border-dashed border-gray-400 hover:border-gray-600'
            >
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                    </svg>

                </div>
                <div>Add task</div>
            </div>
        </div>
    )
}

export default AddTaskButton