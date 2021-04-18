import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//import { Server } from 'node:http';
declare var FB: any;
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  auth2: any;
 
  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;
 
  constructor() { }
 
  ngOnInit() {
 
    this.googleSDK();
    this.fbLibrary();
  }
 
  prepareLoginButton() {
 
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
 
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE
 
 
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
 
  }
  googleSDK() {
 
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '280443159982-2pt3b22s9gqm2v749nvcct18es6h5r31.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLoginButton();
      });
    }
 
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
 
  }

  fbLibrary() {
 
            (window as any).fbAsyncInit = function() {
              window['FB'].init({
                appId      : '469941280795860',
                cookie     : true,
                xfbml      : true,
                version    : 'v3.1'
              });
              window['FB'].AppEvents.logPageView();
            };
         
            (function(d, s, id){
               var js, fjs = d.getElementsByTagName(s)[0];
               if (d.getElementById(id)) {return;}
               js = d.createElement(s); js.id = id;
               js.src = "https://connect.facebook.net/en_US/sdk.js";
               fjs.parentNode.insertBefore(js, fjs);
             }(document, 'script', 'facebook-jssdk'));
         
        }
          
        login() {
         
          window['FB'].login((response) => {
              console.log('login response',response);
              if (response.authResponse) {
        
                window['FB'].api('/me', {
                  fields: 'last_name, first_name, email'
                }, (userInfo) => {
        
                  console.log("user information");
                  console.log(userInfo);
                });
                 
              } else {
                console.log('User login failed');
              }
          }, {scope: 'email'});
        }
 
}