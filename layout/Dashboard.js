import React from 'react'
import Sidebar from '../components/Dashboard/SideBar'

export default function Dashboard({children}) {
  return (
    <div className="flex flex-row">
        <Sidebar />
        <div className="w-full m-2 p-4 sm:m-0 sm:p-0">
            {children}
        </div>
    </div>
  )
}
