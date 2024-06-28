import { Avatar, Badge, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React from 'react'
import { pink } from '@mui/material/colors';
import './NavBar.css'

export const NavBar = () => {
  return (
    <div className='px-5 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between'>
        <div className='lg:mr-10 cursor-pointer flex items-center'>
          <li className='logo font-semibold text-gray-300 text-2xl'>food</li>
      </div>
      <div
      className='flex items-center space-x-2 lg:space-x-10'>
        <div className=''>
          <IconButton>
            <SearchIcon sx={{fontSize:"1.5rem"}}></SearchIcon>
          </IconButton>
        </div>
        <div className=''>
          <Avatar sx={{bgcolor:"white", color:pink.A400}}>A</Avatar>
        </div>
        <div className=''>
          <IconButton>
            <Badge color='primary' badgeContent={6}>
            <ShoppingCartIcon sx={{fontSize:"1.5rem"}}></ShoppingCartIcon>
            </Badge>
          </IconButton>
        </div>
      </div>
    </div>
  )
}
