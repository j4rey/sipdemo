import { Injectable } from "@angular/core";
import { CreatePhoneRequest } from "./model/request.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class VosDemoServiceService {

  serviceUrl = "";

  constructor(private httpClient: HttpClient) {}

  private getHeaderOptions() {
    let b = btoa("");
    console.log(b);
    return {
      headers: new HttpHeaders({
        
      })
    };
  }
  createPhone(request: CreatePhoneRequest) {
    this.httpClient.post("", request, this.getHeaderOptions());
  }

  GetCustomer() {
    let body = new SwitchDataRequest();
    body.Method = "GetCustomer";
    body.ParamList = JSON.stringify({accounts: ['App-7003619333']});
    console.log(body);
    this.httpClient.post(this.serviceUrl, body, this.getHeaderOptions()).subscribe(
      x => {
        console.log("success");
        console.log(x);
      },
      err => {
        console.log("error");
        console.log(err);
      }
    );
  }
}

export class SwitchDataRequest {
  ParamList: string;
  Method: string;
}
