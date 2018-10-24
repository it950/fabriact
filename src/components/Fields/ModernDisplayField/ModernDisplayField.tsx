import * as React from 'react';
import { observer } from 'mobx-react';
import { IModernDisplayFieldProps } from './IModernDisplayFieldProps';
import { ModernFieldType } from '../../..';
import { ModernImageDisplayField } from '../ModernImageField';
import {
    ModernLookupDisplayField, ModernTextDisplayField, ModernPercentDisplayField, ModernNumberDisplayField,
    ModernMetadataDisplayField, ModernDateDisplayField, ModernCurrencyDisplayField, ModernPhoneDisplayField, ModernEmailDisplayField, ModernChoiceDisplayField, ModernUserDisplayField, ModernUrlDisplayField, ModernFileDisplayField, ModernBooleanDisplayField
} from '..';
import ModernDisplayFieldState from './ModernDisplayFieldState';
import { from, Subscription } from 'rxjs';
import { Shimmer, ShimmerElementType as ElemType } from 'office-ui-fabric-react/lib/Shimmer';
import { reaction } from 'mobx';


@observer
export class ModernDisplayField extends React.Component<IModernDisplayFieldProps, any> {

    private config: ModernDisplayFieldState;
    private asyncSubscription: Subscription;

    constructor(props: IModernDisplayFieldProps) {
        super(props);

        this.config = new ModernDisplayFieldState(this.props.item, this.props.field, this.props.onGetFieldValue);


        reaction(() => this.props.item, (item) => {
            this.config.item = item;
        });
    }

    componentWillUnmount() {
        if (this.asyncSubscription) {
            this.asyncSubscription.unsubscribe();
        }
    }
    
    componentDidMount() {
        if (this.config.field.asyncValue) {
            this.asyncSubscription = from(this.config.init()).subscribe();
        }
    }

    render() {

        let html = null;

        if (!this.config.isLoading) {

            switch (this.props.field.type) {

                case ModernFieldType.image:
                    html = <ModernImageDisplayField value={this.config.value} />;

                    break;
                case ModernFieldType.lookup:
                    html = <ModernLookupDisplayField value={this.config.value} />;

                    break;
                case ModernFieldType.boolean:
                    html = <ModernBooleanDisplayField value={this.config.value} language={this.props.language} />;

                    break;
                case ModernFieldType.file:
                    html = <ModernFileDisplayField value={this.config.value} />;

                    break;
                case ModernFieldType.text:
                case ModernFieldType.login:
                case ModernFieldType.multiLine:
                    html = <ModernTextDisplayField value={this.config.value} />;

                    break;
                case ModernFieldType.number:
                case ModernFieldType.integer:
                    html = <ModernNumberDisplayField value={this.config.value} />;

                    break;
                case ModernFieldType.percent:
                    html = <ModernPercentDisplayField value={this.config.value} />;

                    break;
                case ModernFieldType.managedMetadata:
                    html = <ModernMetadataDisplayField value={this.config.value} />;

                    break;
                case ModernFieldType.dateTime:
                    html = <ModernDateDisplayField language={this.props.language} value={this.config.value} asTimeAgo={this.props.field.asTimeAgo} />;

                    break;
                case ModernFieldType.currency:
                    html = <ModernCurrencyDisplayField value={this.config.value} />;

                    break;
                case ModernFieldType.phone:
                    html = <ModernPhoneDisplayField value={this.config.value} />;

                    break;
                case ModernFieldType.choice:
                    html = <ModernChoiceDisplayField value={this.config.value} />;

                    break;
                case ModernFieldType.email:
                    html = <ModernEmailDisplayField value={this.config.value} />;

                    break;
                case ModernFieldType.user:
                    html = <ModernUserDisplayField value={this.config.value} placeholderImage={this.props.placeholderImage} />;

                    break;
                case ModernFieldType.url:
                    html = <ModernUrlDisplayField value={this.config.value} />;

                    break;

                default:
                    console.warn(`FieldType ${this.props.field.type} missing`);
                    break;
            }
        }
        else {
            //width={"25%"}
            html = <Shimmer  />;
        }

        return (
            <span>{html}</span>
        );
    }
}