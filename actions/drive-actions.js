"use server"
import {drive} from '@/drive/client_drive';
import { convertStringToImage } from '@/lib/tools';
import { Readable } from 'stream';

const bufferToStream = (buffer) => {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
}

// function extractMimeType(stringImage) {
//     const match = stringImage.match(/^data:(.*?);base64,/);
//     return match ? match[1] : 'application/octet-stream';
// }

const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

export const uploadFile = async (base64String, filename) => {
    try{
        const blob = convertStringToImage(base64String);
        // const buffer = await blobToBuffer(blob);
        // const buffer = Buffer.from(base64String, 'base64');
        // const mimeType = extractMimeType(base64String);
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const fileMetadata = {
            name: filename,
            parents: [folderId]
        };
        const media = {
            mimeType: blob.type,//mimeType,
            body: bufferToStream(buffer)//blob
        };

        const res = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
        });
        console.log(res.data);
        const fileId = res.data.id;
        // const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
        return fileId;
        
    }
    catch(e){
        console.log(e);
    }
}

export const deleteFile = async (fileId) => {
    try{
        const res = await drive.files.delete({
            fileId: fileId
        });
        console.log(res.data);
    }
    catch(e){
        console.log(e);

    }
}