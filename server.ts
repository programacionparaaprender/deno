import { Application } from 'https://deno.land/x/oak/mod.ts'

const port = 5000;

const app = new Application()

import router from './routes.ts' 

app.use(router.routes())
app.use(router.allowedMethods())



console.log('Server running on port '+String(port))

await app.listen({ port });
