
# Spring Boot Excel to Database Project

This Spring Boot project provides functionality to save Excel file data into both SQL and NoSQL databases. It offers flexibility and scalability by supporting multiple database technologies.

## Features

- Parse Excel file data and convert it into Java objects.
- Save data into SQL database (e.g., MySQL) using Spring Data JPA.
- Save data into NoSQL database (e.g., MongoDB) using Spring Data MongoDB.
- Error handling and transaction management for data integrity.

## Technologies Used

- Spring Boot
- Apache POI for Excel parsing
- Spring Data JPA for SQL database interaction
- Spring Data MongoDB for NoSQL database interaction
- MySQL (or other SQL database)
- MongoDB (or other NoSQL database)

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/analytixtake1/analytix-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd analytix-backend
   ```

3. Configure database settings in `application.properties`:

   ```properties
   # SQL Database Configuration
   spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

   # NoSQL Database Configuration
   spring.data.mongodb.host=localhost
   spring.data.mongodb.port=27017
   spring.data.mongodb.database=your_database_name
   ```

4. Run the application:

   ```bash
   ./mvnw spring-boot:run
   ```

## Usage

1. Upload an Excel file using the provided API endpoint.
2. The application will parse the Excel data and save it into both SQL and NoSQL databases.
3. Verify the data in both databases to ensure successful import.



## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).
