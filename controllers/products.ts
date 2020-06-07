import { v4 } from 'https://deno.land/std/uuid/mod.ts'
import {Product} from '../types.ts'



let products = [
    {
        id:"1",
        name:"Product One",
        description: "This is product one",
        price: 29.99,
    },
    {
        id:"2",
        name:"Product Two",
        description: "This is product two",
        price: 39.99,
    },
    {
        id:"3",
        name:"Product Three",
        description: "This is product three",
        price: 59.99,
    }
]



// @desc Get all products
// @route GET /api/v1/product/:id
const getProducts = ({ response}:{response: any}) =>{
    response.body = {
        success: true,
        data: products
    }
}
// @desc Get all products
// @route GET /api/v1/products
const getProduct = ({ params, response}:{
    params:{
        id: string
    },
    response: any
}) =>{
    const product: Product | undefined = products.find(p => p.id === params.id)
    if(product){
        response.status = 200
        response.body = {
            success: true,
            data: product
        }
    }else{
        response.status = 404
        response.body = {
            success: false,
            msg: 'No product found'
        }
    }
}

// @desc Add product
// @route POST /api/v1/product/:id
const addProduct  = async ({ request, response}:{request:any, response: any}) =>{
    var body = await request.body();
    if(!request.hasBody){
        response.status = 404
        response.body = {
            success:false,
            msg:'No data'
        }
    }else{
        var product: Product = body.value

        const productexiste: Product | undefined = products.find(p => p.name === product.name)
        if(productexiste){
            response.status = 200
            response.body = {
                success:false,
                msg:'this product already exists'
            }
        }else{
            product.id = String(v4.generate())
            //console.log(JSON.stringify(product))
            products.push(product)
            response.status = 201
            response.body = {
                data:product,
                success:true
            }
        }
    }
}

// @desc Update product
// @route PUT /api/v1/product/:id
const updateProduct = async ({ params, request, response}:{params:{id: string}, request: any,response: any}) =>{
    const product: Product | undefined = products.find(p => p.id === params.id)
    if(product){
        var body = await request.body();
        const updateData : {name?:string; description?:string; price?:number} = body.value
        products = products.map(p=>p.id === params.id ?{...p,... updateData}:p)
        response.status = 201
        response.body = {
            success: true,
            data: products
        }
    }else{
        response.status = 404
        response.body = {
            success: false,
            msg: 'No product found'
        }
    }
}

// @desc Delete product
// @route DELETE /api/v1/product/:id
const deleteProduct = ({ params, response}:{
    params:{
        id: string
    },
    response: any
}) =>{
    const product: Product | undefined = products.find(p => p.id === params.id)
    if(product){
        response.status = 201
        products = products.filter(p=>p.id !== params.id)
        response.body = {
            success: true,
            msg:"Product remove",
            data: products
        }
    }else{
        response.status = 404
        response.body = {
            success: false,
            msg: 'No product found'
        }
    }
}

export { getProducts , getProduct, addProduct, updateProduct, deleteProduct}