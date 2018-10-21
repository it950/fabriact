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
const DetailsList_1 = require("office-ui-fabric-react/lib/DetailsList");
const ModernSpinner_1 = require("../ModernSpinner");
const ModernDetailsListState_1 = require("./ModernDetailsListState");
const mobx_1 = require("mobx");
const Fields_1 = require("../Fields");
const Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
const rxjs_1 = require("rxjs");
const Tooltip_1 = require("office-ui-fabric-react/lib/Tooltip");
const Sticky_1 = require("office-ui-fabric-react/lib/Sticky");
const ContextualMenu_1 = require("office-ui-fabric-react/lib/ContextualMenu");
const ModernFilterPanel_1 = require("../ModernFilterPanel");
const ModernViewItemPanel_1 = require("../ModernViewItemPanel");
let ModernDetailsList = class ModernDetailsList extends React.Component {
    constructor(props) {
        super(props);
        this.renderMissingItem = (index, rowProps) => {
            this.nextPageSubscription = rxjs_1.from(this.props.onNextPage()).subscribe();
            return (React.createElement(ModernSpinner_1.ModernSpinner, { size: Spinner_1.SpinnerSize.small }));
        };
        this.config = new ModernDetailsListState_1.default(this.props.items, this.props.currentViewItem, this.props.hasNextPage, this.props.fields, this.props.viewName, this.props.onSelectionChanged, this.props.onSortChanged, this.props.onFilterChanged, this.props.language);
        mobx_1.reaction(() => this.props.items, (items) => {
            this.config.items = items;
        });
        mobx_1.reaction(() => this.props.currentViewItem, (currentViewItem) => {
            this.config.currentViewItem = currentViewItem;
        });
        mobx_1.reaction(() => this.props.viewName, (viewName) => {
            this.config.viewName = viewName;
            this.config.currentFilters = [];
        });
        mobx_1.reaction(() => this.props.hasNextPage, (hasNextPage) => {
            this.config.hasNextPage = hasNextPage;
        });
        mobx_1.reaction(() => this.props.fields, (fields) => {
            this.config.fields = fields;
        });
    }
    componentWillUnmount() {
        if (this.nextPageSubscription) {
            this.nextPageSubscription.unsubscribe();
        }
    }
    render() {
        const result = this.config.items ? React.createElement("span", null,
            React.createElement(DetailsList_1.DetailsList, { items: this.config.listItems, selection: this.props.selection, columns: this.config.columns, selectionPreservedOnEmptyClick: true, setKey: this.props.idProperty, onColumnHeaderClick: this.config.columnClick, onRenderMissingItem: this.renderMissingItem, onRenderDetailsHeader: (detailsHeaderProps, defaultRender) => (React.createElement(Sticky_1.Sticky, { stickyPosition: Sticky_1.StickyPositionType.Header }, defaultRender(Object.assign({}, detailsHeaderProps, { onRenderColumnHeaderTooltip: (tooltipHostProps) => (React.createElement(Tooltip_1.TooltipHost, Object.assign({}, tooltipHostProps))) })))), onRenderItemColumn: (item, index, column) => {
                    //   if (item) {
                    //   const fieldContent = item[column.fieldName];
                    const schema = this.config.fields.find(a => a.key == column.key);
                    //    console.log(fieldContent);
                    //   console.log("wooshj");
                    // value = { fieldContent }
                    return (React.createElement(Fields_1.ModernDisplayField, { language: this.props.language, field: schema, item: item, onGetFieldValue: this.props.onGetFieldValue }));
                    //}
                    //else {
                    //    return (
                    //        <div></div>
                    //    );
                    //}
                } }),
            this.config.contextualHeaderMenuProps && (React.createElement(ContextualMenu_1.ContextualMenu, Object.assign({}, this.config.contextualHeaderMenuProps))))
            : React.createElement("span", null,
                React.createElement("br", null),
                React.createElement(ModernSpinner_1.ModernSpinner, { description: this.config.loadingText }));
        return (React.createElement("span", null,
            result,
            React.createElement(ModernViewItemPanel_1.ModernViewItemPanel, { item: this.config.currentViewItem, isVisible: this.config.currentViewItem, imageProperty: this.props.itemImageProperty, onDismiss: this.config.onDismissViewItemPanel, groups: this.props.viewItemGroups, authorProperty: this.props.itemAuthorProperty, onGetItem: this.props.onGetItem, language: this.props.language, colorProperty: this.props.itemColorProperty, onActionClick: this.props.onActionClicked, editorProperty: this.props.itemEditorProperty, onGetFieldValue: this.props.onGetFieldValue, actions: this.props.viewItemActions, onSaveNewAction: this.props.onSaveNewAction, getNewActionFieldGroups: this.props.getNewActionFieldGroups, getNewActionItem: this.props.getNewActionItem, getNewOptionFieldGroups: this.props.getNewOptionFieldGroups, onSaveNewOption: this.props.onSaveNewOption, getNewOptionItem: this.props.getNewOptionItem, createdProperty: this.props.itemCreatedProperty, modifiedProperty: this.props.itemModifiedProperty, onDeleteItem: this.props.onDeleteItem, resolveLookup: this.props.resolveLookup, resolveSuggestions: this.props.resolveSuggestions, onUpdateItem: this.props.onUpdateItem, titleProperty: this.props.itemTitleProperty, descriptionProperty: this.props.itemDescriptionProperty, secondaryDescriptionProperty: this.props.itemSecondaryDescriptionProperty }),
            React.createElement(ModernFilterPanel_1.ModernFilterPanel, { isVisible: this.config.currentFilterField != null, getFilterOptions: this.props.getFilterOptions, currentFilters: this.config.currentFilterPanelValues, language: this.props.language, field: this.config.currentFilterField, onDismiss: this.config.filterDismissed, onApply: this.config.onFilterApplied })));
    }
};
ModernDetailsList = __decorate([
    mobx_react_1.observer
], ModernDetailsList);
exports.ModernDetailsList = ModernDetailsList;
//# sourceMappingURL=ModernDetailsList.js.map