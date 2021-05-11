import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  {path:'productDetails/:id',component:ProductDetailsComponent},
  {path:'createProduct',component:CreateProductComponent},
  {path:'createCategory',component:CreateCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
