$(document).ready(function () {

    console.log("jQuery is ready!");

    const searchInput = $("#menuSearchInput");

    const menuCards = $(".menu-item-card");

    const suggestionsList = $("#searchSuggestions");

    const noResults = $("#noResults");

    const ramenNames = [
        "Samyang Cheese Ramyen",
        "Shin Ramyen",
        "Buldak Ramyen",
        "Tteokbokki"
    ];


    /* TASK 1: REAL-TIME SEARCH AND LIVE FILTER */
    searchInput.on("input", function () {

        const searchText = $(this).val().toLowerCase().trim();

        // Filter the ramen cards
        const matchingCards = menuCards.filter(function () {

            const cardText = $(this).text().toLowerCase();

            return cardText.includes(searchText);

        });

        // Hide all cards
        menuCards.hide();

        // Show only matching cards
        matchingCards.show();

        // Show message if nothing is found
        if (matchingCards.length === 0) {
            noResults.show();
        } else {
            noResults.hide();
        }


        // TASK 2: AUTOCOMPLETE SEARCH SUGGESTIONS

        suggestionsList.empty();

        if (searchText !== "") {

            const matchingNames = ramenNames.filter(function (name) {

                return name.toLowerCase().includes(searchText);

            });

            matchingNames.forEach(function (name) {

                const suggestion = $("<li></li>").text(name);

                suggestionsList.append(suggestion);

            });

            if (matchingNames.length > 0) {
                suggestionsList.show();
            } else {
                suggestionsList.hide();
            }

        } else {
            suggestionsList.hide();
        }

    });


    // Select a suggestion
    suggestionsList.on("click", "li", function () {

        const selectedName = $(this).text();

        searchInput.val(selectedName);

        // Trigger search again
        searchInput.trigger("input");

        // Hide suggestions
        suggestionsList.hide();

    });


    // Hide suggestions when clicking outside
    $(document).on("click", function (event) {

        if (!$(event.target).closest(".menu-search").length) {
            suggestionsList.hide();
        }

    });

});