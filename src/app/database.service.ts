import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from './artist';


@Injectable({
  providedIn: 'root'
})  //This service provides methods for interacting with the database.

/**
 * 
 * Class DatabaseService
 * 
 */
export class DatabaseService {
  url : string = "https://prog2005.it.scu.edu.au/ArtGalley";  //Remote server address

  /**
   * 
   * DatabaseService Constructor
   * 
   * @param http 
   */
  constructor(private http: HttpClient) { }

  /**
   * 
   * Retrieves artist data from the database.
   * 
   * @returns this.http.get<Artist[]>(this.url)
   */
  getData(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.url);
  }

  /**
   * 
   * Posts artist data to the database.
   * 
   * @param artist 
   * @returns this.http.post<Artist>(this.url, artist)
   */
  postData(artist : Artist): Observable<Artist> {
    return this.http.post<Artist>(this.url, artist);
  }

  /**
   * 
   * Deletes artist data from the database.
   * 
   * @param name 
   * @returns this.http.delete<Artist>(this.url + '/' +name)
   */
  deleteData(name : string): Observable<Artist> {

    return this.http.delete<Artist>(this.url + '/' +name);

  }

  /**
   * 
   * Get one data from the datebase
   * 
   * @param name 
   * @returns this.http.get<Artist[]>(this.url + '/' + name)
   */
  getOneData(name : string): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.url + '/' + name);
  }

  /**
   * 
   * Retrieves a specific artist's data from the database.
   * 
   * @param name 
   * @param artist 
   * @returns this.http.put<Artist>(this.url + '/' + name, artist)
   */
  putData(name : string, artist : Artist): Observable<Artist> {
    return this.http.put<Artist>(this.url + '/' + name, artist);
  }

}
