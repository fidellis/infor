import config from '../../../package.json';

/*  configurações gerais do frontend */
const env = process.env.AMBIENTE || 'desenvolvimento';

const commonConfig = { ...config.app, baseUrl: '' };

const envConfig = {
  desenvolvimento: {
    url: `http://localhost.bb.com.br:3000`,
    apiUrl: `http://localhost.bb.com.br:${commonConfig.port}/api`,
    arquivoUrl: 'http://localhost.bb.com.br:4003/api/arquivo',
    intranetUrl: 'http://localhost.bb.com.br:4100',
  },
  producao: {
    url: `https://diemp2.intranet.bb.com.br/${commonConfig.path}`,
    apiUrl: `https://diemp2.intranet.bb.com.br/${commonConfig.path}/api`,
    arquivoUrl: 'https://diemp2.intranet.bb.com.br/arquivos/api/arquivo',
    baseUrl: `${commonConfig.path}`,
    intranetUrl: 'https://diemp2.intranet.bb.com.br',
  },
  staging: {
    url: `//disem5.intranet.bb.com.br`,
    apiUrl: `//disem5.intranet.bb.com.br/${commonConfig.path}/api`,
    arquivoUrl: 'https://diemp2.intranet.bb.com.br/arquivos/api/arquivo',
    baseUrl: `${commonConfig.path}`,
    intranetUrl: 'https://diemp2.intranet.bb.com.br',
  },
};

export default { ...commonConfig, ...envConfig[env] };

