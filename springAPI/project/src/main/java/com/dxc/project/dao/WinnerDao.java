package com.dxc.project.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.dxc.project.model.Winner;

@Component
public class WinnerDao {
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	public Winner saveWinner(Winner winner) {
		mongoTemplate.save(winner);
		return winner;
	}
	
	public List<Winner> getAllWinners() {
		return mongoTemplate.findAll(Winner.class);
	}
	
	public Winner lastModfified() {
		Query query = new Query();
		query.with(new Sort(Direction.DESC,"_id")).limit(1);
		return mongoTemplate.findOne(query, Winner.class);
	}

}
