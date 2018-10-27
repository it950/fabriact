import LocalizedStrings from 'react-localization';

export default class locales {

    public strings: any;

    constructor(language = null) {

        this.strings = new LocalizedStrings({
            en: {
                previous: "Back",
                next: "Next",
                new: "New",
                edit: "Edit",
                save: "Save",
                search: "Search",
                back: "Back",
                more: "more...",
                delete: "Delete",
                add: "Add",
                apply: "Apply",
                export: "Export",
                filterBy: "Filter by",
                itemCreated: "Item created",
                askRedirect: "Would you like to view the item now?",
                clearFilters: "Clear filters",
                clearAll: "Clear all",
                loading: "Loading...",
                modifiedByLabel: "Modified {0} by {1}",
                createdByLabel: "Created {0} by {1}",
                sortOnTextAscending: "A to Z",
                sortOnTextDescending: "Z to A",
                sortOnDateAscending: "Older to newer",
                sortOnDateDescending: "Newer to older",
                loadingView: "Loading {0}...",
                cancel: "Cancel",
                empty: "(Empty)",
                yes: "Yes",
                no: "No",
                confirmDeleteTitle: "Delete {0} item(s)",
                confirmDeleteText: "{0} item(s) will be deleted. Are you sure?",
                newItem: "New item",
                searchPlaceholder: "Search...",
                emailNotValid: "{0} is not a valid email address",
                phoneNotValid: "{0} is not a valid phone number",
                numberNotValid: "{0} is not a valid number",
                loginNotValid: "{0} is not valid",
                requiredField: "{0} is required",
                finish: "Finish"
            },
            nl: {
                newItem: "Nieuw item",
                new: "Nieuw",
                edit: "Wijzig",
                more: "meer...",
                apply: "Toepassen",
                empty: "(Leeg)",
                add: "Toevoegen",
                back: "Terug",
                itemCreated: "Item gemaakt",
                askRedirect: "Wil je het item nu bekijken?",
                filterBy: "Filteren op",
                clearFilters: "Filters wissen",
                clearAll: "Alles wissen",
                export: "Export",
                sortOnTextAscending: "A tot Z",
                sortOnTextDescending: "Z tot A",
                sortOnDateAscending: "Oud naar nieuw",
                sortOnDateDescending: "Nieuw naar oud",
                search: "Zoeken",
                save: "Opslaan",
                delete: "Verwijderen",
                modifiedByLabel: "{0} gewijzigd door {1}",
                createdByLabel: "{0} gemaakt door {1}",
                cancel: "Annuleren",
                loading: "Laden...",
                loadingView: "{0} laden...",
                confirmDeleteTitle: "Verwijder {0} item(s)",
                confirmDeleteText: "{0} item(s) worden verwijderd. Weet je het zeker?",
                yes: "Ja",
                no: "Nee",
                searchPlaceholder: "Zoeken...",
                emailNotValid: "{0} is geen geldig email adres",
                phoneNotValid: "{0} is geen geldig telefoonnummer",
                numberNotValid: "{0} is geen geldig nummer",
                loginNotValid: "{0} is ongeldig",
                requiredField: "{0} is verplicht",
                previous: "Vorige",
                next: "Volgende",
                finish: "Opslaan"
            }
        });

        if (language == "nl-NL") {
            this.strings.setLanguage("nl");
        }
        else {
            this.strings.setLanguage("en");

        }
    }

    //public strings = new LocalizedStrings({
    //    en: {
    //        previous: "Back",
    //        next: "Next",
    //        finish: "Finish"
    //    },
    //    nl: {
    //        previous: "Vorige",
    //        next: "Volgende",
    //        finish: "Opslaan"
    //    }
    //});
}
