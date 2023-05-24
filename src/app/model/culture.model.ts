import { FileUpload } from './file-upload.model';
import { Paragraph } from './paragraph.model';

export class Culture {
  public header : string;
  public headerImage : FileUpload [];
  public description : Paragraph[];
  public images? : FileUpload[];
  public key? : string;
  public seq : string;

  constructor(header : string,description : Paragraph[],seq : string, images? : FileUpload[],headerImage? : FileUpload[], key? : string) {
    this.header = header;
    this.headerImage = headerImage;
    this.description = description;
    this.images = images;
    this.key = key;
    this.seq = seq;
  }
}
