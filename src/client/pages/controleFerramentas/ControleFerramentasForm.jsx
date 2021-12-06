import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import moment from 'moment';
import Form from '~/components/form/Form';
import { TextInput, NumberInput, DateInput, Select, TextArea } from '~/components/form/form/inputs';
import SelectTipoSolucao from '~/components/select/SelectTipoSolucao';
import SelectTipoProvidencia from '~/components/select/SelectTipoProvidencia';
import SelectUsuario from '~/components/select/SelectUsuario';
import SelectStatus from '~/components/select/SelectStatus';
import { Grid } from '@material-ui/core';
import { save, destroy } from '~/lib/api';
import qs from 'qs';
import { getFerramenta } from './controleFerramentasHook';

const Component = (props) => {

  const id = Number(props.match.params.id);
  const response = getFerramenta({ id, include: ['usuarioInclusao'] });
  const [data, setData] = useState(response);

  useEffect(() => {
    setData(response);
  }, [response]);


  function onChange({ id, value }) {
    setData({ ...data, [id]: value });
  }

  async function salvar() {
    const response = await save('/controleFerramentas/ferramenta', data);
    if (response) {
      props.message('Salvo com sucesso');
      atualizar(response.id);
    }
  }

  async function excluir(id) {
    if (confirm('Excluir?')) {
      const response = await destroy(`/controleFerramentas/ferramenta/${id}`);
      if (response) {
        props.message('Excluído com sucesso');
        voltar();
      }
    }
  }

  function atualizar(id) {
    props.history.push(`/controle-ferramentas-form/${id}`);
  }

  function voltar() {
    props.history.push(`/controle-ferramentas`);
  }

  return (
    <div>
      <Form
        width="80%"
        action={salvar}
        actions={[
          {
            label: 'Novo',
            onClick: () => atualizar(0),
            hide: !id,
          },
          {
            type: 'submit',
            label: 'Salvar'
          },
          {
            label: 'Excluir',
            onClick: () => excluir(id),
            hide: !id,
          },
          {
            label: 'Voltar',
            onClick: voltar
          },
        ]}>
        <Grid container spacing={2}>

          <Grid item xs={3}>
            <TextInput
              id="dataHoraInclusao"
              label="Data"
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

          <Grid item xs={12}>
            <TextInput
              id="nome"
              label="Título"
              value={data.nome}
              onChange={onChange}
              required
              maxLength={100}
            />
          </Grid>

          <Grid item xs={4}>
            <SelectUsuario
              id="demandante_id"
              label="Demandante"
              value={data.demandante_id}
              onChange={onChange}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <SelectUsuario
              id="responsavel_id"
              label="Responsável"
              value={data.responsavel_id}
              onChange={onChange}
              params={{ prefixo: 9973, uor_id: 283521, order: ['nome'] }}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <SelectTipoSolucao
              value={data.tipo_solucao_id}
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextArea
              id="providencia"
              label="Providência"
              value={data.providencia}
              onChange={onChange}
              maxLength={100}
              rows={4}
            />
          </Grid>

          <Grid item xs={3}>
            <SelectTipoProvidencia
              value={data.tipo_providencia_id}
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={9}>
            <TextInput
              id="link"
              label="Endereço Painel"
              value={data.link}
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={3}>
            <SelectStatus
              value={data.status_id}
              onChange={onChange}
            />
          </Grid>

          {/* <Grid item xs={3}>

              <DateInput
                id="dataHoraInclusao"
                label="Data"
                value={data.dataHoraInclusao}
                onChange={onChange}
              />

            </Grid> */}

        </Grid>
      </Form>
    </div>
  );
}

Component.propTypes = {};
const mapStateToProps = ({ app: { usuario } }) => ({ usuario });
const mapDispatchToProps = ({ message });

export default connect(mapStateToProps, mapDispatchToProps)(Component);