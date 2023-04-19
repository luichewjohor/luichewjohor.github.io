import { FileUpload } from './file-upload.model';

export class Culture {
  constructor(public header:string,public description: string[],public images?: FileUpload[],public key?:string) {}
}
