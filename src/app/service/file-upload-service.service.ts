import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {
  
  constructor( private http:HttpClient) { }

  url : string = apiUrl+"api/fileupload" ; 
  postFile(fileToUpload: File){
    const newUrl = this.url;
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    return this.http
      .post(newUrl, formData);
     
}

//   upload(file):Observable<any> {
  
//     // Create form data
//     const formData = new FormData(); 
      
//     // Store form name as "file" with file data
//     formData.append("file", file, file.name);
      
//     // Make http post request over api
//     // with formData as req
//     return this.http.post(this.baseApiUrl, formData)
// }
}
