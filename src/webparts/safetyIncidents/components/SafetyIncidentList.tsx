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
    DocumentCardActions
} from 'office-ui-fabric-react/lib/DocumentCard';

const SafetyIncidentList = ({handler,incidents}) => {
    // return loading if the incidents state has not yet been set
    if (!incidents) {
        return <div>Loading...</div>;
    }
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
                                        onClick={handler.bind(this,incident)}>
                                        <DocumentCardTitle
                                            title={incident.incidentTitle}
                                            shouldTruncate={true}
                                        />
                                        <DocumentCardTitle
                                            title={incident.incidentNumber}
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