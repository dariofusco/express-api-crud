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
    } catch (error) {
        next(error);
    }
}

const index = async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany()
        res.json(posts);
    } catch (error) {
        next(error);
    }
}

const show = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const post = await prisma.post.findUnique({ where: { slug } });
        res.json(post);
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const post = await prisma.post.update({ where: { slug }, data: req.body });
        res.json(post);
    } catch (error) {
        next(error);
    }
}

const destroy = async (req, res, next) => {
    const { slug } = req.params;
    try {
        await prisma.post.delete({ where: { slug } });
        res.json(`Il post ${slug} è stato eliminato.`);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    store,
    index,
    show,
    update,
    destroy
}