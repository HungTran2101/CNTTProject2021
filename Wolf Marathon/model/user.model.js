const db = require('../utils/db');
const user = 'user_info';
module.exports = {
    add: function(entity){
        return db.add(user,entity);
    }
};