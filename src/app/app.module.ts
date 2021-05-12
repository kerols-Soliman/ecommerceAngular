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
<<<<<<< HEAD
import { HomeComponent } from './home/home.component';
=======
import { NgxSpinnerModule } from 'ngx-spinner';

import { CreateCategoryComponent } from './create-category/create-category.component';
import { ShowCategoryComponent } from './show-category/show-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
>>>>>>> df7c22c60411981ce91a08d5a831d4544f30f877


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
<<<<<<< HEAD
    HomeComponent
=======
    CreateCategoryComponent,
    ShowCategoryComponent,
    EditCategoryComponent
>>>>>>> df7c22c60411981ce91a08d5a831d4544f30f877
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
