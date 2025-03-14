import React, { useState } from 'react'
import { SocialIcon } from 'react-social-icons'
import Hamburger from 'hamburger-react'
function Header() {

    type Item = {
        text: string;
        link: string
    }

    const [isOpen, setOpen] = useState(false)
    const items: Item[] = [{ text: "Home", link: '/home' }, { text: 'Profile', link: '/profile' }]
    return (
        <div className='bg-white'>
            <div className='py-4 flex justify-between items-center border-b-2 border-black px-5 md:px-10'>
                <div className='items-center hidden md:flex gap-4 sm:gap-7 '>
                    <SocialIcon bgColor='black' url="https://instagram.com" />
                    <SocialIcon bgColor='black' url="https://linkedin.com" />
                    <SocialIcon bgColor='black' url="https://facebook.com" />
                </div>
                <div className='text-black text-3xl text-center pt-9 '>GatherGo</div>
                <div className='text-black md:block hidden'>Home Profile</div>
                <div className='text-black pe-3.5 block md:hidden pt-9'><Hamburger toggled={isOpen} toggle={setOpen} /></div>
            </div>
            {isOpen && <div className='text-black text-end p-7 md:hidden'>{items.map((item) => <p className=' bg-gray-500 m-2 p-5 rounded-3xl hover:bg-green-300 text-xl'>{item.text}</p>)}</div>}
        </div>

    )
}

export default Header
