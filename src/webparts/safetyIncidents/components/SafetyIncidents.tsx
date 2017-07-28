// Utility components
import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from 'jquery';
import * as _ from 'lodash';
// Custom Components
import { ISafetyIncidentsProps } from './ISafetyIncidentsProps';
import SafetyIncidentList from './SafetyIncidentList';
import SafetyIncidentDetails from './SafetyIncidentDetails';
import SafetyIncidentDetailsProp from './SafetyIncidentDetailsProp';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

export interface ISafetyIncidentState {
  incidents: [
    {
      "incidentNumber": "",
      "Title": "",
      "createdBy": "",
      "location": "",
      "incidentDate": "",
      "incidentType": "",
      "incidentDesc": ""
    }],
  incidentIdSelected: string,
  showMapPanel: boolean
}

export default class SafetyIncidentGetItems extends React.Component<ISafetyIncidentsProps, ISafetyIncidentState> {

  public constructor(props: ISafetyIncidentsProps, state: ISafetyIncidentState) {
    super(props);
    this.state = {
      incidents:
      [{
        "incidentNumber": "",
        "Title": "",
        "createdBy": "",
        "location": "",
        "incidentDate": "",
        "incidentType": "",
        "incidentDesc": ""
      }],
      incidentIdSelected: "",
      showMapPanel: false
    };
    this.onCardClick = this.onCardClick.bind(this);
    this.goHome = this.goHome.bind(this);
    this.showMapPanel = this.showMapPanel.bind(this);
    this.showIncidentFromProperty = this.showIncidentFromProperty.bind(this);
  }

  public componentDidMount() {

    var reactHandler = this;

    jquery.ajax({
      //url: `${this.props.siteUrl}/src/webparts/safetyIncidents/resources/safetyTestData.json`,
      url: "https://pscgroupllc.sharepoint.com/sites/apps/_api/web/lists/GetByTitle('SafetyIncidents')/Items",
      type: "GET",
      dataType: "json",
      headers: { 'Accept': 'application/json; odata=verbose;' },
      success: function (resultData) {
        reactHandler.setState({
          //incidents: resultData
          incidents: resultData.d.results,
          incidentIdSelected: '',
          showMapPanel: false
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log('jqXHR', jqXHR);
        console.log('text status', textStatus);
        console.log('error', errorThrown);
      }
    });
  }

  public onCardClick(incident, e) {
    this.setState({
      incidents: this.state.incidents,
      incidentIdSelected: incident.incidentNumber,
      showMapPanel: false
    });
  }

  public goHome() {
    this.setState({
      incidents: this.state.incidents,
      incidentIdSelected: '',
      showMapPanel: false
    });
  }

  public showMapPanel() {
    console.log("opening panel");
    console.log("this.props from showMapPanel", this.props)
  }

  public showIncidentFromProperty() {
    this.setState({
      incidents: this.state.incidents,
      incidentIdSelected: 'Prop',
      showMapPanel: false
    });
  }

  public render(): React.ReactElement<ISafetyIncidentsProps> {
    if (this.state.incidents[0].incidentNumber == '') {
      return (
        <div>Loading...</div>
      );
    } else if (this.state.incidentIdSelected == 'Prop') {
      return (
        <SafetyIncidentDetailsProp
          description=''
          siteUrl=''
          incidentId={this.props.incidentId}
        ></SafetyIncidentDetailsProp>
      )
    } else if (this.state.incidentIdSelected == '') {
      const theseIncidents = this.state.incidents;
      return (
        <div>
          <PrimaryButton
            data-automation-id='test'
            text='Show Default Incident'
            onClick={this.showIncidentFromProperty}
          />
          <SafetyIncidentList
            handler={this.onCardClick}
            incidents={theseIncidents}>
          </SafetyIncidentList>
        </div>
      );
    } else {
      const thisIncident = _.mapKeys(this.state.incidents, 'incidentNumber')[this.state.incidentIdSelected];
      return (
        <SafetyIncidentDetails
          thisIncident={thisIncident}
          goHome={this.goHome}
          showMapPanel={this.showMapPanel}
          incidents={this.state.incidents}
        ></SafetyIncidentDetails>
      )
    }
  }
}