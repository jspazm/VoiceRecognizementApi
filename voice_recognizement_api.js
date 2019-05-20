var isEnabled = false;
var noteContent = '';
var noteTextarea;
var getId;
var areaById;


try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
}catch(e){
    console.error(e);
    alert("TU NAVEGADOR NO SOPORTA LA FUNCION DE RECONOCIMIENTO DE VOZ.\n\
\n POR FAVOR, INSTALA EL NAVEGADOR GOOGLE CHROME PARA HABILITARLA");
}
/* 
 * SINTESIS DE TEXTO
 * */

function initializeAPI(){
    
recognition.continuous = false;

recognition.onresult = function(event) {

  var current = event.resultIndex;
  
  var transcript = event.results[current][0].transcript;

  var mobileRepeatBug = (current == 1 && transcript == event.results[0][0].transcript);

  if(!mobileRepeatBug) {
    noteContent += transcript;
    noteTextarea.val(noteContent);
  }
};

}



$('#btnVcRec').on('click', function(e){
   if (isEnabled != true){
        isEnabled = true;
        if (noteContent.length) {
            noteContent += '. ';
        }           
        initializeAPI();
        alert("POR FAVOR, HABLA CLARO Y CONCISO PARA QUE EL SISTEMA HAGA \n\n\
        EFECTIVA LA TRANSCRIPCIÓN POR RECONOCIMIENTO DE VOZ.");
        recognition.start(); 
   }else{
       isEnabled = false;
       recognition.stop();
   }
});

recognition.onspeechend = function() {
  isEnabled = false;
  if (!noteContent.length)
    noteContent= '';
};

$('textarea').on('click', function() {
   getId = $(this).attr('id');
   noteTextarea = $('#'+ getId);
   noteContent = noteTextarea.val();
   
});
