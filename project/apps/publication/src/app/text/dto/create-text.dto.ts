export class CreateTextDto {
  public name: string;
  public preview: string;
  public text: string;
  public tags?: string[];
  public state?: string;
}
