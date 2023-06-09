import { FC } from "react"

type Props = {
  width: number
  height: number
  url: string
}

export const LogoRender: FC<Props> = (props) => {
  const url = props.url
  return (
    <img src={url} alt="" width={props.width || 96} height={props.height || 32} />
  )
}
