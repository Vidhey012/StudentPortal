package com.spring.Service;

import java.sql.Date;
import java.util.*;

import com.spring.Service.EmailService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.andromeda.commons.model.Response;
import com.spring.Dao.RegisterDao;
import com.spring.Model.Email;
import com.spring.Model.Register;

@Service
public class RegisterService {
	
	Response response = new Response();

	@Autowired
	private RegisterDao registerDAO;
	@Autowired
	EmailService emailService;
/*---------------------------------------------------------------LOGIN OPERATIONS--------------------------------------------------------------------------------------*/	
	
	public Response login(Register register)
	{
		response.setSuccessful(false);
		boolean status=registerDAO.login(register);
		if(status)
		{
			response.setSuccessful(true);
			Register data=registerDAO.getUserDetails(register);
			response.setResponseObject(data);
			response.setErrorMessage(null);
		}else {
			response.setErrorMessage("Invalid credentials...!");
		}
		return response;
	}


	public Response verifyEmail(String email)
	{
		response.setSuccessful(false);
		boolean status=registerDAO.verifyEmail(email);
		if(status)
		{
			response.setSuccessful(true);
			Register data=registerDAO.getPersonDetails(email);
			response.setResponseObject(data);
			response.setErrorMessage(null);
		}else {
			response.setSuccessful(false);
			response.setErrorMessage("Invalid credentials...!");
		}
		return response;
	}


	public Response forgotpassword(Register register) throws JSONException {
		response.setSuccessful(false);
		response.setSuccessful(true);
		response.setResponseObject(register);
		if(response.isSuccessful()) {
		Email email = new Email();
		email.setFrom("noreply .StudentPortal <noreply.studentportal@gmail.com>");
		email.setTo(register.getEmail().trim());
		email.setSubject("Student Portal Email Code Verification..!");
		String msg = "Dear Sir/Madam,<br><br>Your registration details are as follows...<br><br><b>Username : </b>"+ register.getUsername() + "<br><br><b>Password : </b>"+ register.getOldpassword(); 

		email.setText(msg);

		this.emailService.sendHtmlMsg(email);
		}
		return response;
	}

/*------------------------------------------------------------------PROFILE OPERATIONS--------------------------------------------------------------------------------*/			
	
	public Response getProfile(Integer id)
	{
		response.setSuccessful(false);
		Register singleuserdetails = registerDAO.getProfile(id);
		response.setSuccessful(true);
		response.setResponseObject(singleuserdetails);
		return response;
	}

	public Response updateProfileDetails(Register register)
	{
		response.setSuccessful(false);
		registerDAO.updateProfileDetails(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}


	public Response changePassword(Register register) throws JSONException {
		response.setSuccessful(false);
		registerDAO.changePassword(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		if(response.isSuccessful()) {
		Email email = new Email();
		email.setFrom("noreply .StudentPortal <noreply.studentportal@gmail.com>");
		email.setTo(register.getEmail().trim());
		email.setSubject("Student Portal Updated Password Details..!");
		String msg = "Dear Sir/Madam,<br><br>Your registration details are as follows...<br><br><b>Username : </b>"+ register.getUsername() + "<br><br><b>Password : </b>"+ register.getNewpassword(); 

		email.setText(msg);

		this.emailService.sendHtmlMsg(email);
		}
		return response;
	}

/*------------------------------------------------------------------REGESTERED MEMBERS OPERATIONS (BY ADMIN)--------------------------------------------------------------------------------*/				


	public Response insertDetails(Register register) throws JSONException {
		response.setSuccessful(false);
		registerDAO.insertDetails(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		if(response.isSuccessful()) {
		Email email = new Email();
		email.setFrom("noreply .StudentPortal <noreply.studentportal@gmail.com>");
		email.setTo(register.getEmail().trim());
		email.setSubject("You Are Successfully Registered In Student Portal Website..!");
		String msg = "Dear Sir/Madam,<br><br>You are Registered as "+register.getRole()+" in the \"Student Portal\" website."
				+ "<br>Contact your college\'s Technical Incharge for further Information.<br>Your registration details are as follows...<br><br><b>Username : </b>"+ register.getUsername() + "<br><br><b>Password : </b>"+ register.getOldpassword(); 

		email.setText(msg);

		this.emailService.sendHtmlMsg(email);
		}
		return response;
	}

	public Response updateDetails(Register register) throws JSONException {
		response.setSuccessful(false);
		registerDAO.updateDetails(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		if(response.isSuccessful()) {
		Email email = new Email();
		email.setFrom("noreply .StudentPortal <noreply.studentportal@gmail.com>");
		email.setTo(register.getEmail().trim());
		email.setSubject("Student Portal Updated Registration Details..!");
		String msg = "Dear Sir/Madam,<br><br>Your registration details are as follows...<br><br><b>Username : </b>"+ register.getUsername() + "<br><br><b>Password : </b>"+ register.getOldpassword()+ "<br><br><b>Designation : </b>"+ register.getRole(); 

		email.setText(msg);

		this.emailService.sendHtmlMsg(email);
		}
		return response;
	}

	public Response removeDetails(String username)
	{
		response.setSuccessful(false);
		registerDAO.removeDetails(username);
		response.setSuccessful(true);
		response.setResponseObject(username);
		return response;
	}

	public Response viewaccounts() {
		response.setSuccessful(false);
		List<Register> RegisterDetails = registerDAO.viewaccounts();
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}

/*------------------------------------------------------------------Student Registration Operations--------------------------------------------------------------------------------*/				


	public Response insertStudentDetails(Register register) throws JSONException {
		response.setSuccessful(false);
		registerDAO.insertStudentDetails(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		if(response.isSuccessful()) {
		Email email = new Email();
		email.setFrom("noreply .StudentPortal <noreply.studentportal@gmail.com>");
		email.setTo(register.getEmail().trim());
		email.setSubject("You Are Successfully Registered As Student In Student Portal Website..!");
		String msg = "Dear Student,<br><br>You are Registered as STUDENT by "+register.getFacultyid()+" in the \"Student Portal\" website."
				+ "<br>Contact your Faculty for further Information.<br>Your registration details are as follows...<br><br><b>Pin : </b>"+ register.getStu_pin1() +"-"+ register.getStu_pin2() +"-"+ register.getStu_pin3()+ "<br><br><b>Name : </b>"+ register.getName() + "<br><br><b>Email : </b>"+ register.getEmail()+ "<br><br><b>Year : </b>"+ register.getYear()+ "<br><br><b>Mobile : </b>"+ register.getMobileno(); 

		email.setText(msg);

		this.emailService.sendHtmlMsg(email);
		}
		return response;
	}

	public Response viewaccountsforfaculty(String branchcode) {
		response.setSuccessful(false);
		List<Register> RegisterDetails = registerDAO.viewaccountsforfaculty(branchcode);
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}

	public Response viewaccountsforfaculty1(String branchcode) {
		response.setSuccessful(false);
		List<Register> RegisterDetails = registerDAO.viewaccountsforfaculty1(branchcode);
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}

	public Response viewaccountsforfaculty2(String branchcode) {
		response.setSuccessful(false);
		List<Register> RegisterDetails = registerDAO.viewaccountsforfaculty2(branchcode);
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}

	public Response updateStudentDetails(Register register) throws JSONException {
		response.setSuccessful(false);
		registerDAO.updateStudentDetails(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		if(response.isSuccessful()) {
		Email email = new Email();
		email.setFrom("noreply .StudentPortal <noreply.studentportal@gmail.com>");
		email.setTo(register.getEmail().trim());
		email.setSubject("Your Details Successfully Updated In Student Portal Website..!");
		String msg = "Dear Student,<br><br>Your detail are updated by "+register.getFacultyid()+" in the \"Student Portal\" website."
				+ "<br>Contact your Faculty for further Information.<br>Your updated details are as follows...<br><br><b>Pin : </b>"+ register.getStu_pin1() +"-"+ register.getStu_pin2() +"-"+ register.getStu_pin3()+ "<br><br><b>Name : </b>"+ register.getName() + "<br><br><b>Email : </b>"+ register.getEmail()+ "<br><br><b>Year : </b>"+ register.getYear()+ "<br><br><b>Mobile : </b>"+ register.getMobileno(); 

		email.setText(msg);

		this.emailService.sendHtmlMsg(email);
		}
		return response;
	}

	public Response removeStudentDetails(Register register)
	{
		response.setSuccessful(false);
		registerDAO.removeStudentDetails(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}


/*---------------------------------------------------------------PRINCIPAL OPERATIONS------------------------------------------------------------------------------------*/

	public Response viewaccountsforprincipal() {
		response.setSuccessful(false);
		List<Register> RegisterDetails = registerDAO.viewaccountsforprincipal();
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}
	

	public Response viewaccountsforprincipal1() {
		response.setSuccessful(false);
		List<Register> RegisterDetails = registerDAO.viewaccountsforprincipal1();
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}

	public Response viewaccountsforprincipal2() {
		response.setSuccessful(false);
		List<Register> RegisterDetails = registerDAO.viewaccountsforprincipal2();
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}

	public Response promote()
	{
		response.setSuccessful(false);
		List<Register> RegisterDetails=registerDAO.promote();
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}

	public Response getPromotionDate() {
		response.setSuccessful(false);
		Register RegisterDetails1 = registerDAO.getPromotionDate();
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails1);
		return response;
	}

	public Response setPromotionDate(Date edate)
	{
		response.setSuccessful(false);
		registerDAO.setPromotionDate(edate);
		response.setSuccessful(true);
		response.setResponseObject(edate);
		return response;
	}
	
	public Response removeCompleted(Register register)
	{
		response.setSuccessful(false);
		registerDAO.removeCompleted(register);
		response.setSuccessful(true);
		return response;
	}

	
/*---------------------------------------------------------------HOD OPERATIONS------------------------------------------------------------------------------------*/

	public Response viewaccountsforhod(String branchcode) {
		response.setSuccessful(false);
		List<Register> RegisterDetails = registerDAO.viewaccountsforhod(branchcode);
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}

	public Response viewaccountsforhod1(String branchcode) {
		response.setSuccessful(false);
		List<Register> RegisterDetails = registerDAO.viewaccountsforhod1(branchcode);
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}

/*--------------------------------------------------------------Faculty Attendance OPERATIONS------------------------------------------------------------------------------------*/

	public Response viewFacultyAttendance(Register register) {
		response.setSuccessful(false);
		List<Register> RegisterDetails = registerDAO.viewFacultyAttendance(register);
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}


	public Response insertFacultyAttendance(Register register) {
		response.setSuccessful(false);
		registerDAO.insertFacultyAttendance(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}


	public Response updateFacultyAttendance(Register register)
	{
		response.setSuccessful(false);
		registerDAO.updateFacultyAttendance(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}
	

	public Response removeFacultyAttendance(Integer facultyattendanceid)
	{
		response.setSuccessful(false);
		registerDAO.removeFacultyAttendance(facultyattendanceid);
		response.setSuccessful(true);
		response.setResponseObject(facultyattendanceid);
		return response;
	}

	public Response getDates1(Register register) {
		response.setSuccessful(false);
		List<Register> RegisterDetails = registerDAO.getDates1(register);
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}

	public Response getAttendance1(Register register) {
		response.setSuccessful(false);
		Register RegisterDetails = registerDAO.getAttendance1(register);
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}

/*--------------------------------------------------------------Student Attendance OPERATIONS------------------------------------------------------------------------------------*/

	public Response viewStudentAttendance(Register register) {
		response.setSuccessful(false);
		List<Register> RegisterDetails = registerDAO.viewStudentAttendance(register);
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}

	public Response insertStudentAttendance(Register register) {
		response.setSuccessful(false);
		registerDAO.insertStudentAttendance(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	public Response updateStudentAttendance(Register register)
	{
		response.setSuccessful(false);
		registerDAO.updateStudentAttendance(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	public Response removeStudentAttendance(Integer studentattendanceid)
	{
		response.setSuccessful(false);
		registerDAO.removeStudentAttendance(studentattendanceid);
		response.setSuccessful(true);
		response.setResponseObject(studentattendanceid);
		return response;
	}

	public Response getDates(Register register) {
		response.setSuccessful(false);
		List<Register> RegisterDetails = registerDAO.getDates(register);
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		Integer status=registerDAO.checkPin(register);
		if(status==0) {
			response.setSuccessful(false);
		}
		return response;
	}

	public Response getAttendance(Register register) {
		response.setSuccessful(false);
		Register RegisterDetails = registerDAO.getAttendance(register);
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}

	public Response getHolidayReason(Register register) {
		response.setSuccessful(false);
		Register RegisterDetails = registerDAO.getHolidayReason(register);
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}



/*--------------------------------------------------------------Getting Sem and Subject------------------------------------------------------------------------------------*/

	public Response getSemisters()
	{
		response.setSuccessful(false);
		List<Map<String, Object>> list = registerDAO.getSemisters();
		response.setSuccessful(true);
		response.setResponseObject(list);
		return response;
	}


	public Response getSubjects(String sem)
	{
		response.setSuccessful(false);
		List<Map<String, Object>> subjects = registerDAO.getSubjects(sem);
		response.setSuccessful(true);
		response.setResponseObject(subjects);
		return response;
	}


	public Response getStu_Pin3(Register register)
	{
		response.setSuccessful(false);
		List<Map<String, Object>> stupin3s = registerDAO.getStu_Pin3(register);
		response.setSuccessful(true);
		response.setResponseObject(stupin3s);
		return response;
	}
	
	
/*--------------------------------------------------------------Student Marks OPERATIONS------------------------------------------------------------------------------------*/


	public Response viewStudentMarks(String facultyid) {
		response.setSuccessful(false);
		List<Register> RegisterDetails = registerDAO.viewStudentMarks(facultyid);
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}

	public Response insertstudentMarks(Register register) {
		response.setSuccessful(false);
		registerDAO.insertstudentMarks(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	public Response updatestudentMarks(Register register)
	{
		response.setSuccessful(false);
		registerDAO.updatestudentMarks(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	public Response removestudentMarks(Integer studentmarksid)
	{
		response.setSuccessful(false);
		registerDAO.removestudentMarks(studentmarksid);
		response.setSuccessful(true);
		response.setResponseObject(studentmarksid);
		return response;
	}

	public Response viewIndividualStudentMarks(Register register) {
		response.setSuccessful(false);
		List<Register> RegisterDetails = registerDAO.viewIndividualStudentMarks(register);
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}


/*--------------------------------------------------------------Viewing Student Details to principal or hod-----------------------------------------------------------------------------------*/

	public Response viewIndividualStudentMarks1(Register register) {
		response.setSuccessful(false);
		List<Register> RegisterDetails = registerDAO.viewIndividualStudentMarks1(register);
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}

	public Response viewIndividualStudentAttendance1(Register register) {
		response.setSuccessful(false);
		List<Register> RegisterDetails = registerDAO.viewIndividualStudentAttendance1(register);
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}

	public Response viewIndividualStudentAttendance2(Register register) {
		response.setSuccessful(false);
		List<Register> RegisterDetails = registerDAO.viewIndividualStudentAttendance2(register);
		response.setSuccessful(true);
		response.setResponseObject(RegisterDetails);
		return response;
	}


/*--------------------------------------------------------------Feedback Operations-----------------------------------------------------------------------------------*/

	public Response insertFeedback(Register register) {
		response.setSuccessful(false);
		registerDAO.insertFeedback(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	public Response viewFeedbacks()
	{
		response.setSuccessful(false);
		List<Map<String, Object>> list = registerDAO.viewFeedbacks();
		response.setSuccessful(true);
		response.setResponseObject(list);
		return response;
	}

	public Response deleteFeedback(Register register)
	{
		response.setSuccessful(false);
		registerDAO.deleteFeedback(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}


	public Response sendReply(Register register) throws JSONException {
		response.setSuccessful(false);
		registerDAO.sendReply(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		if(response.isSuccessful()) {
		Email email = new Email();
		email.setFrom("noreply .StudentPortal <noreply.studentportal@gmail.com>");
		email.setTo(register.getEmail().trim());
		email.setSubject("Feedback-Reply..!");
		String msg = "Hello "+register.getName()+",<br><br>Thank You For Your Response.Your Feedback is as follows..<br><br>"+register.getFeedback()+"<br><br>Our Reply for your Feedback is as follows..<br><br>"+register.getReply(); 

		email.setText(msg);

		this.emailService.sendHtmlMsg(email);
		}
		return response;
	}
	
	
/*--------------------------------------------------------------Subject OPERATIONS------------------------------------------------------------------------------------*/


	public Response viewSubjects()
	{
		response.setSuccessful(false);
		List<Map<String, Object>> list = registerDAO.viewSubjects();
		response.setSuccessful(true);
		response.setResponseObject(list);
		return response;
	}

	public Response insertSubject(Register register) {
		response.setSuccessful(false);
		registerDAO.insertSubject(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	public Response updateSubject(Register register) {
		response.setSuccessful(false);
		registerDAO.updateSubject(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	public Response removeSubject(Register register) {
		response.setSuccessful(false);
		registerDAO.removeSubject(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}


/*--------------------------------------------------------------Semester OPERATIONS------------------------------------------------------------------------------------*/


	public Response viewSemesters()
	{
		response.setSuccessful(false);
		List<Map<String, Object>> list = registerDAO.viewSemesters();
		response.setSuccessful(true);
		response.setResponseObject(list);
		return response;
	}

	public Response insertSem(Register register) {
		response.setSuccessful(false);
		registerDAO.insertSem(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	public Response updateSem(Register register) {
		response.setSuccessful(false);
		registerDAO.updateSem(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	public Response removeSem(Register register) {
		response.setSuccessful(false);
		registerDAO.removeSem(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	


/*--------------------------------------------------------------Branch OPERATIONS------------------------------------------------------------------------------------*/


	public Response viewBranches()
	{
		response.setSuccessful(false);
		List<Map<String, Object>> list = registerDAO.viewBranches();
		response.setSuccessful(true);
		response.setResponseObject(list);
		return response;
	}

	public Response insertBranch(Register register) {
		response.setSuccessful(false);
		registerDAO.insertBranch(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	public Response updateBranch(Register register) {
		response.setSuccessful(false);
		registerDAO.updateBranch(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	public Response removeBranch(Register register) {
		response.setSuccessful(false);
		registerDAO.removeBranch(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	


/*--------------------------------------------------------------Qualification OPERATIONS------------------------------------------------------------------------------------*/


	public Response viewQualifications()
	{
		response.setSuccessful(false);
		List<Map<String, Object>> list = registerDAO.viewQualifications();
		response.setSuccessful(true);
		response.setResponseObject(list);
		return response;
	}

	public Response insertQualification(Register register) {
		response.setSuccessful(false);
		registerDAO.insertQualification(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	public Response updateQualification(Register register) {
		response.setSuccessful(false);
		registerDAO.updateQualification(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	public Response removeQualification(Register register) {
		response.setSuccessful(false);
		registerDAO.removeQualification(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	


/*--------------------------------------------------------------Holiday OPERATIONS------------------------------------------------------------------------------------*/


	public Response viewHolidays()
	{
		response.setSuccessful(false);
		List<Map<String, Object>> list = registerDAO.viewHolidays();
		response.setSuccessful(true);
		response.setResponseObject(list);
		return response;
	}

	public Response insertHoliday(Register register) {
		response.setSuccessful(false);
		registerDAO.insertHoliday(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	public Response updateHoliday(Register register) {
		response.setSuccessful(false);
		registerDAO.updateHoliday(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	public Response removeHoliday(Register register) {
		response.setSuccessful(false);
		registerDAO.removeHoliday(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}


	


/*--------------------------------------------------------------Faq OPERATIONS------------------------------------------------------------------------------------*/


	public Response viewFaqs()
	{
		response.setSuccessful(false);
		List<Map<String, Object>> list = registerDAO.viewFaqs();
		response.setSuccessful(true);
		response.setResponseObject(list);
		return response;
	}

	public Response insertFaq(Register register) {
		response.setSuccessful(false);
		registerDAO.insertFaq(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	public Response updateFaq(Register register) {
		response.setSuccessful(false);
		registerDAO.updateFaq(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	public Response removeFaq(Register register) {
		response.setSuccessful(false);
		registerDAO.removeFaq(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}


	


/*--------------------------------------------------------------Contact details OPERATIONS------------------------------------------------------------------------------------*/


	public Response viewContacts()
	{
		response.setSuccessful(false);
		List<Map<String, Object>> list = registerDAO.viewContacts();
		response.setSuccessful(true);
		response.setResponseObject(list);
		return response;
	}

	public Response insertContact(Register register) {
		response.setSuccessful(false);
		registerDAO.insertContact(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	public Response updateContact(Register register) {
		response.setSuccessful(false);
		registerDAO.updateContact(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}

	public Response removeContact(Register register) {
		response.setSuccessful(false);
		registerDAO.removeContact(register);
		response.setSuccessful(true);
		response.setResponseObject(register);
		return response;
	}


	


/*--------------------------------------------------------------Map OPERATIONS------------------------------------------------------------------------------------*/


	public Response viewMap()
	{
		response.setSuccessful(false);
		Register list = registerDAO.viewMap();
		response.setSuccessful(true);
		response.setResponseObject(list);
		return response;
	}

		public Response updateMap(String maplink) {
		response.setSuccessful(false);
		registerDAO.updateMap(maplink);
		response.setSuccessful(true);
		response.setResponseObject(maplink);
		return response;
	}

	
	
	
}
