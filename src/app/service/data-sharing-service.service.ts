import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingServiceService {

  constructor() { }

  IsCategoryEdited=new BehaviorSubject(false);
  IsProductEdited=new BehaviorSubject(false);

  IsUserLogIn=new BehaviorSubject(false)

  IsSearchInput=new BehaviorSubject("");

  IsCartChanged=new BehaviorSubject(false)

  IsOrderChanged=new BehaviorSubject(false);

  IsFavorietChange=new BehaviorSubject(false);

  IsCategoryNavChanged=new BehaviorSubject(false);

}
