const db = require('../db');

class Controller_journal{
    //Просмотр записей журнала по студенту
    async get_journal_by_id(req, res){
        const student_id = req.params.id;
        const result = await db.query(`SELECT journal.id, journal.student_id, journal.study_plan_id, journal.in_time, journal.count, journal.mark_id
        FROM journal  INNER JOIN student ON journal.student_id = student.id AND journal.student_id = $1`, [student_id]);
        res.json(result.rows);
    }


    //Просмотр записей журнала
    async get_journal(req, res){
        const result = await db.query(`SELECT * FROM journal`);
        res.json(result.rows);
    }

    //Просмотр записей журнала по группе
    async get_journal_by_group(req, res){
        const group_name = req.params.group;
        const result = await db.query(`SELECT * FROM journal
        INNER JOIN (SELECT student.id as id, student.name as name, study_group.name as group  FROM student INNER JOIN study_group ON student.study_group_id = study_group.id AND study_group.name=$1) 
        as tmp
        ON journal.student_id = tmp.id`, [group_name]);
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