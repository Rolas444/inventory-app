import React from 'react'

const TotalPlatform = ({ listPlatform = [] }) => {
    return (
        <>
            {listPlatform.map((item, i) => {
                return (
                    <div key={i} className='flex w-full justify-between p-2'>
                        <div className=''>
                            {item.name}
                        </div>
                        <div className=''>
                            {`S/ ${item.total}`}
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default TotalPlatform