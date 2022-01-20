import React from 'react';
import Select from './SelectModel';

const Component = props => <Select {...props} />;

Component.defaultProps = {
    url: '/rotina/tipoResponsavel',
    id: 'tipo_id',
    label: 'Tipo',
    optionValue: 'id',
    optionLabel: 'nome',
    params: { order: ['id'] },
};

export default Component;
