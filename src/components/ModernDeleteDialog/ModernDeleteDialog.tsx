import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernDeleteDialogProps } from './IModernDeleteDialogProps';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { ModernPrimaryButton, ModernButton } from '../Buttons';
import locales from '../../utilities/locales';

@observer
export class ModernDeleteDialog extends React.Component<IModernDeleteDialogProps, any> {

    locale: any;

    constructor(props: IModernDeleteDialogProps) {
        super(props);

        this.locale = new locales(props.language);
    }



    render() {
        const options = {
            titleAriaId: 'myLabelId',
            subtitleAriaId: 'mySubTextId',
            isBlocking: false,
            containerClassName: 'ms-dialogMainOverride'
        };

        const props = {
            type: DialogType.normal,
            title: this.locale.strings.formatString(this.locale.strings.confirmDeleteTitle, this.props.itemCount),
            subText: this.locale.strings.formatString(this.locale.strings.confirmDeleteText, this.props.itemCount)
        };

        return (
            <Dialog
                hidden={!this.props.isVisible}
                onDismiss={this.props.onCanceled}
                dialogContentProps={props}
                modalProps={options}>
                <DialogFooter>
                    <ModernPrimaryButton onClick={this.props.onConfirmed} id={"Delete"} label={this.locale.strings.yes} />
                    <ModernButton onClick={this.props.onCanceled} id={"Cancel"} label={this.locale.strings.no} />
                </DialogFooter>
            </Dialog>
        );
    }
}