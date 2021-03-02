import Product from '../app/models/Products'
import GroupView from './GroupsView'
import ImagesView from './ImagesView'
import ProvidersView from './ProvidersView'

interface ProductProps{
    name: string,
    price: number,
    productCode: string,
    actived: boolean,
    group: string, 
    provider: string,
    image: string[],
}

export default {
    render(product: Product): ProductProps {
        return{
            name: product.name,
            price: product.price,
            productCode: product.productCode,
            actived: product.actived,
            image: product.images.map(image => (`http://localhost:5000/images/${image.path}`)),
            provider: product.provider.name,
            group: product.group.name
        }
    },


    renderMany(products: Product[]) : ProductProps[] {
        return products.map((product) => (this.render(product)))
    },
}