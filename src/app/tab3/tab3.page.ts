import { Component } from '@angular/core';
import { Artist } from '../artist';
import { DatabaseService } from '../database.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

/**
 * 
 * Class Tab3Page
 * 
 */
export class Tab3Page {
  artistData: Artist[] = [];
  errorMessage4: string = '';
  alertButtons3 = ['Continue'];

  /**
   * 
   * Tab3Page Constructor
   * 
   * @param database 
   * @param alertController 
   */
  constructor(private database: DatabaseService, private alertController: AlertController) { }

  /**
   * 
   * Retrieve all artist information from the server
   * Note:Filter featured artists in HTML
   * 
   */
  getAllArtist(): void {
    this.database.getData().subscribe({
      next: (artist: Artist[]) => { this.artistData = artist; },
      error: (err: any) => { this.errorMessage4 = "Error: " + err.status; }
    })
  }

  /**
   * 
   * What function to execute after opening this page
   * 
   */
  ionViewWillEnter() {
    this.getAllArtist();
  }

  /**
   * 
   * Checks if the given number is equal to 1.
   * 
   * @param num 
   * @returns num === 1
   */
  isFeatured(num: number): boolean {
    return num === 1;
  }

  /**
   * 
   * Convert true to Yes and false to No for whether it is a featured artist
   * 
   * @param bool 
   * @returns 'Yes' or 'No'
   */
  switchStatement(bool: boolean): string {
    if (bool) {
      return "Yes";
    } else {
      return "No";
    }
  }



}
