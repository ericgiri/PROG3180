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
    var options = [businessName, typeId, reviewerEmail, reviewerComments, reviewDate,hasRating,rating1, rating2, rating3];
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
    function successSelectAll(tx, results) {
        console.info(results.rows.length);
        var htmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];  // results.rows.item(i) also works;
            console.info("id: " + row['id'] + " Name: " + row['businessName'] + " Email: " + row['email']);

            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] +
                " href='#'> " +
                "<h1>Name: " + row['businessName'] + "</h1>" +
                "<h2>Type ID: " + row['typeId'] + "</h2>"+
                "<h3>Email: "+ row['email'] + "</h3>" +
                "</a></li>";
        }
        var lv = $("#feedback1");
        lv = lv.html(htmlCode);
        lv.listview("refresh");
        $("#feedback1 a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href', '#BGEditFeedbackPage');
            //$.mobile.changePage("#pageDetail", {transition: 'none'}); //also works
        }
    }
    Review.selectAll(successSelectAll);
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