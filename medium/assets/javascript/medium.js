/**
 * Hockey is the game. Make it happen.
 *
 * USEFUL RESOURCES
 * https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/JavaScript_basics
 * https://api.jquery.com/id-selector/
 * https://api.jquery.com/html/
 * https://api.jquery.com/css/
 * https://api.jquery.com/click/
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
 *
 * If you want to turn it into some other sport, have at it.
 *
 * Anyway, I have given you a basic HTML structure for a
 * BATTLE OF THE SPORTS GAME THING between these two rivals, and you
 * should make the page do what it needs to do, using your knowledge
 * of JS, HTML, CSS, and... sports.
 *
 * Here's what this 'game' should do:
 *
 * 1. Clicking a "SHOOT" button attempt to score against the opposing team.
 *   - shots have a random chance of succeeding or failing
 *   - number of shots taken should increase every click on the "SHOOT" button
 *   - number of hits obviously only increases when the shot is successful
 *
 * 2. Clicking the "RESET" button resets all the shot and score counters and
 * adds 1 to the number of resets
 *
 * 3. Any time a team shoots and scores change the background color of
 *    page to that teams color
 *
 * OPTIONAL STUFF:
 * - add logos of the two rivals below their name
 * - make the page just look better
 * - play a sound when someone clicks the "Shoot" button. You'll need to read about the <audio> element
 *   and how to use it in JS. You will also need to download a sound bite
 */

(function(){

  //jQuery equivelent to window.onload = function{}
  //code in here wont run until page loads
  $(function(){

    //make sure the page is loaded

        let reset = $("#reset");
        let resetCnt = $("#num-resets");
        let teamOneShoot = $("#teamone-shoot");
        let teamOneShots = $("#teamone-numshots");
        let teamOneHits = $("#teamone-numhits");
        let teamTwoShoot = $("#teamtwo-shoot");
        let teamTwoShots = $("#teamtwo-numshots");
        let teamTwoHits = $("#teamtwo-numhits");
        let fanFare = new Audio("assets/audio/fanfare_x.wav");
        let missed = new Audio("assets/audio/boing_x.wav");
        let resetSnd = new Audio("assets/audio/cash_register_x.wav")
        let pageHTML = $("html");

        // set all of the shot counters back to 0 when the reset button is hit
        reset.click(function () {
            teamOneShots.html(0);
            teamTwoShots.html(0);
            teamOneHits.html(0);
            teamTwoHits.html(0);
            resetCnt.html(parseInt(resetCnt.html()) + 1);
            resetSnd.play();
            pageHTML.css({"background-color": ""});
        });

        teamOneShoot.click(function () {
            if (checkShot(teamOneShots, teamOneHits)) {
                pageHTML.css({"background-color": "#c5050c"});
            };
            //            
        });

        teamTwoShoot.click(function () {
            if (checkShot(teamTwoShots, teamTwoHits)) {
                pageHTML.css({"background-color": "#ffcc33"});
            }
        });

        // common method that handles the shot button clicks
        function checkShot(shots, hits) {
            shots.html(parseInt(shots.html()) + 1);
            if (Math.random() > .6) {
                hits.html(parseInt(hits.html()) + 1);
                fanFare.play();
                return true;
            } else {
                missed.play();
                return false;
            }
        }

  })

})();
