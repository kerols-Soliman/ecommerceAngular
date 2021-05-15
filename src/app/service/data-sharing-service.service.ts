import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingServiceService {

  constructor() { }

  IsCategoryEdited=new BehaviorSubject(false);

  IsUserLogIn=new BehaviorSubject(false)
}
