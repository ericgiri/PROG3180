/**
 * Created by bgiri0706 on 2/29/2016.
 */

function addEmail() {
        console.info("Validation is successful, ready to insert");
        //do stuff for inserting the info to db
        var email = $("#txtEmail").val();
        var options = [email];
        //Feedback.insert(options);
}

function getOveralRating(num1, num2, num3) {
    var overallRating = ((num1 + num2 + num3)/15) * 100;
    return overallRating;
}

//validation for Add Feedback Page form
function doValidate_frmAddFeedback() {
    var form = $("#BGAddForm");

    form.validate({
        rules: {
            txtBusinessName:{
                required:true,
                rangelength:[2,30]
            },
            txtReviewEmail: {
                required:true,
                emailcheck:true
            },
            date: {
                required: true
            },
            txtFoodQuality: {
                required: true,
                number: true,
                range: [0,5]
            },
            txtService: {
                required: true,
                number: true,
                range: [0,5]
            },
            txtValue: {
                required: true,
                number: true,
                range: [0,5]
            }

        },
        messages: {
            txtBusinessName:{
                required:"Business Name is required",
                rangelength: "The Length Must be 2-30 Characters Long"
            },
            txtReviewEmail: {
                required:"Email is required",
                emailcheck:"Enter a valid email address"
            },
            date: {
                required: "Review date is required"
            },
            txtFoodQuality: {
                required: "Food Quality Rating is Required",
                number:"It Must be a number",
                range:"Value must be 0-5"

            },
            txtService: {
                required: "Service Rating is Required",
                number:"It Must be a number",
                range:"Value must be 0-5"

            },
            txtValue: {
                required: "Value Rating is Required",
                number:"It Must be a number",
                range:"Value must be 0-5"
            }
        }
    });
    return form.valid();
}

//Validation for Modify Feedback page form
function doValidate_frmModifyFeedback() {
    var form2 = $("#frmModify");

    form2.validate({
        rules: {
            txtBusinessName1:{
                required:true,
                rangelength:[2,30]
            },
            txtReviewemail1: {
                required: true,
                emailcheck: true
            },
            date1: {
                required: true
            },
            txtFoodQuality1: {
                required: true,
                number: true,
                range: [0,5]
            },
            txtService1: {
                required: true,
                number: true,
                range: [0,5]
            },
            txtValue1: {
                required: true,
                number: true,
                range: [0,5]
            }

        },
        messages: {
            txtBusinessName1:{
                required:"Business Name is required",
                rangelenth:"Length Must be 3-30 Characters Long"
            },
            txtReviewemail1: {
                required: "Reviewers email is required",
                emailcheck: "Enter a valid email"
            },
            date1: {
                required: "Review date is required"
            },
            txtFoodQuality1: {
                required: "Food Quality Rating is Required",
                number:"It Must be a number",
                range:"Value must be 0-5"

            },
            txtService1: {
                required: "Service Rating is Required",
                number:"It Must be a number",
                range:"Value must be 0-5"

            },
            txtValue1: {
                required: "Value Rating is Required",
                number:"It Must be a number",
                range:"Value must be 0-5"
            }
        }
    });
    return form2.valid();
}

//Email validation using regex.
jQuery.validator.addMethod("emailcheck", function(value, element){
    var regex = /^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    return this.optional(element) | regex.test(value);
});

