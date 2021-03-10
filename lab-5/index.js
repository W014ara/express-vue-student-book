const __express = require('express');
const __axios = require('axios').default;
const __cors = require('cors');
const __colors = require('colors');
const __config = require('./src/config');
const db = require('./src/db');

const app = __express();
app.use(__cors());
app.use(__express.json());


async function get_students(){
    const result = await db.query(`SELECT * FROM student`);
    let obj = result.rows;
    return obj.map(elem =>{
        elem['secondName'] = elem['second_name'];
        elem['studyGroupId'] = elem['study_group_id'];
        delete elem['second_name'];
        delete elem['study_group_id'];
        return elem;
    })
}

app.listen(__config.server.server_port, () => {
    console.log(`Server has been started on ` + __colors.green(`http://localhost:${__config.server.server_port}`));
    let elem = get_students();
    elem.then(res => {
        __axios.post('https://up-lab1.mirea.ru/bus', __config.bus.init);
        __axios.post('https://up-lab1.mirea.ru/bus', __config.bus.subscribe);
        for(let index = 0; index < res.length; ++index){
            __axios.post('https://up-lab1.mirea.ru/bus', __config.bus.create_post(res[index].id, res[index].surname, res[index].name, res[index].secondName, res[index].studyGroupId));
        }
    });
    setInterval(() => {
        __axios.get(`https://up-lab1.mirea.ru/bus?to=${__config.bus.brigade}&after=${Date.now()}`).then((response) => {
            console.log(`Запрос успешно прошел. Результат:`)
            for(let elem of response.data){
                console.log(elem);
            }
        }).catch((error) => {
            console.log(`Ошибка! ${error.message}`);
        })
    }, 3000);
});