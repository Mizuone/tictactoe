"use strict"
$(document).ready(function() {
    var TicSpace = {};
    TicSpace = function() {
        var userPick,
            ticTacToeBoard = [ [0, 1, 2],
                               [0, 1, 2],
                               [0, 1, 2] ];
        
        
        
        
        $("#overlay").fadeIn(0, function() {
            $("#userlightbox").fadeIn("slow");
        });
        
        $(".firstuserbutton").on("click", function() {
            setFadeEvents("#overlay", "#userlight", "fadeout");
            setFadeEvents("#tictactoebox", false, "fadein");
            userPick = "X";
        });
        $(".seconduserbutton").on("click", function() {
            setFadeEvents("#overlay", "#userlight", "fadeout");
            setFadeEvents("#tictactoebox", false, "fadein");
            userPick = "O";
        });
        
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
