package com.spring.Controller;


import java.sql.Date;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.andromeda.commons.model.Response;

import com.spring.Model.Register;
import com.spring.Service.RegisterService;


@RestController
@RequestMapping("/register")
public class Registration {
	
	Response response = new Response();

	@Autowired
	private RegisterService registerService;
	
/*---------------------------------------------------------------LOGIN OPERATIONS--------------------------------------------------------------------------------------*/	
	
	@ResponseBody
	@RequestMapping(value = "login", method = { RequestMethod.POST })
	public Response login(@RequestBody Register register)
	{
		return registerService.login(register);
	}
	

	@ResponseBody
	@RequestMapping(value = "verifyEmail", method = { RequestMethod.POST })
	public Response verifyEmail(@RequestBody String email)
	{
		return registerService.verifyEmail(email);
	}

	@ResponseBody
	@RequestMapping(value = "forgotpassword", method = {org.springframework.web.bind.annotation.RequestMethod.POST })
	public Response forgotpassword(@RequestBody Register register,HttpServletRequest httpServletRequest) throws JSONException
	{
		return this.registerService.forgotpassword(register);
	}

/*------------------------------------------------------------------PROFILE OPERATIONS--------------------------------------------------------------------------------*/			
	
	@ResponseBody
	@RequestMapping(value = "getProfile", method = { RequestMethod.POST })
	public Response getProfile(@RequestBody Integer id)
	{
		return registerService.getProfile(id);
	}

	@ResponseBody
	@RequestMapping(value = "updateProfileDetails", method = { RequestMethod.POST })
	public Response updateProfileDetails(@RequestBody Register register)
	{
		return registerService.updateProfileDetails(register);
	}

	@ResponseBody
	@RequestMapping(value = "changePassword", method = {org.springframework.web.bind.annotation.RequestMethod.POST })
	public Response changePassword(@RequestBody Register register,HttpServletRequest httpServletRequest) throws JSONException
	{
		return this.registerService.changePassword(register);
	}

/*------------------------------------------------------------------REGESTERED MEMBERS OPERATIONS (BY ADMIN)--------------------------------------------------------------------------------*/				

	@ResponseBody
	@RequestMapping(value = "insertDetails", method = {org.springframework.web.bind.annotation.RequestMethod.POST })
	public Response insertDetails(@RequestBody Register register,HttpServletRequest httpServletRequest) throws JSONException
	{
		return this.registerService.insertDetails(register);
	}

	@ResponseBody
	@RequestMapping(value = "updateDetails", method = {org.springframework.web.bind.annotation.RequestMethod.POST })
	public Response updateDetails(@RequestBody Register register,HttpServletRequest httpServletRequest) throws JSONException
	{
		return registerService.updateDetails(register);
	}

	@ResponseBody
	@RequestMapping(value = "removeDetails", method = { RequestMethod.POST })
	public Response removeDetails(@RequestBody String username)
	{
		return registerService.removeDetails(username);
	}

	@ResponseBody
	@RequestMapping(value = "viewaccounts", method = { RequestMethod.POST })
	public Response viewaccounts()
	{
		return registerService.viewaccounts();
	}

/*------------------------------------------------------------------Student Registration Operations--------------------------------------------------------------------------------*/				

	@ResponseBody
	@RequestMapping(value = "insertStudentDetails", method = {org.springframework.web.bind.annotation.RequestMethod.POST })
	public Response insertStudentDetails(@RequestBody Register register,HttpServletRequest httpServletRequest) throws JSONException
	{
		return this.registerService.insertStudentDetails(register);
	}

	@ResponseBody
	@RequestMapping(value = "viewaccountsforfaculty", method = { RequestMethod.POST })
	public Response viewaccountsforfaculty(@RequestBody String branchcode)
	{
		return registerService.viewaccountsforfaculty(branchcode);
	}

	@ResponseBody
	@RequestMapping(value = "viewaccountsforfaculty1", method = { RequestMethod.POST })
	public Response viewaccountsforfaculty1(@RequestBody String branchcode)
	{
		return registerService.viewaccountsforfaculty1(branchcode);
	}

	@ResponseBody
	@RequestMapping(value = "viewaccountsforfaculty2", method = { RequestMethod.POST })
	public Response viewaccountsforfaculty2(@RequestBody String branchcode)
	{
		return registerService.viewaccountsforfaculty2(branchcode);
	}
	
	@ResponseBody
	@RequestMapping(value = "updateStudentDetails", method = {org.springframework.web.bind.annotation.RequestMethod.POST })
	public Response updateStudentDetails(@RequestBody Register register,HttpServletRequest httpServletRequest) throws JSONException
	{
		return registerService.updateStudentDetails(register);
	}


	@ResponseBody
	@RequestMapping(value = "removeStudentDetails", method = { RequestMethod.POST })
	public Response removeStudentDetails(@RequestBody Register register)
	{
		return registerService.removeStudentDetails(register);
	}



/*---------------------------------------------------------------PRINCIPAL OPERATIONS------------------------------------------------------------------------------------*/

	@ResponseBody
	@RequestMapping(value = "viewaccountsforprincipal", method = { RequestMethod.POST })
	public Response viewaccountsforprincipal()
	{
		return registerService.viewaccountsforprincipal();
	}

	@ResponseBody
	@RequestMapping(value = "viewaccountsforprincipal1", method = { RequestMethod.POST })
	public Response viewaccountsforprincipal1()
	{
		return registerService.viewaccountsforprincipal1();
	}
	
	@ResponseBody
	@RequestMapping(value = "viewaccountsforprincipal2", method = { RequestMethod.POST })
	public Response viewaccountsforprincipal2()
	{
		return registerService.viewaccountsforprincipal2();
	}
	
	@ResponseBody
	@RequestMapping(value = "promote", method = { RequestMethod.POST })
	public Response promote()
	{
		return registerService.promote();
	}

	@ResponseBody
	@RequestMapping(value = "getPromotionDate", method = { RequestMethod.POST })
	public Response getPromotionDate()
	{
		return registerService.getPromotionDate();
	}
	
	@ResponseBody
	@RequestMapping(value = "setPromotionDate", method = { RequestMethod.POST })
	public Response setPromotionDate(@RequestBody Date edate)
	{
		return registerService.setPromotionDate(edate);
	}

	@ResponseBody
	@RequestMapping(value = "removeCompleted", method = { RequestMethod.POST })
	public Response removeCompleted(@RequestBody Register register)
	{
		return registerService.removeCompleted(register);
	}


/*---------------------------------------------------------------HOD OPERATIONS------------------------------------------------------------------------------------*/

	@ResponseBody
	@RequestMapping(value = "viewaccountsforhod", method = { RequestMethod.POST })
	public Response viewaccountsforhod(@RequestBody String branchcode)
	{
		return registerService.viewaccountsforhod(branchcode);
	}

	@ResponseBody
	@RequestMapping(value = "viewaccountsforhod1", method = { RequestMethod.POST })
	public Response viewaccountsforhod1(@RequestBody String branchcode)
	{
		return registerService.viewaccountsforhod1(branchcode);
	}

	
/*--------------------------------------------------------------Faculty Attendance OPERATIONS-----------------------------------------------------------------------------------*/

	@ResponseBody
	@RequestMapping(value = "viewFacultyAttendance", method = { RequestMethod.POST })
	public Response viewFacultyAttendance(@RequestBody Register register)
	{
		return registerService.viewFacultyAttendance(register);
	}

	@ResponseBody
	@RequestMapping(value = "insertFacultyAttendance", method = { RequestMethod.POST })
	public Response insertFacultyAttendance(@RequestBody Register register)
	{
		return registerService.insertFacultyAttendance(register);
	}

	@ResponseBody
	@RequestMapping(value = "updateFacultyAttendance", method = { RequestMethod.POST })
	public Response updateFacultyAttendance(@RequestBody Register register)
	{
		return registerService.updateFacultyAttendance(register);
	}

	@ResponseBody
	@RequestMapping(value = "removeFacultyAttendance", method = { RequestMethod.POST })
	public Response removeFacultyAttendance(@RequestBody Integer facultyattendanceid)
	{
		return registerService.removeFacultyAttendance(facultyattendanceid);
	}

	@ResponseBody
	@RequestMapping(value = "getDates1", method = { RequestMethod.POST })
	public Response getDates1(@RequestBody Register register)
	{
		return registerService.getDates1(register);
	}

	@ResponseBody
	@RequestMapping(value = "getAttendance1", method = { RequestMethod.POST })
	public Response getAttendance1(@RequestBody Register register)
	{
		return registerService.getAttendance1(register);
	}

/*--------------------------------------------------------------Student Attendance OPERATIONS------------------------------------------------------------------------------------*/

	@ResponseBody
	@RequestMapping(value = "viewStudentAttendance", method = { RequestMethod.POST })
	public Response viewStudentAttendance(@RequestBody Register register)
	{
		return registerService.viewStudentAttendance(register);
	}

	@ResponseBody
	@RequestMapping(value = "insertStudentAttendance", method = { RequestMethod.POST })
	public Response insertStudentAttendance(@RequestBody Register register)
	{
		return registerService.insertStudentAttendance(register);
	}

	@ResponseBody
	@RequestMapping(value = "updateStudentAttendance", method = { RequestMethod.POST })
	public Response updateStudentAttendance(@RequestBody Register register)
	{
		return registerService.updateStudentAttendance(register);
	}

	@ResponseBody
	@RequestMapping(value = "removeStudentAttendance", method = { RequestMethod.POST })
	public Response removeStudentAttendance(@RequestBody Integer studentattendanceid)
	{
		return registerService.removeStudentAttendance(studentattendanceid);
	}

	@ResponseBody
	@RequestMapping(value = "getDates", method = { RequestMethod.POST })
	public Response getDates(@RequestBody Register register)
	{
		return registerService.getDates(register);
	}

	@ResponseBody
	@RequestMapping(value = "getAttendance", method = { RequestMethod.POST })
	public Response getAttendance(@RequestBody Register register)
	{
		return registerService.getAttendance(register);
	}

	@ResponseBody
	@RequestMapping(value = "getHolidayReason", method = { RequestMethod.POST })
	public Response getHolidayReason(@RequestBody Register register)
	{
		return registerService.getHolidayReason(register);
	}

/*--------------------------------------------------------------Getting Sem and Subject------------------------------------------------------------------------------------*/

	@ResponseBody
	@RequestMapping(value = "getSemisters", method = { RequestMethod.POST, RequestMethod.GET })
	public Response getSemisters()
	{
		return registerService.getSemisters();
	}
	
	
	@ResponseBody
	@RequestMapping(value = { "/getSubjects" }, method = { RequestMethod.POST })
	public Response getSubjects(@RequestBody String sem)
	{
		return registerService.getSubjects(sem);
	}

	
	@ResponseBody
	@RequestMapping(value = { "/getStu_Pin3" }, method = { RequestMethod.POST })
	public Response getStu_Pin3(@RequestBody Register register)
	{
		return registerService.getStu_Pin3(register);
	}
	
	
/*--------------------------------------------------------------Student Marks OPERATIONS------------------------------------------------------------------------------------*/

	@ResponseBody
	@RequestMapping(value = "viewStudentMarks", method = { RequestMethod.POST })
	public Response viewStudentMarks(@RequestBody String facultyid)
	{
		return registerService.viewStudentMarks(facultyid);
	}

	@ResponseBody
	@RequestMapping(value = "insertstudentMarks", method = { RequestMethod.POST })
	public Response insertstudentMarks(@RequestBody Register register)
	{
		return registerService.insertstudentMarks(register);
	}

	@ResponseBody
	@RequestMapping(value = "updatestudentMarks", method = { RequestMethod.POST })
	public Response updatestudentMarks(@RequestBody Register register)
	{
		return registerService.updatestudentMarks(register);
	}

	@ResponseBody
	@RequestMapping(value = "removestudentMarks", method = { RequestMethod.POST })
	public Response removestudentMarks(@RequestBody Integer studentmarksid)
	{
		return registerService.removestudentMarks(studentmarksid);
	}

	@ResponseBody
	@RequestMapping(value = "viewIndividualStudentMarks", method = { RequestMethod.POST })
	public Response viewIndividualStudentMarks(@RequestBody Register register)
	{
		return registerService.viewIndividualStudentMarks(register);
	}

/*--------------------------------------------------------------Viewing Student Details to principal or hod-----------------------------------------------------------------------------------*/

	@ResponseBody
	@RequestMapping(value = "viewIndividualStudentMarks1", method = { RequestMethod.POST })
	public Response viewIndividualStudentMarks1(@RequestBody Register register)
	{
		return registerService.viewIndividualStudentMarks1(register);
	}

	@ResponseBody
	@RequestMapping(value = "viewIndividualStudentAttendance1", method = { RequestMethod.POST })
	public Response viewIndividualStudentAttendance1(@RequestBody Register register)
	{
		return registerService.viewIndividualStudentAttendance1(register);
	}

	@ResponseBody
	@RequestMapping(value = "viewIndividualStudentAttendance2", method = { RequestMethod.POST })
	public Response viewIndividualStudentAttendance2(@RequestBody Register register)
	{
		return registerService.viewIndividualStudentAttendance2(register);
	}

/*--------------------------------------------------------------Feedback Operations-----------------------------------------------------------------------------------*/

	@ResponseBody
	@RequestMapping(value = "insertFeedback", method = { RequestMethod.POST })
	public Response insertFeedback(@RequestBody Register register)
	{
		return registerService.insertFeedback(register);
	}

	@ResponseBody
	@RequestMapping(value = "viewFeedbacks", method = { RequestMethod.POST, RequestMethod.GET })
	public Response viewFeedbacks()
	{
		return registerService.viewFeedbacks();
	}
	
	@ResponseBody
	@RequestMapping(value = "deleteFeedback", method = { RequestMethod.POST })
	public Response deleteFeedback(@RequestBody Register register)
	{
		return registerService.deleteFeedback(register);
	}

	@ResponseBody
	@RequestMapping(value = "sendReply", method = {org.springframework.web.bind.annotation.RequestMethod.POST })
	public Response sendReply(@RequestBody Register register,HttpServletRequest httpServletRequest) throws JSONException
	{
		return this.registerService.sendReply(register);
	}
	
	
/*--------------------------------------------------------------Subject OPERATIONS------------------------------------------------------------------------------------*/


	@ResponseBody
	@RequestMapping(value = "viewSubjects", method = { RequestMethod.POST, RequestMethod.GET })
	public Response viewSubjects()
	{
		return registerService.viewSubjects();
	}
	
	@ResponseBody
	@RequestMapping(value = "insertSubject", method = { RequestMethod.POST })
	public Response insertSubject(@RequestBody Register register)
	{
		return registerService.insertSubject(register);
	}

	@ResponseBody
	@RequestMapping(value = "updateSubject", method = { RequestMethod.POST })
	public Response updateSubject(@RequestBody Register register)
	{
		return registerService.updateSubject(register);
	}

	@ResponseBody
	@RequestMapping(value = "removeSubject", method = { RequestMethod.POST })
	public Response removeSubject(@RequestBody Register register)
	{
		return registerService.removeSubject(register);
	}
	
	
	
/*--------------------------------------------------------------Semester OPERATIONS------------------------------------------------------------------------------------*/


	@ResponseBody
	@RequestMapping(value = "viewSemesters", method = { RequestMethod.POST, RequestMethod.GET })
	public Response viewSemesters()
	{
		return registerService.viewSemesters();
	}
	
	@ResponseBody
	@RequestMapping(value = "insertSem", method = { RequestMethod.POST })
	public Response insertSem(@RequestBody Register register)
	{
		return registerService.insertSem(register);
	}

	@ResponseBody
	@RequestMapping(value = "updateSem", method = { RequestMethod.POST })
	public Response updateSem(@RequestBody Register register)
	{
		return registerService.updateSem(register);
	}

	@ResponseBody
	@RequestMapping(value = "removeSem", method = { RequestMethod.POST })
	public Response removeSem(@RequestBody Register register)
	{
		return registerService.removeSem(register);
	}
	
	
	
	
/*--------------------------------------------------------------Branch OPERATIONS------------------------------------------------------------------------------------*/


	@ResponseBody
	@RequestMapping(value = "viewBranches", method = { RequestMethod.POST, RequestMethod.GET })
	public Response viewBranches()
	{
		return registerService.viewBranches();
	}
	
	@ResponseBody
	@RequestMapping(value = "insertBranch", method = { RequestMethod.POST })
	public Response insertBranch(@RequestBody Register register)
	{
		return registerService.insertBranch(register);
	}

	@ResponseBody
	@RequestMapping(value = "updateBranch", method = { RequestMethod.POST })
	public Response updateBranch(@RequestBody Register register)
	{
		return registerService.updateBranch(register);
	}

	@ResponseBody
	@RequestMapping(value = "removeBranch", method = { RequestMethod.POST })
	public Response removeBranch(@RequestBody Register register)
	{
		return registerService.removeBranch(register);
	}
	
	
	
	
	
/*--------------------------------------------------------------Qualification OPERATIONS------------------------------------------------------------------------------------*/


	@ResponseBody
	@RequestMapping(value = "viewQualifications", method = { RequestMethod.POST, RequestMethod.GET })
	public Response viewQualifications()
	{
		return registerService.viewQualifications();
	}
	
	@ResponseBody
	@RequestMapping(value = "insertQualification", method = { RequestMethod.POST })
	public Response insertQualification(@RequestBody Register register)
	{
		return registerService.insertQualification(register);
	}

	@ResponseBody
	@RequestMapping(value = "updateQualification", method = { RequestMethod.POST })
	public Response updateQualification(@RequestBody Register register)
	{
		return registerService.updateQualification(register);
	}

	@ResponseBody
	@RequestMapping(value = "removeQualification", method = { RequestMethod.POST })
	public Response removeQualification(@RequestBody Register register)
	{
		return registerService.removeQualification(register);
	}
	
	
	
	
	
/*--------------------------------------------------------------Holiday OPERATIONS------------------------------------------------------------------------------------*/


	@ResponseBody
	@RequestMapping(value = "viewHolidays", method = { RequestMethod.POST, RequestMethod.GET })
	public Response viewHolidays()
	{
		return registerService.viewHolidays();
	}
	
	@ResponseBody
	@RequestMapping(value = "insertHoliday", method = { RequestMethod.POST })
	public Response insertHoliday(@RequestBody Register register)
	{
		return registerService.insertHoliday(register);
	}

	@ResponseBody
	@RequestMapping(value = "updateHoliday", method = { RequestMethod.POST })
	public Response updateHoliday(@RequestBody Register register)
	{
		return registerService.updateHoliday(register);
	}

	@ResponseBody
	@RequestMapping(value = "removeHoliday", method = { RequestMethod.POST })
	public Response removeHoliday(@RequestBody Register register)
	{
		return registerService.removeHoliday(register);
	}
	

	
	
	
	
/*--------------------------------------------------------------Faq OPERATIONS------------------------------------------------------------------------------------*/


	@ResponseBody
	@RequestMapping(value = "viewFaqs", method = { RequestMethod.POST, RequestMethod.GET })
	public Response viewFaqs()
	{
		return registerService.viewFaqs();
	}
	
	@ResponseBody
	@RequestMapping(value = "insertFaq", method = { RequestMethod.POST })
	public Response insertFaq(@RequestBody Register register)
	{
		return registerService.insertFaq(register);
	}

	@ResponseBody
	@RequestMapping(value = "updateFaq", method = { RequestMethod.POST })
	public Response updateFaq(@RequestBody Register register)
	{
		return registerService.updateFaq(register);
	}

	@ResponseBody
	@RequestMapping(value = "removeFaq", method = { RequestMethod.POST })
	public Response removeFaq(@RequestBody Register register)
	{
		return registerService.removeFaq(register);
	}
	
	
	
	
	
	
/*--------------------------------------------------------------Contact details OPERATIONS------------------------------------------------------------------------------------*/


	@ResponseBody
	@RequestMapping(value = "viewContacts", method = { RequestMethod.POST, RequestMethod.GET })
	public Response viewContacts()
	{
		return registerService.viewContacts();
	}
	
	@ResponseBody
	@RequestMapping(value = "insertContact", method = { RequestMethod.POST })
	public Response insertContact(@RequestBody Register register)
	{
		return registerService.insertContact(register);
	}

	@ResponseBody
	@RequestMapping(value = "updateContact", method = { RequestMethod.POST })
	public Response updateContact(@RequestBody Register register)
	{
		return registerService.updateContact(register);
	}

	@ResponseBody
	@RequestMapping(value = "removeContact", method = { RequestMethod.POST })
	public Response removeContact(@RequestBody Register register)
	{
		return registerService.removeContact(register);
	}
	
	
	
/*--------------------------------------------------------------Map OPERATIONS------------------------------------------------------------------------------------*/


	@ResponseBody
	@RequestMapping(value = "viewMap", method = { RequestMethod.POST, RequestMethod.GET })
	public Response viewMap()
	{
		return registerService.viewMap();
	}
	
	@ResponseBody
	@RequestMapping(value = "updateMap", method = { RequestMethod.POST })
	public Response updateMap(@RequestBody String maplink)
	{
		return registerService.updateMap(maplink);
	}
	
	
	
	
}
