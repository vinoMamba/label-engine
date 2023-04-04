import { Schema } from "@/types/type"

const createHeaders = (auth: string | undefined) => {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${auth}`)
  return headers
}
export const getFieldList = (url: string, auth: string) => fetch(`${url}/upms/sys_field/label_field_list`, {
  method: 'GET',
  headers: createHeaders(auth)
})

export const getLabelInfo = (url: string, auth: string) => fetch(`${url}/asset/label/label_info/?selectedLabel=4`, {
  method: 'GET',
  headers: createHeaders(auth)
})

export const updateLabelInfo = (url: string, auth: string, schema: Schema) => {
  const data = {
    labelType: '4',
    labelField: JSON.stringify(schema),
    fontSize: '14',
    labelWidth: '100',
    labelHeight: '100',
    showField: '0'
  }
  return fetch(`${url}/asset/label`, {
    method: 'POST',
    headers: createHeaders(auth),
    body: JSON.stringify(data)
  })
}

export const printLabel = (url: string, auth: string, ids: string) => fetch(`${url}/asset/label/export/?downloadLogoIds=${ids}&downloadType=1`, {
  method: 'GET',
  headers: createHeaders(auth)
})
