// React Components
import * as React from 'react';
import * as ReactDom from 'react-dom';
// Sharepoint Components
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
} from '@microsoft/sp-webpart-base';
// Custom Components
import * as strings from 'safetyIncidentsStrings';
import SafetyIncidents from './components/SafetyIncidents';
import { ISafetyIncidentsProps } from './components/ISafetyIncidentsProps';
import { ISafetyIncidentsWebPartProps } from './ISafetyIncidentsWebPartProps';
// to facilatate relative url
import {
  IClientSideComponentLoaderConfiguration,
  IPathModuleConfiguration
} from '@microsoft/sp-module-interfaces';

export default class SafetyIncidentsWebPart extends BaseClientSideWebPart<ISafetyIncidentsWebPartProps> {

  private getBaseBundleUrl(): string {
    const loaderConfig: IClientSideComponentLoaderConfiguration = this.context.manifest.loaderConfig;
    let baseUrl: string = loaderConfig.internalModuleBaseUrls[0] +
      (loaderConfig.scriptResources[loaderConfig.entryModuleId] as IPathModuleConfiguration).path;
    return baseUrl.substr(0, baseUrl.lastIndexOf('/dist') + 1);
  }

  public render(): void {
    const mySiteUrl: string = this.getBaseBundleUrl();
    const element: React.ReactElement<ISafetyIncidentsProps> = React.createElement(
      SafetyIncidents,
      {
        description: this.properties.description,
        siteUrl: mySiteUrl,
        incidentId: this.properties.incidentId,
        showRecentIncidents: this.properties.showRecentIncidents
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          //header: {
          //  description: strings.PropertyPaneDescription
          //},
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('incidentId', { 
                  label: strings.IncidentIdFieldLabel 
                }),
                PropertyPaneSlider('showRecentIncidents', {
                  label: "Show Recent Incidents",
                  min: 1,
                  max: 5,
                  value: 5,
                  showValue: true,
                  step: 1
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
