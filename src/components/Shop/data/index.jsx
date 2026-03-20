import earringsData from "./Earrings"
import necklacesData from "./Necklaces"
import ringsData from "./Rings"
import braceletsData from "./Bracelets"

// Combine all product data
const allProducts = [...earringsData, ...necklacesData, ...ringsData, ...braceletsData]

export { earringsData, necklacesData, ringsData, braceletsData, allProducts }
