import Provider from '../app/models/Providers';

export default {
  render(provider: Provider) {
    return {
      id: provider.id,
      name: provider.name,
      telefone: provider.telefone,
      email: provider.email,
      website: provider.website,
      products: provider.products,
    };
  },

  renderMany(providers: Provider[]) {
    return providers.map((provider) => this.render(provider));
  },
};
