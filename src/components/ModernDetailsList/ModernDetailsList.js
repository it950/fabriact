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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var mobx_react_1 = require("mobx-react");
var DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
var ModernSpinner_1 = require("../ModernSpinner");
var ModernDetailsListState_1 = require("./ModernDetailsListState");
var mobx_1 = require("mobx");
var Fields_1 = require("../Fields");
var Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
var rxjs_1 = require("rxjs");
var Tooltip_1 = require("office-ui-fabric-react/lib/Tooltip");
var Sticky_1 = require("office-ui-fabric-react/lib/Sticky");
var ContextualMenu_1 = require("office-ui-fabric-react/lib/ContextualMenu");
var ModernFilterPanel_1 = require("../ModernFilterPanel");
var ModernViewItemPanel_1 = require("../ModernViewItemPanel");
var ModernDetailsList = /** @class */ (function (_super) {
    __extends(ModernDetailsList, _super);
    function ModernDetailsList(props) {
        var _this = _super.call(this, props) || this;
        _this.renderMissingItem = function (index, rowProps) {
            _this.nextPageSubscription = rxjs_1.from(_this.props.onNextPage()).subscribe();
            return (React.createElement(ModernSpinner_1.ModernSpinner, { size: Spinner_1.SpinnerSize.small }));
        };
        _this.config = new ModernDetailsListState_1.default(_this.props.items, _this.props.currentViewItem, _this.props.hasNextPage, _this.props.fields, _this.props.viewName, _this.props.onSelectionChanged, _this.props.onSortChanged, _this.props.onFilterChanged, _this.props.language);
        mobx_1.reaction(function () { return _this.props.items; }, function (items) {
            _this.config.items = items;
        });
        mobx_1.reaction(function () { return _this.props.currentViewItem; }, function (currentViewItem) {
            _this.config.currentViewItem = currentViewItem;
        });
        mobx_1.reaction(function () { return _this.props.viewName; }, function (viewName) {
            _this.config.viewName = viewName;
            _this.config.currentFilters = [];
        });
        mobx_1.reaction(function () { return _this.props.hasNextPage; }, function (hasNextPage) {
            _this.config.hasNextPage = hasNextPage;
        });
        mobx_1.reaction(function () { return _this.props.fields; }, function (fields) {
            _this.config.fields = fields;
        });
        return _this;
    }
    ModernDetailsList.prototype.componentWillUnmount = function () {
        if (this.nextPageSubscription) {
            this.nextPageSubscription.unsubscribe();
        }
    };
    ModernDetailsList.prototype.render = function () {
        var _this = this;
        var result = this.config.items ? React.createElement("span", null,
            React.createElement(DetailsList_1.DetailsList, { items: this.config.listItems, selection: this.props.selection, columns: this.config.columns, selectionPreservedOnEmptyClick: true, setKey: this.props.idProperty, onColumnHeaderClick: this.config.columnClick, onRenderMissingItem: this.renderMissingItem, onRenderDetailsHeader: function (detailsHeaderProps, defaultRender) { return (React.createElement(Sticky_1.Sticky, { stickyPosition: Sticky_1.StickyPositionType.Header }, defaultRender(__assign({}, detailsHeaderProps, { onRenderColumnHeaderTooltip: function (tooltipHostProps) { return (React.createElement(Tooltip_1.TooltipHost, __assign({}, tooltipHostProps))); } })))); }, onRenderItemColumn: function (item, index, column) {
                    var schema = _this.config.fields.find(function (a) { return a.key == column.key; });
                    return (React.createElement(Fields_1.ModernDisplayField, { language: _this.props.language, field: schema, item: item, placeholderImage: _this.props.placeholderImage, onGetFieldValue: _this.props.onGetFieldValue }));
                } }),
            this.config.contextualHeaderMenuProps && (React.createElement(ContextualMenu_1.ContextualMenu, __assign({}, this.config.contextualHeaderMenuProps))))
            : React.createElement("span", null,
                React.createElement("br", null),
                React.createElement(ModernSpinner_1.ModernSpinner, { description: this.config.loadingText }));
        return (React.createElement("span", null,
            result,
            React.createElement(ModernViewItemPanel_1.ModernViewItemPanel, { item: this.config.currentViewItem, isVisible: this.config.currentViewItem != null, imageProperty: this.props.itemImageProperty, onDismiss: this.config.onDismissViewItemPanel, groups: this.props.viewItemGroups, authorProperty: this.props.itemAuthorProperty, onGetItem: this.props.onGetItem, language: this.props.language, colorProperty: this.props.itemColorProperty, onActionClick: this.props.onActionClicked, editorProperty: this.props.itemEditorProperty, onGetFieldValue: this.props.onGetFieldValue, actions: this.props.viewItemActions, placeholderImage: this.props.placeholderImage, hideDelete: this.props.hideDelete, renderCustomAction: this.props.renderCustomAction, onSaveNewAction: this.props.onSaveNewAction, getNewActionFieldGroups: this.props.getNewActionFieldGroups, getNewActionItem: this.props.getNewActionItem, getNewOptionFieldGroups: this.props.getNewOptionFieldGroups, onSaveNewOption: this.props.onSaveNewOption, getNewOptionItem: this.props.getNewOptionItem, createdProperty: this.props.itemCreatedProperty, modifiedProperty: this.props.itemModifiedProperty, onDeleteItem: this.props.onDeleteItem, resolveLookup: this.props.resolveLookup, resolveSuggestions: this.props.resolveSuggestions, onUpdateItem: this.props.onUpdateItem, titleProperty: this.props.itemTitleProperty, descriptionProperty: this.props.itemDescriptionProperty, secondaryDescriptionProperty: this.props.itemSecondaryDescriptionProperty }),
            React.createElement(ModernFilterPanel_1.ModernFilterPanel, { isVisible: this.config.currentFilterField != null, getFilterOptions: this.props.getFilterOptions, currentFilters: this.config.currentFilterPanelValues, language: this.props.language, field: this.config.currentFilterField, onDismiss: this.config.filterDismissed, onApply: this.config.onFilterApplied })));
    };
    ModernDetailsList = __decorate([
        mobx_react_1.observer
    ], ModernDetailsList);
    return ModernDetailsList;
}(React.Component));
exports.ModernDetailsList = ModernDetailsList;
//# sourceMappingURL=ModernDetailsList.js.map