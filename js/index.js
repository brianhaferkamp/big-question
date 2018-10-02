//---------------------------------------------------------
// cache the DOM
//---------------------------------------------------------

var answerToggle = $('.answer-toggle button');
var confirmation = $('.confirmation');
var answerBox = $('.answer-box');
var answerSubmit = $('.answer-submit');
var answersOutput = $('.answers-output');
var userInput = $('.user-input');
var submitButton = $('.submit-button');
var database;
var ref;


//---------------------------------------------------------
// answer toggle
//---------------------------------------------------------

answerToggle.on('click', function() {
  answerBox.toggleClass('hide');
});




//---------------------------------------------------------
// about nav
//---------------------------------------------------------

$('.about-trigger').on('click', function () {
  $('.about-nav').addClass('nav-slide');
});

$('.nav-close').on('click', function () {
  $('.about-nav').removeClass('nav-slide');
});


//---------------------------------------------------------
// to top button
//---------------------------------------------------------

$(window).scroll(function() {
  if ($(window).scrollTop() > 100) {
    $('.to-top').removeClass('hide');
  } else {
    $('.to-top').addClass('hide');
  }
});


//---------------------------------------------------------
// Initialize Firebase
//---------------------------------------------------------

// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "AIzaSyBF5EHOFZ2ks3WpAijseYZ39IsjkixXez8",
  authDomain: "the-big-questions.firebaseapp.com",
  databaseURL: "https://the-big-questions.firebaseio.com",
  projectId: "the-big-questions",
  storageBucket: "the-big-questions.appspot.com",
  messagingSenderId: "1061812161082"
};

firebase.initializeApp(config);


//---------------------------------------------------------
// Save data to db on answer submission
//---------------------------------------------------------

database = firebase.database();
ref = database.ref('answers');

answerSubmit.on('submit', function(e) {
  e.preventDefault();
  var data = {
    answer: userInput.val()
  }
  ref.push(data);  
  userInput.val('');
  answerBox.addClass('hide');
  
  answerToggle.addClass('hide');
  confirmation.removeClass('hide');
  $('.confirmation-close').on('click', function() {
    confirmation.fadeOut();
  });
  
  $('.answers-output').html('');
  ref.on('value', getData);
});


//---------------------------------------------------------
// get data from firebase
//---------------------------------------------------------

ref.on('value', getData);

function getData(data) {
  var answersOutput = $('.answers-output');
  var answers = data.val();
  
  $.each(answers, function(i, val) {
    var answer = val;
    var userAnswer = answer.answer;    
    answersOutput.prepend('<article><p class="answer">'+userAnswer+'</p></article>');       
  });
  
  var numberOfAnswers = answersOutput.find('article').length;
  // console.log(numberOfAnswers);
  var answerToggle = $('.answer-toggle button');
  if (numberOfAnswers == 0) {
    answerToggle.text('Be the first to answer');
  }
  $('.answers-header h2').text('Community answers (' + numberOfAnswers + ')');  
}


// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-126803862-1');