import { FileUpload } from "./file-upload.model";
import { Staffs } from "./staffs.model";

export class Committee {
  public images : FileUpload [];
  public header : string;
  public staffs : Staffs[];
  public key : string;
  public seq : string;

  constructor( header : string, staffs : Staffs[],seq : string,key? : string ,images? : FileUpload []) {
    this.images = images;
    this.header = header;
    this.key = key;
    this.seq = seq;
    this.staffs = staffs;
  }
}