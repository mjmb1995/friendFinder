var friendsList = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.

  app.get("/api/friends", function(req, res) {
    res.json(friendsList);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  //---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {
    // req.body is available since we're using the body-parser middleware
    friendsList.unshift(req.body);
    res.json(true);
    
    var newestUser = friendsList[0]
    var compareResults = [];

    for (var i = 1; i < friendsList.length; i++) {
      var differenceArray = []

      for (var j = 0; j < 10; j++){
        var diff = Math.abs(newestUser.scores[j] - friendsList[i].scores[j])
        differenceArray.push(diff)
      }

      var compare = differenceArray.reduce(function(sum, value) {
        return sum + value;
      }, 1);
      friendsList[i].compare = compare
    
      compareResults.push(friendsList[i].compare)
    }
    console.log(friendsList[i]);

    var sortArray = compareResults.sort(function(a, b){
      return (a - b)
    })   

    var bestMatch 

    for (var i = 1; i < friendsList.length; i++){
      if (sortArray[0] === friendsList[i].compare){
        bestMatch = friendsList[i]
      }
    }

    var index = friendsList.indexOf(bestMatch)

    function sort(){
      friendsList.splice(index, 1)
      friendsList.splice(1, 0, bestMatch)
    }
    sort();

    var keepKeys = ['name', 'photo', 'scores'];

    for(var i = 0; i < friendsList.length; i++){

      for(var key in friendsList[i]){
        if(keepKeys.indexOf(key) === -1){
          delete friendsList[i][key];
        }
      }
    }
  });
};