const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        { model: Product, 
        through: ProductTag, 
        as: 'product_tags' }
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error"});
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product, 
        through: ProductTag, 
        as: 'product_tags' }
      ],
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id"});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error"});
  }

});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Bad Request"});
  
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id"});
      return;
    }
    res.status(200).json({ message: "Tag updated successfully"});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error"});
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id"});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error"});
  }
});

module.exports = router;
