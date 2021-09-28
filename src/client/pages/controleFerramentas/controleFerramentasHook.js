import React, { useState, useEffect } from 'react';
import { getData, save, destroy } from '~/lib/api';
import { formatInteger } from '~/lib/format';

export function getFerramentas(params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();

  async function change() {
    setLoading(true);
    const [response] = await Promise.all([
      getData('/controleFerramentas/ferramenta', { ...params, order: ['nome'] }),
    ]);
    setData(response);
    setLoading(false);
  }

  useEffect(() => {
    change();
  }, [params.filter]);

  return [data, loading];
}

export function getFerramenta({ id, ...params }) {
  const [data, setData] = useState({ usuarioInclusao: {} });

  async function change() {
    const [response] = await Promise.all([
      getData(`/controleFerramentas/ferramenta/${id}`, params),
    ]);
    setData(response);
  }

  useEffect(() => {
    if (Number(id)) change();
  }, []);

  return data;
}

export function getRelatorio(params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();

  async function change() {
    setLoading(true);
    const [response] = await Promise.all([
      getData('/controleFerramentas/ferramenta', { ...params, scope: ['relatorio'] }),
    ]);
    setData(response);
    setLoading(false);
  }

  useEffect(() => {
    change();
  }, [params.filter]);

  return [data, loading];
}

