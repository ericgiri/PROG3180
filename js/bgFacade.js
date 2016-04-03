/**
 * Created by EricGiri
 *              on 2016-03-28.
 */
function bgAddFeedback() {
    if (doValidate_frmAddFeedback()) {
        var hasRating = "N";
        var businessName = $("#txtBusinessName").val();
        var typeId = $("#bgselect").val();
        var reviewerEmail = $("#txtReviewEmail").val();
        var reviewerComments = $("#txtComment").val();
        var reviewDate = $("#date").val();
        if($("#bgCheckBox").prop("checked"))
        {
            hasRating ="Y";
        }
        var rating1 = $("#txtFoodQuality").val();
        var rating2 = $("#txtService").val();
        var rating3 = $("#txtValue").val();
        var options = [businessName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3];
        Review.insert(options);
    }
}

function bgUpdateFeedback() {
    if (doValidate_frmModifyFeedback()) {
        var hasRating = "N";
        var id = localStorage.getItem("id");
        var businessName = $("#txtBusinessName1").val();
        var typeId = $("#bgtype1").val();
        var reviewerEmail = $("#txtReviewerEmail1").val();
        var reviewerComments = $("#txtComment1").val();
        var reviewDate = $("#date1").val();
        if($("#boxCheck2").prop("checked"))
        {
            hasRating ="Y";
        }
        var rating1 = $("#txtFoodQuality1").val();
        var rating2 = $("#txtService1").val();
        var rating3 = $("#txtValue1").val();
        var options = [businessName, typeId, reviewerEmail, reviewerComments, reviewDate, hasRating, rating1, rating2, rating3, id];
        Review.update(options);
    }
}


function showAllReview() {
    function successSelectAll(tx, results) {
        console.info(results.rows.length);
        var htmlCode = "";
        var totalRating = 0;
        if (results.rows.length > 0) {
            var numberOfItem = results.rows.length;
            for (var i = 0; i < numberOfItem; i++) {
                var row = results.rows[i];  // results.rows.item(i) also works;

                console.info("id: " + row['id'] + " Name: " + row['businessName'] + " Email: " + row['reviewerEmail']);

                htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] +
                    " href='#'> " +
                    "<h1>Name: " + row['businessName'] + "</h1>" +
                    "<p>Email: " + row['reviewerEmail'] + "</p>" +
                    "<p>Review Date: " + row['reviewDate'] + "</p>";
                totalRating = getOveralRating(row['rating1'], row['rating2'], row['rating3']);
                if (totalRating) {
                    htmlCode += "<p>Total Rating: " + totalRating + "</p>";
                }
                else {
                    htmlCode += "<p>No Rating Provided Yet</p>";
                }
                htmlCode += "</a></li>";
            }
        }
        else {
            alert("No Record Found");
        }

        var lv = $("#BGFeedbackList");
        lv = lv.html(htmlCode);
        lv.listview("refresh");
        $("#BGFeedbackList a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href', '#BGEditFeedbackPage');
            showOneReview();
        }
    }

    Review.selectAll(successSelectAll);
}

function showOneReview() {
    var id = localStorage.getItem("id");
    var email = localStorage.getItem('DefaultEmail');
    $("#txtReviewerEmail1").val(email);
    var options = [id];
    console.info("Showing review detail for " + id);
    function processData(tx, results) {
        var row = results.rows[0];
        $("#txtBusinessName1").val(row['businessName']);
        $("#bgtype1").val(row['typeId'].value);
        var checkValue = row['hasRating'];
        if (checkValue=="Y") {
            $('#boxCheck2').prop("checked", true);
        }
        else {
            $("#boxCheck2")[0].checked = false;
        }

        $("#txtComment1").val(row['reviewerComments']);
        $("#date1").val(row['reviewDate']);
        $("#txtService1").val(row['rating1']);
        $("#txtFoodQuality1").val(row['rating2']);
        $("#txtValue1").val(row['rating3']);
    }
    Review.select(options, processData);
}

function bgDeleteFeedback() {
    var id = localStorage.getItem("id");
    var option = [id];
    //if (doValidate_frmModifyFeedback()) {
        var response = confirm("Do you really want to delete ?");
        if (response) {
            Review.delete(option);
        }
    //}
}


function clearDatabase() {
    var result = confirm("Really want to clear database?");
    try {
        if (result) {
            DB.bgDropTables();
            alert("Database cleared!");
        }

    } catch (e) {
        alert(e);
    }
}

function getTypeValues() {
    function successSelectMenu(tx, results) {
        var selectHtmlCode = "";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            if (row['name'] == "Other") {
                selectHtmlCode += "<option value =" + row['id'] + " selected>" + row['name'] + "</option>"
                console.info(row['name']);
            }
            else {
                selectHtmlCode += "<option value =" + row['id'] + ">" + row['name'] + "</option>"
                console.info(row['name']);
            }

        }
        var typeId = $("#bgselect");
        typeId = typeId.html(selectHtmlCode);
        localStorage.setItem("id", $(this).attr("data-row-id"));
        typeId.selectmenu('refresh');
    }

    Type.getType(successSelectMenu);
}

function bgUpdateTypesDropDown() {
    function successSelectMenu(tx, results) {
        var selectHtmlCode = "";
        var id = localStorage.getItem("id");

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];
            if (row['id'] == id) {
                selectHtmlCode += "<option value =" + row['id'] + " selected>" + row['name'] + "</option>"
                console.info(row['name']);
            }
            else {
                selectHtmlCode += "<option value =" + row['id'] + ">" + row['name'] + "</option>"
                console.info(row['name']);

            }

        }
        var typeId = $("#bgtype1");
        typeId = typeId.html(selectHtmlCode);
        typeId.selectmenu('refresh');
    }

    Type.getType(successSelectMenu);
}