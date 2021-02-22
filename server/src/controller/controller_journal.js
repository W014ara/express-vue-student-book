const db = require('../db');

class Controller_journal{
    //Просмотр записей журнала по студенту
    async get_journal_by_id(req, res){
        const student_info={
            surname: req.body.surname,
            name: req.body.name,
            second_name: req.body.second_name
        };
        const result = await db.query(`
        SELECT DISTINCT
        t3.student_id,
        student.surname,
        student.name as student_name,
        student.second_name,
        t3.short_name,
        t3.value,
        t3.name as mark_name,
        study_group.name as group_name FROM student
        INNER JOIN journal
        ON student.id = journal.student_id
        INNER JOIN
        (SELECT mark.value, t2.short_name, t2.student_id, mark.name FROM mark INNER JOIN (SELECT subject.short_name, t1.student_id, t1.mark_id FROM subject INNER JOIN
        (SELECT study_plan.subject_id, journal.student_id, journal.mark_id FROM study_plan INNER JOIN journal
        ON study_plan.id = journal.study_plan_id) as t1 ON subject.id = t1.subject_id) as t2 ON t2.mark_id = mark.id) as t3
        ON t3.student_id = student.id
        INNER JOIN study_group ON student.study_group_id = study_group.id
        AND student.surname=$1
        AND student.name=$2
        AND student.second_name=$3 ORDER BY t3.student_id`, [student_info.surname, student_info.name, student_info.second_name]);
        res.json(result.rows);
    }


    //Просмотр записей журнала
    async get_journal(req, res){
        const result = await db.query(`
        SELECT DISTINCT
        t3.student_id,
        student.surname,
        student.name as student_name,
        student.second_name,
        t3.short_name,
        t3.value,
        t3.name as mark_name,
        study_group.name as group_name FROM student
        INNER JOIN journal
        ON student.id = journal.student_id
        INNER JOIN
        (SELECT mark.value, t2.short_name, t2.student_id, mark.name FROM mark INNER JOIN (SELECT subject.short_name, t1.student_id, t1.mark_id FROM subject INNER JOIN
        (SELECT study_plan.subject_id, journal.student_id, journal.mark_id FROM study_plan INNER JOIN journal
        ON study_plan.id = journal.study_plan_id) as t1 ON subject.id = t1.subject_id) as t2 ON t2.mark_id = mark.id) as t3
        ON t3.student_id = student.id
        INNER JOIN study_group ON student.study_group_id = study_group.id ORDER BY t3.student_id`);
        res.json(result.rows);
    }

    //Просмотр записей журнала по группе
    async get_journal_by_group(req, res){
        const group_name = req.body.group;
        const result = await db.query(`
        SELECT DISTINCT
        t3.student_id,
        student.surname,
        student.name as student_name,
        student.second_name,
        t3.short_name,
        t3.value,
        t3.name as mark_name,
        study_group.name as group_name FROM student
        INNER JOIN journal
        ON student.id = journal.student_id
        INNER JOIN
        (SELECT mark.value, t2.short_name, t2.student_id, mark.name FROM mark INNER JOIN (SELECT subject.short_name, t1.student_id, t1.mark_id FROM subject INNER JOIN
        (SELECT study_plan.subject_id, journal.student_id, journal.mark_id FROM study_plan INNER JOIN journal
        ON study_plan.id = journal.study_plan_id) as t1 ON subject.id = t1.subject_id) as t2 ON t2.mark_id = mark.id) as t3
        ON t3.student_id = student.id
        INNER JOIN study_group ON student.study_group_id = study_group.id
        AND study_group.name=$1 ORDER BY t3.student_id`, [group_name]);
        res.json(result.rows);
    }

    //Редактирование оценок в журнале
    async edit_mark(req, res){
        const markId = req.params.markid;
        const journalID = req.params.mainid;
        const result = await db.query(`UPDATE journal SET mark_id=$1 WHERE journal.id=$2 RETURNING *`, [markId, journalID]);
        res.json(result.rows);
    }

    //Вывод типа зачета/экзамена
    async get_exam_type(req, res){
        const result = await db.query(`
        SELECT t1.short_name, t1.name, exam_type.type FROM (SELECT subject.name, subject.short_name, study_plan.exam_type_id
        FROM subject
        INNER JOIN study_plan ON subject.id = study_plan.subject_id) as t1
        INNER JOIN exam_type ON exam_type.id = t1.exam_type_id ORDER BY t1.short_name`);
        res.json(result.rows);
    }

    //Вывод задолжностей по каждому из студентов
    async get_fails(req, res){
        const result = await db.query(`
        SELECT t1.id, t1.surname, t1.name, t1.second_name, t1.group, COUNT(t1.mark_id) FROM (SELECT student.id, student.surname, student.name, student.second_name, study_group.name as group, journal.mark_id
        FROM student INNER JOIN journal ON journal.student_id = student.id INNER JOIN study_group ON study_group.id = student.study_group_id
        WHERE journal.mark_id=4 OR journal.mark_id=7 OR journal.mark_id=6) as t1
        GROUP BY t1.id, t1.surname, t1.name, t1.second_name, t1.group`);
        res.json(result.rows);
    }
}

module.exports = new Controller_journal();