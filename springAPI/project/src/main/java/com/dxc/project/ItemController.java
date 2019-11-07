package com.dxc.project;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dxc.project.dao.ItemDao;
import com.dxc.project.model.Item;

@CrossOrigin
@RestController
public class ItemController {
	
	@Autowired
	ItemDao itemService;
	
	@PostMapping(value="item")
	public Item saveItem(@RequestBody Item item)
	{
		return itemService.saveItem(item);
	}
	
	@GetMapping(value="item")
	public List<Item> getAllItems()
	{
		return itemService.getAllItems(); 	
	}
	
	@GetMapping(value="item/{itemId}")
	public Object getItem(@PathVariable int itemId )  //method only for postman
	{
		return itemService.getItemById(itemId);
	}
	
	@DeleteMapping(value="item/{itemId}")
	public String deleteItem(@PathVariable int itemId )
	{
		return itemService.deleteItem(itemId);
	} 
	
//	@PutMapping(value="item")
//	public Item updateItem(@RequestBody Item item)
//	{
//		return itemService.saveItem(item);
//
//	}
	
	@GetMapping(value="item/status/{status}")
	public Object getItemByStatus(@PathVariable boolean status)
	{
		return itemService.getItemByStatus(status);
	}
	
	@GetMapping(value="item/name/{itemName}")
	public List<Item> getItemByName(@PathVariable String itemName)
	{
		return itemService.getItemByName(itemName);
	}
	
	@PutMapping(value="item/approve/{itemId}")
	public List<Item> approveItem(@PathVariable int itemId)
	{
		return itemService.approveItem(itemId); 
	}
	
	@PutMapping(value="item/disapprove/{itemId}")
	public List<Item> disapproveItem(@PathVariable int itemId )
	{
		return itemService.disapproveItem(itemId);
	}
	
	@GetMapping(value="item/count")
	public Object getLastItemId()
	{
		return itemService.getLastItemId();
	}

}
