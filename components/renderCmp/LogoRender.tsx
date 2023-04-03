import Image from "next/image"
import logo from "../../public/logo.png"
import { FC } from "react"

type Props = {
  width: number
  height: number
}

export const LogoRender: FC<Props> = (props) => {
  return (
    <Image src={logo} alt="logo" width={props.width || 96} height={props.height || 32} />
  )
}
