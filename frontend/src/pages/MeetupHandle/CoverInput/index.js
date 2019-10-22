import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import { MdCameraAlt } from 'react-icons/md';
import api from '~/services/api';

import { Container } from './styles';

export default function BannerInput({ bannerId }) {
  const { defaultValue, registerField } = useField('cover');
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (bannerId) {
      (async function loadMeetups() {
        setLoading(true);
        try {
          const response = await api.get(`files/${bannerId}`);
          setPreview(response.data.url);
          setFile(response.data.id);
        } catch (err) {
          toast.error(
            `Erro ao carregar o banner. Atualize a página e tente novamente.`
          );
        }
        setLoading(false);
      })();
    }
  }, [bannerId]);

  useEffect(() => {
    if (defaultValue) {
      setPreview(defaultValue.url);
      setFile(defaultValue.id);
    }
  }, [defaultValue]);

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    const response = await api.post('files', data);
    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'banner',
        ref: ref.current,
        path: 'dataset.file',
        clearValue: pickerRef => {
          pickerRef.clear();
        },
      });
    }
  }, [ref.current]); // eslint-disable-line

  return (
    <Container>
      {loading ? (
        <strong>Carregando</strong>
      ) : (
        <label htmlFor="cover">
          {preview ? (
            <img src={preview} alt="" />
          ) : (
            <span>
              <MdCameraAlt size={36} />
              <strong>Selecionar imagem</strong>
            </span>
          )}
          <input
            type="file"
            id="cover"
            accept="image/*"
            data-file={file}
            onChange={handleChange}
            ref={ref}
          />
        </label>
      )}
    </Container>
  );
}

BannerInput.propTypes = {
  bannerId: PropTypes.number,
};
BannerInput.defaultProps = {
  bannerId: null,
};
