const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

const validateURl =  function(value){
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

const validateImage = function(value){
  return /(.jpg|.jpeg|.png|.webp|.gif)$/i.test(value);
}

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: 'Se requiere un nombre'
        },
        len: {
          args: [[10, 67]],
          msg: 'El nombre debe contener entre 10 y 67 caracteres'
        }
      }
    },
    description: {
      type: DataTypes.TEXT
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Se requiere un stock"
        },
        isInt: {
          msg: "El stock sebe ser un número entero"
        },
        min: {
          args: [0],
          msg: "El stock no puede ser menor a 0"
        },
        max:{
          args: [99999],
          msg: "El stock no puede ser superior a 5 dígitos"
        }
      }
    },
    price: {
      type: DataTypes.DECIMAL(9,2),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Se requiere un precio',
        },
        isDecimal: {
          msq: 'El precio debe contener sus decimales (centavos), de ser un precio redondeado, puede incluir "00"'
        },
        min: {
          args: [0],
          msq: 'El precio no puede ser menor que 0,00'
        },
        max: {
          args: [999999999],
          msg: "El precio no puede contener más de 9 dígitos delante de la coma."
        }
      }
    },
    images: {
      type: DataTypes.TEXT, // JSON.,
      allowNull:false,
      validate: {
        notNull: true,
        isArray(value){
          let imgs = JSON.parse(value);
          if(!Array.isArray(imgs)){
            throw new Error('El campo "images" debe ser un array.');
          }
        },
        arrayIsNotEmpty(value){
          let imgs = JSON.parse(value);
          if(Array.isArray(imgs) && imgs.length < 1){
            throw new Error('Se requiere como mínimo una imagen o foto.');
          }
        },
        arrayMax(){
          let imgs = JSON.parse(value);
          if(Array.isArray(imgs) && imgs.length > 10){
            throw new Error('Se admiten como máximo hasta 10 imágenes o fotos.');
          }
        },
        allAreImages(value){
          let imgs = JSON.parse(value);
          if(Array.isArray(imgs)){
            imgs.forEach(function(item, index){
              if(!validateImage(item)){
                let n = index + 1;
                throw new Error('Los formatos permitidos para las imagenes o fotos son: .jpg|.jpeg|.png|.webp|.gif');
              }
            })
          }
        },
        allAreURL(value){
          let imgs = JSON.parse(value);
          if(Array.isArray(imgs)){
            imgs.forEach(function(item, index){
              if(!validateURl(item)){
                let n = index + 1;
                throw new Error('La imagen o foto #'+ n +' debe ser una URL.');
              }
            })
          }
        }
      }
    }
  });
};