import { Component } from '@angular/core';
import { NgxExtendedPdfViewerService, pdfDefaultOptions } from 'ngx-extended-pdf-viewer'

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent {

  selectedFile:any=''
  selectedFilePath:string=''
  selectedFileB64:string=''


  constructor(){}

  onFileSelected(event:any):void{
    this.selectedFile =event.target.files[0] ?? null
    if(this.selectedFile){
      var reader = new FileReader()

      reader.readAsDataURL(event.target.files[0])

      reader.onload = (event:ProgressEvent<FileReader>) => {
        let path =event.target == null ? '':event.target.result
        this.selectedFilePath = path as string
        this.selectedFileB64 = this.selectedFilePath.split(",")[1]

      }
    }
  }

}
