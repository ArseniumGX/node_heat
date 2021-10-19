import { serverHttp } from './app'

const port = process.env.PORT || 3001

serverHttp.listen(port, () => console.log(`Server is running!`))