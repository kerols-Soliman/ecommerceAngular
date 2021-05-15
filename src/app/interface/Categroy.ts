import { IProduct } from "./Product";

export interface ICategroy{
    "Id"?:number,
    "Name" :string,
    "Image":string  
}

export interface ICategroyOfProduct{
    "Id"?:number,
    "Name" :string,
    "Image":string,
    "Products":IProduct[]
}