import { Component, OnInit } from '@angular/core';
import { Artist } from '../artist';
import { DatabaseService } from '../database.service';
import { ModalController } from '@ionic/angular';




@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

/**
 * 
 * Class SearchPage
 * 
 */
export class SearchPage implements OnInit {
  artistData2: Artist[] = [];
  errorMessage2: string = '';
  searchText: string = '';
  alertButtons7 = ['Continue'];

  /**
   * 
   * SearchPage Constructor
   * 
   * @param database 
   * @param modalController 
   */
  constructor(private database : DatabaseService, private modalController: ModalController) { }

  ngOnInit() {
  }

  /**
   * 
   * Search function
   * 
   */
  search(): void {
    this.database.getOneData(this.searchText).subscribe({
      next: (artist : Artist[]) => { this.artistData2 = artist; },
      error: (err: any) => { this.errorMessage2 = "Error: " + err.status; }
    })
    
  }

  /**
   * 
   * Back to all artists page
   * 
   */
  dismiss(): void {
    this.modalController.dismiss();
  }

  /**
   * 
   * Convert to Yes and No
   * 
   * @param bool 
   * @returns 
   */
  switchStatement(bool: boolean): string {
    switch (bool) {
      case true:
        return "Yes";
      default:
        return "No";
    }
  }

}
