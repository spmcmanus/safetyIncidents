/// React
import * as React from 'react';
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
import MapPanel from './SafetyIncidentPanelMap';
import SafetyIncidentGetItems from './SafetyIncidents';


// image properties
const imageProps: IImageProps = {
  src: 'http://placehold.it/150x150',
  imageFit: ImageFit.contain
};

// safety incident detail markup
const SafetyIncidentDetails = ({ goHome, showMapPanel, thisIncident, incidents }) => {

  if (!thisIncident) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Fabric>
        <div>
          <div className={styles.spacerBox}>
            <div className={styles.incidentTitleBox}>
              <div className="ms-Grid">
                <div className="ms-Grid-row">
                  <div className={'ms-Grid-col ' + styles.sm9}>
                    <div>Safety Incident: {thisIncident.incidentTitle}</div>
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
                <div className={styles.incidentBox} onClick={showMapPanel.bind(this)}>
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
                  <div>{thisIncident.type}</div>
                  <div className={styles.incidentLabelSm}>Type</div>
                </div>
              </div>
            </div>
            <div className={styles.incidentRow}>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm6">
                  <div className={styles.incidentLabel}>Description</div>
                  <div>{thisIncident.description}</div>
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
          <br></br>
          <br></br>
          <br></br>
          <div className='ms-BasicButtonsExample'>
            <PrimaryButton
              data-automation-id='test'
              text='Back'
              onClick={goHome.bind(this)}
            />
          </div>
        </div>
      </Fabric>
    </div>
  );
}

export default SafetyIncidentDetails;