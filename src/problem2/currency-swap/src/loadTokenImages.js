const importAll = (r, validTokens) => {
  let images = {};
  r.keys().forEach((item) => {
    const key = item.replace("./", "").replace(".svg", "").toLowerCase();
    if (validTokens.includes(key)) {
      images[key] = r(item);
    }
  });
  return images;
};

const loadTokenImages = (validTokens) => {
  const images = importAll(
    require.context("./assets/tokens", false, /\.svg$/),
    validTokens
  );
  console.log("Loaded images:", images);
  return images;
};

export default loadTokenImages;
