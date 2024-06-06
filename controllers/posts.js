const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

const store = async (req, res, next) => {

    const { title, slug, image, content, published, categoryId } = req.body;

    const data = {
        title,
        slug,
        image,
        content,
        published,
        categoryId,
    }

    try {
        const post = await prisma.post.create({ data });
        res.status(200).send(post);
    } catch (next) {
    }
}

const index = async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany()
        res.json(posts);
    } catch (next) {
    }
}

const show = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const post = await prisma.post.findUnique({ where: { slug } });
        res.json(post);
    } catch (next) {
    }
}

const update = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const post = await prisma.post.update({ where: { slug }, data: req.body });
        res.json(post);
    } catch (next) {
    }
}

const destroy = async (req, res, next) => {
    const { slug } = req.params;
    try {
        await prisma.post.delete({ where: { slug } });
        res.json(`Il post ${slug} è stato eliminato.`);
    } catch (next) {
    }
}

module.exports = {
    store,
    index,
    show,
    update,
    destroy
}