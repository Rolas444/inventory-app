'use client'
import { createBrowserClient } from '@supabase/ssr'
import { v4 as uuidv4 } from 'uuid';
import { Readable } from 'stream';

const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)



export const uploadFile = async (base64String) => {

    const blob = ConvertImageToBase64(base64String);

    const { data, error } = await supabase.storage.from(bucketName).upload(uuidv4(), blob)
    if (error) {
        console.log(error)
        throw error
    }
    console.log(data)
    return data.path
}

export const deleteFile = async (filename) => {
    const { data, error } = await supabase.storage.from(bucketName).remove([filename])
    if (error) {
        console.log(error)
        throw error
    }
    console.log(data)
    return data

}

export const ConvertImageToBase64 =  (base64String) => {
    const splitString = base64String.split(',');
    const contentType = splitString[0].split(':')[1].split(';')[0];
    const base64 = splitString[1];

    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });
    return blob;
}

