'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
// import Loading from '@/app/loading'
import * as z from 'zod'
import type { Database } from '@/lib/database.types'
// type Schema = z.infer<typeof schema>

const Login = () => {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()
  console.log(supabase);
  
	return (
		<div></div>
	)
}

export default Login

