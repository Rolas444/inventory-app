'use server'

import { signIn } from "@/auth"

export const LoginAction = async (data)=>{
    try {
        await signIn('credentials', {
            redirect: false,
            username: data.username,
            password: data.password,
        })
    }catch(e){
        console.log(e);
    }
}