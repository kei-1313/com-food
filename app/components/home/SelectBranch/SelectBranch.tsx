"use client"

//型定義の仕方

//本社、支店の情報型
interface Office {
  officeName: string;
  position: {
    lat: number;
    lng: number;
  };
}

interface SelectBranchProps {
  offices: Office[];
}

const SelectBranch: React.FC<SelectBranchProps> = ({offices}) => {

  console.log(offices[1].position);
  
	return (
		<div className="max-w-[1200px] mx-auto px-5 mb-20 mt-3 text-right">
      <div className="pl-5">
        <select 
          className="w-48 text-black/70 bg-white px-3 py-2 transition-all cursor-pointer hover:border-blue-600/30 border border-gray-200 rounded-lg outline-blue-600/50 appearance-none invalid:text-black/30">
          {offices.map((office, index) => (
            <option key={index} value={'office' + (index + 1)}>{office.officeName}</option>
          ))}
      </select>
      </div>
    </div>
	)
}

export default SelectBranch

