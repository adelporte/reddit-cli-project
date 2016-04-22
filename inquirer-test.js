//Modules
var request = require('request');
var inquirer = require('inquirer');
const imageToAscii = require("image-to-ascii");

var reddit = require('./lib/reddit');

//The main menu choices
var menuChoices = [
  {name: 'Show homepage', value: 'HOMEPAGE'},
  {name: 'Show the homepage sorted posts', value: 'SORTED-HOMEPAGE'},
  {name: 'Choose a subreddit', value: 'SUBREDDIT'},
  {name: 'Pick a subreddit with sorted posts', value: 'SUBREDDITS'},
  {name: 'Choose from a list of subreddits', value: 'SUBREDDITS-LIST'},
  {name: 'The top posts', value: 'TOP-POSTS'},
  new inquirer.Separator(),
  {name: 'Quit', value: 'QUIT'}
];

//The program/menu
function mainMenuFunc() {

  inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: 'What do you want to do?',
    choices: menuChoices
  }).then(
    function(choice) {
      //Homepage
      if (choice.menu === 'HOMEPAGE') {
        reddit.getHomepage(function(res) {
          var menuHomepage = res;
      inquirer.prompt({
        type: 'list',
        name: 'menu2',
        message: 'Which post would you like to read?',
        choices: menuHomepage
      }).then(
        function(choice) {
      reddit.displayPost(choice.menu2, function(converted) {console.log(converted)}, function(){mainMenuFunc()});
  }
);
        });
      } else if (choice.menu === 'SORTED-HOMEPAGE') {
          SortedMenu();
      } else if (choice.menu === 'QUIT') {
        console.log("What? You're already leaving!");
      } else if (choice.menu === 'SUBREDDIT') {
        SubredditAsk();
      } else if (choice.menu === 'SUBREDDITS') {
        SubredditAsk2();
      } else if (choice.menu === 'TOP-POSTS') {
        reddit.getTopPosts(function(res) {
          var menuTopPosts = res;
        inquirer.prompt({
        type: 'list',
        name: 'menu10',
        message: 'Which post would you like to read?',
        choices: menuTopPosts
      }).then(
        function(choice) {
        reddit.displayPost(choice.menu10, function(converted) {
          console.log(converted);
          mainMenuFunc();
        }, function(){
        mainMenuFunc();
        });
  }
);
        });
      //The subreddit lists
      } else if (choice.menu === 'SUBREDDITS-LIST') {
        
        reddit.getListOfSubreddits(function(res) {
          var newMenu = res;
          
          
        newMenu.push(new inquirer.Separator());
        newMenu.push({name: "Go back to the main menu", value: "main-menu"});
        newMenu.push(new inquirer.Separator());
        inquirer.prompt({
          type: 'list',
          name: 'menu2',
          message: 'Which subreddit would you like to check?',
          choices: newMenu
        }).then(
          //Go back to the main menu
      function(choice) {
        if (choice.menu2 === 'main-menu') {
          mainMenuFunc();
        }
        else {
          reddit.getSortedSubreddit2(choice.menu2, function(res) {
            console.log(res);
            mainMenuFunc();
        });
      }
    }
  );
        });
      }
    } 
  );

}
mainMenuFunc();

//Submenu - subreddits categories
var subMenuChoices = [
  {name: 'The latest posts', value: 'new'},
  {name: 'In progress stories', value: 'rising'},
  {name: 'The controversial posts', value: 'controversial'},
  {name: 'The greatest hits', value: 'top'},
  new inquirer.Separator(),
  {name: 'Go back to the main menu', value: 'main-menu'}
];

function SortedMenu() {
inquirer.prompt({
  type: 'list',
  name: 'menu',
  message: 'Which subject do you want to pick?',
  choices: subMenuChoices
}).then(
  function(choice1) {
    if(choice1.menu === 'new' || choice1.menu === 'rising' || choice1.menu === 'controversial' || choice1.menu === 'top' ) {
    reddit.getSortedHomepage(choice1.menu, function(res) {
      var newMenu = res;
      //The subreddit list
      inquirer.prompt({
        type: 'list',
        name: 'menu3',
        message: 'Which post would you like to read?',
        choices: newMenu
      }).then(function(choice) {
      reddit.displayPost(choice.menu3, function(converted) {
        console.log(converted);
        mainMenuFunc();
      }, function() {
          mainMenuFunc()
      });
  });
        });
    } else if (choice1.menu === 'main-menu') {
      mainMenuFunc();
    }
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
          reddit.getSubreddit(answers.question, function(res) {
          var result = res;
                inquirer.prompt({
        type: 'list',
        name: 'menu4',
        message: 'Which post would you like to read?',
        choices: result
      }).then(function(choice) {
      reddit.displayPost(choice.menu4, function(converted) {
        console.log(converted);
      }, function(){
        mainMenuFunc();
      });
  });
        });
    
});
}

//Sorted subreddits
//Third menu
var subMenuChoices2 = [
  {name: 'The latest posts', value: 'new'},
  {name: 'In progress stories', value: 'rising'},
  {name: 'The controversial posts', value: 'controversial'},
  {name: 'The greatest hits', value: 'top'},
  new inquirer.Separator(),
  {name: 'Go back to the main menu', value: 'main-menu'}
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

      var firstAnswer = answers.question;

        inquirer.prompt({
          type: 'list',
          name: 'menu',
          message: 'Which section do you want to explore?',
          choices: subMenuChoices
        }).then(
          function(choice1) {
            reddit.getSortedSubreddit(firstAnswer, choice1.menu, function(res) {
              var menu = res;
                inquirer.prompt({
        type: 'list',
        name: 'menu5',
        message: 'Which post would you like to read?',
        choices: menu
      }).then(function(choice) {
      reddit.displayPost(choice.menu5, function(converted) {
        console.log(converted);
        mainMenuFunc();
      }, function(){
        mainMenuFunc();
      });
  });
        
            });
          }
        );
    

  });
}

//Function to expand on Objects within the console.log
function betterLog(value) {
  console.log(require('util').inspect(value, {
    depth: 20,
    colors: false
  }));
}