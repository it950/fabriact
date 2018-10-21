import * as React from 'react';
import { IModernViewGroupFieldButtonProps } from "./IModernViewGroupFieldButtonProps";
import { observer } from 'mobx-react';
import './ModernViewGroup.module.css';
import { ModernLinkButton } from '../Buttons';
import locales from '../../utilities/locales';


@observer
export class ModernViewGroupFieldButton extends React.Component<IModernViewGroupFieldButtonProps, any> {

    locale: any;

    constructor(props: IModernViewGroupFieldButtonProps) {
        super(props);

        this.locale = new locales(this.props.language);
    }

    public onMoreClicked = () => {
        this.props.onMoreClicked(this.props.field.key);
    }

    render() {
        let content = <span></span>;

        if (this.props.field.editGroupTrigger) {
            content = <ModernLinkButton id={"Edit"} onClick={this.props.onEditClicked} label={this.locale.strings.edit} />;
        }

        if (this.props.field.embeddedFields) {
            content = <ModernLinkButton id={"More"} onClick={this.onMoreClicked} label={this.locale.strings.more} />;
        }

        if (this.props.field.action) {
            content = <ModernLinkButton id={this.props.field.action.key} onClick={this.props.onActionClicked} label={this.props.field.action.name} />;
        }

        return (
            <span>{content}</span>
        );

       
    }
}