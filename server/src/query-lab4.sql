--Получение информации о студенте в журнале
SELECT DISTINCT
t3.student_id,
student.surname,
student.name,
student.second_name,
t3.short_name,
t3.value,
t3.name,
study_group.name FROM student
INNER JOIN journal
ON student.id = journal.student_id
INNER JOIN
(SELECT mark.value, t2.short_name, t2.student_id, mark.name FROM mark INNER JOIN (SELECT subject.short_name, t1.student_id, t1.mark_id FROM subject INNER JOIN
(SELECT study_plan.subject_id, journal.student_id, journal.mark_id FROM study_plan INNER JOIN journal
ON study_plan.id = journal.study_plan_id) as t1 ON subject.id = t1.subject_id) as t2 ON t2.mark_id = mark.id) as t3
ON t3.student_id = student.id
INNER JOIN study_group ON student.study_group_id = study_group.id
AND student.surname="Олегов"
AND student.name="Олег"
AND student.second_name="Олегович"


--Аналог выше
SELECT t1.id, t1.short_name, t1.in_time, t1.count, t1.count, t1.mark_name, t1.surname, t1.name, t1.second_name, t1.group_name FROM (select journal.id, (select short_name from subject where journal.study_plan_id = subject.id), journal.in_time, journal.count, (select name from mark where id = journal.mark_id
) as mark_name, student.surname, student.name, student.second_name, (select name from study_group where id = student.study_group_id) as group_name from journal inner join student on 
student.id = journal.student_id) as t1 WHERE t1.group_name='ИКБО-11-17'


--Предметы, у который тип экзамена - что-то
SELECT t1.id, t1.short_name, exam_type.type FROM exam_type INNER JOIN (SELECT subject.id, subject.short_name, study_plan.exam_type_id
FROM subject INNER JOIN study_plan ON study_plan.subject_id = subject.id) as t1 ON exam_type.id = t1.exam_type_id AND exam_type.type="Экзамен"


--Тип аттестации
SELECT t1.short_name, t1.name, exam_type.type FROM (SELECT subject.name, subject.short_name, study_plan.exam_type_id
FROM subject
INNER JOIN study_plan ON subject.id = study_plan.subject_id) as t1
INNER JOIN exam_type ON exam_type.id = t1.exam_type_id ORDER BY t1.short_name

--Вывод всех студентов с долгами
SELECT student.id, student.surname, student.name, student.second_name, journal.mark_id FROM student
INNER JOIN journal ON journal.student_id = student.id WHERE journal.mark_id=4 OR journal.mark_id=7 OR journal.mark_id=6

--Количество пересдач по каждому студенту
SELECT t1.id, t1.surname, t1.name, t1.second_name, t1.group, COUNT(t1.mark_id) FROM (SELECT student.id, student.surname, student.name, student.second_name, study_group.name as group, journal.mark_id
FROM student INNER JOIN journal ON journal.student_id = student.id INNER JOIN study_group ON study_group.id = student.study_group_id
WHERE journal.mark_id=4 OR journal.mark_id=7 OR journal.mark_id=6) as t1
GROUP BY t1.id, t1.surname, t1.name, t1.second_name, t1.group

--Вывод студентов по группам
SELECT student.id, CONCAT(surname,' ',student.name,' ',second_name) as fullname, study_group.name, study_group.id FROM student INNER JOIN study_group ON study_group.id = student.study_group_id

--Обновление группы у студентов
UPDATE student SET study_group_id=3 WHERE student.id=5