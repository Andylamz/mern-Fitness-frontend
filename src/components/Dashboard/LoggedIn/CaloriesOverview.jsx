import React from 'react'

export default function CaloriesOverview() {
  return (
    <div className='text-[#6572aa]  min-w-80  max-w-90 rounded-lg text-center px-5 py-5'>
        <p className='text-xl font-semibold'>Calories</p>
        <div className='flex flex-col gap-3 mt-5'>
            <div className='flex justify-between'>
                <p>Targeted Calories</p>
                <p>2100kcal</p>
            </div>
            <div className='flex justify-between'>
                <p>Calories Intake</p>
                <p>2100kcal</p>
            </div>
            <div className='flex justify-between'>
                <p>Remaing Calories</p>
                <p>2100kcal</p>
            </div>
        </div>
    </div>
  )
}
