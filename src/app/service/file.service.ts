import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize, forkJoin } from 'rxjs';
import { FileUpload } from '../model/file-upload.model';
import { Image } from '../model/image.model';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';
import { map } from 'rxjs-compat/operator/map';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  currentFileUpload?: FileUpload
  percentage = 0;
  downloadUrl : FileUpload[] = [];
  observableTask : Observable<UploadTaskSnapshot>[]= [];
  seq : number = 0;


  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  pushFileToStorage(fileUpload: FileUpload,basePath : string): Observable<number | undefined> {
    const filePath = `${basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            console.log('Uploading '+fileUpload.name );
            this.saveFileData(fileUpload, basePath , this.seq++);
          });
        })
      ).subscribe();

    return uploadTask.percentageChanges();
  }


  //   pushFileToStorage(file: File,basePath : string): Observable<UploadTaskSnapshot> {
  //   const filePath = `${basePath}/${file.name}`;
  //   const storageRef = this.storage.ref(filePath);
  //   const uploadTask = this.storage.upload(filePath, file);


  //   return uploadTask
  //       .snapshotChanges()
  //       .pipe(
  //         finalize(() => {
  //           storageRef.getDownloadURL().subscribe((downloadURL) => {
  //             console.log('Uploading '+ file.name);
  //             this.downloadUrl.push(new FileUpload(undefined,file.name,downloadURL));
  //           });
  //         })
  //       )
  // }

  private saveFileData(fileUpload: FileUpload,basePath : string, seq : number): void {
    this.db.list(basePath).update('images/'+seq,fileUpload);
  }

  getFiles(numberItems: number, basePath : string): AngularFireList<FileUpload> {
    return this.db.list(basePath, (ref) => ref.limitToLast(numberItems));
  }

  deleteFile(fileUpload: FileUpload,basePath : string): void {
    this.deleteFileDatabase(fileUpload.key,basePath)
      .then(() => {
        this.deleteFileStorage(fileUpload.name,basePath);
      })
      .catch((error) => console.log(error));
  }

  private deleteFileDatabase(key: string,basePath : string): Promise<void> {
    return this.db.list(basePath).remove(key);
  }

  private deleteFileStorage(name: string,basePath : string): void {
    const storageRef = this.storage.ref(basePath);
    storageRef.child(name).delete();
  }

  async upload(selectedFiles: FileList, basePath : string): Promise<void> {
    if (selectedFiles && selectedFiles.length > 0) {
      this.seq = 0;
      for (let i = 0; i < selectedFiles.length; i++) {
        const file: File | null = selectedFiles.item(i);
        if (file) {
          this.currentFileUpload = new FileUpload(file);
          this.pushFileToStorage(this.currentFileUpload,basePath).subscribe({
            next: (percentage: number) =>
              (this.percentage = Math.round(percentage ? percentage : 0)),
            error: (err) => console.log(err),
          });
        }
      }
    }
    // this.saveFileData(this.downloadUrl,basePath);
  }

  // upload(selectedFiles: FileList, basePath : string){

  //   const files = Array.from(selectedFiles);

  //   files.forEach( file => {
  //     this.observableTask.push(this.pushFileToStorage(file, basePath));
  //   })

  //   forkJoin(this.observableTask).subscribe( res => {
  //     console.log(res);
  //   });

  // }

}
