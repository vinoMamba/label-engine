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
    <div>
      <img src={qrCode} alt="" />
    </div>
  )
}
