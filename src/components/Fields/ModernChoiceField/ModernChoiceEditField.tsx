import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernChoiceEditFieldProps } from './IModernChoiceEditFieldProps';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ModernFieldLabel } from '..';

@observer
export class ModernChoiceEditField extends React.Component<IModernChoiceEditFieldProps, any> {

    constructor(props: IModernChoiceEditFieldProps) {
        super(props);
    }


    private updateItem = (value) => {
        if (this.props.field.multiSelect) {
            if (this.props.value && this.props.value.length > 0 && this.props.value.filter(e => e.id == value.key).length > 0) {
                this.props.onChange(this.props.field.key, this.props.value.filter(r => r.id != value.key));
            }
            else {
                var results = this.props.value ? this.props.value : [];

                results.push({ title: value.text, id: value.key });
                this.props.onChange(this.props.field.key, results);
            }
        }
        else {
            if (this.props.value && this.props.value.id == value.key) {
                this.props.onChange(this.props.field.key, null);
            }
            else {
                this.props.onChange(this.props.field.key, { title: value.text, id: value.key });
            }
        }

    }

    private getErrorMessage = (value: string): string => {
        return this.props.validate(this.props.field, value);
    }

    private modernLookupFieldToDropdownOptionMapping = (modernLookupField) => {
        var persona: IDropdownOption = {
            key: modernLookupField.id,
            text: modernLookupField.title,
        };

        return persona;
    }

    render() {
        const options = this.props.field.options.map(c => this.modernLookupFieldToDropdownOptionMapping(c));

        let field = <span></span>;

        if (this.props.field.multiSelect) {
            const keys = this.props.value ? this.props.value.map(i => i.id) : [];

            field = <Dropdown multiSelect onChanged={this.updateItem} options={options} defaultSelectedKeys={keys} />;
        }
        else {
            const key = this.props.value ? this.props.value.id : null;
            field = <Dropdown onChanged={this.updateItem} options={options} defaultSelectedKey={key} />;
        }

        return (
            <span>
                <ModernFieldLabel required={this.props.field.required} label={this.props.field.name} />

                {field}
            </span>
        );
    }
}