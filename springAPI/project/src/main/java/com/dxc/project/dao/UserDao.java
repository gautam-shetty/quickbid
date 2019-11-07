package com.dxc.project.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.dxc.project.model.User;

@Component
public class UserDao {

	@Autowired
	private MongoTemplate mongoTemplate;

	public User saveUser(User user) {
		mongoTemplate.save(user);
		return user;
	}

	public List<User> getAllUsers() {
		return mongoTemplate.findAll(User.class);
	}

	public User getUserByUsername(String userName) {
		Query query = new Query();
		query.addCriteria(Criteria.where("userName").is(userName));
		return mongoTemplate.findOne(query, User.class);
	}

	public User checkLogin(String userName, String password) {
		Query query = new Query();
		query.addCriteria(Criteria.where("userName").is(userName));
		query.addCriteria(Criteria.where("password").is(password));
		return mongoTemplate.findOne(query, User.class);
	}

	public String deleteUserByUsername(String userName) {
		Query query = new Query();
		query.addCriteria(Criteria.where("userName").is(userName));
		mongoTemplate.remove(query, User.class);
		return "{\"success\":\"true\"}";
	}

	public User updatePlayer(User user) {
		mongoTemplate.save(user);
		return user;
	}

	public String reset(String userName, String newPass) {
		Query query = new Query();
		query.addCriteria(Criteria.where("userName").is(userName));
		User user = mongoTemplate.findOne(query, User.class);
		user.setPassword(newPass);
		mongoTemplate.save(user);
		return "{\"success\":\"true\"}";
	}

}
