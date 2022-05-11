import React from 'react';
import Select from './SelectModel';

const Component = props => <Select {...props} />;

Component.defaultProps = {
  url: '/portal/usuario',
  id: 'id',
  label: 'Nome',
  optionValue: 'id',
  optionLabel: 'nome',
  params: { prefixo: 9973, order: ['nome'], cache: 28800 },
  style: { width: 'fit-content', minWidth: '20%' },
};

export default Component;
