import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernEditFormProps } from './IModernEditFormProps';
import { reaction } from 'mobx';
import { ModernEditField } from '../Fields';
import ModernEditFormState from './ModernEditFormState';

@observer
export class ModernEditForm extends React.Component<IModernEditFormProps, any> {

    config: ModernEditFormState;

    constructor(props: IModernEditFormProps) {
        super(props);
        this.config = new ModernEditFormState(this.props.item, this.props.fields, this.props.onValidated, this.props.language);

        reaction(() => this.props.forceValidation, (forceValidation) => {
            if (forceValidation) {
                this.config.validateForm();
            }
        });

        reaction(() => this.props.fields, (fields) => {
            this.config.fields = fields;
        });
    }

    render() {
        const fields = this.config.fields ? this.config.fields.map(t => {
            const value = this.config.item && this.config.item[t.key] ? this.config.item[t.key] : null;

            const errorMessage = this.config.errorMessages && this.config.errorMessages.find(i => i.field == t.key) != null ?
                this.config.errorMessages.find(i => i.field == t.key).error : null;

            return <ModernEditField field={t} value={value} key={t.key} onChange={this.config.onFieldChange} errorMessage={errorMessage}
                validate={this.config.validateFormField} />;
        }) : <span></span>;

        return (
            <span>
                <form>
                    {fields}
                </form>
            </span>
        );
    }
}