// Initialize Firebase
var config = {
  apiKey: "AIzaSyAQ4pytq6FA-MyzDJC46ICUtEbeZhdkxEY",
  authDomain: "techsubmit19.firebaseapp.com",
  databaseURL: "https://techsubmit19.firebaseio.com",
  projectId: "techsubmit19",
  storageBucket: "techsubmit19.appspot.com",
  messagingSenderId: "795576738170"
};
firebase.initializeApp(config);
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});
var uid = "";
var email = "";
var photoURL = "";
var displayName = "";
var workshopDetails = "";

function showModal(modal) {
    $(modal).iziModal('open');
}

function payWorkshopFees() {
	const eventcode = 'techkriti19-accomodation-fees-434033';
	const payPrefill = {
		cq1: '123',	// custom question 1
		cq2: `+912134`,
		emailid: 'asdf@askdlfj.cm',
		name: 'name name'
	};
	payPrefill['eventcode'] = eventcode;
	popupWithAutoFill(payPrefill);
}
function payAccomodation() {
	const eventcode = 'techkriti19-434033';
	const payPrefill = {
		cq1: '123',	// custom question 1
		cq2: `+912134`,
		emailid: 'asdf@askdlfj.cm',
		name: 'name name'
	};
	payPrefill['eventcode'] = eventcode;
	popupWithAutoFill(payPrefill);
}
function dashboard(){
	Swal.fire({
  title: 'Are you sure?',
	html:'<img src="images/img40.png" id="photoURL" class="profile-pic"><div class="form-group"><label for="nm">Name</label><div class="input-group-prepend"><div class="input-group-text" disabled id="displayName">Name</div></div></div><div class="form-group"> <label for="email">E-mail</label><div class="input-group-prepend"><div class="input-group-text" disabled id="email">E-mail</div></div></div><div class="form-group"> <label for="city">City:</label> <input type="text" class="form-control" id="city"></div><div class="form-group"> <label for="college">College:</label> <input type="text" class="form-control" id="college"></div><div class="form-group"> <label for="phone">Phone Number:</label> <input type="text" class="form-control" id="phone"></div><p></p>',
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Register Me!'
}).then((result) => {
  if (result.value) {
  	postData();
  }
})
}

function registrationStep1(){
	Swal.fire({
		title: 'Accomadation Fee',
		text: 'Press the Button',
		type: 'info'
	})
}

function paymentStep1(){
	popup('echsummit-accomodation-fees-434033');
}
function postData(){
	 Swal.fire({
      title: 'Registration Successful',
      text: 'Your Registration has been completed successfuly. Procede for Payments',
      type: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Take me to Step 1',
      confirmButtonClass: 'tsbutton'
    }).then((result) => {
    	if(result.value) {
    		paymentStep1();
    	}
    })
	
  $.post("https://us-central1-techsubmit19.cloudfunctions.net/helloWorld/",
  {
    displayName: displayName,
    uid: uid,
    college: document.getElementById("college").value,
    email: email,
    photoURL: photoURL,
    phoneNumber: document.getElementById("phone").value
  },
  function(data,status){
    console.log(data);
    console.log(status);
    if(status == "success"){
    	 Swal.fire(
      'Deleted!',
      'Your file has been deleted.',
      'success'
    )
    }
  });
}

function getData(){
  $.get("https://us-central1-techsubmit19.cloudfunctions.net/helloWorld/registrations?uid="+uid,
  function(data,status){
  	var obj = JSON.parse(data);
    document.getElementById("college").value = obj.college;
    document.getElementById("phone").value = obj.phone;
    document.getElementById("city").value = obj.city;
  });
}

function toggleSignIn() {
	if (!firebase.auth().currentUser) {
	// [START createprovider]
	var provider = new firebase.auth.FacebookAuthProvider();
	// [END createprovider]
	// [START addscopes]
	// [END addscopes]
	// [START signin]
	firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  // [START_EXCLUDE]
	  document.getElementById('quickstart-oauthtoken').textContent = token;
	  // [END_EXCLUDE]
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // [START_EXCLUDE]
	  if (errorCode === 'auth/account-exists-with-different-credential') {
	    alert('You have already signed up with a different auth provider for that email.');
	    // If you are using multiple auth providers on your app you should handle linking
	    // the user's accounts here.
	  } else {
	    console.error(error);
	  }
	  // [END_EXCLUDE]
	});
	// [END signin]
	} else {
	// [START signout]
	firebase.auth().signOut();
	// [END signout]
	}
	// [START_EXCLUDE]
	document.getElementById('quickstart-sign-in').disabled = true;
	// [END_EXCLUDE]
}
// [END buttoncallback]

/**
* initApp handles setting up UI event listeners and registering Firebase auth listeners:
*  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
*    out, and that is where we update the UI.
*/
function initApp() {
// Listening for auth state changes.
// [START authstatelistener]
	firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
	  // User is signed in.
	  displayName = user.displayName;
	  email = user.email;
	  var emailVerified = user.emailVerified;
	  photoURL = user.photoURL;
	  var isAnonymous = user.isAnonymous;
	  uid = user.uid;
	  var providerData = user.providerData;
	  // [START_EXCLUDE]
	  document.getElementById('quickstart-sign-in').textContent = 'Log out';
	  document.getElementById('photoURL').src = photoURL;
	  document.getElementById('displayName').textContent = displayName;
	  document.getElementById("email").textContent = email;
	  console.log(email);
	  document.getElementById("submit").disabled = false;
	  getData();
	  // [END_EXCLUDE]
	} else {
	  // User is signed out.
	  // [START_EXCLUDE]
	  // document.getElementById('quickstart-sign-in').textContent = 'Continue With Facebook';
	  // document.getElementById("submit").disabled = true;
	  // [END_EXCLUDE]
	}
	// [START_EXCLUDE]
	document.getElementById('quickstart-sign-in').disabled = false;
	// [END_EXCLUDE]
	});
	// [END authstatelistener]

	document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
}

window.onload = function() {
	initApp();
};