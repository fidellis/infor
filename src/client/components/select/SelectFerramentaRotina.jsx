import React from 'react';
import Select from './SelectModel';

const Component = props => <Select {...props} />;

Component.defaultProps = {
    url: '/rotina/ferramenta',
    id: 'ferramentas',
    label: 'Ferramenta',
    optionValue: 'id',
    optionLabel: 'nome',
    params: { order: ['nome'] },
};

export default Component;
