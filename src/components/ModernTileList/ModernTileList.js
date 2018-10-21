"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const mobx_react_1 = require("mobx-react");
require("./ModernTileList.module.css");
const FocusZone_1 = require("office-ui-fabric-react/lib/FocusZone");
const List_1 = require("office-ui-fabric-react/lib/List");
//import PlaceholderImage from '../../utilities/images/placeholder.svg';
const ROWS_PER_PAGE = 3;
const MAX_ROW_HEIGHT = 250;
let ModernTileList = class ModernTileList extends React.Component {
    //config: ModernDetailsListState;
    constructor(props) {
        super(props);
        this._getPageHeight = (itemIndex, surfaceRect) => {
            return this._rowHeight * ROWS_PER_PAGE;
        };
        this._getItemCountForPage = (itemIndex, surfaceRect) => {
            if (itemIndex === 0) {
                this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
                this._columnWidth = Math.floor(surfaceRect.width / this._columnCount);
                this._rowHeight = this._columnWidth;
            }
            return this._columnCount * ROWS_PER_PAGE;
        };
        this.itemClicked = (value) => {
            this.props.onSelectionChanged([value]);
        };
        this._onRenderCell = (item, index) => {
            return (React.createElement("div", { className: "msListGridExampleTile", "data-is-focusable": true, onClick: () => {
                    this.itemClicked(item.PsaId);
                }, style: {
                    width: (100 / this._columnCount) + '%'
                } },
                React.createElement("div", { className: "msListGridExampleSizer" },
                    React.createElement("div", { className: "msListGridExamplePadder" },
                        React.createElement("img", { src: item.PsaImage ? item.PsaImage : null, onError: (e) => {
                                console.log(e);
                                e.target.src = null;
                            }, className: "msListGridExampleImage" }),
                        React.createElement("span", { className: "msListGridExampleLabel" }, item.PsaTitle)))));
        };
        //this.config = new ModernDetailsListState(this.props.items, this.props.fields, this.props.onSelectionChanged);
        //reaction(() => this.props.items, (items) => {
        //    this.config.items = items;
        //});
        //reaction(() => this.props.fields, (fields) => {
        //    this.config.fields = fields;
        //});
    }
    render() {
        return (React.createElement(FocusZone_1.FocusZone, null,
            React.createElement(List_1.List, { items: this.props.items, className: "msListGridExample", getItemCountForPage: this._getItemCountForPage, onRenderCell: this._onRenderCell, getPageHeight: this._getPageHeight, renderedWindowsAhead: 4, onPageAdded: this.props.onNextPage })));
    }
};
ModernTileList = __decorate([
    mobx_react_1.observer
], ModernTileList);
exports.ModernTileList = ModernTileList;
//# sourceMappingURL=ModernTileList.js.map