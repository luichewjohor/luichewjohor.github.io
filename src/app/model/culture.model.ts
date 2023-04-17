import { Image } from './image.model';

export class Culture {
  constructor(public header:string,public desc: string[],public imagePath: Image[]) {}
}
