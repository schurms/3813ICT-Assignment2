import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


// Variables
import { environment} from '../../../environments/environment';


const BACKEND_URL = environment.apiURL;
@Injectable({
  providedIn: 'root'
})
export class ImguploadService {

  constructor(
    private http: HttpClient) { }

  imgupload(fd) {
    return this.http.post<any>(BACKEND_URL + '/api/upload', fd)
  }
}
