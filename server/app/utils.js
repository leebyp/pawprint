/* ABOUT THIS FILE:
 * utils.js holds 4 helper functions that return a function that takes req and res
 * These functions correlate with the standard HTTP methods (GET, PUT, POST, and DELETE)
 * and are invoked on the data Model passed in with options using Bookshelf.js
 */

// TODO:
  // check auth for GET
  // create options for POST that specify required fields
  // validations for field length/type, options cannot be empty, throw 4xx for PUT
  // validations for DELETE


/* DOCUMENTATION: getter
 * getter makes GET requests with query options and allows you to omit things in the return
 * Options is an object with 3 parameters
 *   all: a boolean value, set true for all values that match the queries and false for just the first (defaults to false)
 *   query: an object for query parameters to pass into fetch
 *   omit: a string or array of strings of parameters that should be omitted from the returned model
 *   
 * EXAMPLE:
 *
 * === BEFORE === *
 *
 *   var getUser = function(req, res) {
 *     var getUser = function(req, res) {
 *     var userid = req.params.userid;
 *     
 *     new User({id:userid}).fetch()
 *       .then(function(request) {
 *         res.send(200, request.omit('password', 'salt'));
 *       });
 *      
 *     };
 *   };
 *
 * === AFTER === *
 *
 *   var getUser = _getter(User, {
 *     query: { id: 'userid' },
 *     omit: ['password', 'salt']
 *   });
 */

var getter = function (Model, options) {
  return function(req, res) {
    options = options || {}; // Protects against null options, b/c options required
    // Get parameters from req.params
    var query = options.query || {};
    var params = {};
    for (var property in query) {
      params[property] = req.params[query[property]];
    }
    
    // Query the database 
    var model = new Model().query({where: params});

    // Get all objects that match the query
    model.fetchAll().then(function(collection) {
      // Iterate through the collection to exclude private properties
      return collection.mapThen(function(model) {
        return model.omit(options.omit);
      });
    }).then(function(collection){
      // If all is true, return everything; else return only the first
      var result = !!options.all ? collection : collection[0];
      if (collection.length > 1) {
        // TODO throw some error about only sending the first of many obj
      }
      res.send(200, result);
    }).catch(function(err) {
      console.error(err);
      res.send(500, 'Internal server error');
    });
  };
};


/* DOCUMENTATION: creator
 * creator makes POST request with the req.body extended by any params passed in
 *   params: is an object with properties for each property the model should be extended with
 *   omit: a string or array of strings of parameters that should be omitted from the returned model   
 * EXAMPLE:
 *
 * === BEFORE === *
 *
 *   var createLog = function(req, res) {
 *     var newLog = req.body;
 *     newLog.admin_id = req.params.adminid;
 *     newLog.request_id = req.params.requestid;
 *     ContactHistory.forge(newLog).save().then(function(model) {
 *       res.send(201, model);
 *     });
 *   };
 *
 * === AFTER === *
 *
 *   var createLog = function(req, res) {
 *     creator(req, res, ContactHistory, {
 *       admin_id: req.params.adminid,
 *       request_id: req.params.requestid
 *     });
 *   };
 */

var creator = function(Model, options) {
  return function (req, res) {
    options = options || {}; // Protects against null options, b/c options required
    var newObj = req.body;
    var params = options.params;
    for (var property in params) {
      newObj[property] = req.params[params[property]]; // Uses params from req.params
    }

    Model.forge(newObj).save().then(function(model) {
      res.send(201, model.omit(options.omit));
    }).catch(function(err) {
      console.error(err);
      res.send(500, 'Internal server error');
    });
  };
};


/* DOCUMENTATION: updater
 * updater makes PUT requests which update entries in the Model passed in
 * options
 *   id: the string name of the req.params property for the id of the entry you would like to update
 *   params: is an object with properties for each property the req.body model should be extended with
 *   omit: a string or array of strings of parameters that should be omitted from the returned model    
 * EXAMPLE:
 *
 * === BEFORE === *
 *
 * var putLog = function(req, res) {
 *   var logid = req.params.logid;
 *   var patchObj = req.body;
 *   patchObj.admin_id = req.params.adminid;
 * 
 *   ContactHistory().query({where: {id: logid}}).fetch().then(function(model) {
 *     return model.save(patchObj, {patch: true});
 *   }).then(function(model) {
 *     res.send(200, model);
 *   });
 * };
 *
 * === AFTER === *
 *
 *   var putLog = _updater(ContactHistory, {id: 'logid'});
 */

var updater = function (Model, options) {
  return function(req, res) {
    var patchObj = req.body || {};
    var params = options.params;
    for (var property in params) {
      patchObj[property] = params[property]; // Uses params from options
    }

    Model.forge({id: req.params[options.id]}).fetch().then(function(model) {
      return model.save(patchObj, {patch: true});
    }).then(function(model) {
      res.send(200, model.omit(options.omit));
    }).catch(function(err) {
      console.error(err);
      res.send(500, 'Internal server error');
    });
  };
};


/* DOCUMENTATION: deleter
 * deleter makes DELETE requests which update entries in the Model passed in
 * options
 *   id: the string name of the req.params property for the id of the entry you would like to delete
 *   omit: a string or array of strings of parameters that should be omitted from the returned model
 *   
 * EXAMPLE:
 *
 * === BEFORE === *
 *
 * var deletePetVaccine = function(req, res) {
 *   Pet_Vaccine.forge({id: req.params.vaccineid}).fetch().then(function(model){
 *     model.destroy(res.send(200, model));
 *   });
 * };
 *
 * === AFTER === *
 *
 *   var deletePetVaccine = _deleter(Pet_Vaccine, {id: 'vaccineid'});
 */

var deleter = function (Model, options) {
  return function(req, res) {
    Model.forge({id: req.params[options.id]}).fetch().then(function(model){
      model.destroy(res.send(200, model.omit(options.omit)));
    }).catch(function(err) {
      console.error(err);
      res.send(500, 'Internal server error');
    });
  };
};


module.exports = exports = {
  getter: getter,
  creator: creator,
  updater: updater,
  deleter: deleter
};
