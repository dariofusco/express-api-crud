const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

const store = (data) => {
    prisma.post
        .create({ data })
        .then((newPost) => {
            console.log("Nuovo Post creato:", newPost);
        })
        .catch((error) => console.error(error));
}

const index = () => {
    prisma.post
        .findMany()
        .then((posts) => {
            console.log(posts);
        })
        .catch((error) => console.error(error));
}

const show = (slug) => {
    prisma.post
        .findUnique({
            where: { slug },
            include: {
                category: true,
                tags: {
                    select: {
                        name: true,
                    },
                },
            },
        })
        .then((posts) => {
            console.log(posts);
        })
        .catch((error) => console.error(error));
}

const update = (id, data) => {
    prisma.post
        .update({
            where: { id }, data
        })
        .then((postUpdated) => {
            console.log(postUpdated);
        })
        .catch((error) => console.error(error));
}

const destroy = (id) => {
    prisma.post
        .delete({
            where: { id }
        })
        .then((postDeleted) => {
            console.log(postDeleted);
        })
        .catch((error) => console.error(error));
}

module.exports = {
    store,
    index,
    show,
    update,
    destroy
}