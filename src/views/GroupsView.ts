import Group from '../app/models/Group';

export default {
  render(group: Group) {
    return {
      id: group.id,
      name: group.name,
      products: group.products,
    };
  },
  renderMany(groups: Group[]) {
    return groups.map((group) => this.render(group));
  },
};
