var Nav={

		
		
		
/*----------------------------------------------------------------------Custom Links--------------------------------------------------------------------------------------------*/		
		
		
		
			
		showPage : function(path, targetDiv) {
			var jqxhr = jQuery.post(path, function(data) {
				jQuery("#" + targetDiv).html(data);
			});
		},	

		
		
		
/*-------------------------------------------------------------Administrator Related Links--------------------------------------------------------------------------------------------*/		
				
				
				
				
		showAdminLoginPage : function() {
			var path = "/Student_Portal/html/admin_role/adminLogin.html";
			Nav.showPage(path, "displayArea");
		},

		showAdminHomePage : function() {
			var path = "/Student_Portal/html/admin_role/adminHome.html";
			Nav.showPage(path, "actionSpace");
		},

		showAdminProfilePage : function() {
			var path = "/Student_Portal/html/admin_role/adminProfile.html";
			Nav.showPage(path, "actionSpace");
		},

		showAddMemberPage : function() {
			var path = "/Student_Portal/html/admin_role/addMember.html";
			Nav.showPage(path, "actionSpace");
		},

		showAddBranchPage : function() {
			var path = "/Student_Portal/html/admin_role/addBranch.html";
			Nav.showPage(path, "actionSpace");
		},
       
		showAddSubjectPage : function() {
			var path = "/Student_Portal/html/admin_role/addSubject.html";
			Nav.showPage(path, "actionSpace");
		},

		showAddQualificationPage : function() {
			var path = "/Student_Portal/html/admin_role/addQualification.html";
			Nav.showPage(path, "actionSpace");
		},

		showAddHolidayPage : function() {
			var path = "/Student_Portal/html/admin_role/addHoliday.html";
			Nav.showPage(path, "actionSpace");
		},
       
		showAddSemPage : function() {
			var path = "/Student_Portal/html/admin_role/addSem.html";
			Nav.showPage(path, "actionSpace");
		},

		showAddPage : function() {
			var path = "/Student_Portal/html/admin_role/add.html";
			Nav.showPage(path, "actionSpace");
		},
       
		showMessagesPage : function() {
			var path = "/Student_Portal/html/admin_role/messages.html";
			Nav.showPage(path, "actionSpace");
		},

		showAddFaqPage : function() {
			var path = "/Student_Portal/html/admin_role/addFaq.html";
			Nav.showPage(path, "actionSpace");
		},
		
		showAddContactPage : function() {
			var path = "/Student_Portal/html/admin_role/addContact.html";
			Nav.showPage(path, "actionSpace");
		},
		
		
		
/*-------------------------------------------------------------Principal Related Links--------------------------------------------------------------------------------------------*/		
						
						
						

		showPrincipalLoginPage : function() {
			var path = "/Student_Portal/html/principal_role/principalLogin.html";
			Nav.showPage(path, "displayArea");
		},

		showPrincipalHomePage : function() {
			var path = "/Student_Portal/html/principal_role/principalHome.html";
			Nav.showPage(path, "actionSpace");
		},

		showPrincipalDashboardPage : function() {
			var path = "/Student_Portal/html/principal_role/principalDashboard.html";
			Nav.showPage(path, "actionSpace");
		},

		showPrincipalProfilePage : function() {
			var path = "/Student_Portal/html/principal_role/principalProfile.html";
			Nav.showPage(path, "actionSpace");
		},
		
		showPrincipalPromotePage : function() {
			var path = "/Student_Portal/html/principal_role/principalPromote.html";
			Nav.showPage(path, "actionSpace");
		},

		
		
		
/*-------------------------------------------------------------Faculty Related Links--------------------------------------------------------------------------------------------*/		
						
						
						

		showFacultyLoginPage : function() {
			var path = "/Student_Portal/html/faculty_role/facultyLogin.html";
			Nav.showPage(path, "displayArea");
		},

		showFacultyHomePage : function() {
			var path = "/Student_Portal/html/faculty_role/facultyHome.html";
			Nav.showPage(path, "actionSpace");
		},

		showFacultyProfilePage : function() {
			var path = "/Student_Portal/html/faculty_role/facultyProfile.html";
			Nav.showPage(path, "actionSpace");
		},

		showAddMarksPage : function() {
			var path = "/Student_Portal/html/faculty_role/addMarks.html";
			Nav.showPage(path, "actionSpace");
		},

		showAddAttendancePage : function() {
			var path = "/Student_Portal/html/faculty_role/addAttendance.html";
			Nav.showPage(path, "actionSpace");
		},

		showMyAttendancePage : function() {
			var path = "/Student_Portal/html/faculty_role/myAttendance.html";
			Nav.showPage(path, "actionSpace");
		},

		showAddStudentPage : function() {
			var path = "/Student_Portal/html/faculty_role/addStudent.html";
			Nav.showPage(path, "actionSpace");
		},
		
		showAddCriteriaPage : function() {
			var path = "/Student_Portal/html/faculty_role/addCriteria.html";
			Nav.showPage(path, "actionSpace");
		},
		
		
		
/*-------------------------------------------------------------Hod Related Links--------------------------------------------------------------------------------------------*/		
						
						
						

		showHodLoginPage : function() {
			var path = "/Student_Portal/html/hod_role/hodLogin.html";
			Nav.showPage(path, "displayArea");
		},
		
		showHodHomePage : function() {
			var path = "/Student_Portal/html/hod_role/hodHome.html";
			Nav.showPage(path, "actionSpace");
		},

		showFacultyAttendancePage : function() {
			var path = "/Student_Portal/html/hod_role/facultyAttendance.html";
			Nav.showPage(path, "actionSpace");
		},
		
		showHodAttendancePage : function() {
			var path = "/Student_Portal/html/hod_role/hodAttendance.html";
			Nav.showPage(path, "actionSpace");
		},
		
		showHodDashboardPage : function() {
			var path = "/Student_Portal/html/hod_role/hodDashboard.html";
			Nav.showPage(path, "actionSpace");
		},

		showHodProfilePage : function() {
			var path = "/Student_Portal/html/hod_role/hodProfile.html";
			Nav.showPage(path, "actionSpace");
		},

		
		
		
/*-------------------------------------------------------------Basic Links--------------------------------------------------------------------------------------------*/		
						
						
						

		showBeforeLoginPage : function() {
			var path = "/Student_Portal/html/others/beforeLogin.html";
			Nav.showPage(path, "displayArea");
		},
		
		showHomePage : function() {
			var path = "/Student_Portal/html/others/home.html";
			Nav.showPage(path, "actionSpace");
		},
		
		showAboutPage : function() {
			var path = "/Student_Portal/html/others/about.html";
			Nav.showPage(path, "actionSpace");
		},
		
		showContactPage : function() {
			var path = "/Student_Portal/html/others/contact.html";
			Nav.showPage(path, "actionSpace");
		},
		
		showFeedbackPage : function() {
			var path = "/Student_Portal/html/others/feedback.html";
			Nav.showPage(path, "actionSpace");
		},
		
		showStudentPortalPage : function() {
			var path = "/Student_Portal/html/others/studentPortal.html";
			Nav.showPage(path, "actionSpace");
		},
		
		showLoginPage : function() {
			var path = "/Student_Portal/html/others/login.html";
			Nav.showPage(path, "actionSpace");
		},
		
		showForgotPasswordPage : function() {
			var path = "/Student_Portal/html/others/forgotPassword.html";
			Nav.showPage(path, "actionSpace");
		},
		
		showChangePasswordPage : function() {
			var path = "/Student_Portal/html/others/changePassword.html";
			Nav.showPage(path, "actionSpace");
		},
		
		showLogoutPage : function() {
			var path = "/Student_Portal/html/others/logout.html";
			Nav.showPage(path, "actionSpace");
		},

		showFaqPage : function() {
			var path = "/Student_Portal/html/others/faq.html";
			Nav.showPage(path, "actionSpace");
		},
};