import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

/**
 * 
 * Class Tab1Page
 * 
 */
export class Tab1Page {

  alertButtons1 = ['Continue'];

  /**
   * 
   * Tab1Page class constructor
   * 
   * @param alertController 
   */
  constructor( private alertController: AlertController) {}

}
