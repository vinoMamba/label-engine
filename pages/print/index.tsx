import Image from "next/image"
import imgUrl from "../../public/print.png"

export default function Print() {
  const printLabel = () => { }
  return (
    <main className="h-screen w-screen pt-50 flex flex-col items-center">
      <Image src={imgUrl} alt="" />
      <p>请使用Chrome浏览器，以获得最佳打印效果</p>
      <div className="mt-16 flex justify-around">
        <button className="rounded-4 text-16 m-4 px-32 py-8 cursor-pointer text-white bg-#48a5ff" onClick={printLabel}>打印</button>
        <button className="rounded-4 text-16 m-4 px-32 py-8 cursor-pointer text-white bg-#48a5ff">关闭</button>
      </div>
    </main>
  )
}
