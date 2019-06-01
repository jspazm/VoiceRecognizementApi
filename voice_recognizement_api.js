var isEnabled = false;
var noteContent = '';
var noteTextarea = null;
var getId;
var areaById;
var showNoticeStart = 0;
var SpeechRecognition;
var recognition;

    try {
        SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
    } catch (e) {
        console.error(e);
        alert("TU NAVEGADOR NO SOPORTA LA FUNCION DE RECONOCIMIENTO DE VOZ.\n\
\n POR FAVOR, USA EL NAVEGADOR GOOGLE CHROME PARA HABILITARLA");
    }  
/* 
 * SINTESIS DE TEXTO
 * */

function initializeAPI(){
    
recognition.continuous = true;

recognition.onresult = function(event) {

  var current = event.resultIndex;
  
  var transcript = event.results[current][0].transcript;

  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    noteContent += transcript;
    noteTextarea.val(noteContent.toUpperCase());
  }
};
}



$('#btnVcRec').on('click', function(e){


    if (isEnabled != true && noteTextarea != null){
          
        if (noteContent.length) {
            noteContent += '. ';
        }
        if (showNoticeStart == 0){
            var r = confirm ("¿Desea activar la transcripción de voz a Texto?");
            if (r == true){
                alert("POR FAVOR, HABLA CLARO Y CONCISO PARA QUE EL SISTEMA HAGA EFECTIVA LA TRANSCRIPCIÓN POR RECONOCIMIENTO DE VOZ.")
                showNoticeStart = 1;
                
            }else{
                return;
            }
        }
        isEnabled = true;
        initializeAPI();
        recognition.start();
        btnVcRec.innerHTML = '<img src="resources/img/cargando.gif" width="20" height="20" />'; 
        
   }else if (isEnabled !== false){
       btnVcRec.innerHTML = '<i class="icon-bullhorn"></i>';
       recognition.stop();
       isEnabled = false;
    }else{
       alert("POR FAVOR, SELECCIONA UN CAMPO DE TEXTO PARA TRANSCRIBIR VOZ A TEXTO.");
       
   }
});


function initTextAreas(){
    $('textarea').on('click', function() {
        getId = $(this).attr('id');
        noteTextarea = $('#'+ getId);
        noteContent = noteTextarea.val();
    });
}
recognition.onspeechend = function() {
    isEnabled = false;
    if (!noteContent.length)
        noteContent= '';
    btnVcRec.innerHTML = '<i class="icon-bullhorn"></i>';
};