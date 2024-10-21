import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Artist } from '../artist';
import { Gender } from '../gender.enum';
import { ArtworkType } from '../artworkType.enum';
import { AlertController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})

/**
 * 
 * Class EditPage
 * 
 */
export class EditPage implements OnInit {
  @Input() artist: Artist;


  artistData: Artist[] = [];
  errorMessage3: string = '';
  nameText: string = '';
  deleteText: string = '';
  message3: string = '';
  message2: string = '';
  message1: string = '';
  message0: string = '';
  alertButtons6 = ['Continue'];



  /**
   * 
   * EditPage Constructor
   * 
   * @param database 
   * @param modalController 
   * @param route 
   * @param alertController 
   */
  constructor(private database: DatabaseService, private modalController: ModalController, private route: ActivatedRoute, private alertController: AlertController) {
    this.artist = {
      artist_id: 0,
      name: '',
      dob: new Date(),
      gender: Gender.Unspecified,
      artwork_type: ArtworkType.painting,
      contact_info: '',
      exhibition_date: new Date(),
      special_notes: '',
      is_featured_artist: 1 ? true : false,

    }

  }






  ngOnInit() { }

  /**
   * 
   * Cancel function
   * 
   */
  dismiss(): void {
    this.modalController.dismiss();
  }


  /**
   * 
   * Edit function
   *  
   */
  updateData(): void {


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


    //Calling the putDate() function from public service
    this.database.putData(this.artist.name, this.artist).subscribe({
      next: (artist: Artist) => { this.message0 = 'Edit Successfully!' },
      error: (err: any) => { console.log("Error: " + err.status); }
    });
  }








  /**
   * 
   * Delete function
   * 
   */
  onDelete(): void {
    this.database.deleteData(this.deleteText).subscribe({
      next: () => {
        this.errorMessage3 = "Successfully deleted.";
      },
      error: (err: any) => { this.errorMessage3 = "Error: " + err.status; }
    })
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
