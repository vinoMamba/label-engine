import { printLabel } from "@/api";
import { Schema } from "@/types/type";
import { GetServerSideProps } from "next";
import { FC } from "react";
import { PrintLabel } from "@/components/print/PrintLabel"
type Props = {
  schema: Schema
}
const Label: FC<Props> = (props) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <PrintLabel schema={props.schema} />
    </div>
  )
}
export default Label

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { labelId, auth } = context.query;
  const url = process.env.API_URL
  if (!auth || !labelId) {
    return {
      props: {
      }
    }
  } else {
    try {
      const result = await printLabel(url || '', auth as string, labelId as string)
      const { data } = await result.json()
      const schemaStr = data.assetLabel.labelField
      const schema = JSON.parse(schemaStr) as Schema
      return {
        props: {
          schema
        }
      }
    } catch (error) {
      return {
        props: {
        }
      }

    }
  }
};
