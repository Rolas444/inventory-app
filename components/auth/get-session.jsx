"use client"
import {useInventoryStore} from '@/zustand/store'
import { useEffect } from 'react'

const GetSession =({dataSession})=>{
    const {session, setSession} = useInventoryStore()

    const validSession = (data)=>{
        if(session === null){
            setSession(data)
        }
    }

    useEffect(()=>{
        validSession(dataSession)
    },[dataSession])
    

    return (<></>)
}

export default GetSession;