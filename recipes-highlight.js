$(document).ready(function () {
    const searchInput = $("#recipeSearch");
    const recipeCards = $(".recipe-card");
    const searchCount = $("#searchCount");
    function removeHighlights() {
        recipeCards.find("mark").each(function () {
            $(this).replaceWith(document.createTextNode($(this).text()));
        });
        recipeCards.each(function () {
            this.normalize();
        });
    }

    function highlightText(element, searchText) {
        const regex = new RegExp(
            searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            "gi"
        );
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT
        );
        const textNodes = [];
        while (walker.nextNode()) {
            if (walker.currentNode.nodeValue.trim() !== "") {
                textNodes.push(walker.currentNode);
            }
        }

        let count = 0;
        textNodes.forEach(function (node) {
            const text = node.nodeValue;
            if (regex.test(text)) {
                regex.lastIndex = 0;
                const fragment = document.createDocumentFragment();
                let lastIndex = 0;
                let match;
                while ((match = regex.exec(text)) !== null) {
                    fragment.appendChild(
                        document.createTextNode(
                            text.substring(lastIndex, match.index)
                        )
                    );
                    const mark = document.createElement("mark");
                    mark.textContent = match[0];
                    fragment.appendChild(mark);
                    lastIndex = regex.lastIndex;
                    count++;
                }
                fragment.appendChild(
                    document.createTextNode(text.substring(lastIndex))
                );
                node.parentNode.replaceChild(fragment, node);
            }
        });
        return count;
    }

    searchInput.on("input", function () {
        const searchText = $(this).val().trim();
        removeHighlights();
        if (searchText === "") {
            searchCount.text("");
            return;
        }
        let totalMatches = 0;
        recipeCards.each(function () {
            totalMatches += highlightText(this, searchText);
        });

        if (totalMatches > 0) {
            searchCount.text("Found " + totalMatches + " matches");
        } else {
            searchCount.text("No matches found");
        }
    });
});