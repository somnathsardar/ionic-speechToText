import { Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  bgcolor:string = 'white';
  matches: any;

  constructor(private speechRecognition: SpeechRecognition) {
    this.matches = ['Initially color is '+this.bgcolor];
  }

  ngOnInit(){
    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean)=>{
      console.log('Response of the hsaPermission function', hasPermission);
      if(!hasPermission){
        console.log('Has no permission to the microphone');
        this.speechRecognition.requestPermission()
        .then(
          () => console.log('Granted'),
          () => console.log('Denied')
        )
      }
    });
  }

  start(){
    this.speechRecognition.startListening().subscribe(
      (matches: Array<string>) => {
        console.log('Displaying the matches', matches);
        this.bgcolor = matches[0];
        this.matches = matches;
      }
    )
  }
}
