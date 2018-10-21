import * as React from 'react';
import { IModernTileListProps } from './IModernTileListProps';
import { observer } from 'mobx-react';
import { DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { ModernSpinner } from '../ModernSpinner';
import './ModernTileList.module.css';
//import ModernDetailsListState from './ModernDetailsListState';
import { reaction } from 'mobx';
import { ModernDisplayField } from '../Fields';
import { IRectangle } from '@uifabric/utilities/lib';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
//import PlaceholderImage from '../../utilities/images/placeholder.svg';



const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 250;

@observer
export class ModernTileList extends React.Component<IModernTileListProps, any> {

    //config: ModernDetailsListState;

    constructor(props: IModernTileListProps) {
        super(props);

        //this.config = new ModernDetailsListState(this.props.items, this.props.fields, this.props.onSelectionChanged);

        //reaction(() => this.props.items, (items) => {
        //    this.config.items = items;
        //});

        //reaction(() => this.props.fields, (fields) => {
        //    this.config.fields = fields;
        //});
    }


    private _columnCount: number;
    private _columnWidth: number;

    private _rowHeight: number;

    private _getPageHeight = (itemIndex: number, surfaceRect: IRectangle) => {
        return this._rowHeight * ROWS_PER_PAGE;
    }

    private _getItemCountForPage = (itemIndex: number, surfaceRect: IRectangle) => {
        if (itemIndex === 0) {
            this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
            this._columnWidth = Math.floor(surfaceRect.width / this._columnCount);
            this._rowHeight = this._columnWidth;
        }

        return this._columnCount * ROWS_PER_PAGE;
    }

    private itemClicked = (value) => {
        this.props.onSelectionChanged([value]);
    }

    private _onRenderCell = (item: any, index: number | undefined): JSX.Element => {

        return (
            <div
                className={"msListGridExampleTile"}
                data-is-focusable={true}
                onClick={() => {
                    this.itemClicked(item.PsaId);
                }}
                style={{
                    width: (100 / this._columnCount) + '%'
                }}
            >
                <div className={"msListGridExampleSizer"}>
                    <div className={"msListGridExamplePadder"}>
                        <img src={item.PsaImage ? item.PsaImage : null} onError={(e: any) => {
                            console.log(e);
                            e.target.src = null;
                        }} className={"msListGridExampleImage"} />
                        <span className={"msListGridExampleLabel"}>
                            {item.PsaTitle}
                        </span>
                    </div>
                </div>
            </div>
        );
    }


    public render() {
        return (
            <FocusZone>
                <List items={this.props.items}
                    className={"msListGridExample"}
                    getItemCountForPage={this._getItemCountForPage}
                    onRenderCell={this._onRenderCell}
                    getPageHeight={this._getPageHeight}
                    renderedWindowsAhead={4}
                    onPageAdded={this.props.onNextPage} />
            </FocusZone>

        );


    }
}