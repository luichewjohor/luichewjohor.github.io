import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, finalize, forkJoin } from 'rxjs';
import { FileUpload } from '../model/file-upload.model';
import { ListResult, Reference, UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';
import { FileUploadFireBase } from '../model/file-upload-firebase.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  currentFileUpload?: FileUpload
  percentage = 0;
  downloadUrl: FileUpload[] = [];
  observableTask: Observable<UploadTaskSnapshot>[] = [];


  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) { }

  pushFileToStorage(fileUpload: FileUpload, basePath: string, attribute: string, seq : number): Observable<number | undefined> {
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
            //console.log('Uploading ' + fileUpload.name);
            this.saveFileData(fileUpload, basePath, attribute, seq);
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

  private saveFileData(fileUpload: FileUpload, basePath: string, attribute: string, seq: number): void {
    //console.log(fileUpload);
    this.db.list(basePath).update(attribute + '/' + seq, fileUpload);
  }

  getFiles(numberItems: number, basePath: string): AngularFireList<FileUpload> {
    return this.db.list(basePath, (ref) => ref.limitToLast(numberItems));
  }

  deleteFileStorage(name: string, basePath: string): void {
    const folderPath = `${basePath}/${name}`;
    const folderRef = this.storage.ref(folderPath);

    folderRef.listAll().subscribe((list: ListResult) => {
      list.items.forEach((fileRef: Reference) => fileRef.delete());
    });
  }

  async upload(selectedFiles: FileUpload[], basePath: string, attribute: string): Promise<void> {
    if (selectedFiles && selectedFiles.length > 0) {
      let seq : number = 0;
      for (let i = 0; i < selectedFiles.length; i++) {
        if (selectedFiles[i]['file']) {
          this.pushFileToStorage(selectedFiles[i], basePath, attribute,seq).subscribe({
            next: (percentage: number) =>
              (this.percentage = Math.round(percentage ? percentage : 0)),
            error: (err) => console.log(err),
          });
        } else {
          console.warn('FileUpload dont have file attirbute [ %s ]', selectedFiles);
        }
      }
    }
  }

  async uploadFileList(fileList: FileUploadFireBase[]): Promise<void> {
    if (fileList && fileList.length > 0) {
      for (let i = 0; i < fileList.length; i++) {
        let selectedFiles: FileUpload[] = fileList[i].fileList;
        let seq : number = 0;
        for (let j = 0; j < selectedFiles.length; j++) {
          if (selectedFiles[j]['file']) {
            this.pushFileToStorage(selectedFiles[j], fileList[i].path, fileList[i].attribute,seq).subscribe({
              next: (percentage: number) =>
                (this.percentage = Math.round(percentage ? percentage : 0)),
              error: (err) => console.log(err),
            });
          } else {
            console.warn('FileUpload dont have file attirbute [ %s ]', selectedFiles);
          }
          seq++;
        }
      }
    }
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
