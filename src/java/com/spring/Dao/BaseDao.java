package com.spring.Dao;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

/**
 * 
 * @author Prakash K
 * @date 29-Aug-2015
 *
 */
abstract public class BaseDao
{
	protected static final String TABLE_NAME = "tableName";

	@Autowired
	protected DataSource dataSource;

	@Autowired
	protected JdbcTemplate jdbcTemplate;

	@Autowired
	protected SqlSessionFactory sqlSessionFactory;

	protected SqlSessionTemplate sqlSessionTemplate;

	@PostConstruct
	public void init()
	{
		sqlSessionTemplate = new SqlSessionTemplate(sqlSessionFactory);
	}

	@PreDestroy
	public void destroy()
	{
		sqlSessionTemplate.close();
		sqlSessionTemplate = null;
	}

	protected void add(Object object, String tableName, String sqlMap)
	{
		final Map<String, Object> params = new HashMap<String, Object>();
		params.put(TABLE_NAME, tableName);
		params.put("p", object);

		int result = sqlSessionTemplate.insert(sqlMap, params);
	}

	protected void deleteById(String tableName, Integer id)
	{
		final Map<String, Object> params = new HashMap<String, Object>();
		params.put(TABLE_NAME, tableName);
		params.put("id", id);

		sqlSessionTemplate.delete("Common.DeleteById", params);
	}

	protected void deleteByColumnValue(String tableName, String columnName, String columnValue)
	{
		final Map<String, Object> params = new HashMap<String, Object>();
		params.put(TABLE_NAME, tableName);
		params.put("columnName", columnName);
		params.put("columnValue", columnValue);

		sqlSessionTemplate.delete("Common.DeleteColumnValue", params);
	}
}
