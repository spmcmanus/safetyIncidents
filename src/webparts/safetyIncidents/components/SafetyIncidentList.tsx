// React
import * as React from 'react';
import * as ReactDOM from 'react-dom';

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
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
// Custom components and properties
import { ISafetyIncidentsProps } from './ISafetyIncidentsProps';

// local state
export interface localState {
	showModal: boolean
}

// component class definition
export default class SafetyIncidentList extends React.Component<any, any> {

	// constructor
	public constructor(props: ISafetyIncidentsProps, state: localState) {
		super(props);
		this.state = {
			showModal: false
		};
	}

	// modal control functions
	private _showModal() {
		this.setState({ showModal: true });
	}
	private _closeModal() {
		this.setState({ showModal: false });
	}

	// return loading if the incidents state has not yet been set
	public render(): React.ReactElement<ISafetyIncidentsProps> {

		const incidents = this.props.incidents.slice(0, this.props.showRecentIncidents);
		const handler = this.props.handler;
		let previewURL = '';

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
				<div className={'ms-font-xl ms-fontWeight-semibold ' + styles.titleContainer}>
					Demo : Retrieve Safety Incidents using SPFx , REST API  & React JS </div>
				<div className={styles.tableStyle} >
					<div className="ms-Grid">
						<div className="ms-Grid-row">
							{incidents.map((incident, key) => {

								if (incident.incidentPhotos != null) {
									previewURL = incident.incidentPhotos.Url;
								} else {
									previewURL = 'http://placehold.it/213x150';
								}

								const thisPreviewProps: IDocumentCardPreviewProps = {
									previewImages: [
										{
											previewImageSrc: previewURL,
											imageFit: ImageFit.cover,
											width: 213,
											height: 150
										}
									],
								};

								return (
									<div className={styles.incidentCardContainer} key={key}>
										<DocumentCard
											className={styles.incidentCard}
											onClick={handler.bind(this, incident)}
										>
											<DocumentCardPreview { ...thisPreviewProps } />
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
				<div>
					<DefaultButton
						description='Opens the Sample Modal'
						onClick={this._showModal.bind(this)}
						text='Test Modal'
					/>
					<Modal
						isOpen={this.state.showModal}
						onDismiss={this._closeModal.bind(this)}
						isBlocking={false}
					>
						<div className='ms-modalExample-header'>
							<span>Lorem Ipsum</span>
						</div>
						<div className='ms-modalExample-body'>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lorem nulla, malesuada ut sagittis sit amet, vulputate in leo. Maecenas vulputate congue sapien eu tincidunt. Etiam eu sem turpis. Fusce tempor sagittis nunc, ut interdum ipsum vestibulum non. Proin dolor elit, aliquam eget tincidunt non, vestibulum ut turpis. In hac habitasse platea dictumst. In a odio eget enim porttitor maximus. Aliquam nulla nibh, ullamcorper aliquam placerat eu, viverra et dui. Phasellus ex lectus, maximus in mollis ac, luctus vel eros. Vivamus ultrices, turpis sed malesuada gravida, eros ipsum venenatis elit, et volutpat eros dui et ante. Quisque ultricies mi nec leo ultricies mollis. Vivamus egestas volutpat lacinia. Quisque pharetra eleifend efficitur. </p>
							<p>Mauris at nunc eget lectus lobortis facilisis et eget magna. Vestibulum venenatis augue sapien, rhoncus faucibus magna semper eget. Proin rutrum libero sagittis sapien aliquet auctor. Suspendisse tristique a magna at facilisis. Duis rhoncus feugiat magna in rutrum. Suspendisse semper, dolor et vestibulum lacinia, nunc felis malesuada ex, nec hendrerit justo ex et massa. Quisque quis mollis nulla. Nam commodo est ornare, rhoncus odio eu, pharetra tellus. Nunc sed velit mi. </p>
							<p>Sed condimentum ultricies turpis convallis pharetra. Sed sagittis quam pharetra luctus porttitor. Cras vel consequat lectus. Sed nec fringilla urna, a aliquet libero. Aenean sed nisl purus. Vivamus vulputate felis et odio efficitur suscipit. Ut volutpat dictum lectus, ac rutrum massa accumsan at. Sed pharetra auctor finibus. In augue libero, commodo vitae nisi non, sagittis convallis ante. Phasellus malesuada eleifend mollis. Curabitur ultricies leo ac metus venenatis elementum. </p>
							<p>Aenean egestas quam ut erat commodo blandit. Mauris ante nisl, pellentesque sed venenatis nec, aliquet sit amet enim. Praesent vitae diam non diam aliquet tristique non ut arcu. Pellentesque et ultrices eros. Fusce diam metus, mattis eu luctus nec, facilisis vel erat. Nam a lacus quis tellus gravida euismod. Nulla sed sem eget tortor cursus interdum. Sed vehicula tristique ultricies. Aenean libero purus, mollis quis massa quis, eleifend dictum massa. Fusce eu sapien sit amet odio lacinia placerat. Mauris varius risus sed aliquet cursus. Aenean lectus magna, tincidunt sit amet sodales a, volutpat ac leo. Morbi nisl sapien, tincidunt sit amet mauris quis, sollicitudin auctor est. </p>
							<p>Nam id mi justo. Nam vehicula vulputate augue, ac pretium enim rutrum ultricies. Sed aliquet accumsan varius. Quisque ac auctor ligula. Fusce fringilla, odio et dignissim iaculis, est lacus ultrices risus, vitae condimentum enim urna eu nunc. In risus est, mattis non suscipit at, mattis ut ante. Maecenas consectetur urna vel erat maximus, non molestie massa consequat. Duis a feugiat nibh. Sed a hendrerit diam, a mattis est. In augue dolor, faucibus vel metus at, convallis rhoncus dui.</p>
						</div>
					</Modal>
				</div>
			</div >
		)
	}
};
