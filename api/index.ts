export const getFieldList = (url: string | undefined, auth: string | undefined) => fetch(`${url}/upms/sys_field/label_field_list`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${auth}`
  }
})
