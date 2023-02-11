import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angularCrud';

  displayedColumns: string[] = ['productName', 'productCategory', 'productFreshness', 'price' , 'date', 'comment', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(public dialog: MatDialog,
              private api: ApiService,
              private snackbar: MatSnackBar){}

  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(AddProductDialogComponent, {
      width: '30%',
      
    }).afterClosed().subscribe(val => {
      if(val == 'save'){
        this.getAllProducts();
      }
    })
  }

  getAllProducts(){
    this.api.getProduct().subscribe({
      next :(res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error : (error) => {
        this.snackbar.open("Error while Fetching!.","",{"duration" : 2000});
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row : any){
    this.dialog.open(AddProductDialogComponent,{
      width : '30%',
      data: row
    }).afterClosed().subscribe(val=> {
      if(val == 'update'){
        this.getAllProducts();
      }
    })
  }

  deleteProduct(id: number){
    this.dialog.open(ConfirmDialogComponent,{
      width:'30%',
      data: id
    }).afterClosed().subscribe(val=> {
      if(val == 'deleted'){
        this.getAllProducts();
      }
    })

    
  }
}
