import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import moment from 'moment';
import Form from '~/components/form/Form';
import { TextInput, NumberInput, DateInput, Select, TextArea, Switch } from '~/components/form/form/inputs';
import SelectTipoProvidencia from '~/components/select/SelectTipoProvidencia';
import SelectUsuario from '~/components/select/SelectUsuario';
import SelectTipoRotina from '~/components/select/SelectTipoRotina';
import SelectStatusRotina from '~/components/select/SelectStatusRotina';
import SelectFerramentaRotina from '~/components/select/SelectFerramentaRotina';
import SelectApresentacaoRotina from '~/components/select/SelectApresentacaoRotina';
import SelectTagRotina from '~/components/select/SelectTagRotina';
import SelectPeriodicidadeRotina from '~/components/select/SelectPeriodicidadeRotina';
import SelectTipoPeriodicidadeRotina from '~/components/select/SelectTipoPeriodicidadeRotina';
import { Grid } from '@material-ui/core';
import { save, destroy } from '~/lib/api';
import qs from 'qs';
import { getDado } from './hook';

const Component = (props) => {

  const id = Number(props.match.params.id);
  const response = getDado({ id, include: ['usuarioInclusao', 'tags'] });
  const [data, setData] = useState(response);

  useEffect(() => {
    setData(response);
  }, [response]);


  function onChange({ id, value }) {
    console.log(id, value)
    setData({ ...data, [id]: value });
  }

  async function salvar() {
    const response = await save('/rotina/rotina', data);
    if (response) {
      props.message('Salvo com sucesso');
      atualizar(response.id);
    }
  }

  async function excluir(id) {
    if (confirm('Excluir?')) {
      const response = await destroy(`/rotina/rotina/${id}`);
      if (response) {
        props.message('Excluído com sucesso');
        voltar();
      }
    }
  }

  function atualizar(id) {
    props.history.push(`/paineis/rotina/${id}`);
  }

  function voltar() {
    props.history.push(`/paineis/rotinas`);
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
            label: 'Salvar',
          },
          {
            label: 'Excluir',
            onClick: () => excluir(id),
            hide: !id,
          },
          {
            label: 'Voltar',
            onClick: voltar,
          },
        ]}>
        <Grid container spacing={2}>

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

          <Grid item xs={2}>
            <DateInput
              id="dataCriacao"
              label="Data Criação"
              value={data.dataCriacao}
              onChange={onChange}
              required
            />
          </Grid>

          <Grid item xs={2}>
            <SelectTipoRotina
              value={data.tipo_id}
              onChange={onChange}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <SelectTagRotina
              value={data.tags}
              onChange={onChange}
              required
              isMulti
            />
          </Grid>

          <Grid item xs={4}>
            <SelectUsuario
              id="responsaveis"
              label="Responsáveis"
              value={data.responsaveis}
              onChange={onChange}
              isMulti
              params={{ uor_id: 283521, order: ['nome'] }}
              required
            />
          </Grid>

          <Grid item xs={3}>
            <SelectFerramentaRotina
              value={data.ferramentas}
              onChange={onChange}
              required
              isMulti
            />
          </Grid>

          <Grid item xs={2}>
            <SelectApresentacaoRotina
              value={data.apresentacao_id}
              onChange={onChange}
              required
            />
          </Grid>

          <Grid item xs={2}>
            <SelectPeriodicidadeRotina
              value={data.periodicidade_id}
              onChange={onChange}
              required
            />
          </Grid>

          <Grid item xs={2}>
            <SelectTipoPeriodicidadeRotina
              value={data.tiposPeriodicidade_id}
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={1}>
            <NumberInput
              id="dia_mes"
              label="Dia"
              value={data.dia_mes}
              onChange={onChange}
              precision={0}
            />
          </Grid>


          <Grid item xs={2}>
            <SelectStatusRotina
              value={data.status_id}
              onChange={onChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextInput
              id="linkPop"
              label="Link do POP"
              value={data.linkPop}
              onChange={onChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextArea
              id="descricao"
              label="Descrição"
              value={data.descricao}
              onChange={onChange}
              maxLength={100}
              rows={4}
              required
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

          <Grid item xs={12}>
            <Switch
              id="automatica"
              label="Automática"
              checked={data.automatica}
              onChange={onChange}
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