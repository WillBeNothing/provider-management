import Product from '../app/models/Products';

interface ProductProps{
    id: number,
    name: string,
    price: number,
    productCode: string,
    actived: boolean,
    group: Object,
    provider: Object,
    image: string,
    isDollar: boolean,
}

export default {
  render(product: Product): ProductProps {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      productCode: product.productCode,
      actived: product.actived,
      image: product.images.url,
      provider: {
        id: product.provider.id,
        name: product.provider.name,
      },
      group: {
        id: product.group.id,
        name: product.group.name,
      },
      isDollar: product.isDollar,
    };
  },

  renderMany(products: Product[]) : ProductProps[] {
    return products.map((product) => (this.render(product)));
  },
};
