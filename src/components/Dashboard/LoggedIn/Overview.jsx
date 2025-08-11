import React from 'react'
import CaloriesOverview from './CaloriesOverview'
import ExerciseOverview from './ExerciseOverview'

export default function Overview({firstName}) {
  return (
    <div className='rounded-md p-5 pb-7 text-[#c9b26c] bg-[#252733]'>
      <div className='flex justify-between'>
        <p className=' font-semibold text-3xl'>
          Overview
        </p>
        <p className='text-lg mr-2'>Hi, {firstName}</p>
      </div>
      <div className='flex justify-between mt-4'>
        <CaloriesOverview/>
        <ExerciseOverview/>
        <ExerciseOverview/>
        <ExerciseOverview/>
      </div>
    </div>
  )
}
