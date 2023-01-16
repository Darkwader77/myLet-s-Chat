var firebaseConfig = {
      apiKey: "AIzaSyBHNSmJJOxJucUtjzEL52AspuLh1inH3so",
      authDomain: "kwitter-592af.firebaseapp.com",
      databaseURL: "https://kwitter-592af-default-rtdb.firebaseio.com",
      projectId: "kwitter-592af",
      storageBucket: "kwitter-592af.appspot.com",
      messagingSenderId: "140718322369",
      appId: "1:140718322369:web:a9840b9df10b283dad9a40",
      
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    user_name=localStorage.getItem("user_name");
    room_name=localStorage.getItem("room_name");
function send(){
      message=document.getElementById("message").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:message,
            like:0
      });
      document.getElementById("message").value="";
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
console.log(firebase_message_id);
console.log(message_data);
name=message_data['name'];
message=message_data['message'];
like=message_data['like'];
name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
like_button="<button class='btn btn-warning' id="+firebase_message_id+"value="+like+" onclick='updateLike(this.id)'>"; 
span_with_tag="<span class='glyphicon glyphicon-thumbs-up'> Like: "+like+"</span></button><hr>";
row=name_with_tag+message_with_tag+like_button+span_with_tag;
document.getElementById("output").innerHTML=row;
//End code
      } });  }); }
getData();
function updateLike(message_id){
      console.log("clicked on liked button- "+message_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      update_likes=Number(likes)+1;
      console.log(update_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like:update_likes
      });
}
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}
