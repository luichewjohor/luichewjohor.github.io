export class FileUpload {
  key?: string;
  name?: string;
  url?: string;
  file: File;
  type: string;

  constructor(file: File, type: string,name?: string, url?: string) {
    this.file = file;
    this.type = type;
    this.name = name;
    this.url = url;
  }
}
