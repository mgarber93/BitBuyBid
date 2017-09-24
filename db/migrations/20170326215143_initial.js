
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function (table) {
      table.increments('id').unsigned().primary();
      table.string('first', 100).notNullable();
      table.string('last', 100).notNullable();
      table.string('username', 100).notNullable();
      table.string('email', 100).nullable();
      table.string('phone', 100).nullable();
      table.string('picture', 250).nullable();
      table.string('active_cart').nullable();
      table.integer('transaction_id').references('transactions.id').nullable().onDelete('CASCADE');
      table.timestamps(true, true);
    }),
    knex.schema.createTableIfNotExists('addresses', function (table) {
      table.increments('id').unsigned().primary();
      table.string('line1', 100).notNullable();
      table.string('line2', 100).notNullable();
      table.string('city', 100).notNullable();
      table.string('stateOrProvince', 100).notNullable();
      table.integer('postalCode').nullable();
    }),
    knex.schema.createTableIfNotExists('auths', function(table) {
      table.increments('id').unsigned().primary();
      table.string('type', 8).notNullable();
      table.string('oauth_id', 30).nullable();
      table.string('password', 100).nullable();
      table.string('salt', 100).nullable();
      table.integer('user_id').unsigned().notNullable().references('users.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('products', function(table) {
      table.increments('id').unsigned().primary();
      table.string('prod_id', 200).notNullable();
      table.string('asin', 200).nullable();
      table.bigint('ad-id').unsigned().nullable();
      table.bigint('sku').unsigned().nullable();
      table.bigint('upc').unsigned().nullable();
      table.string('catalog_id', 200).nullable();
      table.decimal('price').unsigned().nullable();
      table.text('buy_url').nullable();
      table.text('img_url_sm').nullable();
      table.text('img_url_md').nullable();
      table.text('img_url_lg').nullable();
      table.string('type', 20).notNullable();
      table.string('title', 500).notNullable();
      table.text('description').nullable();
      table.integer('user_id').references('users.id').nullable().onDelete('CASCADE');
      table.integer('category_id').references('categories.id').nullable().onDelete('CASCADE');
      table.boolean('in-stock').nullable();
      table.timestamps(true, true);
      table.unique('prod_id');
    }),
    knex.schema.createTableIfNotExists('categories', function(table) {
      table.increments('id').unsigned().primary();
      table.string('category').notNullable();
    }),
    knex.schema.createTableIfNotExists('transactions', function(table) {
      table.increments('id').unsigned().primary();
      table.integer('buyer_id').references('users.id').onDelete('CASCADE');
    }),
    knex.schema.createTableIfNotExists('reviews', function(table) {
      table.increments('id').primary();
      table.text('body').notNullable();
      table.integer('score').notNullable();
    }),
    knex.schema.createTableIfNotExists('tags', function(table) {
      table.increments('id').primary();
    }),
    knex.schema.createTableIfNotExists('purchases', function(table) {
      table.increments('id').primary();
      table.integer('quantity').notNullable().default(1);
      table.integer('status').notNullable().default(0);
      table.integer('transaction_id').references('transactions.id').onDelete('CASCADE');
      table.integer('product_id').references('products.id').onDelete('CASCADE');
      table.integer('review_id').references('reviews.id').onDelete('CASCADE');
      table.string('purchase_type').nullable();
      table.integer('purchase_id').nullable();

    }),
    knex.schema.createTableIfNotExists('amazon_purchases', function(table) {
      table.increments('id').primary();
      table.integer('trans_id').notNullable();
      table.text('amzn_cart_id').notNullable();
      table.text('amzn_HMAC').nullable();
      table.text('amzn_URLEncodedHMAC').nullable();
      table.text('amzn_purchase_url').nullable();
    }),
    knex.schema.createTableIfNotExists('stripe_purchases', function(table) {
      table.increments('id').primary();
      table.integer('trans_id').notNullable();
      table.string('client_ip').notNullable();
      table.string('createAt').notNullable();
      table.string('email').notNullable();
      table.string('payment').notNullable();
    }),
    knex.schema.createTableIfNotExists('exchanges', function(table) {
      table.increments('id').primary();
      table.decimal('dollar_amt').notNullable();
      table.timestamp('date').defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('auths'),
    knex.schema.dropTable('addresses'),
    knex.schema.dropTable('reviews'),
    knex.schema.dropTable('tags'),
    knex.schema.dropTable('purchases'),
    knex.schema.dropTable('amazon_purchases'),
    knex.schema.dropTable('stripe_purchases'),
    knex.schema.dropTable('transactions'),
    knex.schema.dropTable('products'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('categories'),
    knex.schema.dropTable('exchanges'),

  ]);
};
