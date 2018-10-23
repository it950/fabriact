"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_react_1 = require("mobx-react");
require("./ModernTileList.module.css");
var FocusZone_1 = require("office-ui-fabric-react/lib/FocusZone");
var List_1 = require("office-ui-fabric-react/lib/List");
//import PlaceholderImage from '../../utilities/images/placeholder.svg';
var ROWS_PER_PAGE = 3;
var MAX_ROW_HEIGHT = 250;
var ModernTileList = /** @class */ (function (_super) {
    __extends(ModernTileList, _super);
    //config: ModernDetailsListState;
    function ModernTileList(props) {
        var _this = _super.call(this, props) || this;
        _this._getPageHeight = function (itemIndex, surfaceRect) {
            return _this._rowHeight * ROWS_PER_PAGE;
        };
        _this._getItemCountForPage = function (itemIndex, surfaceRect) {
            if (itemIndex === 0) {
                _this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
                _this._columnWidth = Math.floor(surfaceRect.width / _this._columnCount);
                _this._rowHeight = _this._columnWidth;
            }
            return _this._columnCount * ROWS_PER_PAGE;
        };
        _this.itemClicked = function (value) {
            _this.props.onSelectionChanged([value]);
        };
        _this._onRenderCell = function (item, index) {
            return (React.createElement("div", { className: "msListGridExampleTile", "data-is-focusable": true, onClick: function () {
                    _this.itemClicked(item.PsaId);
                }, style: {
                    width: (100 / _this._columnCount) + '%'
                } },
                React.createElement("div", { className: "msListGridExampleSizer" },
                    React.createElement("div", { className: "msListGridExamplePadder" },
                        React.createElement("img", { src: item.PsaImage ? item.PsaImage : null, onError: function (e) {
                                console.log(e);
                                e.target.src = null;
                            }, className: "msListGridExampleImage" }),
                        React.createElement("span", { className: "msListGridExampleLabel" }, item.PsaTitle)))));
        };
        return _this;
        //this.config = new ModernDetailsListState(this.props.items, this.props.fields, this.props.onSelectionChanged);
        //reaction(() => this.props.items, (items) => {
        //    this.config.items = items;
        //});
        //reaction(() => this.props.fields, (fields) => {
        //    this.config.fields = fields;
        //});
    }
    ModernTileList.prototype.render = function () {
        return (React.createElement(FocusZone_1.FocusZone, null,
            React.createElement(List_1.List, { items: this.props.items, className: "msListGridExample", getItemCountForPage: this._getItemCountForPage, onRenderCell: this._onRenderCell, getPageHeight: this._getPageHeight, renderedWindowsAhead: 4, onPageAdded: this.props.onNextPage })));
    };
    ModernTileList = __decorate([
        mobx_react_1.observer
    ], ModernTileList);
    return ModernTileList;
}(React.Component));
exports.ModernTileList = ModernTileList;
//# sourceMappingURL=ModernTileList.js.map