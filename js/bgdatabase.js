/**
 * Created by bgiri0706 on 2/29/2016.
 */

function store_default_Email() {
    var email = $("#txtEmail").val();
    localStorage.setItem("DefaultEmail", $("#txtEmail").val());
    alert("Default Reviewer Email Saved: " + email);
}


var db;
function errorHandler(tx, error) {
    console.error("SQL Error: " + tx + "(" + error.code + ")--" + error.message);
}

function successTransaction() {
    console.info("Success: Transaction successful");
}

var DB = {
    bgCreateDatabase: function () {
        var shortName = "BGReviewDB";
        var version = "1.0";
        var displayName = "DB for Review";
        var dbsize = 2 * 1024 * 1024;
        console.info("Creating Database....");
        db = openDatabase(shortName, version, displayName, dbsize,
            dbCreateSuccess);
        function dbCreateSuccess() {
            console.info("Success: Database creating successful");
        }
    },

    bgCreateTables: function () {
        function successCreateTypeTable() {
            console.info("Type Table created successfully");
        }

        function txFunction(tx) {
            var option = [];
            //Drop[ing BGType table is exists
            var sqlDropType = "DROP TABLE IF EXISTS BGType";
            tx.executeSql(sqlDropType, null, null, errorHandler);

            //Creating BGType table
            var sqlCreateType = "CREATE TABLE IF NOT EXISTS BGType(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(20) NOT NULL);";
            tx.executeSql(sqlCreateType, option, successCreateTypeTable, errorHandler);

            //Inserting record into BYType Table
            var sql1 = "INSERT INTO BGType (name) VALUES ('Canadian')";
            var sql2 = "INSERT INTO BGType (name) VALUES ('Asian')";
            var sql3 = "INSERT INTO BGType (name) VALUES ('Other')";
            tx.executeSql(sql1, option, null, errorHandler);
            tx.executeSql(sql2, option, null, errorHandler);
            tx.executeSql(sql3, option, null, errorHandler);

            //Dropping BGReview table is exists
            //var sqlDropReview = "DROP TABLE IF EXISTS BGReview";
            //tx.executeSql(sqlDropReview, null, null, errorHandler);

            //Creating BGReview table
            var sqlReview = "CREATE TABLE IF NOT EXISTS BGReview(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "businessName VARCHAR(20) NOT NULL," +
                "typeId INTEGER NOT NULL," +
                "reviewerEmail VARCHAR(30)," +
                "reviewerComments TEXT," +
                "reviewDate DATE," +
                "hasRating VARCHAR(1)," +
                "rating1 INTEGER," +
                "rating2 INTEGER," +
                "rating3 INTEGER," +
                "FOREIGN KEY(typeId) REFERENCES BGType(id));";

            function successCreateReviewTable() {
                console.info("Review Table created successfully");
            }

            tx.executeSql(sqlReview, option, successCreateReviewTable, errorHandler);

        }

        db.transaction(txFunction, errorHandler, successTransaction);

    },
    bgDropTables:function(){
        function successDrop(){
            console.info("Success: Dropping Table successful");
        }
        function txFunction(tx){
            var options = [];
            console.info("Dropping table: BGType");
            var sqlType = "DROP TABLE IF EXISTS BGType;";
            tx.executeSql(sqlType, successDrop, errorHandler);
            console.info("Dropping table: BGReview");
            var sqlReview = "DROP TABLE IF EXISTS BGReview;";
            tx.executeSql(sqlReview, options,successDrop, errorHandler);

        }
        db.transaction(txFunction, errorHandler, successTransaction);
    }
};