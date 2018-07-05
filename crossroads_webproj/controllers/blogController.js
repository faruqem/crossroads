const fetch = require('node-fetch');


var blogController = {};
//Retrieve all blogs
//Redundant but added just in case user type the "/blogs" route; generally though user
//will see all blogs from the home page using route "/"
blogController.readAll = function(req, res, next) {
    var host = 'http://' + req.headers.host;
    var url = host + '/api/blogs';
    try {
        fetch(url, {method: 'GET'})
        .then(function(response) {
            return response.json();
        })
        .then(function(blogs) {
            res.render("index", {
                blogList: blogs,
                flashMsgSuccess: req.flash("oprSuccessfull"),
                flashMsgError: req.flash("oprError")
            });
        });
    } catch (err){
        console.log(err);
        res.end('Oops! Something went wrong. Please, try again.');
    }
}

//Display form to create a new blog
blogController.displayForm = function(req, res, next) {
    res.render('../views/blogs/create', { title: 'Add a new blog' });
};

//Create a new blog
blogController.create =  function (req,res,next) {
    var newBlog = {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      createDate: req.body.create_dt,
    };
    
    var host = 'http://' + req.headers.host;
    var url = host + '/api/blogs/';
    try {
        fetch(url,{
                    method: 'POST', 
                    body: JSON.stringify(newBlog),
                    headers: {
                        'content-type': 'application/json'
                    },
        })
        /*.then(function(response) {
            return response.json();
        })*/
        .then(function() {
            req.flash("oprSuccessfull","Blog has been added successfully.");
            res.redirect('/');
        });
    } catch (err){
        console.log(err);
        req.flash("oprError","Oops! Something went wrong! Please, try again.");
        res.redirect('/');
    }
};

//Retrieve a blog from ID
blogController.readById = function (req, res, next) {
    var blogId = req.params.blogid;
    var host = 'http://' + req.headers.host;
    var url = host + '/api/blogs/' + blogId;
    try {
        fetch(url, {method: 'GET'})
        .then(function(response) {
            return response.json();
        })
        .then(function(blog) {
            res.render("../views/blogs/update", {
                blog: blog
            });
        });
    } catch (err){
        console.log(err);
        flashMsgError: req.flash("oprError", "Oops! Something went wrong! Please, try again.");
        res.redirect('/');
    }
};

//Update a blog
blogController.update = function (req, res, next) {

    var blogId = req.params.blogid;
    var updateBlog = {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        createDate: req.body.create_dt,
        assignee: req.body.assignee
    }
    var host = 'http://' + req.headers.host;
    var url = host + '/api/blogs/' + blogId;

    try {
        fetch(url,{
                    method: 'PUT', 
                    body: JSON.stringify(updateBlog),
                    headers: {
                        'content-type': 'application/json'
                    },
        })
        /*.then(function(response) {
            return response.json();
        })*/
        .then(function() {
            req.flash("oprSuccessfull","Blog has been updated successfully.");
            res.redirect('/');
        });
    } catch (err){
        console.log(err);
        flashMsgError: req.flash("oprError", "Oops! Something went wrong! Please, try again.");
        res.redirect('/');
    }
};

//Retrieve a blog from ID to delete
blogController.readByIdToDelete = function (req, res, next) {
    var blogId = req.params.blogid;
    var host = 'http://' + req.headers.host;
    var url = host + '/api/blogs/' + blogId;
    try {
        fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(blog) {
            res.render("../views/blogs/delete", {
                blog: blog
            });
        });
    } catch (err){
        console.log(err);
        flashMsgError: req.flash("oprError", "Oops! Something went wrong! Please, try again.");
        res.redirect('/');
    }
};

//Delete a blog
blogController.delete = function (req, res, next) {
    
    var blogId = req.params.blogid;
    var host = 'http://' + req.headers.host;
    var url = host + '/api/blogs/' + blogId;

    try {
        fetch(url,{method: 'DELETE'})
        /*.then(function(response) {
            return response.json();
        })*/
        .then(function() {
            req.flash("oprSuccessfull","Blog has been deleted successfully.");
            res.redirect('/');
        });
    } catch (err){
        console.log(err);
        flashMsgError: req.flash("oprError", "Oops! Something went wrong! Please, try again.");
        res.redirect('/');
    }
};

//Test APIs
blogController.apitest = function(req, res, next) {
    res.render('apitest', { title: 'Test the REST APIs' });
  }

module.exports = blogController;
