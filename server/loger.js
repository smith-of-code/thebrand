const fs = require('fs');

const dictionary ={
    add: 'добавление товара',
    change: 'изменение колличеста',
    dlt: 'удаление товара',
};

const log = (action )=>{
    const time = new Date();
    const timeAction = time.toString();
    const nameAction = dictionary[action];
    // const nameItem =
    const itemLog = {
        time: timeAction,
        operation: nameAction,
        // itemID: 111,
        // itemName: 'notebook'
    };

    fs.readFile('./db/stats.json','utf-8', (err,data) => {
        console.log(data);
        if (!err) {
            const newLog = JSON.parse(data);
            console.log(newLog);
            newLog.push(itemLog);
            fs.writeFile('./db/stats.json', JSON.stringify(newLog, null, 4), (err) => {
                if (!err) {
                    console.log('лог записан')
                }
            })
        }
    })

};



module.exports = {
    log,
};