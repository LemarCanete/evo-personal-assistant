'use client'
import React, {useEffect, useState} from 'react'
import axios from 'axios'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const Tasks = () => {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const url = 'https://n8n-production-1b3a.up.railway.app/webhook/93afffd9-2225-4b18-95b3-523eff2bd8c9';
        const getData = async () => {
            try {
                const response = await axios.get(url,{
                  headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': true, 
                  }
                });
                
                console.log('Webhook successfully called:', response);
                setTasks(response.data);
                return response.data;
              } catch (error) {
                console.error('Webhook call failed:', error.response?.data || error.message);
                throw error;
              }
        }
    
        getData();
      }, []);
    return (
        <div>
            <h1 className='text-3xl font-bold my-10'>Tasks</h1>
            <Table className="w-[900px]">
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Tasks Name</TableHead>
                        <TableHead>Due</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks && tasks.length > 0 && tasks.map((task, key) => (
                        <TableRow key={key}>
                            <TableCell className="font-medium">{task.title}</TableCell>
                            <TableCell>{task.due}</TableCell>
                            <TableCell>{task.status}</TableCell>
                        </TableRow> 
                    ))}
                </TableBody>
                {/* <TableFooter>
                    <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter> */}
            </Table>
            
        </div>
    )
}

export default Tasks