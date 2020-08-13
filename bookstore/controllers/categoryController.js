const Category = require('../models').category;
const User = require('../models').user;

module.exports = {
    index(req, res) {
      return Category.findAll({
          where: {
              is_deleted: false
          },
          attributes: ['id', 'name', 'description', 'slug'],
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
        .then((categories) => res.status(200).send(categories))
        .catch((error) => {
            res.status(500).send(error)
        });
    },
    store(req, res) {
        const body = req.body;

        Category.create({
            name: body.name,
            description: body.description,
            created_by: 1,
            created_at: '2020/08/13',
            updated_by: 1,
            updated_at: '2020/08/13',
        })
        .then((category) =>{
            Category.findOne({
                where: {
                    id: category.id
                },
                attributes: ['id', 'name', 'description', 'slug'],
                include: [{
                    model: User,
                    as: 'userCreator',
                    attributes: ['id', 'first_name', 'last_name', 'fullname']
                },{
                    model: User,
                    as: 'userEditor',
                    attributes: ['id', 'first_name', 'last_name', 'fullname']
                },
            ]
            })
                .then((category) => res.status(200).send(category))
                .catch((error) => res.status(400).send(error))             
        })
    },
    show(req, res) {
        return Category.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'name', 'description', 'slug', 'created_at', 'updated_at'],
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
        }).then((category) => res.status(200).send(category))
        .catch((error) => res.status(400).send(error))
    },
    update(req, res) {
        const body = req.body;
        return Category
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(category => {
                if(!category) {
                    return res.status(404).send({
                        message: 'Categoria Not Found'
                    });
                }

                return category
                    .update({
                        name: body.name,
                        description: body.description
                    })
                    .then((category) =>{
                        Category.findOne({
                            where: {
                                id: category.id
                            },
                            attributes: ['id', 'name', 'description', 'slug', 'created_at', 'updated_at'],
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
                        .then(category => res.status(200).send(category))
                        .catch(error=> res.status(400).send(error))
                    })
                    .catch(error => res.status(400).send(error))
            })
            .catch(error => res.status(400).send(error))
    },
    delete(req, res) {
        return Category.findOne({
            where: { id: req.params.id }
        })
        .then(category => {
            if(!category) {
                return res.status(404).send({
                    message: 'Category Not Found'
                });
            }

            return category
                .update({
                    is_deleted: true
                })
                .then(category => res.status(204).send([]))
                .catch(error => res.status(400).send(error))
        })
        .catch(error => res.status(400).send(error))
    }
}