const bgImages = [{
    id: 1,
    url: 'img/bg/1425219857.jpg'
}, {
    id: 2,
    url: 'img/bg/1425219892.jpg'
}, {
    id: 3,
    url: 'img/bg/1425219976.jpg'
}, {
    id: 4,
    url: 'img/bg/1425221182.jpg'
}]


const items = [{
    id: 1,
    description: 'Imagem 1',
    image: '',
    position: 0,
    active: true
}, {
    id: 2,
    description: 'Imagem 2',
    image: '',
    position: 0,
    active: true
}, {
    id: 3,
    description: 'Imagem 3',
    image: '',
    position: 0,
    active: true
}, {
    id: 4,
    description: 'Imagem 4',
    image: '',
    position: 0,
    active: true
}]

const subCategories = [{
    id: 11,
    name: "Inverno 2015",
    items: items.slice(2, 4)
}, {
    id: 12,
    name: "Verão 2015"
}, {
    id: 13,
    name: "Inverno 2014"
}, {
    id: 14,
    name: "Verão 2014"
}, {
    id: 21,
    name: "Óleo"
}, {
    id: 51,
    name: "Grafite"
}, {
    id: 52,
    name: "Aquarela"
}, {
    id: 53,
    name: "Pastel"
}]

const categories = [{
    id: 1,
    name: "Coleções",
    main: true,
    subCategories: subCategories.slice(0, 4),
    items: items.slice(0, 2)
}, {
    id: 2,
    name: "Pinturas",
    main: true,
    subCategories: subCategories.slice(4, 5)
}, {
    id: 3,
    name: "Artesanato",
    main: true,
    subCategories: []
}, {
    id: 4,
    name: "Customizações",
    main: true,
    subCategories: []
}, {
    id: 5,
    name: "Desenhos",
    main: true,
    subCategories: subCategories.slice(5, 8)
}]

const db = {
    "bg-images": bgImages,

    "categories": categories.concat(subCategories),

    "items/category/11": {
        items: [
            'img/cat1/1410522014_tb.jpg',
            'img/cat1/1410522050_tb.jpg',
            'img/cat1/1410522069_tb.jpg',
            'img/cat1/1410522089_tb.jpg',
            'img/cat1/1410522014_tb.jpg',
            'img/cat1/1410522050_tb.jpg',
            'img/cat1/1410522069_tb.jpg',
            'img/cat1/1410522089_tb.jpg',
            'img/cat1/1410522014_tb.jpg',
            'img/cat1/1410522050_tb.jpg',
            'img/cat1/1410522069_tb.jpg',
            'img/cat1/1410522089_tb.jpg'
        ]
    },

    "items/category/12": {
        items: [
            'img/cat2/1391627539_1_tb.jpg',
            'img/cat2/1391627539_2_tb.jpg',
            'img/cat2/1391627539_3_tb.jpg',
            'img/cat2/1391627539_tb.jpg'
        ]
    },

    "items/category/13": {
        items: [
            'img/cat3/1379531531_tb.jpg',
            'img/cat3/1379531550_tb.jpg',
            'img/cat3/1379531569_tb.jpg',
            'img/cat3/1398984145_tb.jpg'
        ]
    }

}

export default db
