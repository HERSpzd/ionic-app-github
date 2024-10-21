import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Artist } from '../artist';
import { Gender } from '../gender.enum';
import { ArtworkType } from '../artworkType.enum';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})

/**
 * 
 * Class AddPage
 * 
 */
export class AddPage implements OnInit {
  artist: Artist;
  message: string = '';
  message1: string = '';
  message2: string = '';
  message3: string = '';
  message4: string = '';
  alertButtons5 = ['Continue'];


  /**
   * 
   * AddPage Constructor
   * 
   * @param database 
   * @param modalController 
   * @param alertController 
   */
  constructor(private database: DatabaseService, private modalController: ModalController, private alertController: AlertController) {
    this.artist = {
      artist_id: null,
      name: '',
      dob: new Date(),
      gender: Gender.Unspecified,
      artwork_type: ArtworkType.painting,
      contact_info: '',
      exhibition_date: new Date(),
      special_notes: '',
      is_featured_artist: true,

    }
  }

  ngOnInit() {
  }



  /**
   * 
   * Add function
   * 
   *  
   */
  onAdd(): void {


    //Check if artist_id is empty
    if (this.artist.artist_id === null) {
      this.message1 = 'Error: Please enter artist ID';
      return;
    }





    //Check if name is empty
    if (this.artist.name === '') {
      this.message3 = 'Error: Please enter name';
      return;
    }


    //Check if contact_info is empty
    if (this.artist.contact_info === '') {
      this.message2 = 'Error: Please enter contact info';
      return;
    }



    this.database.postData(this.artist).subscribe({
      next: () => { this.message = 'Added successfully!'; },
      error: (err: any) => { this.message = "Error: " + err.status; }
    })
    this.modalController.dismiss();
  }

  dismiss(): void {
    this.modalController.dismiss();
  }


  //calendar


  /**
   * 
   * Open DOB calendar
   * 
   */
  async openDatePicker() {
    const alert = await this.alertController.create({
      header: 'Select date',
      message: 'Selct DOB',
      inputs: [
        {
          name: 'dob',
          type: 'date',
          value: this.artist.dob
        }
      ],
      buttons: [
        {
          text: 'cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: (data) => {
            this.artist.dob = data.dob;
          }
        }
      ]
    });

    await alert.present();
  }


  /**
   * 
   * Open Exhibition Date calendar
   * 
   */
  async openDatePicker2() {
    const alert = await this.alertController.create({
      header: 'Select date',
      message: 'Selct Exhibition Date',
      inputs: [
        {
          name: 'exhibition_date',
          type: 'date',
          value: this.artist.exhibition_date
        }
      ],
      buttons: [
        {
          text: 'cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: (data) => {
            this.artist.exhibition_date = data.exhibition_date;
          }
        }
      ]
    });

    await alert.present();
  }


}
