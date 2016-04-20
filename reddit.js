var request = require('request');
var inquirer = require('inquirer');

  //The menu
var menuChoices = [
  {name: 'Show homepage', value: 'HOMEPAGE'},
  {name: 'Show the homepage sorted posts', value: 'SORTED-HOMEPAGE'},
  {name: 'Show subreddit', value: 'SUBREDDIT'},
  {name: 'List subreddits', value: 'SUBREDDITS'},
  {name: 'Quit', value: 'QUIT'}
];


//The program
function reddit() {
//Menu
function Menu() {
  inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: 'What do you want to do?',
    choices: menuChoices
  }).then(
    function(choice) {
      if (choice.menu === 'HOMEPAGE') {
        getHomepage(function(res) {
          betterLog(res);
        });
      } else if (choice.menu === 'SORTED-HOMEPAGE') {
          SortedMenu();
      } else if (choice.menu === 'QUIT') {
        console.log("What, you're leaving already!");
      } else if (choice.menu === 'SUBREDDIT') {
        SubredditAsk();
      } else if (choice.menu === 'SUBREDDITS') {
        SubredditAsk2();
      }
    } 
  );

}
Menu();
}
reddit();

//Second Menu
var subMenuChoices = [
  {name: 'The latest posts', value: 'new'},
  {name: 'In progress stories', value: 'rising'},
  {name: 'The controversial posts', value: 'controversial'},
  {name: 'The greatest hits', value: 'top'},
];

function SortedMenu() {
inquirer.prompt({
  type: 'list',
  name: 'menu',
  message: 'Which subject do you want to pick?',
  choices: subMenuChoices
}).then(
  function(choice1) {
    getSortedHomepage(choice1.menu, function(res) {
          betterLog(res);
        });
  }
);
}

//Get homepage
function getHomepage(callback) {
  // Load reddit.com/.json and call back with the array of posts
    var address = "https://www.reddit.com/.json";
    request(address, function(err, result) {
        var resultObject = JSON.parse(result.body);
        var myOBJ = {};
        resultObject.data.children.forEach(function(post){
        myOBJ[post.data.title] = {
          score: post.data.score,
          author: post.data.author,
          url: post.data.url
        };
        
      });
      callback(myOBJ);
      reddit();
  }
)}


//Get sorted homepage
function getSortedHomepage(choice, callback) {
  // Load reddit.com/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
    var address = "https://www.reddit.com/" + choice + "/.json";
    request(address, function(err, result) {
        var resultObject = JSON.parse(result.body);
        var myOBJ = {};
        resultObject.data.children.forEach(function(post){
        myOBJ[post.data.title] = {
          score: post.data.score,
          author: post.data.author,
          url: post.data.url
        };
        
      });
      callback(myOBJ);
      reddit();
  }
);
}
//Subreddit
//Prompt
function SubredditAsk() {
var question = [
  {
    type: 'input',
    name: 'question',
    message: 'Which subreddit do you want to check?',
  }
];

inquirer.prompt(question).then(function (answers) {
        if (typeof answers.question === "string") {
          getSubreddit(answers.question, function(res) {
          betterLog(res);
        });
        } else {
          console.log("Sorry, you need to provide a name");
          SubredditAsk();
        }
});
}

function getSubreddit(subreddit, callback) {
//   // Load reddit.com/r/{subreddit}.json and call back with the array of posts
    var address = "https://www.reddit.com/r/" + subreddit + "/.json";
    request(address, function(err, result) {
        var resultObject = JSON.parse(result.body);
        var myOBJ = {};
        resultObject.data.children.forEach(function(post){
        myOBJ[post.data.title] = {
          score: post.data.score,
          author: post.data.author,
          url: post.data.url
        };
        
      });
      callback(myOBJ);
      reddit();
  }
);
  
}

//Sorted subreddits
//Third menu
var subMenuChoices2 = [
  {name: 'The latest posts', value: 'new'},
  {name: 'In progress stories', value: 'rising'},
  {name: 'The controversial posts', value: 'controversial'},
  {name: 'The greatest hits', value: 'top'},
];

function SubredditAsk2() {
  var question = [
    {
      type: 'input',
      name: 'question',
      message: 'Which subreddit do you want to check?',
  }
];

inquirer.prompt(question).then(function(answers) {
    if (typeof answers.question === "string") {
      var firstAnswer = answers.question;
      console.log(firstAnswer);
      SortedMenu2();

      function SortedMenu2() {
        inquirer.prompt({
          type: 'list',
          name: 'menu',
          message: 'Which section do you want to explore?',
          choices: subMenuChoices
        }).then(
          function(choice1) {
            getSortedSubreddit(firstAnswer, choice1.menu, function(res) {
              betterLog(res);
            });
          }
        );
      }
    }
    else {
      console.log("Sorry, you need to provide a name");
      SubredditAsk();
    }
  });
}


function getSortedSubreddit(subreddit, sortingMethod, callback) {
    var address = "https://www.reddit.com/r/" + subreddit + "/" + sortingMethod + "/.json";
    request(address, function(err, result) {
        var resultObject = JSON.parse(result.body);
        var myOBJ = {};
        resultObject.data.children.forEach(function(post){
        myOBJ[post.data.title] = {
          score: post.data.score,
          author: post.data.author,
          url: post.data.url
        };
        
      });
      callback(myOBJ);
      reddit();
  }
);
}

// /*
// This function should "return" all the popular subreddits
// */
// function getSubreddits(callback) {
//   // Load reddit.com/subreddits.json and call back with an array of subreddits
// }


//Function to expand on Objects within the console.log
function betterLog(value) {
  console.log(require('util').inspect(value, {
    depth: 20,
    colors: false
  }));
}

// Export the API
module.exports = {
  getHomepage : getHomepage,
  // getSortedHomepage:getSortedHomepage,
  // getSubreddit: getSubreddit,
  // getSortedSubreddit: getSortedSubreddit,
  // getSubreddits: getSubreddits
};