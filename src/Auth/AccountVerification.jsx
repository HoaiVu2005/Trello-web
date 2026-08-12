/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { verifyUserAPI } from '~/apis'
import LoadingPageSpinner from '~/components/Loading/LoadingPageSpinner'

function AccountVerification() {
  let [searchPrams] = useSearchParams()
  // const email = searchPrams.get('email')
  // const token = searchPrams.get('token')
  const { email, token } = Object.fromEntries([...searchPrams])
  const [verified, setVerified] = useState(false)
  // goi API de verify tai khoan
  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token }).then(() => {
        setVerified(true)
      })
    }
  }, [email, token])

  if (!email || !token) {
    return <Navigate to="/404" />
  }
  if (!verified) {
    return <LoadingPageSpinner caption="Verifying your account..." />
  }
  return <Navigate to={`/login?verifiedEmail=${email}`} />
}

export default AccountVerification
