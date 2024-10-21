import { Component } from '@angular/core';
import { Artist } from '../artist';
import { DatabaseService } from '../database.service';
import { ModalController } from '@ionic/angular';
import { AddPage } from '../add/add.page';
import { SearchPage } from '../search/search.page';
import { EditPage } from '../edit/edit.page';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

/**
 * 
 * Class Tab2Page
 * 
 */
export class Tab2Page {
  artistData: Artist[] = [];  //artistData array
  errorMessage: string = '';  //Error message string.
  deleteText: string = '';  //deleteText string
  alertButtons2 = ['Continue'];

  /**
   * 
   * Tab2Page constructor
   * 
   * @param database 
   * @param modalController 
   * @param alertController 
   */
  constructor(private database: DatabaseService, private modalController: ModalController, private alertController: AlertController) { }

  /**
   * 
   * Retrieve all artist data from the database.
   * 
   */
  getAllArtist(): void {
    this.database.getData().subscribe({
      next: (artist: Artist[]) => { this.artistData = artist; },
      error: (err: any) => { this.errorMessage = "Error: " + err.status; }
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
   * Open the add page
   * 
   *  @returns await modal.present()
   */
  async openAddPage(): Promise<void> {
    const modal = await this.modalController.create({
      component: AddPage
    });
    return await modal.present();
  }

  /**
   * 
   * Open the search page
   * 
   * @returns await modal.present()
   */
  async openSearchPage(): Promise<void> {
    const modal = await this.modalController.create({
      component: SearchPage
    });
    return await modal.present();
  }

  /**
   * 
   * Open the edit page
   * 
   * @param current 
   * @returns await modal.present()
   */
  async openEditPage(current: Artist): Promise<void> {
    const modal = await this.modalController.create({
      component: EditPage,
      componentProps: {
        artist : current
      }
    });
    return await modal.present();
  }


  /**
   * 
   * Delete data method
   * 
   * @param str 
   */
  onDelete(str: string) {
    this.database.deleteData(str).subscribe({
      next: () => {
        this.errorMessage = "Successfully deleted.";
      },
      error: (err: any) => { this.errorMessage = "Error: " + err.status; }
    })
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
  

  /**
   * 
   * Delete warning box
   * 
   * @param str 
   */
  async onDeleteClick(str: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Are you sure you want to delete it?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel deletion operation');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.onDelete(str);
          }
        }
      ]
    });

    await alert.present();
  }


}
