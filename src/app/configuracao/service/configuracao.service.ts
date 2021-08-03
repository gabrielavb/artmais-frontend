import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { buildWebpackBrowser } from '@angular-devkit/build-angular/src/browser';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracaoService {
  public artPlusURL = `${environment.apiURL}`;
  public token = localStorage.getItem('token');

  FOLDER = 'profile_pic/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    return this.http.get(this.artPlusURL + 'v1/User', this.httpOptions);
  }

  getContactInfo(): Observable<any> {
    return this.http.get(this.artPlusURL + 'v1/Contact', this.httpOptions);
  }

  getAddress(): Observable<any> {
    return this.http.get(this.artPlusURL + 'v1/Address', this.httpOptions);
  }

  updateUserInfo(
    name: string,
    username: string,
    userPicture: string,
    birthDate: Date,
    mainPhone: string,
    secundaryPhone: string,
    thirdPhone: string
  ): Observable<object> {
    return this.http.put<object>(
      `${this.artPlusURL}` + 'v1/User/UpdateUserInfo',
      {
        name,
        username,
        userPicture,
        birthDate,
        mainPhone,
        secundaryPhone,
        thirdPhone,
      },
      this.httpOptions
    );
  }

  updatePassword(
    oldPassword: string,
    newPassword: string,
    password: string
  ): Observable<object> {
    return this.http.patch<object>(
      `${this.artPlusURL}` + 'v1/User/UpdateUserPassword',
      { oldPassword, newPassword, password },
      this.httpOptions
    );
  }

  updateDescription(description: string): Observable<object> {
    return this.http.patch<object>(
      `${this.artPlusURL}` + 'v1/User/UpdateUserDescription',
      { description },
      this.httpOptions
    );
  }

  updateContact(
    facebook: string,
    instagram: string,
    twitter: string,
    mainPhone: string,
    secundaryPhone: string,
    thirdPhone: string
  ): Observable<object> {
    return this.http.post<object>(
      `${this.artPlusURL}` + 'v1/Contact/Upsert',
      { facebook, instagram, twitter, mainPhone, secundaryPhone, thirdPhone },
      this.httpOptions
    );
  }

  updateAddress(
    street: string,
    number: number,
    complement: string,
    neighborhood: string,
    zipCode: string
  ): Observable<object> {
    return this.http.post<object>(
      `${this.artPlusURL}` + 'v1/Address/Upsert',
      { street, number, complement, neighborhood, zipCode },
      this.httpOptions
    );
  }

  uploadfile(file: File) {
    const bucket = new S3({
      accessKeyId: 'ASIA4GZ6YP6N46UB3CUX',
      secretAccessKey: 'pep9bBevuyfCY1fkrpnv40MlSeq4HPkbz9//CfMl',
      region: 'us-east-1',
      useAccelerateEndpoint: true,
      signatureVersion: 'v4',
    });

    const params = {
      Bucket: 'artplus-bucket',
      Key: this.FOLDER + file.name,
      Body: file,
    };

    bucket.upload(params, function (err: any, data: any): Observable<object> {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return err;
      }

      console.log('Successfully uploaded file.', data);
      return data;
    });
  }
}
