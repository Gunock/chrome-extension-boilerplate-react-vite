export enum ScraperCommand {
    SCRAPE
}

export interface ScraperMessage {
    command: ScraperCommand;
}
