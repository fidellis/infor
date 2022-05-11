import React from 'react';
import Select from './SelectModel';

const Component = props => <Select {...props} />;

Component.defaultProps = {
    url: '/controleFerramentas/tiposolucao',
    id: 'tipo_solucao_id',
    label: 'Tipo Solução',
    optionValue: 'id',
    optionLabel: 'nome',
    params: { order: ['nome'], cache: 28800 },
};

export default Component;
