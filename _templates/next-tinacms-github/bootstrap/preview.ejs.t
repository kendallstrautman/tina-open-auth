---
to: "<%=subdirectory ? `${subdirectory}/` : ''%>pages/api/preview.<%=fileExtension%>"
---
import { previewHandler } from 'next-tinacms-github'

export default previewHandler
