package com.dxc.project;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dxc.project.dao.BidderDao;
import com.dxc.project.model.Bidder;

@CrossOrigin
@RestController
public class BidderController {

	@Autowired
	BidderDao bidderService;
	
	@PostMapping(value="bidder")
	public Bidder saveItem(@RequestBody Bidder bidder)
	{
		return bidderService.saveBidder(bidder);
	}
	
	@GetMapping(value="bidder")
	public List<Bidder> getAllItems()
	{
		return bidderService.getAllBidders();
	}
	
	@DeleteMapping(value="bidder")
	public String deleteBidderList()
	{
		return bidderService.deleteBidderList();
	}
	
	@GetMapping(value="bidder/sort")
	public List<Bidder> sortByBidAmount()
	{
		return bidderService.sortByBidAmount();
	}
	
}
