// React Components
import * as React from 'react';
import * as ReactDom from 'react-dom';
// Sharepoint Components
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
// Custom Components
import * as strings from 'safetyIncidentsStrings';
import SafetyIncidents from './components/SafetyIncidents';
import { ISafetyIncidentsProps } from './components/ISafetyIncidentsProps';
import { ISafetyIncidentsWebPartProps } from './ISafetyIncidentsWebPartProps';

export default class SafetyIncidentsWebPart extends BaseClientSideWebPart<ISafetyIncidentsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISafetyIncidentsProps > = React.createElement(
      SafetyIncidents,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
