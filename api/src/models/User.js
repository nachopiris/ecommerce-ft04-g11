const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


const phoneRegularExpression = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Se requiere nombre completo'
        },
        len: {
          args: [[4, 255]],
          msg: 'El nombre debe contener entre 4 y 255 caracteres'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Se requiere un correo electrónico'
        },
        isEmail: {
          msg: 'El correo electrónico no es válido'
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        max: {
          args: [255],
          msg: 'La dirección no puede ser mayor a los 255 caracteres.'
        }
      }
    },
    role: {
      type: DataTypes.ENUM('admin','client'),
      allowNull: false,
      defaultValue: 'client',
      validate: {
        notNull: {
          msg: 'Se requiere un rol de usuario',
        },
        isIn: {
          args: [['client','admin']],
          msg: 'El rol de usuario no está permitio'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: [phoneRegularExpression],
          msg: 'El número de teléfono/celular no es válido'
        },
        len: {
          args: [[10,16]],
          msg: 'El número de teléfono/celular debe ser entre 10 y 16 caracteres'
        }
      }
    },
    doc_number: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: [/^([0-9])*$/],
          msg: 'El número de documento debe contener únicamente números'
        },
        len:{
          args: [[7,30]],
          msg: 'El documento debe contener entre 7 y 30 caracteres'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        len: {
          args: [[6,255]],
          msg: 'La contraseña no puede ser superior a 255 caracteres'
        }
      }
    },
    mustChangePassword: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }

  });
};