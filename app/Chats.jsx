'use client'
import React, { useEffect, useState, useRef } from 'react'
import supabase from '@/lib/supabaseClient'
import { format } from "date-fns";


const Chats = ({conversation}) => {
    // Create a ref for the messages container
    const messagesEndRef = useRef(null);

    // Function to scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Scroll to bottom when conversation changes
    useEffect(() => {
        scrollToBottom();
    }, [conversation]);




    return (
        <div className='w-11/12 max-h-[80vh] overflow-y-auto'>
            {conversation && conversation.length > 0 && conversation.map((message, key)=>{
                return <div key={key} className={`flex ${message.role == "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`${message.role == "user" ? "w-96" : ""} mt-2`}>
                        <span className={`${message.role == "user" ? 'text-right' : ''} text-sm opacity-25`}>{format(message.created_at, 'MMM dd, yyyy hh:mm a')}</span>
                        <p className={`block p-1 ${message.role == "user" ? "bg-gray-100 rounded-lg text-right px-2 me-2" : ""}`}>{message.content}</p>
                    </div>
                </div>
            })}
            {/* This empty div serves as a reference point to scroll to */}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default Chats