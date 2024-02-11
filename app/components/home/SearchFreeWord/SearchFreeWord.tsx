"use client"

import {
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { RefObject } from 'react';

interface SearchFreeWordProps {
  searchFreeBoxRef: RefObject<HTMLInputElement>;
  onKeyDown:(event: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick:() => void;
}

const SearchFreeWord: React.FC<SearchFreeWordProps> = ({onKeyDown, onClick, searchFreeBoxRef}) => { 
	return (
		<div className="relative w-[240px]">
      <input 
        type="text"
        ref={searchFreeBoxRef}
        onKeyDown={onKeyDown}
        className="w-full text-black/70 bg-white px-3 py-2 transition-all cursor-pointer hover:border-blue-600/30 border border-gray-200 rounded-lg outline-blue-600/50 "
        name="" 
        id=""  />
      <MagnifyingGlassIcon width={22} className="absolute top-[10px] right-3 cursor-pointer" onClick={onClick}/>
    </div>
	)
}

export default SearchFreeWord

