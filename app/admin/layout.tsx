'use client'

import Sidebar from "../components/Sidebar"

const adminLayout = ({ children }: { children: React.ReactNode })  => {
	return (
		<div className="flex">
      <div>
        <Sidebar/>
      </div>
      <div>{children}</div>
    </div>
	)
}

export default adminLayout

