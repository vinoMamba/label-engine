import Image from "next/image"

import imgUrl from "../../public/print.png"
import { Button } from "antd"
import { GetServerSideProps } from "next"
import { printLabel } from "@/api"
import { createLabel } from "@/core/print"
import { labelInfo } from "@/types/type"
import { toDataURL } from "qrcode"

type Props = {
  template: string
}

export default function Print(props: Props) {
  function getLoadPromise(iframe: HTMLIFrameElement) {
    const imgList = iframe.contentWindow?.document.querySelectorAll("img");
    if (!imgList) return Promise.resolve();
    if (imgList.length === 0) {
      return Promise.resolve();
    }
    let finishedCount = 0;
    return new Promise<void>((resolve) => {
      function check() {
        finishedCount++;
        if (finishedCount === imgList!.length) {
          resolve();
        }
      }
      imgList.forEach((img) => {
        img.addEventListener("load", check);
        img.addEventListener("error", check);
      });
    });
  }
  const printLabel = async () => {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    iframe.contentWindow?.document.write(props.template);
    await getLoadPromise(iframe);
    iframe.contentWindow?.print();
    document.body.removeChild(iframe);
  }
  return (
    <main className="h-screen w-screen pt-50 flex flex-col items-center">
      <Image src={imgUrl} alt="" />
      <p>请使用Chrome浏览器，以获得最佳打印效果</p>
      <div className="mt-16 flex gap-8" >
        <Button type="primary" onClick={printLabel}>打印</Button>
        <Button>关闭</Button>
      </div>
    </main>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context
  const auth = query.auth as string
  const idsStr = query.ids as string
  const url = process.env.API_URL
  if (!auth || !idsStr) {
    return {
      props: {
        template: ''
      }
    }
  }
  else {
    try {
      const result = await printLabel(url || '', auth, idsStr)
      const { data } = await result.json()
      const type = data.assetLabel.labelType
      const labelList = data.assetInfoList as labelInfo[]
      await Promise.all(labelList.map(async (item) => {
        item.qrCodeUrl = await toDataURL(item.qrCodeUrl || 'https://www.ahdingtalk.com/')
      }))
      const logoUrl = data.logoUrl
      const schemaStr = data.assetLabel.labelField
      const schema = JSON.parse(schemaStr)
      const template = createLabel(type, labelList, logoUrl, schema)
      return {
        props: {
          template
        }
      }
    } catch (error) {
      console.log(error)
      return {
        props: {
          template: ''
        }
      }
    }
  }
}
