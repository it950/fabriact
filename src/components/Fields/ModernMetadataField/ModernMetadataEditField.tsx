import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernMetadataEditFieldProps } from './IModernMetadataEditFieldProps';
import { ModernFieldLabel } from '../ModernFieldLabel/ModernFieldLabel';
import { ModernMetadataButtonField } from './ModernMetadataButton';
import { ModernPrimaryButton } from '../../..';
import locales from '../../../utilities/locales';

@observer
export class ModernMetadataEditField extends React.Component<IModernMetadataEditFieldProps, any> {

    locale: any;
    constructor(props: IModernMetadataEditFieldProps) {
        super(props);

        this.locale = new locales(this.props.language);
    }

    private updateItem = (value) => {

        if (this.props.field.multiSelect) {
            if (this.props.value && this.props.value.length > 0 && this.props.value.filter(e => e.id == value.id).length > 0) {
                this.props.onChange(this.props.field.key, this.props.value.filter(r => r.id != value.id).map(v => {
                    return { title: v.title, id: v.id };
                }));
            }
            else {
                var results = this.props.value ? this.props.value : [];

                var newValue = results.push(value);
                this.props.onChange(this.props.field.key, results.map(v => {
                    return { title: v.title, id: v.id };
                }));
            }
        }
        else {
            if (this.props.value && this.props.value.id == value.id) {
                this.props.onChange(this.props.field.key, null);
            }
            else {
                this.props.onChange(this.props.field.key, { title: value.title, id: value.id });
            }
        }
    }

    private addNewOption = () => {
        console.log("dasdsa");
        this.props.onNewOption(this.props.field.key);
    }

    render() {

        var buttons = this.props.field.options.map(option => {
            var checked = (this.props.field.multiSelect && this.props.value && this.props.value.length > 0 && this.props.value.filter(e => e.id == option.id).length > 0)
                || (!this.props.field.multiSelect && this.props.value && this.props.value.id == option.id);

            return <ModernMetadataButtonField key={option.id} id={option.id} checked={checked} label={option.title} onClicked={this.updateItem} />;

        });
        console.log("dasdsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(this.props);
        if (this.props.field.newOptionItems) {
            buttons.push(<ModernPrimaryButton id={"Add"} key={"Add"} label={this.locale.strings.add} onClick={this.addNewOption} />);
        }
        
        return (
            <span>
                <ModernFieldLabel required={this.props.field.required} label={this.props.field.name} />

                {buttons}
            </span>
        );
    }
}