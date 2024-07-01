CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
BEGIN
    INSERT INTO "admin" (token, name) VALUES 
    (encode(gen_random_bytes(16), 'hex'), 'Vitor Arruda'),
    (encode(gen_random_bytes(16), 'hex'), 'Kenji Taniguchi');

    INSERT INTO corrector (id, name) VALUES 
    (1, 'Cesar Faustino'),
    (2, 'Adrian Roger'),
    (3, 'Carlos Eduardo');

    INSERT INTO correction (corrector_id, class, module, meeting, student) VALUES
    (1, 'Turma 5', 'Typescript', 'Aula 5', 'Murilo'),
    (1, 'Turma 5', 'Banco de dados', 'Aula 7', 'Victor'),
    (2, 'Turma 5', 'Typescript', 'Aula 6', 'Ligia'),
    (3, 'Turma 5', 'React', 'Aula 3', 'Eric');
END $$;