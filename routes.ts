import { Router} from 'https://deno.land/x/oak/mod.ts'
import { getProducts, getProduct, addProduct, updateProduct, deleteProduct } from './controllers/products.ts'

const router = new Router()

router.get('/api/v1/products', getProducts)
.get('/api/v1/products/:id', getProduct)
.post('/api/v1/products', addProduct)
.put('/api/v1/products/:id', updateProduct)
.delete('/api/v1/products/:id', deleteProduct)
//.get('/api/v2/products', getProducts);
/* router.get('/api/v1/products',({response}:{response: any})=>{
    response.body = 'Hello world'
}); */
/* router.get('/api/v1/products',({response}:{response: any})=>{
    response.body = 'Hello world'
}); */

export default router;
