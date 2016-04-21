var request = require('request');
var inquirer = require('inquirer');

  //The menu
var menuChoices = [
  {name: 'Show homepage', value: 'HOMEPAGE'},
  {name: 'Show the homepage sorted posts', value: 'SORTED-HOMEPAGE'},
  {name: 'Choose a subreddit', value: 'SUBREDDIT'},
  {name: 'Choose a subreddits with sorted posts', value: 'SUBREDDITS'},
  {name: 'Choose from a list of subreddits', value: 'SUBREDDITS-LIST'},
  {name: 'The top posts', value: 'TOP-POSTS'},
  new inquirer.Separator(),
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
        console.log("What? You're already leaving!");
      } else if (choice.menu === 'SUBREDDIT') {
        SubredditAsk();
      } else if (choice.menu === 'SUBREDDITS') {
        SubredditAsk2();
      } else if (choice.menu === 'TOP-POSTS') {
        getTopPosts(function(res) {
          betterLog(res);
        });
      } else if (choice.menu === 'SUBREDDITS-LIST') {
        getListOfSubreddits(function(res) {
          var newMenu = res;
        newMenu.push(new inquirer.Separator());
        newMenu.push({name: "Go back to the main menu", value: "main-menu"});
        newMenu.push(new inquirer.Separator());
          SortedMenu();
function SortedMenu() {
inquirer.prompt({
  type: 'list',
  name: 'menu2',
  message: 'Which subreddit would you like to check?',
  choices: newMenu
}).then(
  function(choice) {
    if(choice.menu2 === 'main-menu'){
      Menu();
    } else {
    getSortedSubreddit2(choice.menu2, function(res){console.log(res)});
    }
  }
);
}
          
          
        });
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
    if(choice1 === 'new' || 'rising' || 'controversial' || 'top') {
    getSortedHomepage(choice1.menu, function(res) {
          betterLog(res);
        });
    } else if (choice1 === 'main-menu') {
      reddit();
    }
  }
);
}

//Get homepage FUNCTION
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


//Get sorted homepage FUNCTION
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

//FUNCTION - Choose subreddits
function getSubreddit(subreddit, callback) {
//   // Load reddit.com/r/{subreddit}.json and call back with the array of posts
    var address = "https://www.reddit.com/r/" + subreddit + "/.json";
    request(address, function(err, result) {
        var resultObject = JSON.parse(result.body);
    if (resultObject.error) {
      console.log("Sorry, there is no subreddit with that name");
      reddit();
    } else if (resultObject.data.children.length === 0) {
      console.log("Sorry, there is no subreddit with that name");
      reddit();
    } else if(resultObject.data.children.length > 0) {
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
    if (question === 'new' || 'rising' || 'controversial' || 'top') {
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
    else if (question === 'main-menu') {
      reddit();
    }
  });
}

//FUNCTION - subreddit + choices
function getSortedSubreddit(subreddit, sortingMethod, callback) {
    var address = "https://www.reddit.com/r/" + subreddit + "/" + sortingMethod + "/.json";
    request(address, function(err, result) {
        var resultObject = JSON.parse(result.body);
        if(resultObject.error) {
          console.log("Sorry, there is no subreddit with that name");
          reddit();
        }
        if(resultObject.data.children.length === 0) {
          console.log("Sorry, there is no subreddit with that name");
          reddit();
        }
        if(resultObject.data.children.length > 0) {           
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
  }
);
}

// This function should "return" all the popular subreddits
function getTopPosts(callback) {
    var address = "https://reddit.com/subreddits.json";
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

//Choose fron a list of subreddits
//Get homepage
function getListOfSubreddits(callback) {
    var address = "https://www.reddit.com/reddits/.json";
    request(address, function(err, result) {
        var resultObject = JSON.parse(result.body);
        var myOBJ = {};
        var myArray = [];
        resultObject.data.children.forEach(function(post){
        myOBJ = {
          name: post.data.title,
          value: post.data.url + ".json"
        };
        myArray.push(myOBJ);
      });
      
      
      callback(myArray);
  }
)}

//FUNCTION - List of subreddits
function getSortedSubreddit2(subreddit, callback) {
    var address = "https://www.reddit.com" + subreddit;
    request(address, function(err, result) {
        var resultObject = JSON.parse(result.body);
        if(resultObject.error) {
          console.log("Sorry, there is no subreddit with that name");
          reddit();
        }
        if(resultObject.data.children.length === 0) {
          console.log("Sorry, there is no subreddit with that name");
          reddit();
        }
        if(resultObject.data.children.length > 0) {           
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
  }
);
}


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