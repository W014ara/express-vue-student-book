const db = require('../db');

class Controller_groups{
    //Просмотр группы
    async get_group(req, res){
        const groupName = req.params.name;
        const result = await db.query(`SELECT * FROM study_group INNER JOIN student ON study_group.id = student.study_group_id AND study_group.name = $1`, [groupName]);
        res.json(result.rows);
    }


    //Просмотр всех групп
    async get_groups(req, res){
        const result = await db.query(`SELECT * FROM study_group`);
        res.json(result.rows);
    }

    //Редактирование группы
    async edit_group(req, res){
        const groupNew = req.params.new;
        const groupOld = req.params.old;
        const result = await db.query(`UPDATE study_group SET name=$1 WHERE study_group.name=$2 RETURNING *`, [groupNew, groupOld]);
        res.json(result.rows);
    }

    //Добавление группы
    async create_group(req, res){
        const groupName = req.params.name;
        const result = await db.query(`INSERT INTO study_group (name) VALUES($1) RETURNING *`, [groupName]);
        res.json(result.rows);
    }

    //Удаление группы
    async remove_group(req, res){
        const groupName = req.params.name;
        const result = await db.query(`DELETE FROM study_group WHERE name=$1 RETURNING *`, [groupName]);
        res.json(result.rows);
    }
}

module.exports = new Controller_groups();