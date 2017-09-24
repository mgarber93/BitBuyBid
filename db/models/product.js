const db = require('../');
const convert = require('xml-js');
const parseString = require('xml2js').parseString;

const Product = db.Model.extend({
  tableName: 'products',
  tags: function() {
    return this.hasMany('Tag');
  },
  category: function() {
    return this.hasOne('Category');
  },
  initialize: function() {
    this.on('created', (model) => {
      const {
        id,
        title, 
        description, 
        type,
        img_url_sm, 
        img_url_md, 
        img_url_lg,
        prod_id,
        price
      } = model.toJSON();
      db.client.create(
        {
          index: 'product',
          type,
          id,
          body: {
            title: title,
            tags: description.split(' ').filter(w => w.length > 3),
            id: id,
            img_url_sm,
            img_url_md,
            img_url_lg,
            prod_id,
            description,
            type,
            price,
            counter: 1
          }
        }
      );
    });
  }
});

const defaultImage = '';

/**
 * Bulk create products by fetching product data from overstock api
 * and converting the data to json from xml.
 *
 * @todo associate inserted products to category/ tag.
 */
Product.fromOverstock = (results) => {
  var promiseArray;
  const parsed = JSON.parse(convert.xml2json(results.data,
    {
      compact: true,
      spaces: 2,
      instructionHasAttributes: true
    }
  ))['cj-api'].products.product;

  if (!Array.isArray(parsed)) {
    return Promise.resolve(null);
  }

  promiseArray = parsed.filter((p) => {
    return Number(p.price['_text']) && p['image-url']._text;
  }).map(p => {
    return Product.query((qb) => {
      qb.whereRaw(`prod_id = '${(p['ad-id']._text || '') + (p['sku']._text || '') + (p['upc']._text || '')}|OVSOCK'`)
        .andWhere('type', '=', 'ovsock').limit(1);
    })
      .fetchAll()
      .then(products => {
        if (products && products.length > 0) {
          // ovsock item found in db, skipping
          return {
            'id': products.models[0].id,
            'prod_id': (p['ad-id']._text || '') + (p['sku']._text || '') + (p['upc']._text || '') + '|OVSOCK',
            'ad-id': Number.parseInt(p['ad-id']._text || 0) || null,
            'sku': Number.parseInt(p['sku']._text) || null,
            'upc': Number.parseInt(p['upc']._text) || null,
            'catalog_id': p['catalog-id']._text.replace(/\D/g, ''),
            'price': Number(p.price['_text']),
            'buy_url': p['buy-url']._text,
            'type': 'ovsock',
            'title': p.name._text,
            'description': p.description._text,
            'img_url_sm': p['image-url']._text || defaultImage,
            'img_url_md': p['image-url']._text || defaultImage,
            'img_url_lg': p['image-url']._text || defaultImage
          };
        } else {
          // insert new item
          return Product.forge(
            {
              'prod_id': (p['ad-id']._text || '') + (p['sku']._text || '') + (p['upc']._text || '') + '|OVSOCK',
              'ad-id': Number.parseInt(p['ad-id']._text || 0) || null,
              'sku': Number.parseInt(p['sku']._text) || null,
              'upc': Number.parseInt(p['upc']._text) || null,
              'catalog_id': p['catalog-id']._text.replace(/\D/g, ''),
              'price': Number(p.price['_text']),
              'buy_url': p['buy-url']._text,
              'type': 'ovsock',
              'title': p.name._text,
              'description': p.description._text,
              'img_url_sm': p['image-url']._text || defaultImage,
              'img_url_md': p['image-url']._text || defaultImage,
              'img_url_lg': p['image-url']._text || defaultImage
            }
          )
            .save()
            .then(({id}) => {
              return {
                id: id,
                'prod_id': (p['ad-id']._text || '') + (p['sku']._text || '') + (p['upc']._text || '') + '|OVSOCK',
                'ad-id': Number.parseInt(p['ad-id']._text || 0) || null,
                'sku': Number.parseInt(p['sku']._text) || null,
                'upc': Number.parseInt(p['upc']._text) || null,
                'catalog_id': p['catalog-id']._text.replace(/\D/g, ''),
                'price': Number(p.price['_text']),
                'buy_url': p['buy-url']._text,
                'type': 'ovsock',
                'title': p.name._text,
                'description': p.description._text,
                'img_url_sm': p['image-url']._text || defaultImage,
                'img_url_md': p['image-url']._text || defaultImage,
                'img_url_lg': p['image-url']._text || defaultImage
              };
            });
        }
      }).catch(e => {
        console.log('error occured querying ovsock products');
        console.error(e);
      });
  });
  return Promise.all(promiseArray);
};

/**
 * Given a response from amazon, upsert the new data into the database
 * and return the newly created products.
 * @todo refactor to xml-js
 * @param {Object} - results of a get form amazon.
 * @param {Promise} - resolves with the array of objects after being
 * registered with the products table.
 */
Product.fromAmazon = (results) => {
  var promiseArray;

  if (!results) {
    return Promise.resolve(null);
  }

  parseString(results.data, function (err, result) {
    if (err) {
      console.log('error is', err);
    }
    let productListings = result.ItemSearchResponse.Items[0].Item;

    promiseArray = productListings
      .filter(p =>
        p.ItemAttributes[0].ListPrice && (p.SmallImage || p.MediumImage || p.LargeImage)
      ).map(product =>
        Product.query(qb =>
          qb.whereRaw(`prod_id = '${product.ASIN[0]}|AMZN'`)
            .andWhere('type', '=', 'amzn')
            .limit(1)
        )
          .fetchAll()
          .then(products => {
            if (products && products.length > 0) {
              return {
                'id': products.models[0].id,
                'prod_id': product.ASIN[0] + '|AMZN',
                'asin': product.ASIN[0],
                'img_url_sm': product.SmallImage ? product.SmallImage[0].URL[0] : defaultImage,
                'img_url_md': product.MediumImage ? product.MediumImage[0].URL[0] : defaultImage,
                'img_url_lg': product.LargeImage ? product.LargeImage[0].URL[0] : defaultImage,
                'buy_url': product.DetailPageURL[0].substring(0, product.DetailPageURL[0].indexOf('?')),
                'title': product.ItemAttributes[0].Title[0],
                'price': product.ItemAttributes[0].ListPrice ? Number(product.ItemAttributes[0].ListPrice[0].FormattedPrice[0].slice(1)) : null,
                'description': product.ItemAttributes[0].Feature ? product.ItemAttributes[0].Feature.join('; ') : '',
                'type': 'amzn'
              };
            } else {
              // add new amazon product to db with title and ASIN:
              // product.ItemAttributes[0].Title[0], product.ASIN[0]
              return Product.forge(
                {
                  'prod_id': product.ASIN[0] + '|AMZN',
                  'asin': product.ASIN[0],
                  'img_url_sm': product.SmallImage ? product.SmallImage[0].URL[0] : defaultImage,
                  'img_url_md': product.MediumImage ? product.MediumImage[0].URL[0] : defaultImage,
                  'img_url_lg': product.LargeImage ? product.LargeImage[0].URL[0] : defaultImage,
                  'buy_url': product.DetailPageURL[0].substring(0, product.DetailPageURL[0].indexOf('?')),
                  'title': product.ItemAttributes[0].Title[0],
                  'price': product.ItemAttributes[0].ListPrice ? Number(product.ItemAttributes[0].ListPrice[0].FormattedPrice[0].slice(1)) : null,
                  'description': product.ItemAttributes[0].Feature ? product.ItemAttributes[0].Feature.join('; ') : '',
                  'type': 'amzn'
                }
              )
                .save()
                .then(({id}) => {
                  return {
                    id: id,
                    'prod_id': product.ASIN[0] + '|AMZN',
                    'asin': product.ASIN[0],
                    'img_url_sm': product.SmallImage ? product.SmallImage[0].URL[0] : defaultImage,
                    'img_url_md': product.MediumImage ? product.MediumImage[0].URL[0] : defaultImage,
                    'img_url_lg': product.LargeImage ? product.LargeImage[0].URL[0] : defaultImage,
                    'buy_url': product.DetailPageURL[0].substring(0, product.DetailPageURL[0].indexOf('?')),
                    'title': product.ItemAttributes[0].Title[0],
                    'price': product.ItemAttributes[0].ListPrice ? Number(product.ItemAttributes[0].ListPrice[0].FormattedPrice[0].slice(1)) : null,
                    'description': product.ItemAttributes[0].Feature ? product.ItemAttributes[0].Feature.join('; ') : '',
                    'type': 'amzn'
                  };
                });
            }
          }).catch(e => {
            console.log('error occured querying amazon products');
            console.error(e);
          })
      );
  });
  return Promise.all(promiseArray);
};

module.exports = db.model('Product', Product);
