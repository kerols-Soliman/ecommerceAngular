import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingServiceService } from '../service/data-sharing-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private route:Router,private dataSharedService:DataSharingServiceService) { }

  ngOnInit(): void {
  }

  search(seachInput){
    this.route.navigate(['/search',seachInput])
      
    this.dataSharedService.IsSearchInput.next(seachInput)
    
    
  }

}
