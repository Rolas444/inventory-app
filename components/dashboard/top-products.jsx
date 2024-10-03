'use client'
import React from 'react'

const TopProducts = ({listProducts }) => {

    console.log(listProducts)

  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                {
                    listProducts.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.product.name}</td>
                                <td>{item._sum.quantity}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default TopProducts