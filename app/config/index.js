const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: process.env.MONGODB_URI || "mongodb+srv://trang050985_db_user:Thanhtruc2020%40@contactbookcluster.m4mjd9w.mongodb.net/contactbook?retryWrites=true&w=majority"
    }
};

module.exports = config;