import { FC } from "react"
import logo from "../public/logo-icon.svg"
import qrCode from "../public/qr-code-icon.svg"
import field from "../public/field-icon.svg"
import customText from "../public/custom-field-icon.svg"
import Image from "next/image"

type Props = {
  icon: string
  children: React.ReactNode
}

const Container: FC<Props> = (props) => {
  return (
    <section className="border border-solid border-#DDDDDD rounded-8 p-8 my-8 overflow-hidden cursor-pointer text-#333333">
      <div className="flex items-center">
        <Image src={props.icon} width={24} alt="logo" />
        <span className="ml-2 whitespace-nowrap">{props.children}</span>
      </div>
    </section>
  )
}

export const QrCodePreview = () => <Container icon={qrCode}>资产二维码</Container>;
export const FieldPreview = () => <Container icon={field}>字段名称：XXXX</Container>;
export const LogoPreview = () => <Container icon={logo}>公司Logo</Container>;
export const CustomTextPreview = () => <Container icon={customText}>自定义文本框</Container>;
