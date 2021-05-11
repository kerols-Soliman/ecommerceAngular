import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShowCategoryComponent } from './show-category/show-category.component';

const routes: Routes = [
  {path:'productDetails/:id',component:ProductDetailsComponent},
  {path:'Category',component:ShowCategoryComponent},
  {path:'createCategory',component:CreateCategoryComponent},
  {path:'createProduct',component:CreateProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
