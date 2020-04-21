---
to: "<%=subdirectory ? `${subdirectory}/` : ''%>pages/api/proxy-github.<%=fileExtension%>"
---
import { apiProxy } from 'next-tinacms-github'

export default apiProxy
