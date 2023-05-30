import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';

import { Culture } from '../../model/culture.model';
import { FileService } from 'src/app/service/file.service';
import { FileUpload } from 'src/app/model/file-upload.model';
import { FileUploadFireBase } from 'src/app/model/file-upload-firebase.model';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CultureService {
  private basePath = '/culture';
  cultureRef: AngularFireList<Culture>;
  private fileUploadFirebaseLst : FileUploadFireBase [] = [];

  constructor(
    private db: AngularFireDatabase,
    private uploadFileService: FileService
) {
    this.cultureRef = db.list(this.basePath);
  }

  storeCulture( culture : Culture, fileList: FileUpload[], headerImageList: FileUpload[]) {
    //console.log(fileList);
    this.fileUploadFirebaseLst = [];
    this.db.list(this.basePath).push(new Culture(culture.description,culture.header,culture.seq,[],[],null)).then( ref => {
      const path = this.basePath +'/'+ ref.key ;
      this.fileUploadFirebaseLst.push(new FileUploadFireBase(path,fileList,'images'));
      this.fileUploadFirebaseLst.push(new FileUploadFireBase(path,headerImageList,'headerImage'));
      
      console.log(path);
      // this.uploadFileService.upload(fileList,path,'images');
      this.uploadFileService.uploadFileList(this.fileUploadFirebaseLst);
    });
  }

  getAll(): AngularFireList<Culture> {
    return this.cultureRef;
  }

  getAllCulture(): Observable<Culture[]> {
    return this.cultureRef.snapshotChanges().pipe(
      take(1),
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key,...c.payload.val() })
        )
      ),
      map( c => (c.sort((a, b) => a.seq.localeCompare(b.seq))))
    );
  }
  

  getCulture(id : string) : AngularFireObject<Culture>{
    return this.db.object(this.basePath+ '/' + id);
  }

  private deleteCultureDatabase(id: string): Promise<void> {
    return this.db.list(this.basePath +'/' + id).remove();
  }
  deleteCulture(id : string) : void{
    this.deleteCultureDatabase(id)
      .catch((error) => console.log(error));

    this.uploadFileService.deleteFileStorage(id,this.basePath);
    console.log('Deleted ID' + id);
  }

  updateCulture(path : string, culture : Culture): void {
    this.db.list(this.basePath).update(path, culture);
  }

  updateCultureSeq(cultureList: Culture[]) {
    for (let c of cultureList) {
      this.db.list(this.basePath).update(c.key, { seq: c.seq });
    }
  }
}
