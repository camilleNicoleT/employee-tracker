INSERT INTO department 
    (dep_name) 
VALUES 
    ('Education'), ('Student Affairs'), ('Admissions');  

INSERT INTO roles
    (title, salary, department_id) 
VALUES 
    ('Manager', 80000 , 2), 
    ('Coordinator', 60000, 2), 
    ('Assistant', 40000, 2),
    ('Director', 80000 , 1),
    ('Administrator', 60000, 1), 
    ('Assistant', 40000, 1), 
    ('Manager', 50000, 3), 
    ('Assistant', 40000, 3);  

INSERT INTO employees 
    (first_name, last_name, role_id, manager_id) 
VALUES 
    ('Smith', 'Tanya', 1, 2), 
    ('Hamilton', 'Chris', 2, 1),
    ('Harmon', 'Mary', 3, 1),
    ('Mench', 'Roger', 1, 5),
    ('Patel', 'Sonya', 2, 2),
    ('Terry', 'Carey', 3, 1),
    ('Yeung', 'Gwen', 1, 3);   


