"use client"

import { RefObject } from "react";


interface SelectSortProps {
  sortRef: RefObject<HTMLSelectElement>;
  onChange:(event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectSort: React.FC<SelectSortProps> = ({sortRef, onChange}) => {
  
	return (
		<div className="">
      <div className="">
        <select
          ref={sortRef}
          onChange={onChange}
          className="w-48 max-sm:w-full  text-black/70 bg-white px-3 py-2 transition-all cursor-pointer hover:border-blue-600/30 border border-gray-200 rounded-lg outline-blue-600/50 appearance-none invalid:text-black/30">
            <option value="" selected disabled>並び替え</option>
            <option value="評価">評価</option>
            <option value="口コミ">口コミ</option>
            <option value="価格が安い">価格が安い</option>
      </select>
      </div>
    </div>
	)
}

export default SelectSort

