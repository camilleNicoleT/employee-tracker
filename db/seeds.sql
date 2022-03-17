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
    ('Tanya','Smith', 1, 2), 
    ( 'Chris','Hamilton', 2, 1),
    ('Mary', 'Harmon',  3, 1),
    ('Roger', 'Mench',  1, 5),
    ('Sonya', 'Patel',  2, 2),
    ('Terry', 'Carey', 3, 1),
    ('Yeung', 'Gwen', 1, 3);   


