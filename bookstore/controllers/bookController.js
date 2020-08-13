const Book = require('../models').book;
const Author = require('../models').author;
const Category = require('../models').category;
const User = require('../models').user;

module.exports = {
    index(req, res) {
        return Book.findAll({
            where: {
                is_deleted: false
            },
            attributes: ['id', 'isbn', 'title', 'synopsis', 'url_image', 'slug'],
            include: [
                {
                    model: Author,
                    attributes: ['id', 'name']
                },
                {
                    model: Category,
                    attributes: ['id', 'name']
                },
                {
                    model: User,
                    as: 'userCreator',
                    attributes: ['id', 'first_name', 'last_name'],
                },
                {
                    model: User,
                    as: 'userEditor',
                    attributes: ['id', 'first_name', 'last_name'],
                },
            ]
        })
        .then(books => res.status(200).send(books))
        .catch(error => {
            res.status(400).send(error)
        })
    },

    store(req, res) {

    },

    show(req , res) {
        
    },

    update(req, res) {

    },

    delete(req, res) {

    }
}