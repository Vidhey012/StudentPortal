package com.spring.Dao;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.spring.Dao.BaseDao;
import com.spring.Model.Register;


@Repository
public class RegisterDao extends BaseDao  {
	
/*---------------------------------------------------------------LOGIN OPERATIONS--------------------------------------------------------------------------------------*/	

	public Boolean login(Register register)
	{
		
		  Boolean status = Boolean.valueOf(false);
		  Map<String, Object> map = new HashMap<String, Object>();
		    map.put("T", register);
		    Integer RegisteredData = 0;
		    RegisteredData = (Integer)this.sqlSessionTemplate.selectOne("ApplicationRegister.CheckRegistertaion", map);  
		  if (RegisteredData!=0) {
		    	
		    	   status = Boolean.valueOf(true);
		
		  }
		  else {
			   status = Boolean.valueOf(false);
			   }
		  
		  return status;
     }

	public Register getUserDetails(Register register)
	{
		SqlSession sqlSession = sqlSessionFactory.openSession();
		Register singleuserdetails=sqlSession.selectOne("ApplicationRegister.getUserDetails",register);
		sqlSession.close();
		return singleuserdetails;
		
	}

	public Boolean verifyEmail(String email)
	{
		
		  Boolean status = Boolean.valueOf(false);
		    Integer isExists = 0;
		    isExists = (Integer)this.sqlSessionTemplate.selectOne("ApplicationRegister.verifyEmail", email);  
		  if (isExists!=0) {
		    	
		    	   status = Boolean.valueOf(true);
		
		  }
		  else {
			   status = Boolean.valueOf(false);
			   }
		  
		  return status;
     }


	public Register getPersonDetails(String email)
	{
		SqlSession sqlSession = sqlSessionFactory.openSession();
		Register singleuserdetails=sqlSession.selectOne("ApplicationRegister.getPersonDetails",email);
		sqlSession.close();
		return singleuserdetails;
	}
	

	public void changePassword(Register register)
	{
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.update("ApplicationRegister.changePassword",params);
		sqlSession.close();
	}
	
	
/*------------------------------------------------------------------PROFILE OPERATIONS--------------------------------------------------------------------------------*/			
	
	
	public Register getProfile(Integer id)
	{
		SqlSession sqlSession = sqlSessionFactory.openSession();
		Register singleuserdetails=sqlSession.selectOne("ApplicationRegister.getProfile",id);
		sqlSession.close();
		return singleuserdetails;
		
	}


	public void updateProfileDetails(Register register)
	{
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.update("ApplicationRegister.updateProfileDetails",params);
		sqlSession.close();
	}
	
/*------------------------------------------------------------------REGESTERED MEMBERS OPERATIONS (BY ADMIN)--------------------------------------------------------------------------------*/				


	public void insertDetails(Register register) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.insert("ApplicationRegister.insertDetails", params);
		sqlSession.close();
	}

	public void updateDetails(Register register)
	{
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.update("ApplicationRegister.updateDetails",params);
		sqlSession.close();
	}

	public void removeDetails(String username)
	{
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.update("ApplicationRegister.removeDetails",username);
		sqlSession.close();
	}

	public List<Register> viewaccounts() {
		SqlSession sqlSession = sqlSessionFactory.openSession();
		List<Register> RegisterDetails=sqlSession.selectList("ApplicationRegister.viewaccounts");
		sqlSession.close();
		return RegisterDetails;
	}

/*------------------------------------------------------------------Student Registration Operations--------------------------------------------------------------------------------*/				


	public void insertStudentDetails(Register register) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.insert("ApplicationRegister.insertStudentDetails", params);
		sqlSession.close();
	}

	public List<Register> viewaccountsforfaculty(String branchcode) {
		SqlSession sqlSession = sqlSessionFactory.openSession();
		List<Register> RegisterDetails=sqlSession.selectList("ApplicationRegister.viewaccountsforfaculty",branchcode);
		sqlSession.close();
		return RegisterDetails;
	}

	public List<Register> viewaccountsforfaculty1(String branchcode) {
		SqlSession sqlSession = sqlSessionFactory.openSession();
		List<Register> RegisterDetails=sqlSession.selectList("ApplicationRegister.viewaccountsforfaculty1",branchcode);
		sqlSession.close();
		return RegisterDetails;
	}

	public List<Register> viewaccountsforfaculty2(String branchcode) {
		SqlSession sqlSession = sqlSessionFactory.openSession();
		List<Register> RegisterDetails=sqlSession.selectList("ApplicationRegister.viewaccountsforfaculty2",branchcode);
		sqlSession.close();
		return RegisterDetails;
	}

	public void updateStudentDetails(Register register) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.update("ApplicationRegister.updateStudentDetails", params);
		sqlSession.close();
	}

	public void removeStudentDetails(Register register)
	{
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.update("ApplicationRegister.removeStudentDetails",params);
		sqlSession.close();
	}

/*---------------------------------------------------------------PRINCIPAL OPERATIONS------------------------------------------------------------------------------------*/

	public List<Register> viewaccountsforprincipal() {
		SqlSession sqlSession = sqlSessionFactory.openSession();
		List<Register> RegisterDetails=sqlSession.selectList("ApplicationRegister.viewaccountsforprincipal");
		sqlSession.close();
		return RegisterDetails;
	}

	public List<Register> viewaccountsforprincipal1() {
		SqlSession sqlSession = sqlSessionFactory.openSession();
		List<Register> RegisterDetails=sqlSession.selectList("ApplicationRegister.viewaccountsforprincipal1");
		sqlSession.close();
		return RegisterDetails;
	}

	public List<Register> viewaccountsforprincipal2() {
		SqlSession sqlSession = sqlSessionFactory.openSession();
		List<Register> RegisterDetails=sqlSession.selectList("ApplicationRegister.viewaccountsforprincipal2");
		sqlSession.close();
		return RegisterDetails;
	}
	
	public List<Register> promote()
	{
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.update("ApplicationRegister.promote");
		List<Register> RegisterDetails=sqlSession.selectList("ApplicationRegister.getCompletedList");
		sqlSession.close();
		return RegisterDetails;
	}

	public Register getPromotionDate() {
		SqlSession sqlSession = sqlSessionFactory.openSession();
		Register RegisterDetails1=sqlSession.selectOne("ApplicationRegister.getPromotionDate");
		sqlSession.close();
		return RegisterDetails1;
	}
	
	public void setPromotionDate(Date edate)
	{
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.update("ApplicationRegister.setPromotionDate",edate);
		sqlSession.close();
	}

	public void removeCompleted(Register register) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.delete("ApplicationRegister.removeCompleted1",params);
		sqlSession.delete("ApplicationRegister.removeCompleted2",params);
		sqlSession.delete("ApplicationRegister.removeCompleted3",params);
		sqlSession.close();
	}
/*---------------------------------------------------------------HOD OPERATIONS------------------------------------------------------------------------------------*/

	public List<Register> viewaccountsforhod(String branchcode) {
		SqlSession sqlSession = sqlSessionFactory.openSession();
		List<Register> RegisterDetails=sqlSession.selectList("ApplicationRegister.viewaccountsforhod",branchcode);
		sqlSession.close();
		return RegisterDetails;
	}

	public List<Register> viewaccountsforhod1(String branchcode) {
		SqlSession sqlSession = sqlSessionFactory.openSession();
		List<Register> RegisterDetails=sqlSession.selectList("ApplicationRegister.viewaccountsforhod1",branchcode);
		sqlSession.close();
		return RegisterDetails;
	}

/*--------------------------------------------------------------Faculty Attendance OPERATIONS------------------------------------------------------------------------------------*/

	public List<Register> viewFacultyAttendance(Register register) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		List<Register> RegisterDetails=sqlSession.selectList("ApplicationRegister.viewFacultyAttendance",params);
		sqlSession.close();
		return RegisterDetails;
	}

	public void insertFacultyAttendance(Register register) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.insert("ApplicationRegister.insertFacultyAttendance", params);
		sqlSession.close();
	}

	public void updateFacultyAttendance(Register register)
	{
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.update("ApplicationRegister.updateFacultyAttendance",params);
		sqlSession.close();
	}


	public void removeFacultyAttendance(Integer facultyattendanceid)
	{
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.delete("ApplicationRegister.removeFacultyAttendance",facultyattendanceid);
		sqlSession.close();
	}

	public List<Register> getDates1(Register register) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		List<Register> RegisterDetails=sqlSession.selectList("ApplicationRegister.getDates1",params);
		sqlSession.close();
		return RegisterDetails;
	}

	public Register getAttendance1(Register register) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		Register RegisterDetails=sqlSession.selectOne("ApplicationRegister.getAttendance1",params);
		sqlSession.close();
		return RegisterDetails;
	}

/*--------------------------------------------------------------Student Attendance OPERATIONS------------------------------------------------------------------------------------*/

	public List<Register> viewStudentAttendance(Register register) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		List<Register> RegisterDetails=sqlSession.selectList("ApplicationRegister.viewStudentAttendance",params);
		sqlSession.close();
		return RegisterDetails;
	}

	public void insertStudentAttendance(Register register) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.insert("ApplicationRegister.insertStudentAttendance", params);
		sqlSession.close();
	}

	public void updateStudentAttendance(Register register)
	{
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.update("ApplicationRegister.updateStudentAttendance",params);
		sqlSession.close();
	}

	public void removeStudentAttendance(Integer studentattendanceid)
	{
		SqlSession sqlSession = sqlSessionFactory.openSession();
		sqlSession.delete("ApplicationRegister.removeStudentAttendance",studentattendanceid);
		sqlSession.close();
	}

	public List<Register> getDates(Register register) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		List<Register> RegisterDetails=sqlSession.selectList("ApplicationRegister.getDates",params);
		sqlSession.close();
		return RegisterDetails;
	}

	public Integer checkPin(Register register) {
		 Map<String, Object> map = new HashMap<String, Object>();
		    map.put("T", register);
		    Integer RegisteredData = 0;
		    RegisteredData = (Integer)this.sqlSessionTemplate.selectOne("ApplicationRegister.checkPin", map);  
		return RegisteredData;
	}
	
	public Register getAttendance(Register register) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		Register RegisterDetails=sqlSession.selectOne("ApplicationRegister.getAttendance",params);
		sqlSession.close();
		return RegisterDetails;
	}

	public Register getHolidayReason(Register register) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
		SqlSession sqlSession = sqlSessionFactory.openSession();
		Register RegisterDetails=sqlSession.selectOne("ApplicationRegister.getHolidayReason",params);
		sqlSession.close();
		return RegisterDetails;
	}

/*--------------------------------------------------------------Getting Sem and Subject------------------------------------------------------------------------------------*/
	
	 public List<Map<String, Object>> getSemisters()
	  {
	    List<Map<String, Object>> list = this.sqlSessionTemplate.selectList("ApplicationRegister.getSemisters");
	    return list;
	  }

	  public List<Map<String, Object>> getSubjects(String sem)
	  {
	    List<Map<String, Object>> colleges = this.sqlSessionTemplate.selectList("ApplicationRegister.getSubjects", sem);
	    return colleges;
	  }

	  public List<Map<String, Object>> getStu_Pin3(Register register)
	  {
	    Map<String, Object> params = new HashMap<String, Object>();
		params.put("T", register);
	    List<Map<String, Object>> stupin3s = this.sqlSessionTemplate.selectList("ApplicationRegister.getStu_Pin3", params);
	    return stupin3s;
	  }
	  
	  
/*--------------------------------------------------------------Student Marks OPERATIONS------------------------------------------------------------------------------------*/

		public List<Register> viewStudentMarks(String facultyid) {
			SqlSession sqlSession = sqlSessionFactory.openSession();
			List<Register> RegisterDetails=sqlSession.selectList("ApplicationRegister.viewStudentMarks",facultyid);
			sqlSession.close();
			return RegisterDetails;
		}

		public void insertstudentMarks(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.insert("ApplicationRegister.insertstudentMarks", params);
			sqlSession.close();
		}

		public void updatestudentMarks(Register register)
		{
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.update("ApplicationRegister.updatestudentMarks",params);
			sqlSession.close();
		}

		public void removestudentMarks(Integer studentmarksid)
		{
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.delete("ApplicationRegister.removestudentMarks",studentmarksid);
			sqlSession.close();
		}

		public List<Register> viewIndividualStudentMarks(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			List<Register> RegisterDetails=sqlSession.selectList("ApplicationRegister.viewIndividualStudentMarks",params);
			sqlSession.close();
			return RegisterDetails;
		}

/*--------------------------------------------------------------Viewing Student Details to principal or hod-----------------------------------------------------------------------------------*/

		public List<Register> viewIndividualStudentMarks1(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			List<Register> RegisterDetails=sqlSession.selectList("ApplicationRegister.viewIndividualStudentMarks1",params);
			sqlSession.close();
			return RegisterDetails;
		}

		public List<Register> viewIndividualStudentAttendance1(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			List<Register> RegisterDetails=sqlSession.selectList("ApplicationRegister.viewIndividualStudentAttendance1",params);
			sqlSession.close();
			return RegisterDetails;
		}

		public List<Register> viewIndividualStudentAttendance2(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			List<Register> RegisterDetails=sqlSession.selectList("ApplicationRegister.viewIndividualStudentAttendance2",params);
			sqlSession.close();
			return RegisterDetails;
		}
		

/*--------------------------------------------------------------Feedback Operations-----------------------------------------------------------------------------------*/

		public void insertFeedback(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.insert("ApplicationRegister.insertFeedback", params);
			sqlSession.close();
		}


		 public List<Map<String, Object>> viewFeedbacks()
		  {
		    List<Map<String, Object>> list = this.sqlSessionTemplate.selectList("ApplicationRegister.viewFeedbacks");
		    return list;
		  }

		
		public void deleteFeedback(Register register)
		{
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.update("ApplicationRegister.deleteFeedback",params);
			sqlSession.close();
		}


		public void sendReply(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.update("ApplicationRegister.sendReply", params);
			sqlSession.close();
		}
		
		
/*--------------------------------------------------------------Subject OPERATIONS------------------------------------------------------------------------------------*/


		 public List<Map<String, Object>> viewSubjects()
		  {
		    List<Map<String, Object>> list = this.sqlSessionTemplate.selectList("ApplicationRegister.viewSubjects");
		    return list;
		  }

		public void insertSubject(Register register) {
				Map<String, Object> params = new HashMap<String, Object>();
				params.put("T", register);
				SqlSession sqlSession = sqlSessionFactory.openSession();
				sqlSession.insert("ApplicationRegister.insertSubject", params);
				sqlSession.close();
			}
		
		public void updateSubject(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.update("ApplicationRegister.updateSubject", params);
			sqlSession.close();
		}
		
		public void removeSubject(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.delete("ApplicationRegister.removeSubject", params);
			sqlSession.close();
		}

		
		
/*--------------------------------------------------------------Semester OPERATIONS------------------------------------------------------------------------------------*/


		 public List<Map<String, Object>> viewSemesters()
		  {
		    List<Map<String, Object>> list = this.sqlSessionTemplate.selectList("ApplicationRegister.viewSemesters");
		    return list;
		  }

		public void insertSem(Register register) {
				Map<String, Object> params = new HashMap<String, Object>();
				params.put("T", register);
				SqlSession sqlSession = sqlSessionFactory.openSession();
				sqlSession.insert("ApplicationRegister.insertSem", params);
				sqlSession.close();
			}
		
		public void updateSem(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.update("ApplicationRegister.updateSem", params);
			sqlSession.close();
		}
		
		public void removeSem(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.delete("ApplicationRegister.removeSem", params);
			sqlSession.close();
		}


		
		
/*--------------------------------------------------------------Semester OPERATIONS------------------------------------------------------------------------------------*/


		 public List<Map<String, Object>> viewBranches()
		  {
		    List<Map<String, Object>> list = this.sqlSessionTemplate.selectList("ApplicationRegister.viewBranches");
		    return list;
		  }

		public void insertBranch(Register register) {
				Map<String, Object> params = new HashMap<String, Object>();
				params.put("T", register);
				SqlSession sqlSession = sqlSessionFactory.openSession();
				sqlSession.insert("ApplicationRegister.insertBranch", params);
				sqlSession.close();
			}
		
		public void updateBranch(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.update("ApplicationRegister.updateBranch", params);
			sqlSession.close();
		}
		
		public void removeBranch(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.delete("ApplicationRegister.removeBranch", params);
			sqlSession.close();
		}


		
		
/*--------------------------------------------------------------Qualification OPERATIONS------------------------------------------------------------------------------------*/


		 public List<Map<String, Object>> viewQualifications()
		  {
		    List<Map<String, Object>> list = this.sqlSessionTemplate.selectList("ApplicationRegister.viewQualifications");
		    return list;
		  }

		public void insertQualification(Register register) {
				Map<String, Object> params = new HashMap<String, Object>();
				params.put("T", register);
				SqlSession sqlSession = sqlSessionFactory.openSession();
				sqlSession.insert("ApplicationRegister.insertQualification", params);
				sqlSession.close();
			}
		
		public void updateQualification(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.update("ApplicationRegister.updateQualification", params);
			sqlSession.close();
		}
		
		public void removeQualification(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.delete("ApplicationRegister.removeQualification", params);
			sqlSession.close();
		}


		
		
/*--------------------------------------------------------------Holiday OPERATIONS------------------------------------------------------------------------------------*/


		 public List<Map<String, Object>> viewHolidays()
		  {
		    List<Map<String, Object>> list = this.sqlSessionTemplate.selectList("ApplicationRegister.viewHolidays");
		    return list;
		  }

		public void insertHoliday(Register register) {
				Map<String, Object> params = new HashMap<String, Object>();
				params.put("T", register);
				SqlSession sqlSession = sqlSessionFactory.openSession();
				sqlSession.insert("ApplicationRegister.insertHoliday", params);
				sqlSession.close();
			}
		
		public void updateHoliday(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.update("ApplicationRegister.updateHoliday", params);
			sqlSession.close();
		}
		
		public void removeHoliday(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.delete("ApplicationRegister.removeHoliday", params);
			sqlSession.close();
		}
		


		
		
/*--------------------------------------------------------------Faq OPERATIONS------------------------------------------------------------------------------------*/


		 public List<Map<String, Object>> viewFaqs()
		  {
		    List<Map<String, Object>> list = this.sqlSessionTemplate.selectList("ApplicationRegister.viewFaqs");
		    return list;
		  }

		public void insertFaq(Register register) {
				Map<String, Object> params = new HashMap<String, Object>();
				params.put("T", register);
				SqlSession sqlSession = sqlSessionFactory.openSession();
				sqlSession.insert("ApplicationRegister.insertFaq", params);
				sqlSession.close();
			}
		
		public void updateFaq(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.update("ApplicationRegister.updateFaq", params);
			sqlSession.close();
		}
		
		public void removeFaq(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.update("ApplicationRegister.removeFaq", params);
			sqlSession.close();
		}


		
		
/*--------------------------------------------------------------Contact details OPERATIONS------------------------------------------------------------------------------------*/


		 public List<Map<String, Object>> viewContacts()
		  {
		    List<Map<String, Object>> list = this.sqlSessionTemplate.selectList("ApplicationRegister.viewContacts");
		    return list;
		  }

		public void insertContact(Register register) {
				Map<String, Object> params = new HashMap<String, Object>();
				params.put("T", register);
				SqlSession sqlSession = sqlSessionFactory.openSession();
				sqlSession.insert("ApplicationRegister.insertContact", params);
				sqlSession.close();
			}
		
		public void updateContact(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.update("ApplicationRegister.updateContact", params);
			sqlSession.close();
		}
		
		public void removeContact(Register register) {
			Map<String, Object> params = new HashMap<String, Object>();
			params.put("T", register);
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.delete("ApplicationRegister.removeContact", params);
			sqlSession.close();
		}


		
		
/*--------------------------------------------------------------Map OPERATIONS------------------------------------------------------------------------------------*/


		 public Register viewMap()
		  {
		    Register list = this.sqlSessionTemplate.selectOne("ApplicationRegister.viewMap");
		    return list;
		  }

		public void updateMap(String maplink) {
			SqlSession sqlSession = sqlSessionFactory.openSession();
			sqlSession.update("ApplicationRegister.updateMap", maplink);
			sqlSession.close();
		}
		
		

}
