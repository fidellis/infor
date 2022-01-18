import React, { useState, useEffect } from 'react';
import { getData, save, destroy } from '~/lib/api';
import { formatInteger } from '~/lib/format';

export function getDados(params) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();

  async function change() {
    setLoading(true);
    const [response] = await Promise.all([
      getData('/rotina/rotina', { ...params, order: ['id'] }),
    ]);
    setData(response);
    setLoading(false);
  }

  useEffect(() => {
    change();
  }, [params.filter]);

  return [data, loading];
}

export function getDado({ id, ...params }) {
  const [data, setData] = useState({ usuarioInclusao: {}, paineis: [], tags: [], responsaveis: [], ferramentas: [], });

  async function change() {
    const [response] = await Promise.all([
      getData(`/rotina/rotina/${id}`, params),
    ]);

    setData({
      ...response,
      // paineis: response.paineis.map(d => d.id),
      tags: response.tags.map(d => d.id),
      responsaveis: response.responsaveis.map(d => d.id),
      ferramentas: response.ferramentas.map(d => d.id),
    });
  }

  useEffect(() => {
    if (Number(id)) change();
  }, []);

  return data;
}


