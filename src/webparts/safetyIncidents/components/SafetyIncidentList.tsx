// React
import * as React from 'react';
// Styling
import styles from '../resources/SafetyIncidents.module.scss';
// Office-Ui Fabric Components
import {
    DocumentCard,
    DocumentCardTitle,
    DocumentCardActivity,
    DocumentCardPreview,
    DocumentCardActions,
    IDocumentCardPreviewProps
} from 'office-ui-fabric-react/lib/DocumentCard';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';

const SafetyIncidentList = ({ handler, incidents }) => {
    // return loading if the incidents state has not yet been set
    if (!incidents) {
        return <div>Loading...</div>;
    }
    let previewProps: IDocumentCardPreviewProps = {
    previewImages: [
      {
        url: 'http://placehold.it/150x150',
        imageFit: ImageFit.cover,
        width: 150,
        height: 150
      }
    ],
  };
    // return list of incidents
    return (
        <div className={styles.panelStyle} >
            <div className={'ms-font-xl ms-fontWeight-semibold ' + styles.titleContainer}>Demo : Retrieve Safety Incidents using SPFx , REST API  & React JS</div>
            <div className={styles.tableStyle} >
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                        {incidents.map((incident, key) => {
                            return (
                                <div className={styles.incidentCardContainer} key={key}>
                                    <DocumentCard
                                        className={styles.incidentCard}
                                        onClick={handler.bind(this, incident)}>
                                        <DocumentCardPreview { ...previewProps } />
                                        <div className={styles.docCardType}>Safety Incident</div>
                                        <DocumentCardTitle
                                            title={incident.Title}
                                            shouldTruncate={true}
                                        />
                                        <DocumentCardActivity
                                            activity={incident.incidentDate}
                                            people={[
                                                { name: incident.createdBy, profileImageSrc: '' }
                                            ]}
                                        />
                                    </DocumentCard>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div >
    )
};

export default SafetyIncidentList;