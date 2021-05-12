import { IProduct } from "./Product";

export interface ICategroy{
    "Id"?:number    
    "Name" :string 
    "products"? : IProduct[]   
}