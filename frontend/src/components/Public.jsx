import { Link } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

const Public = () => {


    return (
        <>
            {/* Navbar */}
            <Navbar />
            {/* Banner */}

            <div className='w-full h-[90vh]'>
                <img src="https://img5.goodfon.com/original/1920x1080/2/3f/makarony-bliudo-lapsha-temnyi-fon-eda-pomidory-skovoroda.jpg" alt=""
                    className='w-full h-full object-cover' />
                <div className='max-w-[1140 px] m-auto'>
                    <div className='absolute top-[40%] w-full md:-[50%] max-w-[600px] h-full flex flex-col text-white p-4'>
                        <h1 className='font-bold text-4xl'>Find You Special Food</h1>
                        <h2 className='text-xl py-4 italic'>With Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus laudantium ipsum eaque. Dolore officiis omnis in numquam excepturi eveniet voluptates!</h2>
                    </div>
                </div>
            </div>

            {/* Service */}
            <div className='max-w-[1140px] m-auto w-full md:flex mt-[-75px]'>
                <div className='relative p-4'>
                    <h3 className='absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-2xl font-bold'>Book Now</h3>
                    <img
                        className='w-full h-full object-cover relative border-4 border-white shadow-lg'
                        src="https://images.pling.com/img/00/00/63/48/00/1646778/39857213912be2a47096d2983bad03a3756de42ad83b245ca7e5f3e75f62d0f910df.jpg" alt="" />
                </div>
                <div className='relative p-4'>
                    <h3 className='absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-2xl font-bold'>Book Now</h3>
                    <img
                        className='w-full h-full object-cover relative border-4 border-white shadow-lg'
                        src="https://media.istockphoto.com/id/922783734/photo/assorted-indian-recipes-food-various.jpg?s=2048x2048&w=is&k=20&c=1B9sUUPUsoVBAMCsk461nPRix-YIo74i8LgSWSkhCOE=" alt="" />
                </div>
                <div className='relative p-4'>
                    <h3 className='absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white text-2xl font-bold'>Book Now</h3>
                    <img
                        className='w-full h-full object-cover relative border-4 border-white shadow-lg'
                        src="https://wallpaperaccess.com/full/4883007.jpg" alt="" />
                </div>
            </div>

            {/*Booking  */}

            <div id='deals' className='max-w-[1140px] m-auto w-full p-4 '>
                <form className='lg:flex lg:justify-evenly w-full items-center'>
                    <Link to={'/register'}>
                        <div className='flex flex-col my-2 p-2 w-80'>
                            <button className='w-full px-4 py-2 border bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-light)] text-white'>Register as a User</button>
                        </div>
                    </Link>
                    {/* <div className='flex flex-col my-2 py-2 '>
                        <label htmlFor="">Destination</label>
                        <select className='lg:w-[300px] md:w-full border rounded-md p-2'>
                            <option value="">FoodQuarte</option>
                            <option value="">Foody</option>
                            <option value="">Foodbookin</option>
                            <option value="">FoodQua</option>
                        </select>
                    </div> */}
                    {/* <div className='flex w-full'>
                        <div className='flex flex-col w-full lg:max-w-[250px] my-2 p-2'>
                            <label htmlFor="">Check-In</label>
                            <input className='border rounded-md p-2' type="date" />
                        </div>
                        <div className='flex flex-col w-full lg:max-w-[250px] my-2 p-2'>
                            <label htmlFor="">Check-Out</label>
                            <input className='border rounded-md p-2' type="date" />
                        </div>
                    </div> */}
                    <Link to={'/login'}>
                        <div className='flex flex-col my-2 p-2 w-80 col-2-span-2 m-2'>
                            <button className='w-full px-4 py-2 border bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-light)] text-white'>Login as a user</button>
                        </div>
                    </Link>
                </form>
            </div>

            {/* Gallery */}

            <div id='gallery' className='max-w-[1140px] m-auto w-full px-4 py-16'>
                <h2 className='text-center text-gray-700 p-4'>Gallery</h2>
                <div className='grid sm:grid-cols-5 gap-4'>
                    <div className='sm:col-span-3 col-span-2 row-span-2'>
                        <img className='w-full h-full object-cover' src="https://img3.goodfon.com/original/1920x1080/d/f1/eda-myaso-hleb-ovoschi-luk.jpg" alt="" />
                    </div>
                    <div>
                        <img className='w-full h-full object-cover' src="https://img4.goodfon.com/wallpaper/nbig/9/95/napitok-sok-ovoshchi-frukty-zelen.jpg" alt="" />
                    </div>
                    <div>
                        <img className='w-full h-full object-cover' src="https://experiencelife.lifetime.life/wp-content/uploads/2021/02/Family_Meals.jpg" alt="" />
                    </div>
                    <div>
                        <img className='w-full h-full object-cover' src="https://media.istockphoto.com/id/922783734/photo/assorted-indian-recipes-food-various.jpg?s=2048x2048&w=is&k=20&c=1B9sUUPUsoVBAMCsk461nPRix-YIo74i8LgSWSkhCOE=" alt="" />
                    </div>
                    <div>
                        <img className='w-full h-full object-cover' src="https://media.istockphoto.com/id/922783734/photo/assorted-indian-recipes-food-various.jpg?s=2048x2048&w=is&k=20&c=1B9sUUPUsoVBAMCsk461nPRix-YIo74i8LgSWSkhCOE=" alt="" />
                    </div>
                </div>
            </div>


            {/* Supplier login */}

            <div id='deals' className='max-w-[1140px] m-auto w-full p-4'>
                <form className='lg:flex lg:justify-evenly w-full items-center'>
                    <div className='flex flex-col my-2 p-2 w-80'>
                        <button className='w-full px-4 py-2 border bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-light)] text-white'>Login as a Supplier</button>
                    </div>
                    <div className='flex flex-col my-2 p-2 w-80'>
                        <button className='w-full px-4 py-2 border bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-light)] text-white'>Register as a Supplier</button>
                    </div>
                </form>
            </div>

            {/* Form */}

            <div id='contact' className='max-w-[1140px] m-auto w-full p-4 py-16'>
                <h2 className='text-center text-gray-700'>Send us a message</h2>
                <p className='text-center text-gray-700 py-2'>We're standing by1</p>
                <div className='grid md: grid-cols-2'>
                    <img
                        className='w-full md:h-full object-cover p-2 max-h-[500px] h-[200px]'
                        src="https://i.ytimg.com/vi/BEyloCJlpm0/maxresdefault.jpg" alt="" />
                    <form action="">
                        <div className='grid grid-cols-2'>
                            <input className='border m-2 p-2' type="text" placeholder='First' />
                            <input className='border m-2 p-2' type="text" placeholder='Last' />
                            <input className='border m-2 p-2' type="text" placeholder='Email' />
                            <input className='border m-2 p-2' type="text" placeholder='Phone' />
                            <input className='border col-span-2 p-2 m-2' type="text" placeholder='Address' />
                            <textarea className='border col-span-2 m-2 p-2' name="" id="" cols="30" rows="10"></textarea>
                            <button className='col-2-span-2 m-2 px-4 py-2 border bg-gradient-to-r from-[var(--primary-dark)] to-[var(--primary-light)] text-white'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer */}

            <Footer />
        </>





    )
}

export default Public