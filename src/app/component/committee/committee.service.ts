import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Observable, map, take } from 'rxjs';
import { Committee } from 'src/app/model/committee.model';
import { FileUpload } from 'src/app/model/file-upload.model';
import { FileService } from 'src/app/service/file.service';

@Injectable({
  providedIn: 'root'
})
export class CommitteeService {
  private basePath = '/committee';
  committeeRef: AngularFireList<Committee>;

  constructor(
    private db: AngularFireDatabase,
    private uploadFileService: FileService) {
    this.committeeRef = db.list(this.basePath);
  }

  storeCommittee(commitee: Committee, fileList: FileUpload[]) {
    // console.log(fileList);
    this.db.list(this.basePath).push(new Committee(commitee.header, commitee.staffs, commitee.seq,null,null)).then(ref => {
      const path = this.basePath + '/' + ref.key;
      console.log(path);
      this.uploadFileService.upload(fileList, path, 'images');
    });
  }


  getAll(): AngularFireList<Committee> {
    return this.committeeRef;
  }

  getAllCommittee(): Observable<Committee[]> {
    return this.committeeRef.snapshotChanges().pipe(
      take(1),
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key,...c.payload.val() })
        )
      ),
      map( c => (c.sort((a, b) => a.seq.localeCompare(b.seq))))
    );
  }

  getCommittee(id: string): AngularFireObject<Committee> {
    return this.db.object(this.basePath + '/' + id);
  }

  private deleteCommitteeDatabase(id: string): Promise<void> {
    return this.db.list(this.basePath + '/' + id).remove();
  }

  deleteCommittee(id: string): void {
    this.deleteCommitteeDatabase(id)
      .catch((error) => console.log(error));

    this.uploadFileService.deleteFileStorage(id, this.basePath);
    console.log('Deleted ID' + id);
  }

  updateCommittee(path : string, commitee : Committee): void {
    this.db.list(this.basePath).update(path, commitee);
  }

}
