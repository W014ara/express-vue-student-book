module.exports ={
    server: {
        server_port: 5000
    },
    db: {
        host: '127.0.0.1',
        port: 5432,
        database: 'student-book',
        user: 'postgres',
        password: '12345678',
        max: 30
    },
    bus:{
        brigade: "20",
        init: {"from":`20`,"to":"dean","subject":"INIT_INSTANCE","data":null},
        subscribe: {"from":`20`,"to":"dean","subject":"UPDATE_SUBSCRIPTION","data":"{\"20\":\"testuser\",\"entityName\":\"student\",\"type\":\"COMMON\"}"},
        create_post: function(id, surname, name, second_name, study_group_id){
            return {"from":"20","to":"dean","subject":"ADD_ROW",
            "data":`{\"isBinariesChanged\":false,\"entityName\":\"student\",\"plainData\":{\"id\":${id},\"surname\":\"${surname}\",\"name\":\"${name} \",\"second_name\":\"${second_name} \",\"study_group_id\":${Number(study_group_id)},\"study_group\":null},\"binaryLinks\":{}}`}}
    }
}