import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import moment from 'moment';
import Form from '~/components/form/Form';
import { TextInput, NumberInput, DateInput, Select, TextArea, Switch } from '~/components/form/form/inputs';
import SelectTipoPainel from '~/components/select/SelectTipoPainel';
import SelectStatusRotina from '~/components/select/SelectStatusRotina';
import { Grid } from '@material-ui/core';
import { save, destroy } from '~/lib/api';
import qs from 'qs';
import { getDado } from './hook';

const Component = (props) => {
  const id = props.match ? Number(props.match.params.id) : 0;

  const response = getDado({ id, include: ['usuarioInclusao'] });
  const [data, setData] = useState(response);
  const [formEditavel, setFormEditavel] = useState(!id);

  useEffect(() => {
    setData(response);
  }, [response]);

  function onChange({ id, value }) {
    setData({ ...data, [id]: value });
  }

  async function salvar() {
    const response = await save('/painel', data);
    if (response) {
      props.message('Salvo com sucesso');
      if (props.getResponse) {
        props.getResponse(response)
      } else {
        atualizar(response.id);
      }
    }
  }

  async function excluir(id) {
    if (confirm('Excluir?')) {
      const response = await destroy(`/painel/painel/${id}`);
      if (response) {
        props.message('Excluído com sucesso');
        voltar();
      }
    }
  }

  function atualizar(id) {
    props.history.push(`/painel/${id}`);
  }

  function voltar() {
    props.history.push(`/paineis`);
  }

  return (
    <div>
      <Form
        action={salvar}
        actions={[
          {
            label: 'Novo',
            onClick: () => atualizar(0),
            hide: !id,
          },
          {
            type: 'submit',
            label: 'Salvar',
            hide: !formEditavel,
          },
          {
            label: 'Editar',
            hide: formEditavel,
            onClick: () => setFormEditavel(true),
            hide: !id,
          },
          {
            label: 'Excluir',
            onClick: () => excluir(id),
            hide: !id || !formEditavel,
          },
          {
            label: 'Voltar',
            onClick: props.onClose ? props.onClose : voltar,
          },
        ]}>
        <Grid container spacing={2}>

          <Grid item xs={6}>
            <TextInput
              id="nome"
              label="Título"
              value={data.nome}
              onChange={onChange}
              required
              maxLength={100}
              disabled={!formEditavel}
            />
          </Grid>

          <Grid item xs={2}>
            <SelectTipoPainel
              value={data.tipo_id}
              onChange={onChange}
              required
              isDisabled={!formEditavel}
            />
          </Grid>

          <Grid item xs={2}>
            <DateInput
              id="dataCriacao"
              label="Data Criação"
              value={data.dataCriacao}
              onChange={onChange}
              disabled={!formEditavel}
            />
          </Grid>

          <Grid item xs={2}>
            <SelectStatusRotina
              value={data.status_id}
              onChange={onChange}
              isDisabled={!formEditavel}
            />
          </Grid>

          <Grid item xs={12}>
            <TextInput
              id="link"
              label="Link"
              value={data.link}
              onChange={onChange}
              required
              disabled={!formEditavel}
            />
          </Grid>

          <Grid item xs={3}>
            <TextInput
              id="dataHoraInclusao"
              label="Data Inclusão"
              value={moment(data.dataHoraInclusao).format('DD/MM/YYYY')}
              disabled
              hide={!id}
            />
          </Grid>

          <Grid item xs={9}>
            <TextInput
              id="usuarioInclusao"
              label="Usuário Inclusão"
              value={data.usuarioInclusao.nome}
              disabled
              hide={!id}
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