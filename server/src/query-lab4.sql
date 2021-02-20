--Получение информации о студенте в журнале
SELECT DISTINCT
t3.student_id,
student.surname,
student.name,
student.second_name,
t3.short_name,
t3.value,
study_group.name FROM student
INNER JOIN journal
ON student.id = journal.student_id
INNER JOIN
(SELECT mark.value, t2.short_name, t2.student_id FROM mark INNER JOIN (SELECT subject.short_name, t1.student_id, t1.mark_id FROM subject INNER JOIN
(SELECT study_plan.subject_id, journal.student_id, journal.mark_id FROM study_plan INNER JOIN journal
ON study_plan.id = journal.study_plan_id) as t1 ON subject.id = t1.subject_id) as t2 ON t2.mark_id = mark.id) as t3
ON t3.student_id = student.id
INNER JOIN study_group ON student.study_group_id = study_group.id
AND student.surname="Олегов"
AND student.name="Олег"
AND student.second_name="Олегович"




--Предметы, у который тип экзамена - что-то
SELECT t1.id, t1.short_name, exam_type.type FROM exam_type INNER JOIN (SELECT subject.id, subject.short_name, study_plan.exam_type_id
FROM subject INNER JOIN study_plan ON study_plan.subject_id = subject.id) as t1 ON exam_type.id = t1.exam_type_id AND exam_type.type="Экзамен"