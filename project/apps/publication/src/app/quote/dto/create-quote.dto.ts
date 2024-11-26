export class CreateQuoteDto {
  public name: string;
  public text: string;
  public tags?: string[];
  public state?: string;
}
