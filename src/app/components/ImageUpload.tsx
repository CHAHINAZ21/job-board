'use client'
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import { useRef, useState } from "react";

export default function ImageUpload({icon}:{icon:IconDefinition}){
    const fileInRef = useRef<HTMLInputElement>(null)
    const [url, setUrl]= useState('');

    async function upload(ev:Event){
     const input = ev.target as HTMLInputElement;
     if (input && input.files?.length && input.files.length>0){
        const file = input.files[0];
        const data = new FormData;
        data.set('file', file);
        const response = await axios.post('/api/upload',data);
        if (response.data.url ){
           setUrl(response.data.url);
        }
        

     }

    }

    return (
        <>
        <div className="bg-gray-100 rounded-md size-24 inline-flex items-center justify-center">
            {url &&(
                <img src={url} alt ={'uploaded image'} width={1024} height={1024} className="w-auto h-auto"/>
            )}
            {!url &&(
                <FontAwesomeIcon icon={icon} className="text-gray-400"/>
            )}
            </div>
            <div className="mt-2">
                <input 
                onChange={upload}
                ref={fileInRef} 
                type="file" 
                className="hidden" />
                <Button 
                type="button"
                onClick={()=> fileInRef.current?.click()}
                variant="soft">
                    Select file
                </Button>
            </div> 
        </>

    );
}