USE pets_db;

INSERT INTO
    users (name, email, password, phone, role)
VALUES
    (
        'Administrador',
        'admin@gmail.com',
        '$2b$10$/5/nPQVAIfPFmu2roe307ePdx/OncBetAwA7Jnbh77/h6RUG6znDy',
        '(54) 99999-1111',
        'admin'
    ),
    (
        'Adotante',
        'adotante@gmail.com',
        '$2b$10$/5/nPQVAIfPFmu2roe307ePdx/OncBetAwA7Jnbh77/h6RUG6znDy',
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