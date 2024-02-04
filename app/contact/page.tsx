"use client"

import UserContact from '@/app/components/UserContact'
import { useState } from 'react';

import { useForm, FormProvider } from "react-hook-form";
import { useRouter, useSearchParams } from 'next/navigation'
import UserContactConfirm from '../components/UserContactConfirm';
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Header from '../components/layouts/Header';

type Schema = z.infer<typeof schema>

// 入力データの検証ルールを定義
const schema = z.object({
	name: z.string(),
  email: z.string().email({ message: 'メールアドレスの形式ではありません。' }),
	subject: z.string(),
	content: z.string().min(1,  { message: '一文字以上で入力してください' }).max(400, { message: '400文字以内で入力してください' })
})


const UserContactPage = () => {
  const searchParams = useSearchParams();
  const isConfirm = searchParams.get("confirm")
  
  const methods = useForm<Schema>({
    //初期値
    defaultValues: {name: '', email: '', subject: '', content: ''},
    //入力値の検証
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  return(
    <div>
      <Header/>
      <FormProvider {...methods}>
        {!isConfirm ? (
          <UserContact />
        ) : (
          <UserContactConfirm />
        )}

      </FormProvider>

    </div>
  )
}

export default UserContactPage