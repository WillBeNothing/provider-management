import Image from '../app/models/Images'

export default {
    render(image: Image[]) {
        return image.map(image => {
            return {
                url: `https://provider-manager.herokuapp.com/images/${image.path}`
            }
        })
    }
}