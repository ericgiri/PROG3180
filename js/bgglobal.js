/**
 * Created by bgiri0706 on 2/29/2016.
 */
//show and hide the extra input fields of the form
function show_hide()
{
    var hasRating = "N";
    $('#bgCheckBox').change(function(){
        if($(this).prop("checked")) {
            $('#frmExtra').show();
            hasRating ="Y";

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
    var hasRating ="N";
    $('#boxCheck2').change(function(){
        if($(this).prop("checked")) {
            $('#frmExtra1').show();
             hasRating= "Y";
        }
        else
        {
            $('#frmExtra1').hide();
        }
    });
}

function getSelectType() {
    getTypeValues();
}
function getUpdatedTypeDropdown() {
    bgUpdateTypesDropDown();
}

//calculates rating for add feedback form
function show_rating(){
    var rating1 = Number($("#txtFoodQuality").val());
    var rating2 = Number($("#txtService").val());
    var rating3 = Number($("#txtValue").val());
    $("#txtOverallRating").val(getOveralRating(rating1, rating2, rating3));
}

//calculates rating for modify feedback form
function show_rating_extra(){
    var rating1 = Number($("#txtFoodQuality1").val());
    var rating2 = Number($("#txtService1").val());
    var rating3 = Number($("#txtValue1").val());
    $("#txtOverallRating1").val(getOveralRating(rating1, rating2, rating3));
}
//checks the validation
function btnSubmit_check()
{
    bgAddFeedback();
}

function btnDelete_click() {
        bgDeleteFeedback();
}
//checks the modify feedback page form validation
function btnUpdate_check(){
    if (doValidate_frmModifyFeedback()) {
        bgUpdateFeedback();
    }

}

function reviewDetail_show() {
    showOneReview();
}

function btnSave_default(){
    store_default_Email();
}

function btnClear_Click(){
    clearDatabase();
}
function showReviewList() {
    showAllReview();
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
    $("#btnUpdate").on("click", btnUpdate_check);
    $("#btnSaveDefault").on("click", btnSave_default)
    $("#btnClearDatabase").on("click", btnClear_Click);
    $("#bgselect").on("click", getSelectType);
    $("#bgtype1").on("click", getUpdatedTypeDropdown);
    $("#btnDelete").on("click", btnDelete_click);
    $("#BGViewFeedbackPage").on("click", showReviewList);
}

$(document).ready(function(){
    $('#frmExtra').hide();
    $('#frmExtra1').hide();
    init();
    initDB();
});
