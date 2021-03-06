﻿var remainingday = 0;
var numberOfDays = 0;
var QuoteExpires = "";
var tenantOnlineID = 0;
$(document).ready(function () {
    //alert($("#hdnOPId").val());
    onFocusApplyNow();
    localStorage.removeItem("CheckReload");
    fillMarketSourceDDLGenQuotation();
    getPropertyModelUnitListQuotation();
    $("#popRentalQualification").modal("hide");
    checkExpiry();
    $("#chkAgreePetTerms").on('ifChanged', function (event) {
        if ($(this).is(":checked")) {
            modalPetPolicy.style.display = "block";
        }
        else {
            modalPetPolicy.style.display = "none";
        }
    });
    $("#mainApplName").text($("#txtFirstNamePersonal").val() + " " + ((!$("#txtMiddleInitial").val()) ? "" : $("#txtMiddleInitial").val() + " ") + $("#txtLastNamePersonal").val());

    $("#listUnit tbody").on("click", "tr", function (e) {
        var floorfromplan = localStorage.getItem("floorfromplan");
        var floorid = $(this).data("floorid");
        $("#fa_" + floorid).addClass('active_area', 'active_mouse').data('maphilight', { alwaysOn: true, fillColor: '0af11c', strokeColor: '0af11c' }).trigger('alwaysOn.maphilight');
        if (floorid == floorfromplan) {
            $("#fa_" + floorid).addClass('active_area', 'active_mouse').data('maphilight', { alwaysOn: true, fillColor: '0af11c', strokeColor: '0af11c' }).trigger('alwaysOn.maphilight');
        }
        else {
            $("#fa_" + floorfromplan).removeClass('active_area', 'active_mouse').data('maphilight', { alwaysOn: false }).trigger('alwaysOn.maphilight');
        }
    });


    if ($("#chkAgreeTermsPolicy").is(":checked")) {
        $("#policyStart").attr("disabled", true);
        InnerPolicyCheck();
    }
    else if ($("#chkAgreeTermsPolicy").is(":not(:checked)")) {
        $("#policyStart").attr("disabled", true);
        $("#popRentalQualification").modal("hide");
        InnerPolicyCheck();
    }

    $("#chkAgreeTermsPolicy").on('ifChanged', function (event) {
        if ($("#chkAgreeTermsPolicy").is(":checked")) {
            InnerPolicyCheck();
            if ($("#hndShowTermPolicy").val() == 1) {
                $("#popRentalQualification").modal("show");
            }
            else {
                $("#hndShowTermPolicy").val(1);
            }
        }
        else if ($("#chkAgreeTermsPolicy").is(":not(:checked)")) {
            $("#policyStart").attr("disabled", true);
            $("#popRentalQualification").modal("hide");
            InnerPolicyCheck();
        }
    });

    $("#chkRentalQual,#chkRentalPolicy").on('ifChanged', function (event) {
        InnerPolicyCheck();
    });
    function InnerPolicyCheck() {

        if ($("#chkRentalQual").is(":checked") && $("#chkRentalPolicy").is(":checked")) {
            $("#policyStart").attr("disabled", false);
            $("#popRentalQualification").modal("hide");
        }
        else if ($("#chkRentalQual").is(":not(:checked)") || $("#chkRentalPolicy").is(":not(:checked)")) {
            $("#policyStart").attr("disabled", true);
        }
    }
    $("#ddlRoom").on("change", function () {
        getPropertyModelUnitListQuotation();
    });
    $("#ddlSortOrder").on("change", function () {
        getPropertyModelUnitListQuotation();
    });
    $("#txtDate_Quotation").on("change", function () {
        if ($("#txtDate_Quotation").val() != "") {
            getPropertyModelUnitListQuotation();
        }
    });
    tenantOnlineID = $("#hdnOPId").val();
    getTenantOnlineListGenerateQuotation(tenantOnlineID);
    getPreviousAddressInfo(tenantOnlineID);


    $("#txtCountry").on('change', function (evt, params) {
        var selected = $(this).val();
        if (selected != null) {
            fillStateDDL_HomeQuotation(selected, 0);
        }
    });
    $("#txtCountryReg").on('change', function (evt, params) {
        var selected = $(this).val();
        if (selected != null) {
            fillStateDDLReg_IDTypeQuotation(selected, 0);
            fillStateDDLReg_HomeQuotation(selected, 0);
        }
    });
    $("#txtCountryOffice").on('change', function (evt, params) {
        var selected = $(this).val();
        if (selected != null) {
            fillStateDDL_OfficeQuotation(selected, 0);
        }
    });
    $("#txtCountryOfficeHEI").on('change', function (evt, params) {
        var selected = $(this).val();
        if (selected != null) {
            fillStateDDL_OfficeHEIQuotation(selected, 0);
        }
    });
    $("#txtEmergencyCountry").on('change', function (evt, params) {
        var selected = $(this).val();
        if (selected != null) {
            fillStateDDL_EmeContactQuotation(selected, 0);
        }
    });
    //17082019 - end
    $("#txtCountry2").on('change', function (evt, params) {
        var selected = $(this).val();
        if (selected != null) {
            fillStateDDL_Home2Quotation(selected, 0);
        }
    });


    $("#btnParking").on("click", function (event) {
        fillParkingList();
        addParkingArray = [];
        $("#popParking").PopupWindow("open");
    });
    //$("#popParking").PopupWindow({
    //    title: "Add Parking",
    //    modal: false,
    //    autoOpen: false,
    //    top: 120,
    //    left: 300,
    //    height: 560,

    //});

    //$("#btnFob").on("click", function (event) {
    //    fillStorageList();
    //    $("#popFob").PopupWindow("open");
    //});
    $("#btnFob").on("click", function (event) {
        fillFOBList();
        $("#popFobs").PopupWindow("open");
    });

    $("#btnStorage").on("click", function (event) {
        fillStorageListGenQuot("ASC", "Storage1Storage");
        $("#popStorage").PopupWindow("open");
    });

    $("#btnPetPlace").on("click", function (event) {
        fillPetPlaceList();
        addPetPlaceArray = [];
        $("#popPetPlace").PopupWindow("open");
    });

    $("#btnAddVehicle").on("click", function (event) {
        var randNo = makeid(6);
        $("#txtVehicleTag").val(randNo);
        clearVehicle();
        $("#popVehicle").PopupWindow("open");
    });

    $("#btnAddPet").on("click", function (event) {
        clearPet();
        $("#popPet").PopupWindow("open");
    });
    setTimeout(function () {
        getApplicantListsQuotation();
    }, 2000);
    $("#ddlDocumentTypePersonal").on("change", function () {
        var newText = $('option:selected', this).text();
        $("#lblUploadIdentity").text(newText);
    });


    $("#btnAddAHR").on("click", function (event) {
        clearApplicantHistory();
        $("#popApplicantHistory").PopupWindow("open");
    });

    $("#btnAddHEI").on("click", function (event) {
        clearHistoryOfResidence();
        $("#popHistoryEmpAndIncome").PopupWindow("open");
    });

    QuoteExpires = $("#lblFNLQuoteExpires").text();
    $("#getting-startedTimeRemainingClock").countdown(QuoteExpires, function (event) {
        $(this).text(
            event.strftime('Quote Expires in %D days %H hr : %M min')
        );
    });
    //$("#appGenderOther").addClass("hidden");
    $("#ddlApplicantGender").on("change", function () {
        if ($("#ddlApplicantGender").val() == '3') {
            $("#policyStart").attr("disabled", false);
        }
        else {
            //$("#appGenderOther").addClass("hidden");
        }
        $("#txtApplicantOtherGender").val("");
    });
    var d = $('#txtAvailableDate').text();
    var date = new Date(d);
    var daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    var dayOfMonth = date.getDate() - 1;

    var days = daysInMonth - dayOfMonth;
    remainingday = days;
    numberOfDays = daysInMonth;
    document.getElementById('fileUploadVehicleRegistation').onchange = function () {
        var fileUploadVehicleRegistationBool = restrictFileUpload($(this).val());
        if (fileUploadVehicleRegistationBool == true) {
            uploadVehicleCertificate();
        }
        else {
            document.getElementById('fileUploadVehicleRegistation').value = '';
            $('#VehicleRegistationShow').html('Choose a file...');
            $.alert({
                title: "",
                content: "Only the following file extensions are allowed...</br>'gif', 'png', 'jpg', 'jpeg', 'bmp', 'psd', 'xls', 'doc', 'docx', 'pdf', 'rtf', 'tex', 'txt', 'wpd'",
                type: 'blue'
            });
        }
    };
    document.getElementById('pet-picture').onchange = function () {
        var filepetpictureBool = restrictFileUpload($(this).val());
        if (filepetpictureBool == true) {
            uploadPetPhoto();
        }
        else {
            document.getElementById('pet-picture').value = '';
            $('#filePetPictireShow').html('Choose a file...');
            $.alert({
                title: "",
                content: "Only the following file extensions are allowed...</br>'gif', 'png', 'jpg', 'jpeg', 'bmp', 'psd', 'xls', 'doc', 'docx', 'pdf', 'rtf', 'tex', 'txt', 'wpd'",
                type: 'blue'
            });
        }
    };
    document.getElementById('filePetVaccinationCertificate').onchange = function () {
        var filePetVaccinationCertificateBool = restrictFileUpload($(this).val());
        if (filePetVaccinationCertificateBool == true) {
            uploadPetVaccination();
        }
        else {
            document.getElementById('filePetVaccinationCertificate').value = '';
            $('#filePetVaccinationCertificateShow').html('Choose a file...');
            $.alert({
                title: "",
                content: "Only the following file extensions are allowed...</br>'gif', 'png', 'jpg', 'jpeg', 'bmp', 'psd', 'xls', 'doc', 'docx', 'pdf', 'rtf', 'tex', 'txt', 'wpd'",
                type: 'blue'
            });
        }
    };
    $("#txtpetWeight").keypress(function (event) { return nonNegDecimal(event, $(this)); });
    dateIconFunctions();
    clearHistoryOfResidence();
    getEmployerHistory();
    $("#ddlFurnishedUnit").on("change", function () {
        getPropertyModelUnitListQuotation();
    });
    
});

var cancelGenerateQuotation = function () {

    $.alert({
        title: "",
        content: "Do you want to submit application?",
        type: 'blue',
        buttons: {
            yes: {
                text: 'Yes',
                action: function (yes) {
                    $("#divLoader").show();
                    var ProspectId = $("#hdnOPId").val();
                    var model = {
                        ID: ProspectId,
                        StepCompleted: 18
                    };

                    $.ajax({
                        url: '/ApplyNow/SaveUpdateStep',
                        type: 'post',
                        data: JSON.stringify(model),
                        contentType: 'application/json; charset=utf-8',
                        dataType: 'json',
                        success: function (response) {
                            $("#divLoader").hide();
                            window.location.href = "/home";
                        }
                    });
                }
            },
            no: {
                text: 'No',
                action: function (no) {
                    $("#divLoader").hide();
                }
            }
        }
    });


};
function checkFormstatusQuotation() {
    $("#checkForm").toggleClass("hidden");
}
var totalAmt = 0;
var goToStepQuotation = function (stepid, id, calldataupdate) {
    if (stepid > 7) {
        if ($("#hndCreditPaid").val() == 0) {
            $.alert({
                title: "",
                content: "Please Pay Credit Check Fees, Please fill Information to get the Credit Pay Link, if alerady filled please check email for detail.",
                type: 'red'
            });
            return;
        }
    }
    if (stepid == "1") {
        $("#li1").addClass("active");
        $("#li2").removeClass("active");
        $("#li3").removeClass("active");
        $("#li4").removeClass("active");
        $("#li5").removeClass("active");
        $("#li6").removeClass("active");
        $("#li7").removeClass("active");

        $("#step1").removeClass("hidden");
        $("#step2").addClass("hidden");
        $("#step3").addClass("hidden");
        $("#step4").addClass("hidden");
        $("#step5").addClass("hidden");
        $("#step6").addClass("hidden");
        $("#step7").addClass("hidden");
        $("#step8").addClass("hidden");
        $("#step9").addClass("hidden");
        $("#step10").addClass("hidden");
        $("#step11").addClass("hidden");
        $("#step12").addClass("hidden");
        $("#step13").addClass("hidden");
        $("#step14").addClass("hidden");
        $("#step15").addClass("hidden");
        $("#step16").addClass("hidden");
        $("#step17").addClass("hidden");
        $("#subMenu").addClass("hidden");
    }
    if (stepid == "2") {
        if (parseInt($("#hndIsModelSelected").val()) == 0) {
            var msg = "Please select floor plan to choose your new apartment";
            $.alert({
                title: "",
                content: msg,
                type: 'red'
            });
            return;
        }
        if ($('#txtAvailableDate').text() == '') {
            $('#lblLeaseStartDate').text($('#txtDate_Quotation').val());
        }
        else {
            $('#lblLeaseStartDate').text($('#txtAvailableDate').text());
        }
        if (id == "2") {
            var floorNoSearch = $("#hndFloorNo").val();
            var bedRoomSearch = $("#hndBedRoom").val();
            var buildingSearch = $("#hndBuilding").val();
            var ubitIdSearch = $("#hndUID").val();

            if (ubitIdSearch != 0 && buildingSearch != "" && floorNoSearch > 0) {
                showFloorPlan(floorNoSearch, bedRoomSearch, buildingSearch);
            }

            //$("#subMenu").addClass("hidden");
            $("#as2").removeAttr("onclick");
            $("#as2").attr("onclick", "goToStepQuotation(2,2,1)");
            $("#li1").addClass("active");
            $("#li2").addClass("active");

            $("#li3").removeClass("active");
            $("#li4").removeClass("active");
            $("#li5").removeClass("active");
            $("#li6").removeClass("active");
            $("#li7").removeClass("active");
            $("#step1").addClass("hidden");
            $("#step3").addClass("hidden");
            $("#step4").addClass("hidden");
            $("#step2").removeClass("hidden");
            $("#step5").addClass("hidden");
            $("#step6").addClass("hidden");
            $("#step7").addClass("hidden");
            $("#step8").addClass("hidden");
            $("#step9").addClass("hidden");
            $("#step10").addClass("hidden");
            $("#step11").addClass("hidden");
            $("#step12").addClass("hidden");
            $("#step13").addClass("hidden");
            $("#step14").addClass("hidden");
            $("#step15").addClass("hidden");
            $("#step16").addClass("hidden");
            $("#step17").addClass("hidden");
            if ($("#hdnOPId").val() != '0') {
                getStaticApplicantValuesGenearateQuotation();
            }

            if ($("#hdnOPId").val() != '0') {
                getStaticApplicantValuesGenearateQuotation();
                getPropertyUnitDetails($("#hndUID").val());
            }

            if ($("#listUnitNew tr").hasClass("select-unit")) {
                // $("#listUnitNew tr").trigger("click");
                var selectedID = $("#listUnitNew tr").attr("id");
                var selectedIDNew = selectedID.split('_')
                getPropertyUnitDetails(selectedIDNew[1]);
            }
        }
    }
    if (stepid == "3") {
        if ($("#hndUID").val() == 0) {
            if (parseInt($("#hdnStepCompleted").val()) < 2) {
                msg = getStepCompletedMsgQuotation(parseInt($("#hdnStepCompleted").val()) + 1, 3);
                $.alert({
                    title: "",
                    content: msg,
                    type: 'red'
                });
                return;
            }
        }
        if (id == "3") {
            if ($("#hndUID").val() != 0) {
                var prospectID = $("#hdnOPId").val();
                var unitID = $("#hndUID").val();
                var model = {
                    UnitID: unitID,
                    ProspectID: prospectID
                };

                $("#divLoader").show();
                $.ajax({
                    url: "/ApplyNow/CheckUnitAvailable",
                    type: "post",
                    contentType: "application/json utf-8",
                    data: JSON.stringify(model),
                    dataType: "JSON",
                    success: function (response) {
                        var result = response.result.split('|');
                        $("#divLoader").hide();
                        if (result[0] == 0) {
                            $.alert({
                                title: "",
                                content: result[1] + " is not available.<br/>Please select other unit.",
                                type: 'red'
                            });
                            $("#hndUID").val(0);
                            var floorNoSearch = $("#hndFloorNo").val();
                            var bedRoomSearch = $("#hndBedRoom").val();
                            var buildingSearch = $("#hndBuilding").val();
                            var ubitIdSearch = 0;

                            if (ubitIdSearch != 0 && buildingSearch != "" && floorNoSearch > 0) {
                                showFloorPlan(floorNoSearch, bedRoomSearch, buildingSearch);
                            }
                            getPropertyUnitListQuotation(buildingSearch);
                            $("#popUnitPlan").empty();
                        }
                        else {
                            $("#as333").removeAttr("onclick");
                            $("#as333").attr("onclick", "goToStepQuotation(4,4,0)");
                            $("#subMenu").addClass("hidden");
                            SaveQuoteQuotation(3);
                            var checkReload = localStorage.getItem("CheckReload");
                            if (checkReload == "Done") {
                                window.location.reload();
                            }
                            $("#li1").addClass("active");
                            $("#li2").addClass("active");
                            $("#li3").addClass("active");

                            $("#li4").removeClass("active");
                            $("#li5").removeClass("active");
                            $("#li6").removeClass("active");
                            $("#li7").removeClass("active");
                            $("#step2").addClass("hidden");
                            $("#step1").addClass("hidden");
                            $("#step4").addClass("hidden");
                            $("#step3").removeClass("hidden");
                            $("#step5").addClass("hidden");
                            $("#step6").addClass("hidden");
                            $("#step7").addClass("hidden");
                            $("#step8").addClass("hidden");
                            $("#step9").addClass("hidden");
                            $("#step10").addClass("hidden");
                            $("#step11").addClass("hidden");
                            $("#step12").addClass("hidden");
                            $("#step13").addClass("hidden");
                            $("#step14").addClass("hidden");
                            $("#step15").addClass("hidden");
                            $("#step16").addClass("hidden");
                            $("#step17").addClass("hidden");
                            if ($("#hdnOPId").val() != '0') {
                                getStaticApplicantValuesGenearateQuotation();
                            }
                        }
                    }
                });

            } else {
                $.alert({
                    title: "",
                    content: "Please select your Unit",
                    type: 'red'
                });
            }
        }
    }
    if (stepid == "4") {
        if ($("#hdnUserId").val() == 0 && $("#hndUID").val() != 0) {
            msg = getStepCompletedMsgQuotation(parseInt($("#hdnStepCompleted").val()) + 2, 4);

            if (msg.indexOf("Complete Registration") == -1) {
                msg += "<b>Complete Registration</b>";
            }
            $.alert({
                title: "",
                content: msg,
                type: 'red'
            });
            return;
        }
        if (parseInt($("#hdnStepCompleted").val()) < 3) {
            msg = getStepCompletedMsgQuotation(parseInt($("#hdnStepCompleted").val()) + 1, 4);
            $.alert({
                title: "",
                content: msg,
                type: 'red'
            });
            return;
        }
        if (id == "4") {

            if ($("#hdnUserId").val() != 0) {
                var message = "";
                //var result = checkStrength($("#txtPassword").val());
                //if (!result) {
                //    return;
                //}
                var firstName = $("#txtFirstName").val();
                var middleInitial = $("#txtMiddleInitialReg").val();
                var lastName = $("#txtLastName").val();
                var phoneNumber = unformatText($("#txtPhoneNumber").val());
                var emailId = $("#txtEmail").val();
                //var password = $("#txtPassword").val();
                var gender = $("#ddlGenderReg").val();
                var otherGender = $("#txtOtherGenderReg").val();

                //var confirmPassword = $("#txtConfPassword").val();
                if (!firstName) {
                    message += "Please fill the First Name </br>";
                }
                if (!lastName) {
                    message += "Please fill the  Last Name </br>";
                }
                if (!gender || gender == "0") {
                    msg += "Please Select The Gender </br>";
                }
                else if (gender == "3") {
                    if (!otherGender) {
                        msg += "Please Fill The Other Gender </br>";
                    }
                }

                if (!phoneNumber) {
                    message += "Please fill Mobile Number </br>";
                }
                else {
                    if (phoneNumber.length < 10) {
                        message += "Please enter 10 digit mobile number </br>";
                    }
                }
                if (!emailId) {
                    message += "Please fill the Email </br>";
                } else {
                    if (!validateEmail($("#txtEmail").val())) {
                        message += "Please fill Valid Email </br>";
                    }
                }

                //if (!password) {
                //    message += "Please fill the Password </br>";
                //} else {
                //    if (password.length < 8) {
                //        message += "The Password should have a minimum of 8 characters.</br>";
                //    }
                //    if (password != confirmPassword) {
                //        message += "Password and Confirm Password must be the same</br>";
                //    }
                //}
                if (message != "") {
                    $.alert({
                        title: "",
                        content: message,
                        type: 'red'
                    });
                    return;
                }
            }

            savepudateOnlineProspectQuotation();
            SaveUpdateStepQuotation(4);
            $("#subMenu").addClass("hidden");
            $("#as444").removeAttr("onclick");
            $("#as444").attr("onclick", "goToStepQuotation(5,5,0)");
            $("#li1").addClass("active");
            $("#li2").addClass("active");
            $("#li3").addClass("active");
            $("#li4").removeClass("active");
            $("#li5").removeClass("active");
            $("#li6").removeClass("active");
            $("#li7").removeClass("active");
            $("#step2").addClass("hidden");
            $("#step1").addClass("hidden");
            $("#step4").removeClass("hidden");
            $("#step3").addClass("hidden");
            $("#step5").addClass("hidden");
            $("#step6").addClass("hidden");
            $("#step7").addClass("hidden");
            $("#step8").addClass("hidden");
            $("#step9").addClass("hidden");
            $("#step10").addClass("hidden");
            $("#step11").addClass("hidden");
            $("#step12").addClass("hidden");
            $("#step13").addClass("hidden");
            $("#step14").addClass("hidden");
            $("#step15").addClass("hidden");
            $("#step16").addClass("hidden");
            $("#step17").addClass("hidden");
            
            
        }
    }
    if (stepid == "5") {
        if (parseInt($("#hdnStepCompleted").val()) < 4) {
            msg = getStepCompletedMsgQuotation(parseInt($("#hdnStepCompleted").val()) + 1, 5);
            $.alert({
                title: "",
                content: msg,
                type: 'red'
            });
            return;
        }
        if (id == "5") {
            $("#subMenu").addClass("hidden");
            $("#as5").removeAttr("onclick");
            $("#as5").attr("onclick", "goToStepQuotation(6,6,0)");
            SaveQuoteQuotation(5);

            //$("#getting-startedTimeRemainingClock").removeClass("hidden");
            $("#li1").addClass("active");
            $("#li2").addClass("active");
            $("#li3").addClass("active");
            $("#li4").addClass("active");

            $("#li5").removeClass("active");
            $("#li6").removeClass("active");
            $("#li7").removeClass("active");

            $("#step2").addClass("hidden");
            $("#step1").addClass("hidden");
            $("#step4").addClass("hidden");
            $("#step3").addClass("hidden");
            $("#step5").removeClass("hidden");
            $("#step6").addClass("hidden");
            $("#step7").addClass("hidden");
            $("#step8").addClass("hidden");
            $("#step9").addClass("hidden");
            $("#step10").addClass("hidden");
            $("#step11").addClass("hidden");
            $("#step12").addClass("hidden");
            $("#step13").addClass("hidden");
            $("#step14").addClass("hidden");
            $("#step15").addClass("hidden");
            $("#step16").addClass("hidden");
            $("#step17").addClass("hidden");
            if ($("#hdnOPId").val() != '0') {
                getStaticApplicantValuesGenearateQuotation();
            }
        }
    }
    //if (stepid == "6") {
    //    getApplicantLists();
    //    if (parseInt($("#hdnStepCompleted").val()) < 5) {
    //        msg = getStepCompletedMsgQuotation(parseInt($("#hdnStepCompleted").val()) + 1, 6);
    //        $.alert({
    //            title: "",
    //            content: msg,
    //            type: 'red'
    //        });
    //        return; SaveOnlineProspectQuotation
    //    }
    //    if (id == "6") {
    //        $("#subMenu").addClass("hidden");
    //        SaveQuoteQuotation(6);
    //        $('#lblRFPAdditionalParking').text($('#lblMonthly_AditionalParking').text());
    //        $('#lblRFPStorageUnit').text($('#lblMonthly_Storage').text());
    //        $('#lblRFPPetRent').text($('#lblMonthly_PetRent').text());
    //        $("#lblRFPTotalMonthlyPayment").text(formatMoney((parseFloat(unformatText($("#lblRFPMonthlyCharges").text()))) + (parseFloat($("#lblRFPAdditionalParking").text())) + (parseFloat($("#lblRFPStorageUnit").text())) + (parseFloat($("#lblRFPPetRent").text())) + (parseFloat($("#lblRFPTrashRecycling").text())) + (parseFloat($("#lblRFPPestControl").text())) + (parseFloat($("#lblRFPConvergentbillingfee").text()))));
    //        $("#li1").addClass("active");
    //        $("#li2").addClass("active");
    //        $("#li3").addClass("active");
    //        $("#li4").addClass("active");
    //        $("#li5").addClass("active");

    //        $("#li6").removeClass("active");
    //        $("#li7").removeClass("active");

    //        $("#step2").addClass("hidden");
    //        $("#step1").addClass("hidden");
    //        $("#step4").addClass("hidden");
    //        $("#step3").addClass("hidden");
    //        $("#step5").addClass("hidden");
    //        $("#step6").removeClass("hidden");
    //        $("#step7").addClass("hidden");
    //        $("#step8").addClass("hidden");
    //        $("#step9").addClass("hidden");
    //        $("#step10").addClass("hidden");
    //        $("#step11").addClass("hidden");
    //        $("#step12").addClass("hidden");
    //        $("#step13").addClass("hidden");
    //        $("#step14").addClass("hidden");
    //        $("#step15").addClass("hidden");
    //        $("#step16").addClass("hidden");
    //        $("#step17").addClass("hidden");

    //    }
    //}
    if (stepid == "7") {
        //if (parseInt($("#hdnStepCompleted").val()) < 6) {
        //    msg = getStepCompletedMsgQuotation(parseInt($("#hdnStepCompleted").val()) + 1, 7);
        //    $.alert({
        //        title: "",
        //        content: msg,
        //        type: 'red'
        //    });
        //    return;
        //}
        if (id == "7") {
            //$("#subMenu").removeClass("hidden");
            SaveCheckPolicyQuotation(7);
            $("#as6").removeAttr("onclick");
            $("#as6").attr("onclick", "goToStepQuotation(7,7,0)");
            $("#step2").addClass("hidden");
            $("#step1").addClass("hidden");
            $("#step4").addClass("hidden");
            $("#step3").addClass("hidden");
            $("#step5").addClass("hidden");
            $("#step6").addClass("hidden");
            $("#step7").removeClass("hidden");
            $("#step8").addClass("hidden");
            $("#step9").addClass("hidden");
            $("#step10").addClass("hidden");
            $("#step11").addClass("hidden");
            $("#step12").addClass("hidden");
            $("#step13").addClass("hidden");
            $("#step14").addClass("hidden");
            $("#step15").addClass("hidden");
            $("#step16").addClass("hidden");
            $("#step17").addClass("hidden");

            $("#li7").addClass("active");
            $("#li8").removeClass("active");
            $("#li9").removeClass("active");
            $("#li10").removeClass("active");
            $("#li11").removeClass("active");
            $("#li12").removeClass("active");
            $("#li13").removeClass("active");
            $("#li14").removeClass("active");
            $("#li15").removeClass("active");
            $("#li16").removeClass("active");
            $("#li17").removeClass("active");
        }
    }
};
var getStepCompletedMsgQuotation = function (currentstep, clickstep) {
    var stepArray = [{ StepID: 2, StepName: "Select Unit" }, { StepID: 3, StepName: "Complete Registration" }, { StepID: 4, StepName: "Select Options" }, { StepID: 5, StepName: "Quotation" }/*, { StepID: 6, StepName: "Policies & Conditions" }*/, { StepID: 7, StepName: "Applicants" }, { StepID: 8, StepName: "Responsibility" }, { StepID: 9, StepName: "Personal Info" }, { StepID: 10, StepName: "Residence History" }, { StepID: 11, StepName: "Employment and Income" }, { StepID: 12, StepName: "Emergency Contacts" }, { StepID: 13, StepName: "Vehicle Info" }, { StepID: 14, StepName: "Pet Info" }, { StepID: 15, StepName: "Payment" }, { StepID: 16, StepName: "Lease" }];
    var clickstepname = "";
    var remainingstepname = "";

    $.each(stepArray, function (index, elementValue) {

        if (elementValue.StepID == clickstep) {
            clickstepname = elementValue.StepName;
        }

        if (elementValue.StepID >= currentstep && elementValue.StepID < clickstep) {
            remainingstepname += "<b>" + elementValue.StepName + "</b><br/>";
        }
    });
    var msg = "To view \"<b>" + clickstepname + "</b>\", you have to complete following step(s)<br/>" + remainingstepname;
    return msg;
};

var showCurrentStepQuotation = function (stepid, id) {
    if (stepid == 1) {
        $("#subMenu").addClass("hidden");
        $("#li1").addClass("active");
        $("#li2").removeClass("active");
        $("#li3").removeClass("active");
        $("#li4").removeClass("active");
        $("#li5").removeClass("active");
        $("#li6").removeClass("active");
        $("#li7").removeClass("active");

        $("#step1").removeClass("hidden");
        $("#step2").addClass("hidden");
        $("#step3").addClass("hidden");
        $("#step4").addClass("hidden");
        $("#step5").addClass("hidden");
        $("#step6").addClass("hidden");
        $("#step7").addClass("hidden");
        $("#step8").addClass("hidden");
        $("#step9").addClass("hidden");
        $("#step10").addClass("hidden");
        $("#step11").addClass("hidden");
        $("#step12").addClass("hidden");
        $("#step13").addClass("hidden");
        $("#step14").addClass("hidden");
        $("#step15").addClass("hidden");
        $("#step16").addClass("hidden");
        $("#step17").addClass("hidden");
        $("#subMenu").addClass("hidden");
    }
    if (stepid == "2") {
        $("#subMenu").addClass("hidden");
        $("#as2").removeAttr("onclick");
        $("#as2").attr("onclick", "goToStepQuotation(2,2,1)");
        $("#li1").addClass("active");
        $("#li2").addClass("active");

        $("#li3").removeClass("active");
        $("#li4").removeClass("active");
        $("#li5").removeClass("active");
        $("#li6").removeClass("active");
        $("#li7").removeClass("active");
        $("#step1").addClass("hidden");
        $("#step3").addClass("hidden");
        $("#step4").addClass("hidden");
        $("#step2").removeClass("hidden");
        $("#step5").addClass("hidden");
        $("#step6").addClass("hidden");
        $("#step7").addClass("hidden");
        $("#step8").addClass("hidden");
        $("#step9").addClass("hidden");
        $("#step10").addClass("hidden");
        $("#step11").addClass("hidden");
        $("#step12").addClass("hidden");
        $("#step13").addClass("hidden");
        $("#step14").addClass("hidden");
        $("#step15").addClass("hidden");
        $("#step16").addClass("hidden");
        $("#step17").addClass("hidden");

    }
    if (stepid == "3") {
        $("#subMenu").addClass("hidden");
        $("#as333").removeAttr("onclick");
        $("#as333").attr("onclick", "goToStepQuotation(4,4,0)");
        $("#subMenu").addClass("hidden");

        $("#li1").addClass("active");
        $("#li2").addClass("active");
        $("#li3").addClass("active");

        $("#li4").removeClass("active");
        $("#li5").removeClass("active");
        $("#li6").removeClass("active");
        $("#li7").removeClass("active");
        $("#step2").addClass("hidden");
        $("#step1").addClass("hidden");
        $("#step4").addClass("hidden");
        $("#step3").removeClass("hidden");
        $("#step5").addClass("hidden");
        $("#step6").addClass("hidden");
        $("#step7").addClass("hidden");
        $("#step8").addClass("hidden");
        $("#step9").addClass("hidden");
        $("#step10").addClass("hidden");
        $("#step11").addClass("hidden");
        $("#step12").addClass("hidden");
        $("#step13").addClass("hidden");
        $("#step14").addClass("hidden");
        $("#step15").addClass("hidden");
        $("#step16").addClass("hidden");
        $("#step17").addClass("hidden");
        
    }
    if (stepid == "4") {

        $("#subMenu").addClass("hidden");
        $("#as444").removeAttr("onclick");
        $("#as444").attr("onclick", "goToStepQuotation(5,5,0)");

        $("#li1").addClass("active");
        $("#li2").addClass("active");
        $("#li3").addClass("active");
        $("#li4").removeClass("active");
        $("#li5").removeClass("active");
        $("#li6").removeClass("active");
        $("#li7").removeClass("active");
        $("#step2").addClass("hidden");
        $("#step1").addClass("hidden");
        $("#step4").removeClass("hidden");
        $("#step3").addClass("hidden");
        $("#step5").addClass("hidden");
        $("#step6").addClass("hidden");
        $("#step7").addClass("hidden");
        $("#step8").addClass("hidden");
        $("#step9").addClass("hidden");
        $("#step10").addClass("hidden");
        $("#step11").addClass("hidden");
        $("#step12").addClass("hidden");
        $("#step13").addClass("hidden");
        $("#step14").addClass("hidden");
        $("#step15").addClass("hidden");
        $("#step16").addClass("hidden");
        $("#step17").addClass("hidden");
        

    }
    if (stepid == "5") {

        $("#subMenu").addClass("hidden");
        $("#as5").removeAttr("onclick");
        $("#as5").attr("onclick", "goToStepQuotation(6,6,0)");

        $("#mainApplName").removeClass("hidden");
        $("#getting-startedTimeRemainingClock").removeClass("hidden");
        $("#li1").addClass("active");
        $("#li2").addClass("active");
        $("#li3").addClass("active");
        $("#li4").addClass("active");

        $("#li5").removeClass("active");
        $("#li6").removeClass("active");
        $("#li7").removeClass("active");

        $("#step2").addClass("hidden");
        $("#step1").addClass("hidden");
        $("#step4").addClass("hidden");
        $("#step3").addClass("hidden");
        $("#step5").removeClass("hidden");
        $("#step6").addClass("hidden");
        $("#step7").addClass("hidden");
        $("#step8").addClass("hidden");
        $("#step9").addClass("hidden");
        $("#step10").addClass("hidden");
        $("#step11").addClass("hidden");
        $("#step12").addClass("hidden");
        $("#step13").addClass("hidden");
        $("#step14").addClass("hidden");
        $("#step15").addClass("hidden");
        $("#step16").addClass("hidden");
        $("#step17").addClass("hidden");
        

    }
    if (stepid == "7") {

        $("#subMenu").removeClass("hidden");
        $("#as6").removeAttr("onclick");
        $("#as6").attr("onclick", "goToStepQuotation(7,7,0)");
        $("#step2").addClass("hidden");
        $("#step1").addClass("hidden");
        $("#step4").addClass("hidden");
        $("#step3").addClass("hidden");
        $("#step5").addClass("hidden");
        $("#step6").addClass("hidden");
        $("#step7").removeClass("hidden");
        $("#step8").addClass("hidden");
        $("#step9").addClass("hidden");
        $("#step10").addClass("hidden");
        $("#step11").addClass("hidden");
        $("#step12").addClass("hidden");
        $("#step13").addClass("hidden");
        $("#step14").addClass("hidden");
        $("#step15").addClass("hidden");
        $("#step16").addClass("hidden");
        $("#step17").addClass("hidden");

        $("#li7").addClass("active");
        $("#li8").removeClass("active");
        $("#li9").removeClass("active");
        $("#li10").removeClass("active");
        $("#li11").removeClass("active");
        $("#li12").removeClass("active");
        $("#li13").removeClass("active");
        $("#li14").removeClass("active");
        $("#li15").removeClass("active");
        $("#li16").removeClass("active");
        $("#li17").removeClass("active");
        
    }
};
var SaveGenerateQuotation = function () {
    $("#divLoader").show();
    var msg = "";
    var propertyId = $("#hndUID").val();
    var onlineProspectId = $("#hdnOPId").val();
    var firstName = $("#txtFirstName").val();
    var lastName = $("#txtLastName").val();
    var middleInitial = $("#txtMiddleInitialReg").val();

    var gender = $("#ddlGenderReg").val();
    var otherGender = $("#txtOtherGenderReg").val();

    var phoneNumber = unformatText($("#txtPhoneNumber").val());
    var emailId = $("#txtEmail").val();

    var ssnNumber = $("#txtSSNNumberReg").attr("data-value");
    var ssncheck = $("#txtSSNNumberReg").val();

    var idType = $("#ddlIDTypeReg").val();
    var idState = $("#ddlStateIDDocReg").val();
    var idNumber = $("#txtIDNumberReg").attr("data-value");

    var country = $("#txtCountryReg").val();
    var homeAddress1 = $("#txtAddress1Reg").val();
    var homeAddress2 = $("#txtAddress2Reg").val();
    var stateHome = $("#ddlStateReg").val();
    var cityHome = $("#ddlCityReg").val();
    var zipHome = $("#txtZipReg").val();

    var marketsource = $("#ddlMarketSource").val();

    //var password = $("#txtPassword").val();
    //var confirmPassword = $("#txtConfPassword").val();

    var address = $("#txtAddress").val();
    var dob = $("#txtDOB").val();
    var annualIncome = $("#txtAnnualIncome").val();
    var addiAnnualIncome = $("#txtAddiAnnualIncome").val();

    var moveInDate = $("#txtDate_Quotation").val();
    var isAgree = $("#chkAgreeTerms").is(":checked") ? "1" : "0";
    var leaseterm = $("#hndLeaseTermID").val();

    if (!firstName) {
        msg += "Please fill the First Name </br>";
    }
    if (!lastName) {
        msg += "Please fill the  Last Name </br>";
    }

    if (!gender || gender == "0") {
        msg += "Please Select The Gender </br>";
    }
    else if (gender == "3") {
        if (!otherGender) {
            msg += "Please Fill The Other Gender </br>";
        }
    } else if (gender == "2") {
        if (!middleInitial) {
            msg += "Please enter Middle Name  </br>";
        }
    }

    if (!phoneNumber) {
        msg += "Please fill Mobile Number </br>";
    }
    else {
        if (phoneNumber.length < 10) {
            msg += "Please enter 10 digit mobile number </br>";
        }
    }
    if (!emailId) {
        msg += "Please fill the Email </br>";
    } else {
        if (!validateEmail($("#txtEmail").val())) {
            msg += "Please fill Valid Email </br>";
        }
    }


    //if (!password) {
    //    msg += "Please fill the Password </br>";
    //} else {

    //    var result = checkStrength($("#txtPassword").val());
    //    if (!result) {
    //        return;
    //    }

    //    if (password != confirmPassword) {
    //        msg += "Password and Confirm Password must be the same</br>";
    //    }
    //}

    if (msg != "") {
        $.alert({
            title: "",
            content: msg,
            type: 'red'
        });
        $("#divLoader").hide();
        return;
    }

    var model = {
        ID: onlineProspectId,
        PropertyId: propertyId,
        FirstName: firstName,
        MiddleInitial: middleInitial,
        LastName: lastName,
        Email: emailId,
        Phone: phoneNumber,
        Address: address,
        Password: password,
        DateofBirth: dob,
        AnnualIncome: annualIncome,
        AddiAnnualIncome: addiAnnualIncome,
        Marketsource: marketsource,
        MoveInDate: moveInDate,
        LeaseTerm: leaseterm,

        DocumentType: idType,
        DocumentState: idState,
        DocumentIDNumber: idNumber,
        SSN: ssnNumber,
        Country: country,
        HomeAddress1: homeAddress1,
        HomeAddress2: homeAddress2,
        StateHome: stateHome,
        CityHome: cityHome,
        ZipHome: zipHome,

        Gender: gender,
        OtherGender: otherGender
    };

    $.ajax({
        url: '/Admin/GenerateQuotation/SaveGenerateQuotation',
        type: 'post',
        data: JSON.stringify(model),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {

            $("#divLoader").hide();
            var idmsg = response.msg.split('|');
            if (idmsg[0] != 0) {
                $("#hdnOPId").val(idmsg[0]);
                $("#lblQuoteID").text("#" + idmsg[0]);

                getApplicantListsQuotation();
                getApplyNowListGenerateQuotation(idmsg[0]);
                getTenantOnlineListGenerateQuotation(idmsg[0]);
                $("#hndIsRegister").val("1");
                goToStepQuotation(4, 4, 0);
                //getApplicantListsGenerateQuotation(idmsg[0]);
                $("#divstep3save").addClass("hidden");
                $("#divstep3").removeClass("hidden");
                $("#hdnStepCompleted").val(4);
                window.location = "/Admin/GenerateQuotation/Index/" + idmsg[2];
            } else {
                $("#hdnStepCompleted").val(2);
                $("#hdnOPId").val(0);
                $("#hndUID").val(0);
                showCurrentStepQuotation(2, 2);
                var floorNoSearch = $("#hndFloorNo").val();
                var bedRoomSearch = $("#hndBedRoom").val();
                var buildingSearch = $("#hndBuilding").val();
                var ubitIdSearch = 0;

                if (ubitIdSearch != 0 && buildingSearch != "" && floorNoSearch > 0) {
                    showFloorPlan(floorNoSearch, bedRoomSearch, buildingSearch);
                }
                getPropertyUnitListQuotation(buildingSearch);
                $("#popUnitPlan").empty();
                $.alert({
                    title: "",
                    content: idmsg[1],
                    type: 'red'
                });
            }
        }
    });
}
var fillMarketSourceDDLGenQuotation = function () {
    $("#divLoader").show();
    $.ajax({
        url: '/Admin/ProspectManagement/GetDdlMarketSourceList',
        method: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            $("#ddlMarketSource").empty();
            $("#ddlMarketSource").append("<option value='0'>-- Select Market Source --</option>");
            $.each(response.model, function (index, elementValue) {
                $("#ddlMarketSource").append("<option value=" + elementValue.AdID + ">" + elementValue.Advertiser + "</option>");
            });
            $("#divLoader").hide();
        }
    });
}
var SaveQuoteQuotation = function (stepcompleted) {


    $("#divLoader").show();

    var id = $("#hdnUserId").val();

    //if (id != 0) {
    //    var uid = $("#hndUID").val();
    //    var model = { Id: id, UID: uid };

    //    $.ajax({
    //        url: '/ApplyNow/GetStaticApplicantValues',
    //        type: "post",
    //        contentType: "application/json utf-8",
    //        data: JSON.stringify(model),
    //        dataType: "JSON",
    //        success: function (response) {
    //            $("#divLoader").hide();
    //            /*Select Option Starts*/
    //            $("#lblArea").text(response.model.AreaSqft);
    //            $("#lblLease").text(response.model.LeaseMonths);
    //            $("#lblBed").text(response.model.Bedroom);
    //            $("#lblBath").text(response.model.Bathroom);
    //            $("#lblDeposit").text(formatMoney(response.model.Deposit));
    //            //console.log("label: " +$("#lblDeposit").text());
    //            $("#lblRent").text(formatMoney(response.model.Rent));
    //            $("#lblLease2").text(response.model.LeaseMonths);
    //            $("#lbldeposit1").text(formatMoney(response.model.Deposit));
    //            $("#lblPetDeposit").text(formatMoney(response.model.PetDeposit));
    //            $("#lblPetDNAAmt").text(formatMoney(response.model.PetDNAAmt));
    //            $("#lblFMRent").text(formatMoney(unformatText($("#lblRent").text())));
    //            $("#lblRent33").text(formatMoney(unformatText($("#lblRent").text())));
    //            $("#lblAdditionalParking").text(formatMoney(response.model.AdditionalParkingAmt));
    //            $("#lblStorageUnit").text(formatMoney(response.model.StorageAmt));
    //            $("#lblPetFee").text(formatMoney(response.model.PetPlaceAmt));
    //            $("#lblTrashAmt").text(formatMoney(response.model.TrashAmt));
    //            $("#lblPestAmt").text(formatMoney(response.model.PestAmt));
    //            $("#lblConvergentAmt").text(formatMoney(response.model.ConvergentAmt));
    //            var totalAmt = (parseFloat(response.model.Rent) + parseFloat(unformatText($("#lblAdditionalParking").text())) + parseFloat(unformatText($("#lblStorageUnit").text())) + parseFloat(unformatText($("#lblTrashAmt").text())) + parseFloat($("#lblPestAmt").text()) + parseFloat($("#lblConvergentAmt").text()) + parseFloat(unformatText($("#lblPetFee").text()))).toFixed(2);
    //            $("#lbltotalAmount").text(formatMoney(totalAmt));
    //            /*Select Option Ends*/
    //            /*Quotation Starts*/
    //            $("#lblFNLQuoteDate").text(response.model.QuoteStartDate);
    //            $("#lblFNLQuoteExpires").text(response.model.QuoteEndDate);
    //            $("#lblFNLPhone").text(formatPhoneFax(response.model.Phone));
    //            $("#lblFNLEmail").text(response.model.Email);
    //            $("#lblFNLTerm").text(response.model.LeaseMonths);
    //            $("#lblFNLResidentName1").text(response.model.ResidentName);
    //            $("#lblFNLDesiredMoveIn").text(response.model.MoveInDateString);
    //            $("#lblFNLUnit").text("#" + response.model.UnitName);
    //            $("#lblFNLModel").text(response.model.Building);
    //            $("#fdepo").text("$" + $("#lbldeposit1").text());
    //            $("#lblMonthly_MonthlyCharge").text("$" + $("#lblRent").text());
    //            // console.log(unformatText($("#lblRent").text()))
    //            $("#lblProrated_MonthlyCharge").text("$" + formatMoney(parseFloat(parseFloat(unformatText($("#lblRent").text())) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
    //            $("#spanTrashRecycle").text("$" + $("#lblTrashAmt").text());
    //            // $("#lblProrated_TrashAmt").text("$" + parseFloat($("#lblTrashAmt").text() / parseFloat(numberOfDays) * remainingday));
    //            $("#lblProrated_TrashAmt").text("$" + formatMoney(parseFloat(parseFloat(unformatText($("#lblTrashAmt").text())) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
    //            $("#spanPestControl").text("$" + $("#lblPestAmt").text());
    //            //$("#lblProrated_PestAmt").text("$" + parseFloat($("#lblPestAmt").text() / parseFloat(numberOfDays) * remainingday));
    //            $("#lblProrated_PestAmt").text("$" + formatMoney(parseFloat(parseFloat(unformatText($("#lblPestAmt").text())) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
    //            $("#spanConvergentAmt").text("$" + $("#lblConvergentAmt").text());
    //            //$("#lblProrated_ConvergentAmt").text("$" + parseFloat($("#lblConvergentAmt").text() / parseFloat(numberOfDays) * remainingday));
    //            $("#lblProrated_ConvergentAmt").text("$" + formatMoney(parseFloat(parseFloat(unformatText($("#lblConvergentAmt").text())) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
    //            $("#lblMonthly_AditionalParking").text("$" + $("#lblAdditionalParking").text());
    //            //$("#lblProrated_AditionalParking").text("$" + parseFloat($("#lblAdditionalParking").text() / parseFloat(numberOfDays) * remainingday));
    //            $("#lblProrated_AditionalParking").text("$" + formatMoney(parseFloat(parseFloat(unformatText($("#lblAdditionalParking").text())) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
    //            $("#lblMonthly_Storage").text("$" + $("#lblStorageUnit").text());
    //            //$("#lblProrated_Storage").text("$" + parseFloat($("#lblStorageUnit").text() / parseFloat(numberOfDays) * remainingday));
    //            $("#lblProrated_Storage").text("$" + formatMoney(parseFloat(parseFloat(unformatText($("#lblStorageUnit").text())) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
    //            $("#lblMonthly_PetRent").text("$" + $("#lblPetFee").text());
    //            //$("#lblProrated_PetRent").text("$" + parseFloat($("#lblPetFee").text() / parseFloat(numberOfDays) * remainingday));
    //            $("#lblProrated_PetRent").text("$" + formatMoney(parseFloat(parseFloat(unformatText($("#lblPetFee").text())) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
    //            var totalRentAmt = formatMoney(parseFloat(unformatText($("#lblMonthly_MonthlyCharge").text().replace('$', ''))) + parseFloat($("#spanTrashRecycle").text().replace('$', '')) + parseFloat($("#spanPestControl").text().replace('$', '')) + parseFloat($("#spanConvergentAmt").text().replace('$', '')) + parseFloat($("#lblMonthly_AditionalParking").text().replace('$', '')) + parseFloat($("#lblMonthly_Storage").text().replace('$', '')) + parseFloat($("#lblMonthly_PetRent").text().replace('$', '')));
    //            var totalRentAmt_Prorated = formatMoney(parseFloat(unformatText($("#lblProrated_MonthlyCharge").text().replace('$', ''))) + parseFloat($("#lblProrated_TrashAmt").text().replace('$', '')) + parseFloat($("#lblProrated_PestAmt").text().replace('$', '')) + parseFloat($("#lblProrated_ConvergentAmt").text().replace('$', '')) + parseFloat($("#lblProrated_AditionalParking").text().replace('$', '')) + parseFloat($("#lblProrated_Storage").text().replace('$', '')) + parseFloat($("#lblProrated_PetRent").text().replace('$', '')));

    //            $("#lblMonthly_TotalRent").text(totalRentAmt);
    //            $("#lblProrated_TotalRent").text(totalRentAmt_Prorated);

    //            /*Quotation Ends*/
    //            /*Responsibility left block Start*/

    //            $("#lblVehicleFees1").text(formatMoney(response.model.VehicleRegistration));
    //            $("#lbdepo6").text(formatMoney(response.model.Deposit));
    //            // $("#lbdepo6").text(formatMoney(response.model.Deposit));
    //            $("#lbpetd6").text(formatMoney(response.model.PetDeposit));
    //            $("#lbpetdna6").text(formatMoney(response.model.PetDNAAmt));
    //            $("#lblProratedRent6").text(formatMoney(response.model.Prorated_Rent));
    //            $("#lbtotdueatmov6").text(formatMoney(response.model.MoveInCharges));

    //            $("#lblRFPMonthlyCharges").text(formatMoney(response.model.Rent));
    //            $("#lblRFPAdditionalParking").text(formatMoney(response.model.AdditionalParkingAmt));
    //            $("#lblRFPStorageUnit").text(formatMoney(response.model.StorageAmt));
    //            $("#lblRFPPetRent").text(formatMoney(response.model.PetPlaceAmt));
    //            $("#lblRFPTrashRecycling").text(formatMoney(response.model.TrashAmt));
    //            $("#lblRFPPestControl").text(formatMoney(response.model.PestAmt));
    //            $("#lblRFPConvergentbillingfee").text(formatMoney(response.model.ConvergentAmt));
    //            $("#lblRFPTotalMonthlyPayment").text(formatMoney(response.model.MonthlyCharges));

    //            /*Responsibility left block Ends*/

    //        }
    //    });


    //    var msg = "";
    //    var ProspectId = $("#hdnOPId").val();
    //    var ParkingAmt = unformatText($("#lblAdditionalParking").text());
    //    var StorageAmt = unformatText($("#lblStorageUnit").text());
    //    var PetPlaceAmt = unformatText($("#lblPetFee").text());
    //    var PestAmt = $("#lblPestAmt").text();
    //    var ConvergentAmt = $("#lblConvergentAmt").text();
    //    var TrashAmt = unformatText($("#lblTrashAmt").text());
    //    var moveInDate = $("#txtDate_Quotation").val();
    //    var moveInCharges = unformatText($("#ftotal").text());
    //    var monthlyCharges = unformatText($("#lblMonthly_TotalRent").text());

    //    var petDeposit = unformatText($("#lblPetDeposit").text());
    //    var fobAmt = $("#lblFobFee").text();
    //    var deposit = $("#lbdepo6").text();
    //    var rent = unformatText($("#lblFMRent").text());
    //    var proratedrent = unformatText($("#lblProrated_TotalRent").text());
    //    //var vehiclefees = $("#lblVehicleFees1").text();
    //    var vehiclefees = 0;
    //    var adminfees = $("#lblAdminFees").text();
    //    var leaseterm = $("#hndLeaseTermID").val();
    //    var petDNAAmt = unformatText($("#lblPetDNAAmt").text());
    //    var propertyId = $("#hndUID").val();
    //    var additionalParking = $("#hndAdditionalParking").val();
    //    var noofbed = $("#lblBed").text();
    //    if (parseInt(additionalParking) > 0) {
    //        if (parseInt(noofbed) < 3) {
    //            vehiclefees = 15 * (parseInt(additionalParking) + 1);
    //            $("#spanVechReg").text("Vehicle Registration (" + (parseInt(additionalParking) + 1) + " Vehicles)");
    //            $("#spanVechReg1").text("Vehicle Registration (" + (parseInt(additionalParking) + 1) + " Vehicles)");
    //        }
    //        else {
    //            vehiclefees = 15 * (parseInt(additionalParking) + 2);
    //            $("#spanVechReg").text("Vehicle Registration (" + (parseInt(additionalParking) + 2) + " Vehicles)");
    //            $("#spanVechReg1").text("Vehicle Registration (" + (parseInt(additionalParking) + 2) + " Vehicles)");
    //        }
    //        $("#lblVehicleFees").text("$" + parseFloat(vehiclefees).toFixed(2));
    //        $("#lblVehicleFees1").text(parseFloat(vehiclefees).toFixed(2));
    //    }

    //    var model = {
    //        ID: ProspectId,
    //        PropertyId: propertyId,
    //        ParkingAmt: ParkingAmt,
    //        StorageAmt: StorageAmt,
    //        PetPlaceAmt: PetPlaceAmt,
    //        PestAmt: PestAmt,
    //        ConvergentAmt: ConvergentAmt,
    //        TrashAmt: TrashAmt,
    //        MoveInCharges: moveInCharges,
    //        MonthlyCharges: monthlyCharges,
    //        MoveInDate: moveInDate,
    //        PetDeposit: petDeposit,
    //        FOBAmt: fobAmt,
    //        Deposit: deposit,
    //        Rent: rent,
    //        Prorated_Rent: proratedrent,
    //        VehicleRegistration: vehiclefees,
    //        AdminFees: adminfees,
    //        LeaseTerm: leaseterm,
    //        PetDNAAmt: petDNAAmt,
    //        StepCompleted: stepcompleted,
    //        AdditionalParking: additionalParking
    //    };

    //    $.ajax({
    //        url: '/ApplyNow/UpdateOnlineProspect',
    //        type: 'post',
    //        data: JSON.stringify(model),
    //        contentType: 'application/json; charset=utf-8',
    //        dataType: 'json',
    //        success: function (response) {
    //            $("#divLoader").hide();
    //            var idmsg = response.msg.split('|');
    //            var hasUnitChange = idmsg[1];
    //            if (hasUnitChange == 1) {
    //                updateCalculationQuotation();
    //            }
    //            $("#lblFNLQuote").text(idmsg[0]);
    //            var stepcomp = parseInt($("#hdnStepCompleted").val());
    //            if (stepcomp < stepcompleted) {
    //                $("#hdnStepCompleted").val(stepcompleted);
    //            }
    //        }
    //    });
    //}
    //else {
    //    var msg = "";
    //    var ProspectId = $("#hdnOPId").val();
    //    var ParkingAmt = unformatText($("#lblAdditionalParking").text());
    //    var StorageAmt = unformatText($("#lblStorageUnit").text());
    //    var PetPlaceAmt = unformatText($("#lblPetFee").text());
    //    var PestAmt = $("#lblPestAmt").text();
    //    var ConvergentAmt = $("#lblConvergentAmt").text();
    //    var TrashAmt = unformatText($("#lblTrashAmt").text());
    //    var moveInDate = $("#txtDate_Quotation").val();
    //    var moveInCharges = unformatText($("#ftotal").text());
    //    var monthlyCharges = unformatText($("#lblMonthly_TotalRent").text());

    //    var petDeposit = unformatText($("#lblPetDeposit").text());
    //    var fobAmt = $("#lblFobFee").text();
    //    var deposit = $("#lbdepo6").text();
    //    var rent = unformatText($("#lblFMRent").text());
    //    var proratedrent = unformatText($("#lblProrated_TotalRent").text());
    //    //var vehiclefees = $("#lblVehicleFees1").text();
    //    var vehiclefees = 0;
    //    var adminfees = $("#lblAdminFees").text();
    //    var leaseterm = $("#hndLeaseTermID").val();
    //    var petDNAAmt = unformatText($("#lblPetDNAAmt").text());
    //    var propertyId = $("#hndUID").val();
    //    var additionalParking = $("#hndAdditionalParking").val();
    //    var noofbed = $("#lblBed").text();
    //    if (parseInt(additionalParking) > 0) {
    //        if (parseInt(noofbed) < 3) {
    //            vehiclefees = 15 * (parseInt(additionalParking) + 1);
    //            $("#spanVechReg").text("Vehicle Registration (" + (parseInt(additionalParking) + 1) + " Vehicles)");
    //            $("#spanVechReg1").text("Vehicle Registration (" + (parseInt(additionalParking) + 1) + " Vehicles)");
    //        }
    //        else {
    //            vehiclefees = 15 * (parseInt(additionalParking) + 2);
    //            $("#spanVechReg").text("Vehicle Registration (" + (parseInt(additionalParking) + 2) + " Vehicles)");
    //            $("#spanVechReg1").text("Vehicle Registration (" + (parseInt(additionalParking) + 2) + " Vehicles)");
    //        }
    //        $("#lblVehicleFees").text("$" + parseFloat(vehiclefees).toFixed(2));
    //        $("#lblVehicleFees1").text(parseFloat(vehiclefees).toFixed(2));
    //    }

    //    var model = {
    //        ID: ProspectId,
    //        PropertyId: propertyId,
    //        ParkingAmt: ParkingAmt,
    //        StorageAmt: StorageAmt,
    //        PetPlaceAmt: PetPlaceAmt,
    //        PestAmt: PestAmt,
    //        ConvergentAmt: ConvergentAmt,
    //        TrashAmt: TrashAmt,
    //        MoveInCharges: moveInCharges,
    //        MonthlyCharges: monthlyCharges,
    //        MoveInDate: moveInDate,
    //        PetDeposit: petDeposit,
    //        FOBAmt: fobAmt,
    //        Deposit: deposit,
    //        Rent: rent,
    //        Prorated_Rent: proratedrent,
    //        VehicleRegistration: vehiclefees,
    //        AdminFees: adminfees,
    //        LeaseTerm: leaseterm,
    //        PetDNAAmt: petDNAAmt,
    //        StepCompleted: stepcompleted,
    //        AdditionalParking: additionalParking
    //    };

    //    $.ajax({
    //        url: '/ApplyNow/UpdateOnlineProspect',
    //        type: 'post',
    //        data: JSON.stringify(model),
    //        contentType: 'application/json; charset=utf-8',
    //        dataType: 'json',
    //        success: function (response) {
    //            $("#divLoader").hide();
    //            var idmsg = response.msg.split('|');
    //            var hasUnitChange = idmsg[1];
    //            if (hasUnitChange == 1) {
    //                updateCalculationQuotation();
    //            }
    //            $("#lblFNLQuote").text(idmsg[0]);
    //            var stepcomp = parseInt($("#hdnStepCompleted").val());
    //            if (stepcomp < stepcompleted) {
    //                $("#hdnStepCompleted").val(stepcompleted);
    //            }
    //        }
    //    });
    //}
    var msg = "";
    var ProspectId = $("#hdnOPId").val();
    var ParkingAmt = unformatText($("#lblAdditionalParking").text());
    var StorageAmt = unformatText($("#lblStorageUnit").text());
    var PetPlaceAmt = unformatText($("#lblPetFee").text());
    var PestAmt = $("#lblPestAmt").text();
    var ConvergentAmt = $("#lblConvergentAmt").text();
    var TrashAmt = unformatText($("#lblTrashAmt").text());
    var moveInDate = $("#txtDate_Quotation").val();
    var moveInCharges = unformatText($("#ftotal").text());
    var monthlyCharges = unformatText($("#lblMonthly_TotalRent").text());

    var petDeposit = unformatText($("#lblPetDeposit").text());
    var fobAmt = $("#lblFobFee").text();
    var deposit = $("#lbdepo6").text();
    var rent = unformatText($("#lblFMRent").text());
    var proratedrent = unformatText($("#lblProrated_TotalRent").text());
    //var vehiclefees = $("#lblVehicleFees1").text();
    var vehiclefees = 0;
    var adminfees = $("#lblAdminFees").text();
    var leaseterm = $("#hndLeaseTermID").val();
    var petDNAAmt = unformatText($("#lblPetDNAAmt").text());
    var propertyId = $("#hndUID").val();
    var additionalParking = $("#hndAdditionalParking").val();
    var noofbed = $("#lblBed").text();
    if (parseInt(additionalParking) > 0) {
        if (parseInt(noofbed) < 3) {
            vehiclefees = 15 * (parseInt(additionalParking) + 1);
            $("#spanVechReg").text("Vehicle Registration (" + (parseInt(additionalParking) + 1) + " Vehicles)");
            $("#spanVechReg1").text("Vehicle Registration (" + (parseInt(additionalParking) + 1) + " Vehicles)");
        }
        else {
            vehiclefees = 15 * (parseInt(additionalParking) + 2);
            $("#spanVechReg").text("Vehicle Registration (" + (parseInt(additionalParking) + 2) + " Vehicles)");
            $("#spanVechReg1").text("Vehicle Registration (" + (parseInt(additionalParking) + 2) + " Vehicles)");
        }
        $("#lblVehicleFees").text(parseFloat(vehiclefees).toFixed(2));
        $("#lblVehicleFees1").text(parseFloat(vehiclefees).toFixed(2));
    }

    var model = {
        ID: ProspectId,
        PropertyId: propertyId,
        ParkingAmt: ParkingAmt,
        StorageAmt: StorageAmt,
        PetPlaceAmt: PetPlaceAmt,
        PestAmt: PestAmt,
        ConvergentAmt: ConvergentAmt,
        TrashAmt: TrashAmt,
        MoveInCharges: moveInCharges,
        MonthlyCharges: monthlyCharges,
        MoveInDate: moveInDate,
        PetDeposit: petDeposit,
        FOBAmt: fobAmt,
        Deposit: deposit,
        Rent: rent,
        Prorated_Rent: proratedrent,
        VehicleRegistration: vehiclefees,
        AdminFees: adminfees,
        LeaseTerm: leaseterm,
        PetDNAAmt: petDNAAmt,
        StepCompleted: stepcompleted,
        AdditionalParking: additionalParking
    };

    $.ajax({
        url: '/ApplyNow/UpdateOnlineProspect',
        type: 'post',
        data: JSON.stringify(model),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $("#divLoader").hide();
            var idmsg = response.msg.split('|');
            var hasUnitChange = idmsg[1];
            if (hasUnitChange == 1) {
                updateCalculationQuotation();
            }
            $("#lblFNLQuote").text(idmsg[0]);
            var stepcomp = parseInt($("#hdnStepCompleted").val());
            if (stepcomp < stepcompleted) {
                $("#hdnStepCompleted").val(stepcompleted);
            }
        }
    });
};
var updateCalculationQuotation = function () {
    addParkingArray = [];
    $("#hndAdditionalParking").val(0);
    //lbltotalAmount
    $("#lblAdditionalParking").text("0.00");
    var totalAmount = (parseFloat(unformatText($("#lblFMRent").text())) + parseFloat(unformatText($("#lblStorageUnit").text())) + parseFloat(unformatText($("#lblTrashAmt").text())) + parseFloat($("#lblPestAmt").text()) + parseFloat($("#lblConvergentAmt").text()) + parseFloat(unformatText($("#lblPetFee").text()))).toFixed(2);
    $("#lbltotalAmount").text(formatMoney(totalAmount));
    getApplicantListsQuotation();
}
var SaveCheckPolicyQuotation = function (stepcompleted) {
    $("#divLoader").show();
    var msg = "";
    var ProspectId = $("#hdnOPId").val();
    var isRentalPolicy = $("#chkRentalPolicy").is(":checked") ? "1" : "0";
    var isRentalQualification = $("#chkRentalQual").is(":checked") ? "1" : "0";
    var firstName = $("#txtFirstName").val();
    var lastName = $("#txtLastName").val();

    var emailId = $("#txtEmail").val();


    if (isRentalPolicy == 0) {
        msg += "Please agree Rental Policy";
    }
    if (isRentalQualification == 0) {
        msg += "Please agree Rental Qualification";
    }

    var model = {
        ID: ProspectId,
        IsRentalPolicy: isRentalPolicy,
        IsRentalQualification: isRentalQualification,
        FirstName: firstName,
        LastName: lastName,
        Email: emailId,
        StepCompleted: stepcompleted
    };

    $.ajax({
        url: '/ApplyNow/SaveCheckPolicy',
        type: 'post',
        data: JSON.stringify(model),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $("#divLoader").hide();
            var stepcomp = parseInt($("#hdnStepCompleted").val());
            if (stepcomp < stepcompleted) {
                $("#hdnStepCompleted").val(stepcompleted);
            }
        }
    });
}

var getApplyNowListGenerateQuotation = function (id) {
    $("#divLoader").show();
    var model = {
        id: id
    }
    $.ajax({
        url: '/ApplyNow/GetApplyNowList',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            $("#txtBVFirstName").val(response.model.FirstName);
            $("#txtBVLastName").val(response.model.LastName);
            $("#txtBVPhone").val(response.model.Phone);
            $("#txtBVEmail").val(response.model.Email);
            $("#txtBVAddress").val(response.model.Address);
        }
    });
}

//17082019-code changed
var fillStateDDL_HomeQuotation = function (countryid, selval) {
    $("#divLoader").show();
    var param = { CID: countryid };
    $.ajax({
        url: '/City/FillStateDropDownListByCountryID',
        method: "post",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#divLoader").hide();
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {
                $("#ddlStateHome").empty();
                $("#ddlStateHome").append("<option value='0'>--Select State--</option>");
                $.each(response, function (index, elementValue) {
                    $("#ddlStateHome").append("<option value=" + elementValue.ID + ">" + elementValue.StateName + "</option>");
                });
                $("#ddlStateHome").val(selval);
            }
        }
    });
}
var fillStateDDL_Home2Quotation = function (countryid, selval) {
    $("#divLoader").show();
    var param = { CID: countryid };
    $.ajax({
        url: '/City/FillStateDropDownListByCountryID',
        method: "post",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#divLoader").hide();
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {
                $("#ddlStateHome2").empty();
                $("#ddlStateHome2").append("<option value='0'>--Select State--</option>");
                $.each(response, function (index, elementValue) {
                    $("#ddlStateHome2").append("<option value=" + elementValue.ID + ">" + elementValue.StateName + "</option>");
                });
                $("#ddlStateHome2").val(selval);
            }
        }
    });
}
var fillStateDDL_OfficeHEIQuotation = function (countryid, selval) {
    $("#divLoader").show();
    var param = { CID: countryid };
    $.ajax({
        url: '/City/FillStateDropDownListByCountryID',
        method: "post",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#divLoader").hide();
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {
                $("#ddlStateEmployeeHEI").empty();
                $("#ddlStateEmployeeHEI").append("<option value='0'>--Select State--</option>");
                $.each(response, function (index, elementValue) {
                    $("#ddlStateEmployeeHEI").append("<option value=" + elementValue.ID + ">" + elementValue.StateName + "</option>");
                });
                $("#ddlStateEmployeeHEI").val(selval);
            }
        }
    });
}
var fillStateDDL_OfficeQuotation = function (countryid, selval) {
    $("#divLoader").show();
    var param = { CID: countryid };
    $.ajax({
        url: '/City/FillStateDropDownListByCountryID',
        method: "post",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#divLoader").hide();
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {
                $("#ddlStateEmployee").empty();
                $("#ddlStateEmployee").append("<option value='0'>--Select State--</option>");
                $.each(response, function (index, elementValue) {
                    $("#ddlStateEmployee").append("<option value=" + elementValue.ID + ">" + elementValue.StateName + "</option>");
                });
                $("#ddlStateEmployee").val(selval);
            }
        }
    });
}
var fillStateDDL_EmeContactQuotation = function (countryid, selval) {
    $("#divLoader").show();
    var param = { CID: countryid };
    $.ajax({
        url: '/City/FillStateDropDownListByCountryID',
        method: "post",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#divLoader").hide();
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {
                $("#ddlStateContact").empty();
                $("#ddlStateContact").append("<option value='0'>--Select State--</option>");
                $.each(response, function (index, elementValue) {
                    $("#ddlStateContact").append("<option value=" + elementValue.ID + ">" + elementValue.StateName + "</option>");
                });
                $("#ddlStateContact").val(selval);
            }
        }
    });
}
var fillStateDDLQuotation = function () {
    $("#divLoader").show();
    var param = { CID: 1 };
    $.ajax({
        url: '/City/FillStateDropDownListByCountryID',
        method: "post",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#divLoader").hide();
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {
                $("#ddlState").empty();
                $("#ddlStatePersonal").empty();
                $("#ddlVState").empty();
                $("#ddlState").append("");
                $("#ddlStatePersonal").append("<option value='0'>--Select State--</option>");
                $("#ddlVState").append("<option value='0'>--Select State--</option>");
                $.each(response, function (index, elementValue) {
                    $("#ddlState").append("<option value=" + elementValue.ID + ">" + elementValue.StateName + "</option>");
                    $("#ddlStatePersonal").append("<option value=" + elementValue.ID + ">" + elementValue.StateName + "</option>");
                    $("#ddlVState").append("<option value=" + elementValue.ID + ">" + elementValue.StateName + "</option>");
                });
            }
        }
    });
}

var fillStateDDLReg_HomeQuotation = function (countryid, selval) {
    $("#divLoader").show();
    var param = { CID: countryid };
    $.ajax({
        url: '/City/FillStateDropDownListByCountryID',
        method: "post",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#divLoader").hide();
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {
                $("#ddlStateIDDocReg").empty();
                $("#ddlStateIDDocReg").append("<option value='0'>--Select State--</option>");
                $.each(response, function (index, elementValue) {
                    $("#ddlStateIDDocReg").append("<option value=" + elementValue.ID + ">" + elementValue.StateName + "</option>");
                });
                $("#ddlStateIDDocReg").val(selval);

                $("#ddlStateReg").empty();
                $("#ddlStateReg").append("<option value='0'>--Select State--</option>");
                $.each(response, function (index, elementValue) {
                    $("#ddlStateReg").append("<option value=" + elementValue.ID + ">" + elementValue.StateName + "</option>");
                });
                $("#ddlStateReg").val(selval);
            }
        }
    });
}
var fillStateDDLReg_IDTypeQuotation = function (countryid, selval) {
    $("#divLoader").show();
    var param = { CID: countryid };
    $.ajax({
        url: '/City/FillStateDropDownListByCountryID',
        method: "post",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#divLoader").hide();
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {
                $("#ddlStateIDDocReg").empty();
                $("#ddlStateIDDocReg").append("<option value='0'>--Select State--</option>");
                $.each(response, function (index, elementValue) {
                    $("#ddlStateIDDocReg").append("<option value=" + elementValue.ID + ">" + elementValue.StateName + "</option>");
                });
                $("#ddlStateIDDocReg").val(selval);
            }
        }
    });
}
var fillCountryDropDownListQuotation = function () {
    $("#divLoader").show();
    $.ajax({
        url: '/City/FillCountryDropDownList',
        method: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#divLoader").hide();
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {
                $("#txtCountry").empty();
                $("#txtCountry2").empty();
                $("#txtCountryOffice").empty();
                $("#txtEmergencyCountry").empty();
                //$("#txtCountry").append("<option value='0'>Select Country</option>");
                $.each(response, function (index, elementValue) {
                    $("#txtCountry").append("<option value=" + elementValue.ID + ">" + elementValue.CountryName + "</option>");
                    $("#txtCountry2").append("<option value=" + elementValue.ID + ">" + elementValue.CountryName + "</option>");
                    $("#txtCountryOffice").append("<option value=" + elementValue.ID + ">" + elementValue.CountryName + "</option>");
                    $("#txtEmergencyCountry").append("<option value=" + elementValue.ID + ">" + elementValue.CountryName + "</option>");
                    $("#txtCountryOfficeHEI").append("<option value=" + elementValue.ID + ">" + elementValue.CountryName + "</option>");
                });
                $("#txtCountry").val(1);
                $("#txtCountry2").val(1);
                $("#txtCountryOffice").val(1);
                $("#txtEmergencyCountry").val(1);
                $("#txtCountryOfficeHEI").val(1);
                fillStateDDL_HomeQuotation(1, 0);
                fillStateDDL_OfficeQuotation(1, 0);
                fillStateDDL_EmeContactQuotation(1);
                fillStateDDL_OfficeHEIQuotation(1);
                //setTimeout(function () {
                //    $("#ddlStateHome").find("option[value='0']").attr('selected', 'selected');
                //    $("#ddlStateEmployee").find("option[value='0']").attr('selected', 'selected');
                //    $("#ddlStateContact").find("option[value='0']").attr('selected', 'selected');
                //}, 1500);
            }
        }
    });
}
//17082019-fillStateDDLQuotation code changed
var fillCityListQuotation = function (stateid) {
    $("#divLoader").show();
    var params = { StateID: stateid };
    $.ajax({
        url: '/City/GetCityListbyState',
        method: "post",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#divLoader").hide();
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {

                $("#ddlCity").empty();
                $("#ddlCity").append("<option value='0'>--Select City--</option>");
                $.each(response, function (index, elementValue) {
                    $("#ddlCity").append("<option value=" + elementValue.ID + ">" + elementValue.CityName + "</option>");
                });
            }
        }
    });
}
var fillCityListHomeQuotation = function (stateid) {
    $("#divLoader").show();
    var params = { StateID: stateid };
    $.ajax({
        url: '/City/GetCityListbyState',
        method: "post",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#divLoader").hide();
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {

                $("#ddlCityHome").empty();
                $("#ddlCityHome").append("<option value='0'>--Select City--</option>");
                $.each(response, function (index, elementValue) {

                    $("#ddlCityHome").append("<option value=" + elementValue.ID + ">" + elementValue.CityName + "</option>");

                });
            }
        }
    });
}
var fillCityListEmployeeQuotation = function (stateid) {
    $("#divLoader").show();
    var params = { StateID: stateid };
    $.ajax({
        url: '/City/GetCityListbyState',
        method: "post",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#divLoader").hide();
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {

                $("#ddlCityEmployee").empty();
                $("#ddlCityEmployee").append("<option value='0'>--Select City--</option>");
                $.each(response, function (index, elementValue) {

                    $("#ddlCityEmployee").append("<option value=" + elementValue.ID + ">" + elementValue.CityName + "</option>");

                });
            }
        }
    });
}
var fillCityListContactQuotation = function (stateid) {
    $("#divLoader").show();
    var params = { StateID: stateid };
    $.ajax({
        url: '/City/GetCityListbyState',
        method: "post",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#divLoader").hide();
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {

                $("#ddlCityContact").empty();
                $("#ddlCityContact").append("<option value='0'>--Select City--</option>");
                $.each(response, function (index, elementValue) {

                    $("#ddlCityContact").append("<option value=" + elementValue.ID + ">" + elementValue.CityName + "</option>");


                });
            }
        }
    });
}
var addModelArrayQuotation = [];
var noofcomapreQuotation = 0;


var addToCompareQuotation = function (modelname) {
    if (noofcomapreQuotation < 3) {
        //$("#modeldiv" + $("#modelname").val()).css("background-color", "");
        //$("#modeldiv" + modelname).css("background-color", "rebeccapurple");

        $("#chkCompareid" + modelname).removeClass("hidden");
        $("#chkCompareid" + modelname).prop("checked", true);
        $("#divCompare").removeClass("hidden");
        $("#divMainSearch").addClass("hidden");
        $("#btncompRemove" + modelname).removeClass("hidden");
        $("#btnCompare" + modelname).addClass("hidden");
        addModelArrayQuotation.push(modelname);

        noofcomapreQuotation = addModelArrayQuotation.length;
        $("#btncompare").text("Compare(" + noofcomapreQuotation + ")");
        getCompareModelListQuotation();
    } else {
        $.alert({
            title: "",
            content: "Please Select up to three to compare ",
            type: 'red'
        })
    }

}
var removeToCompareQuotation = function (modelname) {
    //$("#modeldiv" + $("#modelname").val()).css("background-color", "");
    //$("#modeldiv" + modelname).css("background-color", "");

    $("#chkCompareid" + modelname).addClass("hidden");
    $("#btncompRemove" + modelname).addClass("hidden");
    $("#btnCompare" + modelname).removeClass("hidden");
    addModelArrayQuotation.pop(modelname);
    noofcomapreQuotation = addModelArrayQuotation.length;
    $("#btncompare").text("Compare(" + noofcomapreQuotation + ")");
    getCompareModelListQuotation();
    if (noofcomapreQuotation == 0) {
        $("#divCompare").addClass("hidden");
        $("#divMainSearch").removeClass("hidden");
    }
}
var getCompareModelListQuotation = function () {
    $("#divLoader").show();
    var maxrent = 0;
    if ($("#txtMaxRent").val() == "0") {
        //maxrent = "10000";
    }
    else {
        maxrent = $("#txtMaxRent").val();
    }

    var bedroom = 0;
    if (!$("#ddlRoom").val()) {
        bedroom = 0;
    }
    else {
        bedroom = $("#ddlRoom").val();
    }
    var availdate = $("#txtDate_Quotation").val();



    var model = { PID: 8, AvailableDate: availdate, Current_Rent: maxrent, Bedroom: bedroom, SortOrder: "0" };
    $.ajax({
        url: "/Property/GetPropertyModelList/",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            if (response != null) {
                $("#listModelCompare").empty();
                //console.log(addModelArrayQuotation)
                var chtml = "<div class='col-sm-3'><div class='col-sm-12'><span><br><br><br><br><br></span></div><div class='col-sm-12'><span><br /> </span></div><div class='col-sm-12'><span> </span></div> <div class='col-sm-12'><span>Monthly Rent: </span></div><div class='col-sm-12'><span>Square feet: </span></div><div class='col-sm-12'><span id=''>Bedrooms: </span></div><div class='col-sm-12'><span id=''>Bathrooms: </span></div><div class='col-sm-12'><span>Available: </span></div> <div class='col-sm-12'><span id=''>Occupancy: </span></div></div>";
                $.each(response.model, function (elementType, value) {
                    for (var j = 0; j < addModelArrayQuotation.length; j++) {
                        if (addModelArrayQuotation[j] == value.Building) {
                            chtml += " <div class='col-sm-3'><div class='col-sm-12 center'><span><a href = '#' onclick='displayCompImgQuotation(\"" + value.Building + "\")'> <img src='/content/assets/img/plan/" + value.FloorPlan + "'></a> </span></div><div class='col-sm-12 center'><span><b>" + value.Building + "</b> </span></div><div class='col-sm-12 center'><span><button type='button' class='btn-default btn' onclick=getPropertyUnitListQuotation(\"" + value.Building + "\") style='width:100%;padding:5px;'>Select</button> <br /> </span></div> <div class='col-sm-12 center'><span>" + value.RentRange + " </span></div><div class='col-sm-12 center'><span>" + value.Area + "</span></div><div class='col-sm-12 center'><span id=''>" + value.Bedroom + " </span></div><div class='col-sm-12 center'><span id=''>" + value.Bathroom + " </span></div><div class='col-sm-12 center'><span>" + value.NoAvailable + " </span></div> <div class='col-sm-12 center'><span id=''>" + value.Bedroom + "</span></div></div>";

                        }
                    }
                });
                $("#listModelCompare").append(chtml);
            }
        }
    });
}


function displayImgQuotation() {
    $("#popFloorPlan").modal("show");
}


function displayCompImgQuotation(modname) {
    $("#imgFloorPlan2").attr("src", "/content/assets/img/plan/" + modname + "Det.jpg");
    $("#popFloorPlan").modal("show");
}
var SaveUpdateDocumentVerificationQuotation = function () {
    $("#divLoader").show();
    var msg = "";
    var documentVerificationID = $("#hdnDocumentVerificationId").val();
    var prospectID = $("#hdnOPId").val();
    var documentType = $("#ddlDocumentType").val();
    var documentName = $("#txtDocumentName").val();
    var documentState = $("#ddlState").val();
    var documentIdNumber = $("#txtBVIDNumber").val();


    if (documentType == "0") {
        msg += "Please Select The Document Type </br>";
    }
    if (!documentIdNumber) {
        msg += "Please enter ID Number </br>";
    }
    if (msg != "") {
        $.alert({
            title: "",
            content: msg,
            type: 'red'
        });
        $("#divLoader").hide();
        return;
    }

    $formData = new FormData();

    $formData.append('DocID', documentVerificationID);
    $formData.append('ProspectusID', prospectID);
    $formData.append('DocumentType', documentType);
    $formData.append('DocumentName', documentName);
    $formData.append('DocumentState', documentState);
    $formData.append('DocumentIDNumber', documentIdNumber);
    var photo = document.getElementById('wizard-picture');
    if (photo.files.length > 0) {
        for (var i = 0; i < photo.files.length; i++) {
            $formData.append('file-' + i, photo.files[i]);
        }
        $.ajax({
            url: '/ApplyNow/SaveDocumentVerification',
            type: 'post',
            data: $formData,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (response) {
                $("#divLoader").hide();
            }
        });
    } else {
        $.alert({
            content: "Please Upload Proof Document",
            type: 'blue'
        });
        $("#divLoader").hide();
    }
}
var saveLeaseDocQuotation = function () {
    var userid = $("#hdnOPId").val();
    $("#divLoader").show();
    var param = { TenantID: userid };
    $.ajax({
        url: "/ProspectVerification/PDFBuilder",
        method: "post",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8", // content type sent to server
        dataType: "json", //Expected data format from server
        success: function (response) {
            $("#divLoader").hide();
            window.open("/Content/assets/img/Document/" + response.result, "popupWindow", "width=900,height=600,scrollbars=yes");
            //signLeaseDoc(response.result);
        }
    });
}

var SaveLeaseDocumentVerificationQuotation = function () {
    $("#divLoader").show();

    var PID = $("#hdnOPId").val();

    $formData = new FormData();

    $formData.append('ProspectusID', PID);
    var photo = document.getElementById('upleasedoc');
    if (photo.files.length > 0) {
        for (var i = 0; i < photo.files.length; i++) {
            $formData.append('file-' + i, photo.files[i]);
        }

        $.ajax({
            url: '/Verification/SaveLeaseDocumentVerification',
            type: 'post',
            data: $formData,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (response) {
                $("#divLoader").hide();
                $.alert({
                    title: "",
                    content: "Progress Saved.",
                    type: 'blue'
                });
            }
        });
    }
    else {
        $("#divLoader").hide();
        $.alert({
            title: "",
            content: "Please Upload Lease Agreement",
            type: 'blue'
        });
    }
}
var paidamt = 0;
var getTransationLists = function (userid) {
    $("#divLoader").show();
    var model = {
        TenantID: userid,
    }
    $.ajax({
        url: "/Transaction/GetOnlineTransactionList",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            $("#tblTransaction>tbody").empty();

            $.each(response.model, function (elementType, elementValue) {
                $("#Divtranslist").removeClass("hidden");

                $("#btnpaynext").removeProp("disabled");
                var html = "<tr data-value=" + elementValue.TransID + ">";
                //html += "<td>" + elementValue.TransID + "</td>";
                //html += "<td>" + elementValue.TenantIDString + "</td>";
                html += "<td>" + elementValue.Transaction_DateString + "</td>";
                html += "<td>$" + parseFloat(elementValue.Charge_Amount).toFixed(2) + "</td>";
                html += "<td>" + elementValue.Transaction_Type + "</td>";
                //html += "<td>" + elementValue.Charge_Type + "</td>";
                html += "<td>" + elementValue.Description + "</td>";
                html += "<td>Paid</td>";
                html += "</tr>";
                $("#tblTransaction>tbody").append(html);
                paidamt += parseFloat(elementValue.Charge_Amount);
            });

            setTimeout(function () {
                if (paidamt == totpaid && totpaid > 0) {
                    // $("#carddetails").addClass("hidden");
                    $("#getting-startedTimeRemainingClock").addClass("hidden");
                }
            }, 1500);
        }
    });
}
var clearBank = function () {
    $("#hndTransMethod").val(1);
    $("#chkBank").addClass("active");
    $("#chkACH").removeClass("active");
    $("#divCard").addClass("hidden");
    $("#divBank").removeClass("hidden");

    $("#lblPaymentDet").text("Enter Bank Account Details.");
}
var clearCard = function () {
    $("#hndTransMethod").val(2);
    $("#chkACH").addClass("active");
    $("#chkBank").removeClass("active");
    $("#divCard").removeClass("hidden");
    $("#divBank").addClass("hidden");

    $("#lblPaymentDet").text("Enter Credit Card Details.");
}
var noofpark = 0;
var fillUnitParkingList = function () {
    $("#divLoader").show();
    var model = { UID: $("#hndUID").val(), PType: 2 };
    $.ajax({
        url: '/Parking/GetUnitParkingList',
        method: "post",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(model),
        dataType: "json",
        success: function (response) {
            var countPark = response.length;
            $("#divLoader").hide();
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {
                $('#ddlParking').empty();
                $("#lblParkSpace").text("");
                $("#lblAssginPakingSpace").text("");
                var dhtml = '';
                $.each(response, function (index, elementValue) {
                    if (elementValue.Status == 0) {
                        dhtml += "<option value='" + elementValue.ParkingID + "' selected='selected' data-value='" + elementValue.ParkingID + "'>" + elementValue.ParkingName + "</option>";
                        countPark--;
                    }
                    var html = "";
                    html += "<span style='text-decoration:underline; font - weight:bold;'>  #" + elementValue.ParkingName + " </span>";
                    $("#lblParkSpace").append(html);
                    $("#lblAssginPakingSpace").append(html);
                    $("#lblAssginPakingSpace1").append(html);
                    if (elementValue.Type == 2) {
                        $("#parkUnit").text("#" + elementValue.ParkingName);
                    }
                    noofpark += 1;
                });
                $('#ddlParking').append(dhtml);
            }
            if (response.length == countPark) {
                $('#btnAddVehicle').attr('disabled', 'disabled');
            }
            else {
                $('#btnAddVehicle').removeAttr('disabled');
            }
        }
    });
}

var fillParkingList = function () {
    $("#divLoader").show();
    var tenantID = $("#hdnOPId").val();
    var bedRoom = $("#hndBedRoom").val();
    var param = { TenantID: tenantID, BedRoom: bedRoom };
    //url: '/Parking/GetParkingList',
    $.ajax({
        url: '/Parking/GetParkingListByBedRoom',
        method: "post",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(param),
        dataType: "json",
        success: function (response) {
            $("#divLoader").hide();
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {
                addParkingArray = [];
                $("#tblParking>tbody").empty();
                $.each(response, function (index, elementValue) {
                    var html = '';
                    if ($("#lblBed").text() == "1" || $("#lblBed").text() == "2") {
                        $("#ModalLongDesc").text("Your Lease includes one assigned parking space. You can purchase one additional parking space for a monthly charge of $100 by clicking the “Add Item”. Additional parking spaces are limited and available on a first-come, first-serve basis.");
                    }
                    else {
                        $("#ModalLongDesc").text("Your Lease includes two assigned parking spaces. You can purchase two additional parking space for a monthly charge of $100 by clicking the “Add Item”. Additional parking spaces are limited and available on a first-come, first-serve basis.");
                    }
                    html += '<tr data-value="' + elementValue.ParkingID + '">';
                    html += '<td class="pds-id hidden" style="color:#3d3939;">' + elementValue.ParkingID + '</td>';
                    html += '<td class="pds-firstname" style="color:#3d3939;">' + elementValue.ParkingName + '</td>';
                    html += '<td class="pds-firstname" style="color:#3d3939;">$' + parseFloat(elementValue.Charges).toFixed(2) + '</td>';
                    html += '<td class="pds-firstname" style="color:#3d3939;"><input type="checkbox" id="chkAddParking"  class="addame" value=' + elementValue.ParkingID + ' onclick="selectAddParking(this)" ' + ($("#lblparkingplace").text() == elementValue.ParkingID ? "checked='checked'" : "") + ' ></td>';
                    html += '</tr>';

                    if ($("#lblparkingplace").text() == elementValue.ParkingID) {
                        addParkingArray.push({ ParkingID: elementValue.ParkingID });
                    }
                    $("#tblParking>tbody").append(html);
                });
            }
        }
    });
}
var fillStorageListGenQuot = function (orderby, sortby) {

    $("#divLoader").show();
    var tenantID = $("#hdnOPId").val();
    var param = { TenantID: tenantID, OrderBy: orderby, SortBy: sortby };
    $.ajax({
        url: '/Storage/GetStorageList',
        method: "post",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(param),
        dataType: "json",
        success: function (response) {
            $("#divLoader").hide();
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {
                addStorageArray = [];
                $("#tblStorage1>tbody").empty();
                $.each(response, function (index, elementValue) {
                    var html = '';
                    html += '<tr data-value="' + elementValue.StorageID + '">';
                    html += '<td class="pds-id hidden" style="color:#3d3939;width:0%;text-align:center;">' + elementValue.StorageID + '</td>';
                    html += '<td class="pds-firstname" style="color:#3d3939;width:18%;text-align:center;">' + elementValue.StorageName + '</td>';
                    html += '<td class="pds-firstname" style="color:#3d3939;width:48%;">' + elementValue.Description + '</td>';
                    html += '<td class="pds-firstname" style="color:#3d3939;width:20%;text-align:center;">$' + parseFloat(elementValue.Charges).toFixed(2) + '</td>';
                    html += '<td class="pds-firstname" style="color:#3d3939;width:18%;text-align:center;"><input type="checkbox" name="chkAddStorage1 id="chkAddStorage1"  class="addstorage1" value=' + elementValue.StorageID + ' onclick="selectAddStorage(this)" ' + ($("#lblstorageplace").text() == elementValue.StorageID ? "checked='checked'" : "") + '></td>';
                    html += '</tr>';
                    if ($("#lblstorageplace").text() == elementValue.StorageID) {
                        addStorageArray.push({ StorageID: elementValue.StorageID });
                    }
                    $("#tblStorage1>tbody").append(html);
                });


            }
        }
    });
};
var fillFOBList = function () {

    //$("#tblStorage>tbody").empty();
    //var html = '';
    //html += '<tr data-value="1">';
    //html += '<td class="pds-id hidden" style="color:#3d3939;">1</td>';
    //html += '<td class="pds-firstname" style="color:#3d3939;">Storage</td>';
    //html += '<td class="pds-firstname" style="color:#3d3939;">$50.00</td>';
    //html += '<td class="pds-firstname" style="color:#3d3939;"><input type="checkbox" id="chkAddStorage"  class="addstorage" value="1"></td>';
    //html += '</tr>';

    //$("#tblStorage1>tbody").append(html);

    //if (unformatText($("#lblStorageUnit").text()) == "50.00") {

    //    $("#chkAddStorage1").attr("checked", true);
    //}
}
var fillPetPlaceList = function () {
    $("#divLoader").show();
    $.ajax({
        url: '/PetManagement/GetPetPlaceList',
        method: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#divLoader").hide();
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {
                addPetPlaceArray = [];
                $("#tblPetPlace>tbody").empty();
                $.each(response, function (index, elementValue) {
                    var html = '';
                    html += '<tr data-value="' + elementValue.PetPlaceID + '">';
                    html += '<td class="pds-id hidden" style="color:#3d3939;">' + elementValue.PetPlaceID + '</td>';
                    html += '<td class="pds-firstname" style="color:#3d3939;">' + elementValue.PetPlace + '</td>';
                    html += '<td class="pds-firstname" style="color:#3d3939;">$' + parseFloat(elementValue.Charges).toFixed(2) + '/mo</td>';
                    html += '<td class="pds-firstname" style="color:#3d3939;"><input type="checkbox" name="chkpet id="chkAddPetPlace"  class="addpet" value=' + elementValue.PetPlaceID + ' onclick="selectAddPetPlace(this)" ' + ($("#lblpetplace").text() == elementValue.PetPlaceID ? "checked='checked'" : "") + '></td>';
                    html += '</tr>';
                    if ($("#lblpetplace").text() == elementValue.PetPlaceID) {
                        addPetPlaceArray.push({ PetPlaceID: elementValue.PetPlaceID });
                    }

                    $("#tblPetPlace>tbody").append(html);
                });
            }
        }
    });
}
var addParkingArray = [];
function selectAddParking(cont) {
    var ischeck = $(cont).is(':checked');
    $('.addame').removeAttr("checked");
    $(cont).prop("checked", ischeck);
    addParkingArray = [];
    $("#hndAdditionalParking").val(0);
    $('.addame').each(function (i, obj) {
        if ($(obj).is(':checked')) {
            var pkid = $(obj).attr("value");
            addParkingArray.push({ ParkingID: pkid });
            $("#hndAdditionalParking").val(pkid);
        }
    });

}
var addStorageArray = [];
function selectAddStorage(cont) {
    var ischeck = $(cont).is(':checked')
    $('.addstorage1').removeAttr("checked");
    $(cont).prop("checked", ischeck);
    $("#lblstorageplace").text(0);
    addStorageArray = [];
    $('.addstorage1').each(function (i, obj) {
        if ($(obj).is(':checked')) {
            var pkid = $(obj).attr("value");
            addStorageArray.push({ StorageID: pkid });
            $("#lblstorageplace").text(addStorageArray[0].StorageID);
        }
    });
}
var addPetPlaceArray = [];
function selectAddPetPlace(cont) {
    var ischeck = $(cont).is(':checked');
    $('.addpet').removeAttr("checked");
    $(cont).prop("checked", ischeck);
    addPetPlaceArray = [];
    $('.addpet').each(function (i, obj) {
        if ($(obj).is(':checked')) {
            var pkid = $(obj).attr("value");
            addPetPlaceArray.push({ PetPlaceID: pkid });
        }
    });
}

var saveupdateParking = function () {
    $("#divLoader").show();
    var tenantID = $("#hdnOPId").val();
    var uid = $("#hndUID").val();
    var param = { TenantID: tenantID, lstTParking: addParkingArray, UID: uid };
    $.ajax({
        url: "/Parking/SaveUpdateTenantParking",
        method: "post",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8", // content type sent to server
        dataType: "json", //Expected data format from server
        success: function (response) {
            $.alert({
                title: "",
                content: "Progress Saved.",
                type: 'red'
            })
            //$("#popParking").PopupWindow("close");
            $('#popParking').modal('hide');
            $("#divLoader").hide();
            totalAmt = parseFloat(totalAmt) - unformatText($("#lblAdditionalParking").text());
            $("#lblVehicleFees").text("0.00");
            $("#lblVehicleFees1").text("0.00");
            $("#lblAdditionalParking").text(formatMoney(parseFloat(response.totalParkingAmt).toFixed(2)));
            $("#lblMonthly_AditionalParking").text(parseFloat(response.totalParkingAmt).toFixed(2));
            $("#lblProrated_AditionalParking").text(parseFloat(parseFloat(response.totalParkingAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_AditionalParking_Print").text(parseFloat(parseFloat(response.totalParkingAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblparkingplace").text(addParkingArray.length > 0 ? addParkingArray[0].ParkingID : 0);
            fillUnitParkingList();
            if (parseInt(response.numOfParking) == 1) {
                $("#hndParkingID").val(0);
                if ($("#lblBed").text() == "1") {
                    $("#hndNumberOfParking").val(2);
                    $("#lblVehicleFees").text("30.00");
                    $("#lblVehicleFees1").text("30.00");
                    $("#HndAddParkingCount").val(1);
                }
                else if ($("#lblBed").text() == "2") {
                    $("#hndNumberOfParking").val(2);
                    $("#lblVehicleFees").text("30.00");
                    $("#lblVehicleFees1").text("30.00");
                    $("#HndAddParkingCount").val(1);
                }
                else if ($("#lblBed").text() == "3") {

                    $("#hndNumberOfParking").val(3);
                    $("#lblVehicleFees").text("45.00");
                    $("#lblVehicleFees1").text("45.00");
                    $("#HndAddParkingCount").val(1);
                }
            } else if (parseInt(response.numOfParking) == 2) {
                $("#hndParkingID").val(0);
                if ($("#lblBed").text() == "3") {
                    $("#hndNumberOfParking").val(4);
                    $("#lblVehicleFees").text("60.00");
                    $("#lblVehicleFees1").text("60.00");
                    $("#HndAddParkingCount").val(1);
                }
            }
            else {
                $("#hndParkingID").val(0);
                $("#hndNumberOfParking").val(0);
                $("#lblVehicleFees").text("00.00");
                $("#lblVehicleFees1").text("00.00");
                $("#HndAddParkingCount").val(0);
            }
            $("#lbltotalAmount").text(formatMoney((parseFloat(response.totalParkingAmt) + parseFloat(totalAmt)).toFixed(2)));
            totalAmt = (parseFloat(response.totalParkingAmt) + parseFloat(totalAmt)).toFixed(2);
            $("#lblMonthly_TotalRent").text(formatMoney(totalAmt));
            $("#lblMonthly_TotalRent_print").text(formatMoney(totalAmt));
            $("#lblProrated_TotalRent").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#lblProrated_TotalRent_print").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#lblProratedRent").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#lblProratedRent6").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));

            $("#ftotal").text(formatMoney((parseFloat(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday), 10) + parseFloat($("#fdepo").text(), 10) + parseFloat($("#fpetd").text(), 10) + parseFloat($("#lblVehicleFees").text(), 10) + parseFloat($("#lblPetDNAAmt").text(), 10)).toFixed(2)));
            $("#lbtotdueatmov6").text(formatMoney((parseFloat(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday), 10) + parseFloat($("#fdepo").text(), 10) + parseFloat($("#fpetd").text(), 10) + parseFloat($("#lblVehicleFees").text(), 10) + parseFloat($("#lblPetDNAAmt").text(), 10)).toFixed(2)));


        }
    });
}
var saveupdateFOB = function () {
    //$("#divLoader").show();
    //var tenantID = $("#hdnOPId").val();
    //var param = { TenantID: tenantID, lstTStorage: addStorageArray };
    //$.ajax({
    //    url: "/Storage/SaveUpdateTenantStorage",
    //    method: "post",
    //    data: JSON.stringify(param),
    //    contentType: "application/json; charset=utf-8", // content type sent to server
    //    dataType: "json", //Expected data format from server
    //    success: function (response) {
    //        $.alert({
    //            title: "",
    //            content: "Progress Saved.",
    //            type: 'blue'
    //        })
    //        $("#popFobs").modal("hide");
    //        $("#divLoader").hide();
    //        //totalAmt = parseFloat(totalAmt) - $("#lblFobFee").text();
    //        $("#lblFobFee").text(parseFloat(response.totalStorageAmt).toFixed(2));
    //        $("#ffob").text(parseFloat(response.totalStorageAmt).toFixed(2));
    //        $("#keyfobsamt").text(parseFloat(response.totalStorageAmt).toFixed(2));

    //        //$("#lbltotalAmount").text((parseFloat(response.totalStorageAmt) + parseFloat(totalAmt)).toFixed(2))
    //        // totalAmt = (parseFloat(response.totalStorageAmt) + parseFloat(totalAmt)).toFixed(2);

    //        $("#lblstorageplace").text(addStorageArray.length > 0 ? addStorageArray[0].StorageID : 0);
    //    }
    //});
}
var saveupdatePetPlaceQuotation = function () {
    $("#divLoader").show();
    if (addPetPlaceArray.length > 0) {
        var tenantID = $("#hdnOPId").val();
        var param = { PropertyID: 8, TenantID: tenantID, lstTPetPlace: addPetPlaceArray };
        $.ajax({
            url: "/PetManagement/SaveUpdateTenantPetPlace",
            method: "post",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8", // content type sent to server
            dataType: "json", //Expected data format from server
            success: function (response) {
                if (response.result == 0) {
                    $.alert({
                        title: "",
                        content: response.msg,
                        type: 'red'
                    });
                    addStorageArray = [];
                    $("#lblpetplace").text(0);
                    fillPetPlaceList();
                } else {
                    $.alert({
                        title: "",
                        content: "Progress Saved.",
                        type: 'blue'
                    });
                    $("#popPetPlace").modal("hide");
                    $("#divLoader").hide();
                    totalAmt = parseFloat(totalAmt) - parseFloat(unformatText($("#lblPetFee").text()));
                    $("#lblPetDeposit").text("0.00");
                    $("#lblPetDNAAmt").text("0.00");
                    $("#lbpetdna6").text("0.00");

                    $("#fpetd").text("0.00");
                    $("#lbpetd6").text("0.00");
                    $("#fpetdna").text("0.00");
                    $("#lblPetFee").text(formatMoney(parseFloat(response.totalPetPlaceAmt).toFixed(2)));
                    $("#lblMonthly_PetRent").text(parseFloat(response.totalPetPlaceAmt).toFixed(2));
                    $("#lblProrated_PetRent").text(parseFloat(parseFloat(response.totalPetPlaceAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2));

                    $("#lblpetplace").text(addPetPlaceArray.length > 0 ? addPetPlaceArray[0].PetPlaceID : 0);
                    if (parseInt(response.numOfPet) == 1) {
                        $("#spanPetDNAFee1").text("Pet DNA Fee x 1 Pets:");
                        $("#spanPetDNAFee2").text("Pet DNA Fee x 1 Pets:");
                        $("#spanPetDNAFee3").text("Pet DNA Fee x 1 Pets:");
                        $("#spanPetDNAFee4").text("Pet DNA Fee x 1 Pets:");

                        $("#lblPetDeposit").text(formatMoney("500.00"));
                        $("#lblPetDNAAmt").text(parseFloat(response.petDNAFees).toFixed(2));
                        $("#lbpetdna6").text(parseFloat(response.petDNAFees).toFixed(2));
                        $("#fpetdna").text(parseFloat(response.petDNAFees).toFixed(2));

                        $("#fpetd").text("500.00");
                        $("#lbpetd6").text("500.00");
                        $("#hndPetPlaceID").val(1);
                        $("#btnAddPet").removeAttr("disabled");
                        $("#hndPetPlaceCount").val(1);
                        checkAndDeletePet(1);
                    } else if (parseInt(response.numOfPet) == 2) {
                        $("#spanPetDNAFee1").text("Pet DNA Fee x 2 Pets:");
                        $("#spanPetDNAFee2").text("Pet DNA Fee x 2 Pets:");
                        $("#spanPetDNAFee3").text("Pet DNA Fee x 2 Pets:");
                        $("#spanPetDNAFee4").text("Pet DNA Fee x 2 Pets:");
                        $("#lblPetDeposit").text(formatMoney("750.00"));

                        $("#lblPetDNAAmt").text((parseFloat(response.petDNAFees) * parseInt(response.numOfPet)).toFixed(2));
                        $("#lbpetdna6").text((parseFloat(response.petDNAFees) * parseInt(response.numOfPet)).toFixed(2));
                        $("#fpetdna").text((parseFloat(response.petDNAFees) * parseInt(response.numOfPet)).toFixed(2));

                        $("#fpetd").text("750.00");
                        $("#lbpetd6").text("750.00");
                        $("#hndPetPlaceID").val(2);
                        $("#btnAddPet").removeAttr("disabled");
                        $("#hndPetPlaceCount").val(2);
                    }
                    else {
                        $("#spanPetDNAFee1").text("Pet DNA Fee:");
                        $("#spanPetDNAFee2").text("Pet DNA Fee:");
                        $("#spanPetDNAFee3").text("Pet DNA Fee:");
                        $("#spanPetDNAFee4").text("Pet DNA Fee:");
                        $("#hndPetPlaceID").val(0);
                        $("#btnAddPet").css("background-color", "#B4ADA5").attr("disabled", "disabled");
                        $("#hndPetPlaceCount").val(0);
                        checkAndDeletePet(3);
                    }

                    totalAmt = (parseFloat(response.totalPetPlaceAmt) + parseFloat(totalAmt)).toFixed(2);
                    $("#lbltotalAmount").text(formatMoney(totalAmt));
                    $("#lblMonthly_TotalRent").text(formatMoney(totalAmt));
                    $("#lblProrated_TotalRent").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
                    $("#lblProratedRent").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
                    $("#lblProratedRent6").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));

                    $("#ftotal").text(formatMoney((parseFloat(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday), 10) + parseFloat($("#fdepo").text(), 10) + parseFloat($("#fpetd").text(), 10) + parseFloat($("#lblVehicleFees").text(), 10) + parseFloat($("#lblPetDNAAmt").text(), 10)).toFixed(2)));
                    $("#lbtotdueatmov6").text(formatMoney((parseFloat(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday), 10) + parseFloat($("#fdepo").text(), 10) + parseFloat($("#fpetd").text(), 10) + parseFloat($("#lblVehicleFees").text(), 10) + parseFloat($("#lblPetDNAAmt").text(), 10)).toFixed(2)));
                }

                //totalAmt = (parseFloat(response.totalPetPlaceAmt) + parseFloat(totalAmt)).toFixed(2);
                //$("#lbltotalAmount").text(formatMoney(totalAmt));
                //$("#lblMonthly_TotalRent").text(formatMoney(totalAmt));
                //$("#lblProrated_TotalRent").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
                //$("#lblProratedRent").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
                //$("#lblProratedRent6").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
                //$("#ftotal").text(formatMoney((parseFloat(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday), 10) + parseFloat($("#fdepo").text(), 10) + parseFloat($("#fpetd").text(), 10) +  parseFloat($("#lblVehicleFees").text(), 10)  + parseFloat($("#lblPetDNAAmt").text(), 10)).toFixed(2)));
                //$("#lbtotdueatmov6").text(formatMoney((parseFloat(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday), 10) + parseFloat($("#fdepo").text(), 10) + parseFloat($("#fpetd").text(), 10) +  parseFloat($("#lblVehicleFees").text(), 10) + parseFloat($("#lblPetDNAAmt").text(), 10)).toFixed(2)));

                $("#divLoader").hide();
            }
        });
    }
    else {
        $.alert({
            title: "",
            content: "Please select the pet",
            type: 'red'
        })
        $("#divLoader").hide();
        return;
    }
}
var saveupdateStorage = function () {
    $("#divLoader").show();
    var tenantID = $("#hdnOPId").val();
    var param = { TenantID: tenantID, lstTStorage: addStorageArray };
    var model = {
        Id: $("#lblstorageplace").text()
    };
    $.ajax({
        url: "/Storage/SaveUpdateTenantStorage",
        method: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(param),
        dataType: "JSON",
        success: function (response) {
            if (response.result == 1) {
                totalAmt = parseFloat(totalAmt) - parseFloat(unformatText($("#lblStorageUnit").text()));
                if (response.totalStorageAmt == null) {
                    response.totalStorageAmt = 0;
                }
                $("#lblStorageUnit").text(formatMoney(response.totalStorageAmt));

                $("#lblMonthly_Storage").text(formatMoney(response.totalStorageAmt));
                $("#lblProrated_Storage").text(parseFloat(parseFloat(response.totalStorageAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2));

                $("#popStorage").modal("hide");
                $("#divLoader").hide();

                totalAmt = (parseFloat(response.totalStorageAmt) + parseFloat(totalAmt)).toFixed(2);

                $("#lblMonthly_TotalRent").text(formatMoney(parseFloat(totalAmt)));
                $("#lbltotalAmount").text(formatMoney(parseFloat(totalAmt)));


                $("#lblProrated_TotalRent").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
                $("#lblProratedRent").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
                // $("#ftotal").text((parseFloat(parseFloat(parseFloat(totalAmt) / parseFloat(30) * remainingday), 10) + parseFloat(response.model.Deposit, 10) + parseFloat($("#fpetd").text(), 10) + parseFloat(365, 10)).toFixed(2));
                $("#lblProratedRent6").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
                // $("#lblstorageplace").text(addStorageArray.length > 0 ? addStorageArray[0].StorageID : 0);
                $("#ftotal").text(formatMoney((parseFloat(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday), 10) + parseFloat($("#fdepo").text(), 10) + parseFloat($("#fpetd").text(), 10) + parseFloat($("#lblVehicleFees").text(), 10) + parseFloat($("#lblPetDNAAmt").text(), 10)).toFixed(2)));

                $("#lbtotdueatmov6").text(formatMoney((parseFloat(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday), 10) + parseFloat($("#fdepo").text(), 10) + parseFloat($("#fpetd").text(), 10) + parseFloat($("#lblVehicleFees").text(), 10) + parseFloat($("#lblPetDNAAmt").text(), 10)).toFixed(2)));

                $.alert({
                    title: "",
                    content: "Progress Saved.",
                    type: 'blue'
                });
            }

        }
    });
};
var addApplicantQuotation = function (at) {
    var modal = $("#popApplicant");
    if (at == 1) {
        $("#divPopSSN,#divPopIDType,#divPopIDState,#divPopIDNumber,#divPopCountry,#divPopAddressLine1,#divPopAddressLine2,#divPopState,#divPopCity,#divPopZip").addClass("hidden");
        modal.find('.modal-content').css("height", "375px");
        modal.find('.modal-title').text('Add Co-Applicant');
        $("#popApplicant").modal("show");
        $("#ddlApplicantType").text("Co-Applicant");
        $("#ddlARelationship").empty();
        opt = "<option value='0'>Select Relationship</option>";
        opt += "<option value='1'>Spouse</option>";
        opt += "<option value='2'>Partner</option>";
        opt += "<option value='3'>Adult Child</option>";
        opt += "<option value='4'>Friend/Roommate</option>";
        $("#ddlARelationship").append(opt);
        $("#ddlARelationship").val(0).change();

        $("#ddlApplicantGender").val(0);
        $("#ddlApplicantGender").trigger('change');
        $("#txtApplicantOtherGender").val('');

        $("#txtADateOfBirth").removeClass("hidden").val("");
        $('#txtHDateOfBirth').addClass("hidden");
        $('#txtMDateOfBirth').addClass("hidden");
        $('#txtGDateOfBirth').addClass('hidden');

        $("#appphone").removeClass("hidden");
        $("#appemail").removeClass("hidden");
        $("#txtApplicantMiddleName").val("");
        $("#txtApplicantPhone").val("");
        $("#txtApplicantEmail").val("");
        $("#txtApplicantSSNNumber").val('');
        $("#txtApplicantSSNNumber").attr("data-value", '');

        $("#ddlApplicantDocumentTypePersonal").val(0).change();
        $("#ddlApplicantStateDoc").val(0).change();
        $("#txtApplicantIDNumber").val('');
        $("#txtApplicantIDNumber").attr("data-value", '');

        $("#txtApplicantCountry").val(1);
        $("#txtApplicantCountry").trigger('change');
        $("#txtAddressLine1").val("");
        $("#txtAddressLine2").val("");
        $("#ddlApplicantState").val(0).change();
        $("#txtApplicantCity").val("");
        $("#txtApplicantZip2").val("");
    }
    else if (at == 2) {
        $("#divPopSSN,#divPopIDType,#divPopIDState,#divPopIDNumber,#divPopCountry,#divPopAddressLine1,#divPopAddressLine2,#divPopState,#divPopCity,#divPopZip").addClass("hidden");
        modal.find('.modal-content').css("height", "300px");
        modal.find('.modal-title').text('Add Minor');
        $("#popApplicant").modal("show");
        $("#ddlApplicantType").text("Minor");
        $("#ddlARelationship").empty();
        opt = "<option value='0'>Select Relationship</option>";
        opt += "<option value='1'>Family Member</option>";
        opt += "<option value='2'>Child</option>";
        $("#ddlARelationship").append(opt);
        $("#ddlARelationship").val(0).change();
        $("#txtApplicantMiddleName").val("");
        $("#ddlApplicantGender").val(0);
        $("#ddlApplicantGender").trigger('change');
        $("#txtApplicantOtherGender").val('');

        $("#txtMDateOfBirth").removeClass("hidden").val('');
        $('#txtHDateOfBirth').addClass("hidden");
        $('#txtADateOfBirth').addClass("hidden");
        $('#txtGDateOfBirth').addClass('hidden');

        $("#appphone").addClass("hidden");
        $("#appemail").addClass("hidden");
    }
    else if (at == 3) {
        $("#divPopSSN,#divPopIDType,#divPopIDState,#divPopIDNumber,#divPopCountry,#divPopAddressLine1,#divPopAddressLine2,#divPopState,#divPopCity,#divPopZip").addClass("hidden");
        modal.find('.modal-content').css("height", "375px");
        modal.find('.modal-title').text('Add Guarantor');
        $("#popApplicant").modal("show");
        $("#ddlApplicantType").text("Guarantor");
        $("#ddlARelationship").empty();
        opt = "<option value='0'>Select Relationship</option>";
        opt += "<option value='1'>Family</option>";
        opt += "<option value='2'>Friend</option>";
        $("#ddlARelationship").append(opt);
        $("#ddlARelationship").val(0).change();
        $("#txtApplicantMiddleName").val("");
        $("#ddlApplicantGender").val(0);
        $("#ddlApplicantGender").trigger('change');

        $("#txtApplicantOtherGender").val('');

        $("#txtGDateOfBirth").removeClass("hidden").val('');
        $('#txtHDateOfBirth').addClass("hidden");
        $('#txtADateOfBirth').addClass("hidden");
        $('#txtMDateOfBirth').addClass('hidden');

        $("#appphone").removeClass("hidden");
        $("#appemail").removeClass("hidden");
        $("#txtApplicantPhone").val('');
        $("#txtApplicantEmail").val('');

        $("#txtApplicantSSNNumber").val('');
        $("#txtApplicantSSNNumber").attr("data-value", '');

        $("#ddlApplicantDocumentTypePersonal").val(0).change();
        $("#ddlApplicantStateDoc").val(0).change();
        $("#txtApplicantIDNumber").val('');
        $("#txtApplicantIDNumber").attr("data-value", '');

        $("#txtApplicantCountry").val(1);
        $("#txtApplicantCountry").trigger('change');
        $("#txtAddressLine1").val('');
        $("#txtAddressLine2").val('');
        $("#ddlApplicantState").val(0).change();
        $("#txtApplicantCity").val('');
        $("#txtApplicantZip2").val('');
    }
    clearApplicant();
    $("#popApplicant").modal("show");
};
var saveupdateApplicantQuotation = function () {

    $("#divLoader").show();
    var checkEmail = 0;
    var msg = "";
    var aid = $("#hndApplicantID").val();
    var prospectID = $("#hdnOPId").val();
    var fname = $("#txtApplicantFirstName").val();
    var mname = $("#txtApplicantMiddleName").val();
    var lname = $("#txtApplicantLastName").val();
    var aphone = unformatText($("#txtApplicantPhone").val());
    var aemail = $("#txtApplicantEmail").val();
    var agender = $("#ddlApplicantGender").val();
    var type = $("#ddlApplicantType").text();
    var aotherGender = $("#txtApplicantOtherGender").val();
    var applicantSSNNumber = $("#txtApplicantSSNNumber").attr("data-value");

    //var applicantIDNumber = $("#txtApplicantIDNumber").attr("data-value");
    //var applicantIDType = $("#ddlApplicantDocumentTypePersonal").val();
    //var applicantStateDoc = $("#ddlApplicantStateDoc").val();

    var applicantIDNumber = "";
    var applicantIDType = 0;
    var applicantStateDoc = 0;

    var addressLine1 = $("#txtAddressLine1").val();
    var addressLine2 = $("#txtAddressLine2").val();
    var applicantState = $("#ddlApplicantState").val();
    var applicantCountry = $("#txtApplicantCountry").val();
    var applicantCity = $("#txtApplicantCity").val();
    var applicantApplicantZip2 = $("#txtApplicantZip2").val();


    if (type == "Co-Applicant") {
        checkEmail = 1;
        var dob = $("#txtADateOfBirth").val();
        //if (!applicantSSNNumber) {
        //    msg += "Enter SSN Number</br>";
        //}
        //if (!applicantIDNumber) {
        //    msg += "Enter ID Number</br>";
        //}
        //if (applicantIDType <= 0) {

        //    msg += "Select ID Type</br>";
        //} if (applicantStateDoc <= 0) {
        //    msg += "Select State of issuence</br>";
        //}
        //if (!addressLine1) {
        //    msg += "Enter Address Line 1</br>";
        //} if (!applicantState) {
        //    msg += "Enter State </br>";
        //} if (applicantCountry <= 0) {
        //    msg += "Select Country</br>";
        //} if (applicantCity <= 0) {
        //    msg += "Enter the City</br>";
        //} if (applicantApplicantZip2 <= 0) {
        //    msg += "Select Zip</br>";
        //}
    } else if (type == "Minor") {
        dob = $("#txtMDateOfBirth").val();
    }
    else if (type == "Guarantor") {
        dob = $("#txtGDateOfBirth").val();
        //if (!applicantSSNNumber) {
        //    msg += "Enter SSN Number</br>";
        //}
        //if (!applicantIDNumber) {
        //    msg += "Enter ID Number</br>";
        //}
        //if (applicantIDType <= 0) {
        //    msg += "Select ID Type</br>";
        //}
        //if (applicantStateDoc <= 0) {
        //    msg += "Select State of issuence</br>";
        //}
        //if (!addressLine1) {
        //    msg += "Enter Address Line 1</br>";
        //} if (!applicantState) {
        //    msg += "Enter State </br>";
        //} if (applicantCountry <= 0) {
        //    msg += "Select Country</br>";
        //} if (applicantCity <= 0) {
        //    msg += "Enter the City</br>";
        //} if (applicantApplicantZip2 <= 0) {
        //    msg += "Select Zip</br>";
        //}
    }
    else {
        checkEmail = 1;
        dob = $("#txtHDateOfBirth").val();
    }
    var relationship = $("#ddlARelationship").val();

    if (!fname) {
        msg += "Enter Applicant First Name</br>";
    }
    if (!lname) {
        msg += "Enter Applicant Last Name</br>";
    }
    if (relationship == '0') {
        msg += "Select Relationship</br>";
    }
    if (aphone) {
        if (aphone.length < 10) {
            msg += "Please enter 10 digit phone number </br>";
        }
    }
    if (checkEmail == 1) {
        if (!aemail) {
            msg += "Enter Email</br>";
        }
        else {
            if (!validateEmail(aemail)) {
                msg += "Please Fill Valid Email </br>";
            }
        }
    }

    if (!dob) {
        msg += "Enter Applicant DateOfBirth</br>";
    }

    if (!agender || agender == "0") {
        msg += "Please Select The Gender </br>";
    }
    else if (agender == "3") {
        if (!aotherGender) {
            msg += "Please Fill The Other Gender </br>";
        }
    }
    //else if (agender == "2") {
    //    if (!mname) {
    //        msg += "Please enter Middle Name  </br>";
    //    }
    //}

    if (type == 'Primary Applicant') {
        $('#txtDateOfBirth').val(dob);
        $('#ddlGender').val(agender);
        if (agender == '3') {
            $('#txtOtherGender').val(aotherGender);
        }
        else {
            $('#txtOtherGender').val('');
        }
        //if (!applicantSSNNumber) {
        //    msg += "Enter SSN Number</br>";
        //}
        //if (!applicantIDNumber) {
        //    msg += "Enter ID Number</br>";
        //}
        //if (applicantIDType <= 0) {
        //    msg += "Select ID Type</br>";
        //}
        //if (applicantStateDoc <= 0) {
        //    msg += "Select State of issuence</br>";
        //}
        if (!addressLine1) {
            msg += "Enter Address Line 1</br>";
        } if (!applicantState) {
            msg += "Enter State </br>";
        } if (applicantCountry <= 0) {
            msg += "Select Country</br>";
        } if (applicantCity <= 0) {
            msg += "Enter the City</br>";
        } if (applicantApplicantZip2 <= 0) {
            msg += "Select Zip</br>";
        }
    }
    if (msg != "") {
        $("#divLoader").hide();
        $.alert({
            title: "",
            content: msg,
            type: 'red'
        });
        return;
    }
    var model = {
        ApplicantID: aid,
        FirstName: fname,
        MiddleName: mname,
        LastName: lname,
        Phone: aphone,
        Email: aemail,
        Gender: agender,
        DateOfBirth: dob,
        TenantID: prospectID,
        Type: type,
        Relationship: relationship,
        OtherGender: aotherGender,
        SSN: applicantSSNNumber,
        IDNumber: applicantIDNumber,
        IDType: applicantIDType,
        State: applicantStateDoc,
        HomeAddress1: addressLine1,
        HomeAddress2: addressLine2,
        StateHome: applicantState,
        Country: applicantCountry,
        CityHome: applicantCity,
        ZipHome: applicantApplicantZip2
    };
    // console.log(model);
    $.ajax({
        url: "/Admin/GenerateQuotation/SaveUpdateApplicantGenerateQuotation/",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            $.alert({
                title: "",
                content: "Progress Saved.",
                type: 'blue',
            });
            getApplicantListsQuotation();
            //$("#popApplicant").PopupWindow("close");
            $("#popApplicant").modal("hide");
        }
    });
}
var totpaid = 0;


var addApplicntArray = [];

var addAppFess = function (appFees, appid) {
    var totfees = unformatText($("#totalFinalFees").text());

    if ($(".chkPayAppFees" + appid).is(':checked')) {
        $("#btnSendPayLink" + appid).addClass("hidden");
        totfees = parseFloat(totfees) + parseFloat(appFees);
        $("#totalFinalFees").text("$" + parseFloat(totfees).toFixed(2));

        addApplicntArray.push({ ApplicantID: appid });
    } else {
        totfees = parseFloat(totfees) - parseFloat(appFees);
        $("#totalFinalFees").text("$" + parseFloat(totfees).toFixed(2));
        $("#btnSendPayLink" + appid).removeClass("hidden");
        addApplicntArray.pop({ ApplicantID: appid });
    }
    //console.log(addApplicntArray)
}
var goToEditApplicantQuotation = function (aid) {
    clearApplicant();
    if (aid != null) {
        //sacxhis
        $("#hndApplicantID").val(aid);
        var model = { id: aid, FromAcc: 0 };
        $.ajax({
            url: "/Admin/GenerateQuotation/GetApplicantDetailsGenerateQuotation",
            type: "post",
            contentType: "application/json utf-8",
            data: JSON.stringify(model),
            dataType: "JSON",
            success: function (response) {
                var modal = $("#popApplicant");
                $("#txtApplicantFirstName").val(response.model.FirstName);
                $("#txtApplicantMiddleName").val(response.model.MiddleName);
                $("#txtApplicantLastName").val(response.model.LastName);

                if (response.model.Type == "Primary Applicant") {
                    $("#divPopSSN,#divPopIDType,#divPopIDState,#divPopIDNumber,#divPopCountry,#divPopAddressLine1,#divPopAddressLine2,#divPopState,#divPopCity,#divPopZip").removeClass("hidden");
                    modal.find('.modal-content').css("height", "530px");
                    modal.find('.modal-title').text('Edit Primary Applicant');
                    $("#popApplicant").modal("show");
                    $("#ddlApplicantType").text("Primary Applicant");
                    $("#ddlARelationship").empty();
                    var opt = "<option value='0'>Select Relationship</option>";
                    opt += "<option value='1' selected='selected'>Self</option>";
                    $("#ddlARelationship").append(opt);
                    $("#ddlARelationship").val(response.model.Relationship).change();

                    $("#ddlApplicantGender").val(response.model.Gender);
                    $("#ddlApplicantGender").trigger('change');
                    if (response.model.OtherGender == '3') {
                        $("#txtApplicantOtherGender").val(response.model.OtherGender);
                    }
                    else {
                        $("#txtApplicantOtherGender").val('');
                    }
                    $("#txtHDateOfBirth").removeClass("hidden").val(response.model.DateOfBirthTxt);
                    $('#txtADateOfBirth').addClass("hidden");
                    $('#txtMDateOfBirth').addClass("hidden");
                    $('#txtGDateOfBirth').addClass('hidden');

                    $("#appphone").removeClass("hidden");
                    $("#appemail").removeClass("hidden");
                    $("#txtApplicantPhone").val(formatPhoneFax(response.model.Phone));
                    $("#txtApplicantEmail").val(response.model.Email);

                    $("#txtApplicantSSNNumber").val(response.model.SSN);
                    $("#txtApplicantSSNNumber").attr("data-value", response.model.SSNEnc);

                    $("#ddlApplicantDocumentTypePersonal").val(response.model.IDType).change();
                    $("#ddlApplicantStateDoc").val(response.model.State).change();
                    $("#txtApplicantIDNumber").val(response.model.IDNumber);
                    $("#txtApplicantIDNumber").attr("data-value", response.model.IDNumberEnc);
                    $("#txtApplicantCountry").val(response.model.Country);
                    $("#txtApplicantCountry").trigger('change');
                    $("#txtAddressLine1").val(response.model.HomeAddress1);
                    $("#txtAddressLine2").val(response.model.HomeAddress2);
                    $("#ddlApplicantState").val(response.model.StateHome).change();
                    $("#txtApplicantCity").val(response.model.CityHome);
                    $("#txtApplicantZip2").val(response.model.ZipHome);



                }
                else if (response.model.Type == "Co-Applicant") {
                    $("#divPopSSN,#divPopIDType,#divPopIDState,#divPopIDNumber,#divPopCountry,#divPopAddressLine1,#divPopAddressLine2,#divPopState,#divPopCity,#divPopZip").addClass("hidden");
                    modal.find('.modal-content').css("height", "375px");
                    modal.find('.modal-title').text('Edit Co-Applicant');
                    $("#popApplicant").modal("show");
                    $("#ddlApplicantType").text("Co-Applicant");
                    $("#ddlARelationship").empty();
                    opt = "<option value='0'>Select Relationship</option>";
                    opt += "<option value='1'>Spouse</option>";
                    opt += "<option value='2'>Partner</option>";
                    opt += "<option value='3'>Adult Child</option>";
                    opt += "<option value='4'>Friend/Roommate</option>";
                    $("#ddlARelationship").append(opt);
                    $("#ddlARelationship").val(response.model.Relationship).change();

                    $("#ddlApplicantGender").val(response.model.Gender);
                    $("#ddlApplicantGender").trigger('change');
                    if (response.model.OtherGender == '3') {
                        $("#txtApplicantOtherGender").val(response.model.OtherGender);
                    }
                    else {
                        $("#txtApplicantOtherGender").val('');
                    }
                    $("#txtADateOfBirth").removeClass("hidden").val(response.model.DateOfBirthTxt);
                    $('#txtHDateOfBirth').addClass("hidden");
                    $('#txtMDateOfBirth').addClass("hidden");
                    $('#txtGDateOfBirth').addClass('hidden');
                    $("#appphone").removeClass("hidden");
                    $("#appemail").removeClass("hidden");
                    $("#txtApplicantPhone").val(formatPhoneFax(response.model.Phone));
                    $("#txtApplicantEmail").val(response.model.Email);

                    $("#txtApplicantSSNNumber").val(response.model.SSN);
                    $("#txtApplicantSSNNumber").attr("data-value", response.model.SSNEnc);

                    $("#ddlApplicantDocumentTypePersonal").val(response.model.IDType).change();
                    $("#ddlApplicantStateDoc").val(response.model.State).change();
                    $("#txtApplicantIDNumber").val(response.model.IDNumber);
                    $("#txtApplicantIDNumber").attr("data-value", response.model.IDNumberEnc);

                    $("#txtApplicantCountry").val(response.model.Country);
                    $("#txtApplicantCountry").trigger('change');
                    $("#txtAddressLine1").val(response.model.HomeAddress1);
                    $("#txtAddressLine2").val(response.model.HomeAddress2);
                    $("#ddlApplicantState").val(response.model.StateHome).change();
                    $("#txtApplicantCity").val(response.model.CityHome);
                    $("#txtApplicantZip2").val(response.model.ZipHome);

                }
                else if (response.model.Type == "Guarantor") {
                    $("#divPopSSN,#divPopIDType,#divPopIDState,#divPopIDNumber,#divPopCountry,#divPopAddressLine1,#divPopAddressLine2,#divPopState,#divPopCity,#divPopZip").addClass("hidden");
                    modal.find('.modal-content').css("height", "375px");
                    modal.find('.modal-title').text('Edit Guarantor');
                    $("#popApplicant").modal("show");
                    $("#ddlApplicantType").text("Guarantor");
                    $("#ddlARelationship").empty();
                    opt = "<option value='0'>Select Relationship</option>";
                    opt += "<option value='1'>Family</option>";
                    opt += "<option value='2'>Friend</option>";
                    $("#ddlARelationship").append(opt);
                    $("#ddlARelationship").val(response.model.Relationship).change();

                    $("#ddlApplicantGender").val(response.model.Gender);
                    $("#ddlApplicantGender").trigger('change');
                    if (response.model.OtherGender == '3') {
                        $("#txtApplicantOtherGender").val(response.model.OtherGender);
                    }
                    else {
                        $("#txtApplicantOtherGender").val('');
                    }
                    $("#txtGDateOfBirth").removeClass("hidden").val(response.model.DateOfBirthTxt);
                    $('#txtHDateOfBirth').addClass("hidden");
                    $('#txtADateOfBirth').addClass("hidden");
                    $('#txtMDateOfBirth').addClass('hidden');

                    $("#appphone").addClass("hidden");
                    $("#appemail").removeClass("hidden");
                    $("#txtApplicantPhone").val(formatPhoneFax(response.model.Phone));
                    $("#txtApplicantEmail").val(response.model.Email);

                    $("#txtApplicantSSNNumber").val(response.model.SSN);
                    $("#txtApplicantSSNNumber").attr("data-value", response.model.SSNEnc);

                    $("#ddlApplicantDocumentTypePersonal").val(response.model.IDType).change();
                    $("#ddlApplicantStateDoc").val(response.model.State).change();
                    $("#txtApplicantIDNumber").val(response.model.IDNumber);
                    $("#txtApplicantIDNumber").attr("data-value", response.model.IDNumberEnc);

                    $("#txtApplicantCountry").val(response.model.Country);
                    $("#txtApplicantCountry").trigger('change');
                    $("#txtAddressLine1").val(response.model.HomeAddress1);
                    $("#txtAddressLine2").val(response.model.HomeAddress2);
                    $("#ddlApplicantState").val(response.model.StateHome).change();
                    $("#txtApplicantCity").val(response.model.CityHome);
                    $("#txtApplicantZip2").val(response.model.ZipHome);

                }
                else if (response.model.Type == "Minor") {
                    $("#divPopSSN,#divPopIDType,#divPopIDState,#divPopIDNumber,#divPopCountry,#divPopAddressLine1,#divPopAddressLine2,#divPopState,#divPopCity,#divPopZip").addClass("hidden");
                    modal.find('.modal-content').css("height", "300px");
                    modal.find('.modal-title').text('Edit Minor');
                    $("#popApplicant").modal("show");
                    $("#ddlApplicantType").text("Minor");
                    $("#ddlARelationship").empty();
                    opt = "<option value='0'>Select Relationship</option>";
                    opt += "<option value='1'>Family Member</option>";
                    opt += "<option value='2'>Child</option>";
                    $("#ddlARelationship").append(opt);
                    $("#ddlARelationship").val(response.model.Relationship).change();

                    $("#ddlApplicantGender").val(response.model.Gender);
                    $("#ddlApplicantGender").trigger('change');
                    if (response.model.OtherGender == '3') {
                        $("#txtApplicantOtherGender").val(response.model.OtherGender);
                    }
                    else {
                        $("#txtApplicantOtherGender").val('');
                    }
                    $("#txtMDateOfBirth").removeClass("hidden").val(response.model.DateOfBirthTxt);
                    $('#txtHDateOfBirth').addClass("hidden");
                    $('#txtADateOfBirth').addClass("hidden");
                    $('#txtGDateOfBirth').addClass('hidden');

                    $("#appphone").addClass("hidden");
                    $("#appemail").addClass("hidden");
                }
            }
        });
    }
};
var clearApplicant = function () {
    $("#hndApplicantID").val(0);
    $("#txtApplicantFirstName").val("");
    $("#txtApplicantMiddleName").val("");
    $("#txtApplicantLastName").val("");
    $("#txtApplicantPhone").val("");
    $("#txtApplicantEmail").val("");
    $("#ddlApplicantGender").val(0);
    $('#txtMDateOfBirth').val("");
    $('#txtADateOfBirth').val("");
    $('#txtHDateOfBirth').val("");
    $('#txtGDateOfBirth').val("");
    $("#txtApplicantSSNNumber").val("");
    $("#txtApplicantIDNumber").val("");
    $("#ddlApplicantDocumentTypePersonal").val(0);
    $("#ddlApplicantStateDoc").val(0);
    $("#txtAddressLine1").val("");
    $("#txtAddressLine2").val("");
    $("#ddlApplicantState").val(0);
    $("#txtApplicantCountry").val(1);
    $("#txtApplicantCity").val("");
    $("#txtApplicantZip2").val("");
}
var saveupdatePet = function () {
    $("#divLoader").show();
    var msg = "";
    var petId = $("#hndPetID").val();
    //var petType = $("#ddlpetType").val();
    var breed = $("#txtpetBreed").val();
    var weight = $("#txtpetWeight").val();
    //var age = $("#txtpetAge").val();
    var prospectID = $("#hdnOPId").val();
    var photo = document.getElementById('pet-picture');
    var petVaccinationCertificate = document.getElementById('filePetVaccinationCertificate');
    var petName = $("#txtpetName").val();
    var vetsName = $("#txtpetVetsName").val();
    var hiddenPetPicture = $("#hndPetPicture").val();
    var hiddenPetVaccinationCertificate = $("#hndPetVaccinationCertificate").val();
    var hiddenOriginalPetPicture = $("#hndOriginalPetPicture").val();
    var hiddenOriginalPetVaccinationCertificate = $("#hndOriginalPetVaccinationCertificate").val();
    //if (petType == '0') {
    //    msg += "Select Pet Type</br>";
    //}
    if (!petName) {
        msg += "Enter Pet Name</br>";
    }
    if (!breed) {
        msg += "Enter Pet Breed</br>";
    }
    if (hiddenPetPicture == '0') {
        if (document.getElementById('pet-picture').files.length == '0') {
            msg += "Please Upload Pet Picture</br>";
        }
    }
    if (hiddenPetVaccinationCertificate == '0') {
        if (document.getElementById('filePetVaccinationCertificate').files.length == '0') {
            msg += "Please Upload Pet Vaccination Certificate</br>";
        }
    }
    if (!weight) {
        msg += "Enter Pet Weight</br>";
    }
    if (weight > 40) {
        msg += "Weight must be upto 40 lbs</br>";
    }
    if (msg != "") {
        $("#divLoader").hide();
        $.alert({
            title: "",
            content: msg,
            type: 'red'
        });
        return;
    }
    $formData = new FormData();

    $formData.append('PetID', petId);
    //$formData.append('PetType', petType);
    $formData.append('Breed', breed);
    $formData.append('Weight', weight);
    //$formData.append('Age', age);
    $formData.append('TenantID', prospectID);
    $formData.append('PetName', petName);
    $formData.append('VetsName', vetsName);

    $formData.append('Photo', hiddenPetPicture);
    $formData.append('PetVaccinationCertificate', hiddenPetVaccinationCertificate);
    $formData.append('OriginalPetNameFile', hiddenOriginalPetPicture);
    $formData.append('OriginalPetVaccinationCertificateFile', hiddenOriginalPetVaccinationCertificate);

    $.ajax({
        url: "/Tenant/Pet/SaveUpdatePet/",
        type: "post",
        data: $formData,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            $("#divLoader").hide();
            localStorage.setItem('tenantIds', response.Msg);

            var str = localStorage.getItem('tenantIds');
            var tId = str.split(',');
            document.getElementById('hdnOPId').value = tId[0];
            //$("#hdnOPId").val(tId[0]);
            getPetLists();
            $.alert({
                title: "",
                content: "Progress Saved.",
                type: 'blue'
            });


            //$("#popPet").PopupWindow("close");
            $("#popPet").modal("hide");
        }
    });
};
var petIdd = 0;
var getPetLists = function () {
    $("#divLoader").show();
    var model = {
        TenantID: $("#hdnOPId").val()
    };
    $.ajax({
        url: "/Pet/GetPetList",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            $("#tblPet>tbody").empty();
            $("#tblPet15>tbody").empty();
            $("#tblPet15p>tbody").empty();
            $.each(response.model, function (elementType, elementValue) {
                var html = "<tr id='tr_" + elementValue.PetID + "' data-value='" + elementValue.PetID + "'>";
                html += "<td align='center'><img src='/content/assets/img/pet/" + elementValue.Photo + "' class='picture-src' title='' style='height:70px;width:70px;'/></td>";

                html += "<td>" + elementValue.PetName + "</td>";
                html += "<td>" + elementValue.Breed + "</td>";
                html += "<td>" + elementValue.Weight + "</td>";
                html += "<td>" + elementValue.VetsName + "</td>";
                html += "<td>";
                html += "<a style='background: transparent; margin-right:10px' href='javascript:void(0);' id='updatePetInfo' onclick='getPetInfo(" + elementValue.PetID + ")'><span class='fa fa-edit' ></span></a>";
                html += "<a style='background: transparent; margin-right:10px' href='javascript:void(0);' onclick='delPet(" + elementValue.PetID + ")'><span class='fa fa-trash' ></span></a>";
                html += "<a href='../../Content/assets/img/pet/" + elementValue.PetVaccinationCertificate + "' download=" + elementValue.PetVaccinationCertificate + " target='_blank'><span class='fa fa-download'></span></a>";
                html += "</td >";
                html += "</tr>";
                $("#tblPet>tbody").append(html);

                var html15 = "<tr id='tr_" + elementValue.PetID + "' data-value='" + elementValue.PetID + "'>";

                html15 += "<td>" + elementValue.PetName + "</td>";
                html15 += "<td>" + elementValue.Breed + "</td>";
                html15 += "<td>" + elementValue.Weight + "</td>";
                html15 += "<td>" + elementValue.VetsName + "</td>";

                html15 += "</tr>";

                $("#tblPet15>tbody").append(html15);
                $("#tblPet15p>tbody").append(html15);

                if (response.model.length == 2) {
                    petIdd = elementValue.PetID;
                } else {
                    petIdd = 0;
                }

            });

            getTenantPetPlaceData();

        }
    });
};

var getPetInfo = function (id) {
    //$("#popPet").PopupWindow("open");
    $("#divLoader").show();
    $("#popPet").modal("show");
    var model = {
        id: id
    };
    $.ajax({
        url: '/Tenant/Pet/GetPetDetails/',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            $("#hndPetID").val(response.model.PetID);
            $("#txtpetName").val(response.model.PetName);
            $("#txtpetVetsName").val(response.model.VetsName);
            $("#ddlpetType").val(response.model.PetType);
            $("#txtpetBreed").val(response.model.Breed);
            $("#txtpetWeight").val(response.model.Weight);
            $("#txtpetAge").val(response.model.Age);
            $("#hndPetPicture").val(response.model.Photo);
            $("#hndOriginalPetPicture").val(response.model.OriginalPetNameFile);
            $("#hndPetVaccinationCertificate").val(response.model.PetVaccinationCertificate);
            $("#hndOriginalPetVaccinationCertificate").val(response.model.OriginalPetVaccinationCertificateFile);

            if (response.model.OriginalPetVaccinationCertificateFile != '') {
                $("#filePetPictireShow").text(response.model.OriginalPetNameFile);
            }
            if (response.model.OriginalPetVaccinationCertificateFile != '') {
                $("#filePetVaccinationCertificateShow").text(response.model.OriginalPetVaccinationCertificateFile);
            }
        }
    });
};
var clearPet = function () {
    $("#hndPetID").val(0);
    $("#txtpetName").val('');
    $("#txtpetBreed").val('');
    $("#txtpetWeight").val('');
    $("#txtpetVetsName").val('');
    document.getElementById('filePetPictireShow').value = '';
    document.getElementById('pet-picture').value = '';
    document.getElementById('filePetVaccinationCertificate').value = '';
    $("#filePetPictireShow").html('Choose a file...');
    $("#filePetVaccinationCertificateShow").html('Choose a file...');
    $("#hndPetPicture").val('0');
    $("#hndOriginalPetPicture").val('');
    $("#hndPetVaccinationCertificate").val('0');
    $("#hndOriginalPetVaccinationCertificate").val('');
};
var saveupdateVehicle = function () {
    $("#divLoader").show();
    var msg = "";
    var vid = $("#hndVehicleID").val();
    var vtag = $("#txtVehicleTag").val();
    var parkspace = $("#ddlParking").val();
    var vtype = $("#ddlVehicleType").val();
    var vmake = $("#txtVehicleMake").val();
    var vmodel = $("#txtVehicleModel").val();
    var vyear = $("#ddlVehicleyear").val();
    var vcolor = $("#txtVehicleColor").val();
    var vlicence = $("#txtVehicleLicence").val();
    var vstate = $("#ddlVState").val();
    var vfileUploadVehicleRegistation = $("#fileUploadVehicleRegistation").val();
    var prospectID = $("#hdnOPId").val();
    var vehicleRegistration = document.getElementById("fileUploadVehicleRegistation");
    var vOwnerName = $("#txtVehicleOwnerName").val();
    var vNotes = $("#txtVehicleNote").val();
    var vRegistationCert = $("#hndVehicleRegistation").val();
    var vOriginalRegistationCert = $("#hndOriginalVehicleRegistation").val();
    if ($("#hndVehicleRegistation").val() == '0') {
        if (document.getElementById("fileUploadVehicleRegistation").files.length == '0') {
            msg += "Upload The Vehicle Registration Certificate</br>";
        }
    }
    if (vtype == "0") {
        msg += "Enter Vehicle Type</br>";
    }
    if (vyear == '0') {
        msg += "Enter Vehicle Year</br>";
    }
    if (!vmake) {
        msg += "Enter Vehicle Make</br>";
    }
    if (!vlicence) {
        msg += "Enter Vehicle Licence</br>";
    }
    if (vstate == "0") {
        msg += "Select Vehicle State</br>";
    }
    if (msg != "") {
        $("#divLoader").hide();
        $.alert({
            title: "",
            content: msg,
            type: 'red'
        });
        return;
    }


    $formData = new FormData();
    $formData.append('Vehicle_ID', vid);
    $formData.append('Make', vmake);
    $formData.append('VModel', vmodel);
    $formData.append('Year', vyear);
    $formData.append('Color', vcolor);
    $formData.append('State', vstate);
    $formData.append('License', vlicence);
    $formData.append('TenantID', prospectID);
    $formData.append('OwnerName', vOwnerName);
    $formData.append('Notes', vNotes);
    $formData.append('Tag', vtag);
    $formData.append('ParkingID', parkspace);

    $formData.append('VehicleRegistration', vRegistationCert);
    $formData.append('OriginalVehicleRegistation', vOriginalRegistationCert);
    $.ajax({
        url: "/Tenant/Vehicle/SaveUpdateVehicle/",
        type: "post",
        contentType: "application/json utf-8",
        data: $formData,
        contentType: false,
        processData: false,
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            $.alert({
                title: "",
                content: "Progress Saved.",
                type: 'blue',
            });

            getVehicleLists();
            //$("#popVehicle").PopupWindow("close");
            $("#popVehicle").modal("hide");
            fillUnitParkingList();
        }
    });

}

var getVehicleLists = function () {
    $("#divLoader").show();
    var model = {

        TenantID: $("#hdnOPId").val(),
    }
    $.ajax({
        url: "/Tenant/Vehicle/GetVehicleList",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            $("#tblVehicle>tbody").empty();
            $("#tblVehicle15>tbody").empty();
            $("#tblVehicle15p>tbody").empty();
            var noofveh = 0;
            $.each(response.model, function (elementType, elementValue) {
                var html = "<tr id='tr_" + elementValue.Vehicle_ID + "' data-value='" + elementValue.Vehicle_ID + "'>";
                html += "<td>" + elementValue.OwnerName + "</td>";
                html += "<td>" + elementValue.Make + "</td>";
                html += "<td>" + elementValue.VModel + "</td>";
                html += "<td>" + elementValue.Year + "</td>";
                html += "<td>" + elementValue.Color + "</td>";
                html += "<td>" + elementValue.License + "</td>";
                html += "<td><a style='background: transparent; margin-right:10px' href='javascript:void(0);' onclick='delVehicle(" + elementValue.Vehicle_ID + ")'><span class='fa fa-trash' ></span></a>";
                html += "<a style='background: transparent;' href='../../Content/assets/img/VehicleRegistration/" + elementValue.VehicleRegistration + "' download=" + elementValue.VehicleRegistration + " target='_blank'><span class='fa fa-download' style='background: transparent;'></span></a></td>";

                html += "</tr>";
                $("#tblVehicle>tbody").append(html);

                var html15 = "<tr id='tr_" + elementValue.Vehicle_ID + "' data-value='" + elementValue.Vehicle_ID + "'>";
                html15 += "<td>" + elementValue.OwnerName + "</td>";
                html15 += "<td>" + elementValue.Make + "</td>";
                html15 += "<td>" + elementValue.VModel + "</td>";
                html15 += "<td>" + elementValue.Year + "</td>";
                html15 += "<td>" + elementValue.Color + "</td>";
                html15 += "<td>" + elementValue.License + "</td>";

                html15 += "</tr>";
                $("#tblVehicle15>tbody").append(html15);
                $("#tblVehicle15p>tbody").append(html15);
                noofveh += 1;
            });
            //if (noofpark == noofveh)
            //{
            //    $("#btnAddVehicle").addClass("hidden");
            //}
        }
    });
}

var clearVehicle = function () {
    $("#hndVehicleID").val(0);
    $("#txtVehicleOwnerName").val("");
    document.getElementById('fileUploadVehicleRegistation').value = '';
    $("#VehicleRegistationShow").html("Choose a file...");
    $("#ddlVehicleType").val("0");
    $("#ddlVehicleyear").val("0");
    $("#txtVehicleMake").val("");
    $("#txtVehicleModel").val("");
    $("#txtVehicleColor").val("");
    $("#txtVehicleLicence").val("");
    $("#ddlVState").val(0);
    $("#txtVehicleNote").val("");
    $("#hndVehicleRegistation").val("0");
    $("#hndOriginalVehicleRegistation").val("0");
}
var saveupdateTenantOnline = function (stepcompleted) {
    var msg = "";
    var ProspectID = $("#hdnOPId").val();
    var isInternational = $("#ddlIsInter").val();
    var FirstName = $("#txtFirstNamePersonal").val();
    var MiddleInitial = $("#txtMiddleInitial").val();
    var LastName = $("#txtLastNamePersonal").val();
    var DateOfBirth = $("#txtDateOfBirth").val();
    var Gender = $("#ddlGender").val();
    var Email = $("#txtEmailNew").val();
    var Mobile = unformatText($("#txtMobileNumber").val());
    //var PassportNumber = $("#txtPassportNum").val();
    var CountryIssuance = $("#txtCOI").val();
    var DateIssuance = $("#txtDateOfIssuance").val();
    var DateExpire = $("#txtDateOfExpiration").val();
    var IDType = $("#ddlDocumentTypePersonal").val();
    var State = $("#ddlStatePersonal").val();
    //var IDNumber = $("#txtIDNumber").data("value");
    //var SSNNumber = $("#txtSSNNumber").data("value");
    var Country = $("#txtCountry").val();
    var HomeAddress1 = $("#txtAddress1").val();
    var HomeAddress2 = $("#txtAddress2").val();
    var StateHome = $("#ddlStateHome").val();
    var CityHome = $("#ddlCityHome").val();
    var ZipHome = $("#txtZip").val();
    var RentOwn = $("#ddlRentOwn").val();
    var MoveInDateFrom = $("#txtMoveInDateFrom").val();
    //var MoveInDateTo = $("#txtMoveInDateTo").val();
    var MonthlyPayment = unformatText($("#txtMonthlyPayment").val());
    var Reason = $("#txtReasonforleaving").val();

    var Country2 = $("#txtCountry2").val();
    var HomeAddress12 = $("#txtAddress12").val();
    var HomeAddress22 = $("#txtAddress22").val();
    var StateHome2 = $("#ddlStateHome2").val();
    var CityHome2 = $("#ddlCityHome2").val();
    var ZipHome2 = $("#txtZip2").val();
    var RentOwn2 = $("#ddlRentOwn2").val();
    var MoveInDateFrom2 = $("#txtMoveInDateFrom2").val();
    var MoveInDateTo2 = $("#txtMoveInDateTo2").val();
    var MonthlyPayment2 = unformatText($("#txtMonthlyPayment2").val());
    var Reason2 = $("#txtReasonforleaving2").val();

    var isAdditionalRHistory = $("#ddladdHistory").val();

    var EmployerName = $("#txtEmployerName").val();
    var JobTitle = $("#txtJobTitle").val();
    var JobType = $("#ddlJobType").val();
    var StartDate = $("#txtStartDate").val();
    var Income = unformatText($("#txtAnnualIncome").val());
    var AdditionalIncome = unformatText($("#txtAddAnnualIncome").val());
    var SupervisorName = $("#txtSupervisiorName").val();
    var SupervisorPhone = unformatText($("#txtSupervisiorPhone").val());
    var SupervisorEmail = $("#txtSupervisiorEmail").val();
    var OfficeCountry = $("#txtCountryOffice").val();
    var OfficeAddress1 = $("#txtofficeAddress1").val();
    var OfficeAddress2 = $("#txtofficeAddress2").val();
    var OfficeState = $("#ddlStateEmployee").val();
    var OfficeCity = $("#ddlCityEmployee").val();
    var OfficeZip = $("#txtZipOffice").val();
    var Relationship = $("#txtRelationship").val();
    var EmergencyFirstName = $("#txtEmergencyFirstName").val();
    var EmergencyLastName = $("#txtEmergencyLastName").val();
    var EmergencyMobile = unformatText($("#txtEmergencyMobile").val());
    var EmergencyHomePhone = unformatText($("#txtEmergencyHomePhone").val());
    var EmergencyWorkPhone = unformatText($("#txtEmergencyWorkPhone").val());
    var EmergencyEmail = $("#txtEmergencyEmail").val();
    var EmergencyCountry = $("#txtEmergencyCountry").val();
    var EmergencyAddress1 = $("#txtEmergencyAddress1").val();
    var EmergencyAddress2 = $("#txtEmergencyAddress2").val();
    var EmergencyStateHome = $("#ddlStateContact").val();
    var EmergencyCityHome = $("#ddlCityContact").val();
    var EmergencyZipHome = $("#txtEmergencyZip").val();
    var OtherGender = $("#txtOtherGender").val();

    var fileUpload1 = $("#hndFileUploadName1").val();
    var originalFileUpload1 = $("#hndOriginalFileUploadName1").val();
    var fileUpload2 = $("#hndFileUploadName2").val();
    var originalFileUpload2 = $("#hndOriginalFileUploadName2").val();
    var fileUpload3 = $("#hndFileUploadName3").val();
    var originalFileUpload3 = $("#hndOriginalFileUploadName3").val();
    var filePassport = $("#hndPassportUploadName").val();
    var originalFilePassport = $("#hndOriginalPassportUploadName").val();
    var fileIdentity = $("#hndIdentityUploadName").val();
    var originalFileIdentity = $("#hndOriginalIdentityUploadName").val();

    var countryOfOrigin = $("#ddlCountryOfOrigin").val();
    var everBeenEvicted = $("#ddlEverBeenEvicted").val();
    var everBeenConvicted = $("#ddlEverBeenConvicted").val();
    var anyCriminalCharges = $("#ddlAnyCriminalCharges").val();
    var everBeenEvictedDetails = $("#txtEverBeenEvictedDetails").val();
    var everBeenConvictedDetails = $("#txtEverBeenConvictedDetails").val();
    var anyCriminalChargesDetails = $("#txtAnyCriminalChargesDetails").val();
    var doYouSmoke = $("#ddlDoYouSmoke").val();
    var referredByAnotherResident = $("#ddlReferredByAnotherResident").val();
    var brokerOrMerchantReff = $("#ddlBrokerOrMerchantReff").val();
    var referredByAnotherResidentName = $("#txtReferredByAnotherResidentName").val();
    var apartmentCommunity = $("#txtApartmentCommunity").val();
    var managementCompany = $("#txtManagementCompany").val();
    var managementCompanyPhone = unformatText($("#txtManagementCompanyPhone").val());
    var properNoticeLeaseAgreement = $("#ddlProperNoticeLeaseAgreement").val();

    if (!OtherGender) {
        OtherGender = $("#txtOtherGender").val(" ");
    }
    //if (SupervisorPhone) {
    //    if (SupervisorPhone.length < 10) {
    //        msg += "Please enter 10 digit supervisor phone number </br>";
    //    }
    //}
    if (EmergencyMobile) {
        if (EmergencyMobile.length < 10) {
            msg += "Please enter 10 digit emergency mobile number </br>";
        }
    }
    if (EmergencyHomePhone) {
        if (EmergencyHomePhone.length < 10) {
            msg += "Please enter 10 digit emergency home phone number </br>";
        }
    }
    if (EmergencyWorkPhone) {
        if (EmergencyWorkPhone.length < 10) {
            msg += "Please enter 10 digit emergency work phone number </br>";
        }
    }
    if (managementCompanyPhone) {
        if (managementCompanyPhone.length < 10) {
            msg += "Please enter 10 digit management company phone number </br>";
        }
    }

    if (msg != "") {
        $.alert({
            title: "",
            content: msg,
            type: 'red'
        })
        $("#divLoader").hide();

        showCurrentStepQuotation(stepcompleted);

        return;
    }
    $formData = new FormData();
    $formData.append('ProspectID', ProspectID);
    $formData.append('FirstName', FirstName);
    $formData.append('MiddleInitial', MiddleInitial);
    $formData.append('LastName', LastName);
    $formData.append('DateOfBirth', DateOfBirth);
    $formData.append('Gender', Gender);
    $formData.append('Email', Email);
    $formData.append('Mobile', Mobile);
    //$formData.append('PassportNumber', PassportNumber);
    $formData.append('CountryIssuance', CountryIssuance);
    $formData.append('DateIssuance', DateIssuance);
    $formData.append('DateExpire', DateExpire);
    $formData.append('IDType', IDType);
    $formData.append('State', State);
    //$formData.append('IDNumber', IDNumber);
    $formData.append('Country', Country);
    $formData.append('HomeAddress1', HomeAddress1);
    $formData.append('HomeAddress2', HomeAddress2);
    $formData.append('StateHome', StateHome);
    $formData.append('CityHome', CityHome);
    $formData.append('ZipHome', ZipHome);
    $formData.append('RentOwn', RentOwn);
    $formData.append('MoveInDateFrom', MoveInDateFrom);
    //$formData.append('MoveInDateTo', MoveInDateTo);
    $formData.append('MonthlyPayment', MonthlyPayment);
    $formData.append('Reason', Reason);
    $formData.append('Country2', Country2);
    $formData.append('HomeAddress12', HomeAddress12);
    $formData.append('HomeAddress22', HomeAddress22);
    $formData.append('StateHome2', StateHome2);
    $formData.append('CityHome2', CityHome2);
    $formData.append('ZipHome2', ZipHome2);

    $formData.append('RentOwn2', RentOwn2);
    $formData.append('MoveInDateFrom2', MoveInDateFrom2);
    $formData.append('MoveInDateTo2', MoveInDateTo2);
    $formData.append('MonthlyPayment2', MonthlyPayment2);
    $formData.append('Reason2', Reason2);
    $formData.append('EmployerName', EmployerName);
    $formData.append('JobTitle', JobTitle);
    $formData.append('JobType', JobType);
    $formData.append('StartDate', StartDate);
    $formData.append('Income', Income);
    $formData.append('AdditionalIncome', AdditionalIncome);
    $formData.append('SupervisorName', SupervisorName);
    $formData.append('SupervisorPhone', SupervisorPhone);
    $formData.append('SupervisorEmail', SupervisorEmail);
    $formData.append('OfficeCountry', OfficeCountry);
    $formData.append('OfficeAddress1', OfficeAddress1);
    $formData.append('OfficeAddress2', OfficeAddress2);
    $formData.append('OfficeState', OfficeState);
    $formData.append('OfficeCity', OfficeCity);
    $formData.append('OfficeZip', OfficeZip);
    $formData.append('Relationship', Relationship);
    $formData.append('EmergencyFirstName', EmergencyFirstName);
    $formData.append('EmergencyLastName', EmergencyLastName);
    $formData.append('EmergencyMobile', EmergencyMobile);
    $formData.append('EmergencyHomePhone', EmergencyHomePhone);
    $formData.append('EmergencyWorkPhone', EmergencyWorkPhone);
    $formData.append('EmergencyEmail', EmergencyEmail);
    $formData.append('EmergencyCountry', EmergencyCountry);
    $formData.append('EmergencyAddress1', EmergencyAddress1);
    $formData.append('EmergencyAddress2', EmergencyAddress2);
    $formData.append('EmergencyStateHome', EmergencyStateHome);
    $formData.append('EmergencyCityHome', EmergencyCityHome);

    $formData.append('EmergencyZipHome', EmergencyZipHome);
    $formData.append('IsInternational', isInternational);
    $formData.append('IsAdditionalRHistory', isAdditionalRHistory);
    $formData.append('OtherGender', OtherGender);
    // $formData.append('SSN', SSNNumber);

    $formData.append('TaxReturn', fileUpload1);
    $formData.append('UploadOriginalFileName1', originalFileUpload1);
    $formData.append('TaxReturn2', fileUpload2);
    $formData.append('UploadOriginalFileName2', originalFileUpload2);
    $formData.append('TaxReturn3', fileUpload3);
    $formData.append('UploadOriginalFileName3', originalFileUpload3);

    $formData.append('PassportDocument', filePassport);
    $formData.append('UploadOriginalPassportName', originalFilePassport);
    $formData.append('IdentityDocument', fileIdentity);
    $formData.append('UploadOriginalIdentityName', originalFileIdentity);
    $formData.append('StepCompleted', stepcompleted);

    $formData.append('CountryOfOrigin', countryOfOrigin);
    $formData.append('Evicted', everBeenEvicted);
    $formData.append('ConvictedFelony', everBeenConvicted);
    $formData.append('CriminalChargPen', anyCriminalCharges);
    $formData.append('EvictedDetails', everBeenEvictedDetails);
    $formData.append('ConvictedFelonyDetails', everBeenConvictedDetails);
    $formData.append('CriminalChargPenDetails', anyCriminalChargesDetails);
    $formData.append('DoYouSmoke', doYouSmoke);
    $formData.append('ReferredResident', referredByAnotherResident);
    $formData.append('ReferredBrokerMerchant', brokerOrMerchantReff);
    $formData.append('ReferredResidentName', referredByAnotherResidentName);
    $formData.append('ApartmentCommunity', apartmentCommunity);
    $formData.append('ManagementCompany', managementCompany);
    $formData.append('ManagementCompanyPhone', managementCompanyPhone);
    $formData.append('IsProprNoticeLeaseAgreement', properNoticeLeaseAgreement);

    if ($("#rbtnPaystub").is(":checked")) {
        $formData.append('IsPaystub', true);
    }
    else if ($("#rbtnFedralTax").is(":checked")) {
        $formData.append('IsPaystub', false);
    }

    $.ajax({
        url: '/ApplyNow/SaveTenantOnline',
        type: 'post',
        data: $formData,
        contentType: 'application/json; charset=utf-8',
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            //getApplyNowList(idmsg[0]);
            var stepcomp = parseInt($("#hdnStepCompleted").val());
            if (stepcomp < stepcompleted) {
                $("#hdnStepCompleted").val(stepcompleted);
            }
        }
    });
};
var getFillSummary = function (id) {
    $("#divLoaderFullData").show();
    var model = {
        id: id
    };
    $.ajax({
        url: '/ApplyNow/GetTenantOnlineList',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#summName").text(response.model.FirstName + " " + response.model.MiddleInitial + " " + response.model.LastName);
            $("#summNamep").text(response.model.FirstName + " " + response.model.MiddleInitial + " " + response.model.LastName);
            $("#summDob").text(response.model.DateOfBirthTxt);
            $("#summDobp").text(response.model.DateOfBirthTxt);
            $("#summEmail").text(response.model.Email);
            $("#summEmailp").text(response.model.Email);
            $("#summPhone").text(formatPhoneFax(response.model.Mobile));
            $("#summPhonep").text(formatPhoneFax(response.model.Mobile));
            $("#summSSN").text(response.model.SSN);
            $("#summSSNp").text(response.model.SSN);
            if (response.model.Gender == 1) {
                $("#summGender").text("Male");
                $("#summGenderp").text("Male");
            } else {
                $("#summGender").text("Female");
                $("#summGenderp").text("Female");
            }

            $("#summDriverL").text(response.model.IDNumber);
            $("#summDriverLp").text(response.model.IDNumber);
            $("#summCuAdd").text(response.model.HomeAddress1 + " " + response.model.HomeAddress2 + ", " + response.model.CityHome + ", " + response.model.StateHomeString + "- " + response.model.ZipHome);
            $("#summCuAddp").text(response.model.HomeAddress1 + " " + response.model.HomeAddress2 + ", " + response.model.CityHome + ", " + response.model.StateHomeString + "- " + response.model.ZipHome);
            $("#summEmployer").text(response.model.EmployerName + ", " + response.model.OfficeAddress1 + ", " + response.model.OfficeCity + " (" + response.model.JobTitle + ") ");
            $("#summEmployerp").text(response.model.EmployerName + ", " + response.model.OfficeAddress1 + ", " + response.model.OfficeCity + " (" + response.model.JobTitle + ") ");
            $("#summEstartdate").text(response.model.StartDateTxt);
            $("#summEstartdatep").text(response.model.StartDateTxt);
            $("#summSalary").text(formatMoney(response.model.Income));
            $("#summSalaryp").text(formatMoney(response.model.Income));
            $("#summEmergname").text(response.model.EmergencyFirstName + " " + response.model.EmergencyLastName);
            $("#summEmegmobile").text(formatPhoneFax(response.model.EmergencyMobile));
            $("#summEmerrelation").text(response.model.Relationship);
            $("#summEmergnamep").text(response.model.EmergencyFirstName + " " + response.model.EmergencyLastName);
            $("#summEmegmobilep").text(formatPhoneFax(response.model.EmergencyMobile));
            $("#summEmerrelationp").text(response.model.Relationship);
            $("#divLoaderFullData").hide();
        }
    });
};
var getTenantOnlineListGenerateQuotation = function (id) {
    $("#divLoaderFullData").show();
    var model = {
        id: id
    };
    $.ajax({
        url: '/Admin/GenerateQuotation/GetTenantOnlineListGenerateQuotation',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            console.log(response.model);
            //for floor plan
            $("#imgFloorPlanNew1").attr("src", "/content/assets/img/plan/" + response.model.FloorPlanImageUnit + ".jpg");
            $("#lblfloorPlan1").text(response.model.FloorPlanImageUnit);
            $("#lblBed331").text(response.model.FloorPlanBedUnit);
            $("#lblBath331").text(response.model.FloorPlanBathUnit);
            $("#lblArea331").text(response.model.FloorPlanAreaUnit);
            $("#lblRent331").text(response.model.FloorPlanStartPriceUnit);

            $('#lblFNLQuoteDate').text(response.model.CreatedDateString)
            $('#lblFNLResidentName1').text(response.model.FirstName + ' ' + response.model.LastName);
            $('#lblFNLQuoteExpires').text(response.model.ExpireDate)
            QuoteExpires = $("#lblFNLQuoteExpires").text();
            $("#getting-startedTimeRemainingClock").countdown(QuoteExpires, function (event) {
                $(this).text(
                    event.strftime('Quote Expires in %D days %H hr : %M min')
                );
            });
            $('#lblFNLEmail').text(response.model.Email)
            $('#lblFNLPhone').text(response.model.Mobile)

            if (isNaN(parseFloat($("#lblProrated_AditionalParking").text()))) {
                $("#lblProrated_AditionalParking").text("0.00")
            }
            if (isNaN(parseFloat($("#lblProrated_Storage").text()))) {
                $("#lblProrated_Storage").text("0.00")
            }
            if (isNaN(parseFloat($("#lblProrated_PetRent").text()))) {
                $("#lblProrated_PetRent").text("0.00")
            }
            //$('#lblFNLDesiredMoveIn').text(response.model.MoveInDateTxt)
            //$('#lblFNLTerm').text(response.model.LeaseTerm)
            //$('#lblFNLApplicationFee').text(parseFloat(response.model.ApplicationFees).toFixed('2') + '/per applicant');
            //$('#lblFNLGautantorFee').text(parseFloat(response.model.GuarantorFees).toFixed('2') + '/Guarantor (if needed)');
            //$('#lblFNLAdministratorFee').text(parseFloat(response.model.AdminFees).toFixed('2') + '/unit');
            //$('#fdepo').text(parseFloat(response.model.Deposit).toFixed('2'));
            //$('#fpetd').text(parseFloat(response.model.PetDeposit).toFixed('2'));
            //$('#fpetdna').text(parseFloat(response.model.PetDNAAmt).toFixed('2'));
            //$('#lblVehicleFees').text(parseFloat(response.model.VehicleRegistration).toFixed('2'));
            //$('#spanTrashRecycle').text(parseFloat(response.model.TrashAmt).toFixed('2'));
            //$('#spanPestControl').text(parseFloat(response.model.PestAmt).toFixed('2'));
            //$('#spanConvergentAmt').text(parseFloat(response.model.ConvergentAmt).toFixed('2'));
            //$('#lblMonthly_AditionalParking').text(parseFloat(response.model.ParkingAmt).toFixed('2'));
            //$('#lblMonthly_Storage').text(parseFloat(response.model.StorageAmt).toFixed('2'));
            //$('#lblMonthly_PetRent').text(parseFloat(response.model.PetPlaceAmt).toFixed('2'));





            $("#ddlIsInter").val(response.model.IsInternational).change();
            $("#hndDocumentTypePersonal").val(response.model.IDType);
            //new
            $("#ddlCountryOfOrigin").val(response.model.CountryOfOrigin);
            $("#ddlEverBeenEvicted").val(response.model.Evicted).change();
            $("#ddlEverBeenConvicted").val(response.model.ConvictedFelony).change();
            $("#ddlAnyCriminalCharges").val(response.model.CriminalChargPen).change();
            $("#txtEverBeenEvictedDetails").val(response.model.EvictedDetails);
            $("#txtEverBeenConvictedDetails").val(response.model.ConvictedFelonyDetails);
            $("#txtAnyCriminalChargesDetails").val(response.model.CriminalChargPenDetails);

            $("#ddlDoYouSmoke").val(response.model.DoYouSmoke);
            $("#ddlReferredByAnotherResident").val(response.model.ReferredResident).change();
            $("#ddlBrokerOrMerchantReff").val(response.model.ReferredBrokerMerchant);
            $("#txtReferredByAnotherResidentName").val(response.model.ReferredResidentName);

            $("#txtApartmentCommunity").val(response.model.ApartmentCommunity);
            $("#txtManagementCompany").val(response.model.ManagementCompany);
            $("#txtManagementCompanyPhone").val(formatPhoneFax(response.model.ManagementCompanyPhone));
            $("#ddlProperNoticeLeaseAgreement").val(response.model.IsProprNoticeLeaseAgreement);
            //For Summary Print
            if (response.model.IsInternational == 1) {
                $("#SCountryOfOriginStringtext").text(response.model.CountryOfOriginString);
                $("#SumPass").removeClass('hidden');
                $("#summPassportNumber").text(response.model.PassportNumber);
                $("#summCountryIssuance").text(response.model.CountryIssuance);
            } else {
                $("#SumPass").addClass('hidden');
                $("#summSSNp").text(response.model.SSN);
                $("#summDriverLp").text(response.model.IDNumber);
            }
            $("#UScitzen").text(response.model.IsInternational == 1 ? "No" : "Yes");
            $("#suACuminty").text(response.model.ApartmentCommunity);
            $("#sumAManagementCompany").text(response.model.ManagementCompany);
            $("#sumAManagementCompanyPhone").text(formatPhoneFax(response.model.ManagementCompanyPhone));

            $("#sumAIsProprNoticeLeaseAgreement").text(response.model.stringIsProprNoticeLeaseAgreement);
            $("#sumAQStringEvicted").text(response.model.StringEvicted);
            $("#AQStringEvicted").text(response.model.StringEvicted);
            $("#AQStringCriminalChargPen").text(response.model.StringCriminalChargPen);
            $("#AQStringDoYouSmoke").text(response.model.StringDoYouSmoke);
            $("#AQStringReferredResident").text(response.model.StringReferredResident);
            $("#AQStringReferredBrokerMerchant").text(response.model.StringReferredBrokerMerchant);
            $("#AQStringConvictedFelony").text(response.model.StringConvictedFelony);

            $("#AQEvictedDetails").text(response.model.EvictedDetails);
            $("#AQConvictedFelonyDetails").text(response.model.ConvictedFelonyDetails);
            $("#AQCriminalChargPenDetails").text(response.model.CriminalChargPenDetails);
            $("#AQReferredResidentName").text(response.model.ReferredResidentName);

            $("#summCredateF").text(response.model.MoveInDateFromTxt);
            $("#summCRE").text(response.model.HomeAddress1 + " , " + response.model.HomeAddress2);
            $("#summECountry").text(response.model.CityHome);
            $("#summECountry").text(response.model.StateHomeString);
            $("#summECountry").text(response.model.ZipHome);
            $("#summreCou").text(response.model.CountryString);
            $("#summMrent").text("$ " + formatMoney(response.model.MonthlyPayment));
            $("#summReson").text(response.model.Reason);

            $("#summECountry").text(response.model.CountryString);
            $("#summEmployerName").text(response.model.EmployerName);
            $("#summOfficeAdd").text(response.model.OfficeAddress1);
            $("#summOfficeC").text(response.model.OfficeCity);
            $("#summJobTitle").text(response.model.JobTitle);
            $("#summAdditionalI").text("$ " + formatMoney(response.model.AdditionalIncome));
            $("#summSalaryp").text("$ " + formatMoney(response.model.Income));
            $("#summSupNa").text(response.model.SupervisorName);
            $("#summSupMob").text(formatPhoneFax(response.model.SupervisorPhone));
            $("#summEAddre1").text(response.model.OfficeAddress1 + ", " + response.model.OfficeAddress2);
            $("#summEmerN").text(response.model.EmergencyFirstName + "  " + response.model.EmergencyLastName);
            $("#summEmerRela").text(response.model.Relationship);
            $("#summEmerMob").text(formatPhoneFax(response.model.EmergencyMobile));
            $("#summEmerCountry").text(response.model.EmergencyCountryString);
            $("#summEmerAddd").text(response.model.EmergencyAddress1 + "  " + response.model.EmergencyAddress2);
            /// End

            //if ($("#ddlIsInter").val() == 1) {
            //    $("#passportDiv").removeClass("hidden");
            //    $("#divSSNNumber").addClass("col-sm-4 hidden");
            //}
            //else {
            //    $("#passportDiv").addClass("hidden");
            //    $("#divSSNNumber").removeClass("col-sm-4 hidden");
            //    $("#divSSNNumber").addClass("col-sm-4");
            //}

            //$("#ddladdHistory").val(response.model.IsAdditionalRHistory).change();
            $("#txtFirstNamePersonal").val(response.model.FirstName);
            $("#txtMiddleInitial").val(response.model.MiddleInitial);
            $("#txtMiddleInitialReg").val(response.model.MiddleInitial);
            $("#txtLastNamePersonal").val(response.model.LastName);

            $("#summName").text(response.model.FirstName + " " + response.model.MiddleInitial + " " + response.model.LastName);
            $("#summNamep").text(response.model.FirstName + " " + response.model.MiddleInitial + " " + response.model.LastName);
            if (response.model.FirstName != null) {
                $("#mainApplName").text(response.model.FirstName + " " + response.model.MiddleInitial + " " + response.model.LastName);
            }
            $("#txtDateOfBirth").val(response.model.DateOfBirthTxt);
            $("#summDob").text(response.model.DateOfBirthTxt);
            $("#summDobp").text(response.model.DateOfBirthTxt);
            $("#ddlGender").val(response.model.Gender).change();



            $("#ddlGenderReg").val(response.model.Gender).change();



            $("#txtEmailNew").val(response.model.Email);
            $("#summEmail").text(response.model.Email);
            $("#summEmailp").text(response.model.Email);
            $("#txtMobileNumber").val(formatPhoneFax(response.model.Mobile));
            $("#summPhone").text(formatPhoneFax(response.model.Mobile));
            $("#summPhonep").text(formatPhoneFax(response.model.Mobile));
            $("#txtPassportNum").val(response.model.PassportNumber);
            $("#txtCOI").val(response.model.CountryIssuance);
            $("#txtDateOfIssuance").val(response.model.DateIssuanceTxt);
            $("#txtDateOfExpiration").val(response.model.DateExpireTxt);
            $("#ddlDocumentTypePersonal").val(response.model.IDType).change();
            $("#ddlIDTypeReg").val(response.model.IDType).change();
            //setTimeout(function () {
            $("#ddlStatePersonal").val(response.model.State).change();
            $("#ddlStateIDDocReg").val(response.model.State).change();
            //$("#ddlStatePersonal").find("option[value='" + response.model.State + "']").attr('selected', 'selected');
            //}, 1500);

            $("#txtSSNNumber").val(response.model.SSN);
            $("#txtSSNNumberReg").val(response.model.SSN);
            if (id != 0) {
                $("#txtSSNNumberReg").attr("disabled", true);
                $("#txtIDNumberReg").attr("disabled", true);
                $("#ddlStateIDDocReg").attr("disabled", true);
                $("#ddlIDTypeReg").attr("disabled", true);
            }

            $("#summSSN").text(response.model.SSN);
            // $("#summSSNp").text(response.model.SSN);
            if (response.model.Gender == 1) {
                $("#summGender").text("Male");
                $("#summGenderp").text("Male");
            } else {
                $("#summGender").text("Female");
                $("#summGenderp").text("Female");
            }

            $("#summDriverL").text(response.model.IDNumber);

            $("#txtIDNumber").val(response.model.IDNumber);
            $("#txtIDNumberReg").val(response.model.IDNumber);

            $("#txtAddress1").val(response.model.HomeAddress1);
            $("#txtAddress1Reg").val(response.model.HomeAddress1);
            $("#txtAddress2").val(response.model.HomeAddress2);
            $("#txtAddress2Reg").val(response.model.HomeAddress2);
            $("#summCuAdd").text(response.model.HomeAddress1 + " " + response.model.HomeAddress2 + ", " + response.model.CityHome + ", " + response.model.StateHomeString + "- " + response.model.ZipHome);
            $("#summCuAddp").text(response.model.HomeAddress1 + " " + response.model.HomeAddress2 + ", " + response.model.CityHome + ", " + response.model.StateHomeString + "- " + response.model.ZipHome);

            //fillCityListHomeQuotation(response.model.StateHome);
            //setTimeout(function () {

            $("#txtZip").val(response.model.ZipHome);
            $("#txtZipReg").val(response.model.ZipHome);
            $("#ddlRentOwn").val(response.model.RentOwn);
            //$("#txtMoveInDate").val(response.model.MoveInDateTxt);
            $("#txtMonthlyPayment").val(formatMoney(response.model.MonthlyPayment));
            $("#txtReasonforleaving").val(response.model.Reason);
            $("#txtEmployerName").val(response.model.EmployerName);
            $("#summEmployer").text(response.model.EmployerName + ", " + response.model.OfficeAddress1 + ", " + response.model.OfficeCity + " (" + response.model.JobTitle + ") ");
            $("#summEmployerp").text(response.model.EmployerName + ", " + response.model.OfficeAddress1 + ", " + response.model.OfficeCity + " (" + response.model.JobTitle + ") ");

            $("#txtJobTitle").val(response.model.JobTitle);
            $("#ddlJobType").val(response.model.JobType);
            $("#txtStartDate").val(response.model.StartDateTxt);
            $("#summEstartdate").text(response.model.StartDateTxt);
            $("#summEstartdatep").text(response.model.StartDateTxt);
            $("#txtAnnualIncome").val(formatMoney(response.model.Income));
            $("#summSalary").text(formatMoney(response.model.Income));
            $("#summSalaryp").text(formatMoney(response.model.Income));
            $("#txtAddAnnualIncome").val(formatMoney(response.model.AdditionalIncome));
            $("#txtSupervisiorName").val(response.model.SupervisorName);
            $("#txtSupervisiorPhone").val(formatPhoneFax(response.model.SupervisorPhone));
            $("#txtSupervisiorEmail").val(response.model.SupervisorEmail);
            //$("#txtCountryOffice").val(response.model.OfficeCountry);
            $("#txtofficeAddress1").val(response.model.OfficeAddress1);
            $("#txtofficeAddress2").val(response.model.OfficeAddress2);
            //fillCityListEmployeeQuotation(response.model.OfficeState);

            //setTimeout(function () {
            //$("#ddlStateEmployee").find("option[value='" + response.model.OfficeState + "']").attr('selected', 'selected');

            //}, 1500);
            $("#txtZipOffice").val(response.model.OfficeZip);
            $("#txtRelationship").val(response.model.Relationship);
            $("#txtEmergencyFirstName").val(response.model.EmergencyFirstName);
            $("#txtEmergencyLastName").val(response.model.EmergencyLastName);
            $("#txtEmergencyMobile").val(formatPhoneFax(response.model.EmergencyMobile));
            $("#txtEmergencyHomePhone").val(formatPhoneFax(response.model.EmergencyHomePhone));
            $("#txtEmergencyWorkPhone").val(formatPhoneFax(response.model.EmergencyWorkPhone));
            $("#txtEmergencyEmail").val(response.model.EmergencyEmail);
            //$("#txtEmergencyCountry").val(response.model.EmergencyCountry);
            $("#txtEmergencyAddress1").val(response.model.EmergencyAddress1);
            $("#txtEmergencyAddress2").val(response.model.EmergencyAddress2);
            //fillCityListContactQuotation(response.model.EmergencyStateHome);
            $("#summEmergname").text(response.model.EmergencyFirstName + " " + response.model.EmergencyLastName);
            $("#summEmegmobile").text(formatPhoneFax(response.model.EmergencyMobile));
            $("#summEmerrelation").text(response.model.Relationship);
            $("#summEmergnamep").text(response.model.EmergencyFirstName + " " + response.model.EmergencyLastName);
            $("#summEmegmobilep").text(formatPhoneFax(response.model.EmergencyMobile));
            $("#summEmerrelationp").text(response.model.Relationship);
            //setTimeout(function () {
            //$("#ddlStateContact").find("option[value='" + response.model.EmergencyStateHome + "']").attr('selected', 'selected');
            //}, 1500);

            $("#txtEmergencyZip").val(response.model.EmergencyZipHome);
            //17082019 - start
            $("#ddlCityHome").val(response.model.CityHome);
            $("#ddlCityReg").val(response.model.CityHome);

            $("#ddlCityContact").val(response.model.EmergencyCityHome);
            $("#ddlCityEmployee").val(response.model.OfficeCity);
            if (response.model.Gender == '3') {
                $("#txtOtherGender").val(response.model.OtherGender);
            }
            else {
                $("#txtOtherGender").val('');
            }

            if (response.model.Gender == '3') {
                $("#txtOtherGenderReg").val(response.model.OtherGender);
            }
            else {
                $("#txtOtherGenderReg").val('');
            }

            $("#txtMoveInDateFrom").val(response.model.MoveInDateFromTxt);
            //$("#txtMoveInDateTo").val(response.model.MoveInDateToTxt);
            $("#txtCountry").val(response.model.Country);
            fillStateDDL_HomeQuotation(response.model.Country, response.model.StateHome);

            $("#txtCountryReg").val(response.model.Country);

            fillStateDDLReg_IDTypeQuotation(response.model.Country, response.model.StateHome);
            fillStateDDLReg_HomeQuotation(response.model.Country, response.model.StateHome);

            //$("#ddlStateHome").val(response.model.StateHome).change();
            //setTimeout(function () {
            //    $("#ddlStateHome").val(response.model.StateHome).change();
            //    //$("#ddlStateHome").find("option[value='" + response.model.StateHome + "']").attr('selected', 'selected');
            //}, 1500);

            //$("#txtCountry2").val(response.model.Country2).change();
            //setTimeout(function () {
            //$("#txtCountry").find("option[value='" + response.model.Country + "']").attr('selected', 'selected');
            //$("#txtCountry2").find("option[value='" + response.model.Country2 + "']").attr('selected', 'selected');
            //}, 2000);
            $("#txtCountryOffice").val(response.model.OfficeCountry);
            //$("#ddlStateEmployee").val(response.model.OfficeState).change();
            fillStateDDL_OfficeQuotation(response.model.OfficeCountry, response.model.OfficeState);


            //setTimeout(function () {
            //$("#txtCountryOffice").find("option[value='" + response.model.OfficeCountry + "']").attr('selected', 'selected');
            //}, 2000);
            $("#txtEmergencyCountry").val(response.model.EmergencyCountry);
            //$("#ddlStateContact").val(response.model.EmergencyStateHome).change();
            fillStateDDL_EmeContactQuotation(response.model.EmergencyCountry, response.model.EmergencyStateHome);
            //setTimeout(function () {
            //$("#txtEmergencyCountry").find("option[value='" + response.model.EmergencyCountry + "']").attr('selected', 'selected');
            //}, 2000);
            //17082019 - end

            //document.getElementById("ddlStatePersonal").selectedIndex = response.model.State;
            //document.getElementById("ddlStateHome").selectedIndex = response.model.StateHome;
            //document.getElementById("ddlStateEmployee").selectedIndex = response.model.OfficeState;
            //document.getElementById("ddlStateContact").selectedIndex = response.model.EmergencyStateHome;
            if (response.model.IdentityDocument != "") {
                $("#hndHasIdentityFile").val("1");
            } else {
                $("#hndHasIdentityFile").val("0");
            }
            if (response.model.PassportDocument != "") {
                $("#hndHasPassportFile").val("1");
            } else {
                $("#hndHasPassportFile").val("0");
            }
            if (response.model.TaxReturn != "") {
                if (response.model.TaxReturn == "0") {
                    $("#hndHasTaxReturnFile1").val("0");
                }
                else {
                    $("#hndHasTaxReturnFile1").val("1");
                }
            } else {
                $("#hndHasTaxReturnFile1").val("0");
            }
            if (response.model.TaxReturn2 != "") {
                if (response.model.TaxReturn2 == "0") {
                    $("#hndHasTaxReturnFile2").val("0");
                }
                else {
                    $("#hndHasTaxReturnFile2").val("1");
                }
            } else {
                $("#hndHasTaxReturnFile2").val("0");
            }
            if (response.model.TaxReturn3 != "") {
                if (response.model.TaxReturn3 == "0") {
                    $("#hndHasTaxReturnFile3").val("0");
                }
                else {
                    $("#hndHasTaxReturnFile3").val("1");
                }
            } else {
                $("#hndHasTaxReturnFile3").val("0");
            }
            //alert(response.model.HaveVehicle + "  " + response.model.HavePet);
            if (response.model.HaveVehicle == true) {
                $("#chkDontHaveVehicle").iCheck('check');
            }
            else {
                $("#chkDontHaveVehicle").iCheck('uncheck');
            }
            if (response.model.HavePet == true) {
                $("#chkDontHavePet").iCheck('check');
                $("#chkDontHavePet").prop('disabled', 'disabled');
            }
            else {
                $("#chkDontHavePet").iCheck('uncheck');
                $("#chkDontHavePet").prop('disabled', 'disabled');
            }

            $("#hndPassportUploadName").val(response.model.PassportDocument);
            $("#hndOriginalPassportUploadName").val(response.model.UploadOriginalPassportName);
            $("#hndIdentityUploadName").val(response.model.IdentityDocument);
            $("#hndOriginalIdentityUploadName").val(response.model.UploadOriginalIdentityName);
            $("#hndFileUploadName1").val(response.model.TaxReturn);
            $("#hndOriginalFileUploadName1").val(response.model.UploadOriginalFileName1);
            $("#hndFileUploadName2").val(response.model.TaxReturn2);
            $("#hndOriginalFileUploadName2").val(response.model.UploadOriginalFileName2);
            $("#hndFileUploadName3").val(response.model.TaxReturn3);
            $("#hndOriginalFileUploadName3").val(response.model.UploadOriginalFileName3);

            //To Display File Name On Uploader
            if (response.model.UploadOriginalPassportName != '') {
                $("#fileUploadPassportShow").text(response.model.UploadOriginalPassportName);
            }
            if (response.model.UploadOriginalIdentityName != '') {
                $("#fileUploadIdentityShow").text(response.model.UploadOriginalIdentityName);
            }
            if (response.model.UploadOriginalFileName1 != '') {
                if (response.model.UploadOriginalFileName1 != '0') {
                    $("#fileUploadTaxReturn1Show").text(response.model.UploadOriginalFileName1);
                }
            }
            if (response.model.UploadOriginalFileName2 != '') {
                if (response.model.UploadOriginalFileName2 != '0') {
                    $("#fileUploadTaxReturn2Show").text(response.model.UploadOriginalFileName2);
                }
            }
            if (response.model.UploadOriginalFileName3 != '') {
                if (response.model.UploadOriginalFileName3 != '0') {
                    $("#fileUploadTaxReturn3Show").text(response.model.UploadOriginalFileName3);
                }
            }
            //alert(response.model.IsPaystub);

            if (response.model.IsPaystub == true) {

                $("#rbtnPaystub").iCheck('check');
            }
            else {
                $("#rbtnFedralTax").iCheck('check');
            }

            $("#divLoaderFullData").hide();
            var modelstep = $("#hdnStepCompleted").val();
            var stepcompleted = parseInt(response.model.StepCompleted);
            if (modelstep < stepcompleted) {
                $("#hdnStepCompleted").val(stepcompleted);
            } else {
                stepcompleted = modelstep;
            }
            showCurrentStepQuotation(stepcompleted, stepcompleted);
        }
    });
};

var delVehicle = function (vehId) {

    var model = {
        VID: vehId
    };

    $.alert({
        title: "",
        content: "Are you sure to remove Vehicle?",
        type: 'blue',
        buttons: {
            yes: {
                text: 'Yes',
                action: function (yes) {
                    $("#divLoader").show();
                    $.ajax({
                        url: "/Vehicle/DeleteTenantVehicle",
                        type: "post",
                        contentType: "application/json utf-8",
                        data: JSON.stringify(model),
                        dataType: "JSON",
                        success: function (response) {
                            $("#divLoader").hide();
                            $('#tr_' + vehId).remove();
                            fillUnitParkingList();
                            $("#btnAddVehicle").removeClass("hidden");
                        }
                    });
                }
            },
            no: {
                text: 'No',
                action: function (no) {
                }
            }
        }
    });
};

var delPet = function (petId) {
    var model = {
        PetID: petId
    };

    $.alert({
        title: "",
        content: "Are you sure to remove Pet?",
        type: 'blue',
        buttons: {
            yes: {
                text: 'Yes',
                action: function (yes) {
                    $("#divLoader").show();
                    $.ajax({
                        url: "/Tenant/Pet/DeleteTenantPet/",
                        type: "post",
                        contentType: "application/json utf-8",
                        data: JSON.stringify(model),
                        dataType: "JSON",
                        success: function (response) {
                            $("#divLoader").hide();
                            $('#tr_' + petId).remove();
                            getPetLists();
                        }
                    });
                }
            },
            no: {
                text: 'No',
                action: function (no) {
                }
            }
        }
    });
};

var delApplicant = function (appliId) {
    var model = {
        AID: appliId
    };

    $.alert({
        title: "",
        content: "Are you sure to remove?",
        type: 'blue',
        buttons: {
            yes: {
                text: 'Yes',
                action: function (yes) {
                    $("#divLoader").show();
                    $.ajax({
                        url: "/Tenant/Applicant/DeleteApplicant/",
                        type: "post",
                        contentType: "application/json utf-8",
                        data: JSON.stringify(model),
                        dataType: "JSON",
                        success: function (response) {
                            $("#divLoader").hide();
                            $('#div_' + appliId).remove();

                            getApplicantListsQuotation();
                        }
                    });
                }
            },
            no: {
                text: 'No',
                action: function (no) {
                }
            }
        }
    });

}




function saveupdatePaymentResponsibility(stepcompleted) {
    $("#divLoader").show();
    var model = new Array();
    $("#tblResponsibilityPay TBODY TR").each(function () {
        var row = $(this);
        var customer = {};
        customer.applicantID = row.attr("data-id");
        customer.moveInPercentage = row.find("td:eq(1) input[type='text']").val();
        customer.moveInCharge = $("#txtpayamt" + customer.applicantID).val();
        customer.monthlyPercentage = row.find("td:eq(2) input[type='text']").val();
        customer.monthlyPayment = $("#txtpayamtMo" + customer.applicantID).val();

        var applicantID = customer.applicantID;
        var moveInPercentage = unformatText(customer.moveInPercentage);
        var moveInCharge = unformatText(customer.moveInCharge);
        var monthlyPercentage = unformatText(customer.monthlyPercentage);
        var monthlyPayment = unformatText(customer.monthlyPayment);
        var prospectId = $("#hdnOPId").val();
        model.push({
            ApplicantID: applicantID,
            MoveInPercentage: moveInPercentage,
            MoveInCharge: moveInCharge,
            MonthlyPercentage: monthlyPercentage,
            MonthlyPayment: monthlyPayment,
            ProspectID: prospectId,
            StepCompleted: stepcompleted
        });
    });
    // console.log(JSON.stringify(model));
    $.ajax({
        url: "/Tenant/Applicant/SaveUpdatePaymentResponsibility/",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            getApplicantListsQuotation();
            $("#popApplicant").modal("hide");
            var stepcomp = parseInt($("#hdnStepCompleted").val());
            if (stepcomp < stepcompleted) {
                $("#hdnStepCompleted").val(stepcompleted);
            }
        }
    });
};

var saveupdateApplicantHistory = function () {
    $("#divLoader").show();
    var msg = '';
    var ahID = $("#hdnAHRId").val();
    var country2 = $("#txtCountry2").val();
    var homeAddress12 = $("#txtAddress12").val();
    var homeAddress22 = $("#txtAddress22").val();
    var stateHome2 = $("#ddlStateHome2").val();
    var cityHome2 = $("#ddlCityHome2").val();
    var zipHome2 = $("#txtZip2").val();
    var rentOwn2 = $("#ddlRentOwn2").val();
    var moveInDateFrom2 = $("#txtMoveInDateFrom2").val();
    var moveInDateTo2 = $("#txtMoveInDateTo2").val();
    var monthlyPayment2 = $("#txtMonthlyPayment2").val();
    var reason2 = $("#txtReasonforleaving2").val();
    var tenantId = $("#hdnOPId").val();
    var managementCompanyPhone = unformatText($("#txtManagementCompanyPhone2").val());
    if ($("#txtAddress12").val() == '') {
        msg += 'Please Fill Address 1</br>';
    }
    if ($("#ddlStateHome2").val() == '0') {
        msg += 'Please Select State</br>';
    }
    if ($("#ddlCityHome2").val() == '') {
        msg += 'Please Fill City</br>';
    }
    if ($("#txtZip2").val() == '') {
        msg += 'Please Fill Zip Code</br>';
    }
    if ($("#ddlRentOwn2").val() == '0') {
        msg += 'Please Select Rent or Own</br>';
    }
    if ($("#txtMoveInDateFrom2").val() == '') {
        msg += 'Please Fill Move In Date</br>';
    }
    if ($("#txtMoveInDateTo2").val() == '') {
        msg += 'Please Fill Move Out Date</br>';
    }
    if (!$("#txtApartmentCommunity2").val()) {
        msg += "Please Fill Apartment Community </br>";
    }
    if (!$("#txtManagementCompany2").val()) {
        msg += "Please Fill Management Company </br>";
    }
    if (!unformatText($("#txtManagementCompanyPhone2").val())) {
        msg += "Please Fill Management Company Phone</br>";
    }
    else {
        if (unformatText($("#txtManagementCompanyPhone2").val()).length < 10) {
            msg += "Please Fill Valid Management Company Phone </br>";
        }
    }
    if (msg != '') {
        $("#divLoader").hide();
        $.alert({
            title: "",
            content: msg,
            type: 'blue'
        });
        return
    }
    var model = {
        Country: country2,
        HomeAddress1: homeAddress12,
        HomeAddress2: homeAddress22,
        StateHome: stateHome2,
        CityHome: cityHome2,
        ZipHome: zipHome2,
        RentOwn: rentOwn2,
        MoveInDateFrom: moveInDateFrom2,
        MoveInDateTo: moveInDateTo2,
        MonthlyPayment: monthlyPayment2,
        Reason: reason2,
        TenantID: tenantId,
        AHID: ahID,
        ApartmentCommunity: $("#txtApartmentCommunity2").val(),
        ManagementCompany: $("#txtManagementCompany2").val(),
        ManagementCompanyPhone: managementCompanyPhone,
        IsProprNoticeLeaseAgreement: $("#ddlProperNoticeLeaseAgreement2").val(),
    };

    $.ajax({
        url: "/ApplyNow/SaveUpdateApplicantHistory",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            $("#popApplicantHistory").modal("hide");
            $.alert({
                title: "",
                content: "Progress Saved.",
                type: 'blue'
            });

            getApplicantHistoryList();
            clearApplicantHistory();
        }
    });
};

var getApplicantHistoryList = function () {
    $("#divLoader").show();
    var model = {
        TenantID: $("#hdnOPId").val()
    };
    $.ajax({
        url: "/ApplyNow/GetApplicantHistoryList",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            //console.log(JSON.stringify(response))
            $("#tblAHR>tbody").empty();
            $("#prevadd>tbody").empty();
            $("#prevaddp>tbody").empty();
            $.each(response.model, function (elementType, elementValue) {
                var html = "<tr id='tr_" + elementValue.AHID + "' data-value='" + elementValue.AHID + "'>";
                html += "<td>" + elementValue.Country + "</td>";
                html += "<td>" + elementValue.HomeAddress1 + "</td>";
                html += "<td>" + elementValue.HomeAddress2 + "</td>";
                html += "<td>" + elementValue.StateHomeTxt + "</td>";
                html += "<td>" + elementValue.CityHome + "</td>";
                html += "<td>" + elementValue.ZipHome + "</td>";

                html += "<td>" + elementValue.MoveInDateFromTxt + "</td>";
                html += "<td>" + elementValue.MoveInDateToTxt + "</td>";
                html += "<td>" + elementValue.MonthlyPayment + "</td>";

                html += "<td class='text-center'>";
                html += "<a style='background: transparent; margin-right:10px' id='updateAHRInfo' href='JavaScript:Void(0)' onclick='getApplicantHistoryInfo(" + elementValue.AHID + ")'><span class='fa fa-edit' ></span></a>";
                html += "<a style='background: transparent;' href='JavaScript:Void(0)' onclick='delApplicantHistory(" + elementValue.AHID + ")'><span class='fa fa-trash' ></span></a></td>";
                html += "</tr>";

                var summAdd = "<tr><td style='width: 195px;'>Previous Address </td><td>" + elementValue.HomeAddress1 + ", " + elementValue.HomeAddress2 + ", " + elementValue.CityHome + ", " + elementValue.StateHomeTxt + " -" + elementValue.ZipHome + "</td></tr>";
                $("#tblAHR>tbody").append(html);
                $("#prevadd>tbody").append(summAdd);
                $("#prevaddp>tbody").append(summAdd);
            });

        }
    });
};

var getApplicantHistoryInfo = function (id) {
    $("#divLoader").show();
    var model = {
        AHID: id
    };
    $.ajax({
        url: '/ApplyNow/GetApplicantHistoryDetails/',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            $("#popApplicantHistory").modal("show");
            $("#hdnAHRId").val(response.model.AHID);
            $("#txtCountry2").val(response.model.Country);
            $("#txtAddress12").val(response.model.HomeAddress1);
            $("#txtAddress22").val(response.model.HomeAddress2);
            //$("#ddlStateHome2").val(response.model.StateHome).change();
            fillStateDDL_Home2Quotation(response.model.Country, response.model.StateHome);
            $("#ddlCityHome2").val(response.model.CityHome);
            $("#txtZip2").val(response.model.ZipHome);
            $("#ddlRentOwn2").val(response.model.RentOwn);
            $("#txtMoveInDateFrom2").val(response.model.MoveInDateFromTxt);
            $("#txtMoveInDateTo2").val(response.model.MoveInDateToTxt);
            $("#txtMonthlyPayment2").val(response.model.MonthlyPayment);
            $("#txtReasonforleaving2").val(response.model.Reason);
        }
    });
};

var clearApplicantHistory = function () {
    $("#hdnAHRId").val(0);
    $("#txtCountry2").val("1");
    fillStateDDL_Home2Quotation(1, 0);
    $("#txtAddress12").val("");
    $("#txtAddress22").val("");
    $("#ddlStateHome2").val(0);
    $("#ddlCityHome2").val("");
    $("#txtZip2").val("");
    $("#ddlRentOwn2").val(0);
    $("#txtMoveInDateFrom2").val("");
    $("#txtMoveInDateTo2").val("");
    $("#txtMonthlyPayment2").val("");
    $("#txtReasonforleaving2").val("");
    $("#txtApartmentCommunity2").val("");
    $("#txtManagementCompany2").val("");
    $("#txtManagementCompanyPhone2").val("");
    $("#ddlProperNoticeLeaseAgreement2").val("1");
};

var delApplicantHistory = function (aHRID) {

    var model = {
        AHID: aHRID
    };

    $.alert({
        title: "",
        content: "Are you sure to Applicant History?",
        type: 'blue',
        buttons: {
            yes: {
                text: 'Yes',
                action: function (yes) {
                    $("#divLoader").show();
                    $.ajax({
                        url: '/ApplyNow/DeleteApplicantHistory/',
                        type: "post",
                        contentType: "application/json utf-8",
                        data: JSON.stringify(model),
                        dataType: "JSON",
                        success: function (response) {
                            $("#divLoader").hide();
                            $('#tr_' + aHRID).remove();
                        }
                    });
                }
            },
            no: {
                text: 'No',
                action: function (no) {
                }
            }
        }
    });
};
var addEmailArray = [];
var addEmail = function (email) {

    addEmailArray.push({ AppEmail: email });
}
var sendCoappEmail = function () {

    //console.log(addEmailArray)
    var model = {
        lstemailsend: addEmailArray, ProspectId: $("#hdnOPId").val()
    };

    $.alert({
        title: "",
        content: "Are you sure to send Email?",
        type: 'blue',
        buttons: {
            yes: {
                text: 'Yes',
                action: function (yes) {
                    $("#divLoader").show();
                    $.ajax({
                        url: "/ApplyNow/SendCoappEmail",
                        type: "post",
                        contentType: "application/json utf-8",
                        data: JSON.stringify(model),
                        dataType: "JSON",
                        success: function (response) {
                            $("#divLoader").hide();
                            $.alert({
                                title: "",
                                content: "Email Sent Successfully",
                                type: 'blue',
                            });
                        }
                    });
                }
            },
            no: {
                text: 'No',
                action: function (no) {
                }
            }
        }
    });
};

var sendPayLinkEmail = function (emil) {

    var model = {
        Email: emil, ProspectId: $("#hdnOPId").val()
    };

    $.alert({
        title: "",
        content: "Are you sure to send Payment Link Email?",
        type: 'blue',
        buttons: {
            yes: {
                text: 'Yes',
                action: function (yes) {
                    $("#divLoader").show();
                    $.ajax({
                        url: "/ApplyNow/SendPayLinkEmail",
                        type: "post",
                        contentType: "application/json utf-8",
                        data: JSON.stringify(model),
                        dataType: "JSON",
                        success: function (response) {
                            $("#divLoader").hide();
                            $.alert({
                                title: "",
                                content: "Email Sent Successfully",
                                type: 'blue',
                            });
                        }
                    });
                }
            },
            no: {
                text: 'No',
                action: function (no) {
                }
            }
        }
    });
};
var haveVehicle = function () {
    $("#divLoader").show();
    var ProspectID = $("#hdnOPId").val();
    var vehicleValue = '';

    if ($("#chkDontHaveVehicle").is(":checked")) {
        vehicleValue = true;
    }

    else if ($("#chkDontHaveVehicle").is(":not(:checked)")) {
        vehicleValue = false;
    }

    var model = {
        id: ProspectID,
        vehicleValue: vehicleValue
    };
    $.ajax({
        url: '/ApplyNow/HaveVehicle',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            getVehicleLists();
            $("#divLoader").hide();
        }
    });
};

var havePet = function () {
    $("#divLoader").show();
    var ProspectID = $("#hdnOPId").val();
    var petValue = '';

    if ($("#chkDontHavePet").is(":checked")) {
        petValue = true;
    }

    else if ($("#chkDontHavePet").is(":not(:checked)")) {
        petValue = false;
    }

    var model = {
        id: ProspectID,
        PetValue: petValue
    };
    $.ajax({
        url: '/ApplyNow/HavePet',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
        }
    });
};

//Upload 1,2,3
var taxReturnFileUpload1 = function () {
    $("#divLoader").show();
    $formData = new FormData();

    var upload1 = document.getElementById('fileUploadTaxReturn1');

    for (var i = 0; i < upload1.files.length; i++) {
        $formData.append('file-' + i, upload1.files[i]);
    }

    $.ajax({
        url: '/ApplyNow/TaxFileUpload1',
        type: 'post',
        data: $formData,
        contentType: 'application/json; charset=utf-8',
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            $("#divLoader").hide();
            $('#hndFileUploadName1').val(response.model.tempUpload1);
            $('#hndOriginalFileUploadName1').val(response.model.UploadOriginalFileName1);

            $.alert({
                title: "",
                content: "File uploaded Successfully.",
                type: 'blue'
            });
        }
    });
};
var taxReturnFileUpload2 = function () {
    $("#divLoader").show();
    $formData = new FormData();

    var upload2 = document.getElementById('fileUploadTaxReturn2');

    var fileNameUp2 = $('#hndFileUploadName2').val();
    var orginalFileNameUp2 = $('#hndOriginalFileUploadName2').val();

    for (var i = 0; i < upload2.files.length; i++) {
        $formData.append('file-' + i, upload2.files[i]);
    }

    $.ajax({
        url: '/ApplyNow/TaxFileUpload2',
        type: 'post',
        data: $formData,
        contentType: 'application/json; charset=utf-8',
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            $("#divLoader").hide();
            $('#hndFileUploadName2').val(response.model.tempUpload2);
            $('#hndOriginalFileUploadName2').val(response.model.UploadOriginalFileName2);

            $.alert({
                title: "",
                content: "File uploaded Successfully.",
                type: 'blue'
            });
        }
    });
};
var taxReturnFileUpload3 = function () {
    $("#divLoader").show();
    $formData = new FormData();

    var upload3 = document.getElementById('fileUploadTaxReturn3');

    for (var i = 0; i < upload3.files.length; i++) {
        $formData.append('file-' + i, upload3.files[i]);
    }

    $.ajax({
        url: '/ApplyNow/TaxFileUpload3',
        type: 'post',
        data: $formData,
        contentType: 'application/json; charset=utf-8',
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            $("#divLoader").hide();
            $('#hndFileUploadName3').val(response.model.tempUpload3);
            $('#hndOriginalFileUploadName3').val(response.model.UploadOriginalFileName3);

            $.alert({
                title: "",
                content: "File uploaded Successfully.",
                type: 'blue'
            });
        }
    });
};

var taxReturnFileUpload1HEI = function () {
    $("#divLoader").show();
    $formData = new FormData();

    var upload1HEI = document.getElementById('fileUploadTaxReturn1HEI');

    for (var i = 0; i < upload1HEI.files.length; i++) {
        $formData.append('file-' + i, upload1HEI.files[i]);
    }

    $.ajax({
        url: '/ApplyNow/TaxFileUpload1HEI',
        type: 'post',
        data: $formData,
        contentType: 'application/json; charset=utf-8',
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            $("#divLoader").hide();
            $('#hndFileUploadName1HEI').val(response.model.TaxReturn1);
            $('#hndOriginalFileUploadName1HEI').val(response.model.TaxReturn1OrigName);

            $.alert({
                title: "",
                content: "File uploaded Successfully.",
                type: 'blue'
            });
        }
    });
};
var taxReturnFileUpload2HEI = function () {
    $("#divLoader").show();
    $formData = new FormData();

    var upload2HEI = document.getElementById('fileUploadTaxReturn2HEI');

    var fileNameUp2HEI = $('#hndFileUploadName2HEI').val();
    var orginalFileNameUp2HEI = $('#hndOriginalFileUploadName2HEI').val();

    for (var i = 0; i < upload2HEI.files.length; i++) {
        $formData.append('file-' + i, upload2HEI.files[i]);
    }

    $.ajax({
        url: '/ApplyNow/TaxFileUpload2HEI',
        type: 'post',
        data: $formData,
        contentType: 'application/json; charset=utf-8',
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            $("#divLoader").hide();
            $('#hndFileUploadName2HEI').val(response.model.TaxReturn2);
            $('#hndOriginalFileUploadName2HEI').val(response.model.TaxReturn2OrigName);

            $.alert({
                title: "",
                content: "File uploaded Successfully.",
                type: 'blue'
            });
        }
    });
};
var taxReturnFileUpload3HEI = function () {
    $("#divLoader").show();
    $formData = new FormData();

    var upload3HEI = document.getElementById('fileUploadTaxReturn3HEI');

    for (var i = 0; i < upload3HEI.files.length; i++) {
        $formData.append('file-' + i, upload3HEI.files[i]);
    }

    $.ajax({
        url: '/ApplyNow/TaxFileUpload3HEI',
        type: 'post',
        data: $formData,
        contentType: 'application/json; charset=utf-8',
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            $("#divLoader").hide();
            $('#hndFileUploadName3HEI').val(response.model.TaxReturn3);
            $('#hndOriginalFileUploadName3HEI').val(response.model.TaxReturn3OrigName);

            $.alert({
                title: "",
                content: "File uploaded Successfully.",
                type: 'blue'
            });
        }
    });
};

//Upload Passport
var uploadPassport = function () {
    $("#divLoader").show();
    $formData = new FormData();

    var passportFile = document.getElementById('fileUploadPassport');

    for (var i = 0; i < passportFile.files.length; i++) {
        $formData.append('file-' + i, passportFile.files[i]);
    }

    $.ajax({
        url: '/ApplyNow/UploadPassport',
        type: 'post',
        data: $formData,
        contentType: 'application/json; charset=utf-8',
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            $("#divLoader").hide();
            $('#hndPassportUploadName').val(response.model.tempPassportUpload);
            $('#hndOriginalPassportUploadName').val(response.model.UploadOriginalPassportName);
            $.alert({
                title: "",
                content: "File uploaded Successfully.",
                type: 'blue'
            });
        }
    });
};

//Upload Identity Documents
var uploadIdentityDocument = function () {
    $("#divLoader").show();
    $formData = new FormData();

    var identityFile = document.getElementById('fileUploadIdentity');

    for (var i = 0; i < identityFile.files.length; i++) {
        $formData.append('file-' + i, identityFile.files[i]);
    }

    $.ajax({
        url: '/ApplyNow/UploadIdentity',
        type: 'post',
        data: $formData,
        contentType: 'application/json; charset=utf-8',
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            $("#divLoader").hide();
            $('#hndIdentityUploadName').val(response.model.tempIdentityUpload);
            $('#hndOriginalIdentityUploadName').val(response.model.UploadOriginalIdentityName);
            $.alert({
                title: "",
                content: "File uploaded Successfully.",
                type: 'blue'
            });
        }
    });
};

//Upload Pet Documents
var uploadPetPhoto = function () {
    $("#divLoader").show();
    $formData = new FormData();

    var petPhotoFile = document.getElementById('pet-picture');

    for (var i = 0; i < petPhotoFile.files.length; i++) {
        $formData.append('file-' + i, petPhotoFile.files[i]);
    }

    $.ajax({
        url: '/ApplyNow/UploadPetPhoto',
        type: 'post',
        data: $formData,
        contentType: 'application/json; charset=utf-8',
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            $("#divLoader").hide();
            $('#hndPetPicture').val(response.model.TempPetNameFile);
            $('#hndOriginalPetPicture').val(response.model.OriginalPetNameFile);
            $.alert({
                title: "",
                content: "File uploaded Successfully.",
                type: 'blue'
            });
        }
    });
};

var uploadPetVaccination = function () {
    $("#divLoader").show();
    $formData = new FormData();

    var petVaccinationCertificateFile = document.getElementById('filePetVaccinationCertificate');

    for (var i = 0; i < petVaccinationCertificateFile.files.length; i++) {
        $formData.append('file-' + i, petVaccinationCertificateFile.files[i]);
    }

    $.ajax({
        url: '/ApplyNow/UploadPetVaccinationCertificate',
        type: 'post',
        data: $formData,
        contentType: 'application/json; charset=utf-8',
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            $("#divLoader").hide();
            $('#hndPetVaccinationCertificate').val(response.model.TempPetVaccinationCertificateFile);
            $('#hndOriginalPetVaccinationCertificate').val(response.model.OriginalPetVaccinationCertificateFile);
            $.alert({
                title: "",
                content: "File uploaded Successfully.",
                type: 'blue'
            });
        }
    });
};

//Upload Vehicle Documents

var uploadVehicleCertificate = function () {
    $("#divLoader").show();
    $formData = new FormData();

    var vehicleCertificate = document.getElementById('fileUploadVehicleRegistation');

    for (var i = 0; i < vehicleCertificate.files.length; i++) {
        $formData.append('file-' + i, vehicleCertificate.files[i]);
    }

    $.ajax({
        url: '/ApplyNow/UploadVehicleRegistation',
        type: 'post',
        data: $formData,
        contentType: 'application/json; charset=utf-8',
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            $("#divLoader").hide();
            $('#hndVehicleRegistation').val(response.model.TempVehicleRegistation);
            $('#hndOriginalVehicleRegistation').val(response.model.OriginalVehicleRegistation);
            $.alert({
                title: "",
                content: "File uploaded Successfully.",
                type: 'blue'
            });
        }
    });
};

var getTenantPetPlaceData = function () {
    $("#divLoader").show();
    var ProspectID = $("#hdnOPId").val();

    var model = {
        id: ProspectID
    };
    $.ajax({
        url: '/ApplyNow/GetTenantPetPlaceData',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            var tenantCount = response.model.TenantPetCount;
            var valueCount = response.model.NumberOfPets;
            var rowCount = $("#tblPet >tbody").children().length;
            $("#hndPetPlaceCount").val(valueCount);

            if (parseInt(response.model.NumberOfPets) == 1) {
                $("#spanPetDNAFee1").text("Pet DNA Fee x 1 Pets:");
                $("#spanPetDNAFee2").text("Pet DNA Fee x 1 Pets:");
                $("#spanPetDNAFee3").text("Pet DNA Fee x 1 Pets:");
                $("#spanPetDNAFee4").text("Pet DNA Fee x 1 Pets:");
            } else if (parseInt(response.model.NumberOfPets) == 2) {
                $("#spanPetDNAFee1").text("Pet DNA Fee x 2 Pets:");
                $("#spanPetDNAFee2").text("Pet DNA Fee x 2 Pets:");
                $("#spanPetDNAFee3").text("Pet DNA Fee x 2 Pets:");
                $("#spanPetDNAFee4").text("Pet DNA Fee x 2 Pets:");
            }
            else {
                $("#spanPetDNAFee1").text("Pet DNA Fee:");
                $("#spanPetDNAFee2").text("Pet DNA Fee:");
                $("#spanPetDNAFee3").text("Pet DNA Fee:");
                $("#spanPetDNAFee4").text("Pet DNA Fee:");
            }


            if ($("#chkDontHavePet").is(':checked')) {
                $("#btnAddPet").attr("disabled", true);
                $("#btnAddPet").css("background-color", "#b4ada5");
            }
            if (!valueCount) { valueCount = 0; }

            if (valueCount == 0 && tenantCount == 0) {
                $("#tblPet>tbody").empty();
                $("#chkDontHavePetDiv").removeClass("hidden");
                $("#chkDontHavePet").iCheck('check');
                $("#btnAddPet").attr("disabled", true);
                $("#btnAddPet").css("background-color", "#b4ada5");
            }
            else if (valueCount == 1 && tenantCount == 1) {
                $("#btnAddPet").attr("disabled", true);
                $("#btnAddPet").css("background-color", "#b4ada5");
                $("#chkDontHavePetDiv").addClass("hidden");
            }
            else if (valueCount == 2 && tenantCount == 2) {
                $("#btnAddPet").attr("disabled", true);
                $("#btnAddPet").css("background-color", "#b4ada5");
                $("#chkDontHavePetDiv").addClass("hidden");
            }
            else {
                $("#chkDontHavePetDiv").addClass("hidden");
                $("#chkDontHavePet").iCheck('uncheck');
                $("#btnAddPet").attr("disabled", false);
            }
        }
    });
};

var onFocusApplyNow = function () {

    $("#txtApplicantPhone").focusout(function () {
        var phoneNum = $("#txtApplicantPhone").val();
        //if (phoneNum.length < 10) {
        //    alert("Please fill valid phone number");
        //    $("#txtApplicantPhone").focus();
        //    return;
        //}
        $("#txtApplicantPhone").val(formatPhoneFax($("#txtApplicantPhone").val()));
    })
        .focus(function () {
            $("#txtApplicantPhone").val(unformatText($("#txtApplicantPhone").val()));
        });

    $("#txtMobileNumber").focusout(function () {
        var phoneNum = $("#txtMobileNumber").val();
        //if (phoneNum.length < 10) {
        //    alert("Please fill valid phone number");
        //    $("#txtMobileNumber").focus();
        //    return;
        //}
        $("#txtMobileNumber").val(formatPhoneFax($("#txtMobileNumber").val()));
    })
        .focus(function () {
            $("#txtMobileNumber").val(unformatText($("#txtMobileNumber").val()));
        });

    $("#txtSupervisiorPhone").focusout(function () {
        var phoneNum = $("#txtSupervisiorPhone").val();
        //if (phoneNum.length < 10) {
        //    alert("Please fill valid phone number");
        //    $("#txtMobileNumber").focus();
        //    return;
        //}
        $("#txtSupervisiorPhone").val(formatPhoneFax($("#txtSupervisiorPhone").val()));
    })
        .focus(function () {
            $("#txtSupervisiorPhone").val(unformatText($("#txtSupervisiorPhone").val()));
        });

    $("#txtEmergencyMobile").focusout(function () {
        var phoneNum = $("#txtEmergencyMobile").val();
        //if (phoneNum.length < 10) {
        //    alert("Please fill valid phone number");
        //    $("#txtMobileNumber").focus();
        //    return;
        //}
        $("#txtEmergencyMobile").val(formatPhoneFax($("#txtEmergencyMobile").val()));
    })
        .focus(function () {
            $("#txtEmergencyMobile").val(unformatText($("#txtEmergencyMobile").val()));
        });

    $("#txtEmergencyHomePhone").focusout(function () {
        var phoneNum = $("#txtEmergencyHomePhone").val();
        //if (phoneNum.length < 10) {
        //    alert("Please fill valid phone number");
        //    $("#txtMobileNumber").focus();
        //    return;
        //}
        $("#txtEmergencyHomePhone").val(formatPhoneFax($("#txtEmergencyHomePhone").val()));
    })
        .focus(function () {
            $("#txtEmergencyHomePhone").val(unformatText($("#txtEmergencyHomePhone").val()));
        });

    $("#txtEmergencyWorkPhone").focusout(function () {
        var phoneNum = $("#txtEmergencyWorkPhone").val();
        //if (phoneNum.length < 10) {
        //    alert("Please fill valid phone number");
        //    $("#txtMobileNumber").focus();
        //    return;
        //}
        $("#txtEmergencyWorkPhone").val(formatPhoneFax($("#txtEmergencyWorkPhone").val()));
    })
        .focus(function () {
            $("#txtEmergencyWorkPhone").val(unformatText($("#txtEmergencyWorkPhone").val()));
        });

    $("#txtMonthlyPayment").focusout(function () { $("#txtMonthlyPayment").val(formatMoney($("#txtMonthlyPayment").val())); })
        .focus(function () {
            $("#txtMonthlyPayment").val(unformatText($("#txtMonthlyPayment").val()));
        });

    $("#txtMonthlyPayment2").focusout(function () { $("#txtMonthlyPayment2").val(formatMoney($("#txtMonthlyPayment2").val())); })
        .focus(function () {
            $("#txtMonthlyPayment2").val(unformatText($("#txtMonthlyPayment2").val()));
        });

    $("#txtAnnualIncome").focusout(function () { $("#txtAnnualIncome").val(formatMoney($("#txtAnnualIncome").val())); })
        .focus(function () {
            $("#txtAnnualIncome").val(unformatText($("#txtAnnualIncome").val()));
        });

    $("#txtAddAnnualIncome").focusout(function () { $("#txtAddAnnualIncome").val(formatMoney($("#txtAddAnnualIncome").val())); })
        .focus(function () {
            $("#txtAddAnnualIncome").val(unformatText($("#txtAddAnnualIncome").val()));
        });

    $("#txtAnnualIncomeHEI").focusout(function () { $("#txtAnnualIncomeHEI").val(formatMoney($("#txtAnnualIncomeHEI").val())); })
        .focus(function () {
            $("#txtAnnualIncomeHEI").val(unformatText($("#txtAnnualIncomeHEI").val()));
        });

    $("#txtAddAnnualIncomeHEI").focusout(function () { $("#txtAddAnnualIncomeHEI").val(formatMoney($("#txtAddAnnualIncomeHEI").val())); })
        .focus(function () {
            $("#txtAddAnnualIncomeHEI").val(unformatText($("#txtAddAnnualIncomeHEI").val()));
        });
    $("#txtSupervisiorPhoneHEI").focusout(function () { $("#txtSupervisiorPhoneHEI").val(formatPhoneFax($("#txtSupervisiorPhoneHEI").val())); })
        .focus(function () {
            $("#txtSupervisiorPhoneHEI").val(unformatText($("#txtSupervisiorPhoneHEI").val()));
        });

    $("#txtSSNNumber").focusin(function () {
        var id = $("#hdnOPId").val();
        var model = {
            id: id,
            vid: 1
        };
        $.ajax({
            url: '/ApplyNow/GetSSNIdNumberPassportNumber',
            type: "post",
            contentType: "application/json utf-8",
            data: JSON.stringify(model),
            dataType: "JSON",
            success: function (response) {
                $("#txtSSNNumber").val(response.ssn);
            }
        });
    }).focusout(function () {
        var ssn = $(this).val();
        if (ssn.length < 9) {
            alert("SSN must be 9 digit");
            return;
        }
        if (ssn.length > 4) {
            saveupdateSSN(ssn);
            $(this).val("***-**-" + ssn.substr(ssn.length - 4, 4));
        }
    });

    $("#txtIDNumber").focusin(function () {
        var id = $("#hdnOPId").val();
        var model = {
            id: id,
            vid: 3
        };
        $.ajax({
            url: '/ApplyNow/GetSSNIdNumberPassportNumber',
            type: "post",
            contentType: "application/json utf-8",
            data: JSON.stringify(model),
            dataType: "JSON",
            success: function (response) {
                $("#txtIDNumber").val(response.ssn);
            }
        });
    }).focusout(function () {
        var idnumber = $(this).val();
        if (idnumber.length < 5) {
            alert("ID Number should be greater then 4 digit");
            return;
        }
        if (idnumber.length > 4) {
            saveupdateIDNumber(idnumber);
            $(this).val(("*".repeat(idnumber.length - 4) + idnumber.substr(idnumber.length - 4, 4)));
        }

    });

    $("#txtSSNNumberReg").focusin(function () {
        getEncDecValue(this, 1);
    }).focusout(function () {
        var ssn = $(this).val();
        if (ssn.length < 9) {
            alert("SSN must be 9 digit");
            return;
        }
        if (ssn.length > 4) {
            getEncDecValue(this, 2);
            $(this).val("***-**-" + ssn.substr(ssn.length - 4, 4));
        }
    });

    $("#txtIDNumberReg").focusin(function () {
        getEncDecValue(this, 1);
    }).focusout(function () {
        var idnumber = $(this).val();
        if (idnumber.length < 5) {
            alert("ID Number should be greater then 4 digit");
            return;
        }
        if (idnumber.length > 4) {
            getEncDecValue(this, 2);
            $(this).val(("*".repeat(idnumber.length - 4) + idnumber.substr(idnumber.length - 4, 4)));
        }
    });
    $("#txtApplicantSSNNumber").focusin(function () {
        getEncDecValue(this, 1);
    }).focusout(function () {
        var ssn = $(this).val();
        if (ssn.length < 9) {
            alert("SSN must be 9 digit");
            return;
        }
        if (ssn.length > 4) {
            getEncDecValue(this, 2);
            $(this).val("***-**-" + ssn.substr(ssn.length - 4, 4));
        }
    });

    $("#txtApplicantIDNumber").focusin(function () {
        getEncDecValue(this, 1);
    }).focusout(function () {
        var idnumber = $(this).val();
        if (idnumber.length < 5) {
            alert("ID Number should be greater then 4 digit");
            return;
        }
        if (idnumber.length > 4) {
            getEncDecValue(this, 2);
            $(this).val(("*".repeat(idnumber.length - 4) + idnumber.substr(idnumber.length - 4, 4)));
        }
    });
    $("#txtPassportNum").focusin(function () {
        var id = $("#hdnOPId").val();
        var model = {
            id: id,
            vid: 2
        };
        $.ajax({
            url: '/ApplyNow/GetSSNIdNumberPassportNumber',
            type: "post",
            contentType: "application/json utf-8",
            data: JSON.stringify(model),
            dataType: "JSON",
            success: function (response) {
                $("#txtPassportNum").val(response.ssn);
            }
        });
    }).focusout(function () {
        var passportnumber = $(this).val();
        if (passportnumber.length > 4) {
            saveupdatePassportNumber(passportnumber);
            $(this).val(("*".repeat(passportnumber.length - 4) + passportnumber.substr(passportnumber.length - 4, 4)));
        }
    });

    $("#txtPhoneNumber").focusout(function () {
        var phoneNum = $("#txtPhoneNumber").val();
        //if (phoneNum.length < 10) {
        //    alert("Please fill valid mobile number");
        //    $("#txtPhoneNumber").focus();
        //    return;
        //}
        $("#txtPhoneNumber").val(formatPhoneFax($("#txtPhoneNumber").val()));
    })
        .focus(function () {
            $("#txtPhoneNumber").val(unformatText($("#txtPhoneNumber").val()));
        });
    $("#txtManagementCompanyPhone").focusout(function () {
        var phoneNum = $("#txtManagementCompanyPhone").val();
        //if (phoneNum.length < 10) {
        //    alert("Please fill valid management company phone number");
        //    $("#txtManagementCompanyPhone").focus();
        //    return;
        //}
        $("#txtManagementCompanyPhone").val(formatPhoneFax($("#txtManagementCompanyPhone").val()));
    })
        .focus(function () {
            $("#txtManagementCompanyPhone").val(unformatText($("#txtManagementCompanyPhone").val()));
        });
    $("#txtManagementCompanyPhone2").focusout(function () {
        var phoneNum = $("#txtManagementCompanyPhone2").val();
        //if (phoneNum.length < 10) {
        //    alert("Please fill valid management company phone number");
        //    $("#txtManagementCompanyPhone2").focus();
        //    return;
        //}
        $("#txtManagementCompanyPhone2").val(formatPhoneFax($("#txtManagementCompanyPhone2").val()));
    })
        .focus(function () {
            $("#txtManagementCompanyPhone2").val(unformatText($("#txtManagementCompanyPhone2").val()));
        });
};

function formatPhoneFax(phonefax) {
    if (phonefax == null)
        phonefax = "";
    phonefax = phonefax.replace(/[^0-9]/g, '');
    if (phonefax.length == 0)
        return phonefax;

    return '(' + phonefax.substring(0, 3) + ') ' + phonefax.substring(3, 6) + (phonefax.length > 6 ? '-' : '') + phonefax.substring(6);
}

function unformatText(text) {
    if (text == null)
        text = "";

    return text.replace(/[^\d\.]/g, '');
}

function formatSSN(ssn) {
    if (ssn == null)
        ssn = "";
    ssn = ssn.replace(/[^0-9]/g, '');
    if (ssn.length == 0)
        return ssn;

    return ssn.substring(0, 3) + (ssn.length > 3 ? '-' : '') + ssn.substring(3, 5) + (ssn.length > 5 ? '-' : '') + ssn.substring(5);
}

function formatMoney(number) {
    number = number || 0;
    var places = 2;
    var symbol = "";
    var thousand = ",";
    var decimal = ".";
    var negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
}

var getDocuDoc = function (envelopeID) {

    $("#divLoader").show();
    var param = { EnvelopeID: envelopeID };
    $.ajax({
        url: "/EmbeddedSigning/GetDocuDocLease",
        method: "post",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8", // content type sent to server
        dataType: "json", //Expected data format from server
        success: function (response) {
            $("#divLoader").hide();
            window.open("/Content/assets/img/Document/" + response.result, "popupWindow", "width=900,height=600,scrollbars=yes");

        }
    });
}
function gotoLogin() {
    window.location.href = "../../../Home/Index";
}

function checkExpiry() {

    QuoteExpires = $("#lblFNLQuoteExpires").text();
    var countDownDate = new Date(QuoteExpires).getTime();
    var x = setInterval(function () {

        var now = new Date().getTime();
        var expiredDate = countDownDate - now;
        var quotationTenantId = $("#hdnOPId").val();
        if (expiredDate < 0) {
            $("#popRentalQualification").modal("hide");
            clearInterval(x);
            document.getElementById("getting-startedTimeRemainingClock").innerHTML = "QUOTE EXPIRED";
            var model = {
                TenantID: quotationTenantId
            };
            $.alert({
                title: "",
                content: "Your Quotation is Expired. Please register again..",
                type: 'red',
                buttons: {
                    yes: {
                        text: 'OK',
                        action: function (yes) {

                            $("#divLoader").show();

                            $.ajax({
                                url: "/ApplyNow/DeleteApplicantTenantID/",
                                type: "post",
                                contentType: "application/json utf-8",
                                data: JSON.stringify(model),
                                dataType: "JSON",
                                success: function (response) {
                                    window.location.href = '/Home';
                                    localStorage.setItem("CheckReload", "Done");
                                    $("#divLoader").hide();
                                    return;
                                }
                            });
                        }

                    }
                }
            });
        }

    }, 1000);

}

var checkEmailAreadyExistGenerateQuo = function () {

    var model = { EmailId: $('#txtEmail').val() };
    $("#divLoader").show();
    $.ajax({
        url: "/ApplyNow/CheckEmailAreadyExist",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.model == "Yes Tenant") {
                $.alert({
                    title: "",
                    content: "This email Id is already exist.",
                    type: 'blue',
                    buttons: {
                        ok: {
                            text: 'Ok',
                            action: function (ok) {
                                $('#txtEmail').val('');
                                $('#txtEmail').focus();
                            }
                        }
                    }
                });
            }
            else if (response.model == "Yes But Not Tenant") {
                $.alert({
                    title: "",
                    content: "This email Id is already exist.",
                    type: 'blue',
                    buttons: {
                        ok: {
                            text: 'Ok',
                            action: function (ok) {
                                $('#txtEmail').val('');
                                $('#txtEmail').focus();
                            }
                        }
                    }
                });
            }
        }
    });
    $("#divLoader").hide();
}

var dateIconFunctions = function () {
    $('#DOBdate').click(function () {
        $("#txtDateOfBirth").focus();
    });
    $('#SPMoveInDateF').click(function () {
        $("#txtMoveInDateFrom").focus();
    });
    //$('#SPMoveInDateT').click(function () {
    //    $("#txtMoveInDateTo").focus();
    //});
    $('#IconMoveInDateFrom2').click(function () {
        $("#txtMoveInDateFrom2").focus();
    });
    $('#IconMoveInDateTo2').click(function () {
        $("#txtMoveInDateTo2").focus();
    });
    $('#IconStartDateHEI').click(function () {
        $("#txtStartDateHEI").focus();
    });
    $('#IconTerminationDateHEI').click(function () {
        $("#txtTerminationDateHEI").focus();
    });
    $('#IconDateOfBirth').click(function () {
        $("#txtDateOfBirth").focus();
    });
};
var createLeaseDocument = function () {
    if ($("#btnDownloadLeaseDocument").attr("disabled")) {
        return;
    }
    $("#divLoader").show();
    var param = { UserID: $("#hndUID").val() };
    $.ajax({
        url: "/CheckList/LeaseDocument",
        method: "post",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8", // content type sent to server
        dataType: "json", //Expected data format from server
        success: function (response) {
            $("#divLoader").hide();
            $("#btnDownloadLeaseDocument").attr("disabled", "disabled");
            $("#btnleaseDownl").removeAttr("disabled");
        }
    });
}
var downloadLeaseDocument = function () {
    $("#divLoader").show();
    var param = { UserID: $("#hndUID").val() };
    $.ajax({
        url: "/CheckList/GetLeaseDocBlumoon",
        method: "post",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8", // content type sent to server
        dataType: "json", //Expected data format from server
        success: function (response) {
            $("#divLoader").hide();
            var hyperlink = document.createElement('a');
            hyperlink.href = "/Content/assets/img/Document/LeaseDocument_" + response.LeaseId + ".pdf";
            hyperlink.target = '_blank';
            hyperlink.download = "LeaseDocument_" + response.LeaseId + ".pdf";

            (document.body || document.documentElement).appendChild(hyperlink);
            hyperlink.onclick = function () {
                (document.body || document.documentElement).removeChild(hyperlink);
            };
            var mouseEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            hyperlink.dispatchEvent(mouseEvent);
            if (!navigator.mozGetUserMedia) {
                window.URL.revokeObjectURL(hyperlink.href);
            }

        }
    });
};

var getMonthsCountFromApplicantHistory = function () {
    $("#divLoader").show();
    var todaysDate = new Date();
    var twoDigitMonth = ((todaysDate.getMonth().length + 1) === 1) ? (todaysDate.getMonth() + 1) : '0' + (todaysDate.getMonth() + 1);
    var twoDigitDay = ((todaysDate.getDate().length) === 1) ? (todaysDate.getDate()) : '0' + (todaysDate.getDate());
    todaysDate = twoDigitMonth + "/" + todaysDate.getDate() + "/" + todaysDate.getFullYear();
    var tenantId = $("#hdnOPId").val();
    var fromDateAppHis = $('#txtMoveInDateFrom').val();
    var toDateAppHis = todaysDate;

    var model = {
        TenantId: tenantId,
        FromDateAppHis: fromDateAppHis,
        ToDateAppHis: toDateAppHis
    };
    $.ajax({
        url: '/ApplyNow/GetMonthsFromApplicantHistory',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            $("#hndHistory").val(response.model.TotalMonthsApplicantHistory);
        }
    });
};

var deleteVehiclesListOnCheck = function () {
    $("#divLoader").show();
    var ProspectID = $("#hdnOPId").val();

    var model = {
        TenantId: ProspectID
    };
    $.ajax({
        url: '/ApplyNow/DeleteVehicleListOnCheck',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
        }
    });
};

var saveupdateSSN = function (ssn) {

    var prospectID = $("#hdnOPId").val();
    var sSNNumber = ssn;
    if (sSNNumber != "") {
        $("#divLoader").show();
        var model = {
            ProspectID: prospectID,
            SSN: sSNNumber
        };
        $.ajax({
            url: '/ApplyNow/SaveUpdateSSN',
            type: "post",
            contentType: "application/json utf-8",
            data: JSON.stringify(model),
            dataType: "JSON",
            success: function (response) {
                $("#divLoader").hide();
            }
        });
    }

};

var saveupdateIDNumber = function (idnum) {

    var prospectID = $("#hdnOPId").val();
    var idNumber = idnum;

    if (idNumber != "") {
        $("#divLoader").show();
        var model = {
            ProspectID: prospectID,
            IDNumber: idNumber
        };

        $.ajax({
            url: '/ApplyNow/SaveUpdateIDNumber',
            type: "post",
            contentType: "application/json utf-8",
            data: JSON.stringify(model),
            dataType: "JSON",
            success: function (response) {
                $("#divLoader").hide();
            }
        });
    }

};

var saveupdatePassportNumber = function (passportnumber) {

    var prospectID = $("#hdnOPId").val();
    var passportNumber = passportnumber;

    if (passportNumber != "") {
        $("#divLoader").show();
        var model = {
            ProspectID: prospectID,
            PassportNumber: passportNumber
        };

        $.ajax({
            url: '/ApplyNow/SaveUpdatePassportNumber',
            type: "post",
            contentType: "application/json utf-8",
            data: JSON.stringify(model),
            dataType: "JSON",
            success: function (response) {
                $("#divLoader").hide();
            }
        });
    }

};

var clearHistoryOfResidence = function () {

    $('#hdnHEI').val('0');
    $('#txtEmployerNameHEI').val('');
    $('#txtJobTitleHEI').val('');
    $('#ddlJobTypeHEI').val('0');
    $('#txtStartDateHEI').val('');
    $('#txtTerminationDateHEI').val('');
    $('#txtAnnualIncomeHEI').val('');
    $('#txtAddAnnualIncomeHEI').val('');
    $('#txtSupervisiorNameHEI').val('');
    $('#txtSupervisiorPhoneHEI').val('');
    $('#txtSupervisiorEmailHEI').val('');
    $('#txtCountryOfficeHEI').val('1');
    fillStateDDL_OfficeHEIQuotation(1, 0);

    $('#txtofficeAddress1HEI').val('');
    $('#txtofficeAddress2HEI').val('');
    $('#ddlCityEmployeeHEI').val('');
    $('#txtZipOfficeHEI').val('');
    $('#txtReasonOfTerminationHEI').val('');

}

var saveEmployerHistory = function () {
    $("#divLoader").show();
    var TenantId = $("#hdnOPId").val();
    var HEIid = $('#hdnHEI').val();
    var empNameHei = $('#txtEmployerNameHEI').val();
    var jobTitleHei = $('#txtJobTitleHEI').val();
    var jobTypeHei = $('#ddlJobTypeHEI').val();
    var startDateHei = $('#txtStartDateHEI').val();
    var terminationDateHei = $('#txtTerminationDateHEI').val();
    var annualIncomeHei = unformatText($('#txtAnnualIncomeHEI').val());
    var addAnnualIncomeHei = unformatText($('#txtAddAnnualIncomeHEI').val());
    var supervisorNameHei = $('#txtSupervisiorNameHEI').val();
    var supervisorPhoneHei = unformatText($('#txtSupervisiorPhoneHEI').val());
    var supervisorEmailHei = $('#txtSupervisiorEmailHEI').val();
    var countryOfficeHei = $('#txtCountryOfficeHEI').val();
    var offAddress1Hei = $('#txtofficeAddress1HEI').val();
    var officeAddress2Hei = $('#txtofficeAddress2HEI').val();
    var stateEmployeeHei = $('#ddlStateEmployeeHEI').val();
    var cityEmployeeHei = $('#ddlCityEmployeeHEI').val();
    var zipOfficeHei = $('#txtZipOfficeHEI').val();
    var terminationReasonHei = $('#txtReasonOfTerminationHEI').val();
    var msg = '';
    if (!empNameHei) {
        msg += 'Please Fill Employer Name</br>';
    }
    if (!startDateHei) {
        msg += 'Please Fill Start Date</br>';
    }
    if (!terminationDateHei) {
        msg += 'Please Fill Termination Date</br>';
    }
    if (!annualIncomeHei) {
        msg += 'Please Fill Annual Income</br>';
    }

    if (supervisorPhoneHei) {
        if (supervisorPhoneHei.length < 10) {
            msg += "Please enter 10 digit supervisor phone number </br>";
        }
    }

    if (supervisorEmailHei) {
        if (!validateEmail(supervisorEmailHei)) {
            msg += "Please Fill Valid Email </br>";
        }
    }

    if (countryOfficeHei == '0') {
        msg += 'Please Select Country</br>';
    }
    if (!offAddress1Hei) {
        msg += 'Please Fill Address 1</br>';
    }
    if (stateEmployeeHei == '0') {
        msg += 'Please Select state</br>';
    }
    if (!cityEmployeeHei) {
        msg += 'Please Fill City</br>';
    }
    if (!zipOfficeHei) {
        msg += 'Please Fill Zip</br>';
    }
    if (msg != '') {
        $("#divLoader").hide();
        $.alert({
            title: "",
            content: msg,
            type: 'blue'
        });
        return;
    }

    var model = {
        HEIID: HEIid,
        EmployerName: empNameHei,
        JobTitle: jobTitleHei,
        JobType: jobTypeHei,
        StartDate: startDateHei,
        TerminationDate: terminationDateHei,
        AnnualIncome: annualIncomeHei,
        AddAnnualIncome: addAnnualIncomeHei,
        SupervisorName: supervisorNameHei,
        SupervisorPhone: supervisorPhoneHei,
        SupervisorEmail: supervisorEmailHei,
        Country: countryOfficeHei,
        Address1: offAddress1Hei,
        Address2: officeAddress2Hei,
        State: stateEmployeeHei,
        City: cityEmployeeHei,
        Zip: zipOfficeHei,
        TenantId: TenantId,
        TerminationReason: terminationReasonHei
    };

    $.ajax({
        url: "/ApplyNow/SaveUpdateEmployerHistory",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json; charset=utf-8", // content type sent to server
        dataType: "json", //Expected data format from server
        success: function (response) {
            $("#divLoader").hide();
            getEmployerHistory();
            $('#popHistoryEmpAndIncome').modal('hide');
            $.alert({
                title: "",
                content: response.model,
                type: 'blue'
            });
        }
    });
}

var getEmployerHistory = function () {
    $("#divLoader").show();
    var TenantId = $("#hdnOPId").val();
    var model = { TenantId: TenantId };
    $.ajax({
        url: '/ApplyNow/GetEmployerHistory',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            $("#tblHEI>tbody").empty();
            $("#prevEmphistr>tbody").empty();
            $("#prevEmphistrp>tbody").empty();
            $.each(response.model, function (elementType, elementValue) {
                var html = "<tr data-value=" + elementValue.HEIID + ">";
                html += "<td>" + elementValue.EmployerName + "</td>";
                html += "<td>" + elementValue.JobTitle + "</td>";
                html += "<td>" + elementValue.JobTypeName + "</td>";
                html += "<td>" + elementValue.StartDateString + "</td>";
                html += "<td>" + elementValue.TerminationDateString + "</td>";
                html += "<td>" + elementValue.CountryName + "</td>";
                html += "<td>" + elementValue.StateName + "</td>";
                html += "<td>" + elementValue.City + "</td>";
                html += "<td class='text-center'><a class='fa fa-edit' style='background:transparent; margin-right:10px;' href='javascript:void(0)' onclick='editEmployerHistory(" + elementValue.HEIID + ")'></a><a class='fa fa-trash'  href='javascript:void(0)' onclick='delEmployerHistory(" + elementValue.HEIID + ")'></a></td>";
                html += "</tr>";
                $("#tblHEI>tbody").append(html);

                var summAdd = "<tr><td style='width: 195px;'>Previous Employer </td><td>" + elementValue.EmployerName + ", " + elementValue.JobTitle + ", " + elementValue.City + ", " + elementValue.StateName + " -" + + "</td></tr>";
                $("#prevEmphistr>tbody").append(summAdd);
                $("#prevEmphistrp>tbody").append(summAdd);
            });
        }
    });
}

var delEmployerHistory = function (id) {

    var model = { HEIID: id };
    $.alert({
        title: "",
        content: "Are you sure to remove?",
        type: 'blue',
        buttons: {
            yes: {
                text: 'Yes',
                action: function (yes) {
                    $("#divLoader").show();
                    $.ajax({
                        url: '/ApplyNow/DeleteEmployerHistory',
                        type: "post",
                        contentType: "application/json utf-8",
                        data: JSON.stringify(model),
                        dataType: "JSON",
                        success: function (response) {
                            $("#divLoader").hide();
                            getEmployerHistory();
                            $.alert({
                                title: "",
                                content: response.model,
                                type: 'blue'
                            });
                        }
                    });
                }
            },
            no: {
                text: 'No',
                action: function (no) {
                }
            }
        }
    });
}

var getMonthsCountFromEmployerHistory = function () {
    $("#divLoader").show();
    var todaysDate = new Date();
    var tenantId = $("#hdnOPId").val();
    var startDate = $('#txtStartDate').val();
    var currentDates = todaysDate;

    var model = {
        TenantId: tenantId,
        EmpStartDate: startDate,
        EmpTerminationDate: currentDates
    };
    $.ajax({
        url: '/ApplyNow/GetMonthsFromEmployerHistory',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            $("#hdnEmployerHistory").val(response.model.TotalMonthsEmployerHistory);
        }
    });
};
var editEmployerHistory = function (id) {
    $("#divLoader").show();
    var model = { HEIID: id };
    $.ajax({
        url: '/ApplyNow/EditEmployerHistory',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            $('#hdnHEI').val(response.model.HEIID);
            $('#txtEmployerNameHEI').val(response.model.EmployerName);
            $('#txtJobTitleHEI').val(response.model.JobTitle);
            $('#ddlJobTypeHEI').val(response.model.JobType);
            $('#txtStartDateHEI').val(response.model.StartDateString);
            $('#txtTerminationDateHEI').val(response.model.TerminationDateString);
            var anInc = formatMoney(response.model.AnnualIncome);
            $('#txtAnnualIncomeHEI').val(anInc);
            var addAnInc = formatMoney(response.model.AddAnnualIncome);
            $('#txtAddAnnualIncomeHEI').val(addAnInc);
            $('#txtSupervisiorNameHEI').val(response.model.SupervisorName);
            var ph = formatPhoneFax(response.model.SupervisorPhone);
            $('#txtSupervisiorPhoneHEI').val(ph);
            $('#txtSupervisiorEmailHEI').val(response.model.SupervisorEmail);
            $('#txtCountryOfficeHEI').val(response.model.Country);
            $('#txtofficeAddress1HEI').val(response.model.Address1);
            $('#txtofficeAddress2HEI').val(response.model.Address2);
            $('#ddlStateEmployeeHEI').val(response.model.State);
            $('#ddlCityEmployeeHEI').val(response.model.City);
            $('#txtZipOfficeHEI').val(response.model.Zip);
            $('#txtReasonOfTerminationHEI').val(response.model.TerminationReason);
            $('#popHistoryEmpAndIncome').modal('show');
        }
    });
}
var SaveUpdateStepQuotation = function (stepcompleted) {
    $("#divLoader").show();
    var ProspectId = $("#hdnOPId").val();
    var model = {
        ID: ProspectId,
        StepCompleted: stepcompleted
    };

    $.ajax({
        url: '/ApplyNow/SaveUpdateStep',
        type: 'post',
        data: JSON.stringify(model),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $("#divLoader").hide();
            var stepcomp = parseInt($("#hdnStepCompleted").val());
            if (stepcomp < stepcompleted) {
                $("#hdnStepCompleted").val(stepcompleted);
            }
        }
    });
}
var checkHasUnitID = function () {
    if ($("#hndShowPropertyDetails").val() != "0") {
        $("#PopSummary").modal("show");
    }
    else {
        $("#PopSummary").modal("hide");
        $.alert({
            title: "",
            content: "Please Select Unit",
            type: 'blue'
        });
    }
}
var savepudateOnlineProspectQuotation = function () {
    $("#divLoader").show();
    var userID = $("#hdnUserId").val();
    var firstName = $("#txtFirstName").val();
    var lastName = $("#txtLastName").val();
    var phoneNumber = unformatText($("#txtPhoneNumber").val());
    var emailId = $("#txtEmail").val();
    var password = $("#txtPassword").val();
    var confirmPassword = $("#txtConfPassword").val();
    var marketsource = $("#ddlMarketSource").val();

    if (phoneNumber.length < 10) {
        alert("Please enter 10 digit mobile number.");
        return;
    }
    var model = {
        UserID: userID,
        FirstName: firstName,
        LastName: lastName,
        Email: emailId,
        Phone: phoneNumber,
        Password: password,
        Marketsource: marketsource
    };

    $.ajax({
        url: '/ApplyNow/SaveUpdateOnlineProspect',
        type: 'post',
        data: JSON.stringify(model),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $("#divLoader").hide();
        }
    });
}
var checkAndDeletePet = function (noofpetdelete) {
    var prospectID = $("#hdnOPId").val();
    var model = {
        ProspectID: prospectID,
        NoOfPet: noofpetdelete
    };
    $("#divLoader").show();
    $.ajax({
        url: "/Tenant/Pet/CheckAndDeletePet/",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            getPetLists();
        }
    });
};

var getProcessingFees = function () {
    return $("#hndProcessingFees").val();
};

var makeid = function (length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var ddlEverBeenEvictedFunction = function () {
    if ($('#ddlEverBeenEvicted').val() == '2') {
        $('#txtEverBeenEvictedDetails').val("");
        $('#txtEverBeenEvictedDetails').removeProp("disabled");
    }
    else if ($('#ddlEverBeenEvicted').val() == '1') {
        $('#txtEverBeenEvictedDetails').val("");
        $('#txtEverBeenEvictedDetails').prop("disabled", "disabled");
    }
};

var ddlEverBeenConvictedFunction = function () {
    if ($('#ddlEverBeenConvicted').val() == '2') {
        $('#txtEverBeenConvictedDetails').val("");
        $('#txtEverBeenConvictedDetails').removeProp("disabled");
    }
    else if ($('#ddlEverBeenConvicted').val() == '1') {
        $('#txtEverBeenConvictedDetails').val("");
        $('#txtEverBeenConvictedDetails').prop("disabled", "disabled");
    }
};

var ddlAnyCriminalChargesFunction = function () {
    if ($('#ddlAnyCriminalCharges').val() == '2') {
        $('#txtAnyCriminalChargesDetails').val("");
        $('#txtAnyCriminalChargesDetails').removeProp("disabled");
    }
    else if ($('#ddlAnyCriminalCharges').val() == '1') {
        $('#txtAnyCriminalChargesDetails').val("");
        $('#txtAnyCriminalChargesDetails').prop("disabled", "disabled");
    }
};

var ddlReferredByAnotherResidentFunction = function () {
    if ($('#ddlReferredByAnotherResident').val() == '2') {
        $('#txtReferredByAnotherResidentName').val("");
        $('#txtReferredByAnotherResidentName').removeProp("disabled");
    }
    else if ($('#ddlReferredByAnotherResident').val() == '1') {
        $('#txtReferredByAnotherResidentName').val("");
        $('#txtReferredByAnotherResidentName').prop("disabled", "disabled");
    }
};


var getPreviousAddressInfo = function (id) {
    $("#divLoaderFullData").show();
    var model = {
        id: id
    };
    $.ajax({
        url: '/ApplyNow/getPreviousAddressInfo',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#SumpriAddCOuntry").text(response.model.CountryString);
            $("#SumPriAddReason").text(response.model.Reason);
            $("#SumPriAddMoveInDateFromTxt").text(response.model.MoveInDateFromTxt);
            $("#SumPriAddMonthlyPayment").text(" $ " + (formatMoney(response.model.MonthlyPayment)));
            $("#SumPriAddAddress").text(response.model.HomeAddress1 + " ," + response.model.HomeAddress1);
            $("#SuApartmentCommunity").text(response.model.ApartmentCommunity);
            $("#SuManagementCompany").text(response.model.ManagementCompany);
            $("#SuManagementCompanyPhone").text(formatPhoneFax((response.model.ManagementCompanyPhone)));
            $("#SuIsProprNoticeLeaseAgreement").text(response.model.stringIsProprNoticeLeaseAgreement);

            $("#divLoaderFullData").hide();
        }
    });
};

var getPreviousEmployementInfo = function (id) {
    $("#divLoaderFullData").show();
    var model = {
        id: id
    };
    $.ajax({
        url: '/ApplyNow/getPreviousEmployementInfo',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#SumPriEmp").text(response.model.EmployerName);
            $("#SumPriJobTi").text(response.model.JobTitle);
            $("#SumPriStatD").text(response.model.StartDateString);
            $("#SumPriTerDate").text(response.model.TerminationDateString);
            $("#SumPriSupervisorName").text(response.model.SupervisorName);
            $("#SumPriAddress").text(response.model.Address1 + " ," + response.model.Address2);
            $("#SumPriAnnualIncome").text("$ " + (formatMoney(response.model.AnnualIncome)));
            $("#SumPriAddAnnualIncome").text("$ " + (formatMoney(response.model.AddAnnualIncome)));
            $("#SumPriSupervisorPhone").text(formatPhoneFax(response.model.SupervisorPhone));
            $("#divLoaderFullData").hide();
        }
    });
};
var printSummary = function () {
    $("#divLoader").show();
    var model = {
        TenantID: $("#hdnOPId").val()
    };
    $.ajax({
        url: '/ApplyNow/PrintApplicationForm',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            $("#ifrmAppSummary").attr("src", response.filename);
            $("#modalApplicationSummary").show();
        }
    });
}

var printQuotationPrintGenerateQuotation = function () {
    $("#divLoader").show();
    var numofveh = 0;
    var noofbed = $("#lblBed").text();
    var additionalParking = $("#hndAdditionalParking").val();
    if (parseInt(additionalParking) > 0) {
        if (parseInt(noofbed) < 3) {
            numofveh = (parseInt(additionalParking) + 1);
        }
        else {
            numofveh = (parseInt(additionalParking) + 2);
        }
    }
    var model = {
        TenantID: $("#hdnOPId").val(),
        QuoteDate: $("#lblFNLQuoteDate").text(),
        ApplicantName: $("#lblFNLResidentName1").text(),
        QuoteExpires: $("#lblFNLQuoteExpires").text(),
        PhoneNumber: $("#lblFNLPhone").text(),
        Email: $("#lblFNLEmail").text(),
        DesiredMoveIn: $("#lblFNLDesiredMoveIn").text(),
        UnitNo: $("#lblFNLUnit").text(),
        ModelName: $("#lblFNLModel").text(),
        LeaseTerm: $("#lblFNLTerm").text(),
        AssignParkingSpace: $("#lblAssginPakingSpace").text(),
        ApplicationFees: $("#lblFNLApplicationFee").text(),
        SecurityDeposit: $("#fdepo").text(),
        GuarantorFees: $("#lblFNLGautantorFee").text(),
        PetNonRefundableFee: $("#fpetd").text(),
        AdministratorFee: $("#lblFNLAdministratorFee").text(),
        PetDNAFee: $("#fpetdna").text(),
        VehicleRegistration: $("#lblVehicleFees").text(),
        MonthlyRent: $("#lblMonthly_MonthlyCharge").text(),
        ProratedMonthlyRent: $("#lblProrated_MonthlyCharge").text(),
        TrashFee: $("#spanTrashRecycle").text(),
        ProratedTrashFee: $("#lblProrated_TrashAmt").text(),
        PestControlFee: $("#spanPestControl").text(),
        ProratedPestControlFee: $("#lblProrated_PestAmt").text(),
        ConvergentBillingFee: $("#spanConvergentAmt").text(),
        ProratedConvergentBillingFee: $("#lblProrated_ConvergentAmt").text(),
        AdditionalParking: $("#lblMonthly_AditionalParking").text(),
        ProratedAdditionalParking: $("#lblProrated_AditionalParking").text(),
        StorageAmount: $("#lblMonthly_Storage").text(),
        ProratedStorageAmount: $("#lblProrated_Storage").text(),
        PetFee: $("#lblMonthly_PetRent").text(),
        ProratedPetFee: $("#lblProrated_PetRent").text(),
        MonthlyCharges: $("#lblMonthly_TotalRent").text(),
        ProratedMonthlyCharges: $("#lblProrated_TotalRent").text(),
        AppCreditFees: $("#hndAppCreditFees").val(),
        AppBackgroundFees: $("#hndAppBackgroundFees").val(),
        NumberOfPet: $("#hndPetPlaceCount").val(),
        NumberOfParking: numofveh,
        DueAtMoveIn: $("#lbtotdueatmov6").text()
    };
    $.ajax({
        url: '/ApplyNow/PrintQuotation',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            $("#ifrmQuotationPrint").attr("src", response.filename);
            $("#modalQuotationPrint").show();
        }
    });
};
var getEncDecValue = function (txtBox, encdec) {
    var encdecval = "";
    if (encdec == 1) {
        encdecval = $(txtBox).attr("data-value");
    } else {
        encdecval = $(txtBox).val();
    }
    if (encdecval) {
        $("#divLoader").show();
        var model = {
            EncDecVal: encdecval,
            EncDec: encdec
        };

        $.ajax({
            url: '/ApplyNow/GetEncDecSSNPassportIDNum',
            type: "post",
            contentType: "application/json utf-8",
            data: JSON.stringify(model),
            dataType: "JSON",
            success: function (response) {
                if (encdec == 1) {
                    $(txtBox).val(response.result);
                } else {
                    $(txtBox).attr("data-value", response.result);
                }
                $("#divLoader").hide();
            }
        });
    }
};

var ddlDocumentTypePersonal = function (id) {
    $('#ddlDocumentTypePersonal').empty();
    var option = '<option value="0">Select</option>';
    option += '<option value="1">Drivers License</option>';
    option += '<option value="2">Military ID</option>';
    option += '<option value="4">State Issued ID</option>';
    $('#divIDState').removeClass("hidden");
    if (id == '0') {
        option += '<option value="3">Passport</option>';
    }
    else {
        $('#divIDState').addClass("hidden");
    }
    $('#ddlDocumentTypePersonal').append(option);
    $('#ddlDocumentTypePersonal').val($("#hndDocumentTypePersonal").val());

    $('#ddlApplicantDocumentTypePersonal').empty();
    var optionNew = '<option value="0">Select</option>';
    optionNew += '<option value="1">Drivers License</option>';
    optionNew += '<option value="2">Military ID</option>';
    optionNew += '<option value="4">State Issued ID</option>';

    $('#ddlApplicantDocumentTypePersonal').append(optionNew);
    $('#ddlApplicantDocumentTypePersonal').val($("#hndDocumentTypePersonal").val());
}



var sortTableStorageGenQuot = function (sortby) {
    var orderby = $('#hndStorageOrderBy').val();

    if (orderby == "ASC") {
        $("#SortIconStorage1Storage").removeClass('fa fa-sort-down');
        $("#SortIconStorage1Storage").removeClass('fa fa-sort-up fa-lg');
        $("#SortIconStorage1Description").removeClass('fa fa-sort-down');
        $("#SortIconStorage1Description").removeClass('fa fa-sort-up fa-lg');
        if (sortby == 'Storage1Storage') {
            $("#SortIconStorage1Storage").addClass('fa fa-sort-up fa-lg');
        }
        if (sortby == 'Storage1Description') {
            $("#SortIconStorage1Description").addClass('fa fa-sort-up fa-lg');
        }
        $('#hndStorageOrderBy').val('DESC');
        fillStorageListGenQuot("ASC", sortby);
    }
    else if (orderby == "DESC") {
        $("#SortIconStorage1Storage").removeClass('fa fa-sort-down');
        $("#SortIconStorage1Storage").removeClass('fa fa-sort-up fa-lg');
        $("#SortIconStorage1Description").removeClass('fa fa-sort-down');
        $("#SortIconStorage1Description").removeClass('fa fa-sort-up fa-lg');
        if (sortby == 'Storage1Storage') {
            $("#SortIconStorage1Storage").addClass('fa fa-sort-down fa-lg');
        }
        if (sortby == 'Storage1Description') {
            $("#SortIconStorage1Description").addClass('fa fa-sort-down fa-lg');
        }
        $('#hndStorageOrderBy').val('ASC');
        fillStorageListGenQuot("DESC", sortby);
    }
};


//New Modifications Amit Partkke

//new code
var btnApplyNowLeaseCurrent = function () {
    //alert('hi');
    $("#divLoader").show();
    //alert($("#hndpriceTableUID").val());
    //alert($("#hndpriceTableLeaseTermId1").val());
    var model = { UID: $("#hndpriceTableUID").val(), LeaseTermID: $("#hndpriceTableLeaseTermId1").val() };
    $.ajax({
        url: "/Property/GetPropertyUnitDetailsByPriceTable",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {

            $("#hndShowPropertyDetails").val(1);
            $("#ModelCompare").modal("hide");
            $("#popUnitDet").addClass("hidden");
            $("#popFloorCoordinate").addClass("hidden");
            $("#lblUnitNo").text("#" + response.model.UnitNo);
            $("#lblUnitTitle").text("#" + response.model.UnitNo);
            $("#lblUnitTitle2").text("#" + response.model.UnitNo);
            $("#lblFNLPreparedFor").text("#" + response.model.UnitNo);
            // $("#parkUnit").text("#" + response.model.UnitNo);
            $("#storUnit").text("#" + response.model.UnitNo);
            $("#txtAvailableDate").val(response.model.AvailableDateText);

            //$("#unitdiv_" + $("#hndUID").val()).removeClass("select-unit");
            //$("#unitdiv_" + $("#hndpriceTableUID").val()).addClass("select-unit");
            $("#hndUID").val($("#hndpriceTableUID").val());

            fillUnitParkingList();
            if ($("#unitdiv_" + $("#hndpriceTableUID").val()).length) {
                $("#unitdiv_" + $("#hndpriceTableUID").val())[0].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

            }

            $("#lblRent").text(formatMoney(response.model.Current_Rent));
            $("#lblArea").text(response.model.Area);
            $("#lblBed").text(response.model.Bedroom);
            $("#lblBath").text(response.model.Bathroom);
            $("#lblHall").text(response.model.Hall);
            $("#lblDeposit").text(formatMoney(response.model.Deposit));
            // $("#lblLease").text(response.model.Leased);

            $("#lblRent22").text("$" + response.model.Current_Rent);
            $("#lblArea22").text(response.model.Area);
            $("#lblBed22").text(response.model.Bedroom);
            $("#lblUnitModel").text("Model: #" + response.model.Building);
            $("#lblBath22").text(response.model.Bathroom);

            $("#lblOccupancy22").text((parseInt(response.model.Bedroom) * 2).toString());
            $("#lblOccupancy").text((parseInt(response.model.Bedroom) * 2).toString());

            $("#lblDeposit22").text("$" + response.model.Deposit);
            $("#imgFloorPlan").attr("src", "/content/assets/img/plan/" + response.model.Building + ".jpg");
            $("#imgFloorPlan1").attr("src", "/content/assets/img/plan/" + response.model.Building + ".jpg");
            $("#imgFloorPlan2").attr("src", "/content/assets/img/plan/" + response.model.Building + "Det.jpg");
            $("#lblUnitNo1").text("Selected : Floor" + response.model.FloorNo + "- Unit " + response.model.UnitNo + "  ($" + response.model.Current_Rent + ")");
            $("#hndUID").val($("#hndpriceTableUID").val());

            $("#txtRooms").val(response.model.Rooms);
            $("#txtBedroom").val(response.model.Bedroom);
            $("#txtBathroom").val(response.model.Bathroom);
            $("#txtHall").val(response.model.Hall);

            $("#txtPetDetails").val(response.model.PetDetails);
            $("#ddlFloorNo").val(response.model.FloorNo);
            $("#txtArea").val(response.model.Area);

            $("#txtCarpet_Color").val(response.model.Carpet_Color);
            $("#txtWall_Paint_Color").val(response.model.Wall_Paint_Color);

            $("#txtOccupancyDate").val(response.model.OccupancyDateText);
            //$("#chkPendingMoveIn").is(":checked") ? "1" : "0";
            $("#txtVacancyLoss_Date").val(response.model.VacancyLoss_DateText);
            $("#txtIntendedMoveIn_Date").val(response.model.IntendedMoveIn_Date);
            $("#txtIntendMoveOutDate").val(response.model.IntendMoveOutDate);
            $("#txtActualMoveInDate").val(response.model.ActualMoveInDateText);

            $("#lbldeposit1").text(formatMoney(parseFloat(response.model.Deposit).toFixed(2)));
            $("#lbdepo6").text(parseFloat(response.model.Deposit).toFixed(2));

            $("#lblFMRent").text(formatMoney(parseFloat(response.model.Current_Rent).toFixed(2)));
            totalAmt = (parseFloat(response.model.Current_Rent) + parseFloat(unformatText($("#lblAdditionalParking").text())) + parseFloat(unformatText($("#lblStorageUnit").text())) + parseFloat(unformatText($("#lblTrashAmt").text())) + parseFloat($("#lblPestAmt").text()) + parseFloat($("#lblConvergentAmt").text()) + parseFloat(unformatText($("#lblPetFee").text()))).toFixed(2);
            $("#lbltotalAmount").text(formatMoney(totalAmt));

            //Amit's Work for final Quotation form 15-10
            $("#lblFNLUnit").text("#" + response.model.UnitNo);
            $("#lblFNLModel").text(response.model.Building);
            $("#lblFNLModel1").text(response.model.Building);
            //$("#lblFNLTerm").text(response.model.Leased);
            $("#lblMonthly_MonthlyCharge").text(formatMoney(response.model.Current_Rent.toFixed(2)));
            $("#lblProrated_MonthlyCharge").text(formatMoney(parseFloat(parseFloat(response.model.Current_Rent) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#lblMonthly_MonthlyCharge1").text(formatMoney(response.model.Current_Rent.toFixed(2)));
            $("#lblProrated_MonthlyCharge1").text(formatMoney(parseFloat(parseFloat(response.model.Current_Rent) / parseFloat(numberOfDays) * remainingday).toFixed(2)));

            $("#lblRFPMonthlyCharges").text(formatMoney(response.model.Current_Rent.toFixed(2)));
            $("#fdepo").text((response.model.Deposit).toFixed(2));
            $("#lbdepo6").text((response.model.Deposit).toFixed(2));

            $("#lblMonthly_TotalRent").text(formatMoney(totalAmt));
            $("#lblProrated_TotalRent").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#lblProratedRent").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#lblProratedRent6").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));

            var rfpMonthlyCharge = unformatText($("#lblRFPMonthlyCharges").text());
            var rfpParkingCharge = $("#lblRFPAdditionalParking").text();
            var rfpStorageCharge = $("#lblRFPStorageUnit").text();
            var rfpPetcharge = $("#lblRFPPetRent").text();

            var rfpTotalRentCharge = parseFloat(rfpMonthlyCharge, 10) + parseFloat(rfpParkingCharge, 10) + parseFloat(rfpStorageCharge, 10) + parseFloat(rfpPetcharge, 10);
            //alert(calTotalRentChargefpetd
            //$("#lblRFPTotalMonthlyPayment").text((parseFloat($("#lblRFPMonthlyCharges").text())) + (parseFloat($("#lblRFPAdditionalParking").text())) + (parseFloat($("#lblRFPStorageUnit").text())) + (parseFloat($("#lblRFPPetRent").text())));

            $("#ftotal").text(formatMoney((parseFloat(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday), 10) + parseFloat(response.model.Deposit, 10) + parseFloat($("#fpetd").text(), 10) + parseFloat($("#lblVehicleFees").text(), 10) + + parseFloat($("#lblPetDNAAmt").text(), 10)).toFixed(2)));

            $("#lbtotdueatmov6").text(formatMoney((parseFloat(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday), 10) + parseFloat(response.model.Deposit, 10) + parseFloat($("#fpetd").text(), 10) + parseFloat($("#lblVehicleFees").text(), 10) + parseFloat($("#lblPetDNAAmt").text(), 10)).toFixed(2)));

            $("#lblRFPTotalMonthlyPayment").text(formatMoney((parseFloat(unformatText($("#lblRFPMonthlyCharges").text()))) + (parseFloat($("#lblRFPAdditionalParking").text())) + (parseFloat($("#lblRFPStorageUnit").text())) + (parseFloat($("#lblRFPPetRent").text())) + (parseFloat($("#lblRFPTrashRecycling").text())) + (parseFloat($("#lblRFPPestControl").text())) + (parseFloat($("#lblRFPConvergentbillingfee").text()))));

            $("#lblProrated_TrashAmt").text(parseFloat(parseFloat($("#lblTrash").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_TrashAmt1").text(parseFloat(parseFloat($("#lblTrash").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_PestAmt").text(parseFloat(parseFloat($("#lblPestControl").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_PestAmt1").text(parseFloat(parseFloat($("#lblPestControl").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_ConvergentAmt").text(parseFloat(parseFloat($("#lblConvergentAmt").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_ConvergentAmt1").text(parseFloat(parseFloat($("#lblConvergentAmt").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));

            $("#lblRent2").text((parseFloat(response.model.Current_Rent)).toFixed(2));
            $("#txtModal").text(response.model.Building);
            $("#lblArea1").text(response.model.Area);
            $("#lblBed1").text(response.model.Bedroom);
            $("#lblBath1").text(response.model.Bathroom);
            $("#lblHall1").text(response.model.Hall);
            $("#lblDeposit1").text(formatMoney(response.model.Deposit));
            //$("#lblLease3").text(response.model.Leased);
            //$("#lblLease4").text(response.model.Leased);
            $("#imgFloorPlanSumm").attr("src", "/content/assets/img/plan/" + response.model.Building + ".jpg");
            $("#lbldeposit2").text(parseFloat(response.model.Deposit).toFixed(2));
            $("#lblFMRent1").text(parseFloat(response.model.Current_Rent).toFixed(2));
            $("#lblUnitTitle3").text("#" + response.model.UnitNo);
            //$("#lblLeaseStartDate").text(response.model.AvailableDateText);
            //$("#lblLeaseStartDate").text($("#hndsummaryDesireMoveIn").val());
            $("#lblSubtotalsumm").text((parseFloat(response.model.Current_Rent) + parseFloat(unformatText($("#lblTrashAmt").text())) + parseFloat(unformatText($("#lblPestAmt").text())) + parseFloat(unformatText($("#lblConvergentAmt").text()))).toFixed(2));
            $("#lbltotalAmountSumm").text((parseFloat(response.model.Current_Rent) + parseFloat(unformatText($("#lblTrashAmt").text())) + parseFloat(unformatText($("#lblPestAmt").text())) + parseFloat(unformatText($("#lblConvergentAmt").text()))).toFixed(2));
            localStorage.setItem("floorfromplan", response.model.FloorNo);
            $("#hndFloorNo").val(response.model.FloorNo);
            $("#hndBedRoom").val(response.model.Bedroom);
            $("#hndBuilding").val(response.model.Building);

            $("#lblMonthly_TotalRentSp").text("$" + (formatMoney(totalAmt)));
            $("#lblAp32").text("#" + response.model.UnitNo);
            $("#lblArea32").text("Sq.Ft. " + response.model.Area);
            $("#lblBed32").text(response.model.Bedroom);
            $("#lblUnitModel3").text(response.model.Building);
            $("#lblBath32").text(response.model.Bathroom);
            $("#lblDeposit3").text("$" + (formatMoney(response.model.Deposit)));

            showFloorPlan(response.model.FloorNo, response.model.Bedroom, response.model.Building);

            //new code for price table
            $('#priceTableUnit').text(response.model.UnitNo);
            $('#priceTableBedroom').text(response.model.Bedroom);
            $('#priceTableBathroom').text(response.model.Bathroom);
            $('#priceTableArea').text(response.model.Area);

            $("#divLoader").hide();
            goToStepQuotation(3, 3, 0);
        }
    });
};
var btnApplyNowLeaseBest = function () {
    $("#divLoader").show();
    var model = { UID: $("#hndpriceTableUID").val(), LeaseTermID: $("#hndpriceTableLeaseTermId2").val() };
    $.ajax({
        url: "/Property/GetPropertyUnitDetailsByPriceTable",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {

            $("#hndShowPropertyDetails").val(1);
            $("#ModelCompare").modal("hide");
            $("#popUnitDet").addClass("hidden");
            $("#popFloorCoordinate").addClass("hidden");
            $("#lblUnitNo").text("#" + response.model.UnitNo);
            $("#lblUnitTitle").text("#" + response.model.UnitNo);
            $("#lblUnitTitle2").text("#" + response.model.UnitNo);
            $("#lblFNLPreparedFor").text("#" + response.model.UnitNo);
            // $("#parkUnit").text("#" + response.model.UnitNo);
            $("#storUnit").text("#" + response.model.UnitNo);
            $("#txtAvailableDate").val(response.model.AvailableDateText);

            //$("#unitdiv_" + $("#hndUID").val()).removeClass("select-unit");
            //$("#unitdiv_" + $("#hndpriceTableUID").val()).addClass("select-unit");
            $("#hndUID").val($("#hndpriceTableUID").val());

            fillUnitParkingList();
            if ($("#unitdiv_" + $("#hndpriceTableUID").val()).length) {
                $("#unitdiv_" + $("#hndpriceTableUID").val())[0].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

            }

            $("#lblRent").text(formatMoney(response.model.Current_Rent));
            $("#lblArea").text(response.model.Area);
            $("#lblBed").text(response.model.Bedroom);
            $("#lblBath").text(response.model.Bathroom);
            $("#lblHall").text(response.model.Hall);
            $("#lblDeposit").text(formatMoney(response.model.Deposit));
            // $("#lblLease").text(response.model.Leased);

            $("#lblRent22").text("$" + response.model.Current_Rent);
            $("#lblArea22").text(response.model.Area);
            $("#lblBed22").text(response.model.Bedroom);
            $("#lblUnitModel").text("Model: #" + response.model.Building);
            $("#lblBath22").text(response.model.Bathroom);

            $("#lblOccupancy22").text((parseInt(response.model.Bedroom) * 2).toString());
            $("#lblOccupancy").text((parseInt(response.model.Bedroom) * 2).toString());

            $("#lblDeposit22").text("$" + response.model.Deposit);
            $("#imgFloorPlan").attr("src", "/content/assets/img/plan/" + response.model.Building + ".jpg");
            $("#imgFloorPlan1").attr("src", "/content/assets/img/plan/" + response.model.Building + ".jpg");
            $("#imgFloorPlan2").attr("src", "/content/assets/img/plan/" + response.model.Building + "Det.jpg");
            $("#lblUnitNo1").text("Selected : Floor" + response.model.FloorNo + "- Unit " + response.model.UnitNo + "  ($" + response.model.Current_Rent + ")");
            $("#hndUID").val($("#hndpriceTableUID").val());

            $("#txtRooms").val(response.model.Rooms);
            $("#txtBedroom").val(response.model.Bedroom);
            $("#txtBathroom").val(response.model.Bathroom);
            $("#txtHall").val(response.model.Hall);

            $("#txtPetDetails").val(response.model.PetDetails);
            $("#ddlFloorNo").val(response.model.FloorNo);
            $("#txtArea").val(response.model.Area);

            $("#txtCarpet_Color").val(response.model.Carpet_Color);
            $("#txtWall_Paint_Color").val(response.model.Wall_Paint_Color);

            $("#txtOccupancyDate").val(response.model.OccupancyDateText);
            //$("#chkPendingMoveIn").is(":checked") ? "1" : "0";
            $("#txtVacancyLoss_Date").val(response.model.VacancyLoss_DateText);
            $("#txtIntendedMoveIn_Date").val(response.model.IntendedMoveIn_Date);
            $("#txtIntendMoveOutDate").val(response.model.IntendMoveOutDate);
            $("#txtActualMoveInDate").val(response.model.ActualMoveInDateText);

            $("#lbldeposit1").text(formatMoney(parseFloat(response.model.Deposit).toFixed(2)));
            $("#lbdepo6").text(parseFloat(response.model.Deposit).toFixed(2));

            $("#lblFMRent").text(formatMoney(parseFloat(response.model.Current_Rent).toFixed(2)));
            totalAmt = (parseFloat(response.model.Current_Rent) + parseFloat(unformatText($("#lblAdditionalParking").text())) + parseFloat(unformatText($("#lblStorageUnit").text())) + parseFloat(unformatText($("#lblTrashAmt").text())) + parseFloat($("#lblPestAmt").text()) + parseFloat($("#lblConvergentAmt").text()) + parseFloat(unformatText($("#lblPetFee").text()))).toFixed(2);
            $("#lbltotalAmount").text(formatMoney(totalAmt));

            //Amit's Work for final Quotation form 15-10
            $("#lblFNLUnit").text("#" + response.model.UnitNo);
            $("#lblFNLModel").text(response.model.Building);
            $("#lblFNLModel1").text(response.model.Building);
            //$("#lblFNLTerm").text(response.model.Leased);
            $("#lblMonthly_MonthlyCharge").text(formatMoney(response.model.Current_Rent.toFixed(2)));
            $("#lblProrated_MonthlyCharge").text(formatMoney(parseFloat(parseFloat(response.model.Current_Rent) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#lblMonthly_MonthlyCharge1").text(formatMoney(response.model.Current_Rent.toFixed(2)));
            $("#lblProrated_MonthlyCharge1").text(formatMoney(parseFloat(parseFloat(response.model.Current_Rent) / parseFloat(numberOfDays) * remainingday).toFixed(2)));

            $("#lblRFPMonthlyCharges").text(formatMoney(response.model.Current_Rent.toFixed(2)));

            $("#fdepo").text((response.model.Deposit).toFixed(2));
            $("#lbdepo6").text((response.model.Deposit).toFixed(2));

            $("#lblMonthly_TotalRent").text(formatMoney(totalAmt));
            $("#lblProrated_TotalRent").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#lblProratedRent").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#lblProratedRent6").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));

            var rfpMonthlyCharge = unformatText($("#lblRFPMonthlyCharges").text());
            var rfpParkingCharge = $("#lblRFPAdditionalParking").text();
            var rfpStorageCharge = $("#lblRFPStorageUnit").text();
            var rfpPetcharge = $("#lblRFPPetRent").text();

            var rfpTotalRentCharge = parseFloat(rfpMonthlyCharge, 10) + parseFloat(rfpParkingCharge, 10) + parseFloat(rfpStorageCharge, 10) + parseFloat(rfpPetcharge, 10);
            //alert(calTotalRentChargefpetd
            //$("#lblRFPTotalMonthlyPayment").text((parseFloat($("#lblRFPMonthlyCharges").text())) + (parseFloat($("#lblRFPAdditionalParking").text())) + (parseFloat($("#lblRFPStorageUnit").text())) + (parseFloat($("#lblRFPPetRent").text())));

            $("#ftotal").text(formatMoney((parseFloat(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday), 10) + parseFloat(response.model.Deposit, 10) + parseFloat($("#fpetd").text(), 10) + parseFloat($("#lblVehicleFees").text(), 10) + + parseFloat($("#lblPetDNAAmt").text(), 10)).toFixed(2)));

            $("#lbtotdueatmov6").text(formatMoney((parseFloat(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday), 10) + parseFloat(response.model.Deposit, 10) + parseFloat($("#fpetd").text(), 10) + parseFloat($("#lblVehicleFees").text(), 10) + parseFloat($("#lblPetDNAAmt").text(), 10)).toFixed(2)));

            $("#lblRFPTotalMonthlyPayment").text(formatMoney((parseFloat(unformatText($("#lblRFPMonthlyCharges").text()))) + (parseFloat($("#lblRFPAdditionalParking").text())) + (parseFloat($("#lblRFPStorageUnit").text())) + (parseFloat($("#lblRFPPetRent").text())) + (parseFloat($("#lblRFPTrashRecycling").text())) + (parseFloat($("#lblRFPPestControl").text())) + (parseFloat($("#lblRFPConvergentbillingfee").text()))));

            $("#lblProrated_TrashAmt").text(parseFloat(parseFloat($("#lblTrash").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_TrashAmt1").text(parseFloat(parseFloat($("#lblTrash").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_PestAmt").text(parseFloat(parseFloat($("#lblPestControl").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_PestAmt1").text(parseFloat(parseFloat($("#lblPestControl").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_ConvergentAmt").text(parseFloat(parseFloat($("#lblConvergentAmt").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_ConvergentAmt1").text(parseFloat(parseFloat($("#lblConvergentAmt").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));

            $("#lblRent2").text((parseFloat(response.model.Current_Rent)).toFixed(2));
            $("#txtModal").text(response.model.Building);
            $("#lblArea1").text(response.model.Area);
            $("#lblBed1").text(response.model.Bedroom);
            $("#lblBath1").text(response.model.Bathroom);
            $("#lblHall1").text(response.model.Hall);
            $("#lblDeposit1").text(formatMoney(response.model.Deposit));
            //$("#lblLease3").text(response.model.Leased);
            //$("#lblLease4").text(response.model.Leased);
            $("#imgFloorPlanSumm").attr("src", "/content/assets/img/plan/" + response.model.Building + ".jpg");
            $("#lbldeposit2").text(parseFloat(response.model.Deposit).toFixed(2));
            $("#lblFMRent1").text(parseFloat(response.model.Current_Rent).toFixed(2));
            $("#lblUnitTitle3").text("#" + response.model.UnitNo);
            //$("#lblLeaseStartDate").text(response.model.AvailableDateText);
            //$("#lblLeaseStartDate").text($("#hndsummaryDesireMoveIn").val());
            $("#lblSubtotalsumm").text((parseFloat(response.model.Current_Rent) + parseFloat(unformatText($("#lblTrashAmt").text())) + parseFloat(unformatText($("#lblPestAmt").text())) + parseFloat(unformatText($("#lblConvergentAmt").text()))).toFixed(2));
            $("#lbltotalAmountSumm").text((parseFloat(response.model.Current_Rent) + parseFloat(unformatText($("#lblTrashAmt").text())) + parseFloat(unformatText($("#lblPestAmt").text())) + parseFloat(unformatText($("#lblConvergentAmt").text()))).toFixed(2));
            localStorage.setItem("floorfromplan", response.model.FloorNo);
            $("#hndFloorNo").val(response.model.FloorNo);
            $("#hndBedRoom").val(response.model.Bedroom);
            $("#hndBuilding").val(response.model.Building);

            $("#lblMonthly_TotalRentSp").text("$" + (formatMoney(totalAmt)));
            $("#lblAp32").text("#" + response.model.UnitNo);
            $("#lblArea32").text("Sq.Ft. " + response.model.Area);
            $("#lblBed32").text(response.model.Bedroom);
            $("#lblUnitModel3").text(response.model.Building);
            $("#lblBath32").text(response.model.Bathroom);
            $("#lblDeposit3").text("$" + (formatMoney(response.model.Deposit)));

            showFloorPlan(response.model.FloorNo, response.model.Bedroom, response.model.Building);

            //new code for price table
            $('#priceTableUnit').text(response.model.UnitNo);
            $('#priceTableBedroom').text(response.model.Bedroom);
            $('#priceTableBathroom').text(response.model.Bathroom);
            $('#priceTableArea').text(response.model.Area);


            $("#divLoader").hide();
            goToStepQuotation(3, 3, 0);
        }
    });
};
var btnApplyNowLeaseGreat = function () {
    $('#hndUID').val($("#hndpriceTableUID").val());
    $("#divLoader").show();
    var model = { UID: $("#hndpriceTableUID").val(), LeaseTermID: $("#hndpriceTableLeaseTermId3").val() };
    $.ajax({
        url: "/Property/GetPropertyUnitDetailsByPriceTable",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {

            $("#hndShowPropertyDetails").val(1);
            $("#ModelCompare").modal("hide");
            $("#popUnitDet").addClass("hidden");
            $("#popFloorCoordinate").addClass("hidden");
            $("#lblUnitNo").text("#" + response.model.UnitNo);
            $("#lblUnitTitle").text("#" + response.model.UnitNo);
            $("#lblUnitTitle2").text("#" + response.model.UnitNo);
            $("#lblFNLPreparedFor").text("#" + response.model.UnitNo);
            // $("#parkUnit").text("#" + response.model.UnitNo);
            $("#storUnit").text("#" + response.model.UnitNo);
            $("#txtAvailableDate").val(response.model.AvailableDateText);

            //$("#unitdiv_" + $("#hndUID").val()).removeClass("select-unit");
            //$("#unitdiv_" + $("#hndpriceTableUID").val()).addClass("select-unit");
            $("#hndUID").val($("#hndpriceTableUID").val());

            fillUnitParkingList();
            if ($("#unitdiv_" + $("#hndpriceTableUID").val()).length) {
                $("#unitdiv_" + $("#hndpriceTableUID").val())[0].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

            }

            $("#lblRent").text(formatMoney(response.model.Current_Rent));
            $("#lblArea").text(response.model.Area);
            $("#lblBed").text(response.model.Bedroom);
            $("#lblBath").text(response.model.Bathroom);
            $("#lblHall").text(response.model.Hall);
            $("#lblDeposit").text(formatMoney(response.model.Deposit));
            // $("#lblLease").text(response.model.Leased);

            $("#lblRent22").text("$" + response.model.Current_Rent);
            $("#lblArea22").text(response.model.Area);
            $("#lblBed22").text(response.model.Bedroom);
            $("#lblUnitModel").text("Model: #" + response.model.Building);
            $("#lblBath22").text(response.model.Bathroom);

            $("#lblOccupancy22").text((parseInt(response.model.Bedroom) * 2).toString());
            $("#lblOccupancy").text((parseInt(response.model.Bedroom) * 2).toString());

            $("#lblDeposit22").text("$" + response.model.Deposit);
            $("#imgFloorPlan").attr("src", "/content/assets/img/plan/" + response.model.Building + ".jpg");
            $("#imgFloorPlan1").attr("src", "/content/assets/img/plan/" + response.model.Building + ".jpg");
            $("#imgFloorPlan2").attr("src", "/content/assets/img/plan/" + response.model.Building + "Det.jpg");
            $("#lblUnitNo1").text("Selected : Floor" + response.model.FloorNo + "- Unit " + response.model.UnitNo + "  ($" + response.model.Current_Rent + ")");
            $("#hndUID").val($("#hndpriceTableUID").val());

            $("#txtRooms").val(response.model.Rooms);
            $("#txtBedroom").val(response.model.Bedroom);
            $("#txtBathroom").val(response.model.Bathroom);
            $("#txtHall").val(response.model.Hall);

            $("#txtPetDetails").val(response.model.PetDetails);
            $("#ddlFloorNo").val(response.model.FloorNo);
            $("#txtArea").val(response.model.Area);

            $("#txtCarpet_Color").val(response.model.Carpet_Color);
            $("#txtWall_Paint_Color").val(response.model.Wall_Paint_Color);

            $("#txtOccupancyDate").val(response.model.OccupancyDateText);
            //$("#chkPendingMoveIn").is(":checked") ? "1" : "0";
            $("#txtVacancyLoss_Date").val(response.model.VacancyLoss_DateText);
            $("#txtIntendedMoveIn_Date").val(response.model.IntendedMoveIn_Date);
            $("#txtIntendMoveOutDate").val(response.model.IntendMoveOutDate);
            $("#txtActualMoveInDate").val(response.model.ActualMoveInDateText);

            $("#lbldeposit1").text(formatMoney(parseFloat(response.model.Deposit).toFixed(2)));
            $("#lbdepo6").text(parseFloat(response.model.Deposit).toFixed(2));

            $("#lblFMRent").text(formatMoney(parseFloat(response.model.Current_Rent).toFixed(2)));
            totalAmt = (parseFloat(response.model.Current_Rent) + parseFloat(unformatText($("#lblAdditionalParking").text())) + parseFloat(unformatText($("#lblStorageUnit").text())) + parseFloat(unformatText($("#lblTrashAmt").text())) + parseFloat($("#lblPestAmt").text()) + parseFloat($("#lblConvergentAmt").text()) + parseFloat(unformatText($("#lblPetFee").text()))).toFixed(2);
            $("#lbltotalAmount").text(formatMoney(totalAmt));

            //Amit's Work for final Quotation form 15-10
            $("#lblFNLUnit").text("#" + response.model.UnitNo);
            $("#lblFNLModel").text(response.model.Building);
            $("#lblFNLModel1").text(response.model.Building);
            //$("#lblFNLTerm").text(response.model.Leased);
            $("#lblMonthly_MonthlyCharge").text(formatMoney(response.model.Current_Rent.toFixed(2)));
            $("#lblProrated_MonthlyCharge").text(formatMoney(parseFloat(parseFloat(response.model.Current_Rent) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#lblMonthly_MonthlyCharge1").text(formatMoney(response.model.Current_Rent.toFixed(2)));
            $("#lblProrated_MonthlyCharge1").text(formatMoney(parseFloat(parseFloat(response.model.Current_Rent) / parseFloat(numberOfDays) * remainingday).toFixed(2)));

            $("#lblRFPMonthlyCharges").text(formatMoney(response.model.Current_Rent.toFixed(2)));

            $("#fdepo").text((response.model.Deposit).toFixed(2));
            $("#lbdepo6").text((response.model.Deposit).toFixed(2));

            $("#lblMonthly_TotalRent").text(formatMoney(totalAmt));
            $("#lblProrated_TotalRent").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#lblProratedRent").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#lblProratedRent6").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));

            var rfpMonthlyCharge = unformatText($("#lblRFPMonthlyCharges").text());
            var rfpParkingCharge = $("#lblRFPAdditionalParking").text();
            var rfpStorageCharge = $("#lblRFPStorageUnit").text();
            var rfpPetcharge = $("#lblRFPPetRent").text();

            var rfpTotalRentCharge = parseFloat(rfpMonthlyCharge, 10) + parseFloat(rfpParkingCharge, 10) + parseFloat(rfpStorageCharge, 10) + parseFloat(rfpPetcharge, 10);
            //alert(calTotalRentChargefpetd
            //$("#lblRFPTotalMonthlyPayment").text((parseFloat($("#lblRFPMonthlyCharges").text())) + (parseFloat($("#lblRFPAdditionalParking").text())) + (parseFloat($("#lblRFPStorageUnit").text())) + (parseFloat($("#lblRFPPetRent").text())));

            $("#ftotal").text(formatMoney((parseFloat(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday), 10) + parseFloat(response.model.Deposit, 10) + parseFloat($("#fpetd").text(), 10) + parseFloat($("#lblVehicleFees").text(), 10) + + parseFloat($("#lblPetDNAAmt").text(), 10)).toFixed(2)));

            $("#lbtotdueatmov6").text(formatMoney((parseFloat(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday), 10) + parseFloat(response.model.Deposit, 10) + parseFloat($("#fpetd").text(), 10) + parseFloat($("#lblVehicleFees").text(), 10) + parseFloat($("#lblPetDNAAmt").text(), 10)).toFixed(2)));

            $("#lblRFPTotalMonthlyPayment").text(formatMoney((parseFloat(unformatText($("#lblRFPMonthlyCharges").text()))) + (parseFloat($("#lblRFPAdditionalParking").text())) + (parseFloat($("#lblRFPStorageUnit").text())) + (parseFloat($("#lblRFPPetRent").text())) + (parseFloat($("#lblRFPTrashRecycling").text())) + (parseFloat($("#lblRFPPestControl").text())) + (parseFloat($("#lblRFPConvergentbillingfee").text()))));

            $("#lblProrated_TrashAmt").text(parseFloat(parseFloat($("#lblTrash").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_TrashAmt1").text(parseFloat(parseFloat($("#lblTrash").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_PestAmt").text(parseFloat(parseFloat($("#lblPestControl").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_PestAmt1").text(parseFloat(parseFloat($("#lblPestControl").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_ConvergentAmt").text(parseFloat(parseFloat($("#lblConvergentAmt").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_ConvergentAmt1").text(parseFloat(parseFloat($("#lblConvergentAmt").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));

            $("#lblRent2").text((parseFloat(response.model.Current_Rent)).toFixed(2));
            $("#txtModal").text(response.model.Building);
            $("#lblArea1").text(response.model.Area);
            $("#lblBed1").text(response.model.Bedroom);
            $("#lblBath1").text(response.model.Bathroom);
            $("#lblHall1").text(response.model.Hall);
            $("#lblDeposit1").text(formatMoney(response.model.Deposit));
            //$("#lblLease3").text(response.model.Leased);
            //$("#lblLease4").text(response.model.Leased);
            $("#imgFloorPlanSumm").attr("src", "/content/assets/img/plan/" + response.model.Building + ".jpg");
            $("#lbldeposit2").text(parseFloat(response.model.Deposit).toFixed(2));
            $("#lblFMRent1").text(parseFloat(response.model.Current_Rent).toFixed(2));
            $("#lblUnitTitle3").text("#" + response.model.UnitNo);
            //$("#lblLeaseStartDate").text(response.model.AvailableDateText);
            //$("#lblLeaseStartDate").text($("#hndsummaryDesireMoveIn").val());
            $("#lblSubtotalsumm").text((parseFloat(response.model.Current_Rent) + parseFloat(unformatText($("#lblTrashAmt").text())) + parseFloat(unformatText($("#lblPestAmt").text())) + parseFloat(unformatText($("#lblConvergentAmt").text()))).toFixed(2));
            $("#lbltotalAmountSumm").text((parseFloat(response.model.Current_Rent) + parseFloat(unformatText($("#lblTrashAmt").text())) + parseFloat(unformatText($("#lblPestAmt").text())) + parseFloat(unformatText($("#lblConvergentAmt").text()))).toFixed(2));
            localStorage.setItem("floorfromplan", response.model.FloorNo);
            $("#hndFloorNo").val(response.model.FloorNo);
            $("#hndBedRoom").val(response.model.Bedroom);
            $("#hndBuilding").val(response.model.Building);

            $("#lblMonthly_TotalRentSp").text("$" + (formatMoney(totalAmt)));
            $("#lblAp32").text("#" + response.model.UnitNo);
            $("#lblArea32").text("Sq.Ft. " + response.model.Area);
            $("#lblBed32").text(response.model.Bedroom);
            $("#lblUnitModel3").text(response.model.Building);
            $("#lblBath32").text(response.model.Bathroom);
            $("#lblDeposit3").text("$" + (formatMoney(response.model.Deposit)));

            showFloorPlan(response.model.FloorNo, response.model.Bedroom, response.model.Building);

            //new code for price table
            $('#priceTableUnit').text(response.model.UnitNo);
            $('#priceTableBedroom').text(response.model.Bedroom);
            $('#priceTableBathroom').text(response.model.Bathroom);
            $('#priceTableArea').text(response.model.Area);


            $("#divLoader").hide();
            goToStepQuotation(3, 3, 0);
        }
    });
};


var showPriceTable = function (uid) {

    $("#hndUID").val(uid);
    getPropertyUnitDetails(uid)
    $('#divPriceTable').removeClass('hidden');
    $('#divSelectUnit').addClass('hidden');
};

var showMonthlyCharges = function (uid) {
    getPropertyUnitDetails(uid)
    $('#popMonthlyCharges').modal('show');
};
var goToSelectUnit = function () {
    $('#divPriceTable').addClass('hidden');
    $('#divSelectUnit').removeClass('hidden');
    $("#hndOldUID").val($("#hndUID").val());
};
var goToPriceTable = function () {
    $('#divPriceTable').removeClass('hidden');
    $('#divSelectUnit').addClass('hidden');
};

var getPropertyUnitListQuotation = function (modelname, filldata) {

    $('#hndBuilding').val(modelname);
    getPropertyFloarListRebindQuotation(modelname, filldata);
    $("#imgFloorCoordinate").attr("src", "");
    $("#imgFloorCoordinateDiv").empty();
    $('#popUnitPlan').empty();

    $('#divPriceTable').addClass('hidden');
    $('#divSelectUnit').removeClass('hidden');
    $("#hndIsModelSelected").val(1);
    $("#imgFloorPlan").attr("src", "/content/assets/img/plan/" + modelname + ".jpg");
    $("#imgFloorPlan2").attr("src", "/content/assets/img/plan/" + modelname + "Det.jpg");
    $("#imgFloorPlanNew1").attr("src", "/content/assets/img/plan/" + modelname + ".jpg");

    $("#ModelCompare").modal("hide");
    $("#lblUnitNo").text("");

    $("#lblUnitNo").text("Model: #" + modelname);
    $("#divLoader").show();
    var maxrent = 0;
    if ($("#txtMaxRent").val() == "0") {
    }
    else {
        maxrent = $("#txtMaxRent").val();
    }

    var bedroom = 0;
    if (!$("#ddlRoom").val()) {
        bedroom = 0;
    }
    else {
        bedroom = $("#ddlRoom").val();
    }
    var availdate = $("#txtDate_Quotation").val();
    var leasetermid = $("#hndLeaseTermID").val();

    var prospectid = $("#hdnOPId").val();

    var model = { ModelName: modelname, AvailableDate: availdate, Current_Rent: maxrent, Bedroom: bedroom, LeaseTermID: leasetermid, ProspectId: prospectid };

    $.ajax({
        url: "/Property/GetPropertyModelUnitList/",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            if (response != null) {
                $("#listUnit>tbody").empty();
                $("#listUnitNew>tbody").empty();
                $.each(response.model, function (elementType, value) {
                    if (elementType == 0) {
                        html = " <tr class='select-unit' id='unitdiv_" + value.UID + "' data-floorid = '" + value.FloorNoText + "'><td><a href='javascript:void(0);' onclick='getPropertyUnitDetails(" + value.UID + ")'><h5 style='width: 80px;'>#" + value.UnitNo + " </h5></a> </td><td style='text-align: center;width=100px'>$" + formatMoney(value.Current_Rent) + "</td><td style='text-align: center; width:45%'>" + value.Premium + "</td><td style='text-align: center;width=100px'>" + value.AvailableDateText + "</td></tr>";
                        htmlNew = " <tr class='select-unit' id='unitdiv_" + value.UID + "' data-floorid = '" + value.FloorNoText + "'><td class='unit'><a href='javascript:void(0);' onclick='getPropertyUnitDetails(" + value.UID + ")'><h5 style='width: 80px;'>#" + value.UnitNo + " </h5></a> </td><td class='price'>$" + formatMoney(value.Current_Rent) + "</td><td class='available'>" + value.AvailableDateText + "</td><td class='charges'><a href ='javascript:void(0);' class='genric-btn success' onclick='showPriceTable(" + value.UID + ")'> Apply</a><a href='javascript:void(0);' class='genric-btn success' onclick='showMonthlyCharges(" + value.UID + ")'>Monthly Charges</a></td ></tr>";
                    } else {
                        html = " <tr id='unitdiv_" + value.UID + "' data-floorid = '" + value.FloorNoText + "'><td><a href='javascript:void(0);' onclick='getPropertyUnitDetails(" + value.UID + ")'><h5 style='width: 80px;'>#" + value.UnitNo + " </h5></a> </td><td style='text-align: center;width=100px'>$" + formatMoney(value.Current_Rent) + "</td><td style='text-align: center; width:45%'>" + value.Premium + "</td><td style='text-align: center;width=100px'>" + value.AvailableDateText + "</td></tr>";
                        htmlNew = " <tr id='unitdiv_" + value.UID + "' data-floorid = '" + value.FloorNoText + "'><td class='unit'><a href='javascript:void(0);' onclick='getPropertyUnitDetails(" + value.UID + ")'><h5 style='width: 80px;'>#" + value.UnitNo + " </h5></a> </td><td class='price'>$" + formatMoney(value.Current_Rent) + "</td><td class='available'>" + value.AvailableDateText + "</td><td class='charges'><a href ='javascript:void(0);' class='genric-btn success' onclick='showPriceTable(" + value.UID + ")'> Apply</a><a href='javascript:void(0);' class='genric-btn success' onclick='showMonthlyCharges(" + value.UID + ")'>Monthly Charges</a></td ></tr>";
                    }
                    $("#listUnit>tbody").append(html);
                    $("#listUnitNew>tbody").append(htmlNew);
                    $("#lblArea22").text(value.Area);
                    $("#lblBed22").text(value.Bedroom);
                    $("#lblBath22").text(value.Bathroom);
                    $("#lblArea331").text(value.Area);
                    $("#lblBed331").text(value.Bedroom);
                    $("#lblBath331").text(value.Bathroom);
                    $("#lblRent331").text((value.Current_Rent).toFixed(2));
                    $("#lblOccupancy22").text((parseInt(value.Bedroom) * 2).toString());
                    $("#lblfloorPlan1").text(modelname);
                });
            }
            goToStepQuotation(2, 2, 0);
        }
    });
}

var getPropertyModelUnitListQuotation = function () {
    addModelArrayQuotation = [];
    noofcomapreQuotation = 0;
    $("#divCompare").addClass("hidden");
    $("#divMainSearch").removeClass("hidden");
    $("#divLoader").show();

    var maxrent = 0;
    var sortorder = $("#ddlSortOrder").val();
    if ($("#txtMaxRent").val() == "0") {
        //maxrent = "10000";
    }
    else {
        maxrent = $("#txtMaxRent").val();
    }

    var bedroom = 0;
    if (!$("#ddlRoom").val()) {
        bedroom = 0;
    }
    else {
        bedroom = $("#ddlRoom").val();
    }
    var availdate = $("#txtDate_Quotation").val();

    var furnished = $("#ddlFurnishedUnit").val();

    var model = { PID: 8, AvailableDate: availdate, Current_Rent: maxrent, Bedroom: bedroom, SortOrder: sortorder, Furnished: furnished };
    $.ajax({
        url: "/Property/GetPropertyModelList/",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            if (response != null) {
                $("#listModelUnitQuotation").empty();
                $.each(response.model, function (elementType, value) {
                    var html = "<div class='col-xl-5 col-md-6 col-lg-5' id='modeldiv" + value.Building + "'><div class='single_property'><div class='row'><div class='col-md-6 col-sm-6'><div class='property_thumb'>";
                    html += "<img src='/content/assets/img/plan/" + value.FloorPlan + "' style='height:250px'; alt=''></div></div>";
                    html += "<div class='col-md-6 col-sm-6'><div class='property_content'><div class='main_pro'><h3>Floor Plan " + value.Building + "</h3> ";
                    html += "<div class='mark_pro'><p>" + value.Bedroom + " Bed | " + value.Bathroom + "Bath</p><p> " + value.Area + " Sq Ft</p><p>Starting at </p><p>" + value.RentRange + "  / month</p></div>";
                    html += "<div class='button'><button class='btn' style='margin-top: -19px;margin-bottom: -48px;'  onclick='getPropertyUnitListQuotation(\"" + value.Building + "\")'><a href='javascript:void(0);' class='genric-btn available'>" + value.NoAvailable + " Available</a></button><br><p><div class='input-group' style='width:100%;margin-top: 25px;' id='chkComp" + value.Building + "'><div style='width:15%;float:left' ><input  style='cursor: pointer;' type='checkbox' onclick='addToCompareQuotation(\"" + value.Building + "\")' id='btnCompare" + value.Building + "'/></div> <div style='width:85%;float:left;text-align: left;'>Compare</div> </div></p></div>";
                    html += "</div></div></div></div></div></div>";

                    //var html = "<div class='col-sm-4 col-md-4 p0' id='modeldiv" + value.Building + "'><div class='box-two proerty-item'>";
                    ////html += " <div class='item-entry overflow'><h5><a href='javascript:void(0);' onclick=getPropertyUnitList(\"" + value.Building + "\")'>" + value.Building + "</a><div class='checkbox pull-right' style='margin-top: -2px;'><label>/*<input type='checkbox' id='chkCompareid" + value.Building + "' class='hidden form-control' style='margin-left: -25px; margin-top: -15px;'>*/<i class='fa fa-check' aria-hidden='true'></i></label></div></h5>  <div class='dot-hr'></div>";
                    //html += " <div class='item-entry overflow'><h5><a style='color:black' href='javascript:void(0);' onclick=getPropertyUnitList(\"" + value.Building + "\",\"\")'>" + value.Building + "</a><div class='checkbox pull-right' style='margin-top: -2px;'><label id='chkCompareid" + value.Building + "' class='hidden' ><i class='fa fa-check' aria-hidden='true'style='color: #4d738a;'></i></label></div></h5>  <div class='dot-hr'></div>";
                    //html += "<div class='item-thumb'><a href = '#' onclick='getPropertyUnitList(\"" + value.Building + "\")'> <img src='/content/assets/img/plan/" + value.FloorPlan + "' style='height:250px';></a></div> ";
                    //html += "<div class='property-icon'><center>" + value.Bedroom + " Bed | " + value.Bathroom + "Bath ";
                    //html += "| " + value.Area + "Sq Ft <br/><center><span class='proerty-price'>" + value.RentRange + " </span></center></center> ";
                    //html += "</br><button class='btn-success' onclick='getPropertyUnitList(\"" + value.Building + "\")' style='width: 100%;'>Available (" + value.NoAvailable + ")</button> <center><u style=''><a onclick='addToCompareQuotation(\"" + value.Building + "\")'  href='javascript:void(0);'  id='btnCompare" + value.Building + "' class='custome-item-entry'>Compare</a><a onclick='removeToCompareQuotation(\"" + value.Building + "\")'  id='btncompRemove" + value.Building + "'  href='javascript:void(0);' class='hidden'>Remove</a></u></center>";
                    //html += "</div></div></div></div>";
                    $("#listModelUnitQuotation").append(html);

                });
            }
        }
    });
}

var getPropertyUnitDetails = function (uid) {
    $("#listUnitNew tr").removeClass("select-unit");
    //$("#unitdiv_" + $("#hndOldUID").val()).removeClass("select-unit");
    $("#divLoader").show();
    var model = { UID: uid, LeaseTermID: $("#hndLeaseTermID").val() };
    $.ajax({
        url: "/Property/GetPropertyUnitDetails/",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            //new code for price table
            $('#priceTableUnit').text(response.model.UnitNo);
            $('#priceTableBedroom').text(response.model.Bedroom);
            $('#priceTableBathroom').text(response.model.Bathroom);
            $('#priceTableArea').text(response.model.Area);

            //for current
            $('#priceTableRent1').text(parseFloat(response.model.PriceTableRentCurrent).toFixed(2));
            $('#priceTableLeaseTerm1').text(response.model.PriceTableLeaseTermCurrent);
            $('#hndpriceTableLeaseTermId1').val(response.model.PriceTableLeaseTermIDCurrent);

            //for best
            $('#priceTableRent2').text(parseFloat(response.model.PriceTableRentBest).toFixed(2));
            $('#priceTableLeaseTerm2').text(response.model.PriceTableLeaseTermBest);
            $('#hndpriceTableLeaseTermId2').val(response.model.PriceTableLeaseTermIDBest);

            //for great
            $('#priceTableRent3').text(parseFloat(response.model.PriceTableRentGreat).toFixed(2));
            $('#priceTableLeaseTerm3').text(response.model.PriceTableLeaseTermGreat);
            $('#hndpriceTableLeaseTermId3').val(response.model.PriceTableLeaseTermIDGreat);

            //alert(response.model.PriceTableUID)
            $('#hndpriceTableUID').val(response.model.PriceTableUID);

            $("#priceTableDate").val($('#txtDate_Quotation').val());
            $("#priceTableMoveInDate1").text($('#txtDate_Quotation').val());
            $("#priceTableMoveInDate2").text($('#txtDate_Quotation').val());
            $("#priceTableMoveInDate3").text($('#txtDate_Quotation').val());

            //for new pop up
            $("#popMonthlyChargesFloorPlan").attr("src", "/content/assets/img/plan/" + response.model.Building + ".jpg");
            $('#popMonthlyChargesModel').text(response.model.Building);
            $('#popMonthlyChargesUnit').text(response.model.UnitNo);
            $('#popMonthlyChargesLeaseTerm').text(response.model.PriceTableLeaseTermCurrent);
            $('#popMonthlyChargesDesMoveIn').text($('#txtDate_Quotation').val());
            $('#popMonthlyChargesBedrooms').text(response.model.Bedroom);
            $('#popMonthlyChargesBathrooms').text(response.model.Bathroom);
            $('#popMonthlyChargesArea').text(response.model.Area);
            $('#popMonthlyChargesOccupancy').text((parseInt(response.model.Bedroom) * 2).toString());
            $('#popMonthlyChargesDeposit').text("$" + formatMoney(parseFloat(response.model.Deposit).toFixed(2)));

            var popMCBRent = parseFloat(response.model.Current_Rent).toFixed(2);
            $('#popMonthlyChargesBaseRent').text("$" + formatMoney((parseFloat(response.model.Current_Rent)).toFixed(2)));
            var popMCPremium = response.model.Premium;
            $('#popMonthlyChargesPremium').text("$" + formatMoney(response.model.Premium));
            var popMCPromotion = 0;
            $('#popMonthlyChargesPropmotion').text("$" + formatMoney(0));
            var popMonthlyChargessubtotals1 = parseFloat((parseFloat(popMCBRent) + parseFloat(popMCPremium) + parseFloat(popMCPromotion))).toFixed(2);
            $('#popMonthlyChargesSubtotal1').text("$" + formatMoney(popMonthlyChargessubtotals1));

            var popMCPControl = response.model.PestAmt;
            $('#popMonthlyChargesPestControl').text("$" + formatMoney(response.model.PestAmt));
            var popMCTRecycle = response.model.TrashAmt;
            $('#popMonthlyChargesTrashRecycle').text("$" + formatMoney(response.model.TrashAmt));
            var popMCCBilling = response.model.ConvergentAmt;
            $('#popMonthlyChargesConvergentBilling').text("$" + formatMoney(response.model.ConvergentAmt));
            var popMonthlyChargessubtotals2 = parseFloat((parseFloat(popMCPControl) + parseFloat(popMCTRecycle) + parseFloat(popMCCBilling))).toFixed(2);
            $('#popMonthlyChargesSubtotal2').text("$" + formatMoney(popMonthlyChargessubtotals2));
            var popMonthlyChargesTotal = parseFloat(parseFloat(popMonthlyChargessubtotals1) + parseFloat(popMonthlyChargessubtotals2)).toFixed(2);
            $('#popMonthlyChargesTotalMonthlyCharges').text("$" + formatMoney(popMonthlyChargesTotal));

            $("#hndShowPropertyDetails").val(1);
            $("#ModelCompare").modal("hide");
            $("#popUnitDet").addClass("hidden");
            $("#popFloorCoordinate").addClass("hidden");
            $("#lblUnitNo").text("#" + response.model.UnitNo);
            $("#lblUnitTitle").text("#" + response.model.UnitNo);
            $("#lblUnitTitle2").text("#" + response.model.UnitNo);
            $("#lblFNLPreparedFor").text("#" + response.model.UnitNo);
            // $("#parkUnit").text("#" + response.model.UnitNo);
            $("#storUnit").text("#" + response.model.UnitNo);
            $("#txtAvailableDate").val(response.model.AvailableDateText);



            $("#unitdiv_" + uid).addClass("select-unit");
            $("#hndUID").val(uid);

            fillUnitParkingList();
            if ($("#unitdiv_" + uid).length) {
                $("#unitdiv_" + uid)[0].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

            }

            $("#lblRent").text(formatMoney(response.model.Current_Rent));
            $("#lblArea").text(response.model.Area);
            $("#lblBed").text(response.model.Bedroom);
            $("#lblBath").text(response.model.Bathroom);
            $("#lblHall").text(response.model.Hall);
            $("#lblDeposit").text(formatMoney(response.model.Deposit));
            // $("#lblLease").text(response.model.Leased);

            $("#lblRent22").text("$" + response.model.Current_Rent);
            $("#lblArea22").text(response.model.Area);
            $("#lblBed22").text(response.model.Bedroom);
            $("#lblUnitModel").text("Model: #" + response.model.Building);
            $("#lblBath22").text(response.model.Bathroom);

            $("#lblOccupancy22").text((parseInt(response.model.Bedroom) * 2).toString());
            $("#lblOccupancy").text((parseInt(response.model.Bedroom) * 2).toString());

            $("#lblDeposit22").text("$" + response.model.Deposit);
            //$("#lblLease22").text(response.model.Leased);

            //$("#lblLease2").text(response.model.Leased);
            // $("#lblDeposit").text(response.model.Rent);
            $("#imgFloorPlan").attr("src", "/content/assets/img/plan/" + response.model.Building + ".jpg");
            $("#imgFloorPlan1").attr("src", "/content/assets/img/plan/" + response.model.Building + ".jpg");
            $("#imgFloorPlan2").attr("src", "/content/assets/img/plan/" + response.model.Building + "Det.jpg");
            $("#lblUnitNo1").text("Selected : Floor" + response.model.FloorNo + "- Unit " + response.model.UnitNo + "  ($" + response.model.Current_Rent + ")");
            $("#hndUID").val(uid);

            $("#txtRooms").val(response.model.Rooms);
            $("#txtBedroom").val(response.model.Bedroom);
            $("#txtBathroom").val(response.model.Bathroom);
            $("#txtHall").val(response.model.Hall);

            $("#txtPetDetails").val(response.model.PetDetails);
            $("#ddlFloorNo").val(response.model.FloorNo);
            $("#txtArea").val(response.model.Area);

            $("#txtCarpet_Color").val(response.model.Carpet_Color);
            $("#txtWall_Paint_Color").val(response.model.Wall_Paint_Color);

            $("#txtOccupancyDate").val(response.model.OccupancyDateText);
            //$("#chkPendingMoveIn").is(":checked") ? "1" : "0";
            $("#txtVacancyLoss_Date").val(response.model.VacancyLoss_DateText);
            $("#txtIntendedMoveIn_Date").val(response.model.IntendedMoveIn_Date);
            $("#txtIntendMoveOutDate").val(response.model.IntendMoveOutDate);
            $("#txtActualMoveInDate").val(response.model.ActualMoveInDateText);

            $("#lbldeposit1").text(formatMoney(parseFloat(response.model.Deposit).toFixed(2)));
            $("#lbdepo6").text(parseFloat(response.model.Deposit).toFixed(2));

            $("#lblFMRent").text(formatMoney(parseFloat(response.model.Current_Rent).toFixed(2)));

            //if (response.model.Furnished == 0) {
            //    $("#chkFurnished").css("text-decoration", "line-through");
            //    $("#chkFurnished").css("text-decoration-color", "red");
            //}
            //if (response.model.Washer == 0) {
            //    $("#chkWasher").css("text-decoration", "line-through");
            //    $("#chkWasher").css("text-decoration-color", "red");
            //}
            //if (response.model.Refrigerator == 0) {
            //    $("#chkRefrigerator").css("text-decoration", "line-through");
            //    $("#chkRefrigerator").css("text-decoration-color", "red");
            //}
            //if (response.model.Drapes == 0) {
            //    $("#chkDrapes").css("text-decoration", "line-through");
            //    $("#chkDrapes").css("text-decoration-color", "red");
            //}
            //if (response.model.Dryer == 0) {
            //    $("#chkDryer").css("text-decoration", "line-through");
            //    $("#chkDryer").css("text-decoration-color", "red");
            //}
            //if (response.model.Dishwasher == 0) {
            //    $("#chkDishwasher").css("text-decoration", "line-through");
            //    $("#chkDishwasher").css("text-decoration-color", "red");
            //}
            //if (response.model.Disposal == 0) {
            //    $("#chkDisposal").css("text-decoration", "line-through");
            //    $("#chkDisposal").css("text-decoration-color", "red");
            //}
            //if (response.model.Elec_Range == 0) {
            //    $("#chkElec_Range").css("text-decoration", "line-through");
            //    $("#chkElec_Range").css("text-decoration-color", "red");
            //}
            //if (response.model.Gas_Range == 0) {
            //    $("#chkGas_Range").css("text-decoration", "line-through");
            //    $("#chkGas_Range").css("text-decoration-color", "red");
            //}
            //if (response.model.Air_Conditioning == 0) {
            //    $("#chkAir_Conditioning").css("text-decoration", "line-through");
            //    $("#chkAir_Conditioning").css("text-decoration-color", "red");
            //}
            //if (response.model.Fireplace == 0) {
            //    $("#chkFireplace").css("text-decoration", "line-through");
            //    $("#chkFireplace").css("text-decoration-color", "red");
            //}
            //if (response.model.Den == 0) {
            //    $("#chkDen").css("text-decoration", "line-through");
            //    $("#chkDen").css("text-decoration-color", "red");
            //}
            //if (response.model.Carpet == 0) {
            //    $("#chkCarpet").css("text-decoration", "line-through");
            //    $("#chkCarpet").css("text-decoration-color", "red");
            //}

            totalAmt = (parseFloat(response.model.Current_Rent) + parseFloat(unformatText($("#lblAdditionalParking").text())) + parseFloat(unformatText($("#lblStorageUnit").text())) + parseFloat(unformatText($("#lblTrashAmt").text())) + parseFloat($("#lblPestAmt").text()) + parseFloat($("#lblConvergentAmt").text()) + parseFloat(unformatText($("#lblPetFee").text()))).toFixed(2);
            $("#lbltotalAmount").text(formatMoney(totalAmt));

            //Amit's Work for final Quotation form 15-10
            $("#lblFNLUnit").text("#" + response.model.UnitNo);
            $("#lblFNLModel").text(response.model.Building);
            $("#lblFNLModel1").text(response.model.Building);
            //$("#lblFNLTerm").text(response.model.Leased);
            $("#lblMonthly_MonthlyCharge").text(formatMoney(response.model.Current_Rent.toFixed(2)));
            $("#lblProrated_MonthlyCharge").text(formatMoney(parseFloat(parseFloat(response.model.Current_Rent) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#lblMonthly_MonthlyCharge1").text(formatMoney(response.model.Current_Rent.toFixed(2)));
            $("#lblProrated_MonthlyCharge1").text(formatMoney(parseFloat(parseFloat(response.model.Current_Rent) / parseFloat(numberOfDays) * remainingday).toFixed(2)));

            $("#lblRFPMonthlyCharges").text(formatMoney(response.model.Current_Rent.toFixed(2)));

            $("#fdepo").text((response.model.Deposit).toFixed(2));
            $("#lbdepo6").text((response.model.Deposit).toFixed(2));

            $("#lblMonthly_TotalRent").text(formatMoney(totalAmt));
            $("#lblProrated_TotalRent").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#lblProratedRent").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#lblProratedRent6").text(formatMoney(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday).toFixed(2)));

            var rfpMonthlyCharge = unformatText($("#lblRFPMonthlyCharges").text());
            var rfpParkingCharge = $("#lblRFPAdditionalParking").text();
            var rfpStorageCharge = $("#lblRFPStorageUnit").text();
            var rfpPetcharge = $("#lblRFPPetRent").text();

            var rfpTotalRentCharge = parseFloat(rfpMonthlyCharge, 10) + parseFloat(rfpParkingCharge, 10) + parseFloat(rfpStorageCharge, 10) + parseFloat(rfpPetcharge, 10);
            //alert(calTotalRentChargefpetd
            //$("#lblRFPTotalMonthlyPayment").text((parseFloat($("#lblRFPMonthlyCharges").text())) + (parseFloat($("#lblRFPAdditionalParking").text())) + (parseFloat($("#lblRFPStorageUnit").text())) + (parseFloat($("#lblRFPPetRent").text())));

            $("#ftotal").text(formatMoney((parseFloat(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday), 10) + parseFloat(response.model.Deposit, 10) + parseFloat($("#fpetd").text(), 10) + parseFloat($("#lblVehicleFees").text(), 10) + + parseFloat($("#lblPetDNAAmt").text(), 10)).toFixed(2)));

            $("#lbtotdueatmov6").text(formatMoney((parseFloat(parseFloat(parseFloat(totalAmt) / parseFloat(numberOfDays) * remainingday), 10) + parseFloat(response.model.Deposit, 10) + parseFloat($("#fpetd").text(), 10) + parseFloat($("#lblVehicleFees").text(), 10) + parseFloat($("#lblPetDNAAmt").text(), 10)).toFixed(2)));

            $("#lblRFPTotalMonthlyPayment").text(formatMoney((parseFloat(unformatText($("#lblRFPMonthlyCharges").text()))) + (parseFloat($("#lblRFPAdditionalParking").text())) + (parseFloat($("#lblRFPStorageUnit").text())) + (parseFloat($("#lblRFPPetRent").text())) + (parseFloat($("#lblRFPTrashRecycling").text())) + (parseFloat($("#lblRFPPestControl").text())) + (parseFloat($("#lblRFPConvergentbillingfee").text()))));

            $("#lblProrated_TrashAmt").text(parseFloat(parseFloat($("#lblTrash").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_TrashAmt1").text(parseFloat(parseFloat($("#lblTrash").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_PestAmt").text(parseFloat(parseFloat($("#lblPestControl").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_PestAmt1").text(parseFloat(parseFloat($("#lblPestControl").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_ConvergentAmt").text(parseFloat(parseFloat($("#lblConvergentAmt").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));
            $("#lblProrated_ConvergentAmt1").text(parseFloat(parseFloat($("#lblConvergentAmt").text()) / parseFloat(numberOfDays) * remainingday).toFixed(2));

            $("#lblRent2").text((parseFloat(response.model.Current_Rent)).toFixed(2));
            $("#txtModal").text(response.model.Building);
            $("#lblArea1").text(response.model.Area);
            $("#lblBed1").text(response.model.Bedroom);
            $("#lblBath1").text(response.model.Bathroom);
            $("#lblHall1").text(response.model.Hall);
            $("#lblDeposit1").text(formatMoney(response.model.Deposit));
            //$("#lblLease3").text(response.model.Leased);
            //$("#lblLease4").text(response.model.Leased);
            $("#imgFloorPlanSumm").attr("src", "/content/assets/img/plan/" + response.model.Building + ".jpg");
            $("#lbldeposit2").text(parseFloat(response.model.Deposit).toFixed(2));
            $("#lblFMRent1").text(parseFloat(response.model.Current_Rent).toFixed(2));
            $("#lblUnitTitle3").text("#" + response.model.UnitNo);
            //$("#lblLeaseStartDate").text(response.model.AvailableDateText);
            //$("#lblLeaseStartDate").text($("#hndsummaryDesireMoveIn").val());
            $("#lblSubtotalsumm").text((parseFloat(response.model.Current_Rent) + parseFloat(unformatText($("#lblTrashAmt").text())) + parseFloat(unformatText($("#lblPestAmt").text())) + parseFloat(unformatText($("#lblConvergentAmt").text()))).toFixed(2));
            $("#lbltotalAmountSumm").text((parseFloat(response.model.Current_Rent) + parseFloat(unformatText($("#lblTrashAmt").text())) + parseFloat(unformatText($("#lblPestAmt").text())) + parseFloat(unformatText($("#lblConvergentAmt").text()))).toFixed(2));
            localStorage.setItem("floorfromplan", response.model.FloorNo);
            $("#hndFloorNo").val(response.model.FloorNo);
            $("#hndBedRoom").val(response.model.Bedroom);
            $("#hndBuilding").val(response.model.Building);

            $("#lblMonthly_TotalRentSp").text("$" + (formatMoney(totalAmt)));
            $("#lblAp32").text("#" + response.model.UnitNo);
            $("#lblArea32").text("Sq.Ft. " + response.model.Area);
            $("#lblBed32").text(response.model.Bedroom);
            $("#lblUnitModel3").text(response.model.Building);
            $("#lblBath32").text(response.model.Bathroom);
            $("#lblDeposit3").text("$" + (formatMoney(response.model.Deposit)));

            showFloorPlan(response.model.FloorNo, response.model.Bedroom, response.model.Building);



            $("#divLoader").hide();
        }
    });
}

function showFloorPlan(flid, numbedroom, modelname) {
    $("#divLoaderFloorData").show();
    setTimeout(function () { $("#returnButton").removeClass("hidden"); $("#returnButton").html("Return to List View"); }, 1000);
    $("#UnitListDesc").text("Choose any unit in green to see more information including a video and complete layout of your unit. ");
    var bedroom = 0;
    if (!$("#ddlRoom").val()) {
        bedroom = 0;
    }
    else {
        bedroom = $("#ddlRoom").val();
    }
    if (bedroom != numbedroom) {
        bedroom = numbedroom;
    }

    var maxrent = 0;
    if ($("#txtMaxRent").val() == "0") {
        maxrent = "10000";
    }
    else {
        maxrent = $("#txtMaxRent").val();
    }
    var availdate = $("#txtDate_Quotation").val();
    var leaseterm = $("#hndLeaseTermID").val();
    var prospectid = $("#hdnOPId").val();
    var model = { FloorID: flid, AvailableDate: availdate, Bedroom: bedroom, MaxRent: maxrent, LeaseTermID: leaseterm, ModelName: modelname, ProspectId: prospectid };
    $.ajax({
        url: "/Property/GetPropertyFloorDetails/",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {

            $("#popUnitPlan").empty();
            $("#popFloorCoordinate").removeClass("hidden");
            $("#popUnitDet").addClass("hidden");
            $("#popPromotion").addClass("hidden");
            $("#divUdet").addClass("hidden");
            // var html = "<h3 style='color: #4d738a; text-align:center;'>Selected : Floor " + response.model.FloorNo + "</h3>";
            var html = "";
            //html += "<div class='col-sm-12' style='background:#fff;text-align:center!important;'><span style='background-color:#006400;width:10px;height:10px'>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style='color:#4d738a;'>&nbsp;&nbsp;Available</span>&nbsp;&nbsp;<span style='background-color:#ffff00;width:10px;height:10px'>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style='color:#4d738a;'>&nbsp;&nbsp;Other Options</span>&nbsp;&nbsp;<span style='background-color:#FF0000;width:10px;height:10px'>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style='color:#4d738a;'>&nbsp;&nbsp;Unavailable</span></div><br/><br/>";

            html += "<img src ='/content/assets/img/plan/" + response.model.FloorPlan + "' id='imgFloorCoordinate' class='' usemap='#unitimg'>";
            html += "<map name='unitimg' id='imgFloorCoordinateDiv'>";
            //console.log(JSON.stringify(response.model.lstUnitFloor));
            $.each(response.model.lstUnitFloor, function (elementType, value) {
                if (value.IsAvail == 1) {
                    html += "<area shape='poly' id='unId_" + value.UID + "' class='tooltips UAarea' coords='" + value.Coordinates + "' href='javascript:void(0);' onclick='getPropertyUnitDetails(" + value.UID + ")'>";
                    //html += "<span class='tooltip-text' style='display: none'>" + value.UnitNo + "</span>";
                    //html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'><span>Unit No: " + value.UnitNo + "<br/>" + value.Bedroom + " bd / " + value.Bathroom + " ba</span><span> Available: Yes</span></div>";
                    //html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'><span>" + value.UnitNo + "<br/> Model: #" + value.ModelName + "<br/>" + value.Bedroom + " bd / " + value.Bathroom + " ba<br/> Price: $" + formatMoney(value.Current_Rent) + "</span><span> Available: Yes</span></div>";
                    html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'>" +
                        "<span><img src='/content/assets/img/plan/" + value.ModelName + ".png' id='imgModel_" + value.UID + "' class='img-responsive' /></span><hr>" +
                        "<span class='labelDivTool'>" + value.UnitNo + "</span><br />" +
                        "<span> Model: #" + value.ModelName + "</span><br />" +
                        "<span>" + value.Bedroom + " Bed / " + value.Bathroom + " Bath </span><br />" +
                        "<span>" + value.LeasedTerms + " Months</span><br />" +
                        "<span> Price: $" + formatMoney(value.Current_Rent) + "</span><br />" +
                        "<span> Available: " + value.AvailableDateText + "</span><br /></div>";

                } else if (value.IsAvail == 2) {

                    html += "<area shape='poly' id='unId_" + value.UID + "' class='tooltips UYarea' coords='" + value.Coordinates + "' href='javascript:void(0);' onclick='getPropertyUnitDetails(" + value.UID + ")' >";
                    // html += "<span class='tooltip-text' style='display: none'>" + value.UnitNo + "</span>";
                    //html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'><span>Unit No: " + value.UnitNo + "<br/>" + value.Bedroom + " bd / " + value.Bathroom + " ba</span><span> Available: Other</span></div>";
                    // html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'><span>" + value.UnitNo + "<br/> Model: #" + value.ModelName + "<br/>" + value.Bedroom + " bd / " + value.Bathroom + " ba<br/> Price: $" + formatMoney(value.Current_Rent) + "</span><span> Available: Other</span></div>";
                    html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'>" +
                        "<span><img src='/content/assets/img/plan/" + value.ModelName + ".png' id='imgModel_" + value.UID + "' class='img-responsive' /></span><hr>" +
                        "<span class='labelDivTool'>" + value.UnitNo + "</span><br />" +
                        "<span> Model: #" + value.ModelName + "</span><br />" +
                        "<span>" + value.Bedroom + " Bed / " + value.Bathroom + " Bath </span><br />" +
                        "<span>" + value.LeasedTerms + " Months</span><br />" +
                        "<span> Price: $" + formatMoney(value.Current_Rent) + "</span><br />" +
                        "<span> Available: Other Option</span><br /></div>";
                } else {
                    html += "<area shape='poly' id='unId_" + value.UID + "' class='tooltips Uarea' coords='" + value.Coordinates + "' >";
                    //html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'><span>Unit No: " + value.UnitNo + "<br/>" + value.Bedroom + " bd / " + value.Bathroom + " ba</span><span> Available: No</span></div>";
                    //html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'><span>" + value.UnitNo + "<br/> Model: #" + value.ModelName + "<br/>" + value.Bedroom + " bd / " + value.Bathroom + " ba<br/> Price: $" + formatMoney(value.Current_Rent) + "</span><span> Available: No</span></div>";
                    html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'>" +
                        "<span><img src='/content/assets/img/plan/" + value.ModelName + ".png' id='imgModel_" + value.UID + "' class='img-responsive' /></span><hr>" +
                        "<span class='labelDivTool'>" + value.UnitNo + "</span><br />" +
                        "<span> Model: #" + value.ModelName + "</span><br />" +
                        "<span>" + value.Bedroom + " Bed / " + value.Bathroom + " Bath </span><br />" +
                        "<span>" + value.LeasedTerms + " Months</span><br />" +
                        "<span> Price: $" + formatMoney(value.Current_Rent) + "</span><br />" +
                        "<span> Available: Unavailable</span><br /></div>";

                }

                if (value.UID == $("#hndUID").val()) {
                    html += "<area shape='poly' id='unId_" + value.UID + "' class='tooltips UUUarea' coords='" + value.Coordinates + "' href='javascript:void(0);' onclick='getPropertyUnitDetails(" + value.UID + ")' >";
                    html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'><span>" + value.UnitNo + "<br/> Model: #" + value.ModelName + "<br/>" + value.Bedroom + " bd / " + value.Bathroom + " ba<br/> Price: $" + formatMoney(value.Current_Rent) + "</span><span> Available: Yes</span></div>";
                }
            });
            html += "</map><br/>";
            $("#popUnitPlan").append(html);
            $("#imgFloorCoordinate").maphilight();

            $('.Uarea').addClass('active_unavil').data('maphilight', { alwaysOn: true, fillColor: 'ff0000', strokeColor: 'ff0000', }).trigger('alwaysOn.maphilight');
            $('.UAarea').addClass('active_unavil').data('maphilight', { alwaysOn: true, fillColor: '006400', strokeColor: '006400', }).trigger('alwaysOn.maphilight');
            $('.UYarea').addClass('active_unavil').data('maphilight', { alwaysOn: true, fillColor: 'ffff00', strokeColor: 'ffff00', }).trigger('alwaysOn.maphilight');
            $('.UUUarea').addClass('active_unavil').data('maphilight', { alwaysOn: true, fillColor: '324a59', strokeColor: '324a59', fillOpacity: 0.9 }).trigger('alwaysOn.maphilight');

            $(".tooltips").mouseout(function () { $(".divtooltipUnit").addClass("hidden"); });
            $(".tooltips").mouseover(function (e) {
                var offset = $(this).offset();
                var X = (e.pageX - offset.left);
                var Y = (e.pageY - offset.top);
                X = X - 25;//X = X - 25;//X = X - 30
                if (Y < 0) {
                    Y = Y + 200; // Y = Y + 615;//Y = Y + 525
                }
                else {
                    Y = Y - 180; // Y = Y + 390;//Y = Y + 300
                }

                console.log("Floor X : " + X + " Floor Y :" + Y);

                var thisId = $(this).attr('id');
                var divID = thisId.split("_");
                $(".divtooltipUnit").addClass("hidden");
                $("#floorunId_" + divID[1]).removeClass("hidden");
                $("#floorunId_" + divID[1]).css({ top: Y, left: X, position: 'absolute' });
            });
            $("#divLoaderFloorData").hide();
        }
    });
}

function getPropertyUnitListByFloor(flid) {

    $("#imgFloorCoordinate").attr("src", "");
    $("#imgFloorCoordinateDiv").empty();
    $('#popUnitPlan').empty();

    $("#divLoader").show();
    var bedroom = 0;
    if (!$("#ddlRoom").val()) {
        bedroom = 0;
    }
    else {
        bedroom = $("#ddlRoom").val();
    }
    var maxrent = 0;
    if ($("#txtMaxRent").val() == "0") {
        maxrent = "10000";
    }
    else {
        maxrent = $("#txtMaxRent").val();
    }
    var availdate = $("#txtDate_Quotation").val();
    var leaseterm = $("#hndLeaseTermID").val();

    var prospectid = $("#hdnOPId").val();

    var model = { FloorID: flid, AvailableDate: availdate, Bedroom: bedroom, MaxRent: maxrent, LeaseTermID: leaseterm, ProspectId: prospectid };
    $.ajax({
        url: "/Property/GetPropertyFloorDetails/",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            $("#popUnitPlan").empty();
            $("#popFloorCoordinate").removeClass("hidden");
            $("#popUnitDet").addClass("hidden");
            $("#popPromotion").addClass("hidden");
            $("#divUdet").addClass("hidden");

            //var html = "<h3 style='color: #4d738a; text-align:center;'>Selected : Floor " + response.model.FloorNo + "</h3>";

            var html = "";
            // html += "<div class='col-sm-12' style='background:#fff;text-align:center!important;'><span style='background-color:#006400;width:10px;height:10px'>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style='color:#4d738a;'>&nbsp;&nbsp;Available</span>&nbsp;&nbsp;<span style='background-color:#ffff00;width:10px;height:10px'>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style='color:#4d738a;'>&nbsp;&nbsp;Other Options</span>&nbsp;&nbsp;<span style='background-color:#FF0000;width:10px;height:10px'>&nbsp;&nbsp;&nbsp;&nbsp;</span><span style='color:#4d738a;'>&nbsp;&nbsp;Unavailable</span></div><br/><br/>";
            //<div class='col-sm-4'><div style='background-color: #fa6500; width: 10px; height: 10px'></div><span>Not Available</span></div> <div class='col-sm-4'><div style='background-color:red;width:10px;height:10px'></div > <span>Available</span></div>
            html += "<img src ='/content/assets/img/plan/" + response.model.FloorPlan + "' id='imgFloorCoordinate' class='' usemap='#unitimg'>";
            html += "<map name='unitimg' id='imgFloorCoordinateDiv'>";
            $("#listUnit>tbody").empty();
            $.each(response.model.lstUnitFloor, function (elementType, value) {
                if (value.IsAvail == 1) {
                    html += "<area shape='poly' id='unId_" + value.UID + "' class='tooltips UAarea' coords='" + value.Coordinates + "' href='javascript:void(0);' onclick='getPropertyUnitDetails(" + value.UID + ")'>";
                    //html += "<span class='tooltip-text' style='display: none'>" + value.UnitNo + "</span>";
                    //html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'><span>Unit No: " + value.UnitNo + "<br/>" + value.Bedroom + " bd / " + value.Bathroom + " ba</span><span> Available: Yes</span></div>";
                    // html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'><span>" + value.UnitNo + "<br/> Model: #" + value.ModelName + "<br/>" + value.Bedroom + " bd / " + value.Bathroom + " ba<br/> Price: $" + formatMoney(value.Current_Rent) + "</span><span> Available: Yes</span></div>";
                    html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'>" +
                        "<span><img src='/content/assets/img/plan/" + value.ModelName + ".png' id='imgModel_" + value.UID + "' class='img-responsive' /></span><hr>" +
                        "<span class='labelDivTool'>" + value.UnitNo + "</span><br />" +
                        "<span> Model: #" + value.ModelName + "</span><br />" +
                        "<span>" + value.Bedroom + " Bed / " + value.Bathroom + " Bath </span><br />" +
                        "<span>" + value.LeasedTerms + " Months</span><br />" +
                        "<span> Price: $" + formatMoney(value.Current_Rent) + "</span><br />" +
                        "<span> Available: " + value.AvailableDateText + "</span><br /></div>";
                } else if (value.IsAvail == 2) {

                    html += "<area shape='poly' id='unId_" + value.UID + "' class='tooltips UYarea' coords='" + value.Coordinates + "' href='javascript:void(0);' onclick='getPropertyUnitDetails(" + value.UID + ")' >";
                    // html += "<span class='tooltip-text' style='display: none'>" + value.UnitNo + "</span>";
                    //html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'><span>Unit No: " + value.UnitNo + "<br/>" + value.Bedroom + " bd / " + value.Bathroom + " ba</span><span> Available: Other</span></div>";
                    // html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'><span>" + value.UnitNo + "<br/> Model: #" + value.ModelName + "<br/>" + value.Bedroom + " bd / " + value.Bathroom + " ba<br/> Price: $" + formatMoney(value.Current_Rent) + "</span><span> Available: Other</span></div>";
                    html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'>" +
                        "<span><img src='/content/assets/img/plan/" + value.ModelName + ".png' id='imgModel_" + value.UID + "' class='img-responsive' /></span><hr>" +
                        "<span class='labelDivTool'>" + value.UnitNo + "</span><br />" +
                        "<span> Model: #" + value.ModelName + "</span><br />" +
                        "<span>" + value.Bedroom + " Bed / " + value.Bathroom + " Bath </span><br />" +
                        "<span>" + value.LeasedTerms + " Months</span><br />" +
                        "<span> Price: $" + formatMoney(value.Current_Rent) + "</span><br />" +
                        "<span> Available: Other Option</span><br /></div>";
                } else {
                    html += "<area shape='poly' id='unId_" + value.UID + "' class='tooltips Uarea' coords='" + value.Coordinates + "' >";
                    //html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'><span>Unit No: " + value.UnitNo + "<br/>" + value.Bedroom + " bd / " + value.Bathroom + " ba</span><span> Available: No</span></div>";
                    //html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'><span>" + value.UnitNo + "<br/> Model: #" + value.ModelName + "<br/>" + value.Bedroom + " bd / " + value.Bathroom + " ba<br/> Price: $" + formatMoney(value.Current_Rent) + "</span><span> Available: No</span></div>";
                    html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'>" +
                        "<span><img src='/content/assets/img/plan/" + value.ModelName + ".png' id='imgModel_" + value.UID + "' class='img-responsive' /></span><hr>" +
                        "<span class='labelDivTool'>" + value.UnitNo + "</span><br />" +
                        "<span> Model: #" + value.ModelName + "</span><br />" +
                        "<span>" + value.Bedroom + " Bed / " + value.Bathroom + " Bath </span><br />" +
                        "<span>" + value.LeasedTerms + " Months</span><br />" +
                        "<span> Price: $" + formatMoney(value.Current_Rent) + "</span><br />" +
                        "<span> Available: Unavailable</span><br /></div>";

                }

                if (value.UID == $("#hndUID").val()) {
                    html += "<area shape='poly' id='unId_" + value.UID + "' class='tooltips UUUarea' coords='" + value.Coordinates + "' href='javascript:void(0);' onclick='getPropertyUnitDetails(" + value.UID + ")' >";
                    html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'><span>" + value.UnitNo + "<br/> Model: #" + value.ModelName + "<br/>" + value.Bedroom + " bd / " + value.Bathroom + " ba<br/> Price: $" + formatMoney(value.Current_Rent) + "</span><span> Available: Yes</span></div>";
                    //html += "<span class='tooltip-text' style='display: none'>" + value.UnitNo + "</span>";
                    //html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'><span>Unit No: " + value.UnitNo + "<br/>" + value.Bedroom + " bd / " + value.Bathroom + " ba</span><span> Available: Yes</span></div>";
                    //html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'><span>" + value.UnitNo + "<br/> Model: #" + value.ModelName + "<br/>" + value.Bedroom + " bd / " + value.Bathroom + " ba<br/> Price: $" + formatMoney(value.Current_Rent) + "</span><span> Available: Yes</span></div>";
                    html += "<div id='floorunId_" + value.UID + "' class='hidden divtooltipUnit'>" +
                        "<span><img src='/content/assets/img/plan/" + value.ModelName + ".png' id='imgModel_" + value.UID + "' class='img-responsive' /></span><hr>" +
                        "<span class='labelDivTool'>" + value.UnitNo + "</span><br />" +
                        "<span> Model: #" + value.ModelName + "</span><br />" +
                        "<span>" + value.Bedroom + " Bed / " + value.Bathroom + " Bath </span><br />" +
                        "<span>" + value.LeasedTerms + " Months</span><br />" +
                        "<span> Price: $" + formatMoney(value.Current_Rent) + "</span><br />" +
                        "<span> Available: " + value.AvailableDateText + "</span><br /></div>";
                }
                if (value.IsAvail != 0) {
                    var ulhtml = " <tr id='unitdiv_" + value.UID + "' data-floorid = '" + value.FloorNoText + "'><td><a href='javascript:void(0);' onclick='getPropertyUnitDetails(" + value.UID + ")'><h5 style='width: 80px;'>#" + value.UnitNo + " </h5></a> </td><td style='text-align: center;width=100px'>$" + formatMoney(value.Current_Rent) + "</td><td style='text-align: center;width=80px'>" + value.Premium + "</td><td style='text-align: center;width=100px'>" + value.AvailableDateText + "</td></tr>";
                    $("#listUnit>tbody").append(ulhtml);
                }
            });
            html += "</map><br/>";
            $("#popUnitPlan").append(html);
            $("#imgFloorCoordinate").maphilight();

            $('.Uarea').addClass('active_unavil').data('maphilight', { alwaysOn: true, fillColor: 'FF0000', strokeColor: 'FF0000', }).trigger('alwaysOn.maphilight');
            $('.UAarea').addClass('active_unavil').data('maphilight', { alwaysOn: true, fillColor: '006400', strokeColor: '006400', }).trigger('alwaysOn.maphilight');
            $('.UYarea').addClass('active_unavil').data('maphilight', { alwaysOn: true, fillColor: 'ffff00', strokeColor: 'ffff00', }).trigger('alwaysOn.maphilight');
            $('.UUUarea').addClass('active_unavil').data('maphilight', { alwaysOn: true, fillColor: '324a59', strokeColor: '324a59', fillOpacity: 0.9 }).trigger('alwaysOn.maphilight');
            $(".tooltips").mouseout(function () { $(".divtooltipUnit").addClass("hidden"); });
            $(".tooltips").mouseover(function (e) {
                //var offset = $(this).offset();
                //var X = (e.pageX - offset.left);
                //var Y = (e.pageY - offset.top);
                //X = X - 30;
                //if (Y < 0) {
                //    Y = Y + 525;
                //}
                //else {
                //    Y = Y + 300;
                //}
                //var thisId = $(this).attr('id');
                //var divID = thisId.split("_");
                //$(".divtooltipUnit").addClass("hidden");
                //$("#floorunId_" + divID[1]).removeClass("hidden");
                //$("#floorunId_" + divID[1]).css({ top: Y, left: X, position: 'absolute' });

                var offset = $(this).offset();
                var X = (e.pageX - offset.left);
                var Y = (e.pageY - offset.top);
                X = X - 25;//X = X - 25;//X = X - 30
                if (Y < 0) {
                    Y = Y + 200; // Y = Y + 615;//Y = Y + 525
                }
                else {
                    Y = Y - 180; // Y = Y + 390;//Y = Y + 300
                }
                console.log("Unit X : " + X + " Unit Y :" + Y);
                var thisId = $(this).attr('id');
                var divID = thisId.split("_");
                $(".divtooltipUnit").addClass("hidden");
                $("#floorunId_" + divID[1]).removeClass("hidden");
                $("#floorunId_" + divID[1]).css({ top: Y, left: X, position: 'absolute' });
            });


        }
    });

}

var checkEmailAreadyExist = function () {
    var model = { EmailId: $('#txtEmail').val() };
    $("#divLoader").show();
    $.ajax({
        url: "/ApplyNow/CheckEmailAreadyExist",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.model == "Yes Tenant") {
                $.alert({
                    title: "",
                    content: "This email Id is already exist please press Yes to Sign In.",
                    type: 'blue',
                    buttons: {
                        yes: {
                            text: 'Yes',
                            action: function (yes) {
                                localStorage.setItem("userName", $('#txtEmail').val());
                                $('#txtEmail').val('');
                                window.location.replace("/Account/Login");
                                $('#UserEmail').val(localStorage.getItem("userName"));
                                $('#UserPassword').focus();
                            }
                        },
                        no: {
                            text: 'No',
                            action: function (no) {
                                $('#txtEmail').val('');
                                $('#txtEmail').focus();
                            }
                        }
                    }
                });
            }
            else if (response.model == "Yes But Not Tenant") {
                $.alert({
                    title: "",
                    content: "This email Id is already exist please press Yes to Login.",
                    type: 'blue',
                    buttons: {
                        yes: {
                            text: 'Yes',
                            action: function (yes) {
                                var modals = document.getElementById("popSignIn");
                                modals.style.display = "block";
                                $('#UserEmail').val($('#txtEmail').val());
                                $('#txtEmail').val('');
                                $('#UserPassword').focus();
                            }
                        },
                        no: {
                            text: 'No',
                            action: function (no) {
                                $('#txtEmail').val('');
                                $('#txtEmail').focus();
                            }
                        }
                    }
                });
            }
        }
    });
    $("#divLoader").hide();
}

var SaveOnlineProspectQuotation = function () {
    $("#divLoader").show();
    var msg = "";
    var propertyId = $("#hndUID").val();
    var onlineProspectId = $("#hdnOPId").val();
    var firstName = $("#txtFirstName").val();
    var lastName = $("#txtLastName").val();
    var middleInitial = $("#txtMiddleInitialReg").val();

    var gender = $("#ddlGenderReg").val();
    var otherGender = $("#txtOtherGenderReg").val();

    var phoneNumber = unformatText($("#txtPhoneNumber").val());
    var emailId = $("#txtEmail").val();

    var ssnNumber = "";
    var ssncheck = "";


    var idType = "0";
    var idState = "0";
    var idNumber = "";

    var country = "1";
    var homeAddress1 = "";
    var homeAddress2 = "";
    var stateHome = "";
    var cityHome = "";
    var zipHome = "";

    var marketsource = $("#ddlMarketSource").val();

    var password = $("#txtPassword").val();
    var confirmPassword = $("#txtConfPassword").val();

    var address = $("#txtAddress").val();
    var dob = $("#txtDOB").val();
    var annualIncome = $("#txtAnnualIncome").val();
    var addiAnnualIncome = $("#txtAddiAnnualIncome").val();

    var moveInDate = $("#txtDate_Quotation").val();
    var isAgree = $("#chkAgreeTerms").is(":checked") ? "1" : "0";
    var leaseterm = $("#hndLeaseTermID").val();

    if (!firstName) {
        msg += "Please fill the First Name </br>";
    }
    if (!lastName) {
        msg += "Please fill the  Last Name </br>";
    }

    if (!gender || gender == "0") {
        msg += "Please Select The Gender </br>";
    }
    else if (gender == "3") {
        if (!otherGender) {
            msg += "Please Fill The Other Gender </br>";
        }
    }
    if (!phoneNumber) {
        msg += "Please fill Mobile Number </br>";
    }
    else {
        if (phoneNumber.length < 10) {
            msg += "Please enter 10 digit mobile number </br>";
        }
    }
    if (!emailId) {
        msg += "Please fill the Email </br>";
    } else {
        if (!validateEmail($("#txtEmail").val())) {
            msg += "Please fill Valid Email </br>";
        }
    }

    //if (!password) {
    //    msg += "Please fill the Password </br>";
    //} else {

    //    var result = checkStrength($("#txtPassword").val());
    //    if (!result) {
    //        return;
    //    }

    //    if (password != confirmPassword) {
    //        msg += "Password and Confirm Password must be the same</br>";
    //    }
    //}

    if (msg != "") {
        $.alert({
            title: "",
            content: msg,
            type: 'red'
        });
        $("#divLoader").hide();
        return;
    }

    var model = {
        ID: onlineProspectId,
        PropertyId: propertyId,
        FirstName: firstName,
        MiddleInitial: middleInitial,
        LastName: lastName,
        Email: emailId,
        Phone: phoneNumber,
        Address: address,
        Password: "password",
        DateofBirth: dob,
        AnnualIncome: annualIncome,
        AddiAnnualIncome: addiAnnualIncome,
        Marketsource: marketsource,
        MoveInDate: moveInDate,
        LeaseTerm: leaseterm,

        DocumentType: idType,
        DocumentState: idState,
        DocumentIDNumber: idNumber,
        SSN: ssnNumber,
        Country: country,
        HomeAddress1: homeAddress1,
        HomeAddress2: homeAddress2,
        StateHome: stateHome,
        CityHome: cityHome,
        ZipHome: zipHome,

        Gender: gender,
        OtherGender: otherGender
    };

    $.ajax({
        url: '/GenerateQuotation/SaveOnlineProspectGeneratrQuote',
        type: 'post',
        data: JSON.stringify(model),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $("#divLoader").hide();
            var idmsg = response.msg.split('|');
            if (idmsg[0] != 0) {
                $("#hdnOPId").val(idmsg[0]);
                $("#lblQuoteID").text("#" + idmsg[0]);
                //getTenantOnlineList(idmsg[0]);
                getTenantOnlineListGenerateQuotation(idmsg[0]);
                getApplyNowList(idmsg[0]);
                
                getApplicantListsQuotation(idmsg[0]);
                $("#divstep3save").addClass("hidden");
                $("#divstep3").removeClass("hidden");
                $("#hdnStepCompleted").val(4);
                window.location = "/Admin/GenerateQuotation/Index/" + idmsg[2];
            } else {
                $("#hdnStepCompleted").val(2);
                $("#hdnOPId").val(0);
                $("#hndUID").val(0);
                showCurrentStepQuotation(2, 2);
                var floorNoSearch = $("#hndFloorNo").val();
                var bedRoomSearch = $("#hndBedRoom").val();
                var buildingSearch = $("#hndBuilding").val();
                var ubitIdSearch = 0;

                if (ubitIdSearch != 0 && buildingSearch != "" && floorNoSearch > 0) {
                    showFloorPlan(floorNoSearch, bedRoomSearch, buildingSearch);
                }
                getPropertyUnitListQuotation(buildingSearch);
                $("#popUnitPlan").empty();
                $.alert({
                    title: "",
                    content: idmsg[1],
                    type: 'red'
                });
            }
        }
    });
}

var getApplyNowList = function (id) {
    $("#divLoader").show();
    var model = {
        id: id
    }
    $.ajax({
        url: '/ApplyNow/GetApplyNowList',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            $("#txtBVFirstName").val(response.model.FirstName);
            $("#txtBVLastName").val(response.model.LastName);
            $("#txtBVPhone").val(response.model.Phone);
            $("#txtBVEmail").val(response.model.Email);
            $("#txtBVAddress").val(response.model.Address);
        }
    });
}

var getTenantOnlineList = function (id) {
    $("#divLoaderFullData").show();
    var model = {
        id: id
    };
    $.ajax({
        url: '/ApplyNow/GetTenantOnlineList',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            ////for floor plan
            
            //$("#imgFloorPlanNew").attr("src", "/content/assets/img/plan/" + response.model.FloorPlanImageUnit + ".jpg");
            //$("#lblfloorPlan").text(response.model.FloorPlanImageUnit);
            //$("#lblBed33").text(response.model.FloorPlanBedUnit);
            //$("#lblBath33").text(response.model.FloorPlanBathUnit);
            //$("#lblArea33").text(response.model.FloorPlanAreaUnit);
            //$("#lblRent33").text(response.model.FloorPlanStartPriceUnit);

            $("#ddlIsInter").val(response.model.IsInternational).change();
            $("#hndDocumentTypePersonal").val(response.model.IDType);
            $("#ddlCountryOfOrigin").val(response.model.CountryOfOrigin);
            $("#ddlEverBeenEvicted").val(response.model.Evicted).change();
            $("#ddlEverBeenConvicted").val(response.model.ConvictedFelony).change();
            $("#ddlAnyCriminalCharges").val(response.model.CriminalChargPen).change();
            $("#txtEverBeenEvictedDetails").val(response.model.EvictedDetails);
            $("#txtEverBeenConvictedDetails").val(response.model.ConvictedFelonyDetails);
            $("#txtAnyCriminalChargesDetails").val(response.model.CriminalChargPenDetails);

            $("#ddlDoYouSmoke").val(response.model.DoYouSmoke);
            $("#ddlReferredByAnotherResident").val(response.model.ReferredResident).change();
            $("#ddlBrokerOrMerchantReff").val(response.model.ReferredBrokerMerchant);
            $("#txtReferredByAnotherResidentName").val(response.model.ReferredResidentName);

            $("#txtApartmentCommunity").val(response.model.ApartmentCommunity);
            $("#txtManagementCompany").val(response.model.ManagementCompany);
            $("#txtManagementCompanyPhone").val(formatPhoneFax(response.model.ManagementCompanyPhone));
            $("#ddlProperNoticeLeaseAgreement").val(response.model.IsProprNoticeLeaseAgreement);
            if (response.model.IsInternational == 1) {
                $("#SCountryOfOriginStringtext").text(response.model.CountryOfOriginString);
                $("#SumPass").removeClass('hidden');
                $("#summPassportNumber").text(response.model.PassportNumber);
                $("#summCountryIssuance").text(response.model.CountryIssuance);
            } else {
                $("#SumPass").addClass('hidden');
                $("#summSSNp").text(response.model.SSN);
                $("#summDriverLp").text(response.model.IDNumber);
            }
            $("#UScitzen").text(response.model.IsInternational == 1 ? "No" : "Yes");
            $("#suACuminty").text(response.model.ApartmentCommunity);
            $("#sumAManagementCompany").text(response.model.ManagementCompany);
            $("#sumAManagementCompanyPhone").text(formatPhoneFax(response.model.ManagementCompanyPhone));

            $("#sumAIsProprNoticeLeaseAgreement").text(response.model.stringIsProprNoticeLeaseAgreement);
            $("#sumAQStringEvicted").text(response.model.StringEvicted);
            $("#AQStringEvicted").text(response.model.StringEvicted);
            $("#AQStringCriminalChargPen").text(response.model.StringCriminalChargPen);
            $("#AQStringDoYouSmoke").text(response.model.StringDoYouSmoke);
            $("#AQStringReferredResident").text(response.model.StringReferredResident);
            $("#AQStringReferredBrokerMerchant").text(response.model.StringReferredBrokerMerchant);
            $("#AQStringConvictedFelony").text(response.model.StringConvictedFelony);

            $("#AQEvictedDetails").text(response.model.EvictedDetails);
            $("#AQConvictedFelonyDetails").text(response.model.ConvictedFelonyDetails);
            $("#AQCriminalChargPenDetails").text(response.model.CriminalChargPenDetails);
            $("#AQReferredResidentName").text(response.model.ReferredResidentName);

            $("#summCredateF").text(response.model.MoveInDateFromTxt);
            $("#summCRE").text(response.model.HomeAddress1 + " , " + response.model.HomeAddress2);
            $("#summECountry").text(response.model.CityHome);
            $("#summECountry").text(response.model.StateHomeString);
            $("#summECountry").text(response.model.ZipHome);
            $("#summreCou").text(response.model.CountryString);
            $("#summMrent").text("$ " + formatMoney(response.model.MonthlyPayment));
            $("#summReson").text(response.model.Reason);

            $("#summECountry").text(response.model.CountryString);
            $("#summEmployerName").text(response.model.EmployerName);
            $("#summOfficeAdd").text(response.model.OfficeAddress1);
            $("#summOfficeC").text(response.model.OfficeCity);
            $("#summJobTitle").text(response.model.JobTitle);
            $("#summAdditionalI").text("$ " + formatMoney(response.model.AdditionalIncome));
            $("#summSalaryp").text("$ " + formatMoney(response.model.Income));
            $("#summSupNa").text(response.model.SupervisorName);
            $("#summSupMob").text(formatPhoneFax(response.model.SupervisorPhone));
            $("#summEAddre1").text(response.model.OfficeAddress1 + ", " + response.model.OfficeAddress2);
            $("#summEmerN").text(response.model.EmergencyFirstName + "  " + response.model.EmergencyLastName);
            $("#summEmerRela").text(response.model.Relationship);
            $("#summEmerMob").text(formatPhoneFax(response.model.EmergencyMobile));
            $("#summEmerCountry").text(response.model.EmergencyCountryString);
            $("#summEmerAddd").text(response.model.EmergencyAddress1 + "  " + response.model.EmergencyAddress2);

            $("#txtFirstNamePersonal").val(response.model.FirstName);
            $("#txtMiddleInitial").val(response.model.MiddleInitial);
            $("#txtMiddleInitialReg").val(response.model.MiddleInitial);
            $("#txtLastNamePersonal").val(response.model.LastName);

            $("#summName").text(response.model.FirstName + " " + response.model.MiddleInitial + " " + response.model.LastName);
            $("#summNamep").text(response.model.FirstName + " " + response.model.MiddleInitial + " " + response.model.LastName);
            if (response.model.FirstName != null) {
                $("#mainApplName").text(response.model.FirstName + " " + response.model.MiddleInitial + " " + response.model.LastName);
            }
            $("#txtDateOfBirth").val(response.model.DateOfBirthTxt);
            $("#summDob").text(response.model.DateOfBirthTxt);
            $("#summDobp").text(response.model.DateOfBirthTxt);
            $("#ddlGender").val(response.model.Gender).change();

            $("#ddlGenderReg").val(response.model.Gender).change();

            $("#txtEmailNew").val(response.model.Email);
            $("#summEmail").text(response.model.Email);
            $("#summEmailp").text(response.model.Email);
            $("#txtMobileNumber").val(formatPhoneFax(response.model.Mobile));
            $("#summPhone").text(formatPhoneFax(response.model.Mobile));
            $("#summPhonep").text(formatPhoneFax(response.model.Mobile));
            $("#txtPassportNum").val(response.model.PassportNumber);
            $("#txtCOI").val(response.model.CountryIssuance);
            $("#txtDateOfIssuance").val(response.model.DateIssuanceTxt);
            $("#txtDateOfExpiration").val(response.model.DateExpireTxt);
            $("#ddlDocumentTypePersonal").val(response.model.IDType).change();
            $("#ddlIDTypeReg").val(response.model.IDType).change();
            $("#ddlStatePersonal").val(response.model.State).change();
            $("#ddlStateIDDocReg").val(response.model.State).change();

            $("#txtSSNNumber").val(response.model.SSN);
            $("#txtSSNNumberReg").val(response.model.SSN);
            if (id != 0) {
                $("#txtSSNNumberReg").attr("disabled", true);
                $("#txtIDNumberReg").attr("disabled", true);
                $("#ddlStateIDDocReg").attr("disabled", true);
                $("#ddlIDTypeReg").attr("disabled", true);
            }

            $("#summSSN").text(response.model.SSN);
            if (response.model.Gender == 1) {
                $("#summGender").text("Male");
                $("#summGenderp").text("Male");
            } else {
                $("#summGender").text("Female");
                $("#summGenderp").text("Female");
            }

            $("#summDriverL").text(response.model.IDNumber);

            $("#txtIDNumber").val(response.model.IDNumber);
            $("#txtIDNumberReg").val(response.model.IDNumber);

            $("#txtAddress1").val(response.model.HomeAddress1);
            $("#txtAddress1Reg").val(response.model.HomeAddress1);
            $("#txtAddress2").val(response.model.HomeAddress2);
            $("#txtAddress2Reg").val(response.model.HomeAddress2);
            $("#summCuAddress1").text(response.model.HomeAddress1);
            $("#summCuAddress2").text(response.model.HomeAddress2);
            $("#summCuState").text(response.model.StateHomeString);
            $("#summCuCity").text(response.model.CityHome);
            $("#summCuZip").text(response.model.ZipHome);
            $("#summCuMoveInDate").text(response.model.MoveInDateFromTxt);
            $("#summCuAddp").text(response.model.HomeAddress1 + " " + response.model.HomeAddress2 + ", " + response.model.CityHome + ", " + response.model.StateHomeString + "- " + response.model.ZipHome);

            $("#txtZip").val(response.model.ZipHome);
            $("#txtZipReg").val(response.model.ZipHome);
            $("#ddlRentOwn").val(response.model.RentOwn).change();;
            $("#txtMonthlyPayment").val(formatMoney(response.model.MonthlyPayment));
            $("#txtReasonforleaving").val(response.model.Reason);
            $("#txtEmployerName").val(response.model.EmployerName);
            $("#summEmployerName").text(response.model.EmployerName);
            $("#summEmployerJobTitle").text(response.model.JobTitle == "" ? "N/A" : response.model.JobTitle);
            if (response.model.JobType == 0) {
                $("#summEmployerJobType").text("N/A");
            }
            else if (response.model.JobType == 1) {
                $("#summEmployerJobType").text("Permenant");
            }
            else if (response.model.JobType == 2) {
                $("#summEmployerJobType").text("Contract Basis");
            }

            $("#summEmployerStartDate").text(response.model.StartDateTxt);
            $("#summEmployerAnnualIncome").text(formatMoney(response.model.Income));
            $("#summEmployerSupervisorName").text(response.model.SupervisorName);
            $("#summEmployerSupervisorPhone").text(formatPhoneFax(response.model.SupervisorPhone));
            $("#summEmployerp").text(response.model.EmployerName + ", " + response.model.OfficeAddress1 + ", " + response.model.OfficeCity + " (" + response.model.JobTitle + ") ");

            $("#txtJobTitle").val(response.model.JobTitle);
            $("#ddlJobType").val(response.model.JobType);
            $("#txtStartDate").val(response.model.StartDateTxt);
            $("#summEstartdate").text(response.model.StartDateTxt);
            $("#summEstartdatep").text(response.model.StartDateTxt);
            $("#txtAnnualIncome").val(formatMoney(response.model.Income));
            $("#summSalary").text(formatMoney(response.model.Income));
            $("#summSalaryp").text(formatMoney(response.model.Income));
            $("#txtAddAnnualIncome").val(formatMoney(response.model.AdditionalIncome));
            $("#txtSupervisiorName").val(response.model.SupervisorName);
            $("#txtSupervisiorPhone").val(formatPhoneFax(response.model.SupervisorPhone));
            $("#txtSupervisiorEmail").val(response.model.SupervisorEmail);
            $("#txtofficeAddress1").val(response.model.OfficeAddress1);
            $("#txtofficeAddress2").val(response.model.OfficeAddress2);
            $("#txtZipOffice").val(response.model.OfficeZip);
            $("#txtRelationship").val(response.model.Relationship);
            $("#txtEmergencyFirstName").val(response.model.EmergencyFirstName);
            $("#txtEmergencyLastName").val(response.model.EmergencyLastName);
            $("#txtEmergencyMobile").val(formatPhoneFax(response.model.EmergencyMobile));
            $("#txtEmergencyHomePhone").val(formatPhoneFax(response.model.EmergencyHomePhone));
            $("#txtEmergencyWorkPhone").val(formatPhoneFax(response.model.EmergencyWorkPhone));
            $("#txtEmergencyEmail").val(response.model.EmergencyEmail);
            $("#txtEmergencyAddress1").val(response.model.EmergencyAddress1);
            $("#txtEmergencyAddress2").val(response.model.EmergencyAddress2);
            $("#summEmergname").text(response.model.EmergencyFirstName + " " + response.model.EmergencyLastName);
            $("#summEmegmobile").text(formatPhoneFax(response.model.EmergencyMobile));
            $("#summEmerrelation").text(response.model.Relationship);
            $("#summEmergnamep").text(response.model.EmergencyFirstName + " " + response.model.EmergencyLastName);
            $("#summEmegmobilep").text(formatPhoneFax(response.model.EmergencyMobile));
            $("#summEmerrelationp").text(response.model.Relationship);
            $("#txtEmergencyZip").val(response.model.EmergencyZipHome);
            $("#ddlCityHome").val(response.model.CityHome);
            $("#ddlCityReg").val(response.model.CityHome);

            $("#ddlCityContact").val(response.model.EmergencyCityHome);
            $("#ddlCityEmployee").val(response.model.OfficeCity);
            if (response.model.Gender == '3') {
                $("#txtOtherGender").val(response.model.OtherGender);
            }
            else {
                $("#txtOtherGender").val('');
            }

            if (response.model.Gender == '3') {
                $("#txtOtherGenderReg").val(response.model.OtherGender);
            }
            else {
                $("#txtOtherGenderReg").val('');
            }

            $("#txtMoveInDateFrom").val(response.model.MoveInDateFromTxt);
            $("#txtCountry").val(response.model.Country);
            fillStateDDL_HomeQuotation(response.model.Country, response.model.StateHome);

            $("#txtCountryReg").val(response.model.Country);

            fillStateDDLReg_IDTypeQuotation(response.model.Country, response.model.StateHome);
            fillStateDDLReg_HomeQuotation(response.model.Country, response.model.StateHome);

            $("#txtCountryOffice").val(response.model.OfficeCountry);
            fillStateDDL_OfficeQuotation(response.model.OfficeCountry, response.model.OfficeState);

            $("#txtEmergencyCountry").val(response.model.EmergencyCountry);
            fillStateDDL_EmeContactQuotation(response.model.EmergencyCountry, response.model.EmergencyStateHome);

            if (response.model.IdentityDocument != "") {
                $("#hndHasIdentityFile").val("1");
            } else {
                $("#hndHasIdentityFile").val("0");
            }
            if (response.model.PassportDocument != "") {
                $("#hndHasPassportFile").val("1");
            } else {
                $("#hndHasPassportFile").val("0");
            }
            if (response.model.TaxReturn != "") {
                if (response.model.TaxReturn == "0") {
                    $("#hndHasTaxReturnFile1").val("0");
                }
                else {
                    $("#hndHasTaxReturnFile1").val("1");
                }
            } else {
                $("#hndHasTaxReturnFile1").val("0");
            }
            if (response.model.TaxReturn2 != "") {
                if (response.model.TaxReturn2 == "0") {
                    $("#hndHasTaxReturnFile2").val("0");
                }
                else {
                    $("#hndHasTaxReturnFile2").val("1");
                }
            } else {
                $("#hndHasTaxReturnFile2").val("0");
            }
            if (response.model.TaxReturn3 != "") {
                if (response.model.TaxReturn3 == "0") {
                    $("#hndHasTaxReturnFile3").val("0");
                }
                else {
                    $("#hndHasTaxReturnFile3").val("1");
                }
            } else {
                $("#hndHasTaxReturnFile3").val("0");
            }
            if (response.model.TaxReturn4 != "") {
                if (response.model.TaxReturn4 == "0") {
                    $("#hndHasTaxReturnFile4").val("0");
                }
                else {
                    $("#hndHasTaxReturnFile4").val("1");
                }
            } else {
                $("#hndHasTaxReturnFile4").val("0");
            }
            if (response.model.TaxReturn5 != "") {
                if (response.model.TaxReturn5 == "0") {
                    $("#hndHasTaxReturnFile5").val("0");
                }
                else {
                    $("#hndHasTaxReturnFile5").val("1");
                }
            } else {
                $("#hndHasTaxReturnFile5").val("0");
            }

            //alert(response.model.HaveVehicle + "  " + response.model.HavePet);
            if (response.model.HaveVehicle == true) {
                $("#chkDontHaveVehicle").iCheck('check');
            }
            else {
                $("#chkDontHaveVehicle").iCheck('uncheck');
            }
            if (response.model.HavePet == true) {
                $("#chkDontHavePet").iCheck('check');
                $("#chkDontHavePet").prop('disabled', 'disabled');
            }
            else {
                $("#chkDontHavePet").iCheck('uncheck');
                $("#chkDontHavePet").prop('disabled', 'disabled');
            }

            $("#hndPassportUploadName").val(response.model.PassportDocument);
            $("#hndOriginalPassportUploadName").val(response.model.UploadOriginalPassportName);
            $("#hndIdentityUploadName").val(response.model.IdentityDocument);
            $("#hndOriginalIdentityUploadName").val(response.model.UploadOriginalIdentityName);
            $("#hndFileUploadName1").val(response.model.TaxReturn);
            $("#hndOriginalFileUploadName1").val(response.model.UploadOriginalFileName1);
            $("#hndFileUploadName2").val(response.model.TaxReturn2);
            $("#hndOriginalFileUploadName2").val(response.model.UploadOriginalFileName2);
            $("#hndFileUploadName3").val(response.model.TaxReturn3);
            $("#hndOriginalFileUploadName3").val(response.model.UploadOriginalFileName3);


            //sachin m 11 may
            $("#hndFileUploadName4").val(response.model.TaxReturn4);
            $("#hndOriginalFileUploadName4").val(response.model.UploadOriginalFileName4);
            $("#hndFileUploadName5").val(response.model.TaxReturn5);
            $("#hndOriginalFileUploadName5").val(response.model.UploadOriginalFileName5);

            $("#hndFileUploadNameBankState1").val(response.model.TaxReturn6);
            $("#hndOriginalFileUploadNameBankState1").val(response.model.UploadOriginalFileName6);
            $("#hndFileUploadNameBankState2").val(response.model.TaxReturn7);
            $("#hndOriginalFileUploadNameBankState2").val(response.model.UploadOriginalFileName7);
            $("#hndFileUploadNameBankState3").val(response.model.TaxReturn8);
            $("#hndOriginalFileUploadNameBankState3").val(response.model.UploadOriginalFileName8);



            //To Display File Name On Uploader
            if (response.model.UploadOriginalPassportName != '') {
                $("#fileUploadPassportShow").text(response.model.UploadOriginalPassportName);
            }
            if (response.model.UploadOriginalIdentityName != '') {
                $("#fileUploadIdentityShow").text(response.model.UploadOriginalIdentityName);
            }
            if (response.model.UploadOriginalFileName1 != '') {
                if (response.model.UploadOriginalFileName1 != '0') {
                    $("#fileUploadTaxReturn1Show").text(response.model.UploadOriginalFileName1);
                }
            }
            if (response.model.UploadOriginalFileName2 != '') {
                if (response.model.UploadOriginalFileName2 != '0') {
                    $("#fileUploadTaxReturn2Show").text(response.model.UploadOriginalFileName2);
                }
            }
            if (response.model.UploadOriginalFileName3 != '') {
                if (response.model.UploadOriginalFileName3 != '0') {
                    $("#fileUploadTaxReturn3Show").text(response.model.UploadOriginalFileName3);
                }
            }

            //sachin m 11 may
            if (response.model.UploadOriginalFileName4 != '') {
                if (response.model.UploadOriginalFileName4 != '0') {
                    $("#fileUploadTaxReturn4Show").text(response.model.UploadOriginalFileName4);
                }
            }
            if (response.model.UploadOriginalFileName5 != '') {
                if (response.model.UploadOriginalFileName5 != '0') {
                    $("#fileUploadTaxReturn5Show").text(response.model.UploadOriginalFileName5);
                }
            }

            if (response.model.UploadOriginalFileName6 != '') {
                if (response.model.UploadOriginalFileName6 != '0') {
                    $("#fileBankState1Show").text(response.model.UploadOriginalFileName6);
                }
            }
            if (response.model.UploadOriginalFileName7 != '') {
                if (response.model.UploadOriginalFileName7 != '0') {
                    $("#fileBankState2Show").text(response.model.UploadOriginalFileName7);
                }
            }
            if (response.model.UploadOriginalFileName8 != '') {
                if (response.model.UploadOriginalFileName8 != '0') {
                    $("#fileBankState3Show").text(response.model.UploadOriginalFileName8);
                }
            }

            //alert(response.model.IsPaystub);

            if (response.model.IsPaystub == 1) {
                $("#rbtnPaystub").iCheck('check');
                $('#divUpload3').removeClass('hidden');
            }
            if (response.model.IsFedralTax == 1) {
                $("#rbtnFedralTax").iCheck('check');
            }
            if (response.model.IsBankState == 1) {
                $("#rbtnBankStatement").iCheck('check');
                $('#divBankUpload').removeClass('hidden');
            }

            $("#divLoaderFullData").hide();
            var modelstep = $("#hdnStepCompleted").val();
            var stepcompleted = parseInt(response.model.StepCompleted);
            if (modelstep < stepcompleted) {
                $("#hdnStepCompleted").val(stepcompleted);
            } else {
                stepcompleted = modelstep;
            }
            showCurrentStepQuotation(stepcompleted, stepcompleted);
        }
    });
};

//var getApplicantListsQuotation = function () {
//    var model = {
//        TenantID: $("#hdnOPId").val(),
//    }
//    $.ajax({
//        url: "/Applicant/GetApplicantList",
//        type: "post",
//        contentType: "application/json utf-8",
//        data: JSON.stringify(model),
//        dataType: "JSON",
//        success: function (response) {
//            addApplicntArray = [];
//            totpaid = 0;
//            totnotpaid = 0;
//            $("#tblApplicant").empty();
//            $("#tblApplicant15>tbody").empty();
//            $("#tblApplicant15p>tbody").empty();
//            $("#tblRespo15>tbody").empty();
//            $("#tblRespo15p>tbody").empty();
//            $("#tblApplicantFinal").empty();
//            $("#tblApplicantMinor").empty();
//            $("#tblApplicantGuarantor").empty();
//            $("#tblResponsibilityPay").empty();
//            $("#tblPayment>tbody").empty();
//            $("#tblEmailCoapplicant>tbody").empty();
//            var totalFinalFees = 0;
//            var noofapl = 0;
//            var noofCapl = 0;
//            var noofminor = 0;
//            var noofgur = 0;
//            var applicantFees = $("#lblApplicationFees").text();
//            var guarantorFees = $("#lblGuarantorFees").text();

//            var nofbed = $("#lblBed").text();
//            var allowedAppli = 0;
//            var allowedMinor = 0;
//            var totalPeople = (parseInt(nofbed) * 2);


//            $.each(response.model, function (elementType, elementValue) {

//                if (elementValue.Type == "Co-Applicant") {
//                    noofCapl += 1;
//                }
//                else if (elementValue.Type == "Minor") {
//                    noofminor += 1;
//                }
//                else if (elementValue.Type == "Primary Applicant") {
//                    noofapl += 1;
//                }
//                else {
//                    noofgur += 1;
//                }

//                var html = '';
//                var prhtml = '';
//                var pprhtml = '';
//                var emailhtml = '';
//                if (elementValue.Type != "Primary Applicant") {
//                    html += "<div class='col-sm-4 box-two proerty-item' id='div_" + elementValue.ApplicantID + "'>" +
//                        "<div class='form-group col-sm-3 text-center'><br>" +
//                        "<img src='/Content/assets/img/user.png' style='width:100px;'></div>" +
//                        "<div class='form-group col-sm-9' style='margin-top: 10px !important;'><b>" + elementValue.FirstName + " " + elementValue.LastName + "</b><br/>" +
//                        "<label> " + elementValue.Type + " </label><br/>" +
//                        "<label><a href='javascript:void(0)' onclick='goToEditApplicantQuotation(" + elementValue.ApplicantID + ")'>Edit/Complete Information</a></label>&nbsp;&nbsp;&nbsp;&nbsp;" +
//                        "<label><a href='javascript:void(0)' onclick='delApplicant(" + elementValue.ApplicantID + ")'><span class='fa fa-trash' ></span></a></label>";

//                    //if (parseInt(elementValue.CreditPaid) == 0 && parseInt(elementValue.HasSSN) == 1) {
//                    //    html += "<label><a href='javascript:void(0)' onclick='payFeePop(" + elementValue.ApplicantID + ",4)'>Pay Credit Check Fees</a></label>";
//                    //} else if (parseInt(elementValue.CreditPaid) == 1 && parseInt(elementValue.BackGroundPaid) == 0) {
//                    //    html += "<label><a href='javascript:void(0)' onclick='payFeePop(" + elementValue.ApplicantID + ",5)'>Pay Background Check Fees</a></label>";
//                    //}
//                    html += "</div><div><center><label><b>Status: " + elementValue.ComplStatus + "</b></label></center></div></div>";
//                }
//                else {
//                    html += "<div class='col-sm-4 box-two proerty-item'>" +
//                        "<div class='form-group col-sm-3 text-center'><br>" +
//                        "<img src='/Content/assets/img/user.png' style='width:100px;'></div>" +
//                        "<div class='form-group col-sm-9' style='margin-top: 10px !important;'><b>" + elementValue.FirstName + " " + elementValue.LastName + "</b><br/>" +

//                        "<label>Primary Applicant</label><br/>" +
//                        "<label><a href='javascript:void(0)' onclick='goToEditApplicantQuotation(" + elementValue.ApplicantID + ")'>Edit/Complete Information</a></label><br/>";
//                    //if (parseInt(elementValue.CreditPaid) == 0 && parseInt(elementValue.HasSSN) == 1) {
//                    //    html += "<label><a href='javascript:void(0)' onclick='payFeePop(" + elementValue.ApplicantID + ",4)'>Pay Credit Check Fees</a></label>";
//                    //} else if (parseInt(elementValue.CreditPaid) == 1 && parseInt(elementValue.BackGroundPaid) == 0) {
//                    //    html += "<label><a href='javascript:void(0)' onclick='payFeePop(" + elementValue.ApplicantID + ",5)'>Pay Background Check Fees</a></label>";
//                    //}
//                    html += "</div><div><center><label><b>Status: " + elementValue.ComplStatus + "</b></label></center></div></div>";
//                }
//                if (elementValue.Type == "Primary Applicant" || elementValue.Type == "Co-Applicant") {
//                    prhtml += "<div class='row respo' data-id='" + elementValue.ApplicantID + "'><div class='col-sm-12  col-lg-2 box-padding'><div class='col-lg-12'></div>" +
//                        "<div class='col-lg-12'>" + elementValue.Type + "</div><div class='col-lg-12'><b>" + elementValue.FirstName + " " + elementValue.LastName + "</b></div></div>" +
//                        "<div class='col-sm-12  col-lg-5'><div class='col-lg-12'></div><div class='col-lg-12 box-padding'><b>Move In Charges</b></div><div class='row'><div class='col-lg-6'>" +
//                        "<input class='input-box payper' type='text' id='txtpayper" + elementValue.ApplicantID + "' value='" + elementValue.MoveInPercentage + "'/><span class='input-box-span'><b>%</b></span></div><div class='col-lg-6'>" +
//                        "<span class='input-box-span'><b>$</b></span><input class='input-box' value='" + parseFloat(elementValue.MoveInCharge).toFixed(2) + "' type='text'  id='txtpayamt" + elementValue.ApplicantID + "'/></div></div></div>" +
//                        "<div class='col-sm-12  col-lg-5'><div class='col-lg-12'></div><div class='col-lg-12 box-padding'><b>Monthly Payment</b></div><div class='row'><div class='col-lg-6'>" +
//                        "<input class='input-box payperMo' value='" + elementValue.MonthlyPercentage + "' type='text'  id='txtpayperMo" + elementValue.ApplicantID + "' /><span class='input-box-span'><b>%</b></span></div><div class='col-lg-6'><span class='input-box-span'><b>$</b></span><input class='input-box' value='" + parseFloat(elementValue.MonthlyPayment).toFixed(2) + "' type='text' id='txtpayamtMo" + elementValue.ApplicantID + "'/></div></div> </div>" +
//                        "</div>";
//                }
//                if (elementValue.Type == "Primary Applicant" || elementValue.Type == "Co-Applicant" || elementValue.Type == "Guarantor") {
//                    if (elementValue.Type == "Primary Applicant" || elementValue.Type == "Co-Applicant") {
//                        if (parseInt(elementValue.CreditPaid) == 1) {
//                            totpaid += parseFloat(elementValue.AppCreditFees);
//                            pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Credit Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.AppCreditFees).toFixed(2) + "</td><td style='width:14%; padding:6px;text-align: center;'>Paid</td><td></td></tr>";
//                        }
//                        else {
//                            if (elementValue.Type == "Primary Applicant") {
//                                addApplicntArray.push({ ApplicantID: elementValue.ApplicantID, Type: 4 });
//                                totalFinalFees += parseFloat(elementValue.AppCreditFees);
//                                pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Credit Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.AppCreditFees).toFixed(2) + "</td><td style='width:14%; padding:6px;'><input type='checkbox' id='chkPayAppFees' checked disabled/></td><td></td></tr>";
//                            } else {
//                                pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Credit Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.AppCreditFees).toFixed(2) + "</td><td style='width:14%; padding:6px;'><input type='checkbox' class='chkPayAppFees" + elementValue.ApplicantID + "4' id='chkPayAppFees" + elementValue.ApplicantID + "' onclick='addAppFess(" + elementValue.AppCreditFees + "," + elementValue.ApplicantID + ",4)'/></td><td><input type='button' id='btnSendPayLink" + elementValue.ApplicantID + "4' style='width:150px;' onclick='sendPayLinkEmail(" + elementValue.AppCreditFees + "," + elementValue.ApplicantID + ",4,\"" + elementValue.Email + "\")' value='Send Payment Link'/></td></tr>";
//                            }
//                            totnotpaid += parseFloat(elementValue.AppCreditFees);
//                        }
//                        if (parseInt(elementValue.BackGroundPaid) == 1) {
//                            totpaid += parseFloat(elementValue.AppBackGroundFees);
//                            pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Background Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.AppBackGroundFees).toFixed(2) + "</td><td style='width:14%; padding:6px;text-align: center;'>Paid</td><td></td></tr>";
//                        }
//                        else {
//                            if (elementValue.Type == "Primary Applicant") {
//                                totalFinalFees += parseFloat(elementValue.AppBackGroundFees);
//                                addApplicntArray.push({ ApplicantID: elementValue.ApplicantID, Type: 5 });
//                                pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Background Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.AppBackGroundFees).toFixed(2) + "</td><td style='width:14%; padding:6px;'><input type='checkbox' id='chkPayAppFees'  checked disabled/></td><td></td></tr>";
//                            } else {
//                                pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Background Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.AppBackGroundFees).toFixed(2) + "</td><td style='width:14%; padding:6px;'><input type='checkbox' class='chkPayAppFees" + elementValue.ApplicantID + "5' id='chkPayAppFees" + elementValue.ApplicantID + "' onclick='addAppFess(" + elementValue.AppBackGroundFees + "," + elementValue.ApplicantID + ",5)'/></td><td><input type='button' id='btnSendPayLink" + elementValue.ApplicantID + "5' style='width:150px;' onclick='sendPayLinkEmail(" + elementValue.AppBackGroundFees + "," + elementValue.ApplicantID + ",5,\"" + elementValue.Email + "\")' value='Send Payment Link'/></td></tr>";
//                            }
//                            totnotpaid += parseFloat(elementValue.AppBackGroundFees);
//                        }
//                    }
//                    else {
//                        if (parseInt(elementValue.CreditPaid) == 1) {
//                            totpaid += parseFloat(elementValue.GuarCreditFees);
//                            pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Credit Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.GuarCreditFees).toFixed(2) + "</td><td style='width:14%; padding:6px;text-align: center;'>Paid</td><td></td></tr>";
//                        }
//                        else {
//                            pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Credit Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.GuarCreditFees).toFixed(2) + "</td><td style='width:14%; padding:6px;'><input type='checkbox' class='chkPayAppFees" + elementValue.ApplicantID + "4' id='chkPayAppFees" + elementValue.ApplicantID + "' onclick='addAppFess(" + elementValue.GuarCreditFees + "," + elementValue.ApplicantID + ",4)'/></td><td><input type='button' id='btnSendPayLink" + elementValue.ApplicantID + "4' style='width:150px;' onclick='sendPayLinkEmail(" + elementValue.GuarCreditFees + "," + elementValue.ApplicantID + ",4,\"" + elementValue.Email + "\")' value='Send Payment Link'/></td></tr>";
//                            totnotpaid += parseFloat(elementValue.GuarCreditFees);
//                        }
//                        if (parseInt(elementValue.BackGroundPaid) == 1) {
//                            totpaid += parseFloat(elementValue.GuarBackGroundFees);
//                            pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Backgroung Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.GuarBackGroundFees).toFixed(2) + "</td><td style='width:14%; padding:6px;text-align: center;'>Paid</td><td></td></tr>";
//                        }
//                        else {
//                            pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Background Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.GuarBackGroundFees).toFixed(2) + "</td><td style='width:14%; padding:6px;'><input type='checkbox' class='chkPayAppFees" + elementValue.ApplicantID + "5' id='chkPayAppFees" + elementValue.ApplicantID + "' onclick='addAppFess(" + elementValue.GuarBackGroundFees + "," + elementValue.ApplicantID + ",5)'/></td><td><input type='button' id='btnSendPayLink" + elementValue.ApplicantID + "5' style='width:150px;' onclick='sendPayLinkEmail(" + elementValue.GuarBackGroundFees + "," + elementValue.ApplicantID + ",5,\"" + elementValue.Email + "\")' value='Send Payment Link'/></td></tr>";
//                            totnotpaid += parseFloat(elementValue.GuarBackGroundFees);
//                        }

//                    }
//                }
//                if (elementValue.Type == "Co-Applicant" || elementValue.Type == "Guarantor") {
//                    //Sachin's work 22-10
//                    $("#btnsendemail").removeClass("hidden");
//                    if (elementValue.Email != null) {
//                        emailhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:20%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + "</td><td style='width:18%; padding:6px;'>" + elementValue.Email + " </td><td style='width:30%; padding:6px;'><input type='checkbox' onclick='addEmail(\"" + elementValue.Email + "\")' id='chkEmail" + elementValue.ApplicantID + "' style='width:25%; border:1px solid;' /></td></tr>";
//                    }
//                }

//                if (elementValue.Type == "Minor") {
//                    $("#tblApplicantMinor").append(html);
//                }
//                else if (elementValue.Type == "Guarantor") {
//                    $("#tblApplicantGuarantor").append(html);
//                }
//                else {
//                    $("#tblApplicant").append(html);
//                    $("#tblApplicantFinal").append(html);
//                }

//                var html15 = "<tr id='tr_" + elementValue.ApplicantID + "' data-value='" + elementValue.ApplicantID + "'>";

//                html15 += "<td>" + elementValue.FirstName + " " + elementValue.LastName + "</td>";
//                html15 += "<td>" + elementValue.Type + "</td>";
//                html15 += "<td>" + elementValue.GenderString + "</td>";
//                html15 += "<td>" + elementValue.Email + "</td>";
//                html15 += "<td>" + elementValue.Phone + "</td>";
//                html15 += "<td>" + elementValue.DateOfBirthTxt + "</td>";

//                html15 += "</tr>";
//                $("#tblApplicant15>tbody").append(html15);
//                $("#tblApplicant15p>tbody").append(html15);

//                if (elementValue.Type == "Primary Applicant") {
//                    var htmlResp15 = "<tr id='tr_" + elementValue.ApplicantID + "' data-value='" + elementValue.ApplicantID + "'>";
//                    htmlResp15 += "<td> " + elementValue.FirstName + " " + elementValue.LastName + "</td>";
//                    htmlResp15 += "<td> " + elementValue.Type + "</td>";
//                    htmlResp15 += "<td> " + elementValue.MoveInPercentage + "%</td>";
//                    htmlResp15 += "<td> $" + formatMoney(elementValue.MoveInCharge) + "</td>";
//                    htmlResp15 += "<td> " + elementValue.MonthlyPercentage + "%</td>";
//                    htmlResp15 += "<td> $" + formatMoney(elementValue.MonthlyPayment) + "</td>";
//                    htmlResp15 += "</tr>";
//                }

//                $("#tblRespo15>tbody").append(htmlResp15);
//                $("#tblRespo15p>tbody").append(htmlResp15);

//                $("#tblResponsibilityPay").append(prhtml);
//                $("#tblPayment>tbody").append(pprhtml);
//                $("#tblEmailCoapplicant>tbody").append(emailhtml);

//                if (elementValue.Type == "Primary Applicant") {
//                    if ($("#txtpayper" + elementValue.ApplicantID).val() == 0) {
//                        $("#txtpayper" + elementValue.ApplicantID).val(100);
//                        checkPercentage();
//                    }
//                    if ($("#txtpayperMo" + elementValue.ApplicantID).val() == 0) {
//                        $("#txtpayperMo" + elementValue.ApplicantID).val(100);
//                        checkPercentage();
//                    }
//                }

//                function checkPercentage() {
//                    var chargesPecentage = $("#txtpayper" + elementValue.ApplicantID).val();
//                    var perCharges = ((chargesPecentage * parseFloat(unformatText($("#lbtotdueatmov6").text()))) / 100);
//                    $("#txtpayamt" + elementValue.ApplicantID).val(perCharges.toFixed(2));


//                    var sum = parseFloat(0);
//                    $(".payper").each(function () {
//                        sum += parseFloat(this.value);

//                    });
//                    localStorage.setItem("percentage", sum);

//                    var chargesAmount = $("#txtpayamt" + elementValue.ApplicantID).val();
//                    var chargesPer = ((chargesAmount * 100) / parseFloat(unformatText($("#lbtotdueatmov6").text())));
//                    $("#txtpayper" + elementValue.ApplicantID).val(parseFloat(chargesPer).toFixed(2));

//                    var monthlyPercentage = $("#txtpayperMo" + elementValue.ApplicantID).val();
//                    var monthlyPayment = unformatText($("#lblRFPTotalMonthlyPayment").text());
//                    var perMonth = ((monthlyPercentage * parseFloat(monthlyPayment, 10)) / 100);
//                    $("#txtpayamtMo" + elementValue.ApplicantID).val(parseFloat(perMonth).toFixed(2));

//                    var sumMo = parseFloat(0);
//                    $(".payperMo").each(function () {
//                        sumMo += parseFloat(this.value);

//                    });
//                    localStorage.setItem("percentageMo", sumMo);
//                }

//                $("#txtpayper" + elementValue.ApplicantID).keyup(function () {
//                    var chargesPecentage = parseFloat($("#txtpayper" + elementValue.ApplicantID).val());
//                    var perCharges = ((chargesPecentage * parseFloat(unformatText($("#lbtotdueatmov6").text()))) / 100);
//                    $("#txtpayamt" + elementValue.ApplicantID).val(formatMoney(perCharges.toFixed(2)));
//                    var sum = parseFloat(0);
//                    $(".payper").each(function () {
//                        sum += parseFloat(this.value);
//                    });
//                    localStorage.setItem("percentage", sum);
//                }).keypress(function (event) { return nonNegDecimal(event, $(this)); }).focusout(function () {
//                    $("#txtpayper" + elementValue.ApplicantID).val(parseFloat(($("#txtpayper" + elementValue.ApplicantID).val()).toFixed(2)));
//                });

//                $("#txtpayamt" + elementValue.ApplicantID).keyup(function () {
//                    var chargesAmount = unformatText($("#txtpayamt" + elementValue.ApplicantID).val());
//                    var chargesPer = ((chargesAmount * 100) / parseFloat(unformatText($("#lbtotdueatmov6").text())));
//                    $("#txtpayper" + elementValue.ApplicantID).val(chargesPer.toFixed(2));
//                    var sum = parseFloat(0);
//                    $(".payper").each(function () {
//                        sum += parseFloat(this.value);
//                    });
//                    localStorage.setItem("percentage", sum);

//                }).keypress(function (event) { return nonNegDecimal(event, $(this)); }).focusout(function () {
//                    $("#txtpayamt" + elementValue.ApplicantID).val(formatMoney(unformatText($("#txtpayamt" + elementValue.ApplicantID).val())));
//                });

//                $("#txtpayperMo" + elementValue.ApplicantID).keyup(function () {
//                    var monthlyPercentage = $("#txtpayperMo" + elementValue.ApplicantID).val();
//                    var monthlyPayment = unformatText($("#lblRFPTotalMonthlyPayment").text());
//                    var perMonth = ((monthlyPercentage * parseFloat(monthlyPayment, 10)) / 100);
//                    $("#txtpayamtMo" + elementValue.ApplicantID).val(formatMoney(parseFloat(perMonth).toFixed(2)));
//                    var sumMo = parseFloat(0);
//                    $(".payperMo").each(function () {
//                        sumMo += parseFloat(this.value);

//                    });
//                    localStorage.setItem("percentageMo", sumMo);
//                }).keypress(function (event) { return nonNegDecimal(event, $(this)); }).focusout(function () {
//                    $("#txtpayperMo" + elementValue.ApplicantID).val(parseFloat(($("#txtpayperMo" + elementValue.ApplicantID).val()).toFixed(2)));
//                });

//                $("#txtpayamtMo" + elementValue.ApplicantID).keyup(function () {
//                    var perMonth = unformatText($("#txtpayamtMo" + elementValue.ApplicantID).val());
//                    var monthlyPayment = unformatText($("#lblRFPTotalMonthlyPayment").text());
//                    var monthlyPercentage = ((perMonth * 100) / parseFloat(monthlyPayment, 10));
//                    $("#txtpayperMo" + elementValue.ApplicantID).val(monthlyPercentage.toFixed(2));

//                    var sumMo = parseFloat(0);
//                    $(".payperMo").each(function () {
//                        sumMo += parseFloat(this.value);

//                    });
//                    localStorage.setItem("percentageMo", sumMo);
//                }).keypress(function (event) { return nonNegDecimal(event, $(this)); }).focusout(function () {
//                    $("#txtpayamtMo" + elementValue.ApplicantID).val(formatMoney(unformatText($("#txtpayamtMo" + elementValue.ApplicantID).val())));
//                });

//                var sum = parseFloat(0);
//                $(".payper").each(function () {
//                    sum += parseFloat(this.value);

//                });
//                localStorage.setItem("percentage", sum);
//                var sumMo = parseFloat(0);
//                $(".payperMo").each(function () {
//                    sumMo += parseFloat(this.value);

//                });
//                localStorage.setItem("percentageMo", sumMo);
//            });
//            var totalAppl = noofapl;
//            var newtotalAppl = (parseInt(noofapl) - 1);
//            var totalCoAppl = noofCapl;
//            var totalMinor = noofminor;
//            var total = 0;
//            if (nofbed == 1) {
//                total = parseInt(noofapl) + parseInt(totalCoAppl) + parseInt(totalMinor);
//                if (totalCoAppl <= parseInt(totalPeople) - 1) {
//                    if (total <= parseInt(totalPeople) - 1) {
//                        $("#tblApplicant").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(1)'><i class='fa fa-plus-circle'></i> Add Co-Applicant</a></label></div></div></div></div>");
//                    }
//                }
//                if (totalMinor <= parseInt(totalPeople) - 1) {
//                    if (total <= parseInt(totalPeople) - 1) {
//                        $("#tblApplicantMinor").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(2)'><i class='fa fa-plus-circle'></i> Add Minor</a></label></div></div></div></div>");
//                    }
//                }
//            }
//            else if (nofbed == 2) {
//                total = parseInt(noofapl) + parseInt(totalCoAppl) + parseInt(totalMinor);
//                if (total <= parseInt(totalPeople) - 1) {
//                    if (totalCoAppl < 2) {
//                        if (total < parseInt(totalPeople)) {
//                            $("#tblApplicant").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(1)'><i class='fa fa-plus-circle'></i> Add Co-Applicant</a></label></div></div></div></div>");
//                            if (totalMinor <= 1) {
//                                $("#tblApplicantMinor").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(2)'><i class='fa fa-plus-circle'></i> Add Minor</a></label></div></div></div></div>");
//                            }
//                        }
//                    }
//                    else if (totalMinor < 2) {
//                        if (total < parseInt(totalPeople)) {
//                            $("#tblApplicantMinor").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(2)'><i class='fa fa-plus-circle'></i> Add Minor</a></label></div></div></div></div>");
//                            if (totalCoAppl <= 1) {
//                                $("#tblApplicant").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(1)'><i class='fa fa-plus-circle'></i> Add Co-Applicant</a></label></div></div></div></div>");
//                            }
//                        }
//                    }
//                }
//            }
//            else if (nofbed == 3) {
//                total = parseInt(noofapl) + parseInt(totalCoAppl) + parseInt(totalMinor);
//                if (total <= parseInt(totalPeople) - 1) {
//                    if (totalCoAppl < 3) {
//                        if (total < parseInt(totalPeople)) {
//                            $("#tblApplicant").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(1)'><i class='fa fa-plus-circle'></i> Add Co-Applicant</a></label></div></div></div></div>");
//                            if (totalMinor <= 2) {
//                                $("#tblApplicantMinor").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(2)'><i class='fa fa-plus-circle'></i> Add Minor</a></label></div></div></div></div>");
//                            }
//                        }
//                    }
//                    else if (totalMinor < 3) {
//                        if (total < parseInt(totalPeople)) {
//                            $("#tblApplicantMinor").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(2)'><i class='fa fa-plus-circle'></i> Add Minor</a></label></div></div></div></div>");
//                            if (totalCoAppl <= 2) {
//                                $("#tblApplicant").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(1)'><i class='fa fa-plus-circle'></i> Add Co-Applicant</a></label></div></div></div></div>");
//                            }
//                        }
//                    }
//                }
//            }
//            if (noofgur == 0) {
//                $("#tblApplicantGuarantor").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(3)'><i class='fa fa-plus-circle'></i> Add Guarantor</a></label></div></div></div></div>");
//            }
//            $("#totalFinalFees").text("$" + parseFloat(totalFinalFees).toFixed(2));
//        }
//    });
//};

var sendQuotationEmail = function () {
    $.alert({
        title: "",
        content: "Do you want to send quotation and pay credit check link?",
        type: 'blue',
        buttons: {
            yes: {
                text: 'Yes',
                action: function (yes) {
                    $("#divLoader").show();

                    var numofveh = 0;
                    var noofbed = $("#lblBed").text();
                    var additionalParking = $("#hndAdditionalParking").val();
                    if (parseInt(additionalParking) > 0) {
                        if (parseInt(noofbed) < 3) {
                            numofveh = (parseInt(additionalParking) + 1);
                        }
                        else {
                            numofveh = (parseInt(additionalParking) + 2);
                        }
                    }
                    var model = {
                        TenantID: $("#hdnOPId").val(),
                        QuoteDate: $("#lblFNLQuoteDate").text(),
                        ApplicantName: $("#lblFNLResidentName1").text(),
                        QuoteExpires: $("#lblFNLQuoteExpires").text(),
                        PhoneNumber: $("#lblFNLPhone").text(),
                        Email: $("#lblFNLEmail").text(),
                        DesiredMoveIn: $("#lblFNLDesiredMoveIn").text(),
                        UnitNo: $("#lblFNLUnit").text(),
                        ModelName: $("#lblFNLModel").text(),
                        LeaseTerm: $("#lblFNLTerm").text(),
                        AssignParkingSpace: $("#lblAssginPakingSpace").text(),
                        ApplicationFees: $("#lblFNLApplicationFee").text(),
                        SecurityDeposit: $("#fdepo").text(),
                        GuarantorFees: $("#lblFNLGautantorFee").text(),
                        PetNonRefundableFee: $("#fpetd").text(),
                        AdministratorFee: $("#lblFNLAdministratorFee").text(),
                        PetDNAFee: $("#fpetdna").text(),
                        VehicleRegistration: $("#lblVehicleFees").text(),
                        MonthlyRent: $("#lblMonthly_MonthlyCharge").text(),
                        ProratedMonthlyRent: $("#lblProrated_MonthlyCharge").text(),
                        TrashFee: $("#spanTrashRecycle").text(),
                        ProratedTrashFee: $("#lblProrated_TrashAmt").text(),
                        PestControlFee: $("#spanPestControl").text(),
                        ProratedPestControlFee: $("#lblProrated_PestAmt").text(),
                        ConvergentBillingFee: $("#spanConvergentAmt").text(),
                        ProratedConvergentBillingFee: $("#lblProrated_ConvergentAmt").text(),
                        AdditionalParking: $("#lblMonthly_AditionalParking").text(),
                        ProratedAdditionalParking: $("#lblProrated_AditionalParking").text(),
                        StorageAmount: $("#lblMonthly_Storage").text(),
                        ProratedStorageAmount: $("#lblProrated_Storage").text(),
                        PetFee: $("#lblMonthly_PetRent").text(),
                        ProratedPetFee: $("#lblProrated_PetRent").text(),
                        MonthlyCharges: $("#lblMonthly_TotalRent").text(),
                        ProratedMonthlyCharges: $("#lblProrated_TotalRent").text(),
                        AppCreditFees: $("#hndAppCreditFees").val(),
                        AppBackgroundFees: $("#hndAppBackgroundFees").val(),
                        NumberOfPet: $("#hndPetPlaceCount").val(),
                        NumberOfParking: numofveh,
                        DueAtMoveIn: $("#lbtotdueatmov6").text()
                    };

                    $.ajax({
                        url: '/GenerateQuotation/SendQuotationEmail',
                        type: "post",
                        contentType: "application/json utf-8",
                        data: JSON.stringify(model),
                        dataType: "JSON",
                        success: function (response) {
                            window.location.replace("/Admin/GenerateQuotation/Index/0");
                        }
                    });
                }
            },
            no: {
                text: 'No',
                action: function (no) {
                    $("#divLoader").hide();
                }
            }
        }
    });
};

var getApplicantListsQuotation = function () {
    var model = {
        TenantID: $("#hdnOPId").val(),
    }
    $.ajax({
        url: "/Applicant/GetApplicantList",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            addApplicntArray = [];
            totpaid = 0;
            totnotpaid = 0;
            $("#tblApplicant").empty();
            $("#tblApplicant15>tbody").empty();
            $("#tblApplicant15p>tbody").empty();
            $("#tblRespo15>tbody").empty();
            $("#tblRespo15p>tbody").empty();
            $("#tblApplicantFinal").empty();
            $("#tblApplicantMinor").empty();
            $("#tblApplicantGuarantor").empty();
            $("#tblResponsibilityPay").empty();
            $("#tblPayment>tbody").empty();
            $("#tblEmailCoapplicant>tbody").empty();
            var totalFinalFees = 0;
            var noofapl = 0;
            var noofCapl = 0;
            var noofminor = 0;
            var noofgur = 0;
            var applicantFees = $("#lblApplicationFees").text();
            var guarantorFees = $("#lblGuarantorFees").text();

            var nofbed = $("#lblBed").text();
            var allowedAppli = 0;
            var allowedMinor = 0;
            var totalPeople = (parseInt(nofbed) * 2);


            $.each(response.model, function (elementType, elementValue) {

                if (elementValue.Type == "Co-Applicant") {
                    noofCapl += 1;
                }
                else if (elementValue.Type == "Minor") {
                    noofminor += 1;
                }
                else if (elementValue.Type == "Primary Applicant") {
                    noofapl += 1;
                }
                else {
                    noofgur += 1;
                }

                var html = '';
                var prhtml = '';
                var pprhtml = '';
                var emailhtml = '';
                if (elementValue.Type != "Primary Applicant") {
                    html += "<div class='col-sm-4 box-two proerty-item' id='div_" + elementValue.ApplicantID + "'>" +
                        "<div class='form-group col-sm-3 text-center'><br>" +
                        "<img src='/Content/assets/img/user.png' style='width:100px;'></div>" +
                        "<div class='form-group col-sm-9' style='margin-top: 10px !important;'><b>" + elementValue.FirstName + " " + elementValue.LastName + "</b><br/>" +
                        "<label> " + elementValue.Type + " </label><br/>" +
                        "<label><a href='javascript:void(0)' onclick='goToEditApplicantQuotation(" + elementValue.ApplicantID + ")'>Edit/Complete Information</a></label>&nbsp;&nbsp;&nbsp;&nbsp;" +
                        "<label><a href='javascript:void(0)' onclick='delApplicant(" + elementValue.ApplicantID + ")'><span class='fa fa-trash' ></span></a></label>";

                    //if (parseInt(elementValue.CreditPaid) == 0 && parseInt(elementValue.HasSSN) == 1) {
                    //    html += "<label><a href='javascript:void(0)' onclick='payFeePop(" + elementValue.ApplicantID + ",4)'>Pay Credit Check Fees</a></label>";
                    //} else if (parseInt(elementValue.CreditPaid) == 1 && parseInt(elementValue.BackGroundPaid) == 0) {
                    //    html += "<label><a href='javascript:void(0)' onclick='payFeePop(" + elementValue.ApplicantID + ",5)'>Pay Background Check Fees</a></label>";
                    //}
                    html += "</div><div><center><label><b>Status: " + elementValue.ComplStatus + "</b></label></center></div></div>";
                }
                else {
                    html += "<div class='col-sm-4 box-two proerty-item'>" +
                        "<div class='form-group col-sm-3 text-center'><br>" +
                        "<img src='/Content/assets/img/user.png' style='width:100px;'></div>" +
                        "<div class='form-group col-sm-9' style='margin-top: 10px !important;'><b>" + elementValue.FirstName + " " + elementValue.LastName + "</b><br/>" +

                        "<label>Primary Applicant</label><br/>" +
                        "<label><a href='javascript:void(0)' onclick='goToEditApplicantQuotation(" + elementValue.ApplicantID + ")'>Edit/Complete Information</a></label><br/>";
                    //if (parseInt(elementValue.CreditPaid) == 0 && parseInt(elementValue.HasSSN) == 1) {
                    //    html += "<label><a href='javascript:void(0)' onclick='payFeePop(" + elementValue.ApplicantID + ",4)'>Pay Credit Check Fees</a></label>";
                    //} else if (parseInt(elementValue.CreditPaid) == 1 && parseInt(elementValue.BackGroundPaid) == 0) {
                    //    html += "<label><a href='javascript:void(0)' onclick='payFeePop(" + elementValue.ApplicantID + ",5)'>Pay Background Check Fees</a></label>";
                    //}
                    html += "</div><div><center><label><b>Status: " + elementValue.ComplStatus + "</b></label></center></div></div>";
                }
                if (elementValue.Type == "Primary Applicant" || elementValue.Type == "Co-Applicant") {
                    prhtml += "<div class='row respo' data-id='" + elementValue.ApplicantID + "'><div class='col-sm-12  col-lg-2 box-padding'><div class='col-lg-12'></div>" +
                        "<div class='col-lg-12'>" + elementValue.Type + "</div><div class='col-lg-12'><b>" + elementValue.FirstName + " " + elementValue.LastName + "</b></div></div>" +
                        "<div class='col-sm-12  col-lg-5'><div class='col-lg-12'></div><div class='col-lg-12 box-padding'><b>Move In Charges</b></div><div class='row'><div class='col-lg-6'>" +
                        "<input class='input-box payper' type='text' id='txtpayper" + elementValue.ApplicantID + "' value='" + elementValue.MoveInPercentage + "'/><span class='input-box-span'><b>%</b></span></div><div class='col-lg-6'>" +
                        "<span class='input-box-span'><b>$</b></span><input class='input-box' value='" + parseFloat(elementValue.MoveInCharge).toFixed(2) + "' type='text'  id='txtpayamt" + elementValue.ApplicantID + "'/></div></div></div>" +
                        "<div class='col-sm-12  col-lg-5'><div class='col-lg-12'></div><div class='col-lg-12 box-padding'><b>Monthly Payment</b></div><div class='row'><div class='col-lg-6'>" +
                        "<input class='input-box payperMo' value='" + elementValue.MonthlyPercentage + "' type='text'  id='txtpayperMo" + elementValue.ApplicantID + "' /><span class='input-box-span'><b>%</b></span></div><div class='col-lg-6'><span class='input-box-span'><b>$</b></span><input class='input-box' value='" + parseFloat(elementValue.MonthlyPayment).toFixed(2) + "' type='text' id='txtpayamtMo" + elementValue.ApplicantID + "'/></div></div> </div>" +
                        "</div>";
                }
                if (elementValue.Type == "Primary Applicant" || elementValue.Type == "Co-Applicant" || elementValue.Type == "Guarantor") {
                    if (elementValue.Type == "Primary Applicant" || elementValue.Type == "Co-Applicant") {
                        if (parseInt(elementValue.CreditPaid) == 1) {
                            totpaid += parseFloat(elementValue.AppCreditFees);
                            pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Credit Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.AppCreditFees).toFixed(2) + "</td><td style='width:14%; padding:6px;text-align: center;'>Paid</td><td></td></tr>";
                        }
                        else {
                            if (elementValue.Type == "Primary Applicant") {
                                addApplicntArray.push({ ApplicantID: elementValue.ApplicantID, Type: 4 });
                                totalFinalFees += parseFloat(elementValue.AppCreditFees);
                                pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Credit Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.AppCreditFees).toFixed(2) + "</td><td style='width:14%; padding:6px;'><input type='checkbox' id='chkPayAppFees' checked disabled/></td><td></td></tr>";
                            } else {
                                pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Credit Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.AppCreditFees).toFixed(2) + "</td><td style='width:14%; padding:6px;'><input type='checkbox' class='chkPayAppFees" + elementValue.ApplicantID + "4' id='chkPayAppFees" + elementValue.ApplicantID + "' onclick='addAppFess(" + elementValue.AppCreditFees + "," + elementValue.ApplicantID + ",4)'/></td><td><input type='button' id='btnSendPayLink" + elementValue.ApplicantID + "4' style='width:150px;' onclick='sendPayLinkEmail(" + elementValue.AppCreditFees + "," + elementValue.ApplicantID + ",4,\"" + elementValue.Email + "\")' value='Send Payment Link'/></td></tr>";
                            }
                            totnotpaid += parseFloat(elementValue.AppCreditFees);
                        }
                        if (parseInt(elementValue.BackGroundPaid) == 1) {
                            totpaid += parseFloat(elementValue.AppBackGroundFees);
                            pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Background Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.AppBackGroundFees).toFixed(2) + "</td><td style='width:14%; padding:6px;text-align: center;'>Paid</td><td></td></tr>";
                        }
                        else {
                            if (elementValue.Type == "Primary Applicant") {
                                totalFinalFees += parseFloat(elementValue.AppBackGroundFees);
                                addApplicntArray.push({ ApplicantID: elementValue.ApplicantID, Type: 5 });
                                pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Background Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.AppBackGroundFees).toFixed(2) + "</td><td style='width:14%; padding:6px;'><input type='checkbox' id='chkPayAppFees'  checked disabled/></td><td></td></tr>";
                            } else {
                                pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Background Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.AppBackGroundFees).toFixed(2) + "</td><td style='width:14%; padding:6px;'><input type='checkbox' class='chkPayAppFees" + elementValue.ApplicantID + "5' id='chkPayAppFees" + elementValue.ApplicantID + "' onclick='addAppFess(" + elementValue.AppBackGroundFees + "," + elementValue.ApplicantID + ",5)'/></td><td><input type='button' id='btnSendPayLink" + elementValue.ApplicantID + "5' style='width:150px;' onclick='sendPayLinkEmail(" + elementValue.AppBackGroundFees + "," + elementValue.ApplicantID + ",5,\"" + elementValue.Email + "\")' value='Send Payment Link'/></td></tr>";
                            }
                            totnotpaid += parseFloat(elementValue.AppBackGroundFees);
                        }
                    }
                    else {
                        if (parseInt(elementValue.CreditPaid) == 1) {
                            totpaid += parseFloat(elementValue.GuarCreditFees);
                            pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Credit Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.GuarCreditFees).toFixed(2) + "</td><td style='width:14%; padding:6px;text-align: center;'>Paid</td><td></td></tr>";
                        }
                        else {
                            pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Credit Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.GuarCreditFees).toFixed(2) + "</td><td style='width:14%; padding:6px;'><input type='checkbox' class='chkPayAppFees" + elementValue.ApplicantID + "4' id='chkPayAppFees" + elementValue.ApplicantID + "' onclick='addAppFess(" + elementValue.GuarCreditFees + "," + elementValue.ApplicantID + ",4)'/></td><td><input type='button' id='btnSendPayLink" + elementValue.ApplicantID + "4' style='width:150px;' onclick='sendPayLinkEmail(" + elementValue.GuarCreditFees + "," + elementValue.ApplicantID + ",4,\"" + elementValue.Email + "\")' value='Send Payment Link'/></td></tr>";
                            totnotpaid += parseFloat(elementValue.GuarCreditFees);
                        }
                        if (parseInt(elementValue.BackGroundPaid) == 1) {
                            totpaid += parseFloat(elementValue.GuarBackGroundFees);
                            pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Backgroung Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.GuarBackGroundFees).toFixed(2) + "</td><td style='width:14%; padding:6px;text-align: center;'>Paid</td><td></td></tr>";
                        }
                        else {
                            pprhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:18%; padding:6px;'>" + elementValue.Type + " </td><td style='width:40%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + " (Background Check)</td><td style='width:14%; padding:6px;'>$" + parseFloat(elementValue.GuarBackGroundFees).toFixed(2) + "</td><td style='width:14%; padding:6px;'><input type='checkbox' class='chkPayAppFees" + elementValue.ApplicantID + "5' id='chkPayAppFees" + elementValue.ApplicantID + "' onclick='addAppFess(" + elementValue.GuarBackGroundFees + "," + elementValue.ApplicantID + ",5)'/></td><td><input type='button' id='btnSendPayLink" + elementValue.ApplicantID + "5' style='width:150px;' onclick='sendPayLinkEmail(" + elementValue.GuarBackGroundFees + "," + elementValue.ApplicantID + ",5,\"" + elementValue.Email + "\")' value='Send Payment Link'/></td></tr>";
                            totnotpaid += parseFloat(elementValue.GuarBackGroundFees);
                        }

                    }
                }
                if (elementValue.Type == "Co-Applicant" || elementValue.Type == "Guarantor") {
                    //Sachin's work 22-10
                    $("#btnsendemail").removeClass("hidden");
                    if (elementValue.Email != null) {
                        emailhtml += "<tr data-id='" + elementValue.ApplicantID + "'><td style='width:20%; padding:6px;'>" + elementValue.FirstName + " " + elementValue.LastName + "</td><td style='width:18%; padding:6px;'>" + elementValue.Email + " </td><td style='width:30%; padding:6px;'><input type='checkbox' onclick='addEmail(\"" + elementValue.Email + "\")' id='chkEmail" + elementValue.ApplicantID + "' style='width:25%; border:1px solid;' /></td></tr>";
                    }
                }

                if (elementValue.Type == "Minor") {
                    $("#tblApplicantMinor").append(html);
                }
                else if (elementValue.Type == "Guarantor") {
                    $("#tblApplicantGuarantor").append(html);
                }
                else {
                    $("#tblApplicant").append(html);
                    $("#tblApplicantFinal").append(html);
                }

                var html15 = "<tr id='tr_" + elementValue.ApplicantID + "' data-value='" + elementValue.ApplicantID + "'>";

                html15 += "<td>" + elementValue.FirstName + " " + elementValue.LastName + "</td>";
                html15 += "<td>" + elementValue.Type + "</td>";
                html15 += "<td>" + elementValue.GenderString + "</td>";
                html15 += "<td>" + elementValue.Email + "</td>";
                html15 += "<td>" + elementValue.Phone + "</td>";
                html15 += "<td>" + elementValue.DateOfBirthTxt + "</td>";

                html15 += "</tr>";
                $("#tblApplicant15>tbody").append(html15);
                $("#tblApplicant15p>tbody").append(html15);

                if (elementValue.Type == "Primary Applicant") {
                    var htmlResp15 = "<tr id='tr_" + elementValue.ApplicantID + "' data-value='" + elementValue.ApplicantID + "'>";
                    htmlResp15 += "<td> " + elementValue.FirstName + " " + elementValue.LastName + "</td>";
                    htmlResp15 += "<td> " + elementValue.Type + "</td>";
                    htmlResp15 += "<td> " + elementValue.MoveInPercentage + "%</td>";
                    htmlResp15 += "<td> $" + formatMoney(elementValue.MoveInCharge) + "</td>";
                    htmlResp15 += "<td> " + elementValue.MonthlyPercentage + "%</td>";
                    htmlResp15 += "<td> $" + formatMoney(elementValue.MonthlyPayment) + "</td>";
                    htmlResp15 += "</tr>";
                }

                $("#tblRespo15>tbody").append(htmlResp15);
                $("#tblRespo15p>tbody").append(htmlResp15);

                $("#tblResponsibilityPay").append(prhtml);
                $("#tblPayment>tbody").append(pprhtml);
                $("#tblEmailCoapplicant>tbody").append(emailhtml);

                if (elementValue.Type == "Primary Applicant") {
                    if ($("#txtpayper" + elementValue.ApplicantID).val() == 0) {
                        $("#txtpayper" + elementValue.ApplicantID).val(100);
                        checkPercentage();
                    }
                    if ($("#txtpayperMo" + elementValue.ApplicantID).val() == 0) {
                        $("#txtpayperMo" + elementValue.ApplicantID).val(100);
                        checkPercentage();
                    }
                }

                function checkPercentage() {
                    var chargesPecentage = $("#txtpayper" + elementValue.ApplicantID).val();
                    var perCharges = ((chargesPecentage * parseFloat(unformatText($("#lbtotdueatmov6").text()))) / 100);
                    $("#txtpayamt" + elementValue.ApplicantID).val(perCharges.toFixed(2));


                    var sum = parseFloat(0);
                    $(".payper").each(function () {
                        sum += parseFloat(this.value);

                    });
                    localStorage.setItem("percentage", sum);

                    var chargesAmount = $("#txtpayamt" + elementValue.ApplicantID).val();
                    var chargesPer = ((chargesAmount * 100) / parseFloat(unformatText($("#lbtotdueatmov6").text())));
                    $("#txtpayper" + elementValue.ApplicantID).val(parseFloat(chargesPer).toFixed(2));

                    var monthlyPercentage = $("#txtpayperMo" + elementValue.ApplicantID).val();
                    var monthlyPayment = unformatText($("#lblRFPTotalMonthlyPayment").text());
                    var perMonth = ((monthlyPercentage * parseFloat(monthlyPayment, 10)) / 100);
                    $("#txtpayamtMo" + elementValue.ApplicantID).val(parseFloat(perMonth).toFixed(2));

                    var sumMo = parseFloat(0);
                    $(".payperMo").each(function () {
                        sumMo += parseFloat(this.value);

                    });
                    localStorage.setItem("percentageMo", sumMo);
                }

                $("#txtpayper" + elementValue.ApplicantID).keyup(function () {
                    var chargesPecentage = parseFloat($("#txtpayper" + elementValue.ApplicantID).val());
                    var perCharges = ((chargesPecentage * parseFloat(unformatText($("#lbtotdueatmov6").text()))) / 100);
                    $("#txtpayamt" + elementValue.ApplicantID).val(formatMoney(perCharges.toFixed(2)));
                    var sum = parseFloat(0);
                    $(".payper").each(function () {
                        sum += parseFloat(this.value);
                    });
                    localStorage.setItem("percentage", sum);
                }).keypress(function (event) { return nonNegDecimal(event, $(this)); }).focusout(function () {
                    $("#txtpayper" + elementValue.ApplicantID).val(parseFloat(($("#txtpayper" + elementValue.ApplicantID).val()).toFixed(2)));
                });

                $("#txtpayamt" + elementValue.ApplicantID).keyup(function () {
                    var chargesAmount = unformatText($("#txtpayamt" + elementValue.ApplicantID).val());
                    var chargesPer = ((chargesAmount * 100) / parseFloat(unformatText($("#lbtotdueatmov6").text())));
                    $("#txtpayper" + elementValue.ApplicantID).val(chargesPer.toFixed(2));
                    var sum = parseFloat(0);
                    $(".payper").each(function () {
                        sum += parseFloat(this.value);
                    });
                    localStorage.setItem("percentage", sum);

                }).keypress(function (event) { return nonNegDecimal(event, $(this)); }).focusout(function () {
                    $("#txtpayamt" + elementValue.ApplicantID).val(formatMoney(unformatText($("#txtpayamt" + elementValue.ApplicantID).val())));
                });

                $("#txtpayperMo" + elementValue.ApplicantID).keyup(function () {
                    var monthlyPercentage = $("#txtpayperMo" + elementValue.ApplicantID).val();
                    var monthlyPayment = unformatText($("#lblRFPTotalMonthlyPayment").text());
                    var perMonth = ((monthlyPercentage * parseFloat(monthlyPayment, 10)) / 100);
                    $("#txtpayamtMo" + elementValue.ApplicantID).val(formatMoney(parseFloat(perMonth).toFixed(2)));
                    var sumMo = parseFloat(0);
                    $(".payperMo").each(function () {
                        sumMo += parseFloat(this.value);

                    });
                    localStorage.setItem("percentageMo", sumMo);
                }).keypress(function (event) { return nonNegDecimal(event, $(this)); }).focusout(function () {
                    $("#txtpayperMo" + elementValue.ApplicantID).val(parseFloat(($("#txtpayperMo" + elementValue.ApplicantID).val()).toFixed(2)));
                });

                $("#txtpayamtMo" + elementValue.ApplicantID).keyup(function () {
                    var perMonth = unformatText($("#txtpayamtMo" + elementValue.ApplicantID).val());
                    var monthlyPayment = unformatText($("#lblRFPTotalMonthlyPayment").text());
                    var monthlyPercentage = ((perMonth * 100) / parseFloat(monthlyPayment, 10));
                    $("#txtpayperMo" + elementValue.ApplicantID).val(monthlyPercentage.toFixed(2));

                    var sumMo = parseFloat(0);
                    $(".payperMo").each(function () {
                        sumMo += parseFloat(this.value);

                    });
                    localStorage.setItem("percentageMo", sumMo);
                }).keypress(function (event) { return nonNegDecimal(event, $(this)); }).focusout(function () {
                    $("#txtpayamtMo" + elementValue.ApplicantID).val(formatMoney(unformatText($("#txtpayamtMo" + elementValue.ApplicantID).val())));
                });

                var sum = parseFloat(0);
                $(".payper").each(function () {
                    sum += parseFloat(this.value);

                });
                localStorage.setItem("percentage", sum);
                var sumMo = parseFloat(0);
                $(".payperMo").each(function () {
                    sumMo += parseFloat(this.value);

                });
                localStorage.setItem("percentageMo", sumMo);
            });
            var totalAppl = noofapl;
            var newtotalAppl = (parseInt(noofapl) - 1);
            var totalCoAppl = noofCapl;
            var totalMinor = noofminor;
            var total = 0;
            if (nofbed == 1) {
                total = parseInt(noofapl) + parseInt(totalCoAppl) + parseInt(totalMinor);
                if (totalCoAppl <= parseInt(totalPeople) - 1) {
                    if (total <= parseInt(totalPeople) - 1) {
                        $("#tblApplicant").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(1)'><i class='fa fa-plus-circle'></i> Add Co-Applicant</a></label></div></div></div></div>");
                    }
                }
                if (totalMinor <= parseInt(totalPeople) - 1) {
                    if (total <= parseInt(totalPeople) - 1) {
                        $("#tblApplicantMinor").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(2)'><i class='fa fa-plus-circle'></i> Add Minor</a></label></div></div></div></div>");
                    }
                }
            }
            else if (nofbed == 2) {
                total = parseInt(noofapl) + parseInt(totalCoAppl) + parseInt(totalMinor);
                if (total <= parseInt(totalPeople) - 1) {
                    if (totalCoAppl < 2) {
                        if (total < parseInt(totalPeople)) {
                            $("#tblApplicant").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(1)'><i class='fa fa-plus-circle'></i> Add Co-Applicant</a></label></div></div></div></div>");
                            if (totalMinor <= 1) {
                                $("#tblApplicantMinor").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(2)'><i class='fa fa-plus-circle'></i> Add Minor</a></label></div></div></div></div>");
                            }
                        }
                    }
                    else if (totalMinor < 2) {
                        if (total < parseInt(totalPeople)) {
                            $("#tblApplicantMinor").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(2)'><i class='fa fa-plus-circle'></i> Add Minor</a></label></div></div></div></div>");
                            if (totalCoAppl <= 1) {
                                $("#tblApplicant").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(1)'><i class='fa fa-plus-circle'></i> Add Co-Applicant</a></label></div></div></div></div>");
                            }
                        }
                    }
                }
            }
            else if (nofbed == 3) {
                total = parseInt(noofapl) + parseInt(totalCoAppl) + parseInt(totalMinor);
                if (total <= parseInt(totalPeople) - 1) {
                    if (totalCoAppl < 3) {
                        if (total < parseInt(totalPeople)) {
                            $("#tblApplicant").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(1)'><i class='fa fa-plus-circle'></i> Add Co-Applicant</a></label></div></div></div></div>");
                            if (totalMinor <= 2) {
                                $("#tblApplicantMinor").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(2)'><i class='fa fa-plus-circle'></i> Add Minor</a></label></div></div></div></div>");
                            }
                        }
                    }
                    else if (totalMinor < 3) {
                        if (total < parseInt(totalPeople)) {
                            $("#tblApplicantMinor").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(2)'><i class='fa fa-plus-circle'></i> Add Minor</a></label></div></div></div></div>");
                            if (totalCoAppl <= 2) {
                                $("#tblApplicant").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(1)'><i class='fa fa-plus-circle'></i> Add Co-Applicant</a></label></div></div></div></div>");
                            }
                        }
                    }
                }
            }
            if (noofgur == 0) {
                $("#tblApplicantGuarantor").append("<div class='col-sm-3 box-two proerty-item'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><div class='form-group col-sm-12'><label></br><a href='javascript:void(0)' id='btnAddApplicant' onclick='addApplicantQuotation(3)'><i class='fa fa-plus-circle'></i> Add Guarantor</a></label></div></div></div></div>");
            }
            $("#totalFinalFees").text("$" + parseFloat(totalFinalFees).toFixed(2));
        }
    });
};

var getPropertyFloarListRebindQuotation = function (modelname, filldata) {
    $("#imgFloorCoordinate").attr("src", "");
    $("#imgFloorCoordinateDiv").empty();
    $('#popUnitPlan').empty();
    $("#divLoader").show();

    var maxrent = 0;
    if ($("#txtMaxRent").val() == "0") {
        maxrent = 100000;
    }
    else {
        maxrent = $("#txtMaxRent").val();
    }

    var bedroom = 0;
    if (!$("#ddlRoom").val()) {
        bedroom = 0;
    }
    else {
        bedroom = $("#ddlRoom").val();
    }
    var availdate = $("#txtDate_Quotation").val();
    var leasetermid = $("#hndLeaseTermID").val();

    var prospectid = $("#hdnOPId").val();

    var model = { PID: 8, AvailableDate: availdate, Bedroom: bedroom, MaxRent: maxrent, ModelName: modelname, ProspectId: prospectid, LeaseTermID: leasetermid };

    $.ajax({
        url: "/Property/GetFloorListRebind/",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            if (response != null) {
                $("#floorImgdiv").empty();

                var html = "";

                $.each(response, function (elementType, value) {
                    html += "<area id='fa_" + value.FloorID + "' data-aval=" + value.IsAvail + " data-floorid=" + value.FloorID + " shape='poly' class='tooltip buildplan' href='javascript:void(0);' coords=" + value.Coordinates + " onclick= 'getPropertyUnitListByFloor(" + value.FloorID + ")'/>";
                    html += "<div id='dfa_" + value.FloorID + "' class='hidden divtooltip'>";
                    html += "</div>";
                    $("#floorImgdiv").append(html);
                });

                $('#popUnitPlan').empty();
                $("#apartimg_2").maphilight();
                $('area').click(function () {
                    $("#hndSelectedFloor").val($(this).attr("id"));
                    $("#hndSelectedAval").val($(this).attr("data-aval"));
                    var floorid = $(this).attr("data-floorid");
                    $("#dfa_" + floorid).addClass("hidden");
                    var isAval = $(this).attr("data-aval");
                    var color = "ff6347";
                    if (isAval == 1) {
                        color = "0af11c";
                    }
                    else if (isAval == 2) {
                        color = "ffff00";
                    }
                    $('.active_area').data('maphilight', { alwaysOn: false }).trigger('alwaysOn.maphilight');
                    $(this).addClass('active_area').data('maphilight', { alwaysOn: true, fillColor: color, strokeColor: color }).trigger('alwaysOn.maphilight');
                });
                $("area").mouseout(function (e) {
                    $(".divtooltip").addClass("hidden");
                });

                $("area").mouseover(function (e) {
                    var offset = $(this).offset();
                    var X = (e.pageX - offset.left);
                    var Y = (e.pageY - offset.top);

                    console.log("X:" + X + ", Y:" + Y);

                    if (Y < 0) {
                        Y = Y + 200;
                    }
                    else {
                        Y = Y - 75;
                    }

                    var floorid = $(this).attr("data-floorid");
                    $(".divtooltip").addClass("hidden");
                    $("#dfa_" + floorid).removeClass("hidden");

                    $("#dfa_" + floorid).css({ top: Y, left: X, position: 'absolute' });

                    var isAval = $(this).attr("data-aval");
                    var color = "ff6347";
                    if (isAval == 1) {
                        color = "0af11c";
                    }
                    else if (isAval == 2) {
                        color = "ffff00";
                    }
                    $(this).addClass('active_mouse').data('maphilight', { alwaysOn: true, fillColor: color, strokeColor: color }).trigger('alwaysOn.maphilight');
                    if ($("#hndSelectedFloor").val()) {
                        var cont = $("#hndSelectedFloor").val();
                        var isAvalFill = $("#hndSelectedAval").val();
                        var colorfill = "ff6347";
                        if (isAvalFill == 1) {
                            colorfill = "0af11c";
                        }
                        else if (isAvalFill == 2) {
                            colorfill = "ffff00";
                        }
                        $("#" + cont).addClass('active_area').data('maphilight', { alwaysOn: true, fillColor: colorfill, strokeColor: colorfill }).trigger('alwaysOn.maphilight');
                    }
                });
                $(".buildplan").mouseout(function () {
                    $(".buildplan").removeClass('active_mouse').data('maphilight', { alwaysOn: false }).trigger('alwaysOn.maphilight');

                    if ($("#hndSelectedFloor").val()) {
                        var cont = $("#hndSelectedFloor").val();
                        var isAval = $("#hndSelectedAval").val();
                        var color = "ff6347";
                        if (isAval == 1) {
                            color = "0af11c";
                        }
                        else if (isAval == 2) {
                            color = "ffff00";
                        }
                        $("#" + cont).addClass('active_area').data('maphilight', { alwaysOn: true, fillColor: color, strokeColor: color }).trigger('alwaysOn.maphilight');
                    }
                });
            }
        }
    });
}

var getStaticApplicantValuesGenearateQuotation = function () {
    $("#divLoader").show();
    var id = $("#hdnUserId").val();
    var uid = $("#hndUID").val();
    var model = { Id: id, UID: uid };

    $.ajax({
        url: '/ApplyNow/GetStaticApplicantValues',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            /*Select Option Starts*/
            $("#lblArea").text(response.model.AreaSqft);
            $("#lblLease").text(response.model.LeaseMonths);
            $("#lblBed").text(response.model.Bedroom);
            $("#lblBath").text(response.model.Bathroom);
            $("#lblDeposit").text(formatMoney(response.model.Deposit));
            //console.log("label: " +$("#lblDeposit").text());
            $("#lblRent").text(formatMoney(response.model.Rent));
            $("#lblLease2").text(response.model.LeaseMonths);
            $("#lbldeposit1").text(formatMoney(response.model.Deposit));
            $("#lblPetDeposit").text(formatMoney(response.model.PetDeposit));
            $("#lblPetDNAAmt").text(formatMoney(response.model.PetDNAAmt));
            $("#lblFMRent").text(formatMoney(unformatText($("#lblRent").text())));
            $("#lblRent33").text(formatMoney(unformatText($("#lblRent").text())));
            $("#lblAdditionalParking").text(formatMoney(response.model.AdditionalParkingAmt));
            $("#lblStorageUnit").text(formatMoney(response.model.StorageAmt));
            $("#lblPetFee").text(formatMoney(response.model.PetPlaceAmt));
            $("#lblTrashAmt").text(formatMoney(response.model.TrashAmt));
            $("#lblPestAmt").text(formatMoney(response.model.PestAmt));
            $("#lblConvergentAmt").text(formatMoney(response.model.ConvergentAmt));
            var totalAmt = (parseFloat(response.model.Rent) + parseFloat(unformatText($("#lblAdditionalParking").text())) + parseFloat(unformatText($("#lblStorageUnit").text())) + parseFloat(unformatText($("#lblTrashAmt").text())) + parseFloat($("#lblPestAmt").text()) + parseFloat($("#lblConvergentAmt").text()) + parseFloat(unformatText($("#lblPetFee").text()))).toFixed(2);
            $("#lbltotalAmount").text(formatMoney(totalAmt));
            /*Select Option Ends*/
            /*Quotation Starts*/
            $("#lblFNLQuoteDate").text(response.model.QuoteStartDate);
            $("#lblFNLQuoteExpires").text(response.model.QuoteEndDate);
            $("#lblFNLPhone").text(formatPhoneFax(response.model.Phone));
            $("#lblFNLEmail").text(response.model.Email);
            $("#lblFNLTerm").text(response.model.LeaseMonths);
            $("#lblFNLResidentName1").text(response.model.ResidentName);
            $("#lblFNLDesiredMoveIn").text(response.model.MoveInDateString);
            $("#lblFNLUnit").text("#" + response.model.UnitName);
            $("#lblFNLModel").text(response.model.Building);
            $("#fdepo").text("$" + $("#lbldeposit1").text());
            $("#lblMonthly_MonthlyCharge").text("$" + $("#lblRent").text());
            // console.log(unformatText($("#lblRent").text()))
            $("#lblProrated_MonthlyCharge").text("$" + formatMoney(parseFloat(parseFloat(unformatText($("#lblRent").text())) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#spanTrashRecycle").text("$" + $("#lblTrashAmt").text());
            // $("#lblProrated_TrashAmt").text("$" + parseFloat($("#lblTrashAmt").text() / parseFloat(numberOfDays) * remainingday));
            $("#lblProrated_TrashAmt").text("$" + formatMoney(parseFloat(parseFloat(unformatText($("#lblTrashAmt").text())) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#spanPestControl").text("$" + $("#lblPestAmt").text());
            //$("#lblProrated_PestAmt").text("$" + parseFloat($("#lblPestAmt").text() / parseFloat(numberOfDays) * remainingday));
            $("#lblProrated_PestAmt").text("$" + formatMoney(parseFloat(parseFloat(unformatText($("#lblPestAmt").text())) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#spanConvergentAmt").text("$" + $("#lblConvergentAmt").text());
            //$("#lblProrated_ConvergentAmt").text("$" + parseFloat($("#lblConvergentAmt").text() / parseFloat(numberOfDays) * remainingday));
            $("#lblProrated_ConvergentAmt").text("$" + formatMoney(parseFloat(parseFloat(unformatText($("#lblConvergentAmt").text())) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#lblMonthly_AditionalParking").text("$" + $("#lblAdditionalParking").text());
            //$("#lblProrated_AditionalParking").text("$" + parseFloat($("#lblAdditionalParking").text() / parseFloat(numberOfDays) * remainingday));
            $("#lblProrated_AditionalParking").text("$" + formatMoney(parseFloat(parseFloat(unformatText($("#lblAdditionalParking").text())) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#lblMonthly_Storage").text("$" + $("#lblStorageUnit").text());
            //$("#lblProrated_Storage").text("$" + parseFloat($("#lblStorageUnit").text() / parseFloat(numberOfDays) * remainingday));
            $("#lblProrated_Storage").text("$" + formatMoney(parseFloat(parseFloat(unformatText($("#lblStorageUnit").text())) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            $("#lblMonthly_PetRent").text("$" + $("#lblPetFee").text());
            //$("#lblProrated_PetRent").text("$" + parseFloat($("#lblPetFee").text() / parseFloat(numberOfDays) * remainingday));
            $("#lblProrated_PetRent").text("$" + formatMoney(parseFloat(parseFloat(unformatText($("#lblPetFee").text())) / parseFloat(numberOfDays) * remainingday).toFixed(2)));
            var totalRentAmt = formatMoney(parseFloat(unformatText($("#lblMonthly_MonthlyCharge").text().replace('$', ''))) + parseFloat($("#spanTrashRecycle").text().replace('$', '')) + parseFloat($("#spanPestControl").text().replace('$', '')) + parseFloat($("#spanConvergentAmt").text().replace('$', '')) + parseFloat($("#lblMonthly_AditionalParking").text().replace('$', '')) + parseFloat($("#lblMonthly_Storage").text().replace('$', '')) + parseFloat($("#lblMonthly_PetRent").text().replace('$', '')));
            var totalRentAmt_Prorated = formatMoney(parseFloat(unformatText($("#lblProrated_MonthlyCharge").text().replace('$', ''))) + parseFloat($("#lblProrated_TrashAmt").text().replace('$', '')) + parseFloat($("#lblProrated_PestAmt").text().replace('$', '')) + parseFloat($("#lblProrated_ConvergentAmt").text().replace('$', '')) + parseFloat($("#lblProrated_AditionalParking").text().replace('$', '')) + parseFloat($("#lblProrated_Storage").text().replace('$', '')) + parseFloat($("#lblProrated_PetRent").text().replace('$', '')));

            $("#lblMonthly_TotalRent").text(totalRentAmt);
            $("#lblProrated_TotalRent").text(totalRentAmt_Prorated);

            /*Quotation Ends*/
            /*Responsibility left block Start*/

            $("#lblVehicleFees1").text(formatMoney(response.model.VehicleRegistration));
            $("#lbdepo6").text(formatMoney(response.model.Deposit));
            // $("#lbdepo6").text(formatMoney(response.model.Deposit));
            $("#lbpetd6").text(formatMoney(response.model.PetDeposit));
            $("#lbpetdna6").text(formatMoney(response.model.PetDNAAmt));
            $("#lblProratedRent6").text(formatMoney(response.model.Prorated_Rent));
            $("#lbtotdueatmov6").text(formatMoney(response.model.MoveInCharges));

            $("#lblRFPMonthlyCharges").text(formatMoney(response.model.Rent));
            $("#lblRFPAdditionalParking").text(formatMoney(response.model.AdditionalParkingAmt));
            $("#lblRFPStorageUnit").text(formatMoney(response.model.StorageAmt));
            $("#lblRFPPetRent").text(formatMoney(response.model.PetPlaceAmt));
            $("#lblRFPTrashRecycling").text(formatMoney(response.model.TrashAmt));
            $("#lblRFPPestControl").text(formatMoney(response.model.PestAmt));
            $("#lblRFPConvergentbillingfee").text(formatMoney(response.model.ConvergentAmt));
            $("#lblRFPTotalMonthlyPayment").text(formatMoney(response.model.MonthlyCharges));

            /*Responsibility left block Ends*/

        }
    });
};