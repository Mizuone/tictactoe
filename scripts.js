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
        
            setInterval(function() {
                computerAI();
            }, 1);
            setInterval(function() {
                checkwinner("X");
                checkwinner("O");
            }, 100);
        
        
        $("#overlay").fadeIn(0, function() {
            $("#userlightbox").fadeIn("slow");
        });
        
        $("button.firstuserbutton").on("click", function() {
            userPick = "X";
            computerPick = "O";
            processFadeEvents();
            appendChoices();
        });
        $("button.seconduserbutton").on("click", function() {
            userPick = "O";
            computerPick = "X";
            processFadeEvents();
            appendChoices();
        });
        
        function checkwinner(XorO) {
            var boardPositions = 0;
            for (var i = 0; i < ticTacToeBoard.length; i++) {
                if (ticTacToeBoard[i] === XorO && ticTacToeBoard[i + 1] === XorO && ticTacToeBoard[i + 2] === XorO) {
                    showWinner(computerPick);
                    showWinner(userPick);
                }
            }
            for (var i = 0; i < ticTacToeBoard.length; i+= ticTacToeBoard.length) {
                if (ticTacToeBoard[i] === XorO && ticTacToeBoard[i + 3] === XorO && ticTacToeBoard[i + 6] === XorO) {
                    showWinner(computerPick);
                    showWinner(userPick);
                }
                if (ticTacToeBoard[i + 2] === XorO && ticTacToeBoard[i + 5] === XorO && ticTacToeBoard[i + 8] === XorO) {
                    showWinner(computerPick);
                    showWinner(userPick);
                }
                if (ticTacToeBoard[i] === XorO && ticTacToeBoard[i + 4] === XorO && ticTacToeBoard[i + 8] === XorO) {
                    showWinner(computerPick);
                    showWinner(userPick);
                }
                if (ticTacToeBoard[i + 2] === XorO && ticTacToeBoard[i + 4] === XorO && ticTacToeBoard[i + 6] === XorO) {
                    showWinner(computerPick);
                    showWinner(userPick);
                }
                if (ticTacToeBoard[i + 1] === XorO && ticTacToeBoard[i + 4] === XorO && ticTacToeBoard[i + 7] === XorO) {
                    showWinner(computerPick);
                    showWinner(userPick);
                }
                setTimeout(function() {
                    for (var i = 0; i < ticTacToeBoard.length; i++) {
                        if (typeof(ticTacToeBoard[i]) !== "number") {
                            boardPositions++;
                        }
                        if (boardPositions === ticTacToeBoard.length) {
                            $(".userpicktitle").html('<h1 class="text-center">' + "Tie!" + "</h1>" + '<p class="text-center">' + "Play Again?" + "</p>");
                            displayWinnerDialog();
                        }
                    }
                }, 100);
            }
            
            function showWinner(winner) {
                if (winner === XorO) {
                    $(".userpicktitle").html('<h1 class="text-center">' + "Winner: " + winner + "</h1>" + '<p class="text-center">' + "Play Again?" + "</p>");
                    displayWinnerDialog();
                }
            }
            function displayWinnerDialog() {
                    $("button.firstuserbutton").off().text("Yes");
                    $("button.seconduserbutton").off().text("No");
                    
                    $("button.firstuserbutton").on("click", function() {
                        location.reload();
                    });
                    $("button.seconduserbutton").on("click", function() {
                        window.history.back();
                    })
                    
                    setFadeEvents("#overlay", "#userlight", "fadein");
            }
            
        }
        function computerAI() {
                var computerTurn = true,
                    randomPosition = Math.floor((Math.random() * (innerSelections.length) - 1)),
                    noUserPick,
                    noComputerPick;
            if (turnCounter === 1) {
                    computerEither("X");
                    computerEither("O");
            }
            function computerEither(XorO) {
                if (computerPick === XorO && computerTurn) {
                            for (var i = randomPosition; randomPosition < innerSelections.length; randomPosition++) {
                                
                                noUserPick = !$(innerSelections[randomPosition]).hasClass("" + userPick + "");
                                noComputerPick = !$(innerSelections[randomPosition]).hasClass("" + computerPick + "");
                                
                                if (!noUserPick && !noComputerPick) {
                                    randomPosition = Math.floor((Math.random() * (innerSelections.length) - 1));
                                }
                                
                                if (noUserPick && noComputerPick) {
                                    $(innerSelections[randomPosition]).append("<p>" + computerPick + "</p>").addClass(computerPick);
                                    computerTurn = false;
                                    turnCounter = 0;
                                    recordPosition(innerSelections[randomPosition], computerPick);
                                    return;
                                }
                            }
                    }
            }
        }
        function recordPosition(object, userOrcomputer) {
                    var get;
            
                        for (var q = 0; q < innerSelections.length; q++) {
                            if ($(object).hasClass("" + q + "")) {
                                get = $.grep(object.className.split(" "), function(v, x){
                                    return v.indexOf(ticTacToeBoard[q]) === 0;
                                }).join();
                            }
                        }
                        for (var x = 0; x < ticTacToeBoard.length; x++) {
                            if (Number(get) === ticTacToeBoard[x] ) {
                                ticTacToeBoard[x] = userOrcomputer;
                             }
                        }
        }
        function addSelectionEvents() {
            for (var i = 0; i < innerSelections.length; i++) {
                
                innerSelections[i].classList.add(i);
                ticTacToeBoard.push(i);
                
                $(innerSelections[i]).on("click", function() {
                    if (turnCounter === 0) {
                        
                        recordPosition(this, userPick);
                        if (!$(this).hasClass("X") && !$(this).hasClass("O") ) {
                            
                            $(this).append("<p>" + userPick + "</p>");
                            $(this).addClass(userPick);
                        }
                        $(this).off();
                        
                        turnCounter++;
                    }
                });
            }
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
