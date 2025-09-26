'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Vapi from "@vapi-ai/web";
import { useEffect, useState, useRef } from "react";
import supabase from '@/lib/supabaseClient'

import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

import Chats from './Chats'


export default function Home() {
    const [mic, setMic] = useState(false);
    const vapiRef = useRef(null);
    const assistantId = "8fd7f15a-dd4e-405f-a1f4-4894d322122d";
    const [conversation, setConversation] = useState([]);

    useEffect(() => {
		createChat({
			webhookUrl: 'https://n8n-n8n.q32w7w.easypanel.host/webhook/e4e54530-3a9e-4208-9f59-5c1c7550b91f/chat',
            initialMessages: [
                'Hi there! 👋',
                'My name is Evo. How can I assist you today?'
            ],
		});
	}, []);

    //get chat history
    useEffect(() =>{
        const getData = async()=>{
            const { data, error } = await supabase
                .from('Chats')
                .select()
            setConversation(data);
        }

        getData();
    }, [])

    // Initialize Vapi
    useEffect(() => {
        const vapi = new Vapi("1b17553c-7234-4c48-898b-a7bf4a4e9938");
        vapiRef.current = vapi;
    
        // Listen to Vapi messages
        vapi.on("message", (message) => {
            console.log(message)
            if(message.type === "conversation-update") {
                message.conversation.map((msg) => {
                    setConversation(prev => [...prev, {...msg, created_at: new Date().toISOString()}]);
                })
            }

            if(message.type === "transcript" && message.transcriptType === "final") {
                console.log("Vapi message:", message);

                (async () => {
                    const { data, error } = await supabase
                        .from('Chats')
                        .insert({ role: message.role, content: message.transcript });
                })();
            }
        }, []);
        

        return () => {
            if (vapiRef.current) {
                vapiRef.current.stop();
            }
        };
    }, []);
    
    const handleMicClick = () => {
        setMic(prev => !prev);
        if (vapiRef.current && mic === false) {
            vapiRef.current.start(assistantId);
        }

        if (vapiRef.current && mic === true) {
            vapiRef.current.stop();
        }
    };
        
    console.log(conversation)
    return (
    <div className="w-full  ">
        <h1>EVO - Personal Assistant</h1>
        <div className="px-20 py-10">
            <Chats conversation={conversation}/>
            <div className="flex place-items-center absolute top-10 w-4/6">
                <img src={`${!mic ? '/play.png' : '/stop.png'}`} alt="" className="cursor-pointer w-20 fixed right-10 top-10" onClick={handleMicClick}/>
            </div>
        </div>
       
    </div>
  );
}