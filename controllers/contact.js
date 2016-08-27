var Contact = require('../models/contact');

// Create endpoint /api/contact for POSTS
exports.postContact = function(req, res) {
  var newcontact = new Contact();
  newcontact.name = req.body.name;
  newcontact.title = req.body.title;
  newcontact.email = req.body.email;
  newcontact.phone = req.body.phone;
  newcontact.address = req.body.address;
  newcontact.company = req.body.company;
  newcontact.save(function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'contact added', data: newcontact });
  });
};

// Create endpoint /api/contact for GET
exports.getContacts = function(req, res) {
  Contact.find(function(err, contacts) {
    if (err)
      res.send(err);
    res.json(contacts);
  });
};

// Create endpoint /api/contact/:_id for GET
exports.getContact = function(req, res) {
  Contact.findById(req.params._id, function(err, contact) {
    if (err)
      res.send(err);

    res.json(contact);
  });
};

// Create endpoint /api/contact/:_id for PUT
exports.putContact = function(req, res) {
  Contact.findById(req.params._id, function(err, contact) {
    if (err)
      res.send(err);
    contact.name = req.body.name;
    contact.title = req.body.title;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.address = req.body.address;
    contact.company = req.body.company;
    contact.save(function(err) {
      if (err)
        res.send(err);
      res.json(contact);
    });
  });
};

// Create endpoint /api/contact/:_id for DELETE
exports.deleteContact = function(req, res) {
  Contact.findByIdAndRemove(req.params._id, function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'Contact removed from the locker!' });
  });
};

// Create endpoint /api/contact/search/:searchby/:query for search
exports.searchContact = function(req, res) {
  var searchQuery={};
  var query = {$regex: req.params.query, $options: 'i'};
  switch(req.params.searchby){
    case "name" : searchQuery.name = query;break;
    case "email" : searchQuery.email = query;break;
    case "address" : searchQuery.address = query;break;
    case "company" : searchQuery.company = query;break;
    case "phone" : searchQuery.phone = query;break;
  }
  console.log(searchQuery);
  Contact.find(searchQuery, function(err, contact) {
    if (err)
      res.send(err);
    res.json(contact);
  });
};
