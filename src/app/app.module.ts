import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CreateProductComponent } from './create-product/create-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { CreateCategoryComponent } from './create-category/create-category.component';
import { ShowCategoryComponent } from './show-category/show-category.component';
import { Regist2Component } from './regist/regist.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CartComponent } from './cart/cart.component';
import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { ProductsOfCategoryComponent } from './products-of-category/products-of-category.component';

import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { OrderComponent } from './order/order.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './Auth/auth.guard';
import { FaviorateProductsComponent } from './faviorate-products/faviorate-products.component';
import { DataSharingServiceService } from './service/data-sharing-service.service';
import { ProductSeachComponent } from './product-seach/product-seach.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    SearchComponent,
    FooterComponent,
    EditProductComponent,
    ProductDetailsComponent,
    CreateProductComponent,
    CreateCategoryComponent,
    ShowCategoryComponent,
    EditCategoryComponent,
    LogInComponent,
    HomeComponent,
    Regist2Component,
    EditCategoryComponent,
    ProductsOfCategoryComponent,

    CartComponent,
    ProfileEditComponent,
    OrderComponent,
    FaviorateProductsComponent,
    NotFoundComponent,
    ProductSeachComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [AuthGuard,DataSharingServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }


