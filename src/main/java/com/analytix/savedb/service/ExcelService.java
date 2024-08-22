package com.analytix.savedb.service;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.analytix.savedb.entity.NoSQLEntity;
import com.analytix.savedb.entity.RelationalEntity;
import com.analytix.savedb.repository.NoSQLRepository;
import com.analytix.savedb.repository.RelationalRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ExcelService {

    @Autowired
    private RelationalRepository dynamicRepository;
    
    @Autowired
    private NoSQLRepository noSQLRepository;

    public void processExcel(MultipartFile file) throws IOException {
    	log.info("Processing Excel file...");
        // Parse Excel file
        List<Map<String, Object>> excelDataList = parseExcel(file);

        // Save data to database
        saveToMySQLDatabase(excelDataList);
        
        log.info("data saved into sql database");
        
     // Save data to NoSQL database (MongoDB)
        // saveToNoSQLDatabase(excelDataList);
        // log.info("data saved into no-sql database");
        
        log.info("Excel file processed successfully.");
    }

    private List<Map<String, Object>> parseExcel(MultipartFile file) throws IOException {
        List<Map<String, Object>> excelDataList = new ArrayList<>();
        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0); // Assuming first sheet
            Row headerRow = sheet.getRow(0);
            int columnCount = headerRow.getPhysicalNumberOfCells();

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row currentRow = sheet.getRow(i);
                Map<String, Object> rowData = new HashMap<>();

                if (currentRow != null) {
                    for (int j = 0; j < columnCount; j++) {
                        Cell currentCell = currentRow.getCell(j, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
                        String cellValue = getCellValueAsString(currentCell);
                        String headerValue = getCellValueAsString(headerRow.getCell(j));
                        rowData.put(headerValue, cellValue);
                    }
                }
                excelDataList.add(rowData);
            }
        }
        return excelDataList;
    }

    private String getCellValueAsString(Cell cell) {
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue().trim();
            case NUMERIC:
                return String.valueOf(cell.getNumericCellValue());
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            default:
                return "";
        }
    }

    // save data innto sql db
    private void saveToMySQLDatabase(List<Map<String, Object>> excelDataList) {
        for (Map<String, Object> data : excelDataList) {
            RelationalEntity entity = new RelationalEntity();
            entity.setData(data);
            dynamicRepository.save(entity);
          //  log.info("data saved into sql database");
        }
    }
    
    // save data into nosql db
    private void saveToNoSQLDatabase(List<Map<String, Object>> excelDataList) {
        try {
            for (Map<String, Object> data : excelDataList) {
                ObjectMapper objectMapper = new ObjectMapper();
                String json = objectMapper.writeValueAsString(data);
                NoSQLEntity entity = new NoSQLEntity();
                entity.setJsonData(json);
                noSQLRepository.save(entity);
              //  log.info("data saved into no-sql database");
            }
        } catch (Exception e) {
            log.error("Error saving data to NoSQL database: {}", e.getMessage());
        }
    }


    public List<Map<String, Object>> fetchExcelData(MultipartFile file) throws IOException {
        List<Map<String, Object>> excelDataList = parseExcel(file);  
        return excelDataList;
    }


}
