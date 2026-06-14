export function nightTotalPrice(pricePerNight, guests, guestsDiscount = 50) {
  const guest_price_with_discount = pricePerNight * (guestsDiscount / 100);
  const additionalGuests = Math.max(0, guests - 2);
  const total = pricePerNight + guest_price_with_discount * additionalGuests;

  return total.toFixed(2);
}

export function bookingTotalPrice(pricePerNight, guests, nightsCount, guestsDiscount = 50) {
  const total = nightTotalPrice(pricePerNight, guests, guestsDiscount) * nightsCount;

  return total.toFixed(2);
}
