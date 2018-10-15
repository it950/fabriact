import * as React from 'react';
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import './ModernCommandBar.module.css';
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { IModernCommandBarProps } from './IModernCommandBarProps';
import { observer } from 'mobx-react';
import ModernCommandBarState from './ModernCommandBarState';
import { reaction } from 'mobx';

@observer
export class ModernCommandBar extends React.Component<IModernCommandBarProps, any> {

    config: ModernCommandBarState;

    constructor(props: IModernCommandBarProps) {
        super(props);

        this.config = new ModernCommandBarState(this.props.actions, this.props.views, this.props.onNewClicked,
            this.props.onSearch, this.props.onViewClicked, this.props.onDeleteClicked,
            this.props.selectedViewId, this.props.hideNew, this.props.hideDelete, this.props.hideSearch);

        reaction(() => this.props.hideDelete, (hideDelete) => {
            this.config.hideDelete = hideDelete;
        });

    }

    private renderSearch = () => {
        const searcvhValue = this.config.searchValue ? this.config.searchValue : "";

        return (
            <SearchBox placeholder={this.config.searchPlaceholder} value={searcvhValue}
                className={"modernSearchBox"} onSearch={this.config.onSearch} onClear={this.config.clearSearch}
                onEscape={this.config.clearSearch} />
        );
    }

    render() {

        const items = this.config.items.map(s => {
            if (s.key == "search") {
                s.onRender = this.renderSearch;
            }

            return s;
        });

        return (
            <CommandBar items={items} farItems={this.config.farItems} ></CommandBar>
        );
    }
}