"use client"

import {
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

const SearchFreeWord = () => { 
	return (
		<div className="relative w-[240px]">
      <input 
        type="text"
        className="w-full text-black/70 bg-white px-3 py-2 transition-all cursor-pointer hover:border-blue-600/30 border border-gray-200 rounded-lg outline-blue-600/50 "
        name="" 
        id=""  />
      <MagnifyingGlassIcon width={22} className="absolute top-[10px] right-3 cursor-pointer" />
    </div>
	)
}

export default SearchFreeWord

