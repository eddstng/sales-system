export default {
    methods: {
        getItemsFromString: function (searchString) {
            const correctedString = this.shortenCommonSubstringInSearchString(searchString.toUpperCase());
            const searchStringSplit = correctedString.split(" ");
            const suggestedItems = [];
            this.$store.state.items.forEach((v) => {
                if (!isNaN(searchString) && v.menu_id === parseInt(searchString)) {
                    suggestedItems.push(v);
                }
                if (
                    // customNameSplit.some(namePart => v.name_eng.toUpperCase().includes(namePart.toUpperCase()))
                    searchStringSplit.every((namePart) =>
                        v.name_eng.toUpperCase().includes(namePart.toUpperCase())
                    )
                ) {
                    suggestedItems.push(v);
                }
            });
            return suggestedItems
        },
        shortenCommonSubstringInSearchString: function (searchString) {
            const corrections = {
                "BLACK BEAN": "BB",
                "CHICKEN": "CHKN",
                "CHINESE": "CHN",
                "CHOW MEIN": "CM",
                "DEEP FRIED": "DF",
                "GREEN": "GRN",
                "HOUSE SPECIAL": "HS",
                "MIXED": "MX",
                "MUSHROOM": "MUSH",
                "SWEET AND SOUR": "SS",
                "VEGETABLES": "VEG",
            };
            let searchStringCopy = (' ' + searchString).slice(1);
            Object.keys(corrections).forEach((key) => {
                searchStringCopy = searchStringCopy.replaceAll(key, corrections[key]);
            });
            return searchStringCopy
        }
    },
};