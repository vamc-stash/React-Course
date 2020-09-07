const assert = require('assert')

exports.insertDocument = (db, doc, collection, callback) => {
	const coll = db.collection(collection)
	return coll.insert(doc)
}

exports.findDocuments = (db, collection, callback) => {
	const coll = db.collection(collection)
	return coll.find({}).toArray()
}

exports.removeDocument = (db, doc, collection, callback) => {
	const coll = db.collection(collection)
	return coll.deleteOne(doc)
}

exports.updateDocument = (db, doc, update, collection, callback) => {
	const coll = db.collection(collection)
	return coll.updateOne(doc, {$set: update}, null)
}