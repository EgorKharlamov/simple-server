export default class CreateUserRequest {
  constructor(
    public email: string,
    public pass: string,
    public passRepeat: string,
    public name: string,
  ) {}
}
