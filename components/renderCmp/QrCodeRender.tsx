import { FC } from 'react'
import { QRCode } from 'antd'

type Props = {
  width: number
  height: number
}

export const QrCodeRender: FC<Props> = (props) => {
  return (
    <QRCode value="https://ant.design/" size={props.width || 150} />
  )
}
