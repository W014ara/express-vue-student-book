const db = require('../db');

class Controller_students{
    //Добавление студента
    async create_student(req, res){
        const userData = {
            surname: req.params.surname,
            name: req.params.name,
            secondname: req.params.secondname,
            group_name: req.params.group_name
        }
        const result = await db.query(`INSERT INTO student (surname, name, second_name, study_group_id) VALUES
        ($1, $2, $3, (SELECT study_group.id FROM study_group WHERE study_group.name = $4))
        RETURNING *`, [userData.surname, userData.name, userData.secondname, userData.group_name]);
        res.json(result.rows);
    }

    //Просмотр всех студентов
    async get_all_students(req, res){
        const students = await db.query('SELECT * FROM student');
        res.json(students.rows);
    }

    //Просмотр студента по id
    async get_student_by_id(req, res){
        const studentID = req.params.id;
        const result = await db.query('SELECT * FROM student WHERE id = $1', [studentID]);
        res.json(result.rows);
    }

    //Просмотр студентов по группе
    async get_student_by_group(req, res){
        const studentGroup = req.params.group;
        const result = await db.query(`SELECT student.id, student.surname, student.name, student.second_name, study_group.name  FROM student
        INNER JOIN study_group
        ON student.study_group_id = study_group.id AND study_group.name = $1`, [studentGroup]);
        res.json(result.rows);
    }

    //Редактирование студента
    async change_student(req, res){
        const userData = {
            surname: req.params.surname,
            name: req.params.name,
            secondname: req.params.secondname,
            group_name: req.params.group_name,
            student_id: req.params.student_id
        }
        const result = await db.query(`UPDATE student SET surname=$1, name=$2, second_name=$3, study_group_id = (SELECT id FROM study_group WHERE study_group.name = $4)
        WHERE student.id=$5
        RETURNING *`, [userData.surname, userData.name, userData.secondname, userData.group_name, userData.student_id]);
        res.json(result.rows);
    }

    async change_student_group(req, res){
        const userData = {
            us_id: req.body.id,
            gr_id: req.body.grId
        }
        const result = await db.query(`UPDATE student SET study_group_id=$1 WHERE student.id=$2`, [userData.us_id, userData.gr_id])
        res.json(result.rows);
    }

    //Удаление студента
    async remove_student(req, res){
        const studentID = req.params.id;
        const result = await db.query('DELETE FROM student WHERE id = $1 RETURNING *', [studentID]);
        res.json(result.rows);
    }

    async getstudent_and_group(req, res){
        const result = await db.query(`SELECT student.id as id, CONCAT(surname,' ',student.name,' ',second_name) as fullname, study_group.name FROM student INNER JOIN study_group ON study_group.id = student.study_group_id`);
        res.json(result.rows);
    }
}

module.exports = new Controller_students();