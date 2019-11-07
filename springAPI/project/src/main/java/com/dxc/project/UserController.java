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

import com.dxc.project.dao.UserDao;
import com.dxc.project.model.User;

@CrossOrigin
@RestController
public class UserController {

	@Autowired
	UserDao userService;

	@PostMapping(value = "user")
	public User saveUsr(@RequestBody User user) {
		return userService.saveUser(user);
	}

	@GetMapping(value = "user")
	public List<User> getAllUsr() {
		return userService.getAllUsers();
	}

	@PutMapping(value = "user")
	public User updatePlayer(@RequestBody User user) {
		return userService.updatePlayer(user);
	}

	@PutMapping(value = "user/{userName}/{newPass}")
	public String reset(@PathVariable String userName, @PathVariable String newPass) {
//		System.out.println("test " + userName + " " + newPass);
		return userService.reset(userName, newPass);
	}

	@GetMapping(value = "user/{userName}")
	public Object getUsr(@PathVariable String userName) {
		return userService.getUserByUsername(userName);
	}

	@GetMapping(value = "user/{userName}/{password}")
	public Object chkLogin(@PathVariable String userName, @PathVariable String password) {
		return userService.checkLogin(userName, password);
	}

	@DeleteMapping(value = "user/{userName}")
	public Object deletePlayer(@PathVariable String userName) {
		return userService.deleteUserByUsername(userName);

	}

}
