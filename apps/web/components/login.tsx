'use client'
import { signIn, signOut } from 'next-auth/react'

export function Login() {

    return (
        <div>
            <button onClick={() => signIn("github")}>Login</button>
            <button onClick={()=> signOut()}>logout</button>
        </div>
    )
}
