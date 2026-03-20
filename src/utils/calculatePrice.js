export const calculateGoldPrice = ({ goldRate, weight, makingChargePerGram }) => {
    // Ensure inputs are valid numbers and non-negative
    if (goldRate < 0 || weight < 0 || makingChargePerGram < 0) {
      throw new Error('All input values must be non-negative');
    }
  
    // Calculate the total price
    const totalPrice = Math.round((goldRate + makingChargePerGram) * weight);
  
    return totalPrice; 
  };
  