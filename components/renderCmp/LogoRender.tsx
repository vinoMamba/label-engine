import Image from "next/image"
import logo from "../../public/logo.png"
export const LogoRender = () => {
  return (
    <Image src={logo} alt="logo" width={64} height={24} />
  )
}
