import React from 'react'

const TotalMensual = ({sumaTotal}) => {
  return (
    <h2 className='text-4xl'>
        {`S/ ${sumaTotal? sumaTotal : 'Error'}`}
    </h2>
  )
}

export default TotalMensual