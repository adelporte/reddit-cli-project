//Modules
var request = require('request');
var inquirer = require('inquirer');
const imageToAscii = require("image-to-ascii");

// //The main menu choices
// var menuChoices = [
//   {name: 'Show homepage', value: 'HOMEPAGE'},
//   {name: 'Show the homepage sorted posts', value: 'SORTED-HOMEPAGE'},
//   {name: 'Choose a subreddit', value: 'SUBREDDIT'},
//   {name: 'Pick a subreddit with sorted posts', value: 'SUBREDDITS'},
//   {name: 'Choose from a list of subreddits', value: 'SUBREDDITS-LIST'},
//   {name: 'The top posts', value: 'TOP-POSTS'},
//   new inquirer.Separator(),
//   {name: 'Quit', value: 'QUIT'}
// ];


// //The program
// function reddit() {
// //The main menu
// function Menu() {
//   inquirer.prompt({
//     type: 'list',
//     name: 'menu',
//     message: 'What do you want to do?',
//     choices: menuChoices
//   }).then(
//     function(choice) {
//       if (choice.menu === 'HOMEPAGE') {
//         getHomepage(function(res) {
//           var menuHomepage = res;
//           homepage();
//       //The subreddit list
//       function homepage() {
//       inquirer.prompt({
//         type: 'list',
//         name: 'menu2',
//         message: 'Which post would you like to read?',
//         choices: menuHomepage
//       }).then(
//         function(choice) {
//       displayPost(choice.menu2, function(converted) {
//         console.log(converted);
//         reddit();
//       });
//   }
// );
// }
//         });
//       } else if (choice.menu === 'SORTED-HOMEPAGE') {
//           SortedMenu();
//       } else if (choice.menu === 'QUIT') {
//         console.log("What? You're already leaving!");
//       } else if (choice.menu === 'SUBREDDIT') {
//         SubredditAsk();
//       } else if (choice.menu === 'SUBREDDITS') {
//         SubredditAsk2();
//       } else if (choice.menu === 'TOP-POSTS') {
//         getTopPosts(function(res) {
//           var menuTopPosts = res;
//         inquirer.prompt({
//         type: 'list',
//         name: 'menu10',
//         message: 'Which post would you like to read?',
//         choices: menuTopPosts
//       }).then(
//         function(choice) {
//         displayPost(choice.menu10, function(converted) {
//           console.log(converted);
//           reddit();
//         });
//   }
// );
//         });
//       } else if (choice.menu === 'SUBREDDITS-LIST') {
//         getListOfSubreddits(function(res) {
//           var newMenu = res;
//         newMenu.push(new inquirer.Separator());
//         newMenu.push({name: "Go back to the main menu", value: "main-menu"});
//         newMenu.push(new inquirer.Separator());
//           SortedMenu();
//       //The subreddit list
//       function SortedMenu() {
//         inquirer.prompt({
//           type: 'list',
//           name: 'menu2',
//           message: 'Which subreddit would you like to check?',
//           choices: newMenu
//         }).then(
//       function(choice) {
//         if (choice.menu2 === 'main-menu') {
//           Menu();
//         }
//         else {
//           getSortedSubreddit2(choice.menu2, function(res) {
//             console.log(res)
//         });
//       }
//     }
//   );
// }
          
          
//         });
//       }
//     } 
//   );

// }
// Menu();
// }
// reddit();


// //Submenu - subreddits categories
// var subMenuChoices = [
//   {name: 'The latest posts', value: 'new'},
//   {name: 'In progress stories', value: 'rising'},
//   {name: 'The controversial posts', value: 'controversial'},
//   {name: 'The greatest hits', value: 'top'},
//   new inquirer.Separator(),
//   {name: 'Go back to the main menu', value: 'main-menu'}
// ];

// function SortedMenu() {
// inquirer.prompt({
//   type: 'list',
//   name: 'menu',
//   message: 'Which subject do you want to pick?',
//   choices: subMenuChoices
// }).then(
//   function(choice1) {
//     if(choice1.menu === 'new' || choice1.menu === 'rising' || choice1.menu === 'controversial' || choice1.menu === 'top' ) {
//     getSortedHomepage(choice1.menu, function(res) {
//       var newMenu = res;
//       //The subreddit list
//       inquirer.prompt({
//         type: 'list',
//         name: 'menu3',
//         message: 'Which post would you like to read?',
//         choices: newMenu
//       }).then(function(choice) {
//       displayPost(choice.menu3, function(converted) {
//         console.log(converted);
//         reddit();
//       });
//   })
//         });
//     } else if (choice1.menu === 'main-menu') {
//       reddit();
//     }
//   }
// );
// }

//Get homepage FUNCTION
function getHomepage(callback) {
  // Load reddit.com/.json and call back with the array of posts
    var address = "https://www.reddit.com/.json";
    request(address, function(err, result) {
        var resultObject = JSON.parse(result.body);
        var newArray = [];
        resultObject.data.children.forEach(function(post){
        newArray.push({
          name: post.data.title,
          value: "https://www.reddit.com" + post.data.permalink + ".json"
        });
      });
      callback(newArray);
  }
)}


//Get sorted homepage FUNCTION
function getSortedHomepage(choice, callback) {
  // Load reddit.com/{sortingMethod}.json and call back with the array of posts
  // Check if the sorting method is valid based on the various Reddit sorting methods
    var address = "https://www.reddit.com/" + choice + "/.json";
    request(address, function(err, result) {
        var resultObject = JSON.parse(result.body);
        var newArray = [];
        resultObject.data.children.forEach(function(post){
        newArray.push({
          name: post.data.title,
          value: "https://www.reddit.com" + post.data.permalink + ".json"
        });
      });
      callback(newArray);
  }
);
}

// //Subreddit
// //Prompt
// function SubredditAsk() {
// var question = [
//   {
//     type: 'input',
//     name: 'question',
//     message: 'Which subreddit do you want to check?',
//   }
// ];

// inquirer.prompt(question).then(function (answers) {
//           getSubreddit(answers.question, function(res) {
//           var result = res;
//                 inquirer.prompt({
//         type: 'list',
//         name: 'menu4',
//         message: 'Which post would you like to read?',
//         choices: result
//       }).then(function(choice) {
//       displayPost(choice.menu4, function(converted) {
//         console.log(converted);
//         reddit();
//       });
//   })
//         });
    
// });
// }

//FUNCTION - Choose subreddits
function getSubreddit(subreddit, callback) {
//   // Load reddit.com/r/{subreddit}.json and call back with the array of posts
    var address = "https://www.reddit.com/r/" + subreddit + "/.json";
    request(address, function(err, result) {
        var resultObject = JSON.parse(result.body);
        var newArray = [];
    if (resultObject.error) {
      console.log("Sorry, there is no subreddit with that name");
      //reddit();
    } else if (resultObject.data.children.length === 0) {
      console.log("Sorry, there is no subreddit with that name");
      //reddit();
    } else if(resultObject.data.children.length > 0) {
        resultObject.data.children.forEach(function(post){
          
        newArray.push({
          name: post.data.title,
          value: "https://www.reddit.com" + post.data.permalink + ".json"
        });
        
      });
      callback(newArray);
  }
    }
);

}

// //Sorted subreddits
// //Third menu
// var subMenuChoices2 = [
//   {name: 'The latest posts', value: 'new'},
//   {name: 'In progress stories', value: 'rising'},
//   {name: 'The controversial posts', value: 'controversial'},
//   {name: 'The greatest hits', value: 'top'},
//   new inquirer.Separator(),
//   {name: 'Go back to the main menu', value: 'main-menu'}
// ];

// function SubredditAsk2() {
//   var question = [
//     {
//       type: 'input',
//       name: 'question',
//       message: 'Which subreddit do you want to check?',
//   }
// ];

// inquirer.prompt(question).then(function(answers) {

//       var firstAnswer = answers.question;

//         inquirer.prompt({
//           type: 'list',
//           name: 'menu',
//           message: 'Which section do you want to explore?',
//           choices: subMenuChoices
//         }).then(
//           function(choice1) {
//             getSortedSubreddit(firstAnswer, choice1.menu, function(res) {
//               var menu = res;
//                 inquirer.prompt({
//         type: 'list',
//         name: 'menu5',
//         message: 'Which post would you like to read?',
//         choices: menu
//       }).then(function(choice) {
//       displayPost(choice.menu5, function(converted) {
//         console.log(converted);
//         reddit();
//       });
//   })
        
//             });
//           }
//         );
    

//   });
// }

//FUNCTION - subreddit + choices
function getSortedSubreddit(subreddit, sortingMethod, callback) {
    var address = "https://www.reddit.com/r/" + subreddit + "/" + sortingMethod + "/.json";
    request(address, function(err, result) {
        var resultObject = JSON.parse(result.body);
        var newArray = [];
        if(resultObject.error) {
          console.log("Sorry, there is no subreddit with that name");
        //  reddit();
        }
        if(resultObject.data.children.length === 0) {
          console.log("Sorry, there is no subreddit with that name");
        //  reddit();
        }
        if(resultObject.data.children.length > 0) {           
        resultObject.data.children.forEach(function(post){
        newArray.push({
          name: post.data.title,
          value: "https://www.reddit.com" + post.data.permalink + ".json"
        });
        
      });
      callback(newArray);
        }
  }
);
}

// This function should "return" all the popular subreddits
function getTopPosts(callback) {
    var address = "https://reddit.com/subreddits.json";
    var newArray = [];
    request(address, function(err, result) {
        var resultObject = JSON.parse(result.body);
        resultObject.data.children.forEach(function(post){
        newArray.push({
          name: post.data.title,
          value: "https://www.reddit.com" + post.data.url + ".json"
        });
        
      });
      callback(newArray);
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
        }
        if(resultObject.data.children.length === 0) {
          console.log("Sorry, there is no subreddit with that name");
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
        }
  }
);
}

//FUNCTION - displaying the posts
function displayPost(url, callback, callback1) {
var address = url;
console.log(address)
    request(address, function(err, result) {
        var resultObject = JSON.parse(result.body);
        console.log('\033c');
        if(resultObject[0]) {
          console.log("Title : " + resultObject[0].data.children[0].data.title + "\n");
            if (resultObject[0].data.children[0].data.url.substring(resultObject[0].data.children[0].data.url.length - 3) === "jpg" || resultObject[0].data.children[0].data.url.substring(resultObject[0].data.children[0].data.url.length - 3) === "png")
            {
              imageToAscii(resultObject[0].data.children[0].data.url, 
            {
              colored: true,
              white_bg: true
            },
            (err, converted) => {
        //console.log(err || converted);
            console.log("Author : " + resultObject[0].data.children[0].data.author + "\n");
                    if(resultObject[1]){
        
        var newOBJ = {};
              var newArray3 = [];
              resultObject[1].data.children.forEach(function(ele) {
                newArray3.push(newOBJ =
                {comment : ele.data.body});
                newArray3.push(" ");
              });
              console.log(newArray3);
        }
            callback(converted);
            callback1();
    });
            }
              else {
              console.log("Url : " + resultObject[0].data.children[0].data.url + "\n");
              console.log("Author : " + resultObject[0].data.children[0].data.author + "\n");
              //Comments
                      if(resultObject[1]){
        
        var newOBJ = {};
              var newArray3 = [];
              resultObject[1].data.children.forEach(function(ele) {
                newArray3.push(newOBJ =
                {comment : ele.data.body});
                newArray3.push(" ");
              });
              console.log(newArray3);
        }
             // reddit();
             callback1();
          }

          //reddit();
        } else {
        console.log('\033c');
        console.log("Title : " + resultObject.data.children[0].data.title + "\n");
        if (resultObject.data.children[0].data.url.substring(resultObject.data.children[0].data.url.length - 3) === "jpg" || resultObject.data.children[0].data.url.substring(resultObject.data.children[0].data.url.length - 3) === "png")
        {imageToAscii(resultObject.data.children[0].data.url, 
        {
          colored: true,
          white_bg: true
        },
        (err, converted) => {
        //console.log(err || converted);
        console.log("Author : " + resultObject.data.children[0].data.author + "\n");
        if(resultObject[1]){
        var newOBJ = {};
              var newArray3 = [];
              resultObject[1].data.children.forEach(function(ele) {
                newArray3.push(newOBJ =
                {comment : ele.data.body});
                newArray3.push(" ");
              });
              console.log(newArray3);
        }
        callback(converted);
        callback1();
});
        } else {
        console.log("Url : " + resultObject.data.children[0].data.url + "\n");
        console.log("Author : " + resultObject.data.children[0].data.author + "\n");
        if(resultObject[1]){
        
        var newOBJ = {};
              var newArray3 = [];
              resultObject[1].data.children.forEach(function(ele) {
                newArray3.push(newOBJ =
                {comment : ele.data.body});
                newArray3.push(" ");
              });
              console.log(newArray3);
        }
        //reddit();
        callback1();
        }
        }
  }
);
}

// Export the API
module.exports = {
  getHomepage : getHomepage,
  getSortedHomepage: getSortedHomepage,
  getSubreddit: getSubreddit,
  getTopPosts: getTopPosts,
  getSortedSubreddit: getSortedSubreddit,
  getSortedSubreddit2: getSortedSubreddit2,
  getListOfSubreddits: getListOfSubreddits,
  //getSubreddits: getSubreddits,
  displayPost: displayPost
};