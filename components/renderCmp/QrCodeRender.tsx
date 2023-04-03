import Image from 'next/image'
import { toDataURL } from 'qrcode'
import { useEffect, useState } from 'react'
export const QrCodeRender = () => {
  const [qrCode, setQrCode] = useState('')
  useEffect(() => {
    toDataURL('https://www.baidu.com', {
      errorCorrectionLevel: 'H',
      width: 100,
      margin: 2,
    }).then(
      (url) => {
        setQrCode(url)
      }
    )
  }, [])
  return (
    <div className='h-128 w-128'>
      <Image src={qrCode} alt='qrCode' width={128} height={128} />
    </div>
  )
}
