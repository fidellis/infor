import React from 'react';
import Select from './SelectModel';

const Component = props => <Select {...props} />;

Component.defaultProps = {
    url: '/rotina/tipoPeriodicidade',
    id: 'tipoPeriodicidade_id',
    label: 'Tipo de Data',
    optionValue: 'id',
    optionLabel: 'nome',
    params: { order: ['nome'] },
};

export default Component;
