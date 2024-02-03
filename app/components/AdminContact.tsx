"use client"

import {
  MagnifyingGlassIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/lib/database.types'
import FormattedDate from './FormattedDate'
import { useRouter } from 'next/navigation'
type AdminContactType = Database['public']['Tables']['contacts']['Row']
type AdminContact =  AdminContactType[]

const AdminContact = ({items}: {items: AdminContact | null}) => {
  const router = useRouter()
  const searchBox = useRef<HTMLInputElement>(null)
  const allCheckbox = useRef<HTMLInputElement>(null)
  const supabase = createClientComponentClient<Database>()
  const [activeItems, setActiveItems] = useState(Array(items?.length).fill(false));
  const [isAllItemsSelected, setIsAllItemsSelected] = useState(false)
  const [isShowAllDeleteButton, setIsShowAllDeleteButton] = useState(false)
  const [contactItems, setContactItems] = useState(items)

  const focusSearchBox = () => {
    searchBox.current?.focus();
  }

  const changeCheckedStatus = (index: Number) => {
    setActiveItems(prev =>
      prev.map((item, itemIndex) => (itemIndex === index ? !item: item))
    )
  }

  //全件選択
  const changeAllCheckedStatus = () => {
    if(contactItems?.length === 0) {
      return
    }

    setIsAllItemsSelected(!isAllItemsSelected)
    setActiveItems(prev => prev.map(item => !item))
  }

  const showAllDeleteButton = () => {
    setIsShowAllDeleteButton(!isShowAllDeleteButton)
  }

  //全件削除
  const deleteAllItems = async () => {
    const handleDeleteAllResult = window.confirm("本当に全件削除してよろしいですか？")

    if(handleDeleteAllResult) {
      try {
        const { error } = await supabase
          .from("contacts")
          .delete()
          .neq('id', 0)
        const { data } = await supabase
          .from("contacts")
          .select("*")

        setContactItems(data)
      } catch (error) {
        alert(error)
      }
    }
  }

  //クリックすると削除するためのアラートがでる、その後はいを押すと削除される
  const handleDelete = async (id: number) => {
    const handleDeleteResult = window.confirm("本当に削除してよろしいですか？")
    
    if(handleDeleteResult) {
        try {
          const { error } = await supabase
            .from("contacts")
            .delete()
            .eq('id', id)

          const { data } = await supabase
          .from("contacts")
          .select("*")
  
          setContactItems(data)
        } catch (error) {
          alert(error)
        }
      }

    router.refresh()
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
        
        {isAllItemsSelected &&
          <div className='relative'>
            <div className='ml-4'>
              <button onClick={showAllDeleteButton} className='text-sm rounded  py-3 px-4 text-center  text-activePurple w-[10rem] font-bold border-[2px] border-activePurple'>{contactItems?.length}件を選択中</button>
              <span onClick={changeAllCheckedStatus} className='text-sm cursor-pointer inline-block ml-8 text-attentionPurple '>全件選択解除</span>
            </div>
            {isShowAllDeleteButton &&
              <div className='absolute border text-sm border-gray-300 rounded left-4 mt-1 bg-white z-10'>
                <button onClick={deleteAllItems} className='py-4 px-4 flex gap-2'><TrashIcon width={20} />コンテンツを削除する</button>
              </div>
            }
          </div>
        }

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
                    ref={allCheckbox}
                    checked={isAllItemsSelected}
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
              {contactItems?.map((item, index) => (
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
                  <td className="text-sm py-4 px-4 cursor-pointer"><TrashIcon width={22} onClick={() => handleDelete(item.id)}/></td>
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

