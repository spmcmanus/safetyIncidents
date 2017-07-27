// Utility components
import * as React from 'react';
import { escape } from '@microsoft/sp-lodash-subset';
import * as jquery from 'jquery';
import * as _ from 'lodash';
// Custom Components
import { ISafetyIncidentsProps } from './ISafetyIncidentsProps';
import SafetyIncidentList from './SafetyIncidentList';
import SafetyIncidentDetails from './SafetyIncidentDetails';

export interface ISafetyIncidentState {
  incidents: [
    {
      "incidentNumber": "",
      "incidentTitle": "",
      "createdBy": "",
      "location": "",
      "incidentDate": "",
      "type": "",
      "description": ""
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
        "incidentTitle": "",
        "createdBy": "",
        "location": "",
        "incidentDate": "",
        "type": "",
        "description": ""
      }],
      incidentIdSelected: "",
      showMapPanel: false
    };
    this.onCardClick = this.onCardClick.bind(this);
    this.goHome = this.goHome.bind(this);
    this.showMapPanel = this.showMapPanel.bind(this);
  }

  public componentDidMount() {
    var reactHandler = this;
    jquery.ajax({
      //url: `${this.props.siteurl}/_api/web/lists/getbytitle('EmployeeList')/items`, 
      url: "/src/webparts/safetyIncidents/resources/safetyTestData.json",
      type: "GET",
      headers: { 'Accept': 'application/json; odata=verbose;' },
      success: function (resultData) {
        reactHandler.setState({
          incidents: resultData,
          incidentIdSelected: '',
          showMapPanel: false
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
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
    console.log("this.props from showMapPanel",this.props)
  }

  public render(): React.ReactElement<ISafetyIncidentsProps> {
    if (this.state.incidents[0].incidentNumber == '') {
      return (
        <div>Loading...</div>
      );
    } else if (this.state.incidentIdSelected == '') {
      const theseIncidents = this.state.incidents;
      return (
        <SafetyIncidentList
          handler={this.onCardClick}
          incidents={theseIncidents}>
        </SafetyIncidentList>
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