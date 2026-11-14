const { MongoClient } = require("mongodb");

class MongoDB {
    static connect(uri) {
        if (this.client) return this.client;

        this.client = new MongoClient(uri);
        return this.client.connect();
    }
}

module.exports = MongoDB;