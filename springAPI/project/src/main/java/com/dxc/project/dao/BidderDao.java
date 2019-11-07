package com.dxc.project.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.dxc.project.model.Bidder;

@Component
public class BidderDao {
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	public Bidder saveBidder(Bidder bidder) {
		mongoTemplate.save(bidder);
		return bidder;
	}
	
	public List<Bidder> getAllBidders() {
		return mongoTemplate.findAll(Bidder.class);
	}
	
	public String deleteBidderList() {
		mongoTemplate.dropCollection(Bidder.class);;
		return "{\"success\":\"true\"}";
	}
	
	public List<Bidder> sortByBidAmount() {
		Query query = new Query();
		query.with(new Sort(Sort.Direction.DESC, "bidAmount"));
		return mongoTemplate.find(query, Bidder.class);
	}

}