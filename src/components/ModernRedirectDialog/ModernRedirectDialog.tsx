import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernRedirectDialogProps } from './IModernRedirectDialogProps';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { ModernPrimaryButton, ModernButton } from '../Buttons';
import locales from '../../utilities/locales';

@observer
export class ModernRedirectDialog extends React.Component<IModernRedirectDialogProps, any> {

    locale: any;

    constructor(props: IModernRedirectDialogProps) {
        super(props);

        this.locale = new locales(props.language);
    }


    private redirect = () => {
        window.open(this.props.url, "_blank");
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
            title: this.locale.strings.itemCreated,
            subText: this.locale.strings.askRedirect
        };

        return (
            <Dialog
                hidden={!this.props.isVisible}
                onDismiss={this.props.onCanceled}
                dialogContentProps={props}
                modalProps={options}>
                <DialogFooter>
                    <ModernPrimaryButton onClick={this.redirect} id={"Yes"} label={this.locale.strings.yes} />
                    <ModernButton onClick={this.props.onCanceled} id={"No"} label={this.locale.strings.no} />
                </DialogFooter>
            </Dialog>
        );
    }
}