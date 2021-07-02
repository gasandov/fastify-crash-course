const items = require('../Items');

// Item schema
const Item = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' }
  }
};

// Options for get all items
/*
  if I comment one property that property will not be retrieved on the response
  also, if I change the type e.g 'integer' fastify will format the value
*/
const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Item
      }
    }
  }
};

const getItemOpts = {
  schema: {
    response: {
      200: Item
    }
  }
};

function itemRoutes(fastify, options, done) {

  // Get all items
  fastify.get('/items', getItemsOpts, (req, reply) => {
    reply.send(items)
  });

  // Get single item
  fastify.get('/items/:id', getItemOpts, (req, reply) => {
    const { id } = req.params;

    const item = items.find(item => item.id === id);

    reply.send(item);
  });

  done();
};

module.exports = itemRoutes;
