import Group from '../app/models/Group'

import ProductsView from './ProcuctsView'


export default {
    render(group: Group){
        return {
            name: group.name,
            products: group.products
        }

    },
    renderMany(groups: Group[]) {
        return groups.map(group => this.render(group))
    }
}