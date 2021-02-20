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
        AND student.surname=$1
        AND student.name=$2
        AND student.second_name=$3`, [student_info.surname, student_info.name, student_info.second_name]);
        res.json(result.rows);
    }


    //Просмотр записей журнала
    async get_journal(req, res){
        const result = await db.query(`
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
        INNER JOIN study_group ON student.study_group_id = study_group.id`);
        res.json(result.rows);
    }

    //Просмотр записей журнала по группе
    async get_journal_by_group(req, res){
        const group_name = req.body.group;
        const result = await db.query(`
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
        AND study_group.name=$1`, [group_name]);
        res.json(result.rows);
    }

    //Редактирование оценок в журнале
    async edit_mark(req, res){
        const markId = req.params.markid;
        const journalID = req.params.mainid;
        const result = await db.query(`UPDATE journal SET mark_id=$1 WHERE journal.id=$2 RETURNING *`, [markId, journalID]);
        res.json(result.rows);
    }
}

module.exports = new Controller_journal();