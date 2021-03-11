const Router = require('express');
const router = new Router();
const studentController = require('../controller/controller_students.js');
const controller_groups = require('../controller/controller_groups.js');
const controller_journal = require('../controller/controller_journal.js');


router.put('/students/surname/:surname/name/:name/secondname/:secondname/group_name/:group_name', studentController.create_student);
router.get('/students/all', studentController.get_all_students);
router.get('/students/:id', studentController.get_student_by_id);
router.get('/students/group/:group', studentController.get_student_by_group);
router.get('/students/', studentController.getstudent_and_group);
router.post('/students/surname/:surname/name/:name/secondname/:secondname/group_name/:group_name/id/:student_id', studentController.change_student);
router.put('/student/', studentController.change_student_group);
router.delete('/students/del/:id', studentController.remove_student);

router.get('/groups/all', controller_groups.get_groups);
router.get('/groups/:name', controller_groups.get_group);
router.post('/groups/edit/old/:old/new/:new', controller_groups.edit_group);
router.put('/groups/add/:name', controller_groups.create_group);
router.delete('/groups/remove/:name', controller_groups.remove_group)

router.get('/journal/all', controller_journal.get_journal);
router.post('/journal/student', controller_journal.get_journal_by_id);
router.post('/journal/group', controller_journal.get_journal_by_group);
router.post('/journal/edit/markid/:markid/journalid/:mainid', controller_journal.edit_mark);
router.get('/journal/type', controller_journal.get_exam_type);
router.get('/journal/fails', controller_journal.get_fails);

module.exports = router;