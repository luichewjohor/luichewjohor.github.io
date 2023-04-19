export class FileUpload {
  key!: string;
  name!: string;
  url!: string;
  file: File;

  constructor(file: File,name?: string, url?: string) {
    this.file = file;
    this.name = name;
    this.url = url;
  }
}
