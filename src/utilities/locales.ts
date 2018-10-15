import LocalizedStrings from 'react-localization';

export default class locales {

    public strings: any;

    constructor(language = null) {

        this.strings = new LocalizedStrings({
            en: {
                previous: "Back",
                next: "Next",
                new: "New",
                delete: "Delete",
                cancel: "Cancel",
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
                delete: "Verwijderen",
                cancel: "Annuleren",
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
