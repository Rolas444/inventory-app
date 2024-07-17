import React from 'react'
import { Controller } from 'react-hook-form'

const InputControlled = ({ name, control,label, rules = {}, type = 'text', className = '', placeholder='' }) => {
    return (
        <>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (<>
                    <div className='flex flex-column' >
                        
                            <label className='text-sm' htmlFor={name}>{label}</label>
                        
                        <input
                            {...field}
                            type={type}
                            placeholder={placeholder}
                            className={className}
                        />
                    </div>

                </>)}
            />
        </>
    )
}

export default InputControlled