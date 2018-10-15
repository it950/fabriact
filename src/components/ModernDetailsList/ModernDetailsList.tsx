import * as React from 'react';
import { IModernDetailsListProps } from './IModernDetailsListProps';
import { observer } from 'mobx-react';
import { DetailsList } from "office-ui-fabric-react/lib/DetailsList";
import { ModernSpinner } from '../ModernSpinner';
import ModernDetailsListState from './ModernDetailsListState';
import { reaction } from 'mobx';

@observer
export class ModernDetailsList extends React.Component<IModernDetailsListProps, any> {

    config: ModernDetailsListState;

    constructor(props: IModernDetailsListProps) {
        super(props);

        this.config = new ModernDetailsListState(this.props.items, this.props.fields, this.props.onSelectionChanged);

        reaction(() => this.props.items, (items) => {
            this.config.items = items;
        });

        reaction(() => this.props.fields, (fields) => {
            this.config.fields = fields;
        });
    }

    render() {
        const result = this.config.items ?
            <DetailsList items={this.config.items} selection={this.config.selection} columns={this.config.columns}
                selectionPreservedOnEmptyClick={true} />
            : <ModernSpinner />;

        return (
            <span>
                {result}
            </span>
        );
    }
}