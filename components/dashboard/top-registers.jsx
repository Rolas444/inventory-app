import React from 'react'

export const TopRegisters = ({topRegister =[]}) => {


    // console.log(topRegister);
    return (
        <div className='min-w-full text-sm'>
            <table className='min-w-full border border-collapse border-spacing-2'>
                <thead className='text-left'>
                    <tr className='text-left'>
                        <th className='border'>Usuario</th>
                        <th className='border'>Fecha</th>
                        <th className='border'>Producto</th>
                        <th className='border'>Movimiento</th>
                        <th className='border'>Cantidad</th>
                    </tr>
                </thead>
                <tbody className='divide-y'>
                    {
                        topRegister.map((item, index) => {

                            return (
                                <tr key={index} className='gap-2'>
                                    <td className='border px-2'>{item?.user?.email}</td>
                                    <td className='border px-2' >{item?.createdAt}</td>
                                    <td className='border px-2 whitespace-nowrap overflow-hidden'>{item?.product?.name}</td>
                                    <td className='border px-2'>{item?.typeTransaction?.name}</td>
                                    <td className='border px-2'>{item?.quantity}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )

}

export default TopRegisters