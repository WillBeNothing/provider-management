import Product from '../app/models/Products';

interface ProductProps{
    id: number,
    name: string,
    price: number,
    productCode: string,
    actived: boolean,
    group: string,
    provider: string,
    image: string,
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
      provider: product.provider.name,
      group: product.group.name,
    };
  },

  renderMany(products: Product[]) : ProductProps[] {
    return products.map((product) => (this.render(product)));
  },
};
