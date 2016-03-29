/**
 * Created by bgiri0706 on 2/29/2016.
 */
var Review = {
    insert: function (options) {
        function txFunction(tx) {
            var sql = "INSERT INTO BGReview(businessName, typeId,reviewerEmail," +
                "reviewerComments, reviewDate, hasRating, rating1, rating2, rating3) values(?,?,?,?,?,?,?,?,?);";

            function successInsert() {
                console.info("Success: Insert successful");
                alert("New record added");
            }

            tx.executeSql(sql, options, successInsert, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    selectAll: function (callBack) {
        var options = [];

        function txFunction(tx) {
            console.info("Selecting all records");
            var sql = "SELECT * FROM BGReview;";
            tx.executeSql(sql, options, callBack, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },

    getType: function () {
        var options = [];

        function txFunction(tx) {
            console.info("Selecting types");
            var sql = "SELECT name FROM BGType;";
            tx.executeSql(sql, options, null, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },

    select: function (options, callBack) {
        function txFunction(tx) {
            console.info("Selecting a record");
            var sql = "SELECT * FROM BGReview WHERE id = ?;";
            tx.executeSql(sql, options, callBack, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    update: function (options) {
        function txFunction(tx) {
            console.info("Updating ...");
            var sql = "UPDATE BGReview " +
                "SET businessName=?, typeId=?, reviewerEmail=?, reviewerComments=?, reviewDate=?,hasRating=?, rating1=?, rating2=?, rating3=?" +
                "WHERE id=?;";

            function successUpdate() {
                console.info("Success; Update successful");
                alert("Record updated successfully");
            }

            tx.executeSql(sql, options, successUpdate, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },

    delete: function (options) {

        function successDelete() {
            console.info("Success: Delete successful");
            alert("Record deleted successfully");
        }

        function txFunction(tx) {
            console.info("Deleting ..");
            var sql = "DELETE FROM BGReview " +
                "WHERE id=?;";
            tx.executeSql(sql, options, successDelete, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
};