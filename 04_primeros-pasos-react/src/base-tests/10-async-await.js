export const getImage = async () => {
  try {
    const apiKey = 'dGY2UmktrKCTnQiRRvhnGdERZvGmmc13';

    const resp = await fetch(
      `http://api.giphy.com/v1/gifs/ransdom?api_key=${apiKey}/asasas`
    );
    const { data } = await resp.json();
    const { url } = data.images.original;

    return url;
  } catch (error) {
    return 'Not found';
  }
};
