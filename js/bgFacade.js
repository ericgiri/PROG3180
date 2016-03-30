/**
 * Created by EricGiri
 *              on 2016-03-28.
 */
function addReview() {
    if(doValidate_frmAddFeedback){
        var businessName = $("#txtBusinessName").val();
        var typeId= $("#bgselect").val();
        var reviewerEmail = $("#txtReviewEmail").val();
        var reviewerComments = $("#txtComment").val();
        var reviewDate = $("#date").val();
        var hasRating = $("#bgCheckBox").prop("checked");
        var rating1 = $("#txtFoodQuality").val();
        var rating2 = $("#txtService").val();
        var rating3 = $("#txtValue").val();
        var options = [businessName, typeId, reviewerEmail, reviewerComments, reviewDate,hasRating,rating1, rating2, rating3];
        Review.insert(options);
    }
}

function updateReview(){
    var id = localStorage.getItem("id");
    var businessName = $("#txtBusinessName1").val();
    var typeId = $("#bgtype1").val();
    var reviewerEmail = $("#txtReviewemail1").val();
    var reviewerComments = $("#txtComment1").val();
    var reviewDate = $("#date1").val();
    var hasRating = $("#boxCheck2").prop("checked");
    var rating1 = $("#txtFoodQuality1").val();
    var rating2 = $("#txtService1").val();
    var rating3 = $("#txtValue1").val();
    var options = [businessName, typeId, reviewerEmail, reviewerComments, reviewDate,hasRating,rating1, rating2, rating3, id];
    Review.update(options);
}


function showReview(){
    var id = localStorage.getItem("id");
    var options = [id];

    function processData(tx, results) {
        var row = results.rows[0];
        $("#txtBusinessName1").val(row['name']);
        $("#bgtype1").val(row['fullName']);
        if (row['hasRating']) {
            $("#boxCheck2").prop("checked", true);
        }
        else{
            $("#boxCheck2").prop("checked", false);
        }
        $("#txtReviewerEmail1").val(row['email']);
        $("#txtComment1").val(row['comment']);
        $("#date1").val(row['date']);
        $("#txtService1").val(row['rating1']);
        $("#txtFoodQuality1").val(row['rating2']);
        $("#txtValue1").val(row['rating2']);

    }
    Review.select(options, processData);

}

function showAllReview(){
    function successSelectAll(results) {
        console.info(results.rows.length);
        var htmlCode = "";
        if (results.rows.length != 0) {
            var numberOfItem = results.rows.length;
            for (var i = 0; i < numberOfItem; i++) {
                var row = results.rows[i];  // results.rows.item(i) also works;
                console.info("id: " + row['id'] + " Name: " + row['businessName'] + " Email: " + row['reviewerEmail']);

                htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] +
                    " href='#'> " +
                    "<h1>Name: " + row['businessName'] + "</h1>" +
                    "<h3>Email: " + row['reviewerEmail'] + "</h3>" +
                    "<h3>Review Date: " + row['reviewDate'] + "</h3>" +
                    "</a></li>";
            }
        }
        else{
            alert("No Record Found");
        }

        var lv = $("#BGFeedbackList");
            lv = lv.html(htmlCode);
            lv.listview("refresh");
            $("#BGFeedbackList a").on("click", clickHandler);

            function clickHandler() {
                localStorage.setItem("id", $(this).attr("data-row-id"));
                $(location).prop('href', '#BGEditFeedbackPage');
            }
        }
        Review.selectAll(successSelectAll);
}

function deleteReview() {
    var id = localStorage.getItem("id");
    var option = [id];
    var response = confirm("Do you really want to delete ?");
    if(response){
        //if(doValidate_frmModifyFeedback())
        Review.delete(option);
    }
}


function clearDatabase(){
    var result = confirm("Really want to clear database?");
    try {
        if (result) {
            DB.bgDropTables();
            alert("Database cleared!");
        }

    } catch (e) {
        alert (e);
    }
}