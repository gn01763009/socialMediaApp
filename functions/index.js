const functions = require('firebase-functions')
const app = require('express')()
const FBAuth = require('./util/fbAuth')

const cors = require('cors')
app.use(cors())

const { db } = require('./util/admin')

const {
	getAllScreams,
	postOneScream,
	getScream,
	commentOnScream,
	likeScream,
	unlikeScream,
	deleteScream,
} = require('./handlers/screams')

// Scream route
app.get('/screams', getAllScreams)
// Post one scream
app.post('/scream', FBAuth, postOneScream)
app.get('/scream/:screamId', getScream)
// delete scream
app.delete('/scream/:screamId', FBAuth, deleteScream)
// like a scream
app.get('/scream/:screamId/like', FBAuth, likeScream)
// unlike a scream
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream)
// comment a scream
app.post('/scream/:screamId/comment', FBAuth, commentOnScream)

const {
	signup,
	login,
	uploadImage,
	addUserDetails,
	getAuthenticatedUser,
} = require('./handlers/users')

// Signup route
app.post('/signup', signup)
// login route
app.post('/login', login)

// users routes
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser)

// We want this : https://baseurl.com/api/...
exports.api = functions.region('asia-southeast1').https.onRequest(app)

exports.createNotificationOnLike = functions
	.region('asia-southeast1')
	.firestore.document('likes/{id}')
	.onCreate((snapshot) => {
		db.doc(`/screams/${snapshot.data().screamId}`)
			.get()
			.then((doc) => {
				if (doc.exists) {
					return db.doc(`/notifications/${snapshot.id}`).set({
						createdAt: new Date().toISOString(),
						recipient: doc.data().userHandle,
						sender: snapshot.data().userHandle,
						type: 'like',
						read: false,
						screamId: doc.id,
					})
				}
			})
			.then(() => {
				return
			})
			.catch((err) => {
				console.error(err)
				return //is a Database trigger so not API server
			})
	})

exports.deleteNotificationOnUnlike = functions
	.region('asia-southeast1')
	.firestore.document('likes/{id}')
	.onDelete((snapshot) => {
		db.doc(`/notifications/${snapshot.id}`)
			.delete()
			.then(() => {
				return
			})
			.catch((err) => {
				console.error(err)
				return
			})
	})

exports.createNotificationOnLComment = functions
	.region('asia-southeast1')
	.firestore.document('comments/{id}')
	.onCreate((snapshot) => {
		db.doc(`/screams/${snapshot.data().screamId}`)
			.get()
			.then((doc) => {
				if (doc.exists) {
					return db.doc(`/notifications/${snapshot.id}`).set({
						createdAt: new Date().toISOString(),
						recipient: doc.data().userHandle,
						sender: snapshot.data().userHandle,
						type: 'comment',
						read: false,
						screamId: doc.id,
					})
				}
			})
			.then(() => {
				return
			})
			.catch((err) => {
				console.error(err)
				return //is a Database trigger so not API server
			})
	})
