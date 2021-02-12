module.exports = function queries() {
    return { query: `
    CREATE TABLE study_group (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
    );
    CREATE TABLE subject (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            short_name TEXT NOT NULL
    );
    CREATE TABLE exam_type (
            id SERIAL PRIMARY KEY,
            type TEXT NOT NULL
    );
    CREATE TABLE mark (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            value TEXT NOT NULL
    );
    CREATE TABLE student (
            id SERIAL PRIMARY KEY,
            surname TEXT NOT NULL,
            name TEXT NOT NULL,
            second_name TEXT NOT NULL,
            study_group_id INT NOT NULL,
            foreign key (study_group_id) references study_group(id)
    );
    CREATE TABLE study_plan (
            id SERIAL PRIMARY KEY,
            subject_id INT,
            exam_type_id INT,
            foreign key (subject_id) references subject(id),
            foreign key (exam_type_id) references exam_type(id)
    );
    CREATE TABLE journal (
            id INT NOT NULL,
            student_id INT,
            study_plan_id INT,
            in_time INT,
            count INT,
            mark_id INT,
            foreign key (student_id) references student(id),
            foreign key (study_plan_id) references study_plan(id),
            foreign key (mark_id) references mark(id)
    );
    INSERT INTO study_group (name) values ( 'ИКБО-06-17' );
    INSERT INTO study_group (name) values ( 'ИКБО-07-17' );
    INSERT INTO study_group (name) values ( 'ИКБО-09-17' );
    INSERT INTO study_group (name) values ( 'ИКБО-11-17' );
    INSERT INTO study_group (name) values ( 'ИКБО-12-17' );
    INSERT INTO student (surname, name, second_name, study_group_id) VALUES ( 'Безрук', 'Владислав', 'Вячеславович', 4);
    INSERT INTO student (surname, name, second_name, study_group_id) VALUES ( 'Семёнов', 'Георгий', 'Заалович', 4);
    INSERT INTO student (surname, name, second_name, study_group_id) VALUES ( 'Алиев', 'Юнус', 'Алиевич', 4);
    INSERT INTO student (surname, name, second_name, study_group_id) VALUES ( 'Крутяков', 'Антон', 'Викторович', 5);
    INSERT INTO student (surname, name, second_name, study_group_id) VALUES ( 'Иванов', 'Сергей', 'Анатольевич', 3);
    INSERT INTO student (surname, name, second_name, study_group_id) VALUES ( 'Васильев', 'Александр', 'Евгеньевич', 2);
    INSERT INTO student (surname, name, second_name, study_group_id) VALUES ( 'Васильев', 'Петр', 'Евгеньевич', 1);
    INSERT INTO subject (name, short_name) VALUES ( 'Проектирование информационных систем', 'ПрИС' );
    INSERT INTO subject (name, short_name) VALUES ( 'Системы искусственного интеллекта', 'СИИ' );
    INSERT INTO subject (name, short_name) VALUES ( 'Программная инженерия', 'ПИ' );
    INSERT INTO subject (name, short_name) VALUES ( 'Национальная система информационной безопасности', 'НСИБ' );
    INSERT INTO subject (name, short_name) VALUES ( 'Системный анализ', 'СисАнал' );
    INSERT INTO subject (name, short_name) VALUES ( 'Распределенные базы данных', 'РБД' );
    INSERT INTO subject (name, short_name) VALUES ( 'Системное программное обеспечение', 'СПО' );
    INSERT INTO exam_type (id, type) VALUES ( 1, 'Экзамен' );
    INSERT INTO exam_type (id, type) VALUES ( 2, 'Зачет' );
    INSERT INTO exam_type (id, type) VALUES ( 3, 'Зачет с оценкой' );
    INSERT INTO exam_type (id, type) VALUES ( 4, 'Курсовая' );
    INSERT INTO study_plan (id, subject_id, exam_type_id) VALUES ( 1,1,1 );
    INSERT INTO study_plan (id, subject_id, exam_type_id) VALUES ( 2,1,4 );
    INSERT INTO study_plan (id, subject_id, exam_type_id) VALUES ( 3,2,1 );
    INSERT INTO study_plan (id, subject_id, exam_type_id) VALUES ( 4,3,1 );
    INSERT INTO study_plan (id, subject_id, exam_type_id) VALUES ( 5,4,2 );
    INSERT INTO study_plan (id, subject_id, exam_type_id) VALUES ( 6,5,1 );
    INSERT INTO study_plan (id, subject_id, exam_type_id) VALUES ( 7,6,2 );
    INSERT INTO study_plan (id, subject_id, exam_type_id) VALUES ( 8,7,1 );
    INSERT INTO mark (id, name, value) values ( 1, 'Отлично', 5 );
    INSERT INTO mark (id, name, value) values ( 2, 'Хорошо', 4 );
    INSERT INTO mark (id, name, value) values ( 3, 'Удовлетворительно', 3 );
    INSERT INTO mark (id, name, value) values ( 4, 'Неудовлетворительно', 2 );
    INSERT INTO mark (id, name, value) values ( 5, 'Зачет', 'з' );
    INSERT INTO mark (id, name, value) values ( 6, 'Незачет', 'н' );
    INSERT INTO mark (id, name, value) values ( 7, 'Неявка', '' );
    SELECT student.id, student.surname, student.name, student.second_name, sg.name FROM STUDENT inner join study_group sg on student.study_group_id = sg.id;
    `
    }
}