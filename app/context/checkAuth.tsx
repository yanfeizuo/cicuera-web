'use client'
import React, { ReactNode, useEffect } from 'react'
import { fetchWithAuth } from '../utils/api'
import { usePathname, useRouter } from 'next/navigation'
import { useUserStore } from '../store/userStore'

const CheckAuth = ({ children }: { children: ReactNode}) => {

  const pathname = usePathname()

  const router = useRouter()
  
  const setUserData = useUserStore(state => state.setUserData)

  useEffect(() => {
    
    const checkAuth = async () => {
      console.log('pathname', pathname)
      const checkRes = await fetchWithAuth('user/checkAuth')
      const checkJson = await checkRes.json()
      if (checkJson.error) {
        if (!['/', '/login'].includes(pathname)) {
          router.push('/')
        }
      } else {
        const {id, type, name, avatar} = checkJson.results
        setUserData(id, type, name, avatar)
        if (pathname === '/') {
          router.push('/dashboard')
        }
      }
    }

    checkAuth()

    return () => {}
  }, [pathname, router, setUserData])
  
  return <>{children}</>
}

export default CheckAuth