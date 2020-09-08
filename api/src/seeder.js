const { Product, Category, User} = require('./db.js');

function productsSeeder()
{
    Product.bulkCreate([{
        name: 'Necromunda: Underhive Wars',
        description: 'Adéntrate en las ciudades colmena de Necromunda para dirigir, personalizar y aumentar tu banda en la subcolmena. Enfréntate a otras bandas por el poder, la riqueza, la supervivencia y el honor.',
        price: 1599.00,
        stock: Math.floor(Math.random() * 21),
        images: JSON.stringify([
            'https://gpstatic.com/acache/46/07/1/us/packshot-1a6b9fe3646a8b8dbf0f89e02166fe8e.jpg',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/566440/ss_6e3de7f4c630539d781528ec517c1bd6e85cfc9a.600x338.jpg',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/566440/ss_cd7da226829493b3616e81cbf88649d3e69f76d1.600x338.jpg',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/566440/ss_3b729e8db9f4eaf35a636575db1f5fa0f8258fd9.600x338.jpg',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/566440/ss_28c41d9694e644e9bbd1ab776663b50b3e4bea65.600x338.jpg',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/566440/ss_1d6bc137187d9126ccd7878ef61c68c6222113ba.600x338.jpg',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/566440/ss_6819866e5978f908da9955c5a11c923f828ff8e6.600x338.jpg'
        ])
    }, {
        name: "Marvel's Avengers",
        description: 'Forma un equipo con los héroes más poderosos de la Tierra, aprovecha tus poderes y vive tu sueño de ser un superhéroe.',
        price: 2199.00,
        stock: Math.floor(Math.random() * 21),
        images: JSON.stringify([
            'https://media.senscritique.com/media/000019406302/source_big/Marvel_s_Avengers.jpg',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/997070/ss_79c8eac1a55e0f97e5100714907e0dcce281f3d3.600x338.jpg?t=1599245773',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/997070/ss_6fa5e7c43513cf65e58d8862c5fad430217b4726.600x338.jpg?t=1599245773',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/997070/ss_8f5400b3eb53638eb434f0c2e3235f7d892b1800.600x338.jpg?t=1599245773',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/997070/ss_061b742d833fadf0c795cda97ac125130cfc5f78.600x338.jpg?t=1599245773',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/997070/ss_c333add23c1515f43b484d1f322b30780ad749b1.600x338.jpg?t=1599245773',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/997070/ss_2e2eaa8b3848ee55a1b39f8de317c7625ef0be0a.600x338.jpg?t=1599245773'
        ])        
    }, {
        name: "NBA 2K21",
        description: 'NBA 2K21 es la nueva entrega de la famosa saga superventas NBA 2K, una experiencia sin igual en videojuegos de deporte.',
        price: 3779.99,
        stock: Math.floor(Math.random() * 21),
        images: JSON.stringify([
            'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/NBA_2K21_-_Damian_Lilliard_cover_art.jpg/220px-NBA_2K21_-_Damian_Lilliard_cover_art.jpg',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1225330/ss_1166d3057f493160e6ec5a85aaa674d830ff25db.600x338.jpg?t=1599192375',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1225330/ss_4d48f01cd6c486a937f70ef2361f57d68d75f03f.600x338.jpg?t=1599192375',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1225330/ss_4bf58ddcf117134cd6bdd28d432daf1af9c491cc.600x338.jpg?t=1599192375',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1225330/ss_1f1c59a984eebc0a5b2c287b47420f2e48b79528.600x338.jpg?t=1599192375',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1225330/ss_4421d237908a7ad9b73bd3b02a7bc17971d67d0f.600x338.jpg?t=1599192375',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1225330/ss_19466ddcb738a6fe52a9da3d849fac40daa6d885.600x338.jpg?t=1599192375'
        ])        
    }, {
        name: "Crusader Kings III",
        description: 'Paradox Development Studio te trae la secuela de uno de los juegos de estrategia más populares que existen. Crusader Kings III es el heredero de un largo legado de experiencias de gran estrategia histórica y llega con un montón de formas nuevas de garantizar el éxito de tu casa real.',
        price: 799.99,
        stock: Math.floor(Math.random() * 21),
        images: JSON.stringify([
            'https://britgamer.s3.eu-west-1.amazonaws.com/styles/cover_art/s3/2020-06/crusader-kings-iii-cover.jpg?itok=p38slr93',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1158310/ss_af6384bc816dd310f76461a5940a7375d3d3a1cf.600x338.jpg?t=1599496226',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1158310/ss_cb19f5ba259e484640caaec7d3d50259f7764d76.600x338.jpg?t=1599496226',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1158310/ss_05271cf6247ecea974109e6807e0702f77e7b89e.600x338.jpg?t=1599496226',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1158310/ss_6f455aea2a45b6259df53d4bc1bedf4d10742db4.600x338.jpg?t=1599496226',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1158310/ss_a82e583065baf49755c848ff8a039efa3dae2d1a.600x338.jpg?t=1599496226',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1158310/ss_cb540236257901d1b15d7a0ec9fad44c45b03533.600x338.jpg?t=1599496226',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1158310/ss_417d9641392acbafa920e1d0079eb233ed61c5f2.600x338.jpg?t=1599496226',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1158310/ss_b4e1c557c745cf554d00aefd98ff6145ac935393.600x338.jpg?t=1599496226',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1158310/ss_d74e00cb53e878aee49b55d7661f308bbcd3f63a.600x338.jpg?t=1599496226',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1158310/ss_4d76a4ce70c8a48fac78946b41da110be9e016cb.600x338.jpg?t=1599496226',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1158310/ss_9906e01415b1db1577935aed759c56ed5a0b7c92.600x338.jpg?t=1599496226',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1158310/ss_4d29829c030ca886c044df0cce13b240101f24ae.600x338.jpg?t=1599496226',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1158310/ss_a7d9b20b06ed9de7ec8f54784b359a3310bb8926.600x338.jpg?t=1599496226',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1158310/ss_413b6da4260c65d3ee297bfcde96983bc215e778.600x338.jpg?t=1599496226'
        ])        
    }, {
        name: "Iron Harvest",
        description: 'Iron Harvest es un juego de estrategia en tiempo real (RTS) ambientado en una realidad alternativa de 1920.',
        price: 1699.00,
        stock: Math.floor(Math.random() * 21),
        images: JSON.stringify([
            'https://cdn1.epicgames.com/f312bc218b1d46f7921619cc9f3bf3c7/offer/Free_Games_Desktop_vertical-510x680-103c530e3b4d46872f751573330b8ba9.png?h=854&resize=1&w=640',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_be949635c259194fdc77a90ddc64155c678512cf.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_c1f78f1bd6235ad93e6cef4f29ab5eae9381b4be.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_a2728deaa2555c354c7dbe440ab066186c6c8275.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_f14dbddcedec0f0cbaf2ab268e194349c551491f.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_74f2ddd4201a3a13f05f465df8f0a0619e23687f.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_84a6feed8a3628041f4afd586510fa778a344553.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_56b6c1f4a667594fad9bf9c59dc367b8fa9d76db.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_8cb2e211b58cede1dfbced1794eba7b19c895efa.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_f088fed35e92377afa04f6b35b510336cea29a9b.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_1a31a3d23d04553640027ce9e8a7953eb871f74e.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_f26ed8f722d29c23049133d16daab246ef146cf2.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_034fad8b56152799ca040e3b123d3414a67e6182.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_7575a80adbfaa86293552334e7bce016d8d7020e.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_c3f9f5ef97fe552f6cf38bd32f3bfebdee02cc02.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_4547fb05373c9e511e23eb28dd742568c790c593.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_3e3aed426b095622994926a9bf79c1ecaa81c50b.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_1ae91680c5cebe1b594edd024d09d3e183fc72eb.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_2972bbc55f08ca36a6e5881a80e46c185a31d725.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_70bbd9b1adba8d2611e3f101977bfe2e9e4681a2.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_4bb5f8cfcaffab323f648b488a97c3710fe51742.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_252ec7794c66101d2c704ca0a42221b405d06903.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_b4577b15193f94d112965d2253869dbe7c74e477.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_c8e0e43234feba5dfda95170f06bb51bf325ab17.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_fb799ceff18686e367217ac5d481830e4aa48533.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_a5a1876e78ac48714abf392280c10652b20b8fff.600x338.jpg?t=1599489785',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/826630/ss_d29c717c0060bfef77e7f2c6a6a7a22938643c6b.600x338.jpg?t=1599489785'
        ])        
    }, {
        name: "Nexomon: Extinction",
        description: 'Nexomon: Extinction es una vuelta a los clásicos juegos de atrapar monstruos, completo con una nueva historia, personajes excéntricos y más de 300 Nexomon exclusivos que atrapar y domar.',
        price: 224.99,
        stock: Math.floor(Math.random() * 21),
        images: JSON.stringify
        ([
            'https://cdnb.artstation.com/p/assets/images/images/029/409/531/medium/michelle-lo-keyart-ver02-logo-02.jpg?1597438642',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1196630/ss_be3a984b47211245c852192e824574a384684735.600x338.jpg?t=1598621088',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1196630/ss_322a34a50f82484b43da979eadf1f765584270a8.600x338.jpg?t=1598621088',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1196630/ss_174da47a0c476ae36ed41dd9a28e71571d9dcd25.600x338.jpg?t=1598621088',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1196630/ss_cf359b67ba4d50a6cec4135b0ea911f517c730a3.600x338.jpg?t=1598621088',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1196630/ss_bae51cb848b9046659b7e40f858d978d3e638cc9.600x338.jpg?t=1598621088',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1196630/ss_9f8341a742e4f73aaa7b859bedafcbf4671fc7f4.600x338.jpg?t=1598621088'
        ])        
    }, {
        name: "Wasteland 3",
        description: 'Después de Wasteland 2, el aclamado ganador del premio Game of the Year 2014, la saga de videojuegos RPG pionera en el género postapocalíptico regresa con Wasteland 3.',
        price: 1499.00,
        stock: Math.floor(Math.random() * 21),
        images: JSON.stringify([
            'https://external-preview.redd.it/rxlwKlkxlSBWnAMQ41V81CKpIjXrjMHYqkeG1Snwaqo.jpg?auto=webp&s=9352b32eca5e5266d0fa74c582f376f7890321f8',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/719040/ss_d1bb87eaea446d6d7d9ff82aa1592e2284939b9b.600x338.jpg?t=1599084224',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/719040/ss_66187a458c186a5ac8e286c03c680c170793844b.600x338.jpg?t=1599084224',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/719040/ss_bbdb56acc36497bbbb54ca34d98e8e4903f30ab9.600x338.jpg?t=1599084224',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/719040/ss_c955a756f88ecfbeed33e9c9f85dec337de79765.600x338.jpg?t=1599084224',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/719040/ss_984375f3d11994073b266308c5b680a0cf6aa567.600x338.jpg?t=1599084224',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/719040/ss_146759a718c87d258f53e50641fb1139f515d493.600x338.jpg?t=1599084224',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/719040/ss_795d0087b6ce845d67861b29468cdac2f89a0e80.600x338.jpg?t=1599084224'
        ])        
    }, {
        name: "Ancestors: The Humankind Odyssey",
        description: 'Lidera a tu clan en África hace 10 millones de años durante los albores de la humanidad mientras exploras, expandes y evolucionas para sobrevivir en Ancestors: The Humankind Odyssey.',
        price: 2280.00,
        stock: Math.floor(Math.random() * 21),
        images: JSON.stringify([
            'https://full-games.org/wp-content/uploads/2019/07/Ancestors-The-Humankind-Odyssey-COVER-PC.jpg',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/536270/ss_b7a3615ae6f8a5886c5d3b72c3ed08ae0b4249e2.600x338.jpg?t=1599147270',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/536270/ss_a04daacab5e13d844c1473b106a98bdb439de732.600x338.jpg?t=1599147270',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/536270/ss_27e876bf51d87b638f4f59e96b117dcc83e32692.600x338.jpg?t=1599147270',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/536270/ss_9cde7b2bc09fc72064844758c4c3fd17478d0c78.600x338.jpg?t=1599147270',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/536270/ss_a526a2c3cf24be8bfefb6d3da92792c6fe0321ef.600x338.jpg?t=1599147270',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/536270/ss_ff3e62604bc8b64a0a8aa185bb818ade9e9624a0.600x338.jpg?t=1599147270',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/536270/ss_d5a44ed85ced7b40da0f39054fccc4aa27e3a93b.600x338.jpg?t=1599147270',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/536270/ss_cc8326f6ba23091dc76a5abe5d2cc2e94153ae18.600x338.jpg?t=1599147270'
        ])        
    }, {
        name: "Control Ultimate Edition",
        description: 'Control Ultimate Edition incluye el juego principal y todas las expansiones lanzadas ("La Fundación" y "SMA") en un único paquete a un gran precio. Control es un emocionante título de acción y aventuras en tercera persona con gráficos espectaculares que ha ganado más de 80 premios.',
        price: 1799.00,
        stock: Math.floor(Math.random() * 21),
        images: JSON.stringify([
            'https://preview.redd.it/h7qzlwl8jtg51.png?auto=webp&s=7c71dd2f00e1c28cbcf5a30a1fe9259148037e39',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/870780/ss_8376498631b089e52fb5c75ffe119e0de5e6aed1.600x338.jpg?t=1599583201',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/870780/ss_5a16ce565951479e142c56a23f19d88333d84945.600x338.jpg?t=1599583201',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/870780/ss_c038bb7b20d72ba5d33cc95f7235aefa0b84a706.600x338.jpg?t=1599583201',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/870780/ss_949cf39deee737fec3aadff903ec5311dd22bdab.600x338.jpg?t=1599583201',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/870780/ss_455ab81ea90f5668ff384d60d68baef1e2e74e55.600x338.jpg?t=1599583201',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/870780/ss_165fb4ca28f4db79b878e8c56ba6502e782c0bb2.600x338.jpg?t=1599583201',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/870780/ss_06b7e4baac0ac7f2ecfcc8d3198f707339c6296f.600x338.jpg?t=1599583201',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/870780/ss_f99238da0d48a784c675c464bf1d83d9cb3ff5ac.600x338.jpg?t=1599583201'
        ])        
    }, {
        name: "Samurai Jack: Battle Through Time",
        description: 'Conviértete en Samurai Jack, el guerrero más grande de todos los tiempos. Viaja a través del tiempo para poner fin al reinado del malvado Aku en esta nueva aventura de la mano de los creadores de Samurai Jack.',
        price: 439.99,
        stock: Math.floor(Math.random() * 21),
        images: JSON.stringify([
            'https://s3.gaming-cdn.com/images/products/6563/orig/samurai-jack-battle-through-time-cover.jpg',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1150590/ss_de1386819640755e7fa4fed4fb878e896afd6d9c.600x338.jpg?t=1598022051',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1150590/ss_88c599ccaf3eb8a3fcca5bc37577f52b3242b1d4.600x338.jpg?t=1598022051',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1150590/ss_c0e03078e5e9a28ef4c0ef93a4c04a88792f9fcd.600x338.jpg?t=1598022051',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1150590/ss_f49986ebb22bae29f62e44db6780efc54f1a1cfa.600x338.jpg?t=1598022051',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1150590/ss_c68e79abe546c6762a68d3b3f586b412bcd1d1ed.600x338.jpg?t=1598022051',
            'https://cdn.cloudflare.steamstatic.com/steam/apps/1150590/ss_cb45f0645559af3b081a8f727edd4267679bac2d.600x338.jpg?t=1598022051'
        ])        
    }]);
}

function categoriesSeeder()
{
    Category.bulkCreate([{
        name: 'Acción',
    }, {
        name: 'Estrategia',
    }, {
        name: 'Rol',
    }, {
        name: 'Deportes',
    }, {
        name: 'Simuladores',
    }, {
        name: 'Exploración',
    }, {
        name: 'Aventura',
    }]);
}


function usersSeeder()
{
    User.create({
        fullname: 'Usuario Cliente',
        email: 'client@test.com',
        password: '12345678',
        role: 'client',
        address: 'Direccion del Cliente 123',
        doc_number: '11111111',
        phone: '1510121314'
    }).then(()=>{
        User.create({
            fullname: 'Usuario Admin',
            email: 'admin@test.com',
            password: '12345678',
            role: 'admin',
            address: 'Av. Del Administrador 321',
            doc_number: '22222222',
            phone: '1510121314'
        });
    });

   
}

module.exports = {
    productsSeeder,
    categoriesSeeder,
    usersSeeder
}