import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function ExerciseOverview() {
  return (
    <div className='text-[#6572aa] min-w-80 max-w-90 rounded-lg text-center px-5 py-5'>
        <p className='text-xl font-semibold'>Exercise</p>
        <div className='flex flex-col gap-3 mt-5'>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <FontAwesomeIcon icon="fa-solid fa-shoe-prints" rotation={270} className='text-lg text-orange-500'/>
                    Steps
                </div>
                <div className='flex w-22 justify-between'>
                    <p>2100</p>
                    <p>steps</p>
                </div>
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <FontAwesomeIcon icon="fa-solid fa-football" rotation={270} className='text-lg text-blue-500'/>
                    Exercise
                </div>
                <div className='flex w-22 justify-between'>
                    <p>2100</p>
                    <p>kcal</p>
                </div>
            </div>
        </div>
        
    </div>
  )
}
