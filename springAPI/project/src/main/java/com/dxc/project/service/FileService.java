package com.dxc.project.service;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Component
public class FileService {

	public FileService() { }

	private static final String FILE_DIRECTORY = "C:\\Users\\gshetty9\\Desktop\\My Projects\\Angular\\QuickBid\\src\\assets\\Uploads";
	
//	C:\Users\gshetty9\Desktop\My Projects\Angular\QuickBid\src\assets

	public void storeFile(MultipartFile file) throws IOException {
		Path filePath = Paths.get(FILE_DIRECTORY + "/" + file.getOriginalFilename());

		System.out.println(filePath);
		Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
	}
}