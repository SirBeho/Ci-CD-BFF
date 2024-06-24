// src/users/users.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class UsersService {
  constructor(private httpService: HttpService) {}

  getAllUsers(): Observable<any> {
    return this.httpService.get('/users').pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error(error);
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }),
    );
  }

  getUserById(id: string): Observable<any> {
    return this.httpService.get(`/users/${id}`).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error(error);
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }),
    );
  }

  createUser(userData: any): Observable<any> {
    return this.httpService.post('/users', userData).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error(error);
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }),
    );
  }

  updateUser(id: string, userData: any): Observable<any> {
    return this.httpService.put(`/users/${id}`, userData).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error(error);
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }),
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.httpService.delete(`/users/${id}`).pipe(
      map((response) => response.data),
      catchError((error) => {
        console.error(error);
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }),
    );
  }
}
