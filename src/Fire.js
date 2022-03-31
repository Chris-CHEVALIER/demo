import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDpui6MoZVAf8I9KHyGhrB2vomCjBAN7v8",
    authDomain: "news-679bd.firebaseapp.com",
    projectId: "news-679bd",
    storageBucket: "news-679bd.appspot.com",
    messagingSenderId: "182697323723",
    appId: "1:182697323723:web:98201379a35bf7c201bf4e"
}

export default class Fire {
    constructor(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null);
            } else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error);
                });
            }
        })
    }

    get ref() {
        return firebase.firestore().collection("articles");
    }

    getArticles(callback) {
        let ref = this.ref.orderBy("created_at");
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let articles = [];
            snapshot.forEach(doc => {
                articles.push({ id: doc.id, ...doc.data() });
            });
            callback(articles.reverse());
        }, function (error) {
            callback(error);
        });
    }

    addArticle(article) {
        this.ref.add(article);
    }

    deleteArticle(article) {
        this.ref.doc(article.id).delete();
    }

    updateArticle(article) {
        this.ref.doc(article.id).update(article);
    }
}