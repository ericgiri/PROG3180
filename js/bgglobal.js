/**
 * Created by bgiri0706 on 2/29/2016.
 */
//show and hide the extra input fields of the form
function show_hide()
{
    $('#bgCheckBox').change(function(){
        if($(this).prop("checked")) {
            $('#frmExtra').show();
        }
        else
        {
            $('#frmExtra').hide();
        }
    });
}

//shows and hides inout fields in modify feedback page
function show_hide2()
{
    var hasRating;
    $('#boxCheck2').change(function(){
        if($(this).prop("checked")) {
            $('#frmExtra1').show();
             hasRating= true;
        }
        else
        {
            $('#frmExtra1').hide();
            hasRating = false;
        }
    });
}


//calculates rating for add feedback form
function show_rating(){
    var foodQuality = Number($("#txtFoodQuality").val());
    var service = Number($("#txtService").val());
    var value = Number($("#txtValue").val());
    $("#txtOverallRating").val(getOveralRating(foodQuality, service, value));
}

//calculates rating for modify feedback form
function show_rating_extra(){
    var foodQuality1 = Number($("#txtFoodQuality1").val());
    var service1 = Number($("#txtService1").val());
    var value1 = Number($("#txtValue1").val());
    $("#txtOverallRating1").val(getOveralRating(foodQuality1, service1, value1));
}
//checks the validation
function btnSubmit_check()
{
    doValidate_frmAddFeedback();
    addReview();
}

function btnDelete_click() {
    deleteReview();
}
//checks the modify feedback page form validation
function btnSubmit1_check(){
    if(doValidate_frmModifyFeedback()){
        updateReview();
    }
}
function showReview() {
    showAllReview();
}
function btnSave_default(){
    store_default_Email();
}
function getType() {
    Review.getType();
}
function btnClear_Click(){
    clearDatabase();
}


function initDB()
{
    console.info("Creating Database");
    try{
        DB.bgCreateDatabase();
        if (db) {
            console.info("Creating tables");
            DB.bgCreateTables();
        }
        else{
            console.error("Error: Cannot create tables: Database not available!");
        }
    }catch(e){
        console.error("Error: (Fatal) Error in initDB(). Can not proceed" );
    }
}
function init()
{
    $("#bgCheckBox").on("click", show_hide);
    $("#boxCheck2").on("click", show_hide2);
    $("#txtFoodQuality").on("change", show_rating);
    $("#txtService").on("change", show_rating);
    $("#txtValue").on("change", show_rating);
    $("#txtFoodQuality1").on("change", show_rating_extra);
    $("#txtService1").on("change", show_rating_extra);
    $("#txtValue1").on("change", show_rating_extra);
    $("#btnSubmit").on("click", btnSubmit_check);
    $("#btnSubmit1").on("click", btnSubmit1_check);
    $("#btnSaveDefault").on("click", btnSave_default)
    $("#btnClearDatabase").on("click", btnClear_Click);
    $("#bgselect").on("click", getType);
    $("#BGViewFeedbackPage").on("show", showReview);
    $("#btnDelete").on("click", btnDelete_click);
}

$(document).ready(function(){
    $('#frmExtra').hide();
    $('#frmExtra1').hide();
    init();
    initDB();
});
