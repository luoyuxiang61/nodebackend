const express = require('express')
var app = express()
const bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const Sequelize = require('sequelize');
const sequelize = new Sequelize('Contract', 'sa', 'Luoyuxiang61.', {
    host: 'localhost',
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00'
});
const { gt, lte, ne, in: opIn } = Sequelize.Op;
const Op = Sequelize.Op;

var co = require('co')



sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


//用户Model（用户名，密码，真实姓名，角色）
const User = sequelize.define('User', {
    UserName: {
        type:Sequelize.STRING,
        allowNull:false
    }, 
    Password: {
        type: Sequelize.STRING,
        allowNull:false
    },
    RealName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Role: {
        type: Sequelize.STRING,
        allowNull:false
    }
},
    {
        tableName: 'User',
        paranoid: true
    })


//建设单位Model
const JSDW = sequelize.define('JSDW', {
    Name: {
        type: Sequelize.STRING,
        allowNull:false
    },
    Address: {
        type: Sequelize.STRING,
        allowNull:true
    },
    Email: {
        type: Sequelize.STRING,
        allowNull:true
    },
    LinkMan: {
        type: Sequelize.STRING,
        allowNull:true
    },
    PhoneNumber: {
        type: Sequelize.STRING,
        allowNull:true
    }
},
    {
        tableName: 'JSDW',
        paranoid: true
    })

//施工单位Model
const SGDW = sequelize.define('SGDW', {
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    LinkMan: {
        type: Sequelize.STRING,
        allowNull: true
    },
    PhoneNumber: {
        type: Sequelize.STRING,
        allowNull: true
    }
},
    {
        tableName: 'SGDW',
        paranoid: true
    })






//合同Model(创建日期、修改日期和删除日期字段是sequelize自动的)
const Contract = sequelize.define('Contract', {
    ProjectName: {
        type: Sequelize.STRING,
        allowNull:false       
    },
    Sign_Date: {
        type:Sequelize.DATEONLY,
        allowNull:false
    },
    ContractNO: {
        type: Sequelize.STRING,
        allowNull:false
    },
    ContractAmount: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull:false
    },
    AmountPaid: {
        type: Sequelize.DECIMAL(10, 4),
        allowNull:false,
        defaultValue:0
    },
    Remark: {
        type: Sequelize.STRING,
        allowNull:true
    },
    Operator: {
        type: Sequelize.STRING,
        allowNull:true
    },
    WayOfEntrusting: {
        type: Sequelize.STRING,
        allowNull:true
    },
    RelatedMaterials: {
        type: Sequelize.STRING,
        allowNull:true
    },
    ContractType: {
        type: Sequelize.STRING,
        allowNull:true
    },
    Create_User: {
        type: Sequelize.STRING,
        allowNull:false,
        defaultValue:"admin"
    },
    Modify_User: {
        type: Sequelize.STRING,
        allowNull:true
    },
    Status: {
        type:Sequelize.STRING
    }
},
    {
        tableName: 'Contract', 
        paranoid:true
    })

JSDW.hasMany(Contract);
SGDW.hasMany(Contract);
Contract.belongsTo(JSDW);
Contract.belongsTo(SGDW);




//付款计划Model
const PlanningOfPayment = sequelize.define('PlanningOfPayment', {
    PlanningDate: {
        type:Sequelize.DATEONLY,
        allowNull:false
    },
    PlanningAmount: {
        type: Sequelize.NUMERIC(10, 4),
        allowNull:false
    },
    LinkMan: {
        type: Sequelize.STRING,
        allowNull:false
    },
    PhoneNumber: {
        type: Sequelize.STRING,
        allowNull:false
    }
},
    {
        tableName: 'PlanningOfPayment',
        paranoid: true
    })


//付款记录Model
const RecordOfPayment = sequelize.define('RecordOfPayment', {
    RecordDate: {
        type:Sequelize.DATEONLY,
        allowNull:false
    },
    RecordAmount: {
        type: Sequelize.NUMERIC(10, 4),
        allowNull:false
    },
    Operator: {
        type: Sequelize.STRING,
        allowNull:false
    }
},
    {
        tableName: 'RecordOfPayment',
        paranoid: true
    })





// co(function* () {

//     var sgdw1 = yield SGDW.findById(4);
//     var cons = yield Contract.findAll({
//         where:{
//             id:{
//                 [Op.lte]:209
//             }
//         }
//     })

//     cons.forEach(element => {
//         element.setSGDW(sgdw1);
//     });




// }).catch(function (e) {
//     console.log(e);
// });









// co(function* () {




//     var sgdw = yield SGDW.findById(1);
//     var jsdw = yield JSDW.findById(1);



//     for(var i=0;i<150;i++){

//         var statusx="完成";
//         if(i%2==0)statusx="进行中";
//         if(i%3==0)statusx="超时未完成";
//         if(i%5==0)statusx="暂停";


//         var typex = "G";
//         if (i % 2 == 0)typex="H";
//         if (i % 5 == 0)typex="A";



//         var con = yield Contract.create({
//             ProjectName: "苏州吴中太湖新城市政基础设施工程中一路（中六路~塔韵路）、中二路（中六路~塔韵路）、中六路（友翔路~中二路）、中八路（友翔路~中三路）施工图设计",
//             Sign_Date: new Date(2006, 0, 12),
//             ContractNO: "G13-176-1",
//             ContractAmount: 454.2342+i*44.5,
//             AmountPaid: 254.4523+i*44.321,
//             Remark: "这是一个备注xxxxx",
//             Operator: "经办人",
//             WayOfEntrusting: "上会直接委托",
//             RelatedMaterials: "合同预审表，吴太办纪（2017）9号",
//             ContractType: typex,
//             Create_User: "一个用户",
//             Modify_User: '一个用户',
//             Status: statusx
//         })
//         yield con.setSGDW(sgdw);
//         yield con.setJSDW(jsdw);
//     }
// }).catch(function (e) {
//     console.log(e);
// });



function isEmptyObject(obj){
    for(var key in obj){
        return false;
    }
    return true;
}




app.post("/contracts", urlencodedParser, function (req, res){
    res.header("Access-Control-Allow-Origin", "*");

 

    var keys = req.body;


    if (!isEmptyObject(keys)){

        var sSGDW = keys.sSGDW;
        var sProjectName = keys.sProjectName;
        var sContractNO = keys.sContractNO;    


        co(function* () {
            var cons = yield Contract.findAll({
                include: [{
                    model: SGDW,
                    where: {
                        Name: {
                            [Op.like]: "%" + sSGDW + "%"
                        }
                    }
                }],
                where: {
                    ProjectName: {
                        [Op.like]: "%"+sProjectName+"%"
                    }
                }

            })


            res.send(cons)

        }).catch(function (e) {
            console.log(e);
        });

























    }else{
        co(function* () {

            var cons = yield Contract.findAll({
                include: [SGDW, JSDW]
            });

            var cs = [];

            for (var i = 0; i < cons.length; i++) {
                cs[i] = yield cons[i].get({ plain: true })
            }

            res.send(cs);
        }).catch(function (e) {
            console.log(e);
        });



    }

})


app.listen(3000)







