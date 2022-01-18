import React from 'react';
import { Select } from '~/components/form/form/inputs';

const Component = props => <Select
    {...props}
    options={[
        {
            id: 1,
            nome: 'Domingo'
        },
        {
            id: 2,
            nome: 'Segunda-Feira'
        },
        {
            id: 3,
            nome: 'Terça-Feira'
        },
        {
            id: 4,
            nome: 'Quarta-Feira'
        },
        {
            id: 5,
            nome: 'Quinta-Feira'
        },
        {
            id: 6,
            nome: 'Sexta-Feira'
        },
        {
            id: 7,
            nome: 'Sábado'
        },
    ]}
/>;

Component.defaultProps = {
    // url: '/controleFerramentas/status',
    id: 'dia_semana',
    label: 'Dia Semana',
    optionValue: 'id',
    optionLabel: 'nome',
    params: { order: ['nome'] },
};

export default Component;
