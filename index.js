var val;


 var valKey = []
 var signUp2;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $(".login-cover").hide();
    $("#loginDialog").hide();

    var dialog = document.querySelector('#loginDialog');
   var signUpCount = 0;
  var database = firebase.database();

    database.ref("Users").once('value', function(snapshot){
      var database = firebase.database();
        if(snapshot.exists()){
            var content = '';
            snapshot.forEach(function(data){
             
                 valKey[signUpCount] = data.key;
                val = data.val();
                signUpCount += 1;
                
                content +='<tr>';
               // content += '<td>' + signUpCount + '</td>';
                content += '<td>' + val.name + '</td>';
                content += '<td>' + val.email + '</td>';
                content += '<td>' + val.phone + '</td>';
                content += '<td>' + val.ticketType + '</td>';
                if(val.signedInFinal == undefined){
                  content += '<td >'  + '<button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" id="' + signUpCount + '" onclick="accept(this.id)">Check In</button> <p id="' +signUpCount+ '" hidden="true">Accepted</p>'+ '</td>';
                  
                  
                   
                 }
                 if(val.signedInFinal == "true"){
                   content += '<td>' + '<p id="' +signUpCount+1+ '" >Checked In</p>' + '</td>';
                 
                 }
                content += '<td>' + val.startup + '</td>';
                content += '<td> ' + '<a href =" ' + val.facebook +  ' ">' + "view" + '</a>' +  ' </td>';
               
                 


                content += '</tr>';
               
          
            });

            
            $('#ex-table').append(content);
        }
    });

  } else {

    $(".login-cover").show();

    // No user is signed in.
    var dialog = document.querySelector('#loginDialog');
    if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();

  }

  

});


/* LOGIN PROCESS */

$("#loginBtn").click(
  function(){


    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();

    if(email != "" && password != ""){
      $("#loginProgress").show();
      $("#loginBtn").hide();

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        $("#loginError").show().text(errorMessage);
        $("#loginProgress").hide();
        $("#loginBtn").show();
      });
    }
  }
);


/* LOGOUT PROCESS */

$("#signOutBtn").click(
  function(){

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
      alert(error.message);
    });

  }
);

function accept(clicked_id){

  var acceptKey = valKey[clicked_id-1];
   
  writeUserData(acceptKey,clicked_id)

}


function writeUserData(acceptKey, clicked_id) {
  firebase.database().ref('Users/' + acceptKey).update({
    signedInFinal: "true"
  });

    $("#"+clicked_id).remove();
    

           
//
}
