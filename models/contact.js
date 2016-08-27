var mongoose = require('mongoose');

module.exports = mongoose.model('Contact',{
	id: String,
	name: String,
  title: String,
	email: Array,
	address: Array,
	phone: Array,
  company: String,
});
