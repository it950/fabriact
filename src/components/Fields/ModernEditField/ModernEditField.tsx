import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernEditFieldProps } from './IModernEditFieldProps';
import {
    ModernNumberEditField, ModernTextEditField, ModernEmailEditField, ModernPhoneEditField, ModernPercentEditField, ModernFileEditField,
    ModernMultiLineEditField, ModernMetadataEditField, ModernCurrencyEditField, ModernDateEditField, ModernLoginEditField, ModernLookupEditField, ModernChoiceEditField, ModernBooleanEditField
} from '..';
import { ModernFieldType } from '../../..';

@observer
export class ModernEditField extends React.Component<IModernEditFieldProps, any> {


    constructor(props: IModernEditFieldProps) {
        super(props);
    }


    private resolveSuggestions = () => {
        return this.props.resolveSuggestions(this.props.field.key);
    }

    private resolveLookup = (search) => {
        return this.props.resolveLookup(this.props.field.key, search);
    }

    render() {

        let html = null;

        switch (this.props.field.type) {

            case ModernFieldType.text:
            case ModernFieldType.url:
                html = <ModernTextEditField field={this.props.field} value={this.props.value}
                    validate={this.props.validate} onChange={this.props.onChange} errorMessage={this.props.errorMessage} />;

                break;
            case ModernFieldType.lookup:
            case ModernFieldType.user:
                html = <ModernLookupEditField field={this.props.field} value={this.props.value} resolveLookup={this.resolveLookup}
                    resolveSuggestions={this.resolveSuggestions} validate={this.props.validate} onChange={this.props.onChange}
                    errorMessage={this.props.errorMessage} />;

                break;
            case ModernFieldType.login:
                html = <ModernLoginEditField field={this.props.field} value={this.props.value} domain={""}
                    validate={this.props.validate} onChange={this.props.onChange} errorMessage={this.props.errorMessage} />;

                break;
            case ModernFieldType.choice:
                html = <ModernChoiceEditField field={this.props.field} value={this.props.value} 
                    validate={this.props.validate} onChange={this.props.onChange} errorMessage={this.props.errorMessage} />;

                break;
            case ModernFieldType.file:
                html = <ModernFileEditField field={this.props.field} value={this.props.value}
                    validate={this.props.validate} onChange={this.props.onChange} errorMessage={this.props.errorMessage} />;

                break;
            case ModernFieldType.multiLine:
                html = <ModernMultiLineEditField field={this.props.field} value={this.props.value}
                    validate={this.props.validate} onChange={this.props.onChange} errorMessage={this.props.errorMessage} />;

                break;
            case ModernFieldType.email:
                html = <ModernEmailEditField field={this.props.field} value={this.props.value}
                    validate={this.props.validate} onChange={this.props.onChange} errorMessage={this.props.errorMessage} />;

                break;
            case ModernFieldType.boolean:
                html = <ModernBooleanEditField field={this.props.field} value={this.props.value}
                    validate={this.props.validate} onChange={this.props.onChange} errorMessage={this.props.errorMessage} />;

                break;
            case ModernFieldType.managedMetadata:
                html = <ModernMetadataEditField field={this.props.field} value={this.props.value} language={this.props.language} onNewOption={this.props.onNewOption}
                    validate={this.props.validate} onChange={this.props.onChange} errorMessage={this.props.errorMessage} />;

                break;
            case ModernFieldType.phone:
                html = <ModernPhoneEditField field={this.props.field} value={this.props.value}
                    validate={this.props.validate} onChange={this.props.onChange} errorMessage={this.props.errorMessage} />;

                break;
            case ModernFieldType.dateTime:
                html = <ModernDateEditField field={this.props.field} value={this.props.value}
                    validate={this.props.validate} onChange={this.props.onChange} errorMessage={this.props.errorMessage} />;

                break;
            case ModernFieldType.currency:
                html = <ModernCurrencyEditField field={this.props.field} value={this.props.value} validate={this.props.validate}
                    onChange={this.props.onChange} errorMessage={this.props.errorMessage} />;
                break;
            case ModernFieldType.integer:
                html = <ModernNumberEditField field={this.props.field} value={this.props.value} validate={this.props.validate}
                    onChange={this.props.onChange} errorMessage={this.props.errorMessage} />;
                break;
            case ModernFieldType.percent:
                html = <ModernPercentEditField field={this.props.field} value={this.props.value} validate={this.props.validate}
                    onChange={this.props.onChange} errorMessage={this.props.errorMessage} />;
                break;
            case ModernFieldType.number:
                html = <ModernNumberEditField field={this.props.field} value={this.props.value} validate={this.props.validate}
                    onChange={this.props.onChange} errorMessage={this.props.errorMessage} />;
                break;
            default:
                console.warn(`FieldType ${this.props.field.type} missing`);
                break;
        }

        return (
            <span>{html}</span>
        );
    }
}