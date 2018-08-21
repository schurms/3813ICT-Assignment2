module.exports = function(app,fs) {
	//Route to manage user logins
	// app.get('/api/auth', (req, res) => {
  //
	// 	let uname = req.query.username;
	// 	let userObj;
	// 	fs.readFile('authdata.json', 'utf8', function(err,data){
	// 		if (err) {
	// 			console.log(err);
	// 			//Some error happened opened the file. No success.
	// 			res.send({'username':'', 'success': false});
  //
	// 		} else {
	// 		  console.log('here');
	// 			userObj = JSON.parse(data);
	// 			for (let i=0; i<userObj.length; i++) {
	// 				if (userObj[i].name == uname) {
	// 					//Find first instance of user name and success
  //           res.send({"ok": true});
	// 					return;
	// 				}
	// 			}
	// 			console.log("at 3");
	// 			//no username was found that matched
  //       res.send({"ok" : false});
	// 		}
	// 	});
	// });


  // let users = [
  //   {id: 1, name: 'super', email: '', role: ''},
  //   {id: 2, name: 'jordan', email: 'jordan@gmail.com', role: ''},
  //   {id: 3, name: 'bill', email: 'bill@gmail.com', role: 'group'},
  //   {id: 4, name: 'sam', email: 'sam@gmail.com', role: ''}
  // ];

  // POST endpoint for validating if User is in system
  // app.post('/api/login', function (req,res) {
  //   if (users.find(user => user.name === req.body.name)) {
  //     res.send({"ok": true});
  //   } else {
  //     res.send({"ok" : false});
  //   }
  // });



	//Route to manage user registration
    app.get('/api/reg', (req,res) => {

        let isUser = 0;
        let userObj;
        let uname = req.query.username;

        fs.readFile('authdata.json', 'utf8', function (err,data) {
            if (err) {
                console.log(err);
            } else {
                userObj = JSON.parse(data);
                for (let i=0; i<userObj.length; i++) {
                    if (userObj[i].name == uname) {
                        //Check for duplicates
                        isUser = 1;
                    }
                }
                if (isUser > 0) {
                    //username exists
                    res.send({'username': uname, 'success': false});
                } else {
                    //Add name to list of names
                    userObj.push({'name':uname,'email':'','role':''});
                    //Prepare data for writing (convert to a string)
                    let newdata = JSON.stringify(userObj);
                    fs.writeFile('authdata.json', newdata, 'utf-8', function (err) {
                        if (err) throw err;
                        //Send response that registration was successful.
                        res.send({'username':uname, 'success': true});
                    });
                }
            }
        });
    });
}
