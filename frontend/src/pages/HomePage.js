import React, { useContext, useEffect, useState } from 'react';
import { getPhotos, uploadPhotos } from '../api/userApi';
import { Loader } from '../components/Loader';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { Alert } from 'react-bootstrap';

const defaultImage =
  'https://www.khdkelectronics.com/upload/no-image-available_preview_fit_800x800.png';

export const HomePage = observer(() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(defaultImage);
  const { user } = useContext(Context);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { images } = await getPhotos();
      user.setPhotos(images);
      setLoading(false);
    })();
  }, [user]);

  const sendFile = async e => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('image', e.target[0].files[0]);

    try {
      setLoading(true);
      const { images } = await uploadPhotos(formData);
      user.setPhotos(images);
      setImagePreview(defaultImage);
      setLoading(false);
    } catch (e) {
      setError(e.response.data.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };
  const inputImageHandler = e => {
    if (e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <div>
      <div className='input-container'>
        <form onSubmit={sendFile} className='image-form'>
          <input name='input' type='file' onChange={inputImageHandler} />

          <button className='image-btn' type='submit'>
            Отправить
          </button>
        </form>
        <div className='image-preview'>
          <img src={imagePreview} alt='' />
        </div>
      </div>
      {error && <Alert variant='danger'>{error}</Alert>}
      {loading ? (
        <Loader />
      ) : (
        <div className='photos'>
          {user.photos.map(photo => {
            return (
              <div className='photo' key={photo}>
                <img src={photo} alt='' />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});
