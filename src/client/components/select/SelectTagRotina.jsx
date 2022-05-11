import React from 'react';
import Select from './SelectModel';

const Component = props => <Select {...props} />;

Component.defaultProps = {
    url: '/rotina/tag',
    id: 'tags',
    label: 'Tag',
    optionValue: 'id',
    optionLabel: 'nome',
    params: { order: ['nome'], cache: 28800 },
};

export default Component;
