import * as React from 'react';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { ISafetyIncidentsPanelMapProps } from './ISafetyIncidentsPanelMapProps';
export default class MapPanel extends React.Component<ISafetyIncidentsPanelMapProps, any> {

	constructor(props) {
		super(props);
	}

	public render() {
		return (
			<div>
				<Panel
					isOpen={this.props.showPanel}
					type={PanelType.smallFixedFar}
					onDismiss={this._onClosePanel}
					headerText='Panel - Small, right-aligned, fixed, with footer'
					closeButtonAriaLabel='Close'
					onRenderFooterContent={() => {
						return (
							<div>
								<PrimaryButton
									onClick={this._onClosePanel}
									style={{ 'marginRight': '8px' }} >
									Save
                </PrimaryButton>
								<DefaultButton
									onClick={this._onClosePanel}
								>
									Cancel
                </DefaultButton>
							</div>
						);
					}}
				>
					<ChoiceGroup
						options={[
							{
								key: 'A',
								text: 'Option A'
							},
							{
								key: 'B',
								text: 'Option B',
								checked: true
							},
							{
								key: 'C',
								text: 'Option C',
								disabled: true
							},
							{
								key: 'D',
								text: 'Option D',
								checked: true,
								disabled: true
							}
						]}
						label='Pick one'
						required={true}
					/>
				</Panel>
			</div>
		);
	}

	private _onClosePanel = () => {
		this.setState({ showPanel: false });
	}

	private _onShowPanel = () => {
		this.setState({ showPanel: true });
	}
}
