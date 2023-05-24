import { FileUpload } from "./file-upload.model";

export class FileUploadFireBase {
  public path : string;
  public fileList : FileUpload[];
  public attribute : string;


  constructor( path : string,  fileList : FileUpload[],  attribute : string) {
    this.path = path;
    this.fileList = fileList;
    this.attribute = attribute;
  }
}
