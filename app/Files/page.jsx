'use client'
import React, { useState } from 'react'
import {List, Grid} from 'lucide-react'

const Files = () => {
    const [list, setList] = useState(false)

    return (
        <div>
            <div className="flex my-10 gap-10 items-baseline">
                <h1 className='text-3xl font-bold '>Files</h1>
                <Grid className='cursor-pointer' onClick={() => setList(false)}/>
                <List className='cursor-pointer' onClick={() => setList(true)}/>
                {/* <h1 className="">Add File</h1> */}
            </div>

            <iframe src={`https://drive.google.com/embeddedfolderview?id=16vP2f0wqOGdKYsmgXdlELOGsO_RpSsPY#${list ? "list" : "grid"}`} 
            className="w-[1200px] h-[600px] border-0"></iframe>
        </div>
    )
}

export default Files
// https://drive.google.com/drive/folders/16vP2f0wqOGdKYsmgXdlELOGsO_RpSsPY?usp=sharing