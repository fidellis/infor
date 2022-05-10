import React from 'react';
import Select from './SelectModel';

const Component = props => <Select {...props} />;

Component.defaultProps = {
  url: '/uor/uor',
  id: 'id',
  label: 'UOR',
  optionValue: 'id',
  optionLabel: 'nome',
  params: { prefixo: 9973, order: ['nome'], attributes: ['id', 'nome'], cache: 28800 },
  formatOptionLabel: p => `${p.id} - ${p.nome.replace('DIEMP/', '')}`,
};

export default Component;
