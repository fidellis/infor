import React from 'react';
import Select from './SelectModel';

const Component = props => <Select {...props} />;

Component.defaultProps = {
    url: '/rotina/periodicidade',
    id: 'periodicidade_id',
    label: 'Periodicidade',
    optionValue: 'id',
    optionLabel: 'nome',
    params: { order: ['id'], cache: 28800 },
};

export default Component;
