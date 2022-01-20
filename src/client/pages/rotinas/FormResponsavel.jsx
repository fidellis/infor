import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import moment from 'moment';
import Form from '~/components/form/Form';
import SelectUsuario from '~/components/select/SelectUsuario';
import SelectTipoResponsavel from '~/components/select/SelectTipoResponsavel';
import { Grid } from '@material-ui/core';
import { getDado } from './hook';

const Component = (props) => {
    const id = props.responsavelId;
    const [data, setData] = useState({});

    function onChange(option) {
        setData({ ...data, ...option });
    }

    async function onSubmit() {
        props.onSubmit(data)
    }

    return (
        <div>
            <Form
                action={onSubmit}
                actions={[
                    {
                        type: 'submit',
                        label: 'Salvar',
                    },
                    {
                        label: 'Fechar',
                        onClick: props.onClose,
                    },
                ]}>
                <Grid container spacing={0}>
                    <Grid xs={10}>
                        <SelectUsuario
                            id="responsavel_id"
                            label="Responsável"
                            value={data.id}
                            onChange={option => onChange({ ...option, id: option.chave })}
                            params={{ uor_id: 283521, order: ['nome'] }}
                            isOptionDisabled={(option) => props.values.includes(option.id)}
                            required
                        />
                    </Grid>
                    <Grid xs={2}>
                        <SelectTipoResponsavel
                            id="tipo_id"
                            label="Tipo"
                            value={data.tipo_id}
                            onChange={option => onChange({ tipo_id: option.value })}
                            required
                        />
                    </Grid>
                </Grid>
            </Form>
        </div>
    );
}

Component.propTypes = {};
const mapStateToProps = ({ app: { usuario } }) => ({ usuario });
const mapDispatchToProps = ({ message });

export default connect(mapStateToProps, mapDispatchToProps)(Component);