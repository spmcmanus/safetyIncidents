/// React & jQuery
import * as React from 'react';
import * as jquery from 'jquery';
// Styling
import styles from '../resources/SafetyIncidents.module.scss';
// Office-Ui Fabric Components
import {
	Image,
	IImageProps,
	ImageFit
} from 'office-ui-fabric-react/lib/Image';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
// custom components
import { ISafetyIncidentNew } from './ISafetyIncidentsProps';
import MapPanel from './SafetyIncidentPanelMap';
import SafetyIncidentGetItems from './SafetyIncidents';


export interface localState {
	Title: string,
	incidentType: string,
	incidentDate: string,
	incidentDesc: string,
	location: string,
	createdBy: string,
	incidentNumber: string,
	incidentPhoto: string
}

// safety incident detail markup
export default class SafetyIncidentDetailEntry extends React.Component<ISafetyIncidentNew, localState> {

	// constructor
	public constructor(props: ISafetyIncidentNew, state: localState) {
		super(props);
		this.state = {
			incidentDate: '',
			Title: '',
			incidentType: '',
			incidentDesc: '',
			createdBy: '',
			location: '',
			incidentNumber: '',
			incidentPhoto: ''
		};
	}

	public saveIncident() {
		console.log("saving...");

		const thisIncident = {
			incidentDate: '07/31/2017',
			incidentDesc: 'Desc',
			location: 'Minneapolis',
			incidentNumber: '1006',
			createdBy: 'Taylor Phinny',
			title: 'Crash'
		}

		var reactHandler = this;
		jquery.ajax({
			url: "https://pscgroupllc.sharepoint.com/sites/apps/_api/web/lists/GetByTitle('SafetyIncidents')/Items",
			type: "POST",
			contentType: "application/json;odata=verbose",
			data: JSON.stringify(thisIncident),
			headers: {
				"Accept": "application/json;odata=verbose",
				"X-RequestDigest": jquery("#__REQUESTDIGEST").val()
			},
			success: function (data) {
				console.log('Success',data)
			},
			error: function (data) {
				console.log('Failure',data)
			}
		});

	}

	// render function
	public render(): React.ReactElement<ISafetyIncidentNew> {
		const thisIncident = this.state;
		return (
			<div>
				<Fabric>
					<div>
						<div className="ms-Grid">
							<div className="ms-Grid-row">
								<TextField label='Incident Date' required={true} />
							</div>
							<div className="ms-Grid-row">
								<TextField label='Title' required={true} />
							</div>
							<div className="ms-Grid-row">
								<TextField label='Type' required={true} />
							</div>
							<div className="ms-Grid-row">
								<TextField label='Description' required={true} />
							</div>
							<div className="ms-Grid-row">
								<TextField label='Location' required={true} />
							</div>
							<div className="ms-Grid-row">
								<TextField label='Name' required={true} />
							</div>
						</div>
					</div>
					<PrimaryButton
						description='Saves the new incident'
						onClick={this.saveIncident.bind(this)}
						text='Save'
					></PrimaryButton>
				</Fabric>
			</div>
		)
	}
}