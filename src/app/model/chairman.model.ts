import { FileUpload } from "./file-upload.model";

export class Chairman {
  images : FileUpload [];
  title : string;
  name : string;
  date : string;
  description : string;
  seq : string;
  key : string;

  constructor( images : FileUpload[],title : string, name : string,date : string, seq: string, description?: string,key? : string) {
    this.images = images;
    this.title = title;
    this.name = name;
    this.date = date;
    this.seq = seq;
    this.description = description;
    this.key = key;
  }
}