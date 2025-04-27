import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type TRegisterSchema } from '@/schema/auth'

const AuthForm = () => {
    const form = useForm<TRegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: ""
        }
    })

    return (
        <div>

        </div>
    )
}

export default AuthForm