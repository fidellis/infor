import React from 'react';
import Select from './SelectModel';

const Component = props => <Select {...props} />;

Component.defaultProps = {
  url: '/controleFerramentas/tipoProvidencia',
  id: 'tipo_providencia_id',
  label: 'Tipo Providência',
  optionValue: 'id',
  optionLabel: 'nome',
  params: { order: ['nome'], cache: 28800 },
};

export default Component;
