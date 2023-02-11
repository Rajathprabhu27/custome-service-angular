import { Component, OnInit ,Inject} from '@angular/core';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(private api: ApiService,
              private dialogRef: MatDialogRef<ConfirmDialogComponent>,
              @Inject(MAT_DIALOG_DATA)public data: any,
              private snackbar : MatSnackBar) { }

  ngOnInit(): void {
  }

  confirmDelete(){
    this.api.deleteProduct(this.data).subscribe({
      next: (res)=> {
        this.snackbar.open("Product Deleted Successfully.","",{"duration" : 2000});
        this.dialogRef.close('deleted');
      },
      error: (err) => {
        this.snackbar.open("Error while deleting the product.","",{"duration" : 2000});
      }
    });
  }

}
