/// React & jQuery
import * as React from 'react';
import * as jquery from 'jquery';
// Styling
import styles from '../resources/SafetyIncidents.module.scss';
// Office-Ui Fabric Components
import {
  Persona,
  PersonaInitialsColor,
} from 'office-ui-fabric-react/lib/Persona';
import {
  Image,
  IImageProps,
  ImageFit
} from 'office-ui-fabric-react/lib/Image';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
// custom components
import { ISafetyIncidentsProps } from './ISafetyIncidentsProps';
import MapPanel from './SafetyIncidentPanelMap';
import SafetyIncidentGetItems from './SafetyIncidents';


// image properties
const imageProps: IImageProps = {
  src: 'http://placehold.it/150x150',
  imageFit: ImageFit.contain
};

export interface ISafetyIncidentStateDefault {
  incidentId: number,
  Title: string,
  incidentType: string,
  incidentDate: string,
  incidentDesc: string,
  location: string,
  createdBy: string,
  incidentNumber: string
}

// safety incident detail markup
export default class SafetyIncidentDetailsProp extends React.Component<ISafetyIncidentsProps, ISafetyIncidentStateDefault> {

  // constructor
  public constructor(props: ISafetyIncidentsProps, state: ISafetyIncidentStateDefault) {
    super(props);
    this.state = {
      incidentId: 0,
      incidentDate: '',
      Title: '',
      incidentType: '',
      incidentDesc: '',
      createdBy: '',
      location: '',
      incidentNumber: ''
    };
  }

  public getIncidentData() {
    var reactHandler = this;
    jquery.ajax({
      //url: `${this.props.siteUrl}/src/webparts/safetyIncidents/resources/safetyTestData.json`,
      url: "https://pscgroupllc.sharepoint.com/sites/apps/_api/web/lists/GetByTitle('SafetyIncidents')/Items(" + this.props.incidentId + ")",
      type: "GET",
      dataType: "json",
      headers: { 'Accept': 'application/json; odata=verbose;' },
      success: function (resultData) {
        reactHandler.setState({
          incidentId: resultData.d.Id,
          incidentDate: resultData.d.incidentDate,
          Title: resultData.d.Title,
          incidentType: resultData.d.incidentType,
          incidentDesc: resultData.d.incidentDesc,
          createdBy: resultData.d.createdBy,
          location: resultData.d.location,
          incidentNumber: resultData.d.incidentNumber
        })
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log('jqXHR', jqXHR);
        console.log('text status', textStatus);
        console.log('error', errorThrown);
      }
    });
  }

  public shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.incidentId != nextState.incidentId) {
      this.getIncidentData();
      return true;
    } else {
      return true;
    }
  }

  // data retrieval upon page render
  public componentDidMount() {
    this.getIncidentData();
  }

  // render function
  public render(): React.ReactElement<ISafetyIncidentsProps> {
    const thisIncident = this.state;
    return (
      <div>
        <Fabric>
          <div>
            <div className={styles.spacerBox}>
              <div className={styles.incidentTitleBox}>
                <div className="ms-Grid">
                  <div className="ms-Grid-row">
                    <div className={'ms-Grid-col ' + styles.sm9}>
                      <div>Safety Incident: {thisIncident.Title}</div>
                    </div>
                    <div className={'ms-Grid-col ' + styles.sm3}>
                      <Persona
                        className={styles.floatRight}
                        primaryText={thisIncident.createdBy}
                        secondaryText='Foreman'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="ms-Grid">
              <div className="ms-Grid-row">
                <div className={'ms-Grid-col ' + styles.sm3}>
                  <div className={styles.incidentBox}>
                    <div>{thisIncident.incidentNumber}</div>
                    <div className={styles.incidentLabelSm}>Job Number</div>
                  </div>
                </div>
                <div className={'ms-Grid-col ' + styles.sm3}>
                  <div className={styles.incidentBox}>
                    <div>{thisIncident.location}</div>
                    <div className={styles.incidentLabelSm}>Job Location</div>
                  </div>
                </div>
                <div className={'ms-Grid-col ' + styles.sm3}>
                  <div className={styles.incidentBox}>
                    <div>{thisIncident.incidentDate}</div>
                    <div className={styles.incidentLabelSm}>Occurred</div>
                  </div>
                </div>
                <div className={'ms-Grid-col ' + styles.sm3}>
                  <div className={styles.incidentBox}>
                    <div>{thisIncident.incidentType}</div>
                    <div className={styles.incidentLabelSm}>Type</div>
                  </div>
                </div>
              </div>
              <div className={styles.incidentRow}>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6">
                    <div className={styles.incidentLabel}>Description</div>
                    <div>{thisIncident.incidentDesc}</div>
                  </div>
                </div>
              </div>
              <div className={styles.incidentRow}>
                <div className="ms-Grid-row">
                  <div className="ms-Grid-col ms-sm6">
                    <div className={styles.incidentLabel}>Pictures</div>
                    <div>
                      <Image { ...imageProps as any } width={150} height={150} className={styles.images} />
                      <Image { ...imageProps as any } width={150} height={150} className={styles.images} />
                      <Image { ...imageProps as any } width={150} height={150} className={styles.images} />
                      <Image { ...imageProps as any } width={150} height={150} className={styles.images} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.incidentRow}>
                <div className="ms-Grid-row">
                  <div className={'ms-Grid-col ' + styles.sm12}>
                    <div className={styles.incidentLabel}>Full Incident Report</div>
                    <div className={styles.fullReport}>
                      Link to Full Document?
                        </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fabric>
      </div>
    )
  }
}