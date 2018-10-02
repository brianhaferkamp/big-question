var answerToggle = $('.answer-toggle button');
var answerBox = $('.answer-box');
var answerSubmit = $('.answer-submit');
var answersOutput = $('.answers-output');
var userInput = $('.user-input');
var submitButton = $('.submit-button');
var database;
var ref;


answerToggle.on('click', function() {
  answerBox.toggleClass('hide');
});

$('.about-trigger').on('click', function () {
  $('.about-nav').addClass('nav-slide');
});

$('.nav-close').on('click', function () {
  $('.about-nav').removeClass('nav-slide');
});


// Get the current date

// var fullDate = new Date();console.log(fullDate);
// var twoDigitMonth = fullDate.getMonth()+"";if(twoDigitMonth.length==1)	twoDigitMonth="0" +twoDigitMonth;
// var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1)	twoDigitDate="0" +twoDigitDate;
// var currentDate = twoDigitDate + "/" + twoDigitMonth + "/" + fullDate.getFullYear();console.log(currentDate);
// // output date to container above question
// date.text(currentDate);


// Initialize Firebase
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

database = firebase.database();
ref = database.ref('answers');

// Save data to db
answerSubmit.on('submit', function() {
  var data = {
    answer: userInput.val()
  }
  ref.push(data);  
  userInput.val('');
  answerBox.addClass('hide');
});

// get data from firebase
ref.on('value', getData);

function getData(data) {
  var answersOutput = $('.answers-output');
  // console.log(data.val());
  var answers = data.val();
  // var keys = Object.keys(answers);
  // console.log(answers);
  $.each(answers, function(i, val) {
    var answer = val;
    var userAnswer = answer.answer;
    
    answersOutput.prepend('<article><p class="answer">'+userAnswer+'</p></article>');
    
    var numberOfAnswers = answersOutput.find('article').length;
  console.log(numberOfAnswers);
  $('.answers-header h2').text('Community answers (' + numberOfAnswers + ')');
    
  });
  
  
  
}