var Contacts = require('./models/contacts');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/contacts', function(req, res) {

		// use mongoose to get all todos in the database
		Contacts.find(function(err, contacts) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(contacts); // return all todos in JSON format
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/contacts', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Contacts.create({
			fname : req.body.fname,
			lname : req.body.lname,
			mobile : req.body.mobile,
			home : req.body.home,
			email : req.body.email,
			address : req.body.address,
			done : false
		}, function(err, contacts) {
			if (err)
				res.send(err);

			// get and return all the contacts after you create another
			Contacts.find(function(err, contacts) {
				if (err)
					res.send(err)
				res.json(contacts);
			});
		});

	});

	// delete a contact
	app.delete('/api/contacts/:contact_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	app.put('/api/contacts', function(req, res) {
		Contacts.findById(req.body._id,function(err,data){
			console.log(req.body._id);
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
            // we got data from Mongo.
            // change it accordingly.
                if(req.body.fname !== undefined) {
                    // case where email needs to be updated.
                    data.fname = req.body.fname;
                }
                if(req.body.lname !== undefined) {
                    data.lname = req.body.lname;
                }
				if(req.body.mobile !== undefined) {
                    data.mobile = req.body.mobile;
                }
				if(req.body.home !== undefined) {
                    data.home = req.body.home;
                }
				if(req.body.email !== undefined) {
                    data.email = req.body.email;
                }
				if(req.body.address !== undefined) {
                    data.address = req.body.address;
                }
                // save the data
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.body._id};
                    }
                    res.json(response);
                })
            }
        });
	});



	app.get('/api/contacts/:contact_id', function(req, res) {

		// use mongoose to get all todos in the database
		Contacts.find({_id : req.params.contact_id}, function(err, contacts) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(contacts); // return all todos in JSON format
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};