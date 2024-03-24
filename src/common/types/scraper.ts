export enum ScraperCommand {
  SCRAP
}

export interface ScraperMessage {
  command: ScraperCommand;
}
