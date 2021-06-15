import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StorageHelper } from '../core/helper/storage.helper';
import { AddElementComponent } from '../modals/add-element/add-element.component';


export interface MountainHikes {
  masiv: string;
  plecare: string;
  sosire: string;
  lungime: number;
  diferentaNivel: number;
  data: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.less']
})
export class HomepageComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['masiv', 'plecare', 'sosire', 'lungime','diferentaNivel','data','actions'];
  myList: MountainHikes[] = [
    {masiv: 'Bucegi', plecare: 'Busteni', sosire: "Babele", lungime: 20, diferentaNivel: 2000, data:"2000-05-20"}
  ];
  dataSource = new MatTableDataSource(this.myList);
  mountainForm: FormGroup = new FormGroup({});

  masivSearchValue: any;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    
  }

  initForm(){
    this.mountainForm = this.formBuilder.group({
      masiv: [''],
      plecare: [''],
      sosire: [''],
      lungime: [''],
      diferentaNivel: [''],
      data: ['']
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onRowClick(row:any){
    console.log(row);
  }

  onAdd(){
    this.myList.push(this.mountainForm.value);
    this.dataSource.data = this.myList;
  }

  onDelete(row:any){
    const index = this.myList.indexOf(row);

    if (index > -1) {
      this.myList.splice(index, 1);
      this.dataSource.data = this.myList;
    }
  }

  searchByMasiv(){
    this.dataSource.data = this.myList.filter(e => e.masiv.toLowerCase() == this.masivSearchValue.toLowerCase());
  }

  clearMasivlSearch(){
    this.masivSearchValue = '';
    this.dataSource.data = this.myList;
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(AddElementComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if(result){
        this.myList.push(result.value);
        this.dataSource.data = this.myList;
      }
      
    });
  }
  
  onLogOut(){
    StorageHelper.setToken("");
    (<any>this.router).navigate(["/login"])
  }
}

