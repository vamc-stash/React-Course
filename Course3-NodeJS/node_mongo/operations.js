const assert = require('assert')

exports.insertDocument = (db, doc, collection, callback) => {
	const coll = db.collection(collection)
	coll.insert(doc, (err, result) => {
		assert.equal(err, null)
		console.log("Inserted " + result.result.n + " documents into the collection " + collection)
		callback(result)
	})
}

exports.findDocuments = (db, collection, callback) => {
	const coll = db.collection(collection)
	coll.find({}).toArray((err, docs) => {
		assert.equal(err, null)
		callback(docs)
	})
}

exports.removeDocument = (db, doc, collection, callback) => {
	const coll = db.collection(collection)
	coll.deleteOne(doc, (err, result) => {
		assert.equal(err, null)
		console.log('Removed the document', doc)
		callback(result)
	})
}

exports.updateDocument = (db, doc, update, collection, callback) => {
	const coll = db.collection(collection)
	coll.updateOne(doc, {$set: update}, null, (err, result) => {
		assert.equal(err, null)
		console.log("update the document with ", update)
		callback(result)
	})
}