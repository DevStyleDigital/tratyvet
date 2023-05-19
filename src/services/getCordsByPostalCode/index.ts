export async function getCordsByPostalCode(postalCode: string, countryCode: string) {
  try {
    // const response = await fetch(
    //   `https://thezipcodes.com/api/v1/search?zipCode=${postalCode}&countryCode=${countryCode}&apiKey=${process.env.NEXT_PUBLIC_GEOCORD_API}`,
    // );
    // const data = await response.json();
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?components=country:${countryCode}&address=${postalCode}&key=${process.env.NEXT_PUBLIC_MAP_KEY}`,
    );
    const data = await res.json();

    if (data && data.results.length > 0) {
      const coordinates = data.results[0].geometry.location;
      return coordinates;
    } else {
      throw 'no-result';
    }
  } catch (error) {
    if (error === 'no-result') throw 'no-result';
    throw 'error';
  }
}
