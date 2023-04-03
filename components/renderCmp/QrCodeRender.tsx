import Image from 'next/image'
import { toDataURL } from 'qrcode'
import { FC, useEffect, useState } from 'react'

type Props = {
  width: number
  height: number
}

export const QrCodeRender: FC<Props> = (props) => {
  const [qrCode, setQrCode] = useState('')
  useEffect(() => {
    toDataURL('https://www.baidu.com', {
      errorCorrectionLevel: 'H',
      width: props.width ?? 100,
      margin: 2,
    }).then(
      (url) => {
        setQrCode(url)
      }
    )
  }, [])
  return (
    <div style={{
      width: `${props.width || 150}px`,
      height: `${props.height || 150}px`,
    }}>
      <Image src={qrCode} alt='qrCode' width={props.width} height={props.width} />
    </div>
  )
}
