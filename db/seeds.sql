INSERT INTO department (name)
VALUES
('Management'),
('Sales team'),
('Front desk'),
('HR'),
('Accountants'),
('Customer Service');

INSERT INTO roles (title, salary, department_id)
VALUES
('Regional Manager', 75000, 1 ),
('Salesman', 55000, 2 ),
('Head Salesman', 60000, 2 ),
('Receptionist', 35000, 3 ),
('Human Resources Rep', 45000, 4 ),
('Accountant', 50000, 5),
('Head Accountant', 55000, 5 ),
('Customer Service Rep', 40000, 6 );

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Michael', 'Scott', 1, 1) ,
('Dwight', 'Schrute', 3, 1),
('Jim', 'Halpert', 2, 1),
('Stanley', 'Hudson', 2, 1),
('Kelly', 'Kapoor', 8, 1),
('Toby', 'Flenderson', 5, 1),
('Pam', 'Beesly.', 4, 1),
('Kevin', 'Malone', 6, 1),
('Angela', 'Martin', 7, 1),
('Oscar', 'Martinez', 6, 1),
('Phyllis', 'Vance', 2, 1),
('Holly', 'Flax', 5, 1);

