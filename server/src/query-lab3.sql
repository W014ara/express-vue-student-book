/*
    Студенты
*/

--Добавление студента
INSERT INTO student (surname, name, second_name, study_group_id) VALUES
($1, $2, $3, (SELECT study_group.id FROM study_group WHERE study_group.name = $4))
RETURNING *

--Просмотр всех студентов
SELECT * FROM student

--Просмотр студента по id
SELECT * FROM student WHERE id = $1

--Просмотр студентов по группе
SELECT * FROM student
INNER JOIN study_group
ON student.study_group_id = study_group.id AND study_group.name = $1

--Редактирование студента
UPDATE student SET surname=$1, name=$2, second_name=$3, study_group_id = (SELECT id FROM study_group WHERE study_group.name = $4)
WHERE student.id=$5
RETURNING *

--Удаление студента
DELETE FROM student WHERE id = $1 RETURNING *

----------------------------------------------------------------------------------------------------------------------------------------
/*
    Группы
*/
--Просмотр группы
SELECT * FROM study_group INNER JOIN student ON study_group.id = student.study_group_id AND study_group.name = $1

--Просмотр всех групп
SELECT * FROM study_group

--Редактирование группы
UPDATE study_group SET name=$1 WHERE study_group.name=$2 RETURNING *

--Добавление группы
INSERT INTO study_group (name) VALUES($1) RETURNING *

--Удаление группы
DELETE FROM study_group WHERE name=$1 RETURNING *

----------------------------------------------------------------------------------------------------------------------------------------
/*
    Журнал
*/
--Просмотр записей журнала по студенту
SELECT journal.id, journal.student_id, journal.student_plan_id, journal.in_time, journal.count, journal.mark_id
FROM journal  INNER JOIN student ON journal.student_id = student.id AND journal.student_id = $1

--Просмотр записей журнала
SELECT * FROM journal

--Просмотр записей журнала по группе
SELECT * FROM journal
INNER JOIN (SELECT student.id as id, student.name as name, study_group.name as group  FROM student INNER JOIN study_group ON student.study_group_id = study_group.id AND study_group.name=$1) 
as tmp ON journal.student_id = tmp.id

--Редактирование оценок в журнале
UPDATE journal SET mark_id=$1 WHERE journal.id=$2 RETURNING *