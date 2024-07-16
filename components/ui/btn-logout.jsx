'use client'

import { signOut } from 'next-auth/react'
import React from 'react'

const   BtnLogout = () => {
  return (
    <>
    <button onClick={()=>signOut({
        callbackUrl: '/login'
    })}>Salir</button>
    </>
  )
}

export default BtnLogout