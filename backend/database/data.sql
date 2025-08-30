USE workly;

INSERT INTO cities (name) VALUES ("Barranquilla");
INSERT INTO cities (name) VALUES ("Bogota");
INSERT INTO cities (name) VALUES ("Medellin");
INSERT INTO cities (name) VALUES ("Cucuta");
INSERT INTO cities (name) VALUES ("Bucaramanga");
INSERT INTO cities (name) VALUES ("Santa Marta");
INSERT INTO cities (name) VALUES ("Cartagena");
INSERT INTO cities (name) VALUES ("Sincelejo");

INSERT INTO roles (name) VALUES ("guest");
INSERT INTO roles (name) VALUES ("user");
INSERT INTO roles (name) VALUES ("admin");

INSERT INTO positions (name) VALUES ("Developer");
INSERT INTO positions (name) VALUES ("Product Manager");
INSERT INTO positions (name) VALUES ("Product Owner");
INSERT INTO positions (name) VALUES ("psychology");
INSERT INTO positions (name) VALUES ("Designer");
INSERT INTO positions (name) VALUES ("Boss");

INSERT INTO departaments (name) VALUES ("Human resources");
INSERT INTO departaments (name) VALUES ("Development tayrona");
INSERT INTO departaments (name) VALUES ("Marketing");
INSERT INTO departaments (name) VALUES ("Accounting");


INSERT INTO contract_types (name) VALUES ("Fixed term");
INSERT INTO contract_types (name) VALUES ("Indefinite term");
INSERT INTO contract_types (name) VALUES ("Service provision");

INSERT INTO approval_status (name) VALUES ("Approved");
INSERT INTO approval_status (name) VALUES ("To approve");
INSERT INTO approval_status (name) VALUES ("Rejected");

INSERT INTO contract_status (name) VALUES ("Active");
INSERT INTO contract_status (name) VALUES ("Inactive");
INSERT INTO contract_status (name) VALUES ("Suspended");

INSERT INTO leaves_status (name) VALUES ("Approved");
INSERT INTO leaves_status (name) VALUES ("Rejected");
INSERT INTO leaves_status (name) VALUES ("In progress");
INSERT INTO leaves_status (name) VALUES ("Completed");
INSERT INTO leaves_status (name) VALUES ("Canceled");

INSERT INTO leaves_types (name, leaves_file) VALUES ("Vacation", False);
INSERT INTO leaves_types (name, leaves_file) VALUES ("Sick leave", True);
INSERT INTO leaves_types (name, leaves_file) VALUES ("Paternity leave", True);
INSERT INTO leaves_types (name, leaves_file) VALUES ("Maternity leave", True);
INSERT INTO leaves_types (name, leaves_file) VALUES ("Bereavement leave", False);
INSERT INTO leaves_types (name, leaves_file) VALUES ("Personal Leave", False);

INSERT INTO employees (
	role_id, position_id, departament_id, city_id, document_type, 
    first_name, last_name, document_number, address, email, gender, 
    vacation_days_available, password) 
    VALUES (3, 1, 2, 1, "Cedula de Ciudadania", "Diomedes", "Diaz", "777", 
			"La junta", "diomedes@test.com", "Masculino", 15, "123"),
            (3, 1, 1, 1, "Cedula de Ciudadania", 'joseph', 'garcia', '1043438196',
            "kr 7 # 20-20", 'joseph@email.com', 'Masculino', 15,
        '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36bE.2zVh4s6k6RSmT.GH5K');
            
INSERT INTO employee_phones (employee_id, phone_number) VALUES (1, "555-000");
INSERT INTO employee_phones (employee_id, phone_number) VALUES (1, "555-001"), (2, '3024911386');

INSERT INTO contracts (employee_id, contract_type_id, contract_status_id, start_date, end_date, salary) 
VALUES (1,1,1,"2025-08-29","2026-08-29", 2500000), (2, 2, 2, '2025-08-29', '2026-08-29', 1800000.00);