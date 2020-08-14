const Book = require('../models').book;
const Author = require('../models').author;
const Category = require('../models').category;
const User = require('../models').user;
const AuthorBook = require('../models').author_book

const base64Img = require('base64-img');
const { LoopDetected } = require('http-errors');

module.exports = {
    index(req, res) {
        console.log("ingresa a index")
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
        const body = req.body;
        console.log(body)
        const name = 'book' + new Date().valueOf();
        const route = base64Img.imgSync(body.image, 'storage/books', name)

        Book.create({
            isbn: body.isbn,
            title: body.title,
            url_image: route,
            synopsis: body.synopsis,
            fk_category: body.fk_category,
            created_by: 1,
            updated_by: 1
        })
        .then((book) => {
            let authors_book = [];
            body.authors.forEach(id => {
                authors_book.push({
                fk_author: id,
                fk_book: book.id,
              })
            });
            AuthorBook.bulkCreate(authors_book)
                .then(result => {
                    res.status(200).send(book)
                })
                .catch((error) => {
                    res.status(400).send(error.message)
                });
    
          })
          .catch((error) => res.status(400).send(error.message));
    },

    show(req , res) {
        return Book.findAll({
            where: {
                id: req.params.id
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
                    model:User,
                    as: 'userCreator',
                    attributes: ['id', 'first_name', 'last_name', 'fullname']
                },
                {
                    model:User,
                    as: 'userEditor',
                    attributes: ['id', 'first_name', 'last_name', 'fullname']
                }
            ]
        })
        .then(books => res.status(200).send(books))
        .catch(error => {
            res.status(400).send(error)
        })
    },

    update(req, res) {
        const body = req.body;
    
        return Book
          .findOne({
            where: {
              id: req.params.id
            },
          })
          .then(book => {
            if (!book) {
              return res.status(404).send({
                message: 'Book Not Found',
              });
            }
            //elimina la imagen
            console.log(book.url_image)
            var fs = require('fs')
            if(book.url_image) {
                try {
                    fs.unlinkSync(book.url_image);
                } catch(err) {
                    console.error(err)
                }  
            }
            //vuelve a crear la imagen
            const name = 'book' + new Date().valueOf();
            const route = base64Img.imgSync(body.image, 'storage/books', name);

            return book.update({
                isbn: body.isbn,
                url_image: route,
                title: body.title,
                synopsis: body.synopsis,
                fk_category: body.fk_category,
                updated_by: 1,
            })
              .then((book) => {
                
                AuthorBook.destroy({
                  where: {
                    fk_book: book.id,
                  }
                }).then(() => {
                  let authors_book = [];
                  body.authors.forEach(id => {
                    authors_book.push({
                      fk_autor: id,
                      fk_book: book.id,
                    })
                  });
                  AuthorBook.bulkCreate(book_autors).then();
                })
    
                Book.findOne({
                    where: {
                        id: book.id
                    },
                    attributes: [
                        'id', 'isbn', 'title', 'synopsis', 'slug', 'created_by', 'created_at'
                    ],
                    include: [{
                        model: User,
                        as: 'userCreator',
                        attributes: ['id', 'first_name', 'last_name', 'fullname'],
                    },
                    {
                        model: Category,
                        attributes: ['id', 'name'],
                    },
                    ]
                }).then((book) => res.status(200).send(book))
                  .catch((error) => res.status(400).send(error.message));
              })
              .catch((error) => res.status(400).send(error.message));
          })
          .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return Book.findOne({
            where : { id: req.params.id }
        })
        .then(book => {
            if(!book) {
                return res.status(404).send({
                    message: 'Book not found'
                })
            }

            return book
                .update({
                    is_deleted: true
                })
                .then(book => res.status(204).send({}))
                .catch(error => res.status(500).send(error))
        })
        .catch(error => res.status(400).send(error))
    },
    buscar(req, res) {
        var search = req.query.q;
        var limit = req.query.limit;
        var offset = req.query.offset;

        return Book.searchBook(search, limit, offset)
            .then(result => {
                return res.status(200).send(result)
            })
    }
}