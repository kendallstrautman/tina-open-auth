---
to: "<%=subdirectory ? `${subdirectory}/` : ''%>pages/api/create-github-access-token.<%=fileExtension%>"
---
import { createAuthHandler } from 'next-tinacms-github'

export default createAuthHandler(
  process.env.GITHUB_CLIENT_ID<%-fileExtension == 'ts' ? ' || ""' : ''%>,
  process.env.GITHUB_CLIENT_SECRET<%-fileExtension == 'ts' ? ' || ""' : ''%>
)


