import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageHelper } from './core/helper/storage.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit  {

  constructor(
    private router: Router
  ){
    if(StorageHelper.getToken())
    {
      (<any>this.router).navigate(["/homepage"])
    }
    else
    {
      (<any>this.router).navigate(["/login"])
    } 
  }

  ngOnInit(): void {
    
  }
  title = 'MountainHikes';
}
