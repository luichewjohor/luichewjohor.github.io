import { Staff } from "./staff.model";

export class Staffs{
  public row : number;
  public staff : Staff[];


  constructor( row : number, staff : Staff[]) {
    this.row = row;
    this.staff = staff;
  }
}