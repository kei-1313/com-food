"use client"

import { RefObject } from "react";

//型定義の仕方

//本社、支店の情報型
interface Office {
  officeName: string;
  position: {
    lat: string;
    lng: string;
  };
}

interface SelectBranchProps {
  offices: Office[];
  officeRef: RefObject<HTMLSelectElement>;
  onChange:(event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBranch: React.FC<SelectBranchProps> = ({offices, officeRef, onChange}) => {
  
	return (
		<div className="max-w-[1200px] mx-auto px-5 mb-20 mt-3 text-right">
      <div className="pl-5 max-sm:pl-0">
        <select
          ref={officeRef}
          onChange={onChange}
          className="w-48 max-sm:w-full  text-black/70 bg-white px-3 py-2 transition-all cursor-pointer hover:border-blue-600/30 border border-gray-200 rounded-lg outline-blue-600/50 appearance-none invalid:text-black/30">
          {offices.map((office, index) => (
            <option key={index} value={office.officeName}>{office.officeName}</option>
          ))}
      </select>
      </div>
    </div>
	)
}

export default SelectBranch

