export default class EditUserRequest {
  constructor(
    public id: number,
    public email: string,
    public pass: string,
    public name: string,
  ) {}
}
