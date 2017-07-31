declare interface ISafetyIncidentsStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  IncidentIdFieldLabel: string;
  ShowIncidentCountFieldLabel:string;
}

declare module 'safetyIncidentsStrings' {
  const strings: ISafetyIncidentsStrings;
  export = strings;
}
