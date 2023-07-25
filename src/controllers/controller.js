let db = require("../model/db");

let listEntries = function (req, res){
//should return summary of add entries in database
let sql = "select id, title, mood from entries";

db.query(sql, function(err, results){
    if(err){
        console.log("failed to query database", err);
        res.sendStatus(500);

    } else {
      res.json(results);
    }
  });
};

let listUserIdEntries = function(req, res){

let id = req.params.id;

let sql = "select EntryID, Title, Mood from entries where UserID = ?";

  let params = [id]

  db.query(sql, params, function(err, results){
    if(err){
        console.log("failed to query database", err);
        res.sendStatus(500);

    } else {
      res.json(results);
    }
  });
}

let getEntry = function (req, res){
  //want to get id from request path param
  //want to execute the sql statement to get info for an entry from database, but only for id
  
  let id = req.params.id;
//this allows you to select all(*) of the entries with certain id
  let sql = 'select * from entries where id = ?'
  let params = [id]

  db.query(sql, params, function(err, results){

    if(err){

      console.log("Failed to query database", err);
      res.sendStatus(500);
    } else {
      if(results.length == 0){
          res.sendStatus(404);
      } else {
        res.json(results[0]);
      }
    }
  })

};


//leaving this here for possible future use

// let deleteEntry = function (req, res){
//   //want to except id from request
//   //want to delete row with matching id

// let id = req.params.id;

// let sql = "delete from entries where id = ?";
// let params = [id];

// db.query(sql, params, function(err, results){
//   if(err){
//       console.log("Delete query failed", err);
//       res.sendStatus(500);
//   } else {
//     res.sendStatus(204);
//   }

// });
// };

let addEntry = function (req, res){
  // read data from request (title, notes)
  // execute query to insert data

    let title = req.body.title;
    let genre = req.body.genre;

    //this makes it required for a user to input a title
    if(!title){
      res.status(400).json("Title is required");
      return;
    }

    let sql = "insert into entries (Title, Genre) values (?, ?);"
    let params = [title, genre];

    db.query(sql, params, function(err, results){
        if(err){
          console.log("Failed to insert into the database", err);
          res.sendStatus(500);
        } else {
          res.sendStatus(204);

        }
    });
};

let addEntryByUserID = function (req, res){
  // read data from request (title, notes)
  // execute query to insert data

    let title = req.body.title;
    let genre = req.body.genre;
    let id = req.body.id;

    //this makes it required for a user to input a title
    if(!title){
      res.status(400).json("Title is required");
      return;
    }

    let sql = "insert into entries (Title, Genre, UserID) values (?, ?, ?)";
    let params = [title, genre, id];

    db.query(sql, params, function(err, results){
        if(err){
          console.log("Failed to insert into the database", err);
          res.sendStatus(500);
        } else {
          res.sendStatus(204);

        }
    });
};

//sql: update entries set title = ?, genre = ?, mood = ? where id = ?

//keeping code for possible future use
// let updateEntry = function (req, res){

//   // get id from request path params (like delete and get)
//   // we will get the rest of the info from the request body (like post)

//     let id = req.params.id;
//     let title = req.body.title;
//     let genre = req.body.genre;
//     let mood = req.body.mood;

//     //requires a user to input a title in order to continue
//       if(!title){
//         res.status(400).json("Title is required!");
//         return;
//       }
//         let mood2 = false;
//         if(mood == true){
//           mood2 = true;
//         }

//         let sql = "update entries set title = ?, genre = ?, mood = ? where id = ?";
//         let params = [title, genre, mood2, id];

//         db.query(sql, params, function(err, results){
//             if(err){
//               console.log("Failed to update the database", err);
//               res.sendStatus(500);
//             } else {
//               res.sendStatus(204);
//             }

//         });
// };

//keeping for possible future use
// let patchEntry = function(req, res){

//     let id = req.params.id;
//     let body = req.body;

//     let updateTitle = false;
//     let updateGenre = false;
//     let updateMood = false;

//     let params = [];
//     let snippets = [];

//     if(body.hasOwnProperty('title')){
//       updateTitle = true;
//       snippets.push("title = ?")
//       params.push(req.body.title);
//     }

//     if(body.hasOwnProperty('genre')){
//       updateGenre = true;
//       snippets.push("genre = ?")
//       params.push(req.body.genre);
//     }

//     if(body.hasOwnProperty('mood')){
//       updateMood = true;
//       snippets.push("mood = ?")
//       let mood2 = false;
//       if(body.mood == true){
//         mood2 = true;
//       }
//       params.push(mood2);
//     }
//     //you have to include one thing in order to update
//     if(params.length == 0){
//       res.status(400).json("You must include at least 1 attribute to update");
//       return;
//     }
//       let sql = "update entries set "+snippets.join(",")+"where id = ?";
//       params.push(id);

//       db.query(sql, params, function(err, results){

//         if(err){

//           console.log("Failed to patch the entry", err);
//           res.sendStatus(500);
//         } else {
//           res.sendStatus(204);
//         }


//       })
// };

module.exports = {

  listEntries,
  getEntry,
  // deleteEntry,
  addEntry,
  // updateEntry,
  listUserIdEntries,
  addEntryByUserID
}