CREATE DATABASE IF NOT EXISTS pets_db;

USE pets_db;

CREATE TABLE
    IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        role ENUM ('admin', 'adopter') NOT NULL DEFAULT 'adopter'
    );

CREATE TABLE
    IF NOT EXISTS pets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        species VARCHAR(100) NOT NULL,
        size ENUM ('small', 'medium', 'large') NOT NULL,
        status ENUM ('available', 'adopted') NOT NULL DEFAULT 'available',
        description TEXT NULL
    );

CREATE TABLE
    IF NOT EXISTS adoptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        pet_id INT NOT NULL,
        adoption_date DATE NOT NULL,
        -- Restrições de foreign key
        CONSTRAINT fk_adoption_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
        CONSTRAINT fk_adoption_pet FOREIGN KEY (pet_id) REFERENCES pets (id) ON DELETE CASCADE,
        -- Um usuário não pode adotar o mesmo pet mais de uma vez
        CONSTRAINT uq_user_pet UNIQUE (user_id, pet_id)
    );

INSERT INTO
    users (name, email, password, phone, role)
VALUES
    (
        'Administrador',
        'admin@gmail.com',
        '123123',
        '(54) 99999-1111',
        'admin'
    ),
    (
        'Adotante',
        'adotante@gmail.com',
        '123123',
        '(54) 99999-2222',
        'adopter'
    );

INSERT INTO
    pets (name, age, species, size, status, description)
VALUES
    (
        'Thor',
        2,
        'dog',
        'medium',
        'available',
        'Cãozinho muito dócil e brincalhão, ideal para casas com espaço.'
    ),
    (
        'Luna',
        1,
        'cat',
        'small',
        'available',
        'Gatinha castrada, vacinada e muito carinhosa.'
    ),
    (
        'Mel',
        4,
        'dog',
        'large',
        'available',
        'Cadela de porte grande, excelente para guarda e companhia.'
    );