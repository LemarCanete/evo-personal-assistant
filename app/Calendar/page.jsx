import React from 'react'

const Calendar = () => {
    return (
        <div className="">
            <h1 className='text-3xl font-bold my-10'>Calendar</h1>
            <iframe src="https://calendar.google.com/calendar/embed?src=ailemaraicanete%40gmail.com&ctz=Asia%2FManila" 
            className='border-0' width="1200" height="600" frameBorder="0" scrolling="no"></iframe>
        </div>
    )
}

export default Calendar