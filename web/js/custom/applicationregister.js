/*-------------------------------------------------------------------------------------------Storing Login Values--------------------------------------------------------------------------------*/	

var uname=localStorage.getItem("uname");
var branchcode=localStorage.getItem("branchcode");
var uid=parseInt(localStorage.getItem("uid"));
var role=localStorage.getItem("role");
var isUserLoggedIn=parseInt(localStorage.getItem("isUserLoggedIn"));
var currentPage=localStorage.getItem("currentPage");
var endtime=new Date(localStorage.getItem("endtime"));

console.log(uname + " " + branchcode + " " + uid + " " + role + " " + isUserLoggedIn + " " + currentPage+" "+endtime);	



/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/	


var reg = angular.module('RegistrationModule', []);


reg.controller('RegistrationController', ['$http','$scope','$sce', function($http, $scope,$sce) {

	
	
/*------------------------------------------------------------------Converts TEXT to URL--------------------------------------------------------------------------------*/
		
		
		
		
		 $scope.trustSrc = function(src) {
			    return $sce.trustAsResourceUrl(src);
			  }

			
			
/*------------------------------------------------------------------Execute for every 1 second (Checks Login expiring time )--------------------------------------------------------------------------------*/

		 
		 	
		 	var intervalId = window.setInterval(function(){
		 		var currentTime=new Date();
		 		var endTime=new Date(localStorage.getItem("endtime"));
		 		  if(endTime!=null && endTime<=currentTime && localStorage.getItem("role")!=null){
		 			  swal({
		 				  title: "Session Timeout!",
		 				  text: "Please Login Again :)",
		 				  icon: "info",
		 				}).then(() => {
		 					$scope.isUserLoggedIn=0;
		 					$scope.currentPage='e';
		 					$scope.uname=null;
		 					$scope.uid=0;
		 					$scope.role=null;
		 					$scope.branchcode=null;
		 					$scope.endtime=null;
		 					localStorage.setItem("uname",$scope.uname);
		 					localStorage.setItem("uid",$scope.uid);
		 					localStorage.setItem("branchcode",$scope.role);
		 					localStorage.setItem("role",$scope.branchcode);
		 					localStorage.setItem("isUserLoggedIn", $scope.isUserLoggedIn);
		 					localStorage.setItem("currentPage",$scope.currentPage);
		 					localStorage.setItem("endtime",$scope.endtime);
		 					console.log(uname);
		 			        Nav.showBeforeLoginPage();
		 				});
		 		  }
		 		}, 1000);	
		 	
		 	
		 
		 
/*------------------------------------------------------------------PROFILE OPERATIONS--------------------------------------------------------------------------------*/			
			
				
				
				
	$scope.getProfile = function() {
					
					console.log(uid);
					
					
					$http.post('/Student_Portal/register/getProfile', uid).then(
							function(response) {
								
								
								$scope.pdata = response.data;
								
								console.log( $scope.pdata );
								if ($scope.pdata.successful) {
									$scope.profiledata={object:$scope.pdata.responseObject};
								} else {
									swal({
										  title: "OOPS!",
										  text: "Account Viewing Operation Failed :(",
										  icon: "error",
										});
								}
							}, function(errResponse) {
								console.error('Error Occoured During Account Viewing Process...!');
							}
							
					
					);
				};
				
				
				
				
	$scope.updateProfileDetails = function(singleUserData){
					console.log(singleUserData);
					if(singleUserData==undefined||singleUserData.mobileno==null ||singleUserData.username==null ||singleUserData.name==null ||singleUserData.gender==null ||singleUserData.qualification==null ||singleUserData.experience==null ||singleUserData.address==null ||singleUserData.mobileno=='' ||singleUserData.username=='' ||singleUserData.name=='' ||singleUserData.gender=='' ||singleUserData.qualification=='' ||singleUserData.experience=='' ||singleUserData.address=='' ){
						swal({
							  title: "WARNING!",
							  text: "Please Check and RE-ENTER your Data..!",
							  icon: "warning",
							}).then(() => {
								if(role=='Admin')
								{Nav.showAdminProfilePage();}
								else if(role=='Principal')
								{Nav.showPrincipalProfilePage();}
								else if(role=='HOD')
								{Nav.showHodProfilePage();}
								else if(role=='Faculty')
								{Nav.showFacultyProfilePage();}
								});
					}
					else{
					$http.post('/Student_Portal/register/updateProfileDetails', singleUserData).then(
							function(response) {
								$scope.data = response.data;
								if ($scope.data.successful) {
									swal({
										  title: "SUCCESS!",
										  text: singleUserData.username + "\'s Details Updated Successfully :)",
										  icon: "success",
										})
										.then(() => {
										if(role=='Admin')
										{Nav.showAdminProfilePage();}
										else if(role=='Principal')
										{Nav.showPrincipalProfilePage();}
										else if(role=='HOD')
										{Nav.showHodProfilePage();}
										else if(role=='Faculty')
										{Nav.showFacultyProfilePage();}
										});
								} else {
									swal({
										  title: "OOPS!",
										  text: singleUserData.username + "\'s Details Updation Failed :(",
										  icon: "error",
										});
								}
							}, function(errResponse) {
								console.error('Error Occoured During Updation Process...!');
							});}
				};
		
				
				

/*------------------------------------------------------------------LOGIN OPERATIONS--------------------------------------------------------------------------------*/	
	
	
	
	
$scope.login = function(object) {
	    if(object==undefined){
	    	object={username:localStorage.getItem("userName"),password:localStorage.getItem("password"),reply:false};
	    }
		console.log(object);
		if(object.reply!=undefined && object.reply==true){
			localStorage.setItem("userName",object.username);
			localStorage.setItem("password",object.password);
		}
		object.password=window.btoa(object.password);
		$http.post('/Student_Portal/register/login', object).then(
				function(response) {
					$scope.data = response.data; 
					console.log($scope.data);
					if ($scope.data.successful) {
						swal({
							  title: "SUCCESS!",
							  text: "You Are Currently Logined As " + object.username + " :)",
							  icon: "success",
							})
							.then(() => {
                                $scope.isUserLoggedIn=1;
                                $scope.currentPage='a';
                                $scope.endtime=new Date();
                                $scope.endtime.setMinutes ( $scope.endtime.getMinutes() + 300 );
								localStorage.setItem("uname",object.username);
								localStorage.setItem("uid",response.data.responseObject.id);
								localStorage.setItem("branchcode",response.data.responseObject.branchcode);
								localStorage.setItem("role",response.data.responseObject.role);
								localStorage.setItem("isUserLoggedIn", $scope.isUserLoggedIn);
								localStorage.setItem("currentPage",$scope.currentPage);
								localStorage.setItem("endtime",$scope.endtime);
								console.log(response.data);
								window.location.reload();
								
							});
                          
						
					} else {
						swal({
							  title: "OOPS!",
							  text: "Incorrect User-Name Or Password :(",
							  icon: "error",
							});
					}
				}, function(errResponse) {
					console.error('Error Occoured During Login Process...!');
				});	
		};
		
		
		
		
		
$scope.logout = function() {
				
				console.log(uname);
				swal({
					  title: "SUCCESS!",
					  text: uname + " Logouted Successfully :)",
					  icon: "success",
					})
					.then(() => {
						$scope.isUserLoggedIn=0;
						$scope.currentPage='a';
						$scope.uname=null;
						$scope.uid=0;
						$scope.role=null;
						$scope.branchcode=null;
						$scope.endtime=null;
						localStorage.setItem("uname",$scope.uname);
						localStorage.setItem("uid",$scope.uid);
						localStorage.setItem("branchcode",$scope.role);
						localStorage.setItem("role",$scope.branchcode);
						localStorage.setItem("isUserLoggedIn", $scope.isUserLoggedIn);
						localStorage.setItem("currentPage",$scope.currentPage);
						localStorage.setItem("endtime",$scope.endtime);
						console.log(uname);
				        Nav.showBeforeLoginPage();
					});
				
				
			};
		
			
			
			
$scope.forgotpassword=function(){
	swal({
		  title:"Enter Your Email Id Here:",
		  content: "input",
		  button: {
			    text: "Send!",
			    closeModal: false,
			  },
	       icon:"info",
		})
		.then((email) => {
			if(email==null || email==''){
				swal({
					  title: "OOPS!",
					  text: "Invalid Email :(",
					  icon: "error",
					}).then(() => {Nav.showLoginPage();});
			}
			else{
			console.log(email);
			$http.post('/Student_Portal/register/verifyEmail', email).then(
					function(response) {
						$scope.data = response.data;
						console.log( $scope.data.responseObject );
						if ($scope.data.successful) {
							var password=new String($scope.data.responseObject.password);
							password=window.atob(password);
							$scope.data.responseObject.oldpassword=password;
							$http.post('/Student_Portal/register/forgotpassword', $scope.data.responseObject).then(
									function(response) {
										
										$scope.data = response.data;
										
										console.log( $scope.data );
										if ($scope.data.successful) {
											swal({
												  title: "SUCCESS!",
												  text: "Email Sent Sucessfully :)",
												  icon: "success",
												}).then(() => {Nav.showLoginPage();});
											
										} else {
											swal({
												  title: "OOPS!",
												  text: "Email Entered Doesn't Exist :(",
												  icon: "error",
												}).then(() => {Nav.showLoginPage();});
										}
										
									}), function(errResponse) {
								        swal.stopLoading();
										console.error('Error Occoured During Sending User Details..!');
									}
						} else {
							swal({
								  title: "OOPS!",
								  text: "Email Entered Doesn't Exist :(",
								  icon: "error",
								}).then(() => {Nav.showLoginPage();});
						}
					}, function(errResponse) {
						console.error('Error Occoured During Email Checking Process...!');
						Nav.showLoginPage();
					}
					
			
			);}
		});
};			
			
			
			
		
$scope.changePassword=function(Data){
	console.log(Data);
	if(Data==undefined||Data.oldpassword==null || Data.oldpassword=='' || Data.newpassword==null || Data.newpassword=='' || Data.password==null || Data.password==''){
		swal({
			  title: "OOPS!",
			  text: "Invalid Details :(",
			  icon: "error",
			}).then(() => {Nav.showChangePasswordPage();});
	}else{
	$http.post('/Student_Portal/register/getProfile', uid).then(
			function(response) {
				if(response.data.responseObject.password==window.btoa(Data.oldpassword)){
					if(Data.newpassword==Data.password){
						Data.username=uname;
						Data.email=response.data.responseObject.email;
						Data.password=window.btoa(Data.password);
						console.log(Data);
						swal("Your Request is Processing , Please Wait...", {
							  buttons: false,
							  timer: 6000,
							});
						$http.post('/Student_Portal/register/changePassword', Data).then(
								function(response) {
									$scope.data = response.data;
									
									console.log( $scope.data );
									if ($scope.data.successful) {
										swal({
											  title: "SUCCESS!",
											  text: "Password Updated Sucessfully :)",
											  icon: "success",
											}).then(() => {Nav.showChangePasswordPage();});
										
									} else {
										swal({
											  title: "OOPS!",
											  text: "Password Updation Failed :(",
											  icon: "error",
											}).then(() => {Nav.showChangePasswordPage();});
									}
								}), function(errResponse) {
									console.error('Error Occoured During Password Changing Process...!');
								}
					}else{
						swal({
							  title: "OOPS!",
							  text: "Passwords entered are Mismatched :(",
							  icon: "error",
							}).then(() => {Nav.showChangePasswordPage();});
					}
				}else{
					swal({
						  title: "OOPS!",
						  text: "Entered Password is Invalid :(",
						  icon: "error",
						}).then(() => {Nav.showChangePasswordPage();});
				}
			}), function(errResponse) {
				console.error('Error Occoured During Password Verifying Process...!');
			}}
};




/*------------------------------------------------------------------REGESTERED MEMBERS OPERATIONS (BY ADMIN)--------------------------------------------------------------------------------*/				




$scope.insertDetails = function(Data) {
	console.log(Data);
	if(Data==undefined||Data.email==null || Data.username==null || Data.password==null || Data.role==null || (Data.role!='Principal' && Data.branchcode==null) || Data.email=='' || Data.username=='' || Data.password=='' || Data.role=='' || (Data.role!='Principal' && Data.branchcode=='')){
		swal({
			  title: "WARNING!",
			  text: "Please Check and RE-ENTER your Details..!",
			  icon: "warning",
			}).then(() => {
				Nav.showAddMemberPage();
			});
	}
	else{
	swal("Your Request is Processing , Please Wait...", {
		  buttons: false,
		  timer: 6000,
		});
	            Data.status='Active';
				console.log(Data.status);
				Data.oldpassword=Data.password;
				Data.password=window.btoa(Data.password);
				$http.post('/Student_Portal/register/insertDetails', Data).then(
						function(response) {
							
							$scope.data = response.data;
							console.log( Data );
							if ($scope.data.successful) {
								swal({
									  title: "SUCCESS!",
									  text: Data.username + "\'s Registration Done Successfully :)",
									  icon: "success",
									}).then(() => {
										Nav.showAddMemberPage();
										});
								
							} else {
								swal({
									  title: "OOPS!",
									  text: Data.username + "\'s Registration Failed :(",
									  icon: "error",
									});
							}
						}, function(errResponse) {
							swal({
								  title: "WARNING!",
								  text: "Please Check and RE-ENTER your Details..!",
								  icon: "warning",
								}).then(() => {
									Nav.showAddMemberPage();
								});
							console.error('Error Occoured During Registration Process...!');
						}
						
				
				);}
			};
			
			
			
if(role=='Admin'){			
$http.post('/Student_Portal/register/viewaccounts').then(
					function(response) {
						
						$scope.orgdata = response.data;
						
						console.log( $scope.orgdata );
						if ($scope.orgdata.successful) {
							$scope.userdetails = $scope.orgdata.responseObject;
							console.log($scope.userdetails);
						} else {
							console.log("Accounts Viewing Operation Failed :(");
						}
					}, function(errResponse) {
						console.error('Error Occoured During Accounts Viewing Process...!');
					}
					
			);
}



$scope.updateDetails = function(singleUserData){
	if(singleUserData.role=='Principal'){
		singleUserData.branchcode=null;
	}
	console.log(singleUserData);
	if(singleUserData==undefined||singleUserData.email==null || singleUserData.username==null || singleUserData.role==null || (singleUserData.role!='Principal' && singleUserData.branchcode==null) || singleUserData.email=='' || singleUserData.username==''  || singleUserData.role=='' || (singleUserData.role!='Principal' && singleUserData.branchcode=='')){
		swal({
			  title: "WARNING!",
			  text: "Please Check and RE-ENTER your Data..!",
			  icon: "warning",
			}).then(() => {
				Nav.showAddMemberPage();
			});
	}
	else{
	console.log(singleUserData.username);
				swal("Your Request is Processing , Please Wait...", {
					  buttons: false,
					  timer: 6000,
					});
				$http.post('/Student_Portal/register/getProfile', singleUserData.id).then(
						function(response) {
							if(response.data.responseObject.password==singleUserData.password){
								var oldpass=new String(response.data.responseObject.password);
								singleUserData.oldpassword=window.atob(oldpass);
								singleUserData.password=oldpass;
							}
							else{
								singleUserData.oldpassword=singleUserData.password;
								singleUserData.password=window.btoa(singleUserData.password);
							}
						}).then(() => {
				
				$http.post('/Student_Portal/register/updateDetails', singleUserData).then(
						function(response) {
							$scope.data = response.data;
							if ($scope.data.successful) {
								console.log(singleUserData);
								swal({
									  title: "SUCCESS!",
									  text: singleUserData.username + "\'s Details Updated Successfully :)",
									  icon: "success",
									})
									.then(() => {
										Nav.showAddMemberPage();
										
									});
							} else {
								swal({
									  title: "OOPS!",
									  text: singleUserData.username + "\'s Details Updation Failed :(",
									  icon: "error",
									}).then(() => {
										Nav.showAddMemberPage();
									});
							}
						}, function(errResponse) {
							swal({
								  title: "WARNING!",
								  text: "Please Check and RE-ENTER your Details..!",
								  icon: "warning",
								}).then(() => {
									Nav.showAddMemberPage();
								});
							console.error('Error Occoured During Updation Process...!');
						});
					});
			}

};





$scope.removeDetails = function(Data) {
	swal({
		  title: "Are you sure?",
		  text: "Once deleted, you will not be able to recover this record!",
		  icon: "warning",
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
			 
		  console.log(Data.username);		
					$http.post('/Student_Portal/register/removeDetails', Data.username).then(
							function(response) {
								$scope.data = response.data;
								if ($scope.data.successful) {
									swal({
										  title: "SUCCESS!",
										  text: Data.username + "\'s Details Removed Successfully :)",
										  icon: "success",
										})
									.then(() => {
										Nav.showAddMemberPage();
										
									});
									
									
								} else {
									swal({
										  title: "OOPS!",
										  text: Data.username + "\'s Details Not Deleted :(",
										  icon: "error",
										});
								}
							}, function(errResponse) {
								console.error('Error Occoured During Deletion Process...!');
							});	
		  } else {
		    swal({
				title: "OOPS!",
				text: Data.username + "\'s Details Not Deleted :(",
				icon: "error",
				});
		  }
		});
};





/*------------------------------------------------------------------Student Registration Operations--------------------------------------------------------------------------------*/				




$scope.insertStudentDetails = function(Data) {
	console.log(Data);
	if(Data==undefined||Data.stu_pin1==null ||Data.stu_pin3==null||Data.year==null||Data.name==null||Data.email==null||Data.mobileno==null||Data.stu_pin1=='' ||Data.stu_pin3==''||Data.year==''||Data.name==''||Data.email==''||Data.mobileno==''){
		swal({
			  title: "WARNING!",
			  text: "Details Entered are in Invalid Format..!",
			  icon: "warning",
			}).then(() => {
				Nav.showAddStudentPage();
			});
	}
	else{
	swal("Your Request is Processing , Please Wait...", {
		  buttons: false,
		  timer: 6000,
		});
	            Data.stu_pin2=branchcode;
	            Data.facultyid=uname;
				$http.post('/Student_Portal/register/insertStudentDetails', Data).then(
						function(response) {
							
							$scope.data = response.data;
							console.log( Data );
							if ($scope.data.successful) {
								let msg = 'Dear Student ,%0a%0aYOU ARE SUCCESSFULLY REGISTERED IN STUDENT PORTAL WEBSITE...! %0a Your Registration Details are as follows :  %0a%0a NAME : '+Data.name+'%0a PIN : '+Data.stu_pin1+"-"+Data.stu_pin2+"-"+Data.stu_pin3+'%0a EMAIL : '+Data.email+'%0a MOBILE NUMBER : '+Data.mobileno+'%0a(For further details contact your college administrator and also check your email) %0a%0aThanks and Regards ,%0aStudent Portal Team.';
								let num = parseInt(('91'+Data.mobileno));
								var win = window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
								swal({
									  title: "SUCCESS!",
									  text: Data.stu_pin1 + "-" + Data.stu_pin2 + "-" + Data.stu_pin3 +  "\'s Registration Done Successfully :)",
									  icon: "success",
									}).then(() => {
										Nav.showAddStudentPage();
										});
								
							} else {
								swal({
									  title: "OOPS!",
									  text: Data.stu_pin1 + "-" + Data.stu_pin2 + "-" + Data.stu_pin3 +  "\'s Registration Failed :(",
									  icon: "error",
									});
							}
						}, function(errResponse) {
							swal({
								  title: "WARNING!",
								  text: "Duplicate Details Not Allowed..!",
								  icon: "warning",
								}).then(() => {
									Nav.showAddStudentPage();
								});
							console.error('Error Occoured During Registration Process...!');
						}
						
				
				);}
			};


			

if(role=='Faculty' || role=='HOD'){			
			$http.post('/Student_Portal/register/viewaccountsforfaculty',branchcode).then(
								function(response) {
									
									$scope.studata = response.data;
									
									console.log( $scope.studata );
									if ($scope.studata.successful) {
										$scope.studentdetails = $scope.studata.responseObject;
										console.log($scope.studentdetails);
									} else {
										console.log("Student Accounts Viewing Operation Failed :(");
									}
								}, function(errResponse) {
									console.error('Error Occoured During Student Accounts Viewing Process...!');
								}
								
						);
			
			$http.post('/Student_Portal/register/viewaccountsforfaculty1',branchcode).then( /*To retrieve stu_pin1*/
					function(response) {
						
						$scope.studata1 = response.data;
						
						console.log( $scope.studata1 );
						if ($scope.studata1.successful) {
							$scope.studentdetails1 = $scope.studata1.responseObject;
							console.log($scope.studentdetails1);
						} else {
							console.log("Student Accounts Viewing Operation Failed :(");
						}
					}, function(errResponse) {
						console.error('Error Occoured During Student Accounts Viewing Process...!');
					}
					
			);
			
			$http.post('/Student_Portal/register/viewaccountsforfaculty2',branchcode).then( /*To retrieve stu_pin3*/
					function(response) {
						
						$scope.studata2 = response.data;
						
						console.log( $scope.studata2 );
						if ($scope.studata2.successful) {
							$scope.studentdetails2 = $scope.studata2.responseObject;
							console.log($scope.studentdetails2);
						} else {
							console.log("Student Accounts Viewing Operation Failed :(");
						}
					}, function(errResponse) {
						console.error('Error Occoured During Student Accounts Viewing Process...!');
					}
					
			);
}
			


$scope.updateStudentDetails = function(Data) {
	console.log(Data);
	if(Data==undefined||Data.stu_pin1==null ||Data.stu_pin3==null||Data.year==null||Data.name==null||Data.email==null||Data.mobileno==null||Data.stu_pin1=='' ||Data.stu_pin3==''||Data.year==''||Data.name==''||Data.email==''||Data.mobileno==''){
		swal({
			  title: "WARNING!",
			  text: "Details Entered are in Invalid Format..!",
			  icon: "warning",
			}).then(() => {
				Nav.showAddStudentPage();
			});
	}
	else{
	swal("Your Request is Processing , Please Wait...", {
		  buttons: false,
		  timer: 6000,
		});
                Data.stu_pin2=branchcode;
	            Data.facultyid=uname;
				$http.post('/Student_Portal/register/updateStudentDetails', Data).then(
						function(response) {
							
							$scope.data = response.data;
							console.log( Data );
							if ($scope.data.successful) {
								let msg = 'Dear Student ,%0a%0aYOUR DETAILS ARE SUCCESSFULLY UPDATED IN STUDENT PORTAL WEBSITE...! %0a Your Registration Details are as follows :  %0a%0a NAME : '+Data.name+'%0a PIN : '+Data.stu_pin1+"-"+Data.stu_pin2+"-"+Data.stu_pin3+'%0a EMAIL : '+Data.email+'%0a MOBILE NUMBER : '+Data.mobileno+'%0a(For further details contact your college administrator and also check your email) %0a%0aThanks and Regards ,%0aStudent Portal Team.';
								let num = parseInt(('91'+Data.mobileno));
								var win = window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
								swal({
									  title: "SUCCESS!",
									  text: Data.stu_pin1 + "-" + Data.stu_pin2 + "-" + Data.stu_pin3 +  "\'s Details Updated Successfully :)",
									  icon: "success",
									}).then(() => {
										Nav.showAddStudentPage();
										});
								
							} else {
								swal({
									  title: "OOPS!",
									  text: Data.stu_pin1 + "-" + Data.stu_pin2 + "-" + Data.stu_pin3 +  "\'s Details Updation Failed :(",
									  icon: "error",
									});
							}
						}, function(errResponse) {
							swal({
								  title: "WARNING!",
								  text: "Duplicate Details Not Allowed..!",
								  icon: "warning",
								}).then(() => {
									Nav.showAddStudentPage();
								});
							console.error('Error Occoured During Updation Process...!');
						}
						
				
				);}
			};



$scope.removeStudentDetails = function(Data) {
				swal({
					  title: "Are you sure?",
					  text: "Once deleted, you will not be able to recover this record!",
					  icon: "warning",
					  buttons: true,
					  dangerMode: true,
					})
					.then((willDelete) => {
					  if (willDelete) {
						 
					  console.log(Data);		
								$http.post('/Student_Portal/register/removeStudentDetails', Data).then(
										function(response) {
											$scope.data = response.data;
											if ($scope.data.successful) {
												swal({
													  title: "SUCCESS!",
													  text: Data.stu_pin1 + "-" + Data.stu_pin2 + "-" + Data.stu_pin3 + "\'s Details Removed Successfully :)",
													  icon: "success",
													})
												.then(() => {
													Nav.showAddStudentPage();
													
												});
												
												
											} else {
												swal({
													  title: "OOPS!",
													  text: Data.stu_pin1 + "-" + Data.stu_pin2 + "-" + Data.stu_pin3 +   "\'s Details Not Deleted :(",
													  icon: "error",
													});
											}
										}, function(errResponse) {
											console.error('Error Occoured During Deletion Process...!');
										});	
					  } else {
					    swal({
							title: "OOPS!",
							text: Data.stu_pin1 + "-" + Data.stu_pin2 + "-" + Data.stu_pin3 +  "\'s Details Not Deleted :(",
							icon: "error",
							});
					  }
					});
			};


	






/*--------------------------------------------------------------PRINCIPAL OPERATIONS------------------------------------------------------------------------------------*/



if(role=='Principal'){
$http.post('/Student_Portal/register/viewaccountsforprincipal').then(  /*HOD DETAILS*/
					function(response) {
						
						$scope.pdata = response.data;
						
						console.log( $scope.pdata );
						if ($scope.pdata.successful) {
							$scope.hoddetailsforprincipal = $scope.pdata.responseObject;
							console.log($scope.hoddetailsforprincipal);
						} else {
							console.log("Accounts Viewing Operation Failed :(");
						}
					}, function(errResponse) {
						console.error('Error Occoured During Accounts Viewing Process...!');
					}
					
			);

$http.post('/Student_Portal/register/viewaccountsforprincipal1').then(  /*Faculty DETAILS*/
		function(response) {
			
			$scope.pdata1 = response.data;
			
			console.log( $scope.pdata1 );
			if ($scope.pdata1.successful) {
				$scope.facultydetailsforprincipal = $scope.pdata1.responseObject;
				console.log($scope.facultydetailsforprincipal);
			} else {
				console.log("Accounts Viewing Operation Failed :(");
			}
		}, function(errResponse) {
			console.error('Error Occoured During Accounts Viewing Process...!');
		}
		
);

$http.post('/Student_Portal/register/viewaccountsforprincipal2').then(  /*Student DETAILS*/
		function(response) {
			
			$scope.pdata2 = response.data;
			
			console.log( $scope.pdata2 );
			if ($scope.pdata2.successful) {
				$scope.studentdetailsforprincipal = $scope.pdata2.responseObject;
				console.log($scope.studentdetailsforprincipal);
			} else {
				console.log("Accounts Viewing Operation Failed :(");
			}
		}, function(errResponse) {
			console.error('Error Occoured During Accounts Viewing Process...!');
		}
		
);
}



$scope.promote = function() {
	var edate;
	$http.post('/Student_Portal/register/getPromotionDate').then(
			function(response) {
				$scope.data = response.data;
				
				console.log( $scope.data );
				if ($scope.data.successful) {

					var today = new Date();
					var dd = String(today.getDate()).padStart(2, '0');
					var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
					var yyyy = today.getFullYear();
					today = yyyy + '-' + mm + '-' + dd;
                    
					var pdate=new String($scope.data.responseObject.edate);
					var cdate=new String(today);
					console.log(cdate+"  "+pdate);
					if((cdate.localeCompare(pdate))>=0){
						edate=new Date(cdate);
						edate.setDate(edate.getDate() + 182);
						console.log(edate);
						swal({
							  title: "Are you sure?",
							  text: "Once promoted you can't acess the current year data!",
							  icon: "warning",
							  buttons: true,
							  dangerMode: true,
							})
							.then((willDelete) => {
							  if (willDelete) {		
										$http.post('/Student_Portal/register/promote').then(
												function(response) {
													$scope.data = response.data;
													if ($scope.data.successful) {
														$.each( $scope.data.responseObject, function( key, value ) {
															console.log(value);
															$http.post('/Student_Portal/register/removeCompleted',value);
														});

														$http.post('/Student_Portal/register/setPromotionDate',edate);
														swal({
															  title: "SUCCESS!",
															  text: "Promoted To Next Year Successfully :)",
															  icon: "success",
															})
														.then(() => {Nav.showPrincipalHomePage();});
														
														
													} else {
														swal({
															  title: "OOPS!",
															  text: "Promotion Operation Failed :(",
															  icon: "error",
															}).then(() => {Nav.showPrincipalHomePage();});
													}
												}, function(errResponse) {
													console.error('Error Occoured During Promotion Process...!');
												}).then(() => {Nav.showPrincipalHomePage();});	
							  } else {
							    swal({
									title: "OOPS!",
									text: "Promotion Operation Failed :(",
									icon: "error",
									}).then(() => {Nav.showPrincipalHomePage();});
							  }
							});
					}else{
						swal({
							  title: "ACESS DENINED!",
							  text: "Please wait until promotion date :(",
							  icon: "error",
							}).then(() => {Nav.showPrincipalHomePage();});
					}
				} else {
					swal({
						  title: "OOPS!",
						  text: "Sevire Error While Promoting Students :(",
						  icon: "error",
						}).then(() => {Nav.showPrincipalHomePage();});
					console.log("Accounts Viewing Operation Failed :(");
				}
				
				
			},function(errResponse) {
				swal({
					  title: "OOPS!",
					  text: "Server Error While Promoting Students :(",
					  icon: "error",
					}).then(() => {Nav.showPrincipalHomePage();});
				console.error('Error Occoured During Promotion Process...!');
			});

};




/*--------------------------------------------------------------HOD OPERATIONS------------------------------------------------------------------------------------*/



if(role=='HOD'){
console.log(branchcode);
$http.post('/Student_Portal/register/viewaccountsforhod',branchcode).then(
					function(response) {
						console.log(branchcode);
						$scope.hdata = response.data;
						
						console.log( $scope.hdata );
						if ($scope.hdata.successful) {
							$scope.userdetailsforhod = $scope.hdata.responseObject;
							console.log($scope.userdetailsforhod);
						} else {
							console.log("Accounts Viewing Operation Failed :(");
						}
					}, function(errResponse) {
						console.error('Error Occoured During Accounts Viewing Process...!');
					}
					
			);

$http.post('/Student_Portal/register/viewaccountsforhod1',branchcode).then(
		function(response) {
			console.log(branchcode);
			$scope.hdata1 = response.data;
			
			console.log( $scope.hdata1 );
			if ($scope.hdata1.successful) {
				$scope.studentdetailsforhod = $scope.hdata1.responseObject;
				console.log($scope.studentdetailsforhod);
			} else {
				console.log("Accounts Viewing Operation Failed :(");
			}
		}, function(errResponse) {
			console.error('Error Occoured During Accounts Viewing Process...!');
		}
		
);
}



/*--------------------------------------------------------------Faculty Attendance OPERATIONS------------------------------------------------------------------------------------*/


$scope.viewFacultyAttendance = function(Data) {
	if(Data==undefined || Data.sdate==null || Data.sdate==''|| Data.edate==null || Data.edate==''){
		swal({
			  title: "Warning!",
			  text: "Selected Date Must Be Not Null :(",
			  icon: "warning",
			}).then(() => {
				Nav.showFacultyAttendancePage();
				});
	}else{
	Data.branchcode=branchcode
	console.log(Data);
	$http.post('/Student_Portal/register/viewFacultyAttendance',Data).then(
						function(response) {
							console.log(branchcode);
							$scope.data = response.data;
							
							console.log( $scope.data );
							if ($scope.data.successful) {
								$scope.facultyAttendance = $scope.data.responseObject;
								if($scope.facultyAttendance.length==0){
									swal({
										  title: "Oops!",
										  text: "No Data Found :(",
										  icon: "error",
										}).then(() => {
											Nav.showFacultyAttendancePage();
											});
								}
								for(var i=0; i < $scope.facultyAttendance.length; i++ ){	$scope.facultyAttendance[i].date=new Date($scope.facultyAttendance[i].date);    }
								console.log($scope.facultyAttendance);
							} else {
								console.log("Attendance Viewing Operation Failed :(");
							}
						}, function(errResponse) {
							console.error('Error Occoured During Attendance Viewing Process...!');
						}
						
				);}
	};





$scope.insertFacultyAttendance = function(Data) {
	            console.log(Data);
	            if(Data==undefined|| Data.facultyid==null || Data.date==null || Data.attendance==null || Data.facultyid=='' || Data.date=='' || Data.attendance==''){
	            	swal({
						  title: "Warning!",
						  text: "Details Entered are in Invalid Format :(",
						  icon: "warning",
						}).then(() => {
							Nav.showFacultyAttendancePage();
							});
	            }
	            else{
	            	Data.branchcode=branchcode;
		        	console.log(Data);
				$http.post('/Student_Portal/register/insertFacultyAttendance', Data).then(
						function(response) {
							
							$scope.data = response.data;
							
							console.log( Data );
							if ($scope.data.successful) {
								swal({
									  title: "SUCCESS!",
									  text: Data.facultyid + "\'s Attendance Inserted Successfully :)",
									  icon: "success",
									}).then(() => {
										Nav.showFacultyAttendancePage();
										});
								
							} else {
								swal({
									  title: "OOPS!",
									  text: Data.facultyid + "\'s Attendance Insertion Failed :(",
									  icon: "error",
									}).then(() => {
										Nav.showFacultyAttendancePage();
									});
							}
						}, function(errResponse) {
							swal({
								  title: "Warning!",
								  text: "Duplicate Data Not Allowed :(",
								  icon: "warning",
								}).then(() => {
									Nav.showFacultyAttendancePage();
								});
							console.error('Error Occoured During Attendance Insertion Process...!');
						}
						
				
				);}
			};
			
			

$scope.updateFacultyAttendance = function(singleUserData){
	console.log(singleUserData);
	if(singleUserData==undefined|| singleUserData.facultyid==null || singleUserData.date==null || singleUserData.attendance==null || singleUserData.facultyid=='' || singleUserData.date=='' || singleUserData.attendance==''){
    	swal({
			  title: "Warning!",
			  text: "Details Entered are in Invalid Format :(",
			  icon: "warning",
			}).then(() => {
				Nav.showFacultyAttendancePage();
				});
    }else{
							$http.post('/Student_Portal/register/updateFacultyAttendance', singleUserData).then(
									function(response) {
										$scope.data = response.data;
										if ($scope.data.successful) {
											console.log(singleUserData);
											swal({
												  title: "SUCCESS!",
												  text: singleUserData.facultyid + "\'s Attendance Updated Successfully :)",
												  icon: "success",
												}).then(() => {	Nav.showFacultyAttendancePage(); });
										} else {
											swal({
												  title: "OOPS!",
												  text: singleUserData.facultyid + "\'s Attendance Updation Failed :(",
												  icon: "error",
												}).then(() => {
													Nav.showFacultyAttendancePage();
												});
										}
									}, function(errResponse) {
										swal({
											  title: "Warning!",
											  text: "Duplicate Data Not Allowed :(",
											  icon: "warning",
											}).then(() => {
												Nav.showFacultyAttendancePage();
											});
										console.error('Error Occoured Attendance Updation Process...!');
									});}
						};

						


$scope.removeFacultyAttendance = function(Data) {
								 console.log(Data.facultyattendanceid);		
											$http.post('/Student_Portal/register/removeFacultyAttendance', Data.facultyattendanceid).then(
													function(response) {
														$scope.data = response.data;
														if ($scope.data.successful) {
															swal({
																  title: "SUCCESS!",
																  text: Data.facultyid + "\'s Attendance Removed Successfully :)",
																  icon: "success",
																})
															.then(() => {	Nav.showFacultyAttendancePage(); });
															
															
														} else {
															swal({
																  title: "OOPS!",
																  text: Data.facultyid + "\'s Attendance Not Deleted :(",
																  icon: "error",
																});
														}
													}, function(errResponse) {
														console.error('Error Occoured During Attendence Deletion Process...!');
													});	
								  
						};

						
						
						

$scope.viewIndividualFacultyAttendance = function(Data) {
							if(Data==undefined || Data.sdate==null || Data.sdate==''|| Data.edate==null || Data.edate==''){
								swal({
									  title: "Warning!",
									  text: "Selected Dates Must Be Not Null :(",
									  icon: "warning",
									}).then(() => {
										if(role=='HOD'){Nav.showHodAttendancePage();}
										else if(role=='Faculty'){Nav.showMyAttendancePage();}
										});
							}else{
							Data.username=uname;
							var cdate;
							if(Data.sdate > Data.edate){
								cdate=Data.sdate;
								Data.sdate=Data.edate;
								Data.edate=cdate;
							}
							cdate=new Date();
							if(cdate < Data.sdate && cdate < Data.edate)
								{
								swal({
									 title: "Invalid Date!",
									 text: "Dates Must Not Be Greater Than Today's Date :(",
									 icon: "error",
									}).then(() => {
										if(role=='HOD'){Nav.showHodAttendancePage();}
										else if(role=='Faculty'){Nav.showMyAttendancePage();}
										});
								}
							if(cdate < Data.edate){
								Data.edate=cdate;
							}
							console.log(Data.sdate+"   "+Data.edate);
							
							 $http.post('/Student_Portal/register/getDates1', Data).then(
										function(response1) {
											$scope.data=response1.data;
												$.each( $scope.data.responseObject, function( key, value ) {
													value.username=Data.username;
													value.date=new Date(value.date);
													$http.post('/Student_Portal/register/getAttendance1',value).then(
															function(response2) {
																if(response2.data.responseObject==undefined){
																	$http.post('/Student_Portal/register/getHolidayReason', value).then(
																			function(response3) {
																				if(response3.data.responseObject==undefined){
																					value.attendance='Attendance Not Inserted';
																				}
																				else{
																					value.attendance=response3.data.responseObject.reason;
																				}
																			});
																}
																else{
																	value.attendance=response2.data.responseObject.attendance;
																}
											 				});
													});
													
												$scope.individualfacultyAttendance=$scope.data.responseObject;
										});
							
							
							}
							
}




/*--------------------------------------------------------------Student Attendance OPERATIONS------------------------------------------------------------------------------------*/




$scope.viewStudentAttendance = function(Data) {
	if(Data==undefined || Data.sdate==null || Data.sdate==''|| Data.edate==null || Data.edate==''){
		swal({
			  title: "Warning!",
			  text: "Selected Date Must Be Not Null :(",
			  icon: "warning",
			}).then(() => {
				Nav.showAddAttendancePage();
				});
	}else{
	console.log(Data);
	Data.facultyid=uid;
	$http.post('/Student_Portal/register/viewStudentAttendance',Data).then(
						function(response) {
							console.log(Data);
							$scope.data = response.data;
							
							console.log( $scope.data );
							if ($scope.data.successful) {
								$scope.studentAttendance = $scope.data.responseObject;
								if($scope.studentAttendance.length==0){
									swal({
										  title: "Oops!",
										  text: "No Data Found :(",
										  icon: "error",
										}).then(() => {
											Nav.showAddAttendancePage();
											});
								}
								for(var i=0; i < $scope.studentAttendance.length; i++ ){    $scope.studentAttendance[i].date=new Date($scope.studentAttendance[i].date);    }
								console.log($scope.studentAttendance);
							} else {
								console.log("Attendance Viewing Operation Failed :(");
							}
						}, function(errResponse) {
							console.error('Error Occoured During Attendance Viewing Process...!');
						}
						
				);}
	}





$scope.insertStudentAttendance = function(Data) {
	           
	            if(Data==undefined|| Data.date==null || Data.attendance==null || Data.date=='' || Data.attendance==''|| Data.stu_pin1==null || Data.stu_pin3==null  || Data.stu_pin1=='' || Data.stu_pin3==''){
	            	swal({
						  title: "Warning!",
						  text: "Details Entered are in Invalid Format :(",
						  icon: "warning",
						}).then(() => {
							Nav.showAddAttendancePage();
							});
	            }else{
	            	Data.stu_pin2=branchcode;
	 	            Data.facultyid=uid;
	 	        	console.log(Data);
				$http.post('/Student_Portal/register/insertStudentAttendance', Data).then(
						function(response) {
							
							$scope.data = response.data;
							
							console.log( Data );
							if ($scope.data.successful) {
								swal({
									  title: "SUCCESS!",
									  text: Data.stu_pin1 + "-" + Data.stu_pin2 + "-" + Data.stu_pin3 + " \'s Attendance Inserted Successfully :)",
									  icon: "success",
									}).then(() => {
										Nav.showAddAttendancePage();
										});
								
							} else {
								swal({
									  title: "OOPS!",
									  text: Data.stu_pin1 + "-" + Data.stu_pin2 + "-" + Data.stu_pin3 + " \'s Attendance Insertion Failed :(",
									  icon: "error",
									}).then(() => {
										Nav.showAddAttendancePage();
									});
							}
						}, function(errResponse) {
							swal({
								  title: "Warning!",
								  text: "Duplicate Data Not Allowed :(",
								  icon: "warning",
								}).then(() => {
									Nav.showAddAttendancePage();
								});
							console.error('Error Occoured During Attendance Insertion Process...!');
						}
						
				
				);}
			};
			
			

			
$scope.updateStudentAttendance = function(singleUserData){
				if(singleUserData==undefined|| singleUserData.date==null || singleUserData.attendance==null || singleUserData.date=='' || singleUserData.attendance==''|| singleUserData.stu_pin1==null || singleUserData.stu_pin3==null  || singleUserData.stu_pin1=='' || singleUserData.stu_pin3==''){
			    	swal({
						  title: "Warning!",
						  text: "Details Entered are in Invalid Format :(",
						  icon: "warning",
						}).then(() => {
							Nav.showAddAttendancePage();
							});
			    }else{
										$http.post('/Student_Portal/register/updateStudentAttendance', singleUserData).then(
												function(response) {
													$scope.data = response.data;
													if ($scope.data.successful) {
														console.log(singleUserData);
														swal({
															  title: "SUCCESS!",
															  text:  singleUserData.stu_pin1 + "-" + singleUserData.stu_pin2 + "-" + singleUserData.stu_pin3 + " \'s Attendance Updated Successfully :)",
															  icon: "success",
															}).then(() => {	Nav.showAddAttendancePage(); });
													} else {
														swal({
															  title: "OOPS!",
															  text:  singleUserData.stu_pin1 + "-" + singleUserData.stu_pin2 + "-" + singleUserData.stu_pin3 + " \'s Attendance Updation Failed :(",
															  icon: "error",
															}).then(() => {
																Nav.showAddAttendancePage();
															});
													}
												}, function(errResponse) {
													swal({
														  title: "Warning!",
														  text: "Duplicate Data Not Allowed :(",
														  icon: "warning",
														}).then(() => {
															Nav.showAddAttendancePage();
														});
													console.error('Error Occoured During Attendance Updation Process...!');
												});}
									};

									


$scope.removeStudentAttendance = function(Data) {
					console.log(Data.studentattendanceid);		
					$http.post('/Student_Portal/register/removeStudentAttendance', Data.studentattendanceid).then(
					function(response) {
								$scope.data = response.data;
								if ($scope.data.successful) {
								swal({
									 title: "SUCCESS!",
									 text: Data.stu_pin1 + "-" + Data.stu_pin2 + "-" + Data.stu_pin3 + " \'s Attendance Removed Successfully :)",
									 icon: "success",
									})
									.then(() => {	Nav.showAddAttendancePage(); });		
								} else {
										swal({
											 title: "OOPS!",
											 text: Data.stu_pin1 + "-" + Data.stu_pin2 + "-" + Data.stu_pin3 + " \'s Attendance Not Deleted :(",
											 icon: "error",
											});
										}
								}, function(errResponse) {
										console.error('Error Occoured During Attendence Deletion Process...!');
								});	
	};



$scope.viewIndividualStudentAttendance = function(Data) {
	if(Data==undefined||Data.stu_pin1==null || Data.stu_pin2==null || Data.stu_pin3==null||Data.stu_pin1=='' || Data.stu_pin2=='' || Data.stu_pin3=='' ||  Data.sdate=='' || Data.edate==''||  Data.sdate==null || Data.edate==null ){
		swal({
			 title: "WARNING!",
			 text: "Details Entered Are Invalid  , Try Again :(",
			 icon: "warning",
			}).then(() => {	Nav.showStudentPortalPage(); });
	}else{
	var cdate;
	if(Data.sdate > Data.edate){
		cdate=Data.sdate;
		Data.sdate=Data.edate;
		Data.edate=cdate;
	}
	cdate=new Date();
	if(cdate < Data.sdate && cdate < Data.edate)
		{
		swal({
			 title: "Invalid Date!",
			 text: "Dates Must Not Be Greater Than Today's Date :(",
			 icon: "error",
			}).then(() => {	Nav.showStudentPortalPage(); });
		}
	if(cdate < Data.edate){
		Data.edate=cdate;
	}
	console.log(Data.sdate+"   "+Data.edate);
   $http.post('/Student_Portal/register/getDates', Data).then(
			function(response1) {
				$scope.data=response1.data;
				console.log($scope.data.successful);
				if(response1.data.successful==false){
					swal({
						 title: "Oops!",
						 text: "PIN NOT FOUND :(",
						 icon: "error",
						}).then(() => {	Nav.showStudentPortalPage(); });
				}else{
					$.each( $scope.data.responseObject, function( key, value ) {
						value.stu_pin1=Data.stu_pin1;
						value.stu_pin2=Data.stu_pin2;
						value.stu_pin3=Data.stu_pin3;
						value.date=new Date(value.date);
						$http.post('/Student_Portal/register/getAttendance',value).then(
								function(response2) {
									if(response2.data.responseObject==undefined){
										$http.post('/Student_Portal/register/getHolidayReason', value).then(
												function(response3) {
													if(response3.data.responseObject==undefined){
														value.attendance='Attendance Not Inserted';
													}
													else{
														value.attendance=response3.data.responseObject.reason;
													}
												});
									}
									else{
										value.attendance=response2.data.responseObject.attendance;
									}
				 				});
						});
						
					$scope.individualstudentattendance=$scope.data.responseObject;
				}
			});
   
   
	}

};



/*--------------------------------------------------------------Getting Sem and Subject and stu_pin3------------------------------------------------------------------------------------*/




$http.get('/Student_Portal/register/getSemisters').then(function(response) {
	$scope.data = response.data;
	if($scope.data.successful)
	{
		$scope.semesters = $scope.data.responseObject;
	} 
	else
	{
		console.log("Client error while getting data");
	}
},
function(response)
{
	console.log("Server error while getting data");
});





$scope.getSubjects = function(totalObj)
{
	$http.post('/Student_Portal/register/getSubjects', totalObj.sem).then(function(response)
	{
		$scope.data = response.data;
		if($scope.data.successful)
		{
			$scope.subjects = $scope.data.responseObject;
			$scope.data = {object : totalObj};
		}
		else
		{
			console.log("Client error while getting data");
		}
	},
	function(errResponse)
	{
		console.log("Server error while getting data");
	});
}





$scope.getStu_Pin3 = function(totalObj)
{
	totalObj.stu_pin2=branchcode;
	$http.post('/Student_Portal/register/getStu_Pin3', totalObj).then(function(response)
	{
		console.log(response.data.responseObject);
		$scope.data = response.data;
		if($scope.data.successful)
		{
			$scope.stupin3s = $scope.data.responseObject;
			$scope.data = {object : totalObj};
		}
		else
		{
			console.log("Client error while getting data");
		}
	},
	function(errResponse)
	{
		console.log("Server error while getting data");
	});
}

/*--------------------------------------------------------------Student Marks OPERATIONS------------------------------------------------------------------------------------*/




if(role=='Faculty'){
	console.log(uid);
	$http.post('/Student_Portal/register/viewStudentMarks',uid).then(
						function(response) {
							console.log(uid);
							$scope.data = response.data;
							
							console.log( $scope.data );
							if ($scope.data.successful) {
								$scope.studentMarks = $scope.data.responseObject;
								console.log($scope.studentMarks);
							} else {
								console.log("Marks Viewing Operation Failed :(");
							}
						}, function(errResponse) {
							console.error('Error Occoured During Marks Viewing Process...!');
						}
						
				);
	}





$scope.insertstudentMarks = function(Data) {
	if(Data==undefined||Data.stu_pin1==null || Data.stu_pin3==null||Data.sem==null || Data.subject==null||Data.mid1==null || Data.mid2==null||Data.stu_pin1=='' || Data.stu_pin3==''||Data.sem=='' || Data.subject==''|| Data.mid1>40 || Data.mid1<0 || Data.mid2>40 || Data.mid2<0)
		{
		swal({
			  title: "Warning!",
			  text: "Details Entered Are Invalid :(",
			  icon: "warning",
			}).then(() => {
				Nav.showAddMarksPage();
			});
		}else{
	            Data.stu_pin2=localStorage.getItem('branchcode');
	            Data.facultyid=uid;
	            Data.status="Active";
	        	console.log(Data);
				$http.post('/Student_Portal/register/insertstudentMarks', Data).then(
						function(response) {
							
							$scope.data = response.data;
							
							console.log( Data );
							if ($scope.data.successful) {
								swal({
									  title: "SUCCESS!",
									  text: Data.stu_pin1 + "-" + Data.stu_pin2 + "-" + Data.stu_pin3 + " \'s Marks Inserted Successfully :)",
									  icon: "success",
									}).then(() => {
										Nav.showAddMarksPage();
										});
								
							} else {
								swal({
									  title: "OOPS!",
									  text: Data.stu_pin1 + "-" + Data.stu_pin2 + "-" + Data.stu_pin3 + " \'s Marks Insertion Failed :(",
									  icon: "error",
									}).then(() => {
										Nav.showAddMarksPage();
									});
							}
						}, function(errResponse) {
							swal({
								  title: "Warning!",
								  text: "Duplicate Data or Null Values Not Allowed :(",
								  icon: "warning",
								}).then(() => {
									Nav.showAddMarksPage();
								});
							console.error('Error Occoured During Marks Insertion Process...!');
						}
						
				
				);}
			};
			
			

			
$scope.updatestudentMarks = function(singleUserData){
	if(singleUserData==undefined||singleUserData.stu_pin1==null || singleUserData.stu_pin3==null||singleUserData.sem==null || singleUserData.subject==null||singleUserData.mid1==null || singleUserData.mid2==null||singleUserData.stu_pin1=='' || singleUserData.stu_pin3==''||singleUserData.sem=='' || singleUserData.subject==''|| singleUserData.mid1>40 || singleUserData.mid1<0 || singleUserData.mid2>40 || singleUserData.mid2<0)
	{
	swal({
		  title: "Warning!",
		  text: "Details Entered Are Invalid :(",
		  icon: "warning",
		}).then(() => {
			Nav.showAddMarksPage();
		});
	}else{			
		
				$http.post('/Student_Portal/register/updatestudentMarks', singleUserData).then(
				function(response) {
				       $scope.data = response.data;
					   if ($scope.data.successful) {
							console.log(singleUserData);
							swal({
							    title: "SUCCESS!",
								text:  singleUserData.stu_pin1 + "-" + singleUserData.stu_pin2 + "-" + singleUserData.stu_pin3 + " \'s Marks Updated Successfully :)",
								icon: "success",
							}).then(() => {	Nav.showAddMarksPage(); });
						} else {
							swal({
								title: "OOPS!",
								text:  singleUserData.stu_pin1 + "-" + singleUserData.stu_pin2 + "-" + singleUserData.stu_pin3 + " \'s Marks Updation Failed :(",
								icon: "error",
								}).then(() => {
									Nav.showAddMarksPage();
								});
						}
				}, function(errResponse) {
					swal({
						  title: "Warning!",
						  text: "Duplicate Data or Null Values Not Allowed :(",
						  icon: "warning",
						}).then(() => {
							Nav.showAddMarksPage();
						});
							console.error('Error Occoured During Marks Updation Process...!');
			});}
};




$scope.removestudentMarks = function(Data) {
					console.log(Data.studentmarksid);		
					$http.post('/Student_Portal/register/removestudentMarks', Data.studentmarksid).then(
					function(response) {
								$scope.data = response.data;
								if ($scope.data.successful) {
								swal({
									 title: "SUCCESS!",
									 text: Data.stu_pin1 + "-" + Data.stu_pin2 + "-" + Data.stu_pin3 + " \'s Marks Removed Successfully :)",
									 icon: "success",
									})
									.then(() => {	Nav.showAddMarksPage(); });		
								} else {
										swal({
											 title: "OOPS!",
											 text: Data.stu_pin1 + "-" + Data.stu_pin2 + "-" + Data.stu_pin3 + " \'s Marks Not Deleted :(",
											 icon: "error",
											});
										}
								}, function(errResponse) {
										console.error('Error Occoured During Marks Deletion Process...!');
								});	
	};



$scope.viewIndividualStudentMarks = function(Data) {
	if(Data==undefined||Data.stu_pin1==null || Data.stu_pin2==null || Data.stu_pin3==null||Data.stu_pin1=='' || Data.stu_pin2=='' || Data.stu_pin3==''|| Data.sem==null || Data.sem==''){
		swal({
			 title: "WARNING!",
			 text: "Details Entered Are Invalid , Try Again :(",
			 icon: "warning",
			}).then(() => {	Nav.showStudentPortalPage(); });
	}else{
		console.log(Data);		
		$http.post('/Student_Portal/register/viewIndividualStudentMarks', Data).then(
				
				function(response) {
							$scope.data = response.data;
							console.log($scope.data);
							if ($scope.data.successful) {
							$scope.individualstudentmarks=$scope.data.responseObject;
							if($scope.individualstudentmarks.length==0){
								swal({
									 title: "OOPS!",
									 text: "Data Not Found , Try Again :(",
									 icon: "error",
									}).then(() => {	Nav.showStudentPortalPage(); });
							}
							console.log($scope.individualstudentmarks);
							} else {
									swal({
										 title: "OOPS!",
										 text: "Pin Not Found , Try Later :(",
										 icon: "error",
										});
									}
							}, function(errResponse) {
									console.error('Error Occoured During Marks Viewing Process...!');
							});	}

	};
	
	
	

/*--------------------------------------------------------------Viewing Student Details to principal or hod-----------------------------------------------------------------------------------*/
	
	

	$scope.viewIndividualStudentMarks1 = function(Data) {  /*For both principal and hod*/
		console.log(Data);	
		
		if(Data==undefined||(Data.branchcode==null && role=='principal')|| Data.sem==null || Data.subject==null||(Data.branchcode=='' && role=='principal') || Data.sem=='' || Data.subject==''){
			swal({
				 title: "WARNING!",
				 text: "Invalid Details Try Again :(",
				 icon: "warning",
				}).then(() => { 
					if(role=='HOD'){Nav.showHodDashboardPage();}
				    else if(role=='Principal'){Nav.showPrincipalDashboardPage();} 
					});
		}else{
			if(role=='HOD'){Data.branchcode=localStorage.getItem("branchcode");}
		$http.post('/Student_Portal/register/viewIndividualStudentMarks1', Data).then(
				
				function(response) {
							$scope.data = response.data;
							console.log($scope.data);
							if ($scope.data.successful) {
							$scope.individualstudentmarks1=$scope.data.responseObject;
							if($scope.individualstudentmarks1.length==0){
								swal({
									 title: "OOPS!",
									 text: "Data Not Found , Try Again :(",
									 icon: "error",
									}).then(() => { 
										if(role=='HOD'){Nav.showHodDashboardPage();}
									    else if(role=='Principal'){Nav.showPrincipalDashboardPage();} 
										});
							}
							console.log($scope.individualstudentmarks1);
							} else {
									swal({
										 title: "OOPS!",
										 text: "Data Not Found , Try Later :(",
										 icon: "error",
										});
									}
							}, function(errResponse) {
									console.error('Error Occoured During Marks Viewing Process...!');
							});	}

	};
	



	$scope.viewIndividualStudentAttendance1 = function(Data) {     /*For Principal*/
		console.log(Data);
		if(Data==undefined||Data.edate==null||Data.edate==''||Data.sdate==null||Data.sdate==''){
			swal({
				 title: "WARNING!",
				 text: "Invalid Details Try Again :(",
				 icon: "warning",
				}).then(() => { Nav.showPrincipalDashboardPage(); });
		}else{		
		$http.post('/Student_Portal/register/viewIndividualStudentAttendance1', Data).then(
				
				function(response) {
							$scope.data = response.data;
							console.log($scope.data);
							if ($scope.data.successful) {
							$scope.individualstudentattendance1=$scope.data.responseObject;
							if($scope.individualstudentattendance1.length==0){
								swal({
									 title: "OOPS!",
									 text: "Data Not Found , Try Again :(",
									 icon: "error",
									}).then(() => {	Nav.showPrincipalDashboardPage(); });
							}
							console.log($scope.individualstudentattendance1);
							} else {
									swal({
										 title: "OOPS!",
										 text: "Data Not Found , Try Later :(",
										 icon: "error",
										});
									}
							}, function(errResponse) {
									console.error('Error Occoured During Attendence Viewing Process...!');
							});	}

	};




$scope.viewIndividualStudentAttendance2 = function(Data) {     /*For HOD*/
	console.log(Data);
	if(Data==undefined||Data.edate==null||Data.edate==''||Data.sdate==null||Data.sdate==''){
		swal({
			 title: "WARNING!",
			 text: "Invalid Details Try Again :(",
			 icon: "warning",
			}).then(() => { Nav.showHodDashboardPage(); });
	}else{	
		Data.stu_pin2=branchcode;
		console.log(Data.stu_pin2);
		$http.post('/Student_Portal/register/viewIndividualStudentAttendance2', Data).then(
				
				function(response) {
							$scope.data = response.data;
							console.log($scope.data);
							if ($scope.data.successful) {
							$scope.individualstudentattendance2=$scope.data.responseObject;
							if($scope.individualstudentattendance2.length==0){
								swal({
									 title: "OOPS!",
									 text: "Data Not Found , Try Again :(",
									 icon: "error",
									}).then(() => {	Nav.showHodDashboardPage(); });
							}
							console.log($scope.individualstudentattendance2);
							} else {
									swal({
										 title: "OOPS!",
										 text: "Data Not Found , Try Later :(",
										 icon: "error",
										});
									}
							}, function(errResponse) {
									console.error('Error Occoured During Attendence Viewing Process...!');
							});	}

	};
	
	
	

/*--------------------------------------------------------------Feedback Operations-----------------------------------------------------------------------------------*/
	
	

$scope.insertFeedback = function(Data) {
	   if(Data==undefined||Data.email==null || Data.feedback==null || Data.name==null || Data.email=='' || Data.feedback=='' || Data.name==''){
		   swal({
				  title: "WARNING!",
				  text: Data.name + " \'s Feedback is Incomplete :(",
				  icon: "error",
				}).then(() => {
					Nav.showFeedbackPage();
				});
	   }else{
	    Data.reply=" ";
        Data.status="Active";
    	console.log(Data);
		$http.post('/Student_Portal/register/insertFeedback', Data).then(
				function(response) {
					
					$scope.data = response.data;
					
					console.log( Data );
					if ($scope.data.successful) {
						swal({
							  title: "SUCCESS!",
							  text: Data.name + " \'s Feedback Sended Successfully :)",
							  icon: "success",
							}).then(() => {
								Nav.showFeedbackPage();
								});
						
					} else {
						swal({
							  title: "OOPS!",
							  text: Data.name + " \'s Feedback Not Sended :(",
							  icon: "error",
							}).then(() => {
								Nav.showFeedbackPage();
							});
					}
				}, function(errResponse) {
					swal({
						  title: "Warning!",
						  text: "Invalid Data Not Allowed :(",
						  icon: "warning",
						}).then(() => {
							Nav.showFeedbackPage();
						});
					console.error('Error Occoured During Feedback Insertion Process...!');
				}
				
		
		);}
	};
	
	

	



$http.post('/Student_Portal/register/viewFeedbacks').then(
					function(response) {
								$scope.feedbackdata = response.data;
								console.log($scope.feedbackdata);
								if ($scope.feedbackdata.successful) {
								$scope.feedbacks=$scope.feedbackdata.responseObject;
								console.log($scope.feedbacks);
								
								} else {
									console.log('Error Occoured During Feedback Viewing Process...!');
										}
								}, function(errResponse) {
										console.error('Error Occoured During Feedback Viewing Process...!');
								});	

	
	
	
	

$scope.deleteFeedback = function(Data) {
		console.log(Data);		
		$http.post('/Student_Portal/register/deleteFeedback', Data).then(
		function(response) {
					$scope.data = response.data;
					if ($scope.data.successful) {
					swal({
						 title: "SUCCESS!",
						 text: Data.name + " \'s Feedback Removed Successfully :)",
						 icon: "success",
						})
						.then(() => {	Nav.showMessagesPage(); });		
					} else {
							swal({
								 title: "OOPS!",
								 text: Data.name + " \'s Feedback Not Removed :(",
								 icon: "error",
								}).then(() => {	Nav.showMessagesPage(); });
							}
					}, function(errResponse) {
							console.error('Error Occoured During Feedback Deletion Process...!');
					});	
};




$scope.sendReply = function(Data) {

	swal({
		  title:"Enter Your Reply Here:",
		  content: "input",
		  button: {
			    text: "Send!",
			    closeModal: false,
			  },
			  icon:"info",
		})
		.then((reply) => {
			if(reply==null || reply==''){
				swal({
					  title: "OOPS!",
					  text: "Reply Not Sent :(",
					  icon: "error",
					}).then(() => {
						Nav.showMessagesPage();
					});
			}else{
			Data.reply=reply;
	console.log(Data.reply);
	$http.post('/Student_Portal/register/sendReply', Data).then(
			function(response) {
				
				$scope.data = response.data;
				
				if ($scope.data.successful) {
					swal({
						  title: "SUCCESS!",
						  text:  "Reply Sent to "+ Data.name +" Successfully :)",
						  icon: "success",
						}).then(() => {
							Nav.showMessagesPage();
							});
					
				} else {
					swal({
						  title: "OOPS!",
						  text: "Reply Not Sent :(",
						  icon: "error",
						}).then(() => {
							Nav.showMessagesPage();
						});
				}
			}, function(errResponse) {
				console.error('Error Occoured During Reply sending Process...!');
				Nav.showMessagesPage();
			}
			
	
	);}
		});
	};

	
	
	
/*--------------------------------------------------------------Subject OPERATIONS------------------------------------------------------------------------------------*/
	
	
	
$http.post('/Student_Portal/register/viewSubjects').then(
			function(response) {
						$scope.subdata = response.data;
						console.log($scope.subdata);
						if ($scope.subdata.successful) {
						$scope.semisterdetails=$scope.subdata.responseObject;
						console.log($scope.semisterdetails);
						} else {
							console.log('Error Occoured During Subjects Viewing Process...!');
								}
						}, function(errResponse) {
								console.error('Error Occoured During Subjects Viewing Process...!');
						});	

	
$scope.insertSubject = function(Data) {
	if(Data==undefined || Data.sem==null || Data.subject==null || Data.sem=='' || Data.subject=='' )
		{
		swal({
			  title: "OOPS!",
			  text: "Details Entered are in Invalid Format :(",
			  icon: "error",
			}).then(() => {
				Nav.showAddSubjectPage();
			});
		}
	else{
    	console.log(Data);
	$http.post('/Student_Portal/register/insertSubject', Data).then(
			function(response) {
				
				$scope.data = response.data;
				
				console.log( Data );
				if ($scope.data.successful) {
					swal({
						  title: "SUCCESS!",
						  text: "Subject Details Inserted Successfully :)",
						  icon: "success",
						}).then(() => {
							Nav.showAddSubjectPage();
							});
					
				} else {
					swal({
						  title: "OOPS!",
						  text: "Subject Details Insertion Failed :(",
						  icon: "error",
						}).then(() => {
							Nav.showAddSubjectPage();
						});
				}
			}, function(errResponse) {
				swal({
					  title: "Warning!",
					  text: "Duplicate Data Not Allowed :(",
					  icon: "warning",
					}).then(() => {
						Nav.showAddSubjectPage();
					});
				console.error('Error Occoured During Subject Insertion Process...!');
			}
			
	
	);}
};



$scope.updateSubject = function(Data) {
	if(Data==undefined || Data.sem==null || Data.subject==null || Data.sem=='' || Data.subject=='' )
	{
	swal({
		  title: "OOPS!",
		  text: "Details Entered are in Invalid Format :(",
		  icon: "error",
		}).then(() => {
			Nav.showAddSubjectPage();
		});
	}
else{
	console.log(Data);
$http.post('/Student_Portal/register/updateSubject', Data).then(
		function(response) {
			
			$scope.data = response.data;
			
			console.log( Data );
			if ($scope.data.successful) {
				swal({
					  title: "SUCCESS!",
					  text: "Subject Details Updated Successfully :)",
					  icon: "success",
					}).then(() => {
						Nav.showAddSubjectPage();
						});
				
			} else {
				swal({
					  title: "OOPS!",
					  text: "Subject Details Updation Failed :(",
					  icon: "error",
					}).then(() => {
						Nav.showAddSubjectPage();
					});
			}
		}, function(errResponse) {
			swal({
				  title: "Warning!",
				  text: "Duplicate Data Not Allowed :(",
				  icon: "warning",
				}).then(() => {
					Nav.showAddSubjectPage();
				});
			console.error('Error Occoured During Subject Updation Process...!');
		}
		

);}
};



$scope.removeSubject = function(Data) {
	console.log(Data);
$http.post('/Student_Portal/register/removeSubject', Data).then(
		function(response) {
			
			$scope.data = response.data;
			
			console.log( Data );
			if ($scope.data.successful) {
				swal({
					  title: "SUCCESS!",
					  text: "Subject Details Deleted Successfully :)",
					  icon: "success",
					}).then(() => {
						Nav.showAddSubjectPage();
						});
				
			} else {
				swal({
					  title: "OOPS!",
					  text: "Subject Details Deletion Failed :(",
					  icon: "error",
					}).then(() => {
						Nav.showAddSubjectPage();
					});
			}
		}, function(errResponse) {
			swal({
				  title: "Warning!",
				  text: "Server Error During Deletion Process :(",
				  icon: "warning",
				}).then(() => {
					Nav.showAddSubjectPage();
				});
			console.error('Error Occoured During Subject Deletion Process...!');
		}
		

);
};




/*--------------------------------------------------------------Semester OPERATIONS------------------------------------------------------------------------------------*/
	
	
	
$http.post('/Student_Portal/register/viewSemesters').then(
			function(response) {
						$scope.semdata = response.data;
						console.log($scope.semdata);
						if ($scope.semdata.successful) {
						$scope.semdetails=$scope.semdata.responseObject;
						console.log($scope.semdetails);
						} else {
							console.log('Error Occoured During Semesters Viewing Process...!');
								}
						}, function(errResponse) {
								console.error('Error Occoured During Semesters Viewing Process...!');
						});	

	
$scope.insertSem = function(Data) {
	if(Data==undefined || Data.sem==null ||  Data.sem=='')
		{
		swal({
			  title: "OOPS!",
			  text: "Details Entered are in Invalid Format :(",
			  icon: "error",
			}).then(() => {
				Nav.showAddSemPage();
			});
		}
	else{
    	console.log(Data);
	$http.post('/Student_Portal/register/insertSem', Data).then(
			function(response) {
				
				$scope.data = response.data;
				
				console.log( Data );
				if ($scope.data.successful) {
					swal({
						  title: "SUCCESS!",
						  text: "Semester Details Inserted Successfully :)",
						  icon: "success",
						}).then(() => {
							Nav.showAddSemPage();
							});
					
				} else {
					swal({
						  title: "OOPS!",
						  text: "Semester Details Insertion Failed :(",
						  icon: "error",
						}).then(() => {
							Nav.showAddSemPage();
						});
				}
			}, function(errResponse) {
				swal({
					  title: "Warning!",
					  text: "Duplicate Data Not Allowed :(",
					  icon: "warning",
					}).then(() => {
						Nav.showAddSemPage();
					});
				console.error('Error Occoured During Semester Insertion Process...!');
			}
			
	
	);}
};



$scope.updateSem = function(Data) {
	if(Data==undefined || Data.sem==null || Data.sem=='' )
	{
	swal({
		  title: "OOPS!",
		  text: "Details Entered are in Invalid Format :(",
		  icon: "error",
		}).then(() => {
			Nav.showAddSemPage();
		});
	}
else{
	console.log(Data);
$http.post('/Student_Portal/register/updateSem', Data).then(
		function(response) {
			
			$scope.data = response.data;
			
			console.log( Data );
			if ($scope.data.successful) {
				swal({
					  title: "SUCCESS!",
					  text: "Semester Details Updated Successfully :)",
					  icon: "success",
					}).then(() => {
						Nav.showAddSemPage();
						});
				
			} else {
				swal({
					  title: "OOPS!",
					  text: "Semester Details Updation Failed :(",
					  icon: "error",
					}).then(() => {
						Nav.showAddSemPage();
					});
			}
		}, function(errResponse) {
			swal({
				  title: "Warning!",
				  text: "Duplicate Data Not Allowed :(",
				  icon: "warning",
				}).then(() => {
					Nav.showAddSemPage();
				});
			console.error('Error Occoured During Semester Updation Process...!');
		}
		

);}
};



$scope.removeSem = function(Data) {
	console.log(Data);
$http.post('/Student_Portal/register/removeSem', Data).then(
		function(response) {
			
			$scope.data = response.data;
			
			console.log( Data );
			if ($scope.data.successful) {
				swal({
					  title: "SUCCESS!",
					  text: "Semester Details Deleted Successfully :)",
					  icon: "success",
					}).then(() => {
						Nav.showAddSemPage();
						});
				
			} else {
				swal({
					  title: "OOPS!",
					  text: "Semester Details Deletion Failed :(",
					  icon: "error",
					}).then(() => {
						Nav.showAddSemPage();
					});
			}
		}, function(errResponse) {
			swal({
				  title: "Warning!",
				  text: "Server Error During Deletion Process :(",
				  icon: "warning",
				}).then(() => {
					Nav.showAddSemPage();
				});
			console.error('Error Occoured During Semester Deletion Process...!');
		}
		

);
};



/*--------------------------------------------------------------------BRANCH OPERATIONS------------------------------------------------------------------------------------*/



$http.post('/Student_Portal/register/viewBranches').then(
			function(response) {
						$scope.branchdata = response.data;
						console.log($scope.branchdata);
						if ($scope.branchdata.successful) {
						$scope.branchdetails=$scope.branchdata.responseObject;
						console.log($scope.branchdetails);
						} else {
							console.log('Error Occoured During Branches Viewing Process...!');
								}
						}, function(errResponse) {
								console.error('Error Occoured During Branches Viewing Process...!');
});	

	
$scope.insertBranch = function(Data) {
	if(Data==undefined || Data.branchcode==null ||  Data.branchcode=='')
		{
		swal({
			  title: "OOPS!",
			  text: "Details Entered are in Invalid Format :(",
			  icon: "error",
			}).then(() => {
				Nav.showAddBranchPage();
			});
		}
	else{
    	console.log(Data);
	$http.post('/Student_Portal/register/insertBranch', Data).then(
			function(response) {
				
				$scope.data = response.data;
				
				console.log( Data );
				if ($scope.data.successful) {
					swal({
						  title: "SUCCESS!",
						  text: "Branch Details Inserted Successfully :)",
						  icon: "success",
						}).then(() => {
							Nav.showAddBranchPage();
							});
					
				} else {
					swal({
						  title: "OOPS!",
						  text: "Branch Details Insertion Failed :(",
						  icon: "error",
						}).then(() => {
							Nav.showAddBranchPage();
						});
				}
			}, function(errResponse) {
				swal({
					  title: "Warning!",
					  text: "Duplicate Data Not Allowed :(",
					  icon: "warning",
					}).then(() => {
						Nav.showAddBranchPage();
					});
				console.error('Error Occoured During Branch Insertion Process...!');
			}
			
	
	);}
};



$scope.updateBranch = function(Data) {
	if(Data==undefined || Data.branchcode==null || Data.branchcode=='' )
	{
	swal({
		  title: "OOPS!",
		  text: "Details Entered are in Invalid Format :(",
		  icon: "error",
		}).then(() => {
			Nav.showAddBranchPage();
		});
	}
else{
	console.log(Data.oldbranchcode);
$http.post('/Student_Portal/register/updateBranch', Data).then(
		function(response) {
			
			$scope.data = response.data;
			
			console.log( Data );
			if ($scope.data.successful) {
				swal({
					  title: "SUCCESS!",
					  text: "Branch Details Updated Successfully :)",
					  icon: "success",
					}).then(() => {
						Nav.showAddBranchPage();
						});
				
			} else {
				swal({
					  title: "OOPS!",
					  text: "Branch Details Updation Failed :(",
					  icon: "error",
					}).then(() => {
						Nav.showAddBranchPage();
					});
			}
		}, function(errResponse) {
			swal({
				  title: "Warning!",
				  text: "Duplicate Data Not Allowed :(",
				  icon: "warning",
				}).then(() => {
					Nav.showAddBranchPage();
				});
			console.error('Error Occoured During Branch Updation Process...!');
		}
		

);}
};



$scope.removeBranch = function(Data) {
	console.log(Data);
$http.post('/Student_Portal/register/removeBranch', Data).then(
		function(response) {
			
			$scope.data = response.data;
			
			console.log( Data );
			if ($scope.data.successful) {
				swal({
					  title: "SUCCESS!",
					  text: "Branch Details Deleted Successfully :)",
					  icon: "success",
					}).then(() => {
						Nav.showAddBranchPage();
						});
				
			} else {
				swal({
					  title: "OOPS!",
					  text: "Branch Details Deletion Failed :(",
					  icon: "error",
					}).then(() => {
						Nav.showAddBranchPage();
					});
			}
		}, function(errResponse) {
			swal({
				  title: "Warning!",
				  text: "Server Error During Deletion Process :(",
				  icon: "warning",
				}).then(() => {
					Nav.showAddBranchPage();
				});
			console.error('Error Occoured During Branch Deletion Process...!');
		}
		

);
};




/*--------------------------------------------------------------------Qualification OPERATIONS------------------------------------------------------------------------------------*/



$http.post('/Student_Portal/register/viewQualifications').then(
			function(response) {
						$scope.qualdata = response.data;
						console.log($scope.qualdata);
						if ($scope.qualdata.successful) {
						$scope.qualificationdetails=$scope.qualdata.responseObject;
						console.log($scope.qualificationdetails);
						} else {
							console.log('Error Occoured During Qualifications Viewing Process...!');
								}
						}, function(errResponse) {
								console.error('Error Occoured During Qualifications Viewing Process...!');
});	

	
$scope.insertQualification = function(Data) {
	if(Data==undefined || Data.qname==null ||  Data.qname=='')
		{
		swal({
			  title: "OOPS!",
			  text: "Details Entered are in Invalid Format :(",
			  icon: "error",
			}).then(() => {
				Nav.showAddQualificationPage();
			});
		}
	else{
    	console.log(Data);
	$http.post('/Student_Portal/register/insertQualification', Data).then(
			function(response) {
				
				$scope.data = response.data;
				
				console.log( Data );
				if ($scope.data.successful) {
					swal({
						  title: "SUCCESS!",
						  text: "Qualification Details Inserted Successfully :)",
						  icon: "success",
						}).then(() => {
							Nav.showAddQualificationPage();
							});
					
				} else {
					swal({
						  title: "OOPS!",
						  text: "Qualification Details Insertion Failed :(",
						  icon: "error",
						}).then(() => {
							Nav.showAddQualificationPage();
						});
				}
			}, function(errResponse) {
				swal({
					  title: "Warning!",
					  text: "Duplicate Data Not Allowed :(",
					  icon: "warning",
					}).then(() => {
						Nav.showAddQualificationPage();
					});
				console.error('Error Occoured During Qualification Insertion Process...!');
			}
			
	
	);}
};



$scope.updateQualification = function(Data) {
	if(Data==undefined || Data.qname==null || Data.qname=='' )
	{
	swal({
		  title: "OOPS!",
		  text: "Details Entered are in Invalid Format :(",
		  icon: "error",
		}).then(() => {
			Nav.showAddQualificationPage();
		});
	}
else{
	console.log(Data);
$http.post('/Student_Portal/register/updateQualification', Data).then(
		function(response) {
			
			$scope.data = response.data;
			
			console.log( Data );
			if ($scope.data.successful) {
				swal({
					  title: "SUCCESS!",
					  text: "Qualification Details Updated Successfully :)",
					  icon: "success",
					}).then(() => {
						Nav.showAddQualificationPage();
						});
				
			} else {
				swal({
					  title: "OOPS!",
					  text: "Qualification Details Updation Failed :(",
					  icon: "error",
					}).then(() => {
						Nav.showAddQualificationPage();
					});
			}
		}, function(errResponse) {
			swal({
				  title: "Warning!",
				  text: "Duplicate Data Not Allowed :(",
				  icon: "warning",
				}).then(() => {
					Nav.showAddQualificationPage();
				});
			console.error('Error Occoured During Qualification Updation Process...!');
		}
		

);}
};



$scope.removeQualification = function(Data) {
	console.log(Data);
$http.post('/Student_Portal/register/removeQualification', Data).then(
		function(response) {
			
			$scope.data = response.data;
			
			console.log( Data );
			if ($scope.data.successful) {
				swal({
					  title: "SUCCESS!",
					  text: "Qualification Details Deleted Successfully :)",
					  icon: "success",
					}).then(() => {
						Nav.showAddQualificationPage();
						});
				
			} else {
				swal({
					  title: "OOPS!",
					  text: "Qualification Details Deletion Failed :(",
					  icon: "error",
					}).then(() => {
						Nav.showAddQualificationPage();
					});
			}
		}, function(errResponse) {
			swal({
				  title: "Warning!",
				  text: "Server Error During Deletion Process :(",
				  icon: "warning",
				}).then(() => {
					Nav.showAddQualificationPage();
				});
			console.error('Error Occoured During Qualification Deletion Process...!');
		}
		

);
};




/*--------------------------------------------------------------------Holiday OPERATIONS------------------------------------------------------------------------------------*/



$http.post('/Student_Portal/register/viewHolidays').then(
			function(response) {
						$scope.holidaydata = response.data;
						console.log($scope.holidaydata);
						if ($scope.holidaydata.successful) {
						$scope.holidaydetails=$scope.holidaydata.responseObject;
						for(var i=0; i < $scope.holidaydetails.length; i++ ){     $scope.holidaydetails[i].date=new Date($scope.holidaydetails[i].date);    }
						console.log($scope.holidaydetails);
						} else {
							console.log('Error Occoured During Holidays Viewing Process...!');
								}
						}, function(errResponse) {
								console.error('Error Occoured During Holidays Viewing Process...!');
});	

	
$scope.insertHoliday = function(Data) {
	if(Data==undefined || Data.date==null ||  Data.date==''|| Data.reason==null ||  Data.reason=='')
		{
		swal({
			  title: "OOPS!",
			  text: "Details Entered are in Invalid Format :(",
			  icon: "error",
			}).then(() => {
				Nav.showAddHolidayPage();
			});
		}
	else{
    	console.log(Data);
	$http.post('/Student_Portal/register/insertHoliday', Data).then(
			function(response) {
				
				$scope.data = response.data;
				
				console.log( Data );
				if ($scope.data.successful) {
					swal({
						  title: "SUCCESS!",
						  text: "Holiday Details Inserted Successfully :)",
						  icon: "success",
						}).then(() => {
							Nav.showAddHolidayPage();
							});
					
				} else {
					swal({
						  title: "OOPS!",
						  text: "Holiday Details Insertion Failed :(",
						  icon: "error",
						}).then(() => {
							Nav.showAddHolidayPage();
						});
				}
			}, function(errResponse) {
				swal({
					  title: "Warning!",
					  text: "Duplicate Data Not Allowed :(",
					  icon: "warning",
					}).then(() => {
						Nav.showAddHolidayPage();
					});
				console.error('Error Occoured During Holiday Insertion Process...!');
			}
			
	
	);}
};



$scope.updateHoliday = function(Data) {
	if(Data==undefined || Data.date==null ||  Data.date==''|| Data.reason==null ||  Data.reason=='')
	{
	swal({
		  title: "OOPS!",
		  text: "Details Entered are in Invalid Format :(",
		  icon: "error",
		}).then(() => {
			Nav.showAddHolidayPage();
		});
	}
else{
	console.log(Data);
$http.post('/Student_Portal/register/updateHoliday', Data).then(
		function(response) {
			
			$scope.data = response.data;
			
			console.log( Data );
			if ($scope.data.successful) {
				swal({
					  title: "SUCCESS!",
					  text: "Holiday Details Updated Successfully :)",
					  icon: "success",
					}).then(() => {
						Nav.showAddHolidayPage();
						});
				
			} else {
				swal({
					  title: "OOPS!",
					  text: "Holiday Details Updation Failed :(",
					  icon: "error",
					}).then(() => {
						Nav.showAddHolidayPage();
					});
			}
		}, function(errResponse) {
			swal({
				  title: "Warning!",
				  text: "Duplicate Data Not Allowed :(",
				  icon: "warning",
				}).then(() => {
					Nav.showAddHolidayPage();
				});
			console.error('Error Occoured During Holiday Updation Process...!');
		}
		

);}
};



$scope.removeHoliday = function(Data) {
	console.log(Data);
$http.post('/Student_Portal/register/removeHoliday', Data).then(
		function(response) {
			
			$scope.data = response.data;
			
			console.log( Data );
			if ($scope.data.successful) {
				swal({
					  title: "SUCCESS!",
					  text: "Holiday Details Deleted Successfully :)",
					  icon: "success",
					}).then(() => {
						Nav.showAddHolidayPage();
						});
				
			} else {
				swal({
					  title: "OOPS!",
					  text: "Holiday Details Deletion Failed :(",
					  icon: "error",
					}).then(() => {
						Nav.showAddHolidayPage();
					});
			}
		}, function(errResponse) {
			swal({
				  title: "Warning!",
				  text: "Server Error During Deletion Process :(",
				  icon: "warning",
				}).then(() => {
					Nav.showAddHolidayPage();
				});
			console.error('Error Occoured During Holiday Deletion Process...!');
		}
		

);
};






/*--------------------------------------------------------------------FAQ OPERATIONS------------------------------------------------------------------------------------*/



$http.post('/Student_Portal/register/viewFaqs').then(
			function(response) {
						$scope.faqdata = response.data;
						console.log($scope.faqdata);
						if ($scope.faqdata.successful) {
						$scope.faqdetails=$scope.faqdata.responseObject;
						console.log($scope.faqdetails);
						} else {
							console.log('Error Occoured During Faq Viewing Process...!');
								}
						}, function(errResponse) {
								console.error('Error Occoured During Faq Viewing Process...!');
});	

	
$scope.insertFaq = function(Data) {
	if(Data==undefined || Data.question==null ||  Data.question=='' || Data.answer==null ||  Data.answer=='')
		{
		swal({
			  title: "OOPS!",
			  text: "Details Entered are in Invalid Format :(",
			  icon: "error",
			}).then(() => {
				Nav.showAddFaqPage();
			});
		}
	else{
		Data.status="Active";
    	console.log(Data);
	$http.post('/Student_Portal/register/insertFaq', Data).then(
			function(response) {
				
				$scope.data = response.data;
				
				console.log( Data );
				if ($scope.data.successful) {
					swal({
						  title: "SUCCESS!",
						  text: "Faq Details Inserted Successfully :)",
						  icon: "success",
						}).then(() => {
							Nav.showAddFaqPage();
							});
					
				} else {
					swal({
						  title: "OOPS!",
						  text: "Faq Details Insertion Failed :(",
						  icon: "error",
						}).then(() => {
							Nav.showAddFaqPage();
						});
				}
			}, function(errResponse) {
				swal({
					  title: "Warning!",
					  text: "Duplicate Data Not Allowed :(",
					  icon: "warning",
					}).then(() => {
						Nav.showAddFaqPage();
					});
				console.error('Error Occoured During Faq Insertion Process...!');
			}
			
	
	);}
};



$scope.updateFaq = function(Data) {
	if(Data==undefined || Data.question==null ||  Data.question=='' || Data.answer==null ||  Data.answer=='')
	{
	swal({
		  title: "OOPS!",
		  text: "Details Entered are in Invalid Format :(",
		  icon: "error",
		}).then(() => {
			Nav.showAddFaqPage();
		});
	}
else{
	console.log(Data);
$http.post('/Student_Portal/register/updateFaq', Data).then(
		function(response) {
			
			$scope.data = response.data;
			
			console.log( Data );
			if ($scope.data.successful) {
				swal({
					  title: "SUCCESS!",
					  text: "Faq Details Updated Successfully :)",
					  icon: "success",
					}).then(() => {
						Nav.showAddFaqPage();
						});
				
			} else {
				swal({
					  title: "OOPS!",
					  text: "Faq Details Updation Failed :(",
					  icon: "error",
					}).then(() => {
						Nav.showAddFaqPage();
					});
			}
		}, function(errResponse) {
			swal({
				  title: "Warning!",
				  text: "Duplicate Data Not Allowed :(",
				  icon: "warning",
				}).then(() => {
					Nav.showAddFaqPage();
				});
			console.error('Error Occoured During Faq Updation Process...!');
		}
		

);}
};



$scope.removeFaq = function(Data) {
	console.log(Data);
$http.post('/Student_Portal/register/removeFaq', Data).then(
		function(response) {
			
			$scope.data = response.data;
			
			console.log( Data );
			if ($scope.data.successful) {
				swal({
					  title: "SUCCESS!",
					  text: "Faq Details Deleted Successfully :)",
					  icon: "success",
					}).then(() => {
						Nav.showAddFaqPage();
						});
				
			} else {
				swal({
					  title: "OOPS!",
					  text: "Faq Details Deletion Failed :(",
					  icon: "error",
					}).then(() => {
						Nav.showAddFaqPage();
					});
			}
		}, function(errResponse) {
			swal({
				  title: "Warning!",
				  text: "Server Error During Deletion Process :(",
				  icon: "warning",
				}).then(() => {
					Nav.showAddFaqPage();
				});
			console.error('Error Occoured During Faq Deletion Process...!');
		}
		

);
};





/*--------------------------------------------------------------------Contact details OPERATIONS------------------------------------------------------------------------------------*/



$http.post('/Student_Portal/register/viewContacts').then(
			function(response) {
						$scope.contactdata = response.data;
						console.log($scope.contactdata);
						if ($scope.contactdata.successful) {
						$scope.contactdetails=$scope.contactdata.responseObject;
						console.log($scope.contactdetails);
						} else {
							console.log('Error Occoured During Contact Details Viewing Process...!');
								}
						}, function(errResponse) {
								console.error('Error Occoured During Contact Details Viewing Process...!');
});	

	
$scope.insertContact = function(Data) {
	if(Data==undefined || Data.detailname==null ||  Data.detailname=='' || Data.detailvalue==null ||  Data.detailvalue=='' || (Data.detailvalue).length<3 || (Data.detailname).length<3)
		{
		swal({
			  title: "OOPS!",
			  text: "Details Entered are in Invalid Format :(",
			  icon: "error",
			}).then(() => {
				Nav.showAddContactPage();
			});
		}
	else{
    	console.log(Data);
	$http.post('/Student_Portal/register/insertContact', Data).then(
			function(response) {
				
				$scope.data = response.data;
				
				console.log( Data );
				if ($scope.data.successful) {
					swal({
						  title: "SUCCESS!",
						  text: "Contact Details Inserted Successfully :)",
						  icon: "success",
						}).then(() => {
							Nav.showAddContactPage();
							});
					
				} else {
					swal({
						  title: "OOPS!",
						  text: " Contact Details Insertion Failed :(",
						  icon: "error",
						}).then(() => {
							Nav.showAddContactPage();
						});
				}
			}, function(errResponse) {
				swal({
					  title: "Warning!",
					  text: "Duplicate Data Not Allowed :(",
					  icon: "warning",
					}).then(() => {
						Nav.showAddContactPage();
					});
				console.error('Error Occoured During  Contact Details Insertion Process...!');
			}
			
	
	);}
};



$scope.updateContact = function(Data) {
	if(Data==undefined || Data.detailname==null ||  Data.detailname=='' || Data.detailvalue==null ||  Data.detailvalue=='' || (Data.detailvalue).length<3 || (Data.detailname).length<3)
	{
	swal({
		  title: "OOPS!",
		  text: "Details Entered are in Invalid Format :(",
		  icon: "error",
		}).then(() => {
			Nav.showAddContactPage();
		});
	}
else{
	console.log(Data);
$http.post('/Student_Portal/register/updateContact', Data).then(
		function(response) {
			
			$scope.data = response.data;
			
			console.log( Data );
			if ($scope.data.successful) {
				swal({
					  title: "SUCCESS!",
					  text: "Contact Details Updated Successfully :)",
					  icon: "success",
					}).then(() => {
						Nav.showAddContactPage();
						});
				
			} else {
				swal({
					  title: "OOPS!",
					  text: "Contact Details Updation Failed :(",
					  icon: "error",
					}).then(() => {
						Nav.showAddContactPage();
					});
			}
		}, function(errResponse) {
			swal({
				  title: "Warning!",
				  text: "Duplicate Data Not Allowed :(",
				  icon: "warning",
				}).then(() => {
					Nav.showAddContactPage();
				});
			console.error('Error Occoured During Contact Updation Process...!');
		}
		

);}
};



$scope.removeContact = function(Data) {
	console.log(Data);
$http.post('/Student_Portal/register/removeContact', Data).then(
		function(response) {
			
			$scope.data = response.data;
			
			console.log( Data );
			if ($scope.data.successful) {
				swal({
					  title: "SUCCESS!",
					  text: "Contact Details Deleted Successfully :)",
					  icon: "success",
					}).then(() => {
						Nav.showAddContactPage();
						});
				
			} else {
				swal({
					  title: "OOPS!",
					  text: "Contact Details Deletion Failed :(",
					  icon: "error",
					}).then(() => {
						Nav.showAddContactPage();
					});
			}
		}, function(errResponse) {
			swal({
				  title: "Warning!",
				  text: "Server Error During Deletion Process :(",
				  icon: "warning",
				}).then(() => {
					Nav.showAddContactPage();
				});
			console.error('Error Occoured During Contact Deletion Process...!');
		}
		

);
};



/*--------------------------------------------------------------------Map OPERATIONS------------------------------------------------------------------------------------*/



$http.post('/Student_Portal/register/viewMap').then(
			function(response) {
						$scope.mapdata = response.data;
						console.log($scope.mapdata);
						if ($scope.mapdata.successful) {
						$scope.mapdetails=$scope.mapdata.responseObject;
						console.log($scope.mapdetails);
						} else {
							console.log('Error Occoured During Map Viewing Process...!');
								}
						}, function(errResponse) {
								console.error('Error Occoured During Map Viewing Process...!');
});	




$scope.updateMap = function(Data) {
	if(Data==undefined || Data==null ||  Data=='')
	{
	swal({
		  title: "OOPS!",
		  text: "Details Entered are in Invalid Format :(",
		  icon: "error",
		}).then(() => {
			Nav.showAddContactPage();
		});
	}
else{
	console.log(Data);
$http.post('/Student_Portal/register/updateMap', Data).then(
		function(response) {
			
			$scope.data = response.data;
			
			console.log( Data );
			if ($scope.data.successful) {
				swal({
					  title: "SUCCESS!",
					  text: "Map Updated Successfully :)",
					  icon: "success",
					}).then(() => {
						Nav.showAddContactPage();
						});
				
			} else {
				swal({
					  title: "OOPS!",
					  text: "Map Updation Failed :(",
					  icon: "error",
					}).then(() => {
						Nav.showAddContactPage();
					});
			}
		}, function(errResponse) {
			console.error('Error Occoured During Map Updation Process...!');
		}
		

);}
};

	



}]);