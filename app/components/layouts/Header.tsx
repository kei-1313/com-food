'use client'

import Link from "next/link"

const Header = () => { 
	return (
		<div>
      <header className="shadow-lg shadow-gray-100">
        <div className="py-5 px-5 container max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-xl cursor-pointer">
            com-food
          </Link>

          <ul>
            <li>
              <Link href="/contact/">お問い合わせ</Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
	)
}

export default Header

