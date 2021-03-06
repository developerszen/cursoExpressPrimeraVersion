const Author = require('../models').author;
const User = require('../models').user;

module.exports = {
    index(req, res) {
      return Author.findAll({
          where: {
              is_deleted: false
          },
          attributes: ['id', 'name', 'slug'],
          include: [{
              model: User,
              as: 'userCreator',
              attributes: ['id', 'first_name', 'last_name', 'fullname'],
          },
          {
            model: User,
            as: 'userEditor',
            attributes: ['id', 'first_name', 'last_name', 'fullname'],
        },
        ]
      })
        .then((authors) => res.status(200).send(authors))
        .catch((error) => {
            res.status(500).send(error)
        });
    },
    store(req, res) {
        const body = req.body;

        Author.create({
            name: body.name,
            created_by: 1,
            updated_by: 1
        })
        .then((author) =>{
            Author.findOne({
                where: {
                    id: author.id
                },
                attributes: ['id', 'name', 'slug'],
                include: [{
                    model: User,
                    as: 'userCreator',
                    attributes: ['id', 'first_name']
                },{
                    model: User,
                    as: 'userEditor',
                    attributes: ['id', 'first_name']
                },
            ]
            })
                .then((author) => res.status(200).send(author))
                .catch((error) => res.status(400).send(error))             
        })
    },
    show(req, res) {
        return Author.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'name', 'slug', 'created_at', 'updated_at'],
            include: [{
                model: User,
                as: 'userCreator',
                attributes: ['id', 'first_name','last_name','fullname']
            },
            {
                model: User,
                as: 'userEditor',
                attributes: ['id', 'first_name','last_name','fullname']
            }]
        }).then((author) => res.status(200).send(author))
        .catch((error) => res.status(400).send(error))
    },
    update(req, res) {
        const body = req.body;
        return Author
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(author => {
                if(!author) {
                    return res.status(404).send({
                        message: 'Author Not Found'
                    });
                }

                return author
                    .update({
                        name: body.name
                    })
                    .then((author) =>{
                        Author.findOne({
                            where: {
                                id: author.id
                            },
                            attributes: ['id', 'name', 'slug', 'created_at', 'updated_at'],
                            include: [{
                                model: User,
                                as: 'userCreator',
                                attributes: ['id', 'first_name', 'last_name', 'fullname'],
                            },
                            {
                                model: User,
                                as: 'userCreator',
                                attributes: ['id', 'first_name', 'last_name', 'fullname'],
                            }]
                        })
                        .then(author => res.status(200).send(author))
                        .catch(error=> res.status(400).send(error))
                    })
                    .catch(error => res.status(400).send(error))
            })
            .catch(error => res.status(400).send(error))
    },
    delete(req, res) {
        return Author.findOne({
            where: { id: req.params.id }
        })
        .then(author => {
            if(!author) {
                return res.status(404).send({
                    message: 'Author Not Found'
                });
            }

            return author
                .update({
                    is_deleted: true
                })
                .then(author => res.status(204).send([]))
                .catch(error => res.status(400).send(error))
        })
        .catch(error => res.status(400).send(error))
    }
}