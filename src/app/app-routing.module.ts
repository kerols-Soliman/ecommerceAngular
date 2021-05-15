import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { EditProductComponent } from './edit-product/edit-product.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

import { ShowCategoryComponent } from './show-category/show-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CartComponent } from './cart/cart.component';
import { LogInComponent } from './log-in/log-in.component';
import { Regist2Component } from './regist/regist.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { OrderComponent } from './order/order.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './Auth/auth.guard';
import { ProductSeachComponent } from './product-seach/product-seach.component';

const routes: Routes = [
  {path:"MyOrders",component:OrderComponent,canActivate:[AuthGuard]},
  { path:'', redirectTo: '/home', pathMatch: 'full'},
  { path:"home", component: HomeComponent },
  {path:"LogIn",component:LogInComponent},
  {path:"Product/edit",component:EditProductComponent,canActivate:[AuthGuard],data:{roles:['Admin']}},
  {path:"EditCategory/:id",component:EditCategoryComponent,canActivate:[AuthGuard],data:{roles:['Admin']}},
  {path:'productDetails/:id',component:ProductDetailsComponent},
  {path:'Category',component:ShowCategoryComponent},
  {path:'createCategory',component:CreateCategoryComponent,canActivate:[AuthGuard],data:{roles:['Admin']}},
  {path:'createProduct',component:CreateProductComponent,canActivate:[AuthGuard],data:{roles:['Admin']}},
  {path:'regist',component:Regist2Component},
  {path:'cart',component:CartComponent,canActivate:[AuthGuard]},
  {path:'editProfile',component:ProfileEditComponent,canActivate:[AuthGuard]},
  {path:'search/:name',component:ProductSeachComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
