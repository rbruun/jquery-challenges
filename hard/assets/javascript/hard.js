/**
 * Given the HTML provided, please make the following changes with javascript – don't change any HTML!:
 *
 * USEFUL RESOURCES
 * https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics
 * https://api.jquery.com/id-selector/
 * https://api.jquery.com/html/
 * https://api.jquery.com/css/
 * https://api.jquery.com/click/
 * https://api.jquery.com/show/
 * https://api.jquery.com/hide/
 * https://api.jquery.com/remove/
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
 *
 * 1. Any time someone clicks on the title at the top "feed template,"
 *    make the color of the "feed template" text change from black to red
 *    and then from red to black when clicked again.
 *
 * 2. The links on the side of the page – "your name," "section 1," "section 2," etc. –
 *    hide every odd-numbered link in the menu.
 *
 * 3. Change every instance of the word "bacon" on the page to be "LASER VISION"
 *
 * 4. Delete the last two posts in the middle section (they have a CSS class "post"
 *
 * 5. Remove the images in the right column
 *
 * BONUS: add a special surprise inside!
 *
 */

(function () {

    //jQuery equivelent to window.onload = function{}
    //code in here wont run until page loads
    $(function () {

        // * 1. Any time someone clicks on the title at the top "feed template,"
        // *    make the color of the "feed template" text change from black to red
        // *    and then from red to black when clicked again.
        let feedTemplateText = $(".panel h1");
        //

        feedTemplateText.click(function () {
            if (feedTemplateText.css("color") == "rgb(255, 0, 0)") {
                feedTemplateText.css({
                    "color": "#000000"
                });
            } else {
                feedTemplateText.css({
                    "color": "#ff0000"
                });
            }

        })

        // * 2. The links on the side of the page – "your name," "section 1," "section 2," etc. –
        //    hide every odd-numbered link in the menu.
        $(".section-container .section:even").hide();

        // 3. Change every instance of the word "bacon" on the page to be "LASER VISION"
        $("p").each(function () {
            $(this).html($(this).html().replace("Bacon", 'LASER VISION'));
        });

        // 4. Delete the last two posts in the middle section (they have a CSS class "post"

        $(".post:last-of-type, .post:last-of-type + hr, .post:nth-last-of-type(2), .post:nth-last-of-type(2) + hr").hide();

        // 5. Remove the images in the right column
        $("aside img").hide();

        //         * BONUS: add a special surprise inside!

        // define the xml for the new div that will hold the movie titles
        let newStuff = "<div class='row'><p>List of movies produced by Studio Ghibli (from Studio Ghibli API)"

        // define the xml for the pop up div
        let popup = "<div class='popup' >" +
            "<div id='close'>X</div>" +
            "<div><span class='heading'>Title: </span> <span id='movieTitle'></span></div>" +
            "<div><span class='heading'>Director:</span> <span id='director'></span></div>" +
            "<div class='descriptionDiv'><span class='heading'>Description:</span> <span id='description'></span></div></div>";


        var items = [];
        // make a call to the web service to get the list of filem titles
        // to do: should be able to get jus the film titles returned, but haven't been able to get that to work yet
        $.getJSON("https://ghibliapi.herokuapp.com/films", function (data) {
            // put each of the film titles into an array
            $.each(data, function (idx, movie) {
                items.push("<li id=" + movie.id + " class='movie'>" + movie.title + "</li>");
            });
            // put the array of  movie names at the end of the div
            newStuff = newStuff + items.join("");
            newStuff = newStuff + "</div>";
            // place the movie listing after the header row
            $(".row:first").after(newStuff);
            // place the xml for the pop up before the header row, will be positioned with css
            $(".row:first").before(popup);
            // set the css for the various pop up elements
            $(".heading").css("font-weight", "bold");
            $(".popup").css({
                "width": "300px",
                "height": "275px",
                "background-color": "darkkhaki",
                "padding": "15px",
                "border": "3px solid chocolate",
                "border-radius": "5px",
                "position": "fixed",
                "top": "150px",
                "left": "500px",
                "z-index": "2",
                "visibility": "hidden"
            });
            $(".descriptionDiv").css({
                "overflow-y": "scroll",
                "overflow-x": "hidden",
                "height": "160px",
                "margin-top": "15px"
            });
            $("#close").css({
                "float": "right",
                "cursor": "pointer",
                "color": "red"
            });

        });

        // this event will be fired whenever a movie title is clicked
        $(document).on("click", ".movie", function () {

            let movieId = $(this).attr("id");
            // make an ajax call to the web service for the specific movie clicked
            // todo: should be able to ask for just the specific fields wanted, but haven't been able to get that to work yet
            $.getJSON("https://ghibliapi.herokuapp.com/films/" + movieId, function (data) {
                $("#movieTitle").text(data.title);
                $("#director").text(data.director);
                $("#description").text(data.description);
                $(".popup").css("visibility", "visible");
            });

        });

        $(document).on("click", "#close", function () {
            $(".popup").css("visibility", "hidden");
        })
    });

})();
