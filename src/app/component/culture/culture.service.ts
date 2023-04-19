import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/compat/database';

import { Culture } from '../../model/culture.model';
import { FileService } from 'src/app/service/file.service';

@Injectable({
  providedIn: 'root'
})
export class CultureService {
  private basePath = '/culture';
  cultureRef: AngularFireList<Culture>;

  constructor(
    private db: AngularFireDatabase,
    private uploadFileService: FileService
) {
    this.cultureRef = db.list(this.basePath);
  }

  storeCulture( culture : Culture, fileList: FileList) {
    console.log(fileList);
    this.db.list(this.basePath).push(new Culture(culture.header,culture.description,[],null)).then( ref => {
      const path = this.basePath +'/'+ ref.key ;
      this.uploadFileService.upload(fileList,path);
    });
  }

  getAll(): AngularFireList<Culture> {
    return this.cultureRef;
  }


}
