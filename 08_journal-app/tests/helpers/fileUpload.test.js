import 'setimmediate';
import { v2 as cloudinary } from 'cloudinary';

import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
  cloud_name: 'dxldmniua',
  api_key: '411987174575735',
  api_secret: 'cJak9ApFV2sqKx1ZcYZTdgY0NYI',
  secure: true,
});

describe('pruebas en fileUpload', () => {
  test('debe subir el archivo correctamente a cloudinary', async () => {
    const imgUrl =
      'https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg';

    const resp = await fetch(imgUrl);
    const blob = await resp.blob();
    const file = new File([blob], 'image.jpg');

    const url = await fileUpload(file);
    expect(typeof url).toBe('string');

    // Delete image
    const segments = url.split('/');
    const imageId = segments.at(-1).replace('.jpg', '');

    await cloudinary.api.delete_resources(['journal/' + imageId], {
      resource_type: 'image',
    });
  });

  test('should return null', async () => {
    const file = new File([], 'no-img.jpg');

    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
