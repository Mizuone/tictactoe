"use strict"
$(document).ready(function() {
    var TicSpace = {};
    TicSpace = function() {
        var userPick,
            computerPick,
            ticTacToeBoard = [],
            innerSelections = document.querySelectorAll(".append"),
            turnCounter = 0;
            addSelectionEvents();
            //push userpick to tictactoe array
            //append computerchoice to tictactoe board
            setInterval(function() {
                computerAI();
            }, 1000);
        
        
        
        $("#overlay").fadeIn(0, function() {
            $("#userlightbox").fadeIn("slow");
        });
        
        $(".firstuserbutton").on("click", function() {
            userPick = "X";
            computerPick = "O";
            processFadeEvents();
            appendChoices();
        });
        $(".seconduserbutton").on("click", function() {
            userPick = "O";
            computerPick = "X";
            processFadeEvents();
            appendChoices();
        });
        function computerAI() {
            if (turnCounter === 1) {
                var computerTurn = true;
                for (var x = 0; x < ticTacToeBoard.length; x++) {
                    if (computerPick === "O" && ticTacToeBoard[x] !== "X") {
                        if (computerTurn) {
                            for (var i = 0; i < innerSelections[i]; i++) {
                                
                            }
                        }
                        ticTacToeBoard[x] = computerPick;
                    }
                    if (computerPick === "X" && ticTacToeBoard[x] !== "O") {
                        ticTacToeBoard[x] = computerPick;
                    }
                    console.log(ticTacToeBoard);
                }
                turnCounter = 0;
            }
        }
        function addSelectionEvents() {
            for (var i = 0; i < innerSelections.length; i++) {
                
                innerSelections[i].classList.add(i);
                ticTacToeBoard.push(i);
                
                $(innerSelections[i]).on("click", function() {
                    if (turnCounter === 0) {
                        
                        var get;
                    
                        for (var q = 0; q < innerSelections.length; q++) {
                            if ($(this).hasClass("" + q + "")) {
                                get = $.grep(this.className.split(" "), function(v, x){
                                    return v.indexOf(ticTacToeBoard[q]) === 0;
                                }).join();
                            }
                        }
                        $(this).append("<p>" + userPick + "</p>");
                        
                        for (var x = 0; x < ticTacToeBoard.length; x++) {
                            if (get == ticTacToeBoard[x] ) {
                                ticTacToeBoard[x] = userPick;
                             }
                        }
                        turnCounter++;
                    }
                });
            }
            //console.log(ticTacToeBoard);
        }
        function appendChoices() {
            $(".playerchoice").append(userPick).css({color: "aqua",
                                                     textShadow: "0 0 5px black"});
            $(".computerchoice").append(computerPick).css({color: "red",
                                                     textShadow: "0 0 5px black"});
        }
        function processFadeEvents() {
            setFadeEvents("#overlay", "#userlight", "fadeout");
            setFadeEvents("#tictactoebox", false, "fadein");
            setFadeEvents("#gamestats", false, "fadein");
        }
        function setFadeEvents(firstObject, secondObject, fadeinOrfadeOut) {
            if (fadeinOrfadeOut === "fadeout") {
                $(firstObject).fadeOut("slow", function() {
                    if (secondObject == true) {
                        $(secondObject).fadeOut("slow");
                    }
                });
            } else {
                $(firstObject).fadeIn("slow", function() {
                    if (secondObject == true) {
                        $(secondObject).fadeIn("slow");
                    }
                });  
            }
        }
    }
   TicSpace();
});
