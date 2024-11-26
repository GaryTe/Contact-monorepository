export class CreateLinkDto {
  public link: string;
  public description: string;
  public tags?: string[];
  public state?: string;
}
