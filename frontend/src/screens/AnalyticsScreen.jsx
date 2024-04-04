import React, { useState, useEffect } from "react";
import { useGetTodayMutation } from "../slices/sessionsApiSlice";


const AnalyticsScreen = () => {
    const [report, setReport] = useState(null)
    const [getToday, { isLoading }] = useGetTodayMutation();
    const actualMinutes = report?.totalActualDurationSeconds / 60


    useEffect(() => {
        if (report) return
        const getReport = async () => {
            const res = await getToday().unwrap();
            setReport(res)
        }
        getReport()
    }, [])
    if (isLoading) return
    return (
        <div className="max-w-lg w-96">
            <h3 className="text-base mt-8 text-3xl font-semibold font-semibold leading-6 text-gray-900">Today</h3>
            <dl className="mt-5 grid grid-cols-1 gap-10 sm:grid-cols-2">
                <div className="flex justify-center flex-col items-center overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Completed</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{report?.completedTotal}</dd>
                </div>
                <div className="flex justify-center flex-col items-center  overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Remaining</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{report?.notCompletedTotal}</dd>
                </div>
                <div className="flex justify-center flex-col items-center  overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Time planned</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                        {report?.totalPlannedDurationMinutes ?
                            (Math.floor(report?.totalPlannedDurationMinutes / 60) < 10 ? `0${Math.floor(report?.totalPlannedDurationMinutes / 60)}` : Math.floor(report?.totalPlannedDurationMinutes / 60)) + ':' + (Math.floor(report?.totalPlannedDurationMinutes % 60) < 10 ? `0${Math.floor(report?.totalPlannedDurationMinutes % 60)}` : Math.floor(report?.totalPlannedDurationMinutes % 60))
                            :
                            '00:00'}

                    </dd>
                </div>
                <div className="flex justify-center flex-col items-center  overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                    <dt className="truncate text-sm font-medium text-gray-500">Time spent</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
                        {actualMinutes ?
                            (Math.floor(actualMinutes / 60) < 10 ? `0${Math.floor(actualMinutes / 60)}` : Math.floor(actualMinutes / 60)) + ':' + (Math.floor(actualMinutes % 60) < 10 ? `0${Math.floor(actualMinutes % 60)}` : Math.floor(actualMinutes % 60))
                            :
                            '00:00'}
                    </dd>
                </div>
            </dl>
        </div>
    )
}

export default AnalyticsScreen