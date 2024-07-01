CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
BEGIN
    INSERT INTO "admin" (token, name) VALUES 
    (encode(gen_random_bytes(16), 'hex'), 'Vitor Arruda'),
    (encode(gen_random_bytes(16), 'hex'), 'Kenji Taniguchi');

    INSERT INTO corrector (name) VALUES 
    ('Cesar Faustino'),
    ('Adrian Roger'),
    ('Carlos Eduardo');

    INSERT INTO corrections (corrector_id, class, module, meeting, student) VALUES
    (1, 'Turma 5', 'Typescript', 'Aula 5', 'Murilo'),
    (1, 'Turma 5', 'Banco de dados', 'Aula 7', 'Victor'),
    (2, 'Turma 5', 'Typescript', 'Aula 6', 'Ligia'),
    (3, 'Turma 5', 'React', 'Aula 3', 'Eric');
END $$;