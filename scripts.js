"use strict"
$(document).ready(function() {
    var TicSpace = {};
    
    TicSpace = function() {
        
        var userPick,
            computerPick,
            ticTacToeBoard = [],
            innerSelections = document.querySelectorAll(".append"),
            turnCounter = 0,
            runOnce = true,
            tieGame = false;
            addSelectionEvents();
        
            setInterval(function() {
                    computerAI();
                    tie();
                    checkwinner("X");
                    checkwinner("O");
            }, 1);
        
        
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
        
        function tie() {
            var boardPositions = 0;
            for (var i = 0; i < 9; i++) {
                if (typeof(ticTacToeBoard[i]) !== "number") {
                    boardPositions++;
                }
                if (boardPositions === 9) {
                        $(".userpicktitle").html('<h1 class="text-center">' + "Tie!" + "</h1>" + '<p class="text-center">' + "Play Again?" + "</p>");
                        displayWinnerDialog();
                }
            }
        }
        function checkwinner(XorO) {
            //check row position
            for (var i = 0; i <= 6; i += 3) {
                if (ticTacToeBoard[i] === XorO && ticTacToeBoard[i + 1] === XorO && ticTacToeBoard[i + 2] === XorO) {
                    showWinner(computerPick);
                    showWinner(userPick);
                }
            }
            //check column position
            for (var i = 0; i <= 2; i += 2 ) {
                if (ticTacToeBoard[i] === XorO && ticTacToeBoard[i + 3] === XorO && ticTacToeBoard[i + 6] === XorO) {
                    showWinner(computerPick);
                    showWinner(userPick);
                }
                if (ticTacToeBoard[i + 1] === XorO && ticTacToeBoard[i + 4] === XorO && ticTacToeBoard[i + 7] === XorO) {
                    showWinner(computerPick);
                    showWinner(userPick);
                }
            }
            
            
            //check diagonals postions 
            for (var i = 0, x = 4; i <= 2; i += 2, x -= 2) {
                if (ticTacToeBoard[i] === XorO && ticTacToeBoard[i + x] === XorO && ticTacToeBoard[i + x * 2] === XorO) {
                    showWinner(computerPick);
                    showWinner(userPick);
                }
                
            }
            function showWinner(winner) {
                if (winner === XorO) {
                    $(".userpicktitle").html('<h1 class="text-center">' + "Winner: " + winner + "</h1>" + '<p class="text-center">' + "Play Again?" + "</p>");
                    displayWinnerDialog();
                }
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
        function computerAI() {
                var computerTurn = true,
                    randomPosition = Math.floor((Math.random() * innerSelections.length)),
                    noUserPick,
                    noComputerPick;
            
            if (turnCounter === 1) {
                    computerEither("X");
                    computerEither("O");
            }
            function computerEither(XorO) {
            if (computerPick === XorO && computerTurn) {
                    if (runOnce) {
                        for (var i = 0; i < 9; i++) {
                                if ($(innerSelections[i]).hasClass(userPick)) {
                                    var firstMove = Math.floor(Math.random() * 1 + 1);
                                    if (firstMove === 0) {
                                        computerAppend(i + Math.floor(Math.random() * 4 + 1));
                                         runOnce = false;
                                        return;
                                    }
                                    if (i > 4 && firstMove === 1) {
                                        computerAppend(i + Math.floor(Math.random() * -2 - 1));
                                        runOnce = false;
                                        return;
                                    }
                                }
                            }
                        }
                            for (var i = randomPosition; randomPosition < innerSelections.length;) {
                                $(innerSelections[randomPosition]).remove("p:even");
                                if (randomPosition < 0) {
                                    randomPosition++;
                                }
                                noUserPick = !$(innerSelections[randomPosition]).hasClass("" + userPick + "");
                                noComputerPick = !$(innerSelections[randomPosition]).hasClass("" + computerPick + "");
                                
                                if (!noUserPick || !noComputerPick) {
                                    randomPosition = Math.floor((Math.random() * innerSelections.length));
                                    return;
                                }
                                
                                if (noUserPick && noComputerPick) {
                                    computerAppend(randomPosition);
                                    return;
                                }
                            }
                    }
            }
            function computerAppend(position) {
                $(innerSelections[position]).append("<p>" + computerPick + "</p>").addClass(computerPick);
                computerTurn = false;
                turnCounter = 0;
                recordPosition(innerSelections[position], computerPick);
                
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
                    if (turnCounter === 0 && !$(this).hasClass(computerPick)) {
                        
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
