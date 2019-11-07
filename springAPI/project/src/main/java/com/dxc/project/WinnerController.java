package com.dxc.project;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dxc.project.dao.WinnerDao;
import com.dxc.project.model.Winner;

@CrossOrigin
@RestController
public class WinnerController {
	
	@Autowired
	WinnerDao winnerService;
	
	@PostMapping(value="winner")
	public Winner saveItem(@RequestBody Winner winner)
	{
		return winnerService.saveWinner(winner);
	}
	
	@GetMapping(value="winner")
	public List<Winner> getAllItems()
	{
		return winnerService.getAllWinners();
	}

	
	@GetMapping(value="winner/latest")
	public Winner lastModfified()
	{
		return winnerService.lastModfified();
	}

}
