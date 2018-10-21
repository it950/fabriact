import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernFormProps } from './IModernFormProps';
import { reaction } from 'mobx';
import { ModernEditField } from '../Fields';
import ModernFormState from './ModernFormState';
import { ModernNewItemPanel } from '../ModernNewItemPanel';

@observer
export class ModernForm extends React.Component<IModernFormProps, any> {

    config: ModernFormState;

    constructor(props: IModernFormProps) {
        super(props);

        this.config = new ModernFormState(this.props.item, this.props.fields, this.props.getNewOptionFieldGroups,
            this.props.getNewOptionItem, this.props.onSaveNewOption, this.props.language, this.props.validator);

        reaction(() => this.props.fields, (fields) => {
            this.config.validator.fields = fields;
        });
    }

    render() {
        const fields = this.config.fields ? this.config.fields.map(t => {
            const value = this.config.item && this.config.item[t.key] ? this.config.item[t.key] : null;

            const errorMessage = this.config.errorMessages && this.config.errorMessages.find(i => i.field == t.key) != null ?
                this.config.errorMessages.find(i => i.field == t.key).error : null;

            return <ModernEditField field={t} value={value} key={t.key} onChange={this.config.onFieldChange}
                onNewOption={this.config.onNewOption}
                errorMessage={errorMessage} language={this.props.language}
                validate={this.config.validator.validateFormField} resolveLookup={this.props.resolveLookup} resolveSuggestions={this.props.resolveSuggestions} />;
        }) : <span></span>;

        return (
            <span>
                <form>
                    {fields}
                </form>

                <ModernNewItemPanel resolveSuggestions={this.props.resolveSuggestions} onDismiss={this.config.onDismissNewOption}
                    getNewOptionFieldGroups={this.props.getNewOptionFieldGroups} onSaveNewItem={this.config.onSaveNewOption} getNewOptionItem={this.props.getNewOptionItem}
                    groups={this.config.newOptionFields} item={this.config.newOptionItem}
                    resolveLookup={this.props.resolveLookup} isVisible={this.config.newOptionFieldId != null} />
            </span>
        );
    }
}