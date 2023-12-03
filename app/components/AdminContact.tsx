"use client"

import {
  MagnifyingGlassIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import useContactStore from '@/store/contact'
import type { Database } from '@/lib/database.types'
import FormattedDate from './FormattedDate'
type AdminContactType = Database['public']['Tables']['contacts']['Row']
type AdminContact =  AdminContactType[]

const AdminContact = ({items}: {items: AdminContact | null}) => {
  const searchBox = useRef<HTMLInputElement>(null)
  const [activeItems, setActiveItems] = useState(Array(items?.length).fill(false));

  const focusSearchBox = () => {
    searchBox.current?.focus();
  }

  const changeCheckedStatus = (index: Number) => {
    setActiveItems(prev =>
      prev.map((item, itemIndex) => (itemIndex === index ? !item: item))
    )
  }

  const changeAllCheckedStatus = () => {
    setActiveItems(prev => prev.map(item => !item))
  }

	return (
		<div className="py-3 w-full pl-[260px]">
      <h2 className="text-base text-black font-bold pb-3 mb-3 px-4">お問い合わせ</h2>
      <div className="pb-4 px-4">
        <div className="relative w-[240px]">
          <input 
            type="text"
            ref={searchBox}
            className="w-full py-2 pl-8 pr-2 rounded bg-lightPurple  focus:border-activePurple focus:border-[2px] focus:outline-none cursor-pointer"
            name="" 
            id=""  />
            <MagnifyingGlassIcon width={22} className="absolute top-[10px] left-2 cursor-pointer" onClick={focusSearchBox}/>
        </div>
      </div>
      <div>
        <div className="pb-11 pt-2 px-4 border-t border-[#f4f4fa]">
          <p className="text-sm text-noActivePurple">1〜9件目を表示 / 全9件</p>
        </div>

        <div className="py-2 px-4 overflow-x-scroll relative w-full">
          <table className="w-full min-w-[1180px] border-collapse">
            <thead className="border-b border-[#f4f4fa]">
              <tr>
                <th className="py-4 px-6">
                  <input 
                    type="checkbox"
                    className=""
                    onChange={changeAllCheckedStatus}
                    name="" 
                    id=""
                  />
                </th>
                <th className="text-sm text-attentionPurple font-bold py-4 px-4">ID</th>
                <th className="text-sm text-attentionPurple font-bold py-4 px-5">日付</th>
                <th className="text-sm text-attentionPurple font-bold py-4 px-5">名前</th>
                <th className="text-sm text-attentionPurple font-bold py-4 px-5">メールアドレス</th>
                <th className="text-sm text-attentionPurple font-bold py-4 px-5">タイトル</th>
                <th className="text-sm text-attentionPurple font-bold py-4 px-5">お問い合わせ内容</th>
                <th className="text-sm text-attentionPurple font-bold py-4 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => (
                <tr className={activeItems[index] ? "bg-currentPurple": '' + "border-b border-[#f4f4fa]"} key={item.id}>
                  <td className="py-4 px-6">
                    <div>
                    <input 
                      type="checkbox"
                      className=""
                      onChange={() => changeCheckedStatus(index)}
                      checked={activeItems[index]}
                      name=""
                      id=""
                    />
                    </div>
                  </td>
                  <td className="text-sm py-4 px-4">{ item.id }</td>
                  <td className="text-sm py-4 px-5 whitespace-nowrap"><FormattedDate dateString={item.created_at}/></td>
                  <td className="text-sm py-4 px-5 whitespace-nowrap">{ item.name }</td>
                  <td className="text-sm py-4 px-5 whitespace-nowrap">{ item.email }</td>
                  <td className="text-sm py-4 px-5">{ item.title }</td>
                  <td className="text-sm py-4 px-5">{ item.description }</td>
                  <td className="text-sm py-4 px-4 cursor-pointer"><TrashIcon width={22}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
	)
}

export default AdminContact

