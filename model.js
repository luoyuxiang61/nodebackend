const Sequelize = require('sequelize')

module.exports.baseLayerField = {

  FieldName: {
    type: Sequelize.STRING
  },
  Alias: {
    type: Sequelize.STRING
  },
  DisplayName: {
    type: Sequelize.STRING
  },
  IsDisplay: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  IsSearch: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  UnitName: {
    type: Sequelize.STRING
  },
  IsShowMuFormSquareMeters: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  LayerId: {
    type: Sequelize.INTEGER
  },
  LayerName: {
    type: Sequelize.STRING
  },
  SortCode: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  IsLabel: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
}

module.exports.baseMapLayer = {
  Id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  ParentId: {
    type: Sequelize.INTEGER
  },
  LayerName: {
    type: Sequelize.STRING
  },
  DisplayName: {
    type: Sequelize.STRING
  },
  ServiceUrl: {
    type: Sequelize.STRING
  },
  LayerType: {
    type: Sequelize.STRING
  },
  TokenUserName: {
    type: Sequelize.STRING
  },
  TokenPassword: {
    type: Sequelize.STRING
  },
  TokenURL: {
    type: Sequelize.STRING
  },
  IsVisble: {
    type: Sequelize.STRING,
    defaultValue: 1
  },
  Opacity: {
    type: Sequelize.DECIMAL(18, 2),
    defaultValue: 1.0
  },
  SortCode: {
    type: Sequelize.INTEGER
  },
  IsLegend: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  CacheName: {
    type: Sequelize.STRING
  },
  MobileServiceUrl: {
    type: Sequelize.STRING
  },
  IsShowInMobile: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
}

module.exports.user = {
  UserName: {
    type: Sequelize.STRING
  },
  Password: {
    type: Sequelize.STRING
  }
}

module.exports.group = {
  name: {
    type: Sequelize.STRING
  }
}

module.exports.bookmark = {
  name: {
    type: Sequelize.STRING
  },
  x: {
    type: Sequelize.DECIMAL(6, 2)
  },
  y: {
    type: Sequelize.DECIMAL(6, 2)
  }

}










// var SequelizeAuto = require('sequelize-auto')
// var auto = new SequelizeAuto('Silverlight_NETDA', 'sa', 'Luoyuxiang61.', {
//     host: 'localhost',
//     dialect: 'mssql',
//     directory: false, // prevents the program from writing to disk
//     port: '1433',
//     additional: {
//         timestamps: false
//     },
//     tables: ['BaseLayerField']
// })

// auto.run(function (err) {
//     if (err) throw err;

//     console.log(auto.tables); // table list
//     console.log(auto.foreignKeys); // foreign key list
// });