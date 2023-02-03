import React from 'react'

const Form = () => {
  return (
    <div id='contact' className='max-w-[1140px] m-auto w-full p-4 py-16'>
        <h2 className='text-center text-gray-700'>Send us a message</h2>
        <p className='text-center text-gray-700 py-2'>We're standing by1</p>
        <div className='grid md: grid-cols-2'>
            <img 
            className='w-full md:h-full object-cover p-2 max-h-[500px] h-[200px]'
            src="https://media.istockphoto.com/id/922783734/photo/assorted-indian-recipes-food-various.jpg?s=2048x2048&w=is&k=20&c=1B9sUUPUsoVBAMCsk461nPRix-YIo74i8LgSWSkhCOE=" alt="" />
            <form action="">
                <div className='grid grid-cols-2'>
                    <input className='border m-2 p-2' type="text" placeholder='First' />
                    <input className='border m-2 p-2' type="text" placeholder='Last' />
                    <input className='border m-2 p-2' type="text" placeholder='Email' />
                    <input className='border m-2 p-2' type="text" placeholder='Phone' />
                    <input className='border col-span-2 p-2 m-2' type="text" placeholder='Address' />
                    <textarea  className='border col-span-2 m-2 p-2' name="" id="" cols="30" rows="10"></textarea>
                    <button className='col-2-span-2 m-2'>Submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Form