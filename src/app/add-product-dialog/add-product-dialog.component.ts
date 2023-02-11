import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent implements OnInit {

  freshnessList = ["Brand New","Second Hand","Refurbished"];
  productForm !: FormGroup;
  actionBtn : string = "Save";


  constructor(private formBuilder : FormBuilder,
              private api: ApiService,
              private snackBar: MatSnackBar,
              private dialogRef: MatDialogRef<AddProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA)public editData: any) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['',Validators.required],
      productCategory : ['',Validators.required],
      productFreshness : ['',Validators.required],
      price : ['',Validators.required],
      date: ['', Validators.required],
      comment: ['',Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['productCategory'].setValue(this.editData.productCategory);
      this.productForm.controls['productFreshness'].setValue(this.editData.productFreshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['comment'].setValue(this.editData.comment);
    }
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){                                                   //Save
        this.api.postProduct(this.productForm.value).subscribe({
          next : (res)=>{
            this.snackBar.open("Product Added Successfully.","",{"duration" : 2000});
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error : (res)=> {
            this.snackBar.open("Error while adding the product.","",{"duration" : 2000});
          }
        });
      }else{
        this.snackBar.open("Please fill all the fields.","",{"duration" : 2000});
      }
    }else{                                                                            //update
      this.updateProduct();
    }
    
  }

  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next : (res) => {
        this.snackBar.open("Product Updated Successfully.","",{"duration" : 2000});
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error : (error) => {
        this.snackBar.open("Error while Updating the product","",{"duration" : 2000});
      }
    })
  }

}
