---
to: "<%=subdirectory ? `${subdirectory}/` : ''%>pages/api/reset-preview.<%=fileExtension%>"
---
<% if  (fileExtension == 'ts') { -%>
export default (_req: any, res: any) => {
  res.clearPreviewData()
  res.status(200).end()
}
<% } else { -%>
export default (req, res) => {
  res.clearPreviewData()
  res.status(200).end()
}
<% } -%>