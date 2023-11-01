$(document).ready(function(){

    var validation = false;
    var myTimeoutId = null;


    $('#info').onclick = function() {
        $('#console').style.display = "block";
        console.log("hello");
    }
    $('#close').onclick = function() {
        $('#console').style.display = "none";
    }

    var config = {
        mode: "text/html",
        extraKeys: {"Ctrl-Space": "autocomplete"},
        lineNumbers: true,
        keyMap:"sublime",
        tabSize:4,
    };
    // initialize editor
    var editor = CodeMirror.fromTextArea(document.getElementById('editor'),config);
    editor.setOption("theme", "material-ocean");

	function loadHtml(html) {
		const document_pattern = /( )*?document\./i;
		let finalHtml = html.replace(document_pattern, "document.getElementById('result').contentWindow.document.");
		$('#result').contents().find('html').html(finalHtml);
	}

	loadHtml($('#editor').val());

    editor.on('change',function(cMirror){

        if (myTimeoutId!==null) {
            clearTimeout(myTimeoutId);
        }
        myTimeoutId = setTimeout(function() {

                try{

                    loadHtml(cMirror.getValue());

                }catch(err){

                    console.log('err:'+err);

                }


            }, 1000);

        });

});

// JavaScript for showing the popup
function togglePopup() {
    var popup = document.getElementById("popup");
    if (popup.style.display === "block") {
        popup.style.display = "none";
    } else {
        popup.style.display = "block";
    }
}

// JavaScript for hiding the popup
function closePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}
