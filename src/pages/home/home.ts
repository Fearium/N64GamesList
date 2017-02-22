/*  Created: February 21, 2017
    N64 Game Collection List
    Jesse Baril
    200226521
    This is the logic for the Game Collection list app */
import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  listGames: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, 
  af: AngularFire, public actionSheetCtrl: ActionSheetController) {
    this.listGames = af.database.list('/gameList');
  }

  /*addGame
    This method activates a popup for the user 
    to add a new game to the list */
  addGame(){    
    let prompt = this.alertCtrl.create({
    title: 'N64 Game',
    message: "Add a new N64 Game to the list.",
    inputs: [
      {
        name: 'game',
        placeholder: 'Name'
      },
    ],
    buttons: [
       {
         text: 'Cancel',
         handler: data => {
           console.log('Cancel clicked');
         }
       },
       {
         text: 'Add',
         handler: data => {
           this.listGames.push({
             game: data.game,
             done: false
           });
         }
       }
     ]
   });
   prompt.present();
   }
  /*removeGame
    This method removes the selected game from the games list */
  removeGame(gameId: string){
    this.listGames.remove(gameId);
  }
  /*updateGame
    This method activates a popup for the user
    to edit the details of a game */
  updateGame(gameId, gameName){
    let prompt = this.alertCtrl.create({
      title: 'Name of Game',
      message: "Alter the name of this N64 Game.",
      inputs: [
        {
          name: 'game',
          placeholder: 'Name',
          value: gameName
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => {
            this.listGames.update(gameId, {
              game: data.game
            });
          }
        }
      ]
    });
    prompt.present();
  }
  /*This method switches a game from owned 
    to wanted or vice versa.*/
  switchComplete(gameId, gameOwned){
    if(gameOwned == true){
      this.listGames.update(gameId, {
        done: false
      });
    }
    if(gameOwned == false){
      this.listGames.update(gameId, {
        done: true
      });
    }
  }
}
