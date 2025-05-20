'use client'
import React, { useEffect, useState } from 'react'
import supabase from '@/lib/supabaseClient'
import { format } from "date-fns";
import {Plus} from 'lucide-react'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'

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

  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() =>{
        const getContacts = async() =>{
            const { data, error } = await supabase
            .from('Contacts')
            .select()

            console.log(data)
            setContacts(data);
        }
        getContacts()

        return () =>{
            getContacts()
        }
    }, [])
    
    const addContact = async() => {
        const { data, error } = await supabase
            .from('Contacts')
            .insert({ full_name: name, email: email })

        setContacts(prev => [...prev, { id: prev.length + 1, full_name: name, email: email, created_at: new Date()}])
    }

    return (
        <div className='w-4/6 mt-20'>
            <div className="flex justify-between">
                <h1 className="text-3xl font-semibold mb-8">Contacts</h1>
                <Dialog>
                    <DialogTrigger className="underline italic cursor-pointer">
                        <Plus className='inline'/> <span>Add Contact</span>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle className="mb-5">Add Contact</DialogTitle>
                        <DialogDescription className="">
                            Provide details to add a contact
                        </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-5">
                            <Input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} value={name}/>
                            <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        </div>
                        <DialogFooter>
                            <div className="flex justify-end gap-5">
                                <Button variant="secondary" className="cursor-pointer">Cancel</Button>
                                <Button className="bg-green-500 text-white cursor-pointer" variant="primary" onClick={addContact}>Save</Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                    
                </Dialog>
            </div>
            <Table>
            <TableCaption>A list of your contacts.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Created At</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {contacts && contacts.length > 0 && contacts.map((contact) => (
                <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.full_name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{format(contact.created_at, 'MMM dd, yyyy hh:mm a')}</TableCell>
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

export default Contacts