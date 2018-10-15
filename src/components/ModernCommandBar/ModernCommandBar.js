"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const CommandBar_1 = require("office-ui-fabric-react/lib/CommandBar");
require("./ModernCommandBar.module.css");
const SearchBox_1 = require("office-ui-fabric-react/lib/SearchBox");
const mobx_react_1 = require("mobx-react");
const ModernCommandBarState_1 = require("./ModernCommandBarState");
const mobx_1 = require("mobx");
let ModernCommandBar = class ModernCommandBar extends React.Component {
    constructor(props) {
        super(props);
        this.renderSearch = () => {
            const searcvhValue = this.config.searchValue ? this.config.searchValue : "";
            return (React.createElement(SearchBox_1.SearchBox, { placeholder: this.config.searchPlaceholder, value: searcvhValue, className: "modernSearchBox", onSearch: this.config.onSearch, onClear: this.config.clearSearch, onEscape: this.config.clearSearch }));
        };
        this.config = new ModernCommandBarState_1.default(this.props.actions, this.props.views, this.props.onNewClicked, this.props.onSearch, this.props.onViewClicked, this.props.onDeleteClicked, this.props.selectedViewId, this.props.hideNew, this.props.hideDelete, this.props.hideSearch);
        mobx_1.reaction(() => this.props.hideDelete, (hideDelete) => {
            this.config.hideDelete = hideDelete;
        });
    }
    render() {
        const items = this.config.items.map(s => {
            if (s.key == "search") {
                s.onRender = this.renderSearch;
            }
            return s;
        });
        return (React.createElement(CommandBar_1.CommandBar, { items: items, farItems: this.config.farItems }));
    }
};
ModernCommandBar = __decorate([
    mobx_react_1.observer
], ModernCommandBar);
exports.ModernCommandBar = ModernCommandBar;
//# sourceMappingURL=ModernCommandBar.js.map