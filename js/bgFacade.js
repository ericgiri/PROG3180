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

}

function clearDatabase(){
    Review.clearDatabase();
}