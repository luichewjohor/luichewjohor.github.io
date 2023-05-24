import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, take, map } from 'rxjs';
import { Chairman } from 'src/app/model/chairman.model';
import { FileUploadFireBase } from 'src/app/model/file-upload-firebase.model';
import { FileUpload } from 'src/app/model/file-upload.model';
import { FileService } from 'src/app/service/file.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private chairmanBasePath = '/chairman';
  chairmanRef: AngularFireList<Chairman>;
  private fileUploadFirebaseLst: FileUploadFireBase[] = [];

  constructor(
    private db: AngularFireDatabase,
    private uploadFileService: FileService
  ) {
    this.chairmanRef = db.list(this.chairmanBasePath);
  }


  getChairManList(): Observable<Chairman[]> {
    return this.chairmanRef.snapshotChanges().pipe(
      take(1),
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key,...c.payload.val() })
        )
      ),
      map( c => (c.sort((a, b) => a.seq.localeCompare(b.seq))))
    );
  }

  getAllChairman(): AngularFireList<Chairman> {
    return this.chairmanRef;
  }

  storeChairman(c: Chairman, fileList: FileUpload[]) {
    // console.log(fileList);
    this.db.list(this.chairmanBasePath).push(new Chairman([],c.title,c.name,c.date,c.seq,c.description,null)).then(ref => {
      const path = this.chairmanBasePath + '/' + ref.key;
      console.log(path);
      this.uploadFileService.upload(fileList, path, 'images');
    });
  }

  updateChairman(path : string, c : Chairman): void {
    this.db.list(this.chairmanBasePath).update(path, c);
  }

  private deleteChairmanDatabase(id: string): Promise<void> {
    return this.db.list(this.chairmanBasePath + '/' + id).remove();
  }

  deleteChairman(id: string): void {
    this.deleteChairmanDatabase(id)
      .catch((error) => console.log(error));

    this.uploadFileService.deleteFileStorage(id, this.chairmanBasePath);
    console.log('Deleted ID' + id);
  }
}
