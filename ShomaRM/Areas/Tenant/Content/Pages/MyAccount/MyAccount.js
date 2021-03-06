﻿$(document).ready(function () {
    focuss();
    getServiceRequestOnAlarmMyAccount();
    onFocusMyAccount();
    breakdownPaymentFunctionMyAcc();

    //getPaymentAccountsCreditCard();
    getBankCCLists();
    getTransationLists();
    getUpTransationLists();
    getRecurringPayLists();
    fromDashboardGoToRecurringPayment();
    fromDashboardGoToMakePayment();
    fromDashboardGoToRegisterGuest();
    fromDashboardGoToReserveAmenities();
    amountToPayRadioButtonFunction();
    radioButtonPaymentMethodMakePayment();
    fromDashboardGoToSubmitServiceRequest();
    ddlPaymentMethod();
    //fillDropdowns();
    getLeaseInfoDocuments();
    getPetLeaseInfoDocuments();
    getVehicleLeaseInfoDocuments();
    getAmenityList();
    getReservationRequestList();
    getTenantData($("#hndTenantID").val());


    $("#rulesBBQ,#rulesPC,#rulesCR, #rulesYoga,#rulesSocc").on("click", function () {
        $("#reservationRules").modal('show');
    });

    $("#ddlAmenities").on("change", function () {
        var selectedOption = $(this).val();
        clearDateTime();
        if (selectedOption > 0) {
            $('#reserveAmenity').modal('show');
            $("#divSoc, #divClubroom, #divBBQ, #divPoolCabana, #divYog").addClass("hidden");
            $(".modal-title").html("");
            if (selectedOption == 1) {
                $("#divSoc").removeClass("hidden");
                $(".modal-title,.print-title").html("SOCCER/RECREATIONAL FIELD");
            }
            else if (selectedOption == 3) {
                $("#divClubroom").removeClass("hidden");
                $(".modal-title,.print-title").html("CLUBROOM/CLUBROOM WITH COURTYARD");

            }
            else if (selectedOption == 11) {
                $("#divBBQ").removeClass("hidden");
                $(".modal-title,.print-title").html("BBQ AREA");
            }
            else if (selectedOption == 12) {
                $("#divPoolCabana").removeClass("hidden");
                $(".modal-title,.print-title").html("POOL CABANAS");
            }
            else if (selectedOption == 13) {
                $("#divYog").removeClass("hidden");
                $(".modal-title,.print-title").html("YOGA/MEDITATION LAWN");
            }
        }
        else {
            $(".modal-title,.print-title").html("");
            return;
        }

    });


    $('input[type=radio][name=hoursSoccer]').on('ifChanged', function (event) {
        $("#txtDesiredTimeSoccerFrom").val("");
        $("#txtDesiredTimeSoccerTo").val("");
        if ($(this).is(":checked")) {
            var selectedID = $(this).attr("id");

            if (selectedID == "SO_2h200depo") {
                $("#hdnSoccHours").val(2);

            }
            else if (selectedID == "SO_4h400depo") {
                $("#hdnSoccHours").val(4);

            }
        }
    });
    $('input[type=radio][name=hoursBBQ]').on('ifChanged', function (event) {
        $("#txtDesiredTimeBBQFrom").val("");
        $("#txtDesiredTimeBBQTo").val("");
        if ($(this).is(":checked")) {
            var selectedID = $(this).attr("id");
            $("#hrs_2h50depo").attr("disabled", true).val("");
            $("#hrs_4h100depo").attr("disabled", true).val("");
            $("#lmt_2h10gues").attr("disabled", true).val("");
            $("#lmt_4h10gues").attr("disabled", true).val("");
            if (selectedID == "2h50depo") {
                $("#hrs_2h50depo").attr("disabled", false);
                $("#2h10gues").iCheck("check");
                $("#hdnBBQHours").val(2);
            }
            else if (selectedID == "4h100depo") {
                $("#hrs_4h100depo").attr("disabled", false);
                $("#4h10gues").iCheck("check");
                $("#hdnBBQHours").val(4);
            }
            else if (selectedID == "2h300depo") {
                $("#2h30gues").iCheck("check");
                $("#hdnBBQHours").val(2);
            }
            else if (selectedID == "4h600depo") {
                $("#4h30gues").iCheck("check");
                $("#hdnBBQHours").val(4);
            }
        }
    });

    $('input[type=radio][name=limitBBQ]').on('ifChanged', function (event) {
        $("#txtDesiredTimeBBQFrom").val("");
        $("#txtDesiredTimeBBQTo").val("");
        if ($(this).is(":checked")) {
            var selectedID = $(this).attr("id");
            $("#hrs_2h50depo").attr("disabled", true).val("");
            $("#hrs_4h100depo").attr("disabled", true).val("");
            $("#lmt_2h10gues").attr("disabled", true).val("");
            $("#lmt_4h10gues").attr("disabled", true).val("");
            if (selectedID == "2h10gues") {
                $("#hrs_2h50depo").attr("disabled", false);
                $("#2h50depo").iCheck("check");
            }
            else if (selectedID == "4h10gues") {
                $("#hrs_4h100depo").attr("disabled", false);
                $("#4h100depo").iCheck("check");
            }
            else if (selectedID == "2h30gues") {
                $("#2h300depo").iCheck("check");
            }
            else if (selectedID == "4h30gues") {
                $("#4h600depo").iCheck("check");
            }
        }
    });


    $('input[type=radio][name=hoursPC]').on('ifChanged', function (event) {
        $("#txtDesiredTimePCFrom").val("");
        $("#txtDesiredTimePCTo").val("");
        if ($(this).is(":checked")) {
            var selectedID = $(this).attr("id");
            if (selectedID == "PC_2h250depo") {
                $("#PC_2h5gues").iCheck("check");
                $("#hdnPCHours").val(2);

            }
            else if (selectedID == "PC_4h100depo") {
                $("#PC_4h5gues").iCheck("check");
                $("#hdnPCHours").val(4);
            }
            else if (selectedID == "PC_2h450depo") {
                $("#PC_2h12gues").iCheck("check");
                $("#hdnPCHours").val(2);
            }
            else if (selectedID == "PC_4h600depo") {
                $("#PC_4h12gues").iCheck("check");
                $("#hdnPCHours").val(4);
            }
        }
    });

    $('input[type=radio][name=limitPC]').on('ifChanged', function (event) {
        $("#txtDesiredTimePCFrom").val("");
        $("#txtDesiredTimePCTo").val("");
        if ($(this).is(":checked")) {
            var selectedID = $(this).attr("id");
            if (selectedID == "PC_2h5gues") {
                $("#PC_2h250depo").iCheck("check");
                $("#hdnPCHours").val(2);
            }
            else if (selectedID == "PC_4h5gues") {
                $("#PC_4h100depo").iCheck("check");
                $("#hdnPCHours").val(4);
            }
            else if (selectedID == "PC_2h12gues") {
                $("#PC_2h450depo").iCheck("check");
                $("#hdnPCHours").val(2);
            }
            else if (selectedID == "PC_4h12gues") {
                $("#PC_4h600depo").iCheck("check");
                $("#hdnPCHours").val(4);
            }
        }
    });

    $('input[type=radio][name=hoursCR]').on('ifChanged', function (event) {
        $("#txtDesiredTimeClubroomFrom").val("");
        $("#txtDesiredTimeClubroomTo").val("");
        if ($(this).is(":checked")) {
            var selectedID = $(this).attr("id");
            if (selectedID == "CR_3h500depo") {
                $("#CR_75person").iCheck("check");
                $("#CR_5h1000depo").iCheck("uncheck");
                $("#hdnClubHours").val(3);

            }
            else if (selectedID == "CR_5h1000depo") {
                $("#CR_75person").iCheck("check");
                $("#CR_3h500depo").iCheck("uncheck");
                $("#hdnClubHours").val(5);
            }
            else if (selectedID == "CR_cy1500") {
                $("#CR_150person").iCheck("check");
                $("#hdnClubHours").val(5);
            }
        }
    });

    $('input[type=radio][name=limitCR]').on('ifChanged', function (event) {
        $("#txtDesiredTimeClubroomFrom").val("");
        $("#txtDesiredTimeClubroomTo").val("");
        if ($(this).is(":checked")) {
            var selectedID = $(this).attr("id");
            if (selectedID == "CR_75person") {
                $("#CR_5h1000depo").iCheck("check");
                $("#hdnClubHours").val(5);
            }
            else if (selectedID == "CR_150person") {
                $("#CR_cy1500").iCheck("check");
                $("#hdnClubHours").val(5);
            }
        }
    });

    $("#txtDesiredTime").timepicki({
        on_change: function () {
            $("#SelectedTime").html($("#txtDesiredTime").val());
        }
    });

    $("#txtDesiredTimeBBQFrom").timepicki({
        on_change: function () {
            //  //console.log($("#hdnBBQHours").val());
            var value = "2000-01-01 " + convertTo24Hour($("#txtDesiredTimeBBQFrom").val());
            var startdate = new Date(value);
            var hrs = parseFloat($("#hdnBBQHours").val());
            startdate.setHours(startdate.getHours() + hrs);
            var hours = startdate.getHours();
            var minutes = startdate.getMinutes('00');
            var sHours = hours.toString();
            var sMinutes = minutes.toString();
            if (hours < 10) sHours = "0" + sHours;
            if (minutes < 10) sMinutes = "0" + sMinutes;
            var endtime = convertTo12Hour(sHours + ":" + sMinutes);

            $("#txtDesiredTimeBBQTo").val(endtime);
            $("#txtDesiredTimeBBQTo").attr("value", endtime);
            $("#txtDesiredTimeBBQFrom").attr("value", $("#txtDesiredTimeBBQFrom").val());
        }
    });

    $("#txtDesiredTimePCFrom").timepicki({
        on_change: function () {
            var value = "2000-01-01 " + convertTo24Hour($("#txtDesiredTimePCFrom").val());
            var startdate = new Date(value);
            var hrs = parseFloat($("#hdnPCHours").val());
            startdate.setHours(startdate.getHours() + hrs);
            var hours = startdate.getHours();
            var minutes = startdate.getMinutes();
            var sHours = hours.toString();
            var sMinutes = minutes.toString();
            if (hours < 10) sHours = "0" + sHours;
            if (minutes < 10) sMinutes = "0" + sMinutes;
            var endtime = convertTo12Hour(sHours + ":" + sMinutes);

            $("#txtDesiredTimePCTo").val(endtime);
            $("#txtDesiredTimePCTo").attr("value", endtime);
            $("#txtDesiredTimePCFrom").attr("value", $("#txtDesiredTimePCFrom").val());
        }
    });

    $("#txtDesiredTimeClubroomFrom").timepicki({
        on_change: function () {
            var value = "2000-01-01 " + convertTo24Hour($("#txtDesiredTimeClubroomFrom").val());
            var startdate = new Date(value);
            var hrs = parseFloat($("#hdnClubHours").val());
            startdate.setHours(startdate.getHours() + hrs);
            var hours = startdate.getHours();
            var minutes = startdate.getMinutes();
            var sHours = hours.toString();
            var sMinutes = minutes.toString();
            if (hours < 10) sHours = "0" + sHours;
            if (minutes < 10) sMinutes = "0" + sMinutes;
            var endtime = convertTo12Hour(sHours + ":" + sMinutes);

            $("#txtDesiredTimeClubroomTo").val(endtime);
            $("#txtDesiredTimeClubroomTo").attr("value", endtime);
            $("#txtDesiredTimeClubroomFrom").attr("value", $("#txtDesiredTimeClubroomFrom").val());
        }
    });

    $("#txtDesiredTimeYogaFrom").timepicki({
        on_change: function () {
            var value = "2000-01-01 " + convertTo24Hour($("#txtDesiredTimeYogaFrom").val());
            var startdate = new Date(value);
            startdate.setHours(startdate.getHours() + 2);
            var hours = startdate.getHours();
            var minutes = startdate.getMinutes();
            var sHours = hours.toString();
            var sMinutes = minutes.toString();
            if (hours < 10) sHours = "0" + sHours;
            if (minutes < 10) sMinutes = "0" + sMinutes;
            var endtime = convertTo12Hour(sHours + ":" + sMinutes);

            $("#txtDesiredTimeYogaTo").val(endtime);
            $("#txtDesiredTimeYogaTo").attr("value", endtime);
            $("#txtDesiredTimeYogaFrom").attr("value", $("#txtDesiredTimeYogaFrom").val());
        }
    });

    $("#txtDesiredTimeSoccerFrom").timepicki({
        on_change: function () {
            var value = "2000-01-01 " + convertTo24Hour($("#txtDesiredTimeSoccerFrom").val());
            var startdate = new Date(value);
            var hrs = parseFloat($("#hdnSoccHours").val());
            startdate.setHours(startdate.getHours() + hrs);

            var hours = startdate.getHours();
            var minutes = startdate.getMinutes();

            var sHours = hours.toString();
            var sMinutes = minutes.toString();
            if (hours < 10) sHours = "0" + sHours;
            if (minutes < 10) sMinutes = "0" + sMinutes;
            var endtime = convertTo12Hour(sHours + ":" + sMinutes);

            $("#txtDesiredTimeSoccerTo").val(endtime);
            $("#txtDesiredTimeSoccerTo").attr("value", endtime);
            $("#txtDesiredTimeSoccerFrom").attr("value", $("#txtDesiredTimeSoccerFrom").val());
        }
    });


    $("#rbtnApertmentPermission1").prop("checked", true);

    $('input[name=rbtnPermissionToEnter]').on('ifChanged', function (event) {
        if ($("#rbtnApertmentPermission2").is(":checked")) {
            $("#PreferredDate").removeClass('hidden');
            $("#txtPreferredDateSR").val('');
            $("#txtPreferredTime").val('');

        }
        else {
            $("#PreferredDate").addClass('hidden');
        }
    });

    clearServiceRequestField();
    $("#ddlPaymentHistory").on("change", function (event) {

        if ($(this).val() == 4) {
            dateRangeAccountHistory();
        }
        else {
            getTransationLists();
        }
    });
    recPayment();
    ddlPayMethodSelect();
    ddlBankAccountListShow();
    ddlPaymentMethodSelectFunction();
    ddlPayMethodPageLoadFunction();


    document.getElementById('fileUploadService').onchange = function () {
        var fileUploadServiceBool = restrictFileUpload($(this).val());
        if (fileUploadServiceBool == true) {
            uploadServiceFile();
        }
        else {
            document.getElementById('fileUploadService').value = '';
            $.alert({
                title: "",
                content: "Only the following file extensions are allowed...</br>'gif', 'png', 'jpg', 'jpeg', 'bmp', 'psd', 'xls', 'doc', 'docx', 'pdf', 'rtf', 'tex', 'txt', 'wpd'",
                type: 'blue'
            });
        }
    };
    fillDdlServiceCategory();
    fillDdlLocation();
    $("#ddlProblemCategory").on('change', function (evt, params) {
        var selected = $(this).val();
        if (selected != null) {
            if (selected == 10) {
                $("#ddlProblemCategory1").empty();
                $("#Issue").addClass("hidden");
                $("#MoreDetails").removeClass("hidden");
                $("#CausingIssue").addClass("hidden");
                $("#OtherCausingIssue").addClass("hidden");
                $("#OtherIssue").addClass("hidden");

            }
            else {
                fillCaussingIssue(selected);
                $("#MoreDetails").addClass("hidden");
                $("#CausingIssue").removeClass("hidden");
                $("#ddlProblemCategory2").empty();
                $("#Issue").addClass("hidden");
                $("#OtherIssue").addClass("hidden");
                $("#OtherCausingIssue").addClass("hidden");
            }
        }
    });
    $("#ddlProblemCategory1").on('change', function (evt, params) {
        var i = $("#ddlProblemCategory").val();
        var selected = $(this).find(":Selected").val();
        if (selected != null) {
            if (selected == 8 || selected == 11 || selected == 18 || selected == 40 || selected == 41 || selected == 42 || selected == 52) {
                $("#OtherCausingIssue").removeClass("hidden");
                $("#Issue").addClass("hidden");
                $("#OtherIssue").addClass("hidden");
            }
            else {
                $("#OtherIssue").addClass("hidden");
                $("#Issue").removeClass("hidden");
                $("#OtherCausingIssue").addClass("hidden");
                fillDdlIssue(selected, i);
            }

        }
    });
    $("#ddlProblemCategory2").on('change', function (evt, params) {
        var selected = $(this).find(":Selected").val();
        if (selected != null) {
            if (selected == 5 || selected == 14 || selected == 23 || selected == 27 || selected == 34 || selected == 43 || selected == 60 || selected == 61 || selected == 62 || selected == 67 || selected == 71 || selected == 78 || selected == 83 || selected == 88 || selected == 90 || selected == 100 || selected == 103 || selected == 106 || selected == 114 || selected == 115 || selected == 118 || selected == 122 || selected == 123 || selected == 126 || selected == 134 || selected == 139 || selected == 144 || selected == 147 || selected == 149 || selected == 173 || selected == 175 || selected == 179) {
                $("#OtherIssue").removeClass("hidden");

            }
            else {
                $("#Issue").removeClass("hidden");
                $("#OtherIssue").addClass("hidden");
                fillDdlIssue(selected, i);
            }

        }
    });
    $("#ddlPriority").on('change', function (evt, params) {
        var selected = $(this).find(":Selected").val();
        if (selected != null) {
            if (selected == 4) {
                $("#Mobile").removeClass("hidden");
            }
            else {
                $("#Mobile").addClass("hidden");
            }

        }
    });


    $('#Date').click(function () {
        $("#txtPrefarredDate").focus();
    });

    $('#PayDateR').click(function () {
        $("#txtPayDateR").focus();
    });
    $('#Sdate').click(function () {
        $("#txtPreferredDateSR").focus();
    });
    $('#btnPreferredTime').click(function () {
        $("#txtPreferredTime").focus();
    });
    $('#btnDesiredDate').click(function () {
        $("#txtDesiredDate").focus();
    });


    $("#chkHaveVehicle").on('ifChanged', function (event) {
        if ($(this).is(":checked")) {
            $("#HaveVehicle").removeClass('hidden');
            var randNo = makeid(6);
            $("#txtGuestVehicleTag").val(randNo);
            //$("#printTag").removeClass('hidden');

        }
        else {
            $("#HaveVehicle").addClass('hidden');
            $("#txtGuestVehicleTag").val('');
        }
    });
    $("#txtGuestVehicleTag").attr("disabled", true);
    $('#chkHaveVehicle').iCheck('Uncheck');

});
var checkRequestButton = function () {
    var ddlAmenityVal = $("#ddlAmenities").val();
    var ddlDesDurationVal = $("#ddlDesiredDuration").val();
    var desireDate = $("#txtDesiredDate").val();
    var desireTime = $("#txtDesiredTime").val();

    if (ddlAmenityVal !== 0 || ddlDesDurationVal != 0 || desireDate != "" || desireTime != "") {
        $("#RequestReservation").attr("disabled", "disabled");
    }
    else {
        $("#RequestReservation").removeAttr("disabled", "disabled");
    }
};

var getTenantData = function (userID) {
    $("#divLoader").show();
    var params = { TenantID: userID, UserId: $("#hndUserId").val() };
    $.ajax({
        url: "../GetTenantInfo",
        method: "post",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8", // content type sent to server
        dataType: "json", //Expected data format from server
        success: function (response) {

            if ($.trim(response.error) != "") {
                //showMessage("Error!", response.error);
            } else {
                $("#AmenityUnit").html(response.UnitName);
                $("#AmenityTenant").html(response.FirstName + " " + response.LastName);
                $("#hndTenantID").val(response.ID);
                $("#txtFirstName").val(response.FirstName);
                $("#txtMiddleInitial").val(response.MiddleInitial);
                $("#txtLastName").val(response.LastName);

                $("#invTenant").text(response.FirstName + " " + response.LastName);
                $("#invUnit").text(response.UnitName);

                $("#recTenant").text(response.FirstName + " " + response.LastName);
                $("#recUnit").text(response.UnitName);
               // $("#hndLeaseTerm").val(response.LeaseTerm);
                $("#lblCurrentPrePayAmountR").text(formatMoney(response.MonthlyCharges));
                $("#recPopAmt").text(formatMoney(response.MonthlyCharges));

                $("#txtAddress").val(response.Address);
                $("#txtCity").val(response.City);

                $("#txtZip").val(response.Zip);
                $("#ddlGender").val(response.Gender);
                $("#txtJobCode").val(response.JobCode);
                $("#txtWorkPhone").val(response.OfficePhone);
                $("#txtHomePhone").val(response.HomePhone);
                $("#txtWorkExtension").val(response.OfficePhoneExtension);
                $("#txtOfficeEmail").val(response.OfficeEmail);
                $("#txtOfficeName").val(response.OfficeName);
                $("#txtOfficeAddress").val(response.OfficeAddress);
                $("#txtOfficeCity").val(response.OfficeCity);

                $("#txtOfficeZip").val(response.OfficeZip);
                $("#txtOccupation").val(response.Occupation);
                $("#txtSocialSecurityNumber").val(response.SocialSecurityNum);
                $("#txtDrivingLicense").val(response.DriverLicense);
                $("#txtDateOfBirth").val(response.DateOfBirthText);
                $("#txtCarMake").val(response.CarMake);
                $("#txtCarModel").val(response.CarModel);
                $("#txtCarLicense").val(response.CarLic);
                $("#txtEmergencyContact").val(response.EmergencyContact);
                $("#txtEmergencyPhone").val(response.EmergencyPhone);
                $("#txtIncome").val(response.Income);
                $("#txtEmployerContact").val(response.EmployerContact);

                $("#txtRentResp").val(response.RentResp);

                $("#ddlGender").val(response.Gender);
                $("#ddlGender").trigger('change');

                $("#ddlMaritalStatus").val(response.MaritalStatus);
                $("#ddlMaritalStatus").trigger('change');



                setTimeout(function () {
                    $("#ddlState").val(response.State);
                    $("#ddlState").trigger('change');

                    $("#ddlOfficeState").val(response.OfficeState);
                    $("#ddlOfficeState").trigger('change');

                    $("#ddlProperty").val(response.PropertyID);
                    $("#ddlProperty").trigger('change');

                }, 1200);

                setTimeout(function () {

                    $("#ddlCity").val(response.City);
                    $("#ddlCity").trigger('change');

                    $("#ddlOfficeCity").val(response.OfficeCity);
                    $("#ddlOfficeCity").trigger('change');


                    $("#ddlUnit").val(response.UnitID);
                    $("#ddlUnit").trigger('change');
                }, 1600);



                $("#ddlStudentStatus").val(response.StudentStatus);
                $("#ddlStudentStatus").trigger('change');

                if ($("#hndTenantID").val() != "0") {
                    $("#spanSaveUpdate").text("Update");
                }
                else {
                    $("#spanSaveUpdate").text("Save");
                }

            }
            $("#divLoader").hide();
        }
    });
}

var saveUpdateTenant = function () {
    $("#divLoader").show();
    var msg = "";
    if ($.trim($("#txtFirstName").val()).length <= 0) {
        msg += "First Name is required.</br>"
    }
    if ($.trim($("#txtLastName").val()).length <= 0) {
        msg += "Last Name is required.</br>"
    }
    if ($("#ddlGender").val() == 0) {
        msg += "Gender is required.</br>"
    }
    if ($.trim($("#txtDateOfBirth").val()).length <= 0) {
        msg += "Date of Birth is required.</br>"
    }
    if ($("#ddlMaritalStatus").val() == 0) {
        msg += "Marital Status is required.</br>"
    }
    if ($("#ddlState").val() == 0) {
        msg += "Sate is required.</br>"
    }
    if ($("#ddlCity").val() == 0) {
        msg += "City is required.</br>"
    }

    if (msg != "") {
        $.alert({
            title: 'Alert!',
            content: msg,
            type: 'red'
        })
        return;
    }
    else {
        var model = {
            ID: $("#hndTenantID").val(),
            FirstName: $("#txtFirstName").val(),
            MiddleInitial: $("#txtMiddleInitial").val(),
            LastName: $("#txtLastName").val(),
            PropertyID: $("#ddlProperty").val(),
            UnitID: $("#ddlUnit").val(),
            Address: $("#txtAddress").val(),
            City: $("#ddlCity").val(),
            State: $("#ddlState").val(),
            Zip: $("#txtZip").val(),
            Gender: $("#ddlGender").val(),
            JobCode: $("#txtJobCode").val(),
            HomePhone: $("#txtHomePhone").val(),
            OfficePhoneExtension: $("#txtWorkExtension").val(),
            OfficeEmail: $("#txtOfficeEmail").val(),
            OfficePhone: $("#txtWorkPhone").val(),
            OfficeName: $("#txtOfficeName").val(),
            OfficeAddress: $("#txtOfficeAddress").val(),
            OfficeCity: $("#ddlOfficeCity").val(),
            OfficeState: $("#ddlOfficeState").val(),
            OfficeZip: $("#txtOfficeZip").val(),
            Occupation: $("#txtOccupation").val(),
            SocialSecurityNum: $("#txtSocialSecurityNumber").val(),
            DriverLicense: $("#txtDrivingLicense").val(),
            DateOfBirth: $("#txtDateOfBirth").val(),
            CarMake: $("#txtCarMake").val(),
            CarModel: $("#txtCarModel").val(),
            CarLic: $("#txtCarLicense").val(),
            EmergencyContact: $("#txtEmergencyContact").val(),
            EmergencyPhone: $("#txtEmergencyPhone").val(),
            Income: $("#txtIncome").val(),
            EmployerContact: $("#txtEmployerContact").val(),
            MaritalStatus: $("#ddlMaritalStatus").val(),
            StudentStatus: $("#ddlStudentStatus").val(),
            RentResp: $("#txtRentResp").val(),
        };
        $.ajax({
            url: "../SaveUpdateTenant",
            method: "post",
            data: JSON.stringify(model),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            success: function (response) {
                //hideProgress('#btnSaveUpdate');
                if (response.result == "1") {
                    if ($("#hndTenantID").val() == 0) {
                        $.alert({
                            title: 'Alert!',
                            content: 'Data Saved Successfully',
                            type: 'blue'
                        })
                        $("#hndTenantID").val(response.ID);
                        window.location.href = "../Index/" + response.ID;
                    }
                    else {
                        $("#hndTenantID").val(response.ID);
                        $.alert({
                            title: 'Alert!',
                            content: 'Data Updated Successfully',
                            type: 'blue'
                        })
                    }
                }
                else {
                    //showMessage("Error!", response.error);
                }
                $("#divLoader").hide();
            }
        });
    }
}

var fillStateDDL = function () {

    $.ajax({
        url: '/City/FillStateDropDownList',
        method: "post",
        //data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {
                $("#ddlState").empty();
                $("#ddlStatePersonal").empty();
                $("#ddlStateHome").empty();
                $("#ddlStateEmployee").empty();
                $("#ddlStateContact").empty();
                $("#ddlVState").empty();
                $("#ddlState").append("<option value='0'>Select State</option>");
                $("#ddlStatePersonal").append("<option value='0'>Select State</option>");
                $("#ddlStateHome").append("<option value='0'>Select State</option>");
                $("#ddlStateEmployee").append("<option value='0'>Select State</option>");
                $("#ddlStateContact").append("<option value='0'>Select State</option>");
                $("#ddlVState").append("<option value='0'>Select State</option>");
                $.each(response, function (index, elementValue) {
                    $("#ddlState").append("<option value=" + elementValue.ID + ">" + elementValue.StateName + "</option>");
                    $("#ddlStatePersonal").append("<option value=" + elementValue.ID + ">" + elementValue.StateName + "</option>");
                    $("#ddlStateHome").append("<option value=" + elementValue.ID + ">" + elementValue.StateName + "</option>");
                    $("#ddlStateEmployee").append("<option value=" + elementValue.ID + ">" + elementValue.StateName + "</option>");
                    $("#ddlStateContact").append("<option value=" + elementValue.ID + ">" + elementValue.StateName + "</option>");
                    $("#ddlVState").append("<option value=" + elementValue.ID + ">" + elementValue.StateName + "</option>");
                });

            }
        }
    });
}

var fillCityList = function (stateid) {
    var params = { StateID: stateid };
    $.ajax({
        url: '/City/GetCityListbyState',
        method: "post",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {

                $("#ddlCity").empty();
                $("#ddlCity").append("<option value='0'>Select City</option>");
                $.each(response, function (index, elementValue) {
                    $("#ddlCity").append("<option value=" + elementValue.ID + ">" + elementValue.CityName + "</option>");
                });
            }
        }
    });
}
var fillCityListHome = function (stateid) {

    var params = { StateID: stateid };
    $.ajax({
        url: '/City/GetCityListbyState',
        method: "post",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {

                $("#ddlCityHome").empty();
                $("#ddlCityHome").append("<option value='0'>Select City</option>");
                $.each(response, function (index, elementValue) {

                    $("#ddlCityHome").append("<option value=" + elementValue.ID + ">" + elementValue.CityName + "</option>");

                });
            }
        }
    });
}
var fillCityListEmployee = function (stateid) {
    var params = { StateID: stateid };
    $.ajax({
        url: '/City/GetCityListbyState',
        method: "post",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {

                $("#ddlCityEmployee").empty();
                $("#ddlCityEmployee").append("<option value='0'>Select City</option>");
                $.each(response, function (index, elementValue) {

                    $("#ddlCityEmployee").append("<option value=" + elementValue.ID + ">" + elementValue.CityName + "</option>");

                });
            }
        }
    });
}
var fillCityListContact = function (stateid) {
    var params = { StateID: stateid };
    $.ajax({
        url: '/City/GetCityListbyState',
        method: "post",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {

                $("#ddlCityContact").empty();
                $("#ddlCityContact").append("<option value='0'>Select City</option>");
                $.each(response, function (index, elementValue) {

                    $("#ddlCityContact").append("<option value=" + elementValue.ID + ">" + elementValue.CityName + "</option>");


                });
            }
        }
    });
}

var goToStep = function (stepid, id) {
    if (stepid == "1") {
        $("#li1").addClass("active");
        $("#li2").removeClass("active");
        $("#li3").removeClass("active");
        $("#li4").removeClass("active");
        $("#step2").removeClass("active");
        $("#step3").removeClass("active");
        $("#step4").removeClass("active");
        $("#li5").removeClass("active");
        $("#li6").removeClass("active");
        $("#step5").removeClass("active");
        $("#step6").removeClass("active");
        $("#step1").addClass("active");
        $("#step7").removeClass("active");
        $("#li7").removeClass("active");
    }
    if (stepid == "2") {
        //$.get("../../Lease/Edit/?id=" + id, function (data) {
        //    $("#step2").html(data);
        //});
        $("#li2").addClass("active");
        $("#li1").removeClass("active");
        $("#li3").removeClass("active");
        $("#li4").removeClass("active");
        $("#step1").removeClass("active");
        $("#step3").removeClass("active");
        $("#step4").removeClass("active");
        $("#step2").addClass("active");
        $("#li5").removeClass("active");
        $("#li6").removeClass("active");
        $("#step5").removeClass("active");
        $("#step6").removeClass("active");
        $("#step7").removeClass("active");
        $("#li7").removeClass("active");
    }
    if (stepid == "3") {
        //getUpTransationLists();
        //getAllDues();
        //getTransationLists();
        //getPaymentAccountsCreditCard();
        getBankCCLists();
        $("#li3").addClass("active");
        $("#li2").removeClass("active");
        $("#li1").removeClass("active");
        $("#li4").removeClass("active");
        $("#step2").removeClass("active");
        $("#step1").removeClass("active");
        $("#step4").removeClass("active");
        $("#step3").addClass("active");
        $("#li5").removeClass("active");
        $("#li6").removeClass("active");
        $("#step5").removeClass("active");
        $("#step6").removeClass("active");
        $("#step7").removeClass("active");
        $("#li7").removeClass("active");
    }
    if (stepid == "4") {
        getServiceRequestList();
        serviceRequestChangeDDL();
        getServiceInfo();
      
        $("#li4").addClass("active");
        $("#li2").removeClass("active");
        $("#li3").removeClass("active");
        $("#li1").removeClass("active");
        $("#step2").removeClass("active");
        $("#step1").removeClass("active");
        $("#step3").removeClass("active");
        $("#step4").addClass("active");
        $("#li5").removeClass("active");
        $("#li6").removeClass("active");
        $("#step5").removeClass("active");
        $("#step6").removeClass("active");
        $("#step7").removeClass("active");
        $("#li7").removeClass("active");
    }
    if (stepid == "5") {
        $("#step5").addClass("active");
        //getVehicleLists();
        $("#li5").addClass("active");

        $("#li4").removeClass("active");
        $("#li2").removeClass("active");
        $("#li3").removeClass("active");
        $("#li1").removeClass("active");
        $("#step2").removeClass("active");
        $("#step1").removeClass("active");
        $("#step3").removeClass("active");
        $("#step4").removeClass("active");
        $("#li6").removeClass("active");
        $("#step6").removeClass("active");
        $("#step7").removeClass("active");
        $("#li7").removeClass("active");
    }
    if (stepid == "6") {
        //getPetLists();
        $("#li6").addClass("active");
        $("#step6").addClass("active");
        $("#step1").removeClass("active");
        $("#li1").removeClass("active");
        $("#step2").removeClass("active");
        $("#li2").removeClass("active");
        $("#step3").removeClass("active");
        $("#li3").removeClass("active");
        $("#step4").removeClass("active");
        $("#li4").removeClass("active");
        $("#step5").removeClass("active");
        $("#li5").removeClass("active");
        $("#step7").removeClass("active");
        $("#li7").removeClass("active");
    }
    if (stepid == "7") {
        copyGuestName();
        document.getElementById('fileUploadGuestDriverLicence').onchange = function () {
            uploadGuestDriverLicence();
        };
        document.getElementById('fileUploadGuestRegistration').onchange = function () {
            uploadGuestVehicleRegistration();
        };
        getServiceInfo();
        $("#li7").addClass("active");
        $("#step7").addClass("active");
        $("#step1").removeClass("active");
        $("#li1").removeClass("active");
        $("#step2").removeClass("active");
        $("#li2").removeClass("active");
        $("#step3").removeClass("active");
        $("#li3").removeClass("active");
        $("#step4").removeClass("active");
        $("#li4").removeClass("active");
        $("#step5").removeClass("active");
        $("#li5").removeClass("active");
        $("#step6").removeClass("active");
        $("#li6").removeClass("active");
    }
};

function saveupdateLease() {
    var msg = "";
    var lid = $("#hndLID").val();
    var property = $("#ddlProperty").val();
    var unitid = $("#ddlUnit").val();
    var revision_number = $("#txtRevision").val();
    var status = $("#ddlStatus").val();
    var being_terminated = $("#ddlBeingTerminated").val();
    var phase = $("#txtPhase").val();

    var noticedate = $("#txtNoticeDate").val();
    var termination_reason = $("#txtTerminateReason").val();
    var balanced = $("#txtBalance").val();
    var previous_balance = $("#txtPreviousbalance").val();
    var number_return_check = $("#txtNRChecks").val();

    var last_return_check_date = $("#txtLastReturnDate").val();
    var last_return_payment_id = $("#txtLastReturnPmt").val();
    var last_return_check_number = $("#txtLastReturnCheckNum").val();
    var original_lease_start_date = $("#txtOriginalStart").val();
    var actual_lease_start_date = $("#txtActualStart").val();

    var original_lease_end_date = $("#txtOriginalEnd").val();
    var actual_lease_end_date = $("#txtActualEnd").val();
    var intended_movein_date = $("#txtIntendedMoveIn").val();
    var actual_movein_date = $("#txtActualMoveIn").val();
    var intended_moveout_date = $("#txtIntendedMoveOut").val();

    var actual_moveout_date = $("#txtActualMoveOut").val();
    var statement_type = $("#txtStatementType").val();
    var last_rent_roll_date = $("#txtLastRentDate").val();
    var created_by = $("#txtCreatedBy").val();
    var created_date = $("#txtCreatedDate").val();

    var recounciled_date = $("#txtReconciledDate").val();
    var terms = $("#txtTerms").val();


    if (revision_number == "") {
        msg += "Plz enter Revision Number</br>";
    }

    if (balanced == "") {
        msg += "Plz enter Balance</br>";
    }
    if (previous_balance == "") {
        msg += "Plz enter Previous Balance</br>";
    }

    if (msg != "") {
        $.alert({
            title: 'Alert!',
            content: msg,
            type: 'red'
        });
        return;
    }

    var model = {
        LID: lid,
        PID: property,
        UID: unitid,
        Revision_Num: revision_number,
        Status: status,
        Being_Terminated: being_terminated,
        Phase: phase,
        Notice_Date: noticedate,
        Termination_Reason: termination_reason,
        Balance: balanced,
        Previous_Balance: previous_balance,
        Number_Returned_Checks: number_return_check,

        Last_Return_Ck_Date: last_return_check_date,
        Last_Return_Pmt_ID: last_return_payment_id,
        Last_Return_Ck_Num: last_return_check_number,
        Original_Start: original_lease_start_date,
        Actual_Start: actual_lease_start_date,
        Original_Lease_End: original_lease_end_date,
        Actual_Lease_End: actual_lease_end_date,
        Intended_MoveIn_Date: intended_movein_date,
        Actual_MoveIn_Date: actual_movein_date,
        Intend_MoveOut_Date: intended_moveout_date,
        Actual_MoveOut_Date: actual_moveout_date,
        Statement_Type: statement_type,
        Last_Rent_Roll_Date: last_rent_roll_date,
        CreatedBy: created_by,
        CreatedDate: created_date,
        Reconciled: recounciled_date,
        Term: terms,
    };

    $.ajax({
        url: "/Lease/SaveUpdateLease/",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $.alert({
                title: 'Message!',
                content: response.Msg,
                type: 'blue',
            });
        }


    });

}

var getTransationLists = function () {
    var model = {
        TenantID: $("#hndTenantID").val(),
        AccountHistoryDDL: $('#ddlPaymentHistory').val()
    }
    $.ajax({
        url: "/MyTransaction/GetTenantTransactionList",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            var bal = 0;
            $("#tblPaymentHistory>tbody").empty();
            $.each(response.model, function (elementType, elementValue) {
                var html = "<tr data-value=" + elementValue.TransID + ">";
                html += "<td>" + elementValue.Transaction_DateString + "</td>";
               
                if (elementValue.Credit_Amount != "0.00" && elementValue.Charge_Amount == "0.00")
                {
                    html += "<td>" + elementValue.Description + "<a href='javascript:void(0);' class='pull-right'  data-toggle='modal' data-target='#popPaymentReceipt' onclick='getInvoice(" + elementValue.TransID + ")'><img src='/Content/assets/Assets/rec.jpg' style='height: 20px;'/></td>";
                    html += "<td style='text-align: right;'>$" + formatMoney(elementValue.Charge_Amount) + "</td>";
                    html += "<td style='text-align: right;'><b>$" + formatMoney(elementValue.Credit_Amount) + "</b></td>";
                } else
                {

                    html += "<td>" + elementValue.Description + "<a href='javascript:void(0);' class='pull-right'  data-toggle='modal' data-target='#popInvoice' onclick='getInvoice(" + elementValue.TransID + ")'><img src='/Content/assets/Assets/inv.png' style='height: 20px;'/></a></td>";
                    html += "<td style='text-align: right;'>$" + formatMoney(elementValue.Charge_Amount) + "</td>";
                    html += "<td style='text-align: right;'>$" + formatMoney(elementValue.Credit_Amount) + "</td>";
                }
              
                bal = parseFloat((parseFloat(bal) + parseFloat(elementValue.Charge_Amount)) - parseFloat(elementValue.Credit_Amount));
                html += "<td style='text-align: right;'>$" + formatMoney(bal) + "</td>";
                html += "</tr>";
                $("#tblPaymentHistory>tbody").append(html);

            });
            
        }
    });
}
var getInvoice = function (invid)
{
   
    var model = {
        TransID: invid     
    }
    $.ajax({
        url: "/MyTransaction/GetTenantBillList",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            var bal = 0;

            $("#invid").text(invid);
           
            $("#invdate").text(response.model.Transaction_DateString);
            $("#invamount").text(formatMoney(response.model.Charge_Amount));
            
            $("#recid").text(invid);
            $("#recdate").text(response.model.Transaction_DateString);
            $("#recAmt").text(formatMoney(response.model.Credit_Amount));
            $("#recDesc").text(response.model.Description);

            $("#tblInvoiceBill>tbody").empty();
            var srno = 1;
            $.each(response.model.lstpr, function (elementType, elementValue) {
                var html = "<tr data-value=" + elementValue.BillID + ">";
                html += "<td>" + srno + "</td>";
                html += "<td>"+ elementValue.Description + "</td>";
                html += "<td style='text-align: right;'>$" + formatMoney(elementValue.Amount) + "</td>";
               
                html += "</tr>";
                $("#tblInvoiceBill>tbody").append(html);
                srno++;
            });
            $("#tblInvoiceBill>tbody").append("<tr><td colspan='3'></td></tr>  <tr><td></td><td style='text-align: right;'>Total Amount :</td><td style='text-align: right;'> <b> <span id='invamount'> $" + formatMoney(response.model.Charge_Amount)+"</span></b> </td></tr>");
           
        }
    });
}

var getUpTransationLists = function () {
   
    var model = {
        TenantID: $("#hndTenantID").val(),
        AccountHistoryDDL: 2
    }
    $.ajax({
        url: "/MyTransaction/GetTenantTransactionList",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            var bal = 0;
            $("#tblUpcomingCharges>tbody").empty();

            $.each(response.model, function (elementType, elementValue) {
                var html = "<tr data-value=" + elementValue.TransID + ">";
                html += "<td>" + elementValue.Transaction_DateString + "</td>";
                html += "<td>" + elementValue.Description + "<a href='javascript:void(0);' class='pull-right'  data-toggle='modal' data-target='#popInvoice' onclick='getInvoice(" + elementValue.TransID + ")'><img src='/Content/assets/Assets/inv.png' style='height: 20px;'/></a></td>";
                html += "<td style='text-align: right;'>$" + formatMoney(elementValue.Charge_Amount) + "</td>";
                if (elementValue.Credit_Amount != "0.00") {
                    html += "<td style='text-align: right;'><b>$" + formatMoney(elementValue.Credit_Amount) + "</b></td>";
                } else {
                    html += "<td style='text-align: right;'>$" + formatMoney(elementValue.Credit_Amount) + "</td>";
                }

                bal = parseFloat((parseFloat(bal) + parseFloat(elementValue.Charge_Amount)) - parseFloat(elementValue.Credit_Amount));
                html += "<td style='text-align: right;'>$" + formatMoney(bal) + "</td>";
                html += "</tr>";
                $("#tblUpcomingCharges>tbody").append(html);
            });
           
        }
    });
}

var getChargeType = function () {
    $.ajax({
        url: "/ChargeType/GetCTypeList/",
        type: "post",
        contentType: "application/json utf-8",
        dataType: "JSON",
        success: function (response) {
            $("#ddlChargeType").empty();
            $("#ddlChargeType").append("<option value='0'>Select Charge Type</option>");
            $.each(response.model, function (elementType, elementValue) {
                var option = "<option value=" + elementValue.CTID + ">" + elementValue.Charge_Type + "</option>";
                $("#ddlChargeType").append(option);
            });

        }
    });

};
var TableClick = function () {

    $('#tblPaymentHistory tbody').on('click', 'tr', function () {
        $('#tblPaymentHistory tr').removeClass("pds-selected-row");
        $(this).addClass("pds-selected-row")
    });
    $('#tblPaymentHistory tbody').on('dblclick', 'tr', function () {
        goToEditTransaction();
    });
}
var goToEditTransaction = function () {

    var row = $('#tblPaymentHistory tbody tr.pds-selected-row').closest('tr');
    var ID = $(row).attr("data-value");
    if (ID != null) {

        $("#hndTransID").val(ID);
        var model = { id: ID };
        $.ajax({
            url: "/MyTransaction/GetTransactionDetails/",
            type: "post",
            contentType: "application/json utf-8",
            data: JSON.stringify(model),
            dataType: "JSON",
            success: function (response) {
                $("#popTransaction").PopupWindow("open");
                $("#ddlTransactionType").val(response.model.Transaction_Type);
                $("#txtChargeDate").val(response.model.Charge_Date);
                $("#ddlChargeType").val(response.model.Charge_Type);
                $("#txtChargeAmount").val(formatMoney(response.model.Charge_Amount));
                $("#txtSummaryCharge").val(response.model.Description);
                $("#txtDesc").val(response.model.Description);
            }
        });

    } else {

    }
}
function saveupdateTransaction() {

    var msg = "";
    var transid = $("#hndTransID").val();
    var propertyid = $("#ddlProperty").val();
    var unitid = $("#ddlUnit").val();
    var tenantid = $("#hndTenantID").val();
    var leaseId = $("#hndLID").val();
    var revision_num = 1;
    var transtype = $("#ddlTransactionType").val();
    var chargeDate = $("#txtChargeDate").val();
    var chargeType = $("#ddlChargeType").val();
    var chargeAmount = unformatText($("#txtChargeAmount").val());
    var summaryCharge = $("#txtSummaryCharge").val();

    var desc = $("#txtDesc").val();

    if (transtype == 0) {
        msg += "Select Transaction Type</br>";
    }
    if (chargeDate == "") {
        msg += "Enter Charge Date</br>";
    }
    if (chargeAmount == 0) {
        msg += "Enter Charge Amount</br>";
    }
    if (msg != "") {
        $.alert({
            title: 'Alert!',
            content: msg,
            type: 'red'
        });
        return;
    }

    var model = {
        TransID: transid,
        PropertyID: propertyid,
        UnitID: unitid,
        TenantID: tenantid,
        LeaseID: leaseId,
        Revision_Num: revision_num,
        Transaction_Type: transtype,
        Charge_Date: chargeDate,
        Charge_Type: chargeType,
        Credit_Amount: chargeAmount,
        Summary_Charge_Type: summaryCharge,
        Description: desc,
    };

    $.ajax({
        url: "/MyTransaction/SaveUpdateTransaction/",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $.alert({
                title: 'Message!',
                content: response.Msg,
                type: 'blue',
            });
            clearTrans();
            getTransationLists();
            getAllDues();
        }


    });

}
var clearTrans = function () {
    $("#hndTransID").val(0);

    $("#ddlTransactionType").val(0);
    $("#txtChargeDate").val("");
    $("#ddlChargeType").val(0);
    $("#txtChargeAmount").val(0);
    $("#txtSummaryCharge").val("");
    $("#txtDesc").val("");
}

var saveupdateVehicle = function () {

    var msg = "";
    var vid = $("#hndVehicleID").val();
    var vmake = $("#txtVehicleMake").val();
    var vmodel = $("#txtVehicleModel").val();
    var vyear = $("#ddlVehicleyear").val();
    var vcolor = $("#txtVehicleColor").val();
    var vlicence = $("#txtVehicleLicence").val();
    var vstate = $("#ddlVState").val();

    if (vmake == "") {
        msg += "Enter Vehicle Make</br>";
    }
    if (vlicence == "") {
        msg += "Enter Vehicle Licence</br>";
    }
    if (vyear == "") {
        msg += "Enter Vehicle Year";
    }

    if (msg != "") {
        $.alert({
            title: 'Alert!',
            content: msg,
            type: 'red'
        });
        return;
    }

    var model = {
        Vehicle_ID: vid,
        Make: vmake,
        VModel: vmodel,
        Year: vyear,
        Color: vcolor,
        State: vstate,
        License: vlicence,

    };

    $.ajax({
        url: "/Tenant/Vehicle/SaveUpdateVehicle/",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $.alert({
                title: 'Message!',
                content: response.Msg,
                type: 'blue',
            });

            getVehicleLists();
            $("#popVehicle").PopupWindow("close");
        }


    });

}
var getVehicleLists = function () {
    var model = {

        TenantID: $("#hndTenantID").val(),
    }
    $.ajax({
        url: "/Vehicle/GetVehicleList",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {

            $("#tblVehicle>tbody").empty();
            $.each(response.model, function (elementType, elementValue) {
                var html = "<tr data-value=" + elementValue.Vehicle_ID + ">";
                html += "<td>" + elementValue.Make + "</td>";
                html += "<td>" + elementValue.VModel + "</td>";
                html += "<td>" + elementValue.Year + "</td>";
                html += "<td>" + elementValue.Color + "</td>";
                html += "<td>" + elementValue.License + "</td>";
                html += "<td>" + elementValue.State + "</td>";
                html += "</tr>";
                $("#tblVehicle>tbody").append(html);
            });

        }
    });
}
var clearVehicle = function () {
    $("#hndVehicleID").val(0);
    $("#txtVehicleMake").val("");
    $("#txtVehicleModel").val("");

    $("#txtVehicleColor").val("");
    $("#txtVehicleLicence").val("");
    $("#ddlVState").val(0);
}

var getApplicantLists = function () {
    var model = {

        TenantID: $("#hndTenantID").val(),
    }
    $.ajax({
        url: "/Applicant/GetApplicantList",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {

            $("#tblApplicant>tbody").empty();
            $.each(response.model, function (elementType, elementValue) {
                var html = "<tr data-value=" + elementValue.ApplicantID + ">";
                html += "<td>" + elementValue.FirstName + " " + elementValue.LastName + "</td>";

                html += "<td>" + elementValue.Phone + "</td>";
                html += "<td>" + elementValue.Email + "</td>";
                html += "<td>" + elementValue.Gender + "</td>";

                html += "</tr>";
                $("#tblApplicant>tbody").append(html);
            });

        }
    });
}
var clearApplicant = function () {
    $("#hndApplicantID").val(0);
    $("#txtApplicantFirstName").val("");
    $("#txtApplicantLastName").val("");

    $("#txtApplicantPhone").val("");
    $("#txtApplicantEmail").val("");
    $("#ddlApplicantGender").val(0);
}

var saveupdatePet = function () {

    var msg = "";
    var petId = $("#hndPetID").val();
    var petType = $("#ddlpetType").val();
    var breed = $("#txtpetBreed").val();
    var weight = $("#txtpetWeight").val();
    var age = $("#txtpetAge").val();


    if (petType === 0) {
        msg += "Select Pet Type</br>";
    }
    if (breed === "") {
        msg += "Enter Pet Breed</br>";
    }
    if (weight === "") {
        msg += "Enter Pet weight";
    }
    if (age === "") {
        msg += "Enter Pet age";
    }

    if (msg !== "") {
        $.alert({
            title: 'Alert!',
            content: msg,
            type: 'red'
        });
        return;
    }

    var model = {
        PetID: petId,
        PetType: petType,
        Breed: breed,
        Weight: weight,
        Age: age
    };

    $.ajax({
        url: "/Tenant/Pet/SaveUpdatePet/",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $.alert({
                title: 'Message!',
                content: response.Msg,
                type: 'blue'
            });

            getPetLists();
            $("#popPet").PopupWindow("close");
        }
    });
};
var getPetLists = function () {
    var model = {
        TenantID: $("#hndTenantID").val()
    };
    $.ajax({
        url: "/Pet/GetPetList",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {

            $("#tblPet>tbody").empty();
            $.each(response.model, function (elementType, elementValue) {
                var html = "<tr data-value=" + elementValue.PetID + ">";
                if (elementValue.PetType == '1') {
                    html += "<td>Cat</td>";
                }
                else {
                    html += "<td>Dog</td>";
                }

                html += "<td>" + elementValue.Breed + "</td>";
                html += "<td>" + elementValue.Weight + "</td>";
                html += "<td>" + elementValue.Age + "</td>";
                html += "</tr>";
                $("#tblPet>tbody").append(html);
            });

        }
    });
};
var clearPet = function () {
    var petId = $("#hndPetID").val("0");
    var petType = $("#ddlpetType").val("0");
    var breed = $("#txtpetBreed").val("");
    var weight = $("#txtpetWeight").val("");
    var age = $("#txtpetAge").val("");
};

//Amit's Work

var goToPayStep = function (stepid, id) {

    if (stepid == "1") {
        clearMakePaymentFields();
        ddlPaymentMethod();
        ddlPayMethodPageLoadFunction();
        $("#pay1").addClass("active");
        $("#pay2").removeClass("active");
        $("#pay3").removeClass("active");
        $("#pay4").removeClass("active");
        $("#pay5").removeClass("active");
        $("#pay6").removeClass("active");

        $("#payStep1").removeClass("hidden");
        $("#payStep2").addClass("hidden");
        $("#payStep3").addClass("hidden");
        $("#payStep4").addClass("hidden");
        $("#payStep5").addClass("hidden");
        $("#payStep6").addClass("hidden");
        $('#btnAccountHistoryPrint').addClass('hidden');
        $('#DivNote').addClass('hidden');

    }
    if (stepid == "2") {
        $("#pay1").removeClass("active");
        $("#pay2").addClass("active");
        $("#pay3").removeClass("active");
        $("#pay4").removeClass("active");
        $("#pay5").removeClass("active");
        $("#pay6").removeClass("active");

        $("#payStep1").addClass("hidden");
        $("#payStep2").removeClass("hidden");
        $("#payStep3").addClass("hidden");
        $("#payStep4").addClass("hidden");
        $("#payStep5").addClass("hidden");
        $("#payStep6").addClass("hidden");
        $('#btnAccountHistoryPrint').removeClass('hidden');
        $('#DivNote').removeClass('hidden');
    }
    if (stepid == "3") {
        $("#pay1").removeClass("active");
        $("#pay2").removeClass("active");
        $("#pay3").addClass("active");
        $("#pay4").removeClass("active");
        $("#pay5").removeClass("active");
        $("#pay6").removeClass("active");

        $("#payStep1").addClass("hidden");
        $("#payStep2").addClass("hidden");
        $("#payStep3").removeClass("hidden");
        $("#payStep4").addClass("hidden");
        $("#payStep5").addClass("hidden");
        $("#payStep6").addClass("hidden");
        $('#btnAccountHistoryPrint').addClass('hidden');
        $('#DivNote').addClass('hidden');
    }
    if (stepid == "4") {
        $("#pay1").removeClass("active");
        $("#pay2").removeClass("active");
        $("#pay3").removeClass("active");
        $("#pay4").addClass("active");
        $("#pay5").removeClass("active");
        $("#pay6").removeClass("active");

        $("#payStep1").addClass("hidden");
        $("#payStep2").addClass("hidden");
        $("#payStep3").addClass("hidden");
        $("#payStep4").removeClass("hidden");
        $("#payStep5").addClass("hidden");
        $("#payStep6").addClass("hidden");
        $('#btnAccountHistoryPrint').addClass('hidden');
        $('#DivNote').addClass('hidden');
    }
    if (stepid == "5") {
        $("#pay1").removeClass("active");
        $("#pay2").removeClass("active");
        $("#pay3").removeClass("active");
        $("#pay4").removeClass("active");
        $("#pay5").addClass("active");
        $("#pay6").removeClass("active");

        $("#payStep1").addClass("hidden");
        $("#payStep2").addClass("hidden");
        $("#payStep3").addClass("hidden");
        $("#payStep4").addClass("hidden");
        $("#payStep5").removeClass("hidden");
        $("#payStep6").addClass("hidden");
        $('#btnAccountHistoryPrint').addClass('hidden');
        $('#DivNote').addClass('hidden');
    }
    if (stepid == "6") {
        $("#pay1").removeClass("active");
        $("#pay2").removeClass("active");
        $("#pay3").removeClass("active");
        $("#pay4").removeClass("active");
        $("#pay5").removeClass("active");
        $("#pay6").addClass("active");

        $("#payStep1").addClass("hidden");
        $("#payStep2").addClass("hidden");
        $("#payStep3").addClass("hidden");
        $("#payStep4").addClass("hidden");
        $("#payStep5").addClass("hidden");
        $("#payStep6").removeClass("hidden");
        $('#btnAccountHistoryPrint').addClass('hidden');
        $('#DivNote').addClass('hidden');
    }
};

var savePaymentAccounts = function () {
    var msg = '';
    var PaymentAccountId = $("#hndPaymentAccountsID").val();
    var tenantId = $("#hndTenantID").val();
    //for credit card
    var cardType = $("#ddlCardType").val();
    var nameOnCard = $("#txtNameOnCard").val();
    var cardNumber = $("#txtCardNumber").val();
    var cardMonth = $("#ddlCardMonth").val();
    var cardYear = $("#ddlCardYear").val();
    //for bank account
    if ($("#ddlPayMethodPaymentAccounts").val() == '1') {
        if (cardType == 0) {
            msg += 'Select The Card Type</br>'
        }
        if (nameOnCard == '') {
            msg += 'Enter The Name On Card</br>'
        }
        if (cardNumber == '') {
            msg += 'Enter The Card Number</br>'
        }
        if (cardMonth == '0') {
            msg += 'Select The Card Month</br>'
        }
        if (cardYear == '0') {
            msg += 'Select The Card Year</br>'
        }
        var GivenDate = '20' + cardYear + '-' + cardMonth + '-' + new Date().getDate();
        var CurrentDate = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();

        GivenDate = new Date(GivenDate);
        CurrentDate = new Date(CurrentDate);

        if (GivenDate < CurrentDate) {
            msg += "Your Credit Card Expired..</br>";
        }
    }
    else if ($("#ddlPayMethodPaymentAccounts").val() == '2') {
        if ($("#txtBankNamePayMethod").val() == '') {
            msg += 'Enter the bank name</br>'
        }
        if ($("#txtAccountNumberPayMethod").val() == '') {
            msg += 'Enter the account number</br>'
        }
        if ($("#txtRoutingNumberPayMethod").val() == '') {
            msg += 'Enter the routing number</br>'
        }
    }

    if ($("#txtAccountNamePayMethod").val() == '') {
        msg += 'Enter the account name</br>'
    }
   

    if (msg != '') {
        $.alert({
            title: "",
            content: msg,
            type: 'red'
        });
        return
    }

    var model = {
        PAID: PaymentAccountId,
        TenantId: tenantId,
        NameOnCard: nameOnCard,
        CardNumber: cardNumber,
        Month: cardMonth,
        Year: cardYear,
        CardType: cardType,
        PayMethod: $("#ddlPayMethodPaymentAccounts").val(),
        BankName: $("#txtBankNamePayMethod").val(),
        AccountName: $("#txtAccountNamePayMethod").val(),
        AccountNumber: $("#txtAccountNumberPayMethod").val(),
        RoutingNumber: $("#txtRoutingNumberPayMethod").val(),
    };
    $.ajax({
        url: '/PaymentAccounts/SaveUpdatePaymentAccounts',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            //getPaymentAccountsCreditCard();
            getBankCCLists();
            $.alert({
                title: '',
                content: response.model,
                type: 'blue'
            });
            clearSavePaymentAccounts();
            $('#popAddNewAccount').modal('hide');
            $("#hndPaymentAccountsID").val('0');
        }
    });
};
//Sachin M 01 July 2020
var getBankCCLists = function () {
    $("#divLoader").show();
    var model = {
        TenantID: $("#hndTenantID").val(),
    }
    $.ajax({
        url: "/ApplyNow/GetBankCCListTenant",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#tblBankCC>tbody").empty();
            $.each(response.model, function (elementType, elementValue) {
                var html = "<tr id='tr_" + elementValue.ID + "' data-value='" + elementValue.ID + "'>";
                html += "<td>" + elementValue.PaymentMethodString + "</td>";
                html += "<td>" + elementValue.Name_On_Card + "</td>";

                html += "<td><input style='background: transparent; margin-right:10px' type='radio' name='rdpay' onclick='selectPay(" + elementValue.ID + ")'></a>";
                html += "</tr>";
                $("#tblBankCC>tbody").append(html);


            });
        }
    });
}
var getPaymentAccountsCreditCard = function () {
    var tenantId = $("#hndTenantID").val();
    var model = {
        TenantId: tenantId,
    };
    $.ajax({
        url: '/PaymentAccounts/GetPaymentsAccountsList',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            var cNum = '';
            var checked = '';
            var cla = '';
            $('#tblPaymentAccountsCreditCard>tbody').empty();
            $.each(response.model, function (elementType, elementValue) {

                if (elementValue.Default == '1') {
                    checked = "<a href='javascript:void(0)' onclick='makeDefaultPayment(" + elementValue.PAID + ");'><i class='fa fa-check fa-lg'></i></a>";
                }
                else {
                    checked = "<a href='javascript:void(0)' onclick='makeDefaultPayment(" + elementValue.PAID + ");'>Make Default</a>";
                }
                if (elementValue.IsLessThanSevenDays == true) {
                    cla = 'class="disabled" style="cursor:pointer;" tooltip="Cant edit or delete before 7 days of payment date"'; 
                }
                else {
                    cla = 'class="" style="cursor:pointer;"';
                }
                var html = "<tr data-value=" + elementValue.PAID + ">";
                //html += "<td>" + elementValue.CardTypeString + "</td>";
                html += "<td>" + elementValue.AccountName + "</td>";
                html += "<td>" + elementValue.NameOnCard + "</td>";
                html += "<td>" + MaskCardNumber(elementValue.CardNumber) + "</td>";
                html += "<td width='11%'>" + checked + "</td>";
                html += "<td  class='table-border-right'><a href='javascript:void(0);' onclick='editPaymentAccounts(" + elementValue.PAID + ")' " + cla + "><img class='m-r20 ml-10' src='/Content/assets/img/icon/pencil.png'/></a>   <a href='javascript:void(0);' onclick='deletePaymentAccounts(" + elementValue.PAID + ")' " + cla + "><img src='/Content/assets/img/icon/Cancel.png'/></a></td>";

                html += "</tr>";
                $("#tblPaymentAccountsCreditCard>tbody").append(html);
            });
        }
    });
};
var getPaymentAccountsBankAccount = function () {
    var tenantId = $("#hndTenantID").val();
    var model = {
        TenantId: tenantId,
    };
    $.ajax({
        url: '/PaymentAccounts/GetPaymentsBankAccountsList',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            var cNum = '';
            var checked = '';
            var cla = '';
            $('#tblPaymentAccountsBankAccount>tbody').empty();
            $.each(response.model, function (elementType, elementValue) {

                if (elementValue.Default == '1') {
                    checked = "<a href='javascript:void(0)' onclick='makeDefaultPayment(" + elementValue.PAID + ");'><i class='fa fa-check fa-lg'></i></a>";
                }
                else {
                    checked = "<a href='javascript:void(0)' onclick='makeDefaultPayment(" + elementValue.PAID + ");'>Make Default</a>";
                }
                if (elementValue.IsLessThanSevenDays == true) {
                    cla = 'class="disabled" style="cursor:pointer;" tooltip="Cant edit or delete before 7 days of payment date"';
                }
                else {
                    cla = 'class="" style="cursor:pointer;"';
                }
                var html = "<tr data-value=" + elementValue.PAID + ">";
                html += "<td>" + elementValue.BankName + "</td>";
                html += "<td>" + elementValue.AccountName + "</td>";
                html += "<td>" + MaskCardNumber(elementValue.AccountNumber) + "</td>";
                html += "<td>" + MaskCardNumber(elementValue.RoutingNumber) + "</td>";

               
                html += "<td width='11%'>" + checked + "</td>";
                html += "<td class='table-border-right'><a href='javascript:void(0);' onclick='editPaymentBankAccounts(" + elementValue.PAID + ")' " + cla + "><img class='m-r20 ml-10' src='/Content/assets/img/icon/pencil.png'/></a>   <a href='javascript:void(0);' onclick='deletePaymentAccounts(" + elementValue.PAID + ")' " + cla + "><img src='/Content/assets/img/icon/Cancel.png'/></a></td>";


                html += "</tr>";
                $("#tblPaymentAccountsBankAccount>tbody").append(html);
            });
        }
    });
};

var editPaymentAccounts = function (id) {
    var model = {
        PAID: id,
    };
    $.ajax({
        url: '/PaymentAccounts/EditPaymentsAccounts',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $('#popAddNewAccount').modal('show');
            $('#DivPayMethodBankAccount').addClass('hidden');
            $('#DivPayMethodCreditCard').removeClass('hidden');
            $("#hndPaymentAccountsID").val(response.model.PAID);
            $('#ddlPayMethodPaymentAccounts').val(response.model.PayMethod)
            $("#txtAccountNamePayMethod").val(response.model.AccountName);
            $("#ddlCardType").val(response.model.CardType);
            $("#txtNameOnCard").val(response.model.NameOnCard);
            $("#txtCardNumber").val(response.model.CardNumber);
            $("#ddlCardMonth").val(response.model.Month);
            $("#ddlCardYear").val(response.model.Year);

            $("#txtBankNamePayMethod").val('');
            $("#txtAccountNumberPayMethod").val('');
            $("#txtRoutingNumberPayMethod").val('');
        }
    });
};

var editPaymentBankAccounts = function (id) {
    var model = {
        PAID: id,
    };
    $.ajax({
        url: '/PaymentAccounts/EditPaymentsBankAccounts',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $('#popAddNewAccount').modal('show');
            $('#DivPayMethodBankAccount').removeClass('hidden');
            $('#DivPayMethodCreditCard').addClass('hidden');
            $("#hndPaymentAccountsID").val(response.model.PAID);
            $('#ddlPayMethodPaymentAccounts').val(response.model.PayMethod)
            $("#txtAccountNamePayMethod").val(response.model.AccountName);
            $("#txtBankNamePayMethod").val(response.model.BankName);
            $("#txtAccountNumberPayMethod").val(response.model.AccountNumber);
            $("#txtRoutingNumberPayMethod").val(response.model.RoutingNumber);

            $("#ddlCardType").val('0');
            $("#txtNameOnCard").val('');
            $("#txtCardNumber").val('');
            $("#ddlCardMonth").val();
            $("#ddlCardYear").val();
        }
    });
};

var deletePaymentAccounts = function (id) {
    var model = {
        PAID: id,
    };
    $.alert({
        title: "",
        content: "Are you sure to remove Payment Account?",
        type: 'blue',
        buttons: {
            yes: {
                text: 'Yes',
                action: function (yes) {
                    $.ajax({
                        url: '/PaymentAccounts/DeletePaymentsAccounts',
                        type: "post",
                        contentType: "application/json utf-8",
                        data: JSON.stringify(model),
                        dataType: "JSON",
                        success: function (response) {
                            $.alert({
                                title: '',
                                content: response.model,
                                type: 'blue'
                            });
                           // getPaymentAccountsCreditCard();
                            getBankCCLists();
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

var goToServiceStep = function (stepid, id) {

    if (stepid == "1") {
        $("#service1").addClass("active");
        $("#service2").removeClass("active");

        $("#serviceStep1").removeClass("hidden");
        $("#serviceStep2").addClass("hidden");
        $('#btnPrimaryRequestEmergency').removeClass('hidden');
        $('#DivNote').addClass('hidden');
    }
    if (stepid == "2") {
       
        $("#service1").removeClass("active");
        $("#service2").addClass("active");

        $("#serviceStep1").addClass("hidden");
        $("#serviceStep2").removeClass("hidden");
        $('#btnPrimaryRequestEmergency').addClass('hidden');
        $('#DivNote').addClass('hidden');
    }
};

var saveUpdateServiceRequest = function () {
    var msg = '';
    var serviceRequest = $("#hdnServiceRequest").val();
    var tenantId = $("#hndTenantID").val();
    var problemCategory = $("#ddlProblemCategory").val();
    var moreDetails = $("#txtMoreDetails").val();
    var apartmentPermission = '';
    var itemCaussing = $("#ddlProblemCategory1").val();
    var itemIssue = $("#ddlProblemCategory2").val();
    var OtherCausingIssue = $("#txtOtherCausingIssue").val();
    var OtherIssue = $("#txtOtherIssue").val();
    var location = $("#ddlLocation").val();
    var preferredDate = $("#txtPreferredDateSR").val();
    var priority = $("#ddlPriority").val();
    var serviceFileTemp = $("#hndfileUploadService").val();
    var serviceFileOriginal = $("#hndOriginalfileUploadService").val();
    var emergency = $("#txtEmergencyMobile").val();
    var preferredTime = $("#txtPreferredTime").val();
    var urgentStatus = 0;

    var petInfoChange = '';
    if ($("#rbtnPetInformation1").is(":checked")) {
        petInfoChange = 1;
    }
    else if ($("#rbtnPetInformation2").is(":checked")) {
        petInfoChange = 0;
    }
    var alarmCodeChange = '';

    //if ($("#rbtnAlarmCodeInformation1").is(":checked")) {
    //    alarmCodeChange = 1;

    //}
    //else if ($("#rbtnAlarmCodeInformation2").is(":checked")) {
    //    alarmCodeChange = 0;
    //}
    var entryNote = $("#txtEntryNote").val();


    if (problemCategory != 0) {
        if (itemCaussing == 0) {
            msg += 'Select The Item Caussing</br>'
        }
        else if (problemCategory == 10) {
            if (moreDetails == 0) {
                msg += 'Please Fill Other</br>'
            }
        }
    }
    else {
        msg += 'Select The Problem Category</br>'
    }

    if (location == 0) {
        msg += 'Select The Location</br>'
    }
    if (priority != 0) {

        if (priority == 4) {
            if (emergency == '') {
                msg += 'Enter The Mobile Number</br>'
            } else {
                urgentStatus = 1;
            }

        }
    } else {
        msg += 'Select The Priority</br>'
    }

    if ($("#rbtnApertmentPermission1").is(":checked")) {
        apartmentPermission = 1;
    }
    else if ($("#rbtnApertmentPermission2").is(":checked")) {
        apartmentPermission = 0;
        if (preferredDate == '' || preferredTime == '') {
            msg += 'Enter The Preferred Date and Time </br>'
        }
    }

    if (msg != '') {
        $.alert({
            title: "",
            content: msg,
            type: 'red'
        });
        return
    }

    var model = {
        ServiceID: serviceRequest,
        TenantID: tenantId,
        ProblemCategory: problemCategory,
        Details: moreDetails,
        PermissionEnterApartment: apartmentPermission,
        PermissionComeDate: preferredDate,
        PetInforChange: petInfoChange,
        // AlarmCodeChange: alarmCodeChange,
        Notes: entryNote,
        Location: location,
        ItemCaussing: itemCaussing,
        OtherItemCaussing: OtherCausingIssue,
        ItemIssue: itemIssue,
        OtherItemIssue: OtherIssue,
        Priority: priority,
        TempServiceFile: serviceFileTemp,
        OriginalServiceFile: serviceFileOriginal,
        EmergencyMobile: emergency,
        PermissionComeTime: preferredTime,
        UrgentStatus: urgentStatus,
    };
    $.ajax({
        url: '/ServiceRequest/SaveUpdateServiceRequest',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $.alert({
                title: '',
                content: response.model,
                type: 'red'
            });
            clearServiceRequestField();
            getServiceRequestList();
            getServiceRequestOnAlarmMyAccount();
            $('#rbtnApertmentPermission1').iCheck('check');
            goToServiceStep(1);
        }
    });
};
var getServiceInfo = function () {
    var tenantId = $("#hndTenantID").val();
    var model = {
        TenantId: tenantId,
    };
    $.ajax({
        url: '/ServiceRequest/GetServiceInfo',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#lblNameUnitAccess").text(response.msg.Name);
            $("#lblUnitUnitAccess").text(response.msg.Unit);
            $("#lblPhoneUnitAccess").text(formatPhoneFax(response.msg.Phone));
            $("#lblEmergencyPhoneUnitAccess").text(formatPhoneFax(response.msg.EmergencyPhone));
            $("#lblEmailUnitAccess").text(response.msg.Email);
            $("#lblEmailUnitAccess").text(response.msg.Email);
            $("#spanTenantSignName").text(response.msg.Name);
            $("#spanTenantSignNameGC").text(response.msg.Name);
        }
    });
}

var clearServiceRequestField = function () {
    $("#ddlProblemCategory").val('0');
    $("#ddlProblemCategory1").val('0');
    $("#ddlProblemCategory2").val('0');
    $("#ddlLocation").val('0');
    $("#ddlPriority").val('0');
    $("#txtMoreDetails").val('');
    $("#txtOtherCausingIssue").val('');
    $("#OtherIssue").addClass('hidden');
    $("#OtherCausingIssue").addClass('hidden');
    $("#Issue").addClass('hidden');
    $("#Mobile").addClass('hidden');
    $("#CausingIssue").addClass('hidden');
    $("#txtOtherIssue").val('');
    $("#txtEntryNote").val('');
    $("#txtPreferredDateSR").val('');
    $("#txtPreferredTime").val('');
    $("#txtEmergencyMobile").val('');
    document.getElementById('fileUploadServiceShow').value = '';
    $("#fileUploadServiceShow").html('Choose a file&hellip;');
    $('#rbtnApertmentPermission1').iCheck('check');
    $('#rbtnPetInformation1').iCheck('check');
    $("#MoreDetails").addClass("hidden");
}

var getServiceRequestList = function () {
    var tenantId = $("#hndTenantID").val();
    var serviceReq = $("#ddlOpenServiceRequest").val();
    var model = {
        TenantId: tenantId,
        ServiceRequest: serviceReq
    };
    $.ajax({
        url: '/ServiceRequest/GetServiceRequestList',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#tblServiceRequest>tbody").empty();
            $.each(response.model, function (elementType, elementValue) {
                var html = "<tr data-value=" + elementValue.ServiceID + ">";
                html += "<td>" + elementValue.DateString + "</td>";
                html += "<td>" + elementValue.ProblemCategorystring + "</td>";
                html += "<td>" + elementValue.StatusString + "</td>";
                html += "<td>" + elementValue.PriorityString + "</td>";
                //html += "<td align='center'><img src='/content/assets/img/pet/" + elementValue.TempServiceFile + "' class='picture-src' title='' style='height:70px;width:70px;'/></td>";
                // html += "<td> <a  target='_blank' href='/Content/assets/img/Document/" + elementValue.TempServiceFile + "'><i class='fa fa-eye'></i></a></td>";
                html += "<td class='table-border-right'>";
                if (elementValue.StatusString == 'Open') {
                    html += "<a style=' cursor:pointer;' onclick='cancelServiceRequest(" + elementValue.ServiceID + ")'><i class='fa fa-times '></i></a></td>"
                }
                html += "</tr>";
                $("#tblServiceRequest>tbody").append(html);
            });
        }
    });
}

var serviceRequestChangeDDL = function () {
    $("#ddlOpenServiceRequest").on("change", function () {
        getServiceRequestList();
    });
};

var copyGuestName = function () {
    $('#spanGuestCertGName').text($('#txtGuestFirstName').val() + ' ' + $('#txtGuestLastName').val());
    $('#spanGuestSignName').text($('#txtGuestFirstName').val() + ' ' + $('#txtGuestLastName').val());

    $('#spanGuestCertGNameGC').text($('#txtGuestFirstName').val() + ' ' + $('#txtGuestLastName').val());
    $('#spanGuestSignNameGC').text($('#txtGuestFirstName').val() + ' ' + $('#txtGuestLastName').val());
}

var uploadGuestDriverLicence = function () {
    $formData = new FormData();

    var uploadGuestDriLic = document.getElementById('fileUploadGuestDriverLicence');

    for (var i = 0; i < uploadGuestDriLic.files.length; i++) {
        $formData.append('file-' + i, uploadGuestDriLic.files[i]);
    }

    $.ajax({
        url: '/GuestRegistration/UploadGuestDriverLicence',
        type: 'post',
        data: $formData,
        contentType: 'application/json; charset=utf-8',
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            $('#hndUploadGuestDriverLicence').val(response.model.DriverLicence);
            $('#hndOriginalUploadGuestDriverLicence').val(response.model.OriginalDriverLicence);
            $('#fileSpanShowGuestDriverLicence').text(response.model.OriginalDriverLicence);
            $.alert({
                title: "",
                content: "File uploaded Successfully.",
                type: 'blue'
            });
        }
    });
};

var uploadGuestVehicleRegistration = function () {
    $formData = new FormData();

    var uploadGuestVehicleReg = document.getElementById('fileUploadGuestRegistration');

    for (var i = 0; i < uploadGuestVehicleReg.files.length; i++) {
        $formData.append('file-' + i, uploadGuestVehicleReg.files[i]);
    }

    $.ajax({
        url: '/GuestRegistration/UploadGuestVehicleRegistration',
        type: 'post',
        data: $formData,
        contentType: 'application/json; charset=utf-8',
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            $('#hndUploadGuestRegistration').val(response.model.VehicleRegistration);
            $('#hndOriginalUploadGuestRegistration').val(response.model.OriginalVehicleRegistration);
            $('#fileSpanShowGuestRegistration').text(response.model.OriginalVehicleRegistration);
            $.alert({
                title: "",
                content: "File uploaded Successfully.",
                type: 'blue'
            });
        }
    });
};

var saveUpdateGuestRegistration = function () {
    var msg = '';
    var guestId = $("#hdnGuestId").val();
    var tenantId = $("#hndTenantID").val();
    var guestFirstName = $("#txtGuestFirstName").val();
    var guestLastName = $("#txtGuestLastName").val();
    var guestAddress = $("#txtGuestAddress").val();
    var guestPhone = $("#txtGuestPhone").val();
    var guestEmail = $("#txtGuestEmail").val();
    var guestVisitStartDate = $("#txtGuestVistStartDate").val();
    var guestVisitEndDate = $("#txtGuestVistEndDate").val();
    var guestVehicleMake = $("#txtGuestVehicleMake").val();
    var guestVehicleModel = $("#txtGuestVehicleModel").val();
    var guestVehicleTag = $("#txtGuestVehicleTag").val();
    var uploadGuestDriverLicence = $("#hndUploadGuestDriverLicence").val();
    var uploadOriginalGuestDriverLicence = $("#hndOriginalUploadGuestDriverLicence").val();
    var uploadGuestVehicleRigistration = $("#hndUploadGuestRegistration").val();
    var uploadGuestVehicleRegis = $("#hndOriginalUploadGuestRegistration").val();
    var fileGueDrvLic = document.getElementById('fileUploadGuestDriverLicence').value;
    var fileGueVehReg = document.getElementById('fileUploadGuestRegistration').value;
    var haveVehicle = 0;


    if (guestFirstName == '') {
        msg += 'Plese Enter First Name</br>'
    }
    if (guestLastName == '') {
        msg += 'Plese Enter Last Name</br>'
    }
    if (guestPhone == '') {
        msg += 'Plese Enter The Phone Number</br>'
    }
    else {
        if (!validatePhone(unformatText($("#txtGuestPhone").val()))) {
            msg += "Please Fill Valid Phone Number </br>";
        }
    }
    if (guestEmail == '') {
        msg += 'Plese Enter The Email Id</br>'
    }
    else {
        if (!validateEmail($("#txtGuestEmail").val())) {
            msg += "Please Fill Valid Email </br>";
        }
    }
    if (guestVisitStartDate == '') {
        msg += 'Plese Select The Visit Start Date</br>'
    }
    if (guestVisitEndDate == '') {
        msg += 'Plese Select The Visit End Date</br>'
    }

    if ($("#chkHaveVehicle").is(":checked")) {
        haveVehicle = 1
        if (guestVehicleMake == '') {
            msg += 'Plese Enter The Vehicle Make</br>'
        }
        if (guestVehicleModel == '') {
            msg += 'Plese Enter The Vehicle Model</br>'
        }
        if (document.getElementById('fileUploadGuestDriverLicence').files.length == 0) {
            msg += 'Plese Upload The Driver Licence</br>'
        }
        if (document.getElementById('fileUploadGuestRegistration').files.length == 0) {
            msg += 'Plese Upload The Vehicle Registration</br>'
        }
    }
    if (msg != '') {
        $.alert({
            title: "",
            content: msg,
            type: 'red'
        });
        return
    }

    var model = {
        GuestID: guestId,
        TenantID: tenantId,
        FirstName: guestFirstName,
        LastName: guestLastName,
        Address: guestAddress,
        Phone: unformatText(guestPhone),
        Email: guestEmail,
        VisitStartDate: guestVisitStartDate,
        VisitEndDate: guestVisitEndDate,
        VehicleMake: guestVehicleMake,
        VehicleModel: guestVehicleModel,
        Tag: guestVehicleTag,
        DriverLicence: uploadGuestDriverLicence,
        VehicleRegistration: uploadGuestVehicleRigistration,
        OriginalDriverLicence: uploadOriginalGuestDriverLicence,
        OriginalVehicleRegistration: uploadGuestVehicleRegis,
        HaveVehicle: haveVehicle
    };
    $.ajax({
        url: '/GuestRegistration/SaveUpdateGuestRegistration',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            var msg = response.model.split("|");
            var splitData = msg[1];
            var showmsg = msg[0] +"<br/>Please monitor your email for guess approval status."

            $("#hdnTagGuestId").val(splitData);
            getTagInfo();
            $.alert({
                title: '',
                content: showmsg,
                type: 'blue'
            });
            clearFieldGuestRegistration();
            //$("#printTag").removeClass('hidden');
            $("#printForm").removeClass('hidden');
        }
    });
};


var onFocusMyAccount = function () {

    $("#txtGuestPhone").focusout(function () { $("#txtGuestPhone").val(formatPhoneFax($("#txtGuestPhone").val())); })
        .focus(function () {
            $("#txtGuestPhone").val(unformatText($("#txtGuestPhone").val()));
        });

    $("#txtChargeAmount").focusout(function () { $("#txtChargeAmount").val(formatMoney($("#txtChargeAmount").val())); })
        .focus(function () {
            $("#txtChargeAmount").val(unformatText($("#txtChargeAmount").val()));
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

var clearFieldGuestRegistration = function () {
    $("#hdnGuestId").val('0');
    $("#txtGuestFirstName").val('');
    $("#txtGuestLastName").val('');
    $("#txtGuestAddress").val('');
    $("#txtGuestPhone").val('');
    $("#txtGuestEmail").val('');
    $("#txtGuestVistStartDate").val('');
    $("#txtGuestVistEndDate").val('');
    $("#txtGuestVehicleMake").val('');
    $("#txtGuestVehicleModel").val('');
    $("#txtGuestVehicleTag").val('');
    $("#hndUploadGuestDriverLicence").val('0');
    $("#hndOriginalUploadGuestDriverLicence").val('0');
    $("#hndUploadGuestRegistration").val('0');
    $("#hndOriginalUploadGuestRegistration").val('0');
    document.getElementById('fileUploadGuestDriverLicence').value = '';
    document.getElementById('fileUploadGuestRegistration').value = '';
    $('#fileSpanShowGuestDriverLicence').html('Choose a file &hellip;');
    $('#fileSpanShowGuestRegistration').html('Choose a file &hellip;');
    $('#spanGuestCertGName').text('_________________')
}

var goToReservationStep = function (stepid, id) {

    if (stepid == "1") {
        $("#reservation1").addClass("active");
        $("#reservation2").removeClass("active");

        $("#reservationStep1").removeClass("hidden");
        $("#reservationStep2").addClass("hidden");
    }
    if (stepid == "2") {
        $("#reservation1").removeClass("active");
        $("#reservation2").addClass("active");

        $("#reservationStep1").addClass("hidden");
        $("#reservationStep2").removeClass("hidden");

        //$("#ddlAmenities").val(id).attr("selected", "selected");
        //$("#SelectedAminity").html($("#ddlAmenities").find(":selected").text());
        //$("#SelectedAminity").attr("data-value", $("#ddlAmenities").find(":selected").val());
        //getDurationSlot(id);

    }
};

var cancelServiceRequest = function (id) {

    var model = {
        ServiceID: id
    };
    $.alert({
        title: "",
        content: "Are you sure to cancle Request?",
        type: 'blue',
        buttons: {
            yes: {
                text: 'Yes',
                action: function (yes) {
                    $.ajax({
                        url: '/ServiceRequest/CancelServiceRequest',
                        type: "post",
                        contentType: "application/json utf-8",
                        data: JSON.stringify(model),
                        dataType: "JSON",
                        success: function (response) {
                            $.alert({
                                title: '',
                                content: response.model,
                                type: 'blue'
                            });
                            getServiceRequestList();
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

function MaskCardNumber(number) {
    var cNumber = '';
    if (number.length > 4) {
        cNumber = "*".repeat(number.length - 4) + number.substr(number.length - 4, 4);
    }
    return cNumber;
};

var fromDashboardMakePayment = function () {
    $.ajax({
        url: '/Dashboard/SetSessionMakePayments',
        type: "post",
        contentType: "application/json utf-8",
        //data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            window.location.href = '/Tenant/MyAccount/Index/' + response.model;
        }
    });
};

var fromDashboardRecurringPayment = function () {
    $.ajax({
        url: '/Dashboard/SetSessionRecurringPayments',
        type: "post",
        contentType: "application/json utf-8",
        //data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            window.location.href = '/Tenant/MyAccount/Index/' + response.model;
        }
    });
};

var fromDashboardGoToMakePayment = function () {

    if ($('#hdnStepId1').val() == "3" && $('#hdnPayStepIdMakePayment').val() == "2") {

        if ($('#hdnStepId1').val() == "3") {
            getUpTransationLists();
            getAllDues();
            getTransationLists();
            //getPaymentAccountsCreditCard();
            getBankCCLists();
            $("#li1").removeClass("active");
            $("#li2").removeClass("active");
            $("#li3").addClass("active");
            $("#li4").removeClass("active");
            $("#li5").removeClass("active");
            $("#li6").removeClass("active");
            $("#li7").removeClass("active");
            $("#step2").removeClass("active");
            $("#step1").removeClass("active");
            $("#step4").removeClass("active");
            $("#step3").addClass("active");
            $("#step5").removeClass("active");
            $("#step6").removeClass("active");
            $("#step7").removeClass("active");
            $("#btnAccountHistoryPrint").addClass("hidden");
        }
        if ($('#hdnPayStepIdMakePayment').val() == "2") {
            $("#pay1").removeClass("active1");
            $("#pay2").addClass("active1");
            $("#pay3").removeClass("active1");
            $("#pay4").removeClass("active1");
            $("#pay5").removeClass("active1");

            $("#payStep1").addClass("hidden");
            $("#payStep2").removeClass("hidden");
            $("#payStep3").addClass("hidden");
            $("#payStep4").addClass("hidden");
            $("#payStep5").addClass("hidden");
            $('#btnPaymentSnapshot').addClass('hidden');
            $('#btnRecurringPayment').removeClass('hidden');
        }

    }
    //$('#hdnStepId1').val('0');
    //$('#hdnPayStepIdMakePayment').val('0');
}
var fromDashboardGoToRecurringPayment = function () {

    if ($('#hdnStepId2').val() == "3" && $('#hdnPayStepIdRecurring').val() == "4") {

        if ($('#hdnStepId2').val() == "3") {
            getUpTransationLists();
            getAllDues();
            getTransationLists();
            //getPaymentAccountsCreditCard();
            getBankCCLists();
            $("#li3").addClass("active");
            $("#li2").removeClass("active");
            $("#li1").removeClass("active");
            $("#li4").removeClass("active");
            $("#step2").removeClass("active");
            $("#step1").removeClass("active");
            $("#step4").removeClass("active");
            $("#step3").addClass("active");//add
            $("#li5").removeClass("active");
            $("#li6").removeClass("active");
            $("#step5").removeClass("active");
            $("#step6").removeClass("active");
            $("#step7").removeClass("active");
            $("#li7").removeClass("active");
        }
        if ($('#hdnPayStepIdRecurring').val() == "4") {
            $("#pay1").removeClass("active");
            $("#pay2").removeClass("active1");
            $("#pay3").removeClass("active1");
            $("#pay4").addClass("active");
            $("#pay5").removeClass("active1");

            $("#payStep1").addClass("hidden");
            $("#payStep2").addClass("hidden");
            $("#payStep3").addClass("hidden");
            $("#payStep4").removeClass("hidden");
            $("#payStep5").addClass("hidden");
            $('#btnPaymentSnapshot').removeClass('hidden');
            $('#btnRecurringPayment').addClass('hidden');
            $('#btnAccountHistoryPrint').addClass('hidden');
            $('#DivNote').addClass('hidden');
        }

    }
    $('#hdnStepId2').val('0');
    $('#hdnPayStepIdRecurring').val('0');

}

var fromDashboardGoToRegisterGuest = function () {

    if ($('#hdnStepRegister').val() == "7") {

        if ($('#hdnStepRegister').val() == "7") {
            getUpTransationLists();
            getAllDues();
            getTransationLists();
           // getPaymentAccountsCreditCard();
            getBankCCLists();
            $("#li3").removeClass("active");
            $("#li2").removeClass("active");
            $("#li1").removeClass("active");
            $("#li4").removeClass("active");
            $("#li7").addClass("active");
            $("#li5").removeClass("active");
            $("#li6").removeClass("active");
            $("#step2").removeClass("active");
            $("#step1").removeClass("active");
            $("#step4").removeClass("active");
            $("#step3").removeClass("active");
            $("#step5").removeClass("active");
            $("#step6").removeClass("active");
            $("#step7").addClass("active");//active



        }


    }
    $('#hdnStepRegisterGuest').val('0');

}

var fromDashboardGoToReserveAmenities = function () {

    if ($('#hdnStepReserveAmenities').val() == "5" && $('#hdnPayIdReserveAmenities').val() == "2") {

        if ($('#hdnStepReserveAmenities').val() == "5") {
            $("#step5").addClass("active");//active
            $("#li5").addClass("active");

            $("#li4").removeClass("active");
            $("#li2").removeClass("active");
            $("#li3").removeClass("active");
            $("#li1").removeClass("active");
            $("#step2").removeClass("active");
            $("#step1").removeClass("active");
            $("#step3").removeClass("active");
            $("#step4").removeClass("active");
            $("#li6").removeClass("active");
            $("#step6").removeClass("active");
            $("#step7").removeClass("active");
            $("#li7").removeClass("active");

        }
        if ($('#hdnPayIdReserveAmenities').val() == "2") {
            //    getPaymentMethods();
            //    $("#pay1").removeClass("active");
            //    $("#pay2").removeClass("active");
            //    $("#pay3").removeClass("active");
            //    $("#pay4").removeClass("active");
            //    $("#pay5").removeClass("active");

            //    $("#payStep1").addClass("hidden");
            //    $("#payStep2").addClass("hidden");
            //    $("#payStep3").addClass("hidden");
            //    $("#payStep4").addClass("hidden");
            //    $("#payStep5").addClass("hidden");

            $("#reservation1").removeClass("active");
            $("#reservation2").addClass("active");

            $("#reservationStep1").addClass("hidden");
            $("#reservationStep2").removeClass("hidden");

          
            //    $('#btnPaymentSnapshot').addClass('hidden');
            //    $('#btnRecurringPayment').removeClass('hidden');
        }

    }
    $('#hdnStepReserveAmenities').val('0');
    $('#hdnPayStepIdReserveAmenities').val('0');
}

var fromDashboardGoToSubmitServiceRequest = function () {

    if ($('#hdnStepIdServiceRequest').val() == "4" && $('#hdnServiceStepIdServiceRequest2').val() == "2") {

        if ($('#hdnStepIdServiceRequest').val() == "4") {
            getServiceRequestList();
            serviceRequestChangeDDL();
            getServiceInfo();
            $("#li4").addClass("active");
            $("#li2").removeClass("active");
            $("#li3").removeClass("active");
            $("#li1").removeClass("active");
            $("#step2").removeClass("active");
            $("#step1").removeClass("active");
            $("#step3").removeClass("active");
            $("#step4").addClass("active");//active
            $("#li5").removeClass("active");
            $("#li6").removeClass("active");
            $("#step5").removeClass("active");
            $("#step6").removeClass("active");
            $("#step7").removeClass("active");
            $("#li7").removeClass("active");
        }
        if ($('#hdnServiceStepIdServiceRequest2').val() == "2") {

           
            $("#service1").removeClass("active");
            $("#service2").addClass("active");

            $("#serviceStep1").addClass("hidden");
            $("#serviceStep2").removeClass("hidden");
            $('#btnPrimaryRequestEmergency').addClass('hidden');
            $('#DivNote').addClass('hidden');
        }

    }
    $('#hdnStepIdServiceRequest').val('0');
    $('#hdnServiceStepIdServiceRequest2').val('0');

}



var dateRangeAccountHistorySearch = function () {
    var model = {
        TenantID: $("#hndTenantID").val(),
        FromDate: $('#txtFromDate').val(),
        ToDate: $('#txtToDate').val()
    };

    if ($('#txtFromDate').val() == "" && $('#txtToDate').val() == "") {
        $.alert({
            title: '',
            content: "Please Select The Date",
            type: 'blue'
        });
        return
    }
    $.ajax({
        url: "/MyTransaction/GetAccountHistoryListByDateRange",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $('#popDateRangeAccountHistory').modal('hide');
            var bal = 0;
            $("#tblPaymentHistory>tbody").empty();
            $.each(response.model, function (elementType, elementValue) {
                var html = "<tr data-value=" + elementValue.TransID + ">";
                html += "<td>" + elementValue.Transaction_DateString + "</td>";

                if (elementValue.Credit_Amount != "0.00" && elementValue.Charge_Amount == "0.00") {
                    html += "<td>" + elementValue.Description + "<a href='javascript:void(0);' class='pull-right'  data-toggle='modal' data-target='#popPaymentReceipt' onclick='getInvoice(" + elementValue.TransID + ")'><img src='/Content/assets/Assets/rec.jpg' style='height: 20px;'/></td>";
                    html += "<td style='text-align: right;'>$" + formatMoney(elementValue.Charge_Amount) + "</td>";
                    html += "<td style='text-align: right;'><b>$" + formatMoney(elementValue.Credit_Amount) + "</b></td>";
                } else {

                    html += "<td>" + elementValue.Description + "<a href='javascript:void(0);' class='pull-right'  data-toggle='modal' data-target='#popInvoice' onclick='getInvoice(" + elementValue.TransID + ")'><img src='/Content/assets/Assets/inv.png' style='height: 20px;'/></a></td>";
                    html += "<td style='text-align: right;'>$" + formatMoney(elementValue.Charge_Amount) + "</td>";
                    html += "<td style='text-align: right;'>$" + formatMoney(elementValue.Credit_Amount) + "</td>";
                }

                bal = parseFloat((parseFloat(bal) + parseFloat(elementValue.Charge_Amount)) - parseFloat(elementValue.Credit_Amount));
                html += "<td style='text-align: right;'>$" + formatMoney(bal) + "</td>";
                html += "</tr>";
                $("#tblPaymentHistory>tbody").append(html);
            });
        }
    });
};

var makeDefaultPayment = function (id) {
    var model = {
        TenantId: $("#hndTenantID").val(),
        PAID: id
    };
    $("#divLoader").show();
    $.ajax({
        url: "/PaymentAccounts/MakeDefaultPaymentSystem",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
           // getPaymentAccountsCreditCard();
            //getPaymentAccountsBankAccount();
            getBankCCLists();
            $.alert({
                title: "",
                content: response.model,
                type: 'red'
            });
            $("#divLoader").hide();
        }
    });
};

var amountToPayRadioButtonFunction = function () {
    $('input[type=radio]').on('ifChanged', function (event) {
        if ($("#rbtnAmountToPay1").is(":checked")) {
            $('#divOtherAmount').removeClass('show');
            $('#divOtherAmount').addClass('hidden');
        }
        else if ($("#rbtnAmountToPay2").is(":checked")) {
            $('#divOtherAmount').removeClass('hidden');
            $('#divOtherAmount').addClass('show');
        }
        if ($("#rbtnAmountToPayR1").is(":checked")) {
            $('#divOtherAmountR').removeClass('show');
            $('#divOtherAmountR').addClass('hidden');
        }
        else if ($("#rbtnAmountToPayR2").is(":checked")) {
            $('#divOtherAmountR').removeClass('hidden');
            $('#divOtherAmountR').addClass('show');
        }
    });
};



var recPayment = function () {
    $('#rbtnAmountToPay2').removeAttr('checked');
    $('#rbtnAmountToPay1').attr('checked', 'checked');
    $('#rbtnModiAll').removeAttr('checked');
    $('#rbtnModi1').attr('checked', 'checked');
};

function makeOneTimePaymentSaveUpdate() {

    var model = {
        PAID: $('#ddlPaymentMethod').val()
    };



    var msg = "";
    var transid = $("#hndTransID").val();
    var propertyid = $("#ddlProperty").val();
    var unitid = $("#ddlUnit").val();
    var tenantid = $("#hndTenantID").val();
    var leaseId = $("#hndLID").val();
   
    var chargeDate = $("#txtPrefarredDate").val();
    var chargeType = $("#hndChargeType").val();
    var chargeAmount = unformatText($("#txtChargeAmount").val());
    var summaryCharge = $("#txtSummaryCharge").val();
    var CVVFromPayMethod = $("#txtCVVNumberPayRentOnline").val();

    var desc = $("#txtDescriptionText").val();
    var amount = '';
    if ($("#rbtnAmountToPay1").is(":checked")) {
        amount = unformatText($('#lblCurrentPrePayAmount').text());
    }
    else if ($("#rbtnAmountToPay2").is(":checked")) {
        amount = unformatText($('#txtOtherAmount').val());
    }
    else {
        amount = '';
    }
    if ($("#ddlPaymentMethod").val() == '0') {
        msg += "Select Payment Method</br>";
    }
    if ($('#ddlPaymentMethod').find(':selected').data('value') == '1') {
        if ($("#txtCVVNumberPayRentOnline").val() == '') {
            msg += "Enter CVV Number</br>";
        }
    }
    if (amount == '') {
        msg += "Check Amount To Pay And Enter Charge Amount</br>";
    }
    if ($("#txtPrefarredDate").val() == "") {
        msg += "Enter Charge Date</br>";
    }
    if ($("#chkTermsAndCondition").is(":checked")) {
        msg += '';
    }
    else {
        msg += 'Check Terms and Policy</br>';
    }

    if (msg != "") {
        $.alert({
            title: 'Alert!',
            content: msg,
            type: 'red'
        });
        return;
    }

    var models = {
        PAID: $('#ddlPaymentMethod').val(),
        TransID: transid,
        PropertyID: propertyid,
        UnitID: unitid,
        TenantID: tenantid,
 
        Charge_Date: chargeDate,
      
        Charge_Amount: amount,
        Summary_Charge_Type: summaryCharge,
        Description: desc,

        CCVNumber: CVVFromPayMethod,
        Batch: $("#hdnARId").val(),
        TMPID: $("#hndRecId").val(),
        UserId: $("#hndUserId").val()
    };
    $.alert({
        title: "",
        content: "You have chosen to pay $" + amount + " plus a $" + parseFloat(getProcessingFeesMA()).toFixed(2)  + " processing fee, your total will be $" + parseFloat(parseFloat(amount) + parseFloat(getProcessingFeesMA())).toFixed(2) + ". Do you want to Pay Now?",
        type: 'blue',
        buttons: {
            yes: {
                text: 'Yes',
                action: function (yes) {
                    $.ajax({
                        url: "/MyTransaction/SaveUpdateTransaction/",
                        type: "post",
                        contentType: "application/json utf-8",
                        data: JSON.stringify(models),
                        dataType: "JSON",
                        success: function (response) {
                            $.alert({
                                title: 'Message!',
                                content: response.Msg,
                                type: 'blue',
                            });
                            clearMakePaymentFields();
                            getTransationLists();
                            getUpTransationLists();
                            getAllDues();
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
}

var clearMakePaymentFields = function () {
    $("#hndTransID").val(0);

    $("#ddlPaymentMethod").val(0);
    $("#rbtnAmountToPay1").attr('checked', 'checked');
    $("#txtOtherAmount").val('');
    $("#txtDescriptionText").val('');
}

var radioButtonPaymentMethodMakePayment = function (id) {

    $('#hdnTablePaidId').val(id);

};

var focuss = function () {
    $("#txtOtherAmount").focusout(function () { $("#txtOtherAmount").val(formatMoney($("#txtOtherAmount").val())); })
        .focus(function () {
            $("#txtOtherAmount").val(unformatText($("#txtOtherAmount").val()));
        });

    $("#txtOtherAmountR").focusout(function () { $("#txtOtherAmountR").val(formatMoney($("#txtOtherAmountR").val())); })
        .focus(function () {
            $("#txtOtherAmountR").val(unformatText($("#txtOtherAmountR").val()));
        });
}

var selectPayMethodChange = function (id) {
    var currentId = localStorage.getItem('checkId');
    $('#tblPaymentMethods>tbody').find('a').text('Select');
    $('#tblPaymentMethods>tbody').find('input').val('');
    $('#tblPaymentMethods>tbody').find('input').attr("disabled", "disabled");
    $('#hdnCVVFromPayment').val('');
    var tbl = $('#tblPaymentMethods').find('tbody').find('tr');
    for (var i = 0; i < tbl.length; i++) {
        var trid = $(tbl[i]).closest('tr').attr('data-value');
        console.log(trid);
        var dn = $(tbl[i]).find('td:eq(0)').find('a').html();
        console.log(dn);
        if (id == trid) {
            $(tbl[i]).find('td:eq(0)').find('a').html("<i class='fa fa-check fa-lg'></i>");
            $(tbl[i]).find('td:eq(5)').find('input').removeAttr("disabled");
            $('#hdnTablePaidId').val(id);
            return;
        }
    }
};

var goToSubmitServiceRequestFromMyHome = function () {
    getServiceRequestList();
    serviceRequestChangeDDL();
    getServiceInfo();
    $("#li4").addClass("active");
    $("#li2").removeClass("active");
    $("#li3").removeClass("active");
    $("#li1").removeClass("active");
    $("#step2").addClass("hidden");
    $("#step1").addClass("hidden");
    $("#step3").addClass("hidden");
    $("#step4").removeClass("hidden");
    $("#li5").removeClass("active");
    $("#li6").removeClass("active");
    $("#step5").addClass("hidden");
    $("#step6").addClass("hidden");
    $("#step7").addClass("hidden");
    $("#li7").removeClass("active");

   
    $("#service1").removeClass("active");
    $("#service2").addClass("active");

    $("#serviceStep1").addClass("hidden");
    $("#serviceStep2").removeClass("hidden");
    $('#btnPrimaryRequestEmergency').addClass('hidden');
    $('#DivNote').addClass('hidden');
};

var goToPaymentFromMyHome = function () {
    ddlPaymentMethod();
    ddlPayMethodPageLoadFunction();
    $("#li3").addClass("active");
    $("#li2").removeClass("active");
    $("#li1").removeClass("active");
    $("#li4").removeClass("active");
    $("#step2").addClass("hidden");
    $("#step1").addClass("hidden");
    $("#step4").addClass("hidden");
    $("#step3").removeClass("hidden");
    $("#li5").removeClass("active");
    $("#li6").removeClass("active");
    $("#step5").addClass("hidden");
    $("#step6").addClass("hidden");
    $("#step7").addClass("hidden");
    $("#li7").removeClass("active");
    clearMakePaymentFields();
    $("#pay1").addClass("active1");
    $("#pay2").removeClass("active1");
    $("#pay3").removeClass("active1");
    $("#pay4").removeClass("active1");
    $("#pay5").removeClass("active1");

    $("#payStep1").removeClass("hidden");
    $("#payStep2").addClass("hidden");
    $("#payStep3").addClass("hidden");
    $("#payStep4").addClass("hidden");
    $("#payStep5").addClass("hidden");
    $('#btnAccountHistoryPrint').addClass('hidden');
    $('#DivNote').addClass('hidden');
};

var goToRecurringPaymentFromMyHome = function () {
 
    getUpTransationLists();
    getAllDues();
    getTransationLists();
    //getPaymentAccountsCreditCard();
    getBankCCLists();
    $("#li3").addClass("active");
    $("#li2").removeClass("active");
    $("#li1").removeClass("active");
    $("#li4").removeClass("active");
    $("#step2").addClass("hidden");
    $("#step1").addClass("hidden");
    $("#step4").addClass("hidden");
    $("#step3").removeClass("hidden");
    $("#li5").removeClass("active");
    $("#li6").removeClass("active");
    $("#step5").addClass("hidden");
    $("#step6").addClass("hidden");
    $("#step7").addClass("hidden");
    $("#li7").removeClass("active");

    $("#pay1").removeClass("active1");
    $("#pay2").removeClass("active1");
    $("#pay3").removeClass("active1");
    $("#pay4").addClass("active1");
    $("#pay5").removeClass("active1");

    $("#payStep1").addClass("hidden");
    $("#payStep2").addClass("hidden");
    $("#payStep3").addClass("hidden");
    $("#payStep4").removeClass("hidden");
    $("#payStep5").addClass("hidden");
    $('#btnPaymentSnapshot').removeClass('hidden');
    $('#btnRecurringPayment').addClass('hidden');
    $('#btnAccountHistoryPrint').addClass('hidden');
    $('#DivNote').addClass('hidden');
};

var fillDropdowns = function () {

    $("#ddlProblemCategory").empty();
    $("#ddlProblemCategory").append("<option data-id='0' value='A0'>Select Problem Category</option>");
    $("#ddlProblemCategory").append("<option data-id='1' value='A1'>Appliance</option>");
    $("#ddlProblemCategory").append("<option data-id='2' value='A2'>Doors & Locks</option>");
    $("#ddlProblemCategory").append("<option data-id='3' value='A3'>Electrical and Lighting</option>");
    $("#ddlProblemCategory").append("<option data-id='4' value='A4'>Flooring</option>");
    $("#ddlProblemCategory").append("<option data-id='5' value='A5'>General</option>");
    $("#ddlProblemCategory").append("<option data-id='6' value='A6'>Heating & cooling</option>");
    $("#ddlProblemCategory").append("<option data-id='7' value='A7'>Plumbing & bath</option>");
    $("#ddlProblemCategory").append("<option data-id='8' value='A8'>Safety equipment</option>");
    $("#ddlProblemCategory").append("<option data-id='9' value='A9'>Preventative maintenance</option>");
    $("#ddlProblemCategory").append("<option data-id='10' value='A10'>Other</option>");
    $("#ddlProblemCategory").on('change', function (evt, params) {
        var selected = $(this).val();
        if ($(this).val() == 'A1') {
            $("#ddlProblemCategory1").empty();
            $("#Issue").addClass("hidden");
            $("#CausingIssue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#MoreDetails").addClass("hidden");
            $("#ddlProblemCategory1").append("<option  data-id='0' value='C0'>What Item Is causing The Issue?</option>");
            $("#ddlProblemCategory1").append("<option data-id='1' value='C1'>Clothes Dryer</option>");
            $("#ddlProblemCategory1").append("<option data-id='2' value='C2'>Clothes Washer</option>");
            $("#ddlProblemCategory1").append("<option data-id='3' value='C3'>Dishwasher</option>");
            $("#ddlProblemCategory1").append("<option data-id='4' value='C4'>Disposal</option>");
            $("#ddlProblemCategory1").append("<option data-id='5' value='C5'>Microwave</option>");
            $("#ddlProblemCategory1").append("<option data-id='6' value='C6'>Range/Oven</option>");
            $("#ddlProblemCategory1").append("<option data-id='7' value='C7'>Refrigerator/Freezer</option>");
            $("#ddlProblemCategory1").append("<option data-id='8' value='C8'>Other</option>");

        }
        else if ($(this).val() == 'A0') {
            $("#ddlProblemCategory1").empty();
            $("#Issue").addClass("hidden");
            $("#CausingIssue").addClass("hidden");
            $("#MoreDetails").addClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'A2') {
            $("#ddlProblemCategory1").empty();
            $("#Issue").addClass("hidden");
            $("#MoreDetails").addClass("hidden");
            $("#CausingIssue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory1").append("<option data-id='0' value='Doors0'>What Item Is causing The Issue?</option>");
            $("#ddlProblemCategory1").append("<option data-id='1' value='Doors1'>Lost FOB</option>");
            $("#ddlProblemCategory1").append("<option data-id='2' value='Doors2'>Lost mailbox key");
            $("#ddlProblemCategory1").append("<option data-id='3' value='Doors3'>Doors & Locks- Other");
        }
        else if ($(this).val() == 'A3') {
            $("#ddlProblemCategory1").empty();
            $("#Issue").addClass("hidden");
            $("#CausingIssue").removeClass("hidden");
            $("#MoreDetails").addClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory1").append("<option data-id='0' value='PTE0'>What Item Is causing The Issue?</option>");
            $("#ddlProblemCategory1").append("<option data-id='1' value='PTE1'>Ceiling Fan</option>");
            $("#ddlProblemCategory1").append("<option data-id='2' value='PTE2'>Electrical Box</option>");
            $("#ddlProblemCategory1").append("<option data-id='3' value='PTE3'>Electrical Outlet</option>");
            $("#ddlProblemCategory1").append("<option data-id='4' value='PTE4'>Exterior Lighting</option>");
            $("#ddlProblemCategory1").append("<option data-id='5' value='PTE5'>Interior Lighting</option>");
            $("#ddlProblemCategory1").append("<option data-id='6' value='PTE6'>Ventilation fan/Oven</option>");
            $("#ddlProblemCategory1").append("<option data-id='7' value='PTE7'>Other Miscellaneous Electrical</option>");


        }
        else if ($(this).val() == 'A4') {
            $("#ddlProblemCategory1").empty();
            $("#Issue").addClass("hidden");
            $("#CausingIssue").removeClass("hidden");
            $("#MoreDetails").addClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory1").append("<option data-id='0' value='PTF0'>What Item Is causing The Issue?</option>");
            $("#ddlProblemCategory1").append("<option data-id='1' value='PTF1'>Tile</option>");
            $("#ddlProblemCategory1").append("<option data-id='2' value='PTF2'>LVT/Vinyl Flooring</option>");


        }
        else if ($(this).val() == 'A5') {
            $("#ddlProblemCategory1").empty();
            $("#Issue").addClass("hidden");
            $("#CausingIssue").removeClass("hidden");
            $("#MoreDetails").addClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory1").append("<option data-id='0' value='PTG0'>What Item Is causing The Issue?</option>");
            $("#ddlProblemCategory1").append("<option data-id='1' value='PTG1'>Cabinet</option>");
            $("#ddlProblemCategory1").append("<option data-id='2' value='PTG2'>Counter Top</option>");
            $("#ddlProblemCategory1").append("<option data-id='3' value='PTG3'>Drawer</option>");
            $("#ddlProblemCategory1").append("<option data-id='4' value='PTG4'>Drywall</option>");
            $("#ddlProblemCategory1").append("<option data-id='5' value='PTG5'>Paint</option>");
            $("#ddlProblemCategory1").append("<option data-id='6' value='PTG6'>Pest Controll</option>");
            $("#ddlProblemCategory1").append("<option data-id='7' value='PTG7'>Shelving</option>");
            $("#ddlProblemCategory1").append("<option data-id='8' value='PTG8'>Trim Board</option>");
            $("#ddlProblemCategory1").append("<option data-id='9' value='PTG9'>Wallpaper</option>");
            $("#ddlProblemCategory1").append("<option data-id='10' value='PTG10'>Window</option>");
            $("#ddlProblemCategory1").append("<option data-id='11' value='PTG11'>Window Lock</option>");
            $("#ddlProblemCategory1").append("<option data-id='12' value='PTG12'>Window Tretament</option>");

        }
        else if ($(this).val() == 'A6') {
            $("#ddlProblemCategory1").empty();
            $("#Issue").addClass("hidden");
            $("#CausingIssue").removeClass("hidden");
            $("#MoreDetails").addClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory1").append("<option data-id='0' value='PTAIR0'>What Item Is causing The Issue?</option>");
            $("#ddlProblemCategory1").append("<option data-id='1' value='PTAIR1'>A/C does not cool properly</option>");
            $("#ddlProblemCategory1").append("<option data-id='2' value='PTAIR2'>A/C filter needs changing</option>");
            $("#ddlProblemCategory1").append("<option data-id='3' value='PTAIR3'>A/C leaks</option>");
            $("#ddlProblemCategory1").append("<option data-id='4' value='PTAIR4'>A/C musty/other odor</option>");
            $("#ddlProblemCategory1").append("<option data-id='5' value='PTAIR5'>A/C makes noise</option>");
            $("#ddlProblemCategory1").append("<option data-id='6' value='PTAIR6'>Heater does not heat properly</option>");
            $("#ddlProblemCategory1").append("<option data-id='7' value='PTAIR7'>Thermostat does not work</option>");
            $("#ddlProblemCategory1").append("<option data-id='8' value='PTAIR8'>A/C- Other problems.</option>");
            $("#ddlProblemCategory1").append("<option data-id='9' value='PTAIR9'>Heater-Other problems.</option>");
            $("#ddlProblemCategory1").append("<option data-id='10' value='PTAIR10'>Thermostat-Other problem.</option>");

        }
        else if ($(this).val() == 'A7') {
            $("#ddlProblemCategory1").empty();
            $("#Issue").addClass("hidden");
            $("#MoreDetails").addClass("hidden");
            $("#CausingIssue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory1").append("<option data-id='0' value='PTPLUM0'>What Item Is causing The Issue?</option>");
            $("#ddlProblemCategory1").append("<option data-id='1' value='PTPLUM1'>Faucet</option>");
            $("#ddlProblemCategory1").append("<option data-id='2' value='PTPLUM2'>Water Heater</option>");
            $("#ddlProblemCategory1").append("<option data-id='3' value='PTPLUM3'>Mirror</option>");
            $("#ddlProblemCategory1").append("<option data-id='4' value='PTPLUM4'>Paper Holder</option>");
            $("#ddlProblemCategory1").append("<option data-id='5' value='PTPLUM5'>General</option>");
            $("#ddlProblemCategory1").append("<option data-id='6' value='PTPLUM6'>Shower</option>");
            $("#ddlProblemCategory1").append("<option data-id='7' value='PTPLUM7'>Sink</option>");
            $("#ddlProblemCategory1").append("<option data-id='8' value='PTPLUM8'>Toilet</option>");
            $("#ddlProblemCategory1").append("<option data-id='9' value='PTPLUM9'>Tub</option>");
            $("#ddlProblemCategory1").append("<option data-id='10' value='PTPLUM10'>Plumbing- Other problem</option>");

        }
        else if ($(this).val() == 'A9') {
            $("#ddlProblemCategory1").empty();
            $("#Issue").addClass("hidden");
            $("#MoreDetails").addClass("hidden");
            $("#CausingIssue").addClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");

        }
        else if ($(this).val() == 'A8') {
            $("#ddlProblemCategory1").empty();
            $("#Issue").addClass("hidden");
            $("#MoreDetails").addClass("hidden");
            $("#CausingIssue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory1").append("<option data-id='0' value='PTSafety0'>What Item Is causing The Issue?</option>");
            $("#ddlProblemCategory1").append("<option data-id='1' value='PTSafety1'>Fire Equipment</option>");
            $("#ddlProblemCategory1").append("<option data-id='2' value='PTSafety2'>Fire Sprinkler</option>");
            $("#ddlProblemCategory1").append("<option data-id='3' value='PTSafety3'>Smoke/CO detector</option>");
        }
        else if ($(this).val() == 'A10') {
            $("#ddlProblemCategory1").empty();
            $("#Issue").addClass("hidden");
            $("#MoreDetails").removeClass("hidden");
            $("#CausingIssue").addClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
        }
    });

    $("#ddlProblemCategory1").on('change', function (evt, params) {
        var selected = $("#ddlProblemCategory").val();

        if ($("#ddlProblemCategory1").val() == 'C1') {
            $("#Issue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='Dry1'>Dryer controls do not work</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Dry2'>Dryer does not work properly</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='Dry3'>Dryer lint trap damaged/broken</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='Dry4'>Dryer takes too long to dry</option>");
            $("#ddlProblemCategory2").append("<option data-id='5' value='Dry5'>Dryer- other problem</option>");

        }

        else if ($("#ddlProblemCategory1").val() == 'C0') {
            $("#OtherCausingIssue").addClass("hidden");
            $("#Issue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
        }
        else if ($("#ddlProblemCategory1").val() == 'C2') {
            $("#Issue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='Washer1'>Washer controls/knobs broken</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Washer2'>Washer damages clothes</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='Washer3'>Washer- no cycle/rinse/spin</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='Washer4'>Washer will not fill/drain</option>");
            $("#ddlProblemCategory2").append("<option data-id='5' value='Washer5'>Washer does not work</option>");
            $("#ddlProblemCategory2").append("<option data-id='6' value='Washer6'>Washer is making noise</option>");
            $("#ddlProblemCategory2").append("<option data-id='7' value='Washer7'>Washer leaks water</option>");
            $("#ddlProblemCategory2").append("<option data-id='8' value='Washer8'>Washer’s water is not cold/hot</option>");
            $("#ddlProblemCategory2").append("<option data-id='9' value='Washer9'>Washer- Other problem</option>");
        }
        else if ($(this).val() == 'C3') {
            $("#Issue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='DW1'>DW does not drain/backing up</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='DW2'>DW does not dry properly</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='DW3'>DW does not work</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='DW4'>DW door does not lock</option>");
            $("#ddlProblemCategory2").append("<option data-id='5' value='DW5'>DW noisy</option>");
            $("#ddlProblemCategory2").append("<option data-id='6' value='DW6'>DW leaks</option>");
            $("#ddlProblemCategory2").append("<option data-id='7' value='DW7'>DW panel loose/falling off</option>");
            $("#ddlProblemCategory2").append("<option data-id='8' value='DW8'>DW soap dispenser stuck/broken</option>");
            $("#ddlProblemCategory2").append("<option data-id='9' value='DW9'>DW- Other problemt</option>");
        }
        else if ($(this).val() == 'C4') {
            $("#Issue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='Disposal1'>Disposal clogged</option>");
            $("#ddlProblemCategory2").append("<option data-id='1' value='Disposal2'>Disposal does not work</option>");
            $("#ddlProblemCategory2").append("<option data-id='1' value='Disposal3'>Disposal leaks</option>");
            $("#ddlProblemCategory2").append("<option data-id='1' value='Disposal4'>Disposal- Other problem</option>");

        }
        else if ($(this).val() == 'C5') {
            $("#Issue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='MW1'>MW does not work/ heat properly</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='MW2'>MW door handle broken/damaged</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='MW3'>MW fan does not work</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='MW4'>MW light does not work</option>");
            $("#ddlProblemCategory2").append("<option data-id='5' value='MW5'>MW shorts/smokes/sparks</option>");
            $("#ddlProblemCategory2").append("<option data-id='6' value='MW6'>MW tray missing/broken</option>");
            $("#ddlProblemCategory2").append("<option data-id='7' value='MW7'>MW- Other</option>");

        }
        else if ($(this).val() == 'C6') {
            $("#Issue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='Oven1'>Burner does not work</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Oven2'>Cooktop cracked</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='Oven3'>Cooktop- Other problem</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='Oven4'>Oven broiler pan missing</option>");
            $("#ddlProblemCategory2").append("<option data-id='5' value='Oven5'>Oven does not clean</option>");
            $("#ddlProblemCategory2").append("<option data-id='6' value='Oven6'>Oven does not heat</option>");
            $("#ddlProblemCategory2").append("<option data-id='7' value='Oven7'>Oven door will not open/close</option>");
            $("#ddlProblemCategory2").append("<option data-id='8' value='Oven8'>Oven light out</option>");
            $("#ddlProblemCategory2").append("<option data-id='9' value='Oven9'>Oven-Other problem</option>");
        }
        else if ($(this).val() == 'C7') {
            $("#Issue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='Freezer1'>Refrigerator door does not close</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Freezer2'>Freezer door does not close</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='Freezer3'>Refrigerator is making noise</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='Freezer4'>Freezer is making noise</option>");
            $("#ddlProblemCategory2").append("<option data-id='5' value='Freezer5'>Refrigerator light does not work</option>");
            $("#ddlProblemCategory2").append("<option data-id='6' value='Freezer6'>Freezer light does not work</option>");
            $("#ddlProblemCategory2").append("<option data-id='7' value='Freezer7'>Refrigerator leaks</option>");
            $("#ddlProblemCategory2").append("<option data-id='8' value='Freezer8'>Freezer leaks</option>");
            $("#ddlProblemCategory2").append("<option data-id='9' value='Freezer9'>Refrigerator part missing/broken</option>");
            $("#ddlProblemCategory2").append("<option data-id='10' value='Freezer10'>Freezer part missing/broken</option>");
            $("#ddlProblemCategory2").append("<option data-id='11' value='Freezer11'>Refrigerator temp too warm/cold</option>");
            $("#ddlProblemCategory2").append("<option data-id='12' value='Freezer12'>Freezer temp too warm/cold</option>");
            $("#ddlProblemCategory2").append("<option data-id='13' value='Freezer13'>Icemaker broken/no ice</option>");
            $("#ddlProblemCategory2").append("<option data-id='14' value='Freezer14'>Icemaker leaks</option>");
            $("#ddlProblemCategory2").append("<option data-id='15' value='Freezer15'>Icemaker makes dirty ice</option>");
            $("#ddlProblemCategory2").append("<option data-id='16' value='Freezer16'>Icemaker makes too much ice</option>");
            $("#ddlProblemCategory2").append("<option data-id='17' value='Freezer17'>Refrigerator- Other problem</option>");
            $("#ddlProblemCategory2").append("<option data-id='18' value='Freezer18'>Freezer- Other problem</option>");
            $("#ddlProblemCategory2").append("<option data-id='19' value='Freezer19'>Icemaker - Other problem</option>");

        }
        else if ($(this).val() == 'C8') {
            $("#Issue").addClass("hidden");
            $("#OtherCausingIssue").removeClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").empty();


        }
        else if ($(this).val() == 'PTE1') {
            $("#Issue").removeClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").append("<option data-id='1' value='CeilingFan1'>Ceiling Fan does not work</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='CeilingFan2'>Ceiling Fan is making noise</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='CeilingFan3'>Ceiling Fan wobbles</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='CeilingFan4'>Ceiling Fan- Other</option>");
        }
        else if ($(this).val() == 'PTE2') {
            $("#Issue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='Electrical1'>Electrical box is hot</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Electrical2'>Fuses need replaced</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='Electrical3'>Breaker trips frequently</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='Electrical4'>Electrical box- Other</option>");

        }
        else if ($(this).val() == 'PTE3') {
            $("#Issue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='GFI1'>GFI does not pass fault test</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='GFI2'>GFI does not reset</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='GFI3'>Outlet cover broken/missing</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='GFI4'>Outlet does not work</option>");
            $("#ddlProblemCategory2").append("<option data-id='5' value='GFI5'>Outlet- Other</option>");

        }
        else if ($(this).val() == 'PTE4') {
            $("#Issue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='Exterior1'>Exterior light bulb is out</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Exterior2'>Exterior light-Other</option>");
        }
        else if ($(this).val() == 'PTE5') {
            $("#Issue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='Light1'>Light bulb is out</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Light2'>Light cover problems</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='Light3'>Light does not work properly</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='Light4'>Light flickers</option>");
            $("#ddlProblemCategory2").append("<option data-id='5' value='Light5'>Interior Light-Other</option>");

        }
        else if ($(this).val() == 'PTE6') {
            $("#Issue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='Ventilation1'>Ventilation fan broken</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Ventilation2'>Ventilation makes noise</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='Ventilation3'>Ventilation fan-Other problems</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='Ventilation4'>Light flickers</option>");
            $("#ddlProblemCategory2").append("<option data-id='5' value='Ventilation5'>Interior Light-Other</option>");
        }
        else if ($(this).val() == 'PTE7') {
            $("#Issue").addClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#OtherCausingIssue").removeClass("hidden");
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'PTF1') {
            $("#Issue").removeClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='Ceramic1'>Ceramic floor tile needs repair/replacement</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Ceramic2'>Ceramic floor tile- Other</option>");
            $("#OtherIssue").addClass("hidden");

        }
        else if ($(this).val() == 'PTF0') {
            $("#Issue").addClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#OtherIssue").addClass("hidden");

        }
        else if ($(this).val() == 'PTF2') {
            $("#Issue").removeClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='Vinyl1'>Vinyl floor loose</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Vinyl2'>Vinyl floor needs refinishing</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='Vinyl3'>Vinyl floor damaged</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='Vinyl4'>Vinyl floor- Other</option>");
            $("#OtherIssue").addClass("hidden");

        }
        else if ($(this).val() == 'PTG1') {
            $("#Issue").removeClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='Cabinet1'>Cabinet broken/falling</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Cabinet2'>Cabinet Door glass broken</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='Cabinet3'>Cabinet Door handle broken/Missing </option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='Cabinet4'>Cabinet Door is off/loose</option>");
            $("#ddlProblemCategory2").append("<option data-id='5' value='Cabinet5'>Cabinet hardware broken/Missing</option>");
            $("#ddlProblemCategory2").append("<option data-id='6' value='Cabinet6'>Cabinet Other problem</option>");

        }
        else if ($(this).val() == 'PTG2') {
            $("#Issue").removeClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='Counter1'>Counter backsplash damaged</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Counter2'>Counter top damaged/coming up</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='Counter3'>Counter top other</option>");

        }
        else if ($(this).val() == 'PTG3') {
            $("#Issue").removeClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='Drawer1'>Drawer broken/sticks</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Drawer2'>Drawer hardware broken/missing</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='Drawer3'>Drawer other problem</option>");

        }
        else if ($(this).val() == 'PTG4') {
            $("#Issue").removeClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' data-value='' value='Entire1'>Entire unit needs repainting</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Entire2'>Entire unit needs touch-up</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='Entire3'>Room needs repainting</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='Entire4'>Room needs touch-up paint</option>");
            $("#ddlProblemCategory2").append("<option data-id='5' value='Entire5'>Wall needs touch-up paint</option>");
            $("#ddlProblemCategory2").append("<option data-id='6' value='Entire6'>Wall/ceiling damaged</option>");
            $("#ddlProblemCategory2").append("<option data-id='7' value='Entire7'>Wall/ceiling needs repainting</option>");
            $("#ddlProblemCategory2").append("<option data-id='8' value='Entire8'>Drywall-Other problem</option>");
            $("#ddlProblemCategory2").append("<option data-id='9' value='Entire9'>Paint-Other problem</option>");


        }
        else if ($(this).val() == 'PTG5') {
            $("#Issue").removeClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='Requires1'>Requires indoor pest control treatment</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Requires2'>Requires outdoor pest control treatment</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='Requires3'>Pet Control- Other problems</option>");

        }
        else if ($(this).val() == 'PTG6') {
            $("#Issue").removeClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='Closet1'>Closet rod missing/damaged</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Closet2'>Shelving loose/detached</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='Closet3'>Shelving sagging/broken</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='Closet4'>Closet- Other problems</option>");
            $("#ddlProblemCategory2").append("<option data-id='5' value='Closet5'>Shelving- Other problems</option>");

        }
        else if ($(this).val() == 'PTG7') {
            $("#Issue").removeClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' value='Trim1'>Trim board damaged</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Trim2'>Trim board needs paint</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='Trim3'>Trim-Other problems</option>");

        }
        else if ($(this).val() == 'PTG8') {
            $("#Issue").removeClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' data-value='' value='Window1'>Window does not open/close</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Window2'>Window glass is broken/cracked</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='Window3'>Window leaks air/water</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='Window4'>Window lock/latch does not work</option>");
            $("#ddlProblemCategory2").append("<option data-id='5' value='Window5'>Window screen damaged</option>");
            $("#ddlProblemCategory2").append("<option data-id='6' value='Window6'>Window screen is missing</option>");
            $("#ddlProblemCategory2").append("<option data-id='7' value='Window7'>Window screen is off rail</option>");
            $("#ddlProblemCategory2").append("<option data-id='8' value='Window8'>Window- Other problems</option>");
        }
        else if ($(this).val() == 'PTG9') {
            $("#Issue").removeClass("hidden");
            $("#ddlProblemCategory2").empty();
            $("#ddlProblemCategory2").append("<option data-id='1' data-value='1' value='Blinds1'>Blinds are falling</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Blinds2'>Blinds chain/chord/wand broken</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='Blinds3'>Blinds do not open/close</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='Blinds4'>Blinds do not work properly</option>");
            $("#ddlProblemCategory2").append("<option data-id='5' value='Blinds5'>Blinds- Other problem</option>");
        }


        else if ($(this).val() == 'PTPLUM0') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").addClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");

        }

        else if ($(this).val() == 'PTPLUM1') {
            $("#ddlProblemCategory2").empty();
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#Issue").removeClass("hidden");
            $("#ddlProblemCategory2").append("<option data-id='1' value='Faucet1'>Faucet broken</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Faucet2'>Faucet drips/leaks/sprays</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='Faucet3'>Faucet hard to turn on/off</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='Faucet4'>Faucet water pressure problem</option>");
            $("#ddlProblemCategory2").append("<option data-id='5' value='Faucet5'>Faucet- Other problem</option>");


        }
        else if ($(this).val() == 'PTPLUM2') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").append("<option data-id='1' value='Water1'>No hot water</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Water2'>Water heater leaks</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='Water3'>Water heater-Other problem</option>");
        }
        else if ($(this).val() == 'PTPLUM3') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").append("<option data-id='1' value='Mirror1'>Mirror broken</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='Mirror2'>Mirror- Other problem</option>");

        }
        else if ($(this).val() == 'PTPLUM4') {
            $("#ddlProblemCategory2").empty();
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#Issue").removeClass("hidden");
            $("#ddlProblemCategory2").append("<option data-id='1' value='1'>Paper Holder missing/broken</option>");

        }
        else if ($(this).val() == 'PTPLUM5') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#ddlProblemCategory2").append("<option data-id='1' value='1'>Water leaking from ceiling</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='2'>Water leak on floor</option>");
        }
        else if ($(this).val() == 'PTPLUM6') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").append("<option data-id='1' value='1'>Shower clogged</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='2'>Shower control know broken</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='3'>Shower door stuck</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='4'>Shower pressure low/high</option>");
            $("#ddlProblemCategory2").append("<option data-id='5' value='5'>Shower head loose/broken</option>");
            $("#ddlProblemCategory2").append("<option data-id='6' value='6'>Water too hot</option>");
        }
        else if ($(this).val() == 'PTPLUM7') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").append("<option data-id='1' value='1'>Sink clogged/does not drain correctly</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='2'>Sink leaks</option>");
        }
        else if ($(this).val() == 'PTPLUM8') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").append("<option data-id='1' value='1'>Toilet clogged</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='2'>Toilet does not flush</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='3'>Toilet handle/chain/flapper broken</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='4'>Toilet leaks</option>");
            $("#ddlProblemCategory2").append("<option data-id='5' value='5'>Toilet running continuously</option>");
            $("#ddlProblemCategory2").append("<option data-id='6' value='6'>Toilet seat broken</option>");
            $("#ddlProblemCategory2").append("<option data-id='7' value='7'>Towel holder loose/ broken</option>");
        }
        else if ($(this).val() == 'PTPLUM9') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").removeClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").append("<option data-id='1' value='1'>Tub clogged</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='2'>Tub faucet/spout broken</option>");

        }
        else if ($(this).val() == 'PTPLUM10') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").addClass("hidden");
            $("#OtherCausingIssue").removeClass("hidden");
            $("#OtherIssue").addClass("hidden");

        }
        else if ($(this).val() == 'PTSafety0') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");


        }
        else if ($(this).val() == 'PTSafety1') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").removeClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#ddlProblemCategory2").append("<option data-id='1' value='extinguisher1'>Fire extinguisher discharged</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='extinguisher2'>Fire extinguisher missing</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='extinguisher3'>Fire extinguisher needs inspection</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='extinguisher4'>Fire extinguisher-Other problem</option>");

        }
        else if ($(this).val() == 'PTSafety2') {
            $("#ddlProblemCategory2").empty();
            $("#OtherIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
            $("#Issue").removeClass("hidden");
            $("#ddlProblemCategory2").append("<option data-id='1' value='sprinkler1'>Fire sprinkler needs inspection</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='sprinkler2'>Fire sprinkler-Other problem</option>");
        }
        else if ($(this).val() == 'PTSafety3') {
            $("#ddlProblemCategory2").empty();
            $("#OtherIssue").addClass("hidden");
            $("#Issue").removeClass("hidden");
            $("#ddlProblemCategory2").append("<option data-id='1' value='detectors1'>Smoke detectors need battery replacement</option>");
            $("#ddlProblemCategory2").append("<option data-id='2' value='detectors2'>Smoke detector not working</option>");
            $("#ddlProblemCategory2").append("<option data-id='3' value='detectors3'>Smoke detector missing</option>");
            $("#ddlProblemCategory2").append("<option data-id='4' value='detectors4'>Smoke detector-Other problem</option>");

        }
        else if ($(this).val() == 'Doors0') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").addClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");

        }
        else if ($(this).val() == 'Doors1') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").addClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");

        }
        else if ($(this).val() == 'Doors2') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").addClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");

        }
        else if ($(this).val() == 'Doors3') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").addClass("hidden");
            $("#OtherCausingIssue").removeClass("hidden");
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'PTAIR0') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").addClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'PTAIR1') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").addClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'PTAIR2') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").addClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'PTAIR3') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").addClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'PTAIR4') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").addClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'PTAIR5') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").addClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'PTAIR6') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").addClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'PTAIR7') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").addClass("hidden");
            $("#OtherCausingIssue").addClass("hidden");
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'PTAIR8') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").addClass("hidden");
            $("#OtherCausingIssue").removeClass("hidden");
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'PTAIR9') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").addClass("hidden");
            $("#OtherCausingIssue").removeClass("hidden");
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'PTAIR10') {
            $("#ddlProblemCategory2").empty();
            $("#Issue").addClass("hidden");
            $("#OtherCausingIssue").removeClass("hidden");
            $("#OtherIssue").addClass("hidden");
        }

    });
    $("#ddlProblemCategory2").on('change', function (evt, params) {
        var selected = $("#ddlProblemCategory").val();
        if ($(this).val() == 'Dry1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Dry2') {
            $("#OtherIssue").addClass("hidden");

        }
        else if ($(this).val() == 'Dry3') {
            $("#OtherIssue").addClass("hidden");

        }
        else if ($(this).val() == 'Dry4') {
            $("#OtherIssue").addClass("hidden");

        }
        else if ($(this).val() == 'Dry5') {
            $("#OtherIssue").removeClass("hidden");

        }
        else if ($(this).val() == 'Washer1') {
            $("#OtherIssue").addClass("hidden");

        }
        else if ($(this).val() == 'Washer2') {
            $("#OtherIssue").addClass("hidden");

        }
        else if ($(this).val() == 'Washer3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Washer4') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Washer5') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Washer6') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Washer7') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Washer8') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Washer9') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'DW1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'DW2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'DW3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'DW4') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'DW5') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'DW6') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'DW7') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'DW8') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'DW9') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Disposal1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Disposal2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Disposal3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Disposal4') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'MW1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'MW2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'MW3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'MW4') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'MW5') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'MW6') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'MW7') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Oven1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Oven2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Oven3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Oven4') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Oven5') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Oven6') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Oven7') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Oven8') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Oven9') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Freezer1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Freezer2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Freezer3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Freezer4') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Freezer5') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Freezer6') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Freezer7') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Freezer8') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Freezer9') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Freezer10') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Freezer11') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Freezer12') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Freezer13') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Freezer14') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Freezer15') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Freezer16') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Freezer17') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Freezer18') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Freezer19') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'CeilingFan1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'CeilingFan2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'CeilingFan3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'CeilingFan4') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Electrical1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Electrical2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Electrical3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Electrical4') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'GFI1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'GFI2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'GFI3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'GFI4') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'GFI5') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Exterior1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Exterior2') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Light1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Light2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Light3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Light4') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Light5') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Ventilation1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Ventilation2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Ventilation3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Ventilation4') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Ventilation5') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Ceramic1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Ceramic2') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Vinyl1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Vinyl2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Vinyl3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Vinyl4') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Cabinet1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Cabinet2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Cabinet3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Cabinet4') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Cabinet5') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Cabinet6') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Counter1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Counter2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Counter3') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Drawer1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Drawer2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Drawer3') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Entire1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Entire2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Entire3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Entire4') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Entire5') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Entire6') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Entire7') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Entire8') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Entire9') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Requires1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Requires2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Requires3') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Closet1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Closet2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Closet3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Closet4') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Closet5') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Trim1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Trim2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Trim3') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Window1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Window2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Window3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Window4') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Window5') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Window6') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Window7') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Window8') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Blinds1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Blinds2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Blinds3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Blinds4') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Blinds5') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Faucet1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Faucet2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Faucet3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Faucet4') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Faucet5') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Water1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Water2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Water3') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'Mirror1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'Mirror2') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'extinguisher1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'extinguisher2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'extinguisher3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'extinguisher4') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'sprinkler1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'sprinkler2') {
            $("#OtherIssue").removeClass("hidden");
        }
        else if ($(this).val() == 'detectors1') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'detectors2') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'detectors3') {
            $("#OtherIssue").addClass("hidden");
        }
        else if ($(this).val() == 'detectors4') {
            $("#OtherIssue").removeClass("hidden");
        }
    });

}

var getServiceRequestOnAlarmMyAccount = function () {
    var model = { TenantId: $("#hndTenantID").val() };

    $.ajax({
        url: '/ServiceRequest/GetServiceRequestForAlarm',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $('#divServiceRequestAlarm').empty();
            $.each(response.model, function (elementType, elementValue) {
                var Html = '<div class="center">';
                Html += '<span id="spanServiceRequestlabelAlarm" style="font-size:12pt;">' + elementValue.ProblemCategoryName + '</span>';
                Html += '</div>';
                Html += '<div class="center">';
                Html += '<span id="spanServiceRequestDateTimeAlarm" style="font-size:08pt;">' + elementValue.PermissionComeDateString + ' at ' + elementValue.PermissionComeTime + '</span>';
                Html += '</div>';
                $('#divServiceRequestAlarm').append(Html);
            });
            //if (response.model.length == '0') {
            //    var Html = '<div class="center">';
            //    Html += '<span id="spanServiceRequestlabelAlarm" style="font-size:08pt;">No Service Request Today</span>';
            //    Html += '</div>';
            //    Html += '<div class="center">';
            //    Html += '<span id="spanServiceRequestDateTimeAlarm" style="font-size:08pt;"></span>';
            //    Html += '</div>';
            //    $('#divServiceRequestAlarm').append(Html);
            //}
        }
    });
};
var getLeaseInfoDocuments = function () {
    var model = { UserId: $("#hndUserId").val() };

    $.ajax({
        url: '/MyAccount/GetAllLeaseDocuments',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            var intCount = parseInt(1);

            //For Lease Documents
            $('#accordionSubLeaseDocument').empty();
            var Ldhtml = '';
            if (response.model.EnvelopeID != null ) {
                intCount++;
                //var resultLease = doesFileExist('/Content/assets/img/Document/LeaseDocument_' + response.model.EnvelopeID + ".pdf");
                //if (resultLease == true) {
                    Ldhtml += "<a href='javascript:void(0)' onclick='downloadLeaseDocumentTP()'>LeaseDocument_" + response.model.EnvelopeID + ".pdf</a></br>";
                //}
                //else {
                //    Ldhtml += "<a href='javascript:void(0)' onclick='FileNotFound();'>LeaseDocument_" + response.model.EnvelopeID + ".pdf</a></br>";
                //}
            }
            $('#accordionSubLeaseDocument').append(Ldhtml);

            //For Identity
            $('#accordionSubIdentity').empty();
            var Html = '';
            if (response.model.PassportDoc != null) {
                if (response.model.PassportDoc != '0') {
                    intCount++;
                    var resultPass = doesFileExist('/Content/assets/img/PersonalInformation/' + response.model.PassportDoc);
                    if (resultPass == true) {
                        Html += "<a href='/Content/assets/img/PersonalInformation/" + response.model.PassportDoc + "' download='" + response.model.OriginalPassportDoc + "'>" + response.model.OriginalPassportDoc + "</a></br>";
                    }
                    else {
                        Html += "<a href='javascript:void(0)' onclick='FileNotFound();'>" + response.model.OriginalPassportDoc + "</a></br>";
                    }
                }
            }

            if (response.model.IdentityDoc != null) {
                if (response.model.IdentityDoc != '0') {
                    intCount++;
                    var resultIdent = doesFileExist('/Content/assets/img/PersonalInformation/' + response.model.IdentityDoc);
                    if (resultIdent == true) {
                        Html += "<a href='/Content/assets/img/PersonalInformation/" + response.model.IdentityDoc + "' download='" + response.model.OriginalIdentityDoc + "'>" + response.model.OriginalIdentityDoc + "</a></br>";
                    }
                    else {
                        Html += "<a href='javascript:void(0)' onclick='FileNotFound();'>" + response.model.OriginalIdentityDoc + "</a></br>";
                    }
                }
            }
            $('#accordionSubIdentity').append(Html);

            //For Tax Return
            $('#accordionSubTaxReturn').empty();
            var Thtml = '';
            if (response.model.TaxReturnDoc1 != null) {
                if (response.model.TaxReturnDoc1 != '0') {
                    intCount++;
                    var resultTax1 = doesFileExist('/Content/assets/img/PersonalInformation/' + response.model.TaxReturnDoc1);
                    if (resultTax1 == true) {
                        Thtml += "<a href='/Content/assets/img/PersonalInformation/" + response.model.TaxReturnDoc1 + "' download='" + response.model.OriginalTaxReturnDoc1 + "'>" + response.model.OriginalTaxReturnDoc1 + "</a></br>";
                    }
                    else {
                        Thtml += "<a href='javascript:void(0)' onclick='FileNotFound();'>" + response.model.OriginalTaxReturnDoc1 + "</a></br>";
                    }
                }
            }

            if (response.model.TaxReturnDoc2 != null) {
                if (response.model.TaxReturnDoc2 != '0') {
                    intCount++;
                    var resultTax2 = doesFileExist('/Content/assets/img/PersonalInformation/' + response.model.TaxReturnDoc2);
                    if (resultTax2 == true) {
                        Thtml += "<a href='/Content/assets/img/PersonalInformation/" + response.model.TaxReturnDoc2 + "' download='" + response.model.OriginalTaxReturnDoc2 + "'>" + response.model.OriginalTaxReturnDoc2 + "</a></br>";
                    }
                    else {
                        Thtml += "<a href='javascript:void(0)' onclick='FileNotFound();'>" + response.model.OriginalTaxReturnDoc2 + "</a></br>";
                    }
                }
            }

            if (response.model.TaxReturnDoc3 != null) {
                if (response.model.TaxReturnDoc3 != '0') {
                    intCount++;
                    var resultTax3 = doesFileExist('/Content/assets/img/PersonalInformation/' + response.model.TaxReturnDoc3);
                    if (resultTax3 == true) {
                        Thtml += "<a href='/Content/assets/img/PersonalInformation/" + response.model.TaxReturnDoc3 + "' download='" + response.model.OriginalTaxReturnDoc3 + "'>" + response.model.OriginalTaxReturnDoc3 + "</a></br>";
                    }
                    else {
                        Thtml += "<a href='javascript:void(0)' onclick='FileNotFound();'>" + response.model.OriginalTaxReturnDoc3 + "</a></br>";
                    }
                }
            }

            $('#accordionSubTaxReturn').append(Thtml);
        }
    });
};

var getPetLeaseInfoDocuments = function () {
    var model = { UserId: $("#hndUserId").val() };

    $.ajax({
        url: '/MyAccount/GetPetLeaseDocuments',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            var intCount = parseInt(1);
            $('#accordionSubPetCertificate').empty();
            $.each(response.model, function (elementType, elementValue) {
                var Phtml = '';
                intCount++;
                var resultPet = doesFileExist('/Content/assets/img/pet/' + elementValue.PetVaccinationDoc);
                if (resultPet == true) {
                    Phtml += "<a href='/Content/assets/img/pet/" + elementValue.PetVaccinationDoc + "' download='" + elementValue.OriginalPetVaccinationDoc + "'>" + elementValue.OriginalPetVaccinationDoc + "</a></br>";
                }
                else {
                    Phtml += "<a href='javascript:void(0)' onclick='FileNotFound();'>" + elementValue.OriginalVehicleRegistrationDoc + "</a></br>";
                }

                $('#accordionSubPetCertificate').append(Phtml);
            });
        }
    });
};

var getVehicleLeaseInfoDocuments = function () {
    var model = { UserId: $("#hndUserId").val() };

    $.ajax({
        url: '/MyAccount/GetVehicleLeaseDocuments',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            var intCount = parseInt(1);
            $('#accordionSubVehicleCertificate').empty();
            $.each(response.model, function (elementType, elementValue) {
                var Vhtml = '';
                intCount++;
                var resultVehicle = doesFileExist('/Content/assets/img/VehicleRegistration/' + elementValue.VehicleRegistrationDoc);
                if (resultVehicle == true) {
                    Vhtml += "<a href='/Content/assets/img/VehicleRegistration/" + elementValue.VehicleRegistrationDoc + "' download='" + elementValue.OriginalVehicleRegistrationDoc + "'>" + elementValue.OriginalVehicleRegistrationDoc + "</a></br>";
                }
                else {
                    Vhtml += "<a href='javascript:void(0)' onclick='FileNotFound();'>" + elementValue.OriginalVehicleRegistrationDoc + "</a></br>";
                }

                $('#accordionSubVehicleCertificate').append(Vhtml);
            });
        }
    });
};
var FileNotFound = function () {
    $.alert({
        title: "",
        content: 'File Not Found!',
        type: 'red'
    });
};

var getCVVValue = function (id) {

    if (id.value.length == '3') {
        $('#hdnCVVFromPayment').val(id.value);
    }
    else {
        $('#hdnCVVFromPayment').val('');
        $.alert({
            title: "",
            content: 'Enter Valid CVV',
            type: 'red'
        });
    }
};

var ddlPayMethodSelect = function () {
    $('#ddlPayMethodPaymentAccounts').on('change', function () {
        if ($(this).val() == '1') {
            $('#DivPayMethodCreditCard').removeClass('hidden');
            $('#DivPayMethodBankAccount').addClass('hidden');
            clearSavePaymentAccounts();
        }
        else {
            $('#DivPayMethodCreditCard').addClass('hidden');
            $('#DivPayMethodBankAccount').removeClass('hidden');
            clearSavePaymentAccounts();
        }
    });

    if ($('#ddlPayMethodPaymentAccounts').val() == '1') {
        $('#DivPayMethodCreditCard').removeClass('hidden');
        $('#DivPayMethodBankAccount').addClass('hidden');
        clearSavePaymentAccounts();
    }
    else if ($('#ddlPayMethodPaymentAccounts').val() == '2') {
        $('#DivPayMethodCreditCard').addClass('hidden');
        $('#DivPayMethodBankAccount').removeClass('hidden');
        clearSavePaymentAccounts();
    }
};

var clearSavePaymentAccounts = function () {
    $('#txtBankNamePayMethod').val('');
    $('#txtAccountNamePayMethod').val('');
    $('#txtAccountNumberPayMethod').val('');
    $('#txtRoutingNumberPayMethod').val('');
    $('#txtAccountTitle').val('');
    $('#ddlCardType').val('0');
    $('#txtNameOnCard').val('');
    $('#txtCardNumber').val('');
    $('#ddlCardMonth').val('01');
};

var ddlBankAccountListShow = function () {
    $('#ddlBankAccountList').on('change', function () {
        if ($('#ddlBankAccountList').val() == '1') {
            getPaymentAccountsCreditCard();
            $('#tblPaymentAccountsBankAccount').addClass('hidden');
            $('#tblPaymentAccountsCreditCard').removeClass('hidden');
        }
        else if ($('#ddlBankAccountList').val() == '2') {
            getPaymentAccountsBankAccount();
            $('#tblPaymentAccountsCreditCard').addClass('hidden');
            $('#tblPaymentAccountsBankAccount').removeClass('hidden');
        }
    });
    if ($('#ddlBankAccountList').val() == '1') {
        getPaymentAccountsCreditCard();
        $('#tblPaymentAccountsBankAccount').addClass('hidden');
        $('#tblPaymentAccountsCreditCard').removeClass('hidden');
    }
    else if ($('#ddlBankAccountList').val() == '2') {
        getPaymentAccountsBankAccount();
        $('#tblPaymentAccountsCreditCard').addClass('hidden');
        $('#tblPaymentAccountsBankAccount').removeClass('hidden');
    }
};

var ddlPaymentMethod = function () {
    var model = { TenantId: $("#hndTenantID").val() };
    $.ajax({
        url: "/ApplyNow/GetBankCCListTenant",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $('#ddlPaymentMethod').empty();
            $('#ddlPaymentMethodR').empty();
            var html = '';
            $.each(response.model, function (elementType, elementValue) {
                if (elementValue.Default == '1') {
                    html = "<option value='" + elementValue.ID + "' selected='selected' data-value='" + elementValue.PaymentMethodString + "'>" + elementValue.Name_On_Card + "</option>";
                }
                else {
                    html = "<option value='" + elementValue.ID + "' data-value='" + elementValue.PaymentMethodString + "'>" + elementValue.Name_On_Card + "</option>";
                }
                $('#ddlPaymentMethod').append(html);
                $('#ddlPaymentMethodR').append(html);
            });
        }
    });
};

var ddlPaymentMethodSelectFunction = function () {
    $('#ddlPaymentMethod').on('change', function () {

        if ($(this).find(':selected').data('value') == '1') {
            $('#DivCVVNumberPayRentOnline').removeClass('hidden');
        }
        else {
            $('#DivCVVNumberPayRentOnline').addClass('hidden');
        }
        $('#txtCVVNumberPayRentOnline').val('');
    });
};

var ddlPayMethodPageLoadFunction = function () {
    setTimeout(function () {
        if ($('#ddlPaymentMethod').find(':selected').data('value') == '1') {
            $('#DivCVVNumberPayRentOnline').removeClass('hidden');
        }
        else {
            $('#DivCVVNumberPayRentOnline').addClass('hidden');
        }
        $('#txtCVVNumberPayRentOnline').val('');
    }, 1500);
};



var openPaymentBreakdown = function () {
    $('#popPaymentBreakdown').modal('show');
};

var breakdownPaymentFunctionMyAcc = function () {
    $("#divLoader").show();
    var model = { UserId: $("#hndUserId").val() };

    $.ajax({
        url: '/MonthlyPayment/GetMonthlyPayment',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#lblMonthlyChargesBreakdown").text('$' + formatMoney(response.modal.MonthlyCharges));
            $("#lblAdditionalParkingBreakdown").text('$' + formatMoney(response.modal.AdditionalParking));
            $("#lblStorageChargesBreakdown").text('$' + formatMoney(response.modal.StorageCharges));
            $("#lblPetRentBreakdown").text('$' + formatMoney(response.modal.PetRent));
            $("#lblTrashRecycleBreakdown").text('$' + formatMoney(response.modal.TrashRecycle));
            $("#lblPestControlBreakdown").text('$' + formatMoney(response.modal.PestControl));
            $("#lblConvergentBillingBreakdown").text('$' + formatMoney(response.modal.ConvergentBilling));
            $("#lblTotalMonthlyChargesBreakdown").text('$' + formatMoney(response.modal.TotalMonthlyCharges));
            $("#lblTotalMonthlyChargesBreakdown").css('color', 'green');
           
            
            localStorage.setItem('currentAmountDue', response.modal.TotalMonthlyCharges);
        }
    });
    $("#divLoader").hide();
};
var getAmenityList = function () {
    $.ajax({
        url: "../GetAmenityList",
        type: "post",
        contentType: "application/json utf-8",

        success: function (response) {

            $("#ddlAmenities").empty();
            $("#reserve_facility_list").empty();
            var option = "<option value=0>Select Amenity</option>";
            $.each(response.model, function (elementType, elementValue) {
                option += "<option value=" + elementValue.ID + ">" + elementValue.Amenity + "</option>";

            });
            $("#ddlAmenities").append(option);
            var reserve_a = "";
            $.each(response.model, function (elementType, elementValue) {

                reserve_a += "<a class='list-group-item' href='javascript:void(0);' onclick='goToReservationStep(2," + elementValue.ID + ")'>" + elementValue.Amenity + "</a>";

            });
            $("#reserve_facility_list").append(reserve_a);
           
        }
    });
};


var getDurationSlot = function (selectedValue) {
    $("#ddlDesiredDuration").empty();
    var option = "<option value=0>Select Duration Slot</option>";
    if (selectedValue == 1) {
        option += "<option value=1 data-res='100' data-dep='100'> 2 hours </option>";
        option += "<option value=2 data-res='200' data-dep='200'> 4 hours </option>";
    }
    else if (selectedValue == 3) {
        option += "<option value='1' data-res='250' data-dep='500'> 3 hours </option>";
        option += "<option value=2 data-res='500' data-dep='1000'> 5 hours </option>";
    }
    else if (selectedValue == 11) {
        option += "<option value=1 data-res='20' data-dep='50'> 2 hours </option>";
        option += "<option value=2 data-res='40' data-dep='100'> 4 hours </option>";
    }
    else if (selectedValue == 12) {
        option += "<option value=1 data-res='75' data-dep='250'> 2 hours </option>";
        option += "<option value=2 data-res='150' data-dep='450'> 4 hours </option>";
    }
    else if (selectedValue == 13) {
        option += "<option value=1 data-res='0' data-dep='0'> 2 hours </option>";
    }

    $("#ddlDesiredDuration").append(option);
};

var saveUpdateReservationRequest = function () {


    var msg = '';
    var guestId = $("#hdnGuestId").val();
    var tenantId = $("#hndTenantID").val();
    var arID = $("#hndARID").val();
    var ddlAmenity = $("#ddlAmenities").val();
    var desireDate = $("#txtDesiredDate").val();
    var desireTime = $("#SelectedTime").html();
    var ddlDesiredDurationID = $("#ddlDesiredDuration").find(":selected").val();
    var ddlDesiredDuration = $("#ddlDesiredDuration").find(":selected").text();
    var depositeFee = $("#ddlDesiredDuration").find(":selected").attr("data-dep");
    var reservationFee = $("#ddlDesiredDuration").find(":selected").attr("data-res");


    if (ddlAmenity == 0) {
        msg += 'Please select Amenity</br>';
    }
    if (desireDate == "") {
        msg += 'Please enter Desire Date</br>';
    }
    if (desireTime == "") {
        msg += 'Please enter Desire Time</br>';
    }
    if (ddlDesiredDurationID == 0) {
        msg += 'Please select Desired Duration</br>'
    }

    if (msg != '') {
        $.alert({
            title: "",
            content: msg,
            type: 'red'
        });
        return;
    }

    $("#requestAminityReservation").modal("show");

    var model = {
        ARID: arID,
        TenantID: tenantId,
        AmenityID: ddlAmenity,
        DesiredDate: desireDate,
        DesiredTime: desireTime,
        Duration: ddlDesiredDuration,
        DurationID: ddlDesiredDurationID,
        DepositFee: depositeFee,
        ReservationFee: reservationFee,
        Status: 0
    };
    $.ajax({
        url: '/Tenant/AmenitiesRR/SaveUpdateReservationRequest',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            //$.alert({
            //    title: '',
            //    content: response.model,
            //    type: 'blue'
            //});
            clearReservationRequest();
            getReservationRequestList();
            setTimeout(function () {
                $("#requestAminityReservation").modal("hide");

            }, 20000);
        }
    });
};

var clearReservationRequest = function () {

    var ddlAmenity = $("#ddlAmenities").val(0);
    var desireDate = $("#txtDesiredDate").val("");
    var desireTime = $("#SelectedTime").html("");
    var ddlDesiredDurationID = $("#ddlDesiredDuration").find(":selected").val(0);
    var ddlDesiredDuration = $("#ddlDesiredDuration").find(":selected").text("");
};

var fillDdlLocation = function () {
    $("#divLoader").show();
    $.ajax({
        url: '/ServiceRequest/GetDdlLocation',
        method: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            $("#ddlLocation").empty();
            $("#ddlLocation").append("<option value='0'>Select Location</option>");
            $.each(response.model, function (index, elementValue) {
                $("#ddlLocation").append("<option value=" + elementValue.LocationId + ">" + elementValue.LocationString + "</option>");
            });
            $("#divLoader").hide();
        }
    });
}


var fillDdlServiceCategory = function () {
    $("#divLoader").show();
    $.ajax({
        url: '/ServiceRequest/GetDdlServiceCategory',
        method: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            $("#ddlProblemCategory").empty();
            $("#ddlProblemCategory").append("<option value='0'>Select Problem Category</option>");
            $.each(response.model, function (index, elementValue) {
                $("#ddlProblemCategory").append("<option value=" + elementValue.ServiceIssueID + ">" + elementValue.ServiceIssueString + "</option>");
            });
            $("#divLoader").hide();
        }
    });
}
var fillCaussingIssue = function (ServiceIssueID) {
    var params = { ServiceIssueID: ServiceIssueID };
    $("#divLoader").show();
    $.ajax({
        url: '/ServiceRequest/GetDdlCausingIssue',
        method: "post",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if ($.trim(response.error) != "") {
                //this.cancelChanges();
            } else {
                if (response.length != '0') {
                    $("#ddlProblemCategory1").empty();
                    $("#ddlProblemCategory1").append("<option value='0'>What Item Is causing The Issue?</option>");
                    $.each(response, function (index, elementValue) {
                        $("#ddlProblemCategory1").append("<option value=" + elementValue.CausingIssueID + ">" + elementValue.CausingIssue + "</option>");
                    });
                } else {
                    $("#CausingIssue").addClass("hidden");
                    $("#ddlProblemCategory1").empty();

                }
                $("#divLoader").hide();
            }
        }
    });
}
var fillDdlIssue = function (CausingIssueID, ServiceIssueID) {
    $("#divLoader").show();
    var params = { CausingIssueID: CausingIssueID, ServiceIssueID: ServiceIssueID };
    $.ajax({
        url: '/ServiceRequest/GetDdlIssue',
        method: "post",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if ($.trim(response.error) != "") {

            } else {
                if (response.length != '0') {
                    $("#ddlProblemCategory2").empty();
                    //$("#ddlProblemCategory2").append("<option value='0'>What Is The Issue?</option>");
                    $.each(response, function (index, elementValue) {
                        $("#ddlProblemCategory2").append("<option value=" + elementValue.IssueID + ">" + elementValue.Issue + "</option>");
                    });
                }
                else {
                    $("#Issue").addClass("hidden");
                    $("#ddlProblemCategory2").empty();

                }
            }
            $("#divLoader").hide();
        }
    });
}

var uploadServiceFile = function () {
    $("#divLoader").show();
    $formData = new FormData();

    var ServiceFile = document.getElementById('fileUploadService');

    for (var i = 0; i < ServiceFile.files.length; i++) {
        $formData.append('file-' + i, ServiceFile.files[i]);
    }

    $.ajax({
        url: '/ServiceRequest/UploadServiceFile',
        type: 'post',
        data: $formData,
        contentType: 'application/json; charset=utf-8',
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) {
            $('#hndfileUploadService').val(response.model.TempServiceFile);
            $('#hndOriginalfileUploadService').val(response.model.OriginalServiceFile);
            $('#fileUploadServiceShow').text(response.model.OriginalServiceFile);
            $.alert({
                title: "",
                content: "File uploaded Successfully.",
                type: 'red'
            });
            $("#divLoader").hide();
        }
    });
};

var getReservationRequestList = function () {
    var date = new Date(),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
    if (month < 10) {
        month = "0" + month;
    }
    var dateC = month + "/" + day + "/" + year;
    var tenantID = $("#hndTenantID").val();
    var ProspectID = $("#hndUserId").val();
    //alert(tenantID + " " + ProspectID);
    var model = {
        TenantID: tenantID
    };
    $.ajax({
        url: '/Tenant/MyAccount/FillRRList',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            if ($.trim(response.error) !== "") {
                //this.cancelChanges();
            } else {
                $("#tblReservationRequest>tbody").empty();
                $.each(response, function (elementType, elementValue) {
                    //console.log(JSON.stringify(response));
                    var html = "<tr data-value=" + elementValue.ARID + " data-amenity=" + elementValue.AmenityID + ">";
                    //html += "<td>" + elementValue.TenantName + "</td>";
                    html += "<td>" + elementValue.AmenityName + "</td>";
                    html += "<td>" + elementValue.DesiredDate + "</td>";
                    html += "<td>" + elementValue.DesiredTimeFrom + "</td>";
                    html += "<td>" + elementValue.DesiredTimeTo + "</td>";
                    html += "<td>" + elementValue.Duration + " hours</td>";
                    html += "<td>" + elementValue.Guest + "</td>";

                    if (elementValue.Status == "Approved and pending for Payment" || elementValue.Status == "Confirmed and pending for Deposit") {
                        html += "<td>" + elementValue.Status + " &nbsp; <button class='btn btn-primary' onclick='getAmenityReservationPay(" + elementValue.ARID + ")'>Pay</button></td>";
                    }
                    else {
                        html += "<td>" + elementValue.Status + "</td>";
                    }
                    if (elementValue.Status == "Cancelled") {
                        html += "<td ><span><i class='fa fa-check'></i></span></td>";
                    }
                    else {
                        console.log(elementValue.calculatedDate + " " + elementValue.DesiredDate + " " + dateC);
                        if (elementValue.calculatedDate <= dateC) {

                            html += "<td class='table-border-right' onclick='cancleRequest(" + elementValue.ARID + ")' style='cursor:pointer;'><a><img src='/Content/assets/img/icon/Cancel.png'/></a></td>";
                        }
                        else {
                            html += "<td class='table-border-right' onclick='cancleRequest(" + elementValue.ARID + ")' style='cursor:pointer;'><a><img src='/Content/assets/img/icon/Cancel.png'/></a></td>";

                        }

                    }


                    html += "</tr>";
                    $("#tblReservationRequest>tbody").append(html);
                });
            }
        }
    });
};
var clearDdlAmenity = function () {
    $(".modal-title,.print-title").html("");
    $("#ddlAmenities").val(0);
};
function getAmenityReservationPay(arid) {
    var model = {
        ARID: arid
    };
    $.ajax({
        url: '/Tenant/MyAccount/GetPaymentLink',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            window.location.href = "/Paylink/PayAmenityCharges?pid=" + response.payid;
        }
    });
}
var getRecurringPayLists = function () {
    var model = {
        TenantID: $("#hndTenantID").val()
    }
    $.ajax({
        url: "/MyTransaction/GetRecurringPayLists",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            if (response.model.length>0)
            {

            $("#tblRecurringPayments>tbody").empty();
            $.each(response.model, function (elementType, elementValue) {
                var html = "<tr data-value=" + elementValue.TransID + ">";
                html += "<td>1</td>";
                html += "<td>" + elementValue.TAccCardName + "</td>";
                html += "<td>" + elementValue.Transaction_DateString + "</td>";
          
                html += "<td style='text-align: right;'>$" + formatMoney(elementValue.Charge_Amount) + "</td>";

                html += "<td class='table-border-right'><a href='javascript:void(0);' onclick='editRecPayment(" + elementValue.TransID + ",\"" + formatMoney(elementValue.Charge_Amount) + "\",\"" + elementValue.Transaction_DateString + "\"," + elementValue.PAID + ")'><img class='m-r20 ml-10' src='/Content/assets/img/icon/pencil.png'/></a>   <a href='javascript:void(0);' onclick='deleteRecPayment(" + elementValue.TransID + ")'><img src='/Content/assets/img/icon/Cancel.png'/></a></td>";

                html += "</tr>";
              
                $("#tblRecurringPayments>tbody").append(html);
               
                $("#hndRevisionNo").val(parseInt(elementValue.Revision_Num++));

            });
            $("#divRecPayList").removeClass("hidden");
            $("#divSetRecPay").addClass("hidden");

            } else {
                $("#divRecPayList").addClass("hidden");
                $("#divSetRecPay").removeClass("hidden");
                $("#RecStep1").removeClass("hidden");
                $("#RecStep2").addClass("hidden");
            }

        }
    });
}

function editRecPayment(transid, amt, cdate, paid) {
    $("#recHeader").text("Edit Recurring Payments");
    $("#modiDiv").removeClass("hidden");
    $("#RecStep1").removeClass("hidden");
    $("#RecStep2").addClass("hidden");
    $("#rcpid").val(transid);
    $('#rbtnAmountToPayR2').attr('checked', 'checked');
    $("#btnSetUpRecurringPayment").addClass("hidden");

    $("#divOtherAmountR").removeClass("hidden");
    $("#divSetRecPay").removeClass("hidden");
    $("#btnSaveRecurringPayment").removeClass("hidden");

    $("#ddlPaymentMethodR").val(paid);
    $("#txtOtherAmountR").val(amt);
    $("#txtPayDateR").val(cdate);
    $("#editTermsConditionRecu").html("If you wish to EDIT OR CANCEL Autopay, please <a href='javascript:void(0);' onclick='deleteRecPayment(" + transid + ")'> click here</a>");

}
function recurringPaymentSaveUpdate() {   
    var msg = "";
    //var transid = $("#rcpid").text();
    var transid = $("#rcpid").val();
    var tenantid = $("#hndTenantID").val();
   
    var transtype = $("#ddlPaymentMethodR").val();
    var chargeDate = $("#txtPayDateR").val();
  
    var chargeAmount = unformatText($("#txtChargeAmount").val());
    
    var amount = '';
    if ($("#rbtnAmountToPayR1").is(":checked")) {
        amount = unformatText($('#lblCurrentPrePayAmountR').text());
    }
    else if ($("#rbtnAmountToPayR2").is(":checked")) {
        amount = unformatText($('#txtOtherAmountR').val());
    }
    else {
        amount = '';
    }

    var isAllUpdate = 0;
    if ($("#rbtnModi1").is(":checked")) {
        isAllUpdate = 0;
    }
    else if ($("#rbtnModiAll").is(":checked")) {
        isAllUpdate = 1;
    }

    if ($("#ddlPaymentMethodR").val() == '0') {
        msg += "Select Payment Method</br>";
    }
  
    if (amount == '') {
        msg += "Check Amount To Pay And Enter Charge Amount</br>";
    }
    if ($("#txtPayDateR").val() == "") {
        msg += "Enter Payment Date</br>";
    }
    if ($("#chkTermsAndConditionR").is(":checked")) {
        msg += '';
    }
    else {
        msg += 'Check Terms and Policy</br>';
    }

    if (msg != "") {
        $.alert({
            title: 'Alert!',
            content: msg,
            type: 'red'
        });
        return;
    }

    var models = {
        PAID: $('#ddlPaymentMethodR').val(),
        TransID: transid,      
        TenantID: tenantid,      
        Charge_Date: chargeDate,
        Charge_Amount: amount,
        IsAllUpdate: isAllUpdate
    };
    $.ajax({
        url: "/MyTransaction/SaveUpdateRecurringTransaction/",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(models),
        dataType: "JSON",
        success: function (response) {
            $.alert({
                title: 'Message!',
                content: response.Msg,
                type: 'blue',
            });
           
            getRecurringPayLists();
        }
    });

}

var cancleRequest = function (arid) { 
    var tenantId = $("#hndTenantID").val();
    var model = {
        ARID: arid
    };
    $.alert({
        title: 'Alert!',
        content: "Are you sure to cancel the Request",
        type: 'red',
        buttons: {
            yes:{
                text: 'Yes',
                btnClass: 'btn btn-primary',
                action: function () {
                    $.ajax({
                        url: '/Tenant/AmenitiesRR/CancleReservationRequest',
                        type: "post",
                        contentType: "application/json utf-8",
                        data: JSON.stringify(model),
                        dataType: "JSON",
                        success: function (response) {
                            getReservationRequestList();
                        }
                    });
                }
            },
            no:{
                text: 'No',
                btnClass: 'btn btn-primary',
                keys: ['enter', 'shift'],
                action: function () {
                    return;
                }
            }
        }
    });
};

function recurringPaymentSetUp() {

    var msg = "";
    var transid = $("#hndTransID").val();

    var tenantid = $("#hndTenantID").val();

    var transtype = $("#ddlPaymentMethodR").val();
    var chargeDate = $("#txtPayDateR").val();

    var chargeAmount = unformatText($("#txtChargeAmount").val());
   
    var amount = '';
    if ($("#rbtnAmountToPayR1").is(":checked")) {
        amount = unformatText($('#lblCurrentPrePayAmountR').text());
    }
    else if ($("#rbtnAmountToPayR2").is(":checked")) {
        amount = unformatText($('#txtOtherAmountR').val());
    }
    else {
        amount = '';
    }
    if ($("#ddlPaymentMethodR").val() == '0') {
        msg += "Select Payment Method</br>";
    }

    if (amount == '') {
        msg += "Check Amount To Pay And Enter Charge Amount</br>";
    }
    if ($("#txtPayDateR").val() == "") {
        msg += "Enter Payment Date</br>";
    }
    if ($("#chkTermsAndConditionR").is(":checked")) {
        msg += '';
    }
    else {
        msg += 'Check Terms and Policy</br>';
    }

    if (msg != "") {
        $.alert({
            title: 'Alert!',
            content: msg,
            type: 'red'
        });
        return;
    }

    var models = {
        PAID: $('#ddlPaymentMethod').val(),
        TransID: transid,
        TenantID: tenantid,
     
        Charge_Date: chargeDate,
        Charge_Amount: amount,
        UserId: $("#hndUserId").val(),
    };
    $.ajax({
        url: "/MyTransaction/SetUpRecurringTransaction/",
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(models),
        dataType: "JSON",
        success: function (response) {
            $.alert({
                title: 'Message!',
                content: response.Msg,
                type: 'blue',
            });

            getRecurringPayLists();
        }
    });

}

function deleteRecPayment(transid) {

    $("#modiDiv").addClass("hidden");
    var tenantid = $("#hndTenantID").val();

    var models = {
        TenantID: tenantid,

    };
    $.alert({
        title: "",
        content: "Are you sure to Cancel Recurring Payments?",
        type: 'blue',
        buttons: {
            yes: {
                text: 'Yes',
                action: function (yes) {
                    $.ajax({
                        url: "/MyTransaction/DeleteRecurringTransaction/",
                        type: "post",
                        contentType: "application/json utf-8",
                        data: JSON.stringify(models),
                        dataType: "JSON",
                        success: function (response) {
                            $("#recHeader").text("Set Up Recurring Payments");
                            $("#editTermsConditionRecu").html("");
                            document.getElementById('modalTermConditionR').style.display = "none";
                            $('#btnSetUpRecurringPayment').removeClass('hidden');
                            $('#btnSaveRecurringPayment').addClass('hidden');
                            $('#txtPayDateR').val("");
                            $.alert({
                                title: 'Message!',
                                content: response.Msg,
                                type: 'blue',
                            });

                            getRecurringPayLists();

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

function recurringPaymentCancel()
{
    $("#recHeader").text("");
    $("#RecStep1").addClass("hidden");
    $("#RecStep2").addClass("hidden");
    $("#txtOtherAmountR").val("");
}
function recurringPaymentBack() {
    $("#RecStep1").removeClass("hidden");
    $("#RecStep2").addClass("hidden");
   
}
function recurringPaymentNext() {
    $("#RecStep2").removeClass("hidden");
    $("#RecStep1").addClass("hidden");
    var value = $("#ddlPaymentMethodR option:selected"); 
    var transtype = value.text();
    var chargeDate = $("#txtPayDateR").val();

    var amount = '';
    if ($("#rbtnAmountToPayR1").is(":checked")) {
        amount =$('#lblCurrentPrePayAmountR').text();
    }
    else if ($("#rbtnAmountToPayR2").is(":checked")) {
        amount = $('#txtOtherAmountR').val();
    }
    else {
        amount = '';
    }
    $("#lblReccPayFrom").text(transtype);
    $("#lblPayDateR").text(chargeDate);
    $("#lblFixedamt").text(amount);
}
var countGuest = function (arg) {
    var argValue = arg.value;
    var argID = arg.getAttribute('id');
    //alert(argValue + " " + argID);
    if (argID == "hrs_2h50depo") {
        argValue = argValue * 10;
        $("#lmt_2h10gues").val(argValue);
    }
    else if (argID == "hrs_4h100depo") {
        argValue = argValue * 10;
        $("#lmt_4h10gues").val(argValue);
    }

};

var convertTo24Hour = function (time) {

    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    // console.log(sHours + ":" + sMinutes);
    return sHours + ":" + sMinutes;
};

var convertTo12Hour = function (time) {
    // console.log(time);
    var H = +time.substr(0, 2);
    var h = (H % 12) || 12;
    var ampm = H < 12 ? " AM" : " PM";
    var sHours = h.toString();
    if (h < 10) sHours = "0" + sHours;
    time = sHours + time.substr(2, 3) + ampm;
    //  console.log(time);
    return time;
};
var savupdateAmenityReservation = function (printBtnID) {
    $("#btnPrintBBQ,#btnPrintPC,#btnPrintClubroom,#btnPrintYog,#btnPrintSoccer").attr("disabled", true);
    var selectedID;
    var msg = "";
    var selectedIDLimit;
    var guestLimit;
    var grilLimit;
    var tenantId = $("#hndTenantID").val();
    var amenityID = $("#ddlAmenities").val();
    var desireDate;
    var desireTime;
    var depositeFee;
    var reservationFee;
    var desireDuration;
    //console.log(amenityID);
    if (amenityID == 1) {
        desireDate = $("#txtDesiredDateSoccer").val();
        desireTimeFrom = $("#txtDesiredTimeSoccerFrom").val();
        desireTimeTo = $("#txtDesiredTimeSoccerTo").val();

        if ($('input[type=radio][name=hoursSoccer]').is(':checked') == false) {
            msg += "Please select any one of the reservation.</br>";
        }

        if (desireDate == "") {
            msg += "Booking Date is required.</br>";
        }

        if (desireTimeFrom == "") {
            msg += "Booking time is required.</br>";
        }

        if (msg != "") {
            $.alert({
                title: 'Alert!',
                content: msg,
                type: 'red'
            });
            return;
        }
        else {
            $("#divLoader").show();
            if ($('input[type=radio][name=hoursSoccer]').is(':checked')) {
                selectedID = $('input[type=radio][name=hoursSoccer]:checked').attr("id");

                if (selectedID == "SO_2h200depo") {
                    depositeFee = 200;
                    reservationFee = 100;
                    desireDuration = 2;
                    guestLimit = 10;

                }
                else if (selectedID == "SO_4h400depo") {
                    depositeFee = 400;
                    reservationFee = 200;
                    desireDuration = 4;
                    guestLimit = 10;
                }
            }
        }

    }
    else if (amenityID == 3) {

        desireDate = $("#txtDesiredDateClubroom").val();
        desireTimeFrom = $("#txtDesiredTimeClubroomFrom").val();
        desireTimeTo = $("#txtDesiredTimeClubroomTo").val();

        if ($('input[type=radio][name=hoursCR]').is(':checked') == false) {
            msg += "Please select any one of the reservation.</br>";
        }

        if (desireDate == "") {
            msg += "Booking Date is required.</br>";
        }

        if (desireTimeFrom == "") {
            msg += "Booking time is required.</br>";
        }

        if (msg != "") {
            $.alert({
                title: 'Alert!',
                content: msg,
                type: 'red'
            });
            return;
        }
        else {

            $("#divLoader").show();
            if ($('input[type=radio][name=hoursCR]').is(':checked')) {
                selectedID = $('input[type=radio][name=hoursCR]:checked').attr("id");
                //console.log(selectedID);

                if (selectedID == "CR_3h500depo") {
                    depositeFee = 500;
                    reservationFee = 250;
                    desireDuration = 3;
                    guestLimit = 75;

                }
                else if (selectedID == "CR_5h1000depo") {
                    depositeFee = 1000;
                    reservationFee = 500;
                    desireDuration = 5;
                    guestLimit = 75;
                }
                else if (selectedID == "CR_cy1500") {
                    depositeFee = 1500;
                    reservationFee = 1500;
                    desireDuration = 5;
                    guestLimit = 150;
                }
            }
        }


    }
    else if (amenityID == 11) {

        desireDate = $("#txtDesiredDateBBQ").val();
        desireTimeFrom = $("#txtDesiredTimeBBQFrom").val();
        desireTimeTo = $("#txtDesiredTimeBBQTo").val();

        if ($('input[type=radio][name=hoursBBQ]').is(':checked') == false) {
            msg += "Please select any one of the reservation.</br>";
        }

        if (desireDate == "") {
            msg += "Booking Date is required.</br>";
        }

        if (desireTimeFrom == "") {
            msg += "Booking time is required.</br>";
        }

        if (msg != "") {
            $.alert({
                title: 'Alert!',
                content: msg,
                type: 'red'
            });
            return;
        }
        else {
            $("#divLoader").show();
            if ($('input[type=radio][name=hoursBBQ]').is(':checked')) {
                selectedID = selectedID = $('input[type=radio][name=hoursBBQ]:checked').attr("id");
                if (selectedID == "2h50depo") {
                    depositeFee = 200;
                    reservationFee = 100;
                    desireDuration = 2;
                    grilLimit = $("#hrs_2h50depo").val();
                    guestLimit = grilLimit * 10;
                }
                else if (selectedID == "4h100depo") {
                    depositeFee = 200;
                    reservationFee = 100;
                    desireDuration = 2;
                    grilLimit = $("#hrs_4h100depo").val();
                    guestLimit = grilLimit * 10;
                }
                else if (selectedID == "2h300depo") {
                    depositeFee = 200;
                    reservationFee = 100;
                    desireDuration = 2;
                    guestLimit = 30;
                }
                else if (selectedID == "4h600depo") {
                    depositeFee = 200;
                    reservationFee = 100;
                    desireDuration = 2;
                    guestLimit = 30;
                }
            }
        }

    }
    else if (amenityID == 12) {
        desireDate = $("#txtDesiredDatePC").val();
        desireTimeFrom = $("#txtDesiredTimePCFrom").val();
        desireTimeTo = $("#txtDesiredTimePCTo").val();

        if ($('input[type=radio][name=hoursPC]').is(':checked') == false) {
            msg += "Please select any one of the reservation.</br>";
        }
        if (desireDate == "") {
            msg += "Booking Date is required.</br>";
        }

        if (desireTimeFrom == "") {
            msg += "Booking time is required.</br>";
        }

        if (msg != "") {
            $.alert({
                title: 'Alert!',
                content: msg,
                type: 'red'
            });
            return;
        }
        else {
            $("#divLoader").show();
            if ($('input[type=radio][name=hoursPC]').is(':checked')) {
                selectedID = $('input[type=radio][name=hoursPC]:checked').attr("id");
                if (selectedID == "PC_2h250depo") {
                    depositeFee = 250;
                    reservationFee = 75;
                    desireDuration = 2;
                    guestLimit = 5;
                }
                else if (selectedID == "PC_4h100depo") {
                    depositeFee = 450;
                    reservationFee = 150;
                    desireDuration = 4;
                    guestLimit = 5;
                }
                else if (selectedID == "PC_2h450depo") {
                    depositeFee = 450;
                    reservationFee = 150;
                    desireDuration = 2;
                    guestLimit = 12;
                }
                else if (selectedID == "PC_4h600depo") {
                    depositeFee = 600;
                    reservationFee = 300;
                    desireDuration = 4;
                    guestLimit = 12;
                }
            }
        }
    }
    else if (amenityID == 13) {
        $("#divLoader").show();
        desireDate = $("#txtDesiredDateYoga").val();
        desireTimeFrom = $("#txtDesiredTimeYogaFrom").val();
        desireTimeTo = $("#txtDesiredTimeYogaTo").val();
        depositeFee = 0.00;
        reservationFee = 100;
        desireDuration = 2;
        guestLimit = 22;
    }
    console.log(amenityID);
    var model = {
        TenantID: tenantId,
        AmenityID: amenityID,
        DesiredDate: desireDate,
        DesiredTimeFrom: desireTimeFrom,
        DesiredTimeTo: desireTimeTo,
        DepositFee: depositeFee,
        ReservationFee: reservationFee,
        Duration: desireDuration,
        Guest: guestLimit,
        Status: 0
    };
    // //console.log(model);
    $.ajax({
        url: '/Tenant/AmenitiesRR/SaveUpdateReservationRequest',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#divLoader").hide();
            printButtonReservation(printBtnID);
            getReservationRequestList();
            $.alert({
                title: '',
                content: response.model,
                type: 'blue'
            });
        }
    });

};
var printButtonReservation = function (printBtnID) {
    $("#" + printBtnID).attr("disabled", false);
};

var printReservation = function (divName, contName) {
    let printContents, popupWin, pintRes;
    printContents = document.all.item(divName).innerHTML;
    $("#divPrintData").append(printContents);
    $('#divPrintData input[name="hours' + contName + '"]').each(function () {
        var img = "";
        if ($(this).parent().hasClass("checked")) {

            img = '<img src="/Content/assets/img/skin/circleC.png" width="30px" height="30px" />';
        }
        else {
            img = '<img src="/Content/assets/img/skin/circleB.png" width="30px" height="30px" />';
        }
        $(this).parent().parent().prepend(img);
    });
    $('#divPrintData input[name="limit' + contName + '"]').each(function () {
        if ($(this).parent().hasClass("checked")) {

            img = '<img src="/Content/assets/img/skin/circleC.png" width="30px" height="30px" />';
        }
        else {
            img = '<img src="/Content/assets/img/skin/circleB.png" width="30px" height="30px" />';
        }
        $(this).parent().parent().prepend(img);
    });
    $('#divPrintData input[name="hours' + contName + '"]').remove();
    $('#divPrintData .iradio_square-yellow').remove();
    $("#divPrintReservation").removeClass("hidden").printThis();
    setTimeout(function () {
        $("#divPrintReservation").addClass("hidden");
        $("#divPrintData").empty();
    }, 3000);
};

var openTag = function () {
    $('#popTag').modal('show');
};

var openForm = function () {
    getTagInfo();
    $('#popguest').modal('show');
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




var getTagInfo = function () {
    var tagId = $("#hdnTagGuestId").val();
    var model = {
        TagId: tagId,

    };
    $.ajax({
        url: '/GuestRegistration/GetTagInfo',
        type: "post",
        contentType: "application/json utf-8",
        data: JSON.stringify(model),
        dataType: "JSON",
        success: function (response) {
            $("#TagUnitNo").text(response.msg.UnitNo);
            $("#TagTenantName").text(response.msg.TenantName);
            $("#TagGuesttName").text(response.msg.GuestName);
            $("#TagVehicleMake").text(response.msg.VehicleMake);
            $("#TagVehicleModel").text(response.msg.VehicleModel);
            $("#Tag").text(response.msg.Tag);


            $("#PrintGuestFname").text(response.msg.FirstName);
            $("#PrintGuestLname").text(response.msg.LastName);
            $("#PrintGuestAddress").text(response.msg.Address);
            $("#PrintGuestPhone").text(response.msg.Phone);
            $("#PrintGuestEmail").text(response.msg.Email);
            $("#PrintGuestVisitSdate").text(response.msg.VisitStartDateString);
            $("#PrintGuestVisitEnddate").text(response.msg.VisitEndDateString);
            $("#PrintGuesHaveVehicle").text(response.msg.HaveVehicleString);
            if (response.msg.HaveVehicleString == 'Yes') {
                $("#Pvehicle").removeClass('hidden');

                $("#PrintGuestVMake").text(response.msg.VehicleMake);
                $("#PrintGuestVModel").text(response.msg.VehicleModel);
                $("#PrintGuestTag").text(response.msg.Tag);
                $("#PrintGuestRegistration").text(response.msg.OriginalDriverLicence);
                $("#PrintGuestriverLicence").text(response.msg.OriginalVehicleRegistration);
            } else {
                $("#Pvehicle").addClass('hidden');
            }

            $("#PspanGuestCertGName").text(response.msg.GuestName);
            $("#PspanTenantSignName").text(response.msg.TenantName);
            $("#PspanTenantSignNameGC").text(response.msg.TenantName);
            $("#PspanGuestSignName").text(response.msg.GuestName);
            $("#PspanGuestSignNameGC").text(response.msg.GuestName);

        }
    });
}
var clearDateTime = function () {
    $("#txtDesiredDateBBQ,#txtDesiredTimeBBQFrom,#txtDesiredTimeBBQTo").val("").removeAttr("value");
    $("#txtDesiredDatePC,#txtDesiredTimePCFrom,#txtDesiredTimePCTo").val("").removeAttr("value");
    $("#txtDesiredDateClubroom,#txtDesiredTimeClubroomFrom,#txtDesiredTimeClubroomTo").val("").removeAttr("value");
    $("#txtDesiredDateYoga,#txtDesiredTimeYogaFrom,#txtDesiredTimeYogaTo").val("").removeAttr("value");
    $("#txtDesiredDateSoccer,#txtDesiredTimeSoccerFrom,#txtDesiredTimeSoccerTo").val("").removeAttr("value");
    $("#btnPrintSoccer,#btnPrintBBQ,#btnPrintPC, #btnPrintClubroom, #btnPrintYog").attr("disabled", true);
};
var downloadLeaseDocumentTP = function () {
    $("#divLoader").show();
    var param = { UserID: $("#hndUserId").val() };
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
var getProcessingFeesMA = function () {
    return $("#hndProcessingFees").val();
};